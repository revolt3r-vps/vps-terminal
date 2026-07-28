'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

const execFileAsync = promisify(execFile);

/**
 * Normalize a client-supplied relative path inside a root.
 * Rejects absolute paths, empty segments that escape, and `..`.
 * Returns '' for the root itself.
 */
function normalizeRelativePath(relativePath) {
  if (relativePath == null || relativePath === '' || relativePath === '.') {
    return '';
  }
  if (typeof relativePath !== 'string') {
    const error = new Error('invalid path');
    error.statusCode = 400;
    throw error;
  }
  if (relativePath.includes('\0')) {
    const error = new Error('invalid path');
    error.statusCode = 400;
    throw error;
  }
  // Reject Windows drives / absolute forms early.
  if (path.win32.isAbsolute(relativePath) || path.posix.isAbsolute(relativePath)) {
    const error = new Error('path must be relative');
    error.statusCode = 400;
    throw error;
  }
  const posix = relativePath.replace(/\\/g, '/');
  const parts = [];
  for (const segment of posix.split('/')) {
    if (segment === '' || segment === '.') {
      continue;
    }
    if (segment === '..') {
      const error = new Error('path escapes root');
      error.statusCode = 400;
      throw error;
    }
    if (segment.includes('\0')) {
      const error = new Error('invalid path');
      error.statusCode = 400;
      throw error;
    }
    parts.push(segment);
  }
  return parts.join('/');
}

function assertInsideRoot(rootReal, candidateReal) {
  if (candidateReal === rootReal) {
    return;
  }
  const prefix = rootReal.endsWith(path.sep) ? rootReal : `${rootReal}${path.sep}`;
  if (!candidateReal.startsWith(prefix)) {
    const error = new Error('path escapes root');
    error.statusCode = 403;
    throw error;
  }
}

/**
 * Resolve a relative path under rootPath with realpath jail.
 * @param {string} rootPath absolute root directory
 * @param {string} relativePath client relative path
 * @param {{ mustExist?: boolean }} [options]
 * @returns {Promise<{ rootReal: string, absolutePath: string, relativePath: string, exists: boolean, stats: import('fs').Stats | null }>}
 */
async function resolveJailedPath(rootPath, relativePath, options = {}) {
  if (typeof rootPath !== 'string' || !path.isAbsolute(rootPath)) {
    const error = new Error('invalid root');
    error.statusCode = 500;
    throw error;
  }
  const mustExist = options.mustExist !== false;
  const rel = normalizeRelativePath(relativePath);
  let rootReal;
  try {
    rootReal = await fs.promises.realpath(rootPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const missing = new Error('root not found');
      missing.statusCode = 404;
      throw missing;
    }
    throw error;
  }

  const joined = rel ? path.join(rootReal, ...rel.split('/')) : rootReal;

  try {
    const absolutePath = await fs.promises.realpath(joined);
    assertInsideRoot(rootReal, absolutePath);
    const stats = await fs.promises.lstat(absolutePath);
    // After realpath, reject if the leaf is still a symlink somehow (shouldn't).
    if (stats.isSymbolicLink()) {
      const error = new Error('symlinks are not allowed');
      error.statusCode = 403;
      throw error;
    }
    return {
      rootReal,
      absolutePath,
      relativePath: rel,
      exists: true,
      stats: await fs.promises.stat(absolutePath)
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.code !== 'ENOENT') {
      throw error;
    }
    if (mustExist) {
      const missing = new Error('not found');
      missing.statusCode = 404;
      throw missing;
    }
    // Resolve parent for create targets; ensure parent is inside jail.
    const parentJoined = path.dirname(joined);
    const baseName = path.basename(joined);
    if (!baseName || baseName === '.' || baseName === '..') {
      const bad = new Error('invalid path');
      bad.statusCode = 400;
      throw bad;
    }
    let parentReal;
    try {
      parentReal = await fs.promises.realpath(parentJoined);
    } catch (parentError) {
      if (parentError.code === 'ENOENT') {
        const missing = new Error('parent directory not found');
        missing.statusCode = 404;
        throw missing;
      }
      throw parentError;
    }
    assertInsideRoot(rootReal, parentReal);
    const absolutePath = path.join(parentReal, baseName);
    // Final string check before create.
    assertInsideRoot(rootReal, absolutePath);
    return {
      rootReal,
      absolutePath,
      relativePath: rel,
      exists: false,
      stats: null
    };
  }
}

function parentRelativePath(relativePath) {
  const rel = normalizeRelativePath(relativePath);
  if (!rel) {
    return null;
  }
  const idx = rel.lastIndexOf('/');
  if (idx < 0) {
    return '';
  }
  return rel.slice(0, idx);
}

function normalizeEntryName(name) {
  if (
    typeof name !== 'string' ||
    name.length === 0 ||
    name.length > 180 ||
    Buffer.byteLength(name, 'utf8') > 255 ||
    name !== name.trim() ||
    name === '.' ||
    name === '..' ||
    /[\/\\\0-\x1f\x7f]/.test(name)
  ) {
    const error = new Error(
      'name must fit within 180 characters and 255 bytes without slashes, control characters, or surrounding spaces'
    );
    error.statusCode = 400;
    throw error;
  }
  return name;
}

function mapFsMutationError(error) {
  if (error?.statusCode) {
    return error;
  }
  if (error?.code === 'EEXIST' || error?.code === 'ENOTEMPTY') {
    const conflict = new Error('an entry with that name already exists');
    conflict.statusCode = 409;
    return conflict;
  }
  if (error?.code === 'EACCES' || error?.code === 'EPERM') {
    const denied = new Error('permission denied');
    denied.statusCode = 403;
    return denied;
  }
  return error;
}

async function lstatIfPresent(absolutePath) {
  try {
    return await fs.promises.lstat(absolutePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

async function createJailedDirectory(rootPath, relativeParent, name) {
  const parent = normalizeRelativePath(relativeParent);
  const safeName = normalizeEntryName(name);
  const parentResolved = await resolveJailedPath(rootPath, parent, {
    mustExist: true
  });
  if (!parentResolved.stats.isDirectory()) {
    const error = new Error('parent is not a directory');
    error.statusCode = 400;
    throw error;
  }
  const targetRelative = parent ? `${parent}/${safeName}` : safeName;
  const target = await resolveJailedPath(rootPath, targetRelative, {
    mustExist: false
  });
  if (target.exists) {
    const error = new Error('an entry with that name already exists');
    error.statusCode = 409;
    throw error;
  }
  try {
    await fs.promises.mkdir(target.absolutePath, { mode: 0o700 });
  } catch (error) {
    throw mapFsMutationError(error);
  }
  return targetRelative;
}

async function renameJailedEntry(rootPath, relativePath, nextName) {
  const sourceRelative = normalizeRelativePath(relativePath);
  if (!sourceRelative) {
    const error = new Error('cannot rename root');
    error.statusCode = 400;
    throw error;
  }
  const safeName = normalizeEntryName(nextName);
  const parent = parentRelativePath(sourceRelative);
  const targetRelative = parent ? `${parent}/${safeName}` : safeName;
  if (sourceRelative === targetRelative) {
    return targetRelative;
  }
  const source = await resolveJailedPath(rootPath, sourceRelative, {
    mustExist: true
  });
  const sourceLexicalPath = path.join(
    source.rootReal,
    ...sourceRelative.split('/')
  );
  const sourceLeaf = await fs.promises.lstat(sourceLexicalPath);
  if (sourceLeaf.isSymbolicLink()) {
    const error = new Error('symlinks cannot be renamed');
    error.statusCode = 403;
    throw error;
  }
  const target = await resolveJailedPath(rootPath, targetRelative, {
    mustExist: false
  });
  // realpath reports a broken destination symlink as missing. lstat closes
  // that gap so it is treated as a conflict rather than silently replaced.
  if (target.exists || (await lstatIfPresent(target.absolutePath))) {
    const error = new Error('an entry with that name already exists');
    error.statusCode = 409;
    throw error;
  }
  try {
    await fs.promises.access(
      path.dirname(sourceLexicalPath),
      fs.constants.W_OK
    );
  } catch (error) {
    throw mapFsMutationError(error);
  }
  try {
    // Node's fs.rename overwrites an entry that appears after the check above.
    // GNU mv --no-clobber delegates to the platform no-replace operation and
    // leaves the source intact on a conflict. --no-target-directory also keeps
    // a concurrent destination directory from changing the operation's shape.
    await execFileAsync(
      'mv',
      [
        '--no-clobber',
        '--no-target-directory',
        '--',
        sourceLexicalPath,
        target.absolutePath
      ],
      { timeout: 30_000, maxBuffer: 16 * 1024 }
    );
  } catch (error) {
    if (
      (await lstatIfPresent(sourceLexicalPath)) &&
      (await lstatIfPresent(target.absolutePath))
    ) {
      const conflict = new Error('an entry with that name already exists');
      conflict.statusCode = 409;
      throw conflict;
    }
    try {
      await fs.promises.access(
        path.dirname(sourceLexicalPath),
        fs.constants.W_OK
      );
    } catch (accessError) {
      throw mapFsMutationError(accessError);
    }
    throw mapFsMutationError(error);
  }
  if (await lstatIfPresent(sourceLexicalPath)) {
    const error = new Error('an entry with that name already exists');
    error.statusCode = 409;
    throw error;
  }
  return targetRelative;
}

/**
 * @param {string} displayPrefix e.g. "~", "~/projects", "/data"
 * @param {string} relativePath path under that root
 */
function toDisplayPath(displayPrefix, relativePath) {
  const prefix =
    typeof displayPrefix === 'string' && displayPrefix.trim()
      ? displayPrefix.trim().replace(/\/+$/, '')
      : '~';
  const rel = normalizeRelativePath(relativePath);
  return rel ? `${prefix}/${rel}` : prefix;
}

module.exports = {
  normalizeRelativePath,
  resolveJailedPath,
  parentRelativePath,
  normalizeEntryName,
  createJailedDirectory,
  renameJailedEntry,
  toDisplayPath,
  assertInsideRoot
};
