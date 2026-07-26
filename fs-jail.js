'use strict';

const fs = require('node:fs');
const path = require('node:path');

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
  toDisplayPath,
  assertInsideRoot
};
