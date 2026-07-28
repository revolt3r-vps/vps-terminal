'use strict';

const fs = require('node:fs');
const path = require('node:path');

const deniedDetailKeyPattern =
  /(authorization|cookie|credential|password|path|preview|secret|session|text|token)/i;
const safeDetailKeys = new Set([
  'apiEmpty',
  'apiLength',
  'apiLines',
  'apiOk',
  'bytes',
  'clearAfter',
  'clientX',
  'clientY',
  'clipboardOk',
  'copied',
  'detail',
  'displayMode',
  'drawerOpen',
  'endCol',
  'endColumn',
  'endRow',
  'errorName',
  'extractedLength',
  'extractedLines',
  'footerHeight',
  'footerWidth',
  'hasSelection',
  'headerHeight',
  'headerWidth',
  'holdKeyboardLayoutForSelection',
  'keyboardFocused',
  'keyboardOpen',
  'keyboardReduced',
  'layoutHeight',
  'layoutWidth',
  'legacyOk',
  'length',
  'lineCount',
  'mainHeight',
  'mainWidth',
  'madeSelectionThisGesture',
  'mimeType',
  'multiLine',
  'orientation',
  'pointer',
  'reason',
  'safeBottom',
  'safeLeft',
  'safeRight',
  'safeTop',
  'selectionEndColumn',
  'selectionEndRow',
  'selectionStartColumn',
  'selectionStartRow',
  'showCopyChip',
  'source',
  'startCol',
  'startColumn',
  'startRow',
  'state',
  'terminalHeight',
  'terminalWidth',
  'viewMode',
  'viewportHeight',
  'viewportWidth',
  'wasScrolling',
  'xtermTouchSelecting'
]);
const logWriteChains = new Map();
const safeStringValues = new Map([
  ['displayMode', /^(browser|standalone|fullscreen)$/],
  ['errorName', /^[A-Za-z][A-Za-z0-9]{0,39}$/],
  ['eventType', /^[a-z][a-z0-9-]{0,31}$/],
  ['mimeType', /^image\/(avif|gif|jpeg|png|webp|\*)$/],
  ['orientation', /^(portrait|landscape)$/],
  ['pointer', /^(coarse|fine)$/],
  [
    'reason',
    /^(clipboard-read-failed|drawer|initial|read-failed|settled|view-mode|viewport|visual-viewport)$/
  ],
  ['source', /^(app-mirror|button|chip|touchend)$/],
  ['state', /^(closed|connected|connecting|error|idle|open)$/],
  ['viewMode', /^(files|term)$/]
]);

function sanitizeDetailValue(key, value, depth = 0) {
  if (
    !safeDetailKeys.has(key) ||
    deniedDetailKeyPattern.test(key) ||
    depth > 2
  ) {
    return undefined;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const allowed = safeStringValues.get(key);
    const normalized = value.slice(0, 80).replace(/[\r\n]/g, ' ');
    if (!allowed?.test(normalized)) {
      return undefined;
    }
    return normalized;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }
  const result = {};
  for (const [childKey, childValue] of Object.entries(value)) {
    const sanitized = sanitizeDetailValue(childKey, childValue, depth + 1);
    if (sanitized !== undefined) {
      result[childKey] = sanitized;
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

function sanitizeClientDebugEntry(entry, receivedAt = new Date()) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    return null;
  }
  const rawEvent = typeof entry.event === 'string' ? entry.event : '';
  const event = /^[a-z0-9][a-z0-9-]{0,63}$/i.test(rawEvent)
    ? rawEvent
    : 'unknown';
  const detail =
    sanitizeDetailValue('detail', entry.detail) || Object.create(null);
  return {
    t: receivedAt.toISOString(),
    event,
    detail
  };
}

async function appendBoundedClientDebugEntries(
  logPath,
  entries,
  options = {}
) {
  const maximumBytes = Math.max(4096, Number(options.maximumBytes) || 256 * 1024);
  const receivedAt = options.receivedAt || new Date();
  const rows = entries
    .map((entry) => sanitizeClientDebugEntry(entry, receivedAt))
    .filter(Boolean);
  if (rows.length === 0) {
    return 0;
  }
  const rowBuffers = rows.map((entry) =>
    Buffer.from(`${JSON.stringify(entry)}\n`, 'utf8')
  );
  while (
    rowBuffers.length > 0 &&
    rowBuffers.reduce((total, row) => total + row.length, 0) > maximumBytes
  ) {
    rowBuffers.shift();
  }
  if (rowBuffers.length === 0) {
    return 0;
  }
  const payload = Buffer.concat(rowBuffers);
  const previousWrite = logWriteChains.get(logPath) || Promise.resolve();
  const currentWrite = previousWrite.catch(() => {}).then(async () => {
    await fs.promises.mkdir(path.dirname(logPath), {
      recursive: true,
      mode: 0o700
    });
    let currentBytes = 0;
    try {
      currentBytes = (await fs.promises.stat(logPath)).size;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    if (currentBytes + payload.length > maximumBytes) {
      await fs.promises.writeFile(logPath, payload, { mode: 0o600 });
    } else {
      await fs.promises.appendFile(logPath, payload, { mode: 0o600 });
    }
    await fs.promises.chmod(logPath, 0o600);
  });
  logWriteChains.set(logPath, currentWrite);
  try {
    await currentWrite;
  } finally {
    if (logWriteChains.get(logPath) === currentWrite) {
      logWriteChains.delete(logPath);
    }
  }
  return rowBuffers.length;
}

module.exports = {
  appendBoundedClientDebugEntries,
  sanitizeClientDebugEntry
};
