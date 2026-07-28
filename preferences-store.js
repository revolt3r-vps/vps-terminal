'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const preferencesVersion = 1;
const maximumSessionPreferenceCount = 128;
const sessionNamePattern = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;
const profileIdPattern = /^(?:shell|profile-[a-z0-9]{8,48})$/;
const themeNamePattern = /^[a-z0-9][a-z0-9-]{0,31}$/;

function plainObject(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function sanitizeRecord(value, valuePattern) {
  const validEntries = [];
  if (!plainObject(value)) {
    return Object.create(null);
  }
  for (const [sessionName, entry] of Object.entries(value)) {
    if (
      !sessionNamePattern.test(sessionName) ||
      typeof entry !== 'string' ||
      !valuePattern.test(entry)
    ) {
      continue;
    }
    validEntries.push([sessionName, entry]);
    if (validEntries.length > maximumSessionPreferenceCount) {
      validEntries.shift();
    }
  }
  const result = Object.create(null);
  for (const [sessionName, entry] of validEntries) {
    result[sessionName] = entry;
  }
  return result;
}

function sanitizePreferences(value) {
  if (
    !plainObject(value) ||
    !plainObject(value.keyProfiles) ||
    !Array.isArray(value.keyProfiles.profiles) ||
    value.keyProfiles.profiles.length === 0
  ) {
    const error = new Error('preferences must include at least one key profile');
    error.statusCode = 400;
    throw error;
  }
  const theme =
    typeof value.theme === 'string' && themeNamePattern.test(value.theme)
      ? value.theme
      : 'matrix';
  return {
    keyProfiles: value.keyProfiles,
    sessionProfiles: sanitizeRecord(
      value.sessionProfiles,
      profileIdPattern
    ),
    theme,
    sessionThemes: sanitizeRecord(value.sessionThemes, themeNamePattern)
  };
}

function preferencesIdentity(email) {
  return crypto
    .createHash('sha256')
    .update(String(email).trim().toLowerCase())
    .digest('hex');
}

class PreferencesStore {
  constructor(stateRoot) {
    this.directory = path.join(stateRoot, 'preferences');
    this.writeQueues = new Map();
  }

  filePath(email) {
    return path.join(this.directory, `${preferencesIdentity(email)}.json`);
  }

  async read(email) {
    const subject = preferencesIdentity(email);
    try {
      const raw = await fs.promises.readFile(this.filePath(email), 'utf8');
      const value = JSON.parse(raw);
      if (
        !plainObject(value) ||
        value.version !== preferencesVersion ||
        !Number.isSafeInteger(value.revision) ||
        value.revision < 1
      ) {
        throw new Error('invalid preferences document');
      }
      return {
        subject,
        enabled: true,
        version: preferencesVersion,
        revision: value.revision,
        preferences: sanitizePreferences(value.preferences)
      };
    } catch (error) {
      if (error.code === 'ENOENT') {
        return {
          subject,
          enabled: false,
          version: preferencesVersion,
          revision: 0,
          preferences: null
        };
      }
      throw error;
    }
  }

  async write(email, expectedRevision, preferences) {
    if (
      !Number.isSafeInteger(expectedRevision) ||
      expectedRevision < 0
    ) {
      const error = new Error('expectedRevision must be a non-negative integer');
      error.statusCode = 400;
      throw error;
    }
    const clean = sanitizePreferences(preferences);
    const identity = preferencesIdentity(email);
    const previous = this.writeQueues.get(identity) || Promise.resolve();
    const operation = previous
      .catch(() => {})
      .then(async () => {
        const current = await this.read(email);
        if (current.revision !== expectedRevision) {
          const error = new Error('preferences changed in another browser');
          error.statusCode = 409;
          error.revision = current.revision;
          throw error;
        }
        const document = {
          version: preferencesVersion,
          revision: current.revision + 1,
          updatedAt: new Date().toISOString(),
          preferences: clean
        };
        await fs.promises.mkdir(this.directory, {
          recursive: true,
          mode: 0o700
        });
        await fs.promises.chmod(this.directory, 0o700);
        const target = this.filePath(email);
        const temporary = `${target}.${process.pid}.${crypto
          .randomBytes(4)
          .toString('hex')}.tmp`;
        try {
          await fs.promises.writeFile(
            temporary,
            `${JSON.stringify(document, null, 2)}\n`,
            { mode: 0o600, flag: 'wx' }
          );
          await fs.promises.rename(temporary, target);
        } finally {
          await fs.promises.unlink(temporary).catch(() => {});
        }
        return {
          subject: identity,
          enabled: true,
          version: preferencesVersion,
          revision: document.revision,
          preferences: clean
        };
      });
    this.writeQueues.set(identity, operation);
    try {
      return await operation;
    } finally {
      if (this.writeQueues.get(identity) === operation) {
        this.writeQueues.delete(identity);
      }
    }
  }
}

module.exports = {
  PreferencesStore,
  preferencesIdentity,
  sanitizePreferences
};
