'use strict';

const sessionsElement = document.querySelector('#sessions');
const terminalElement = document.querySelector('#terminal');
const emptyElement = document.querySelector('#empty');
const filesPanelElement = document.querySelector('#files-panel');
const filesToolbarElement = document.querySelector('#files-toolbar');
const filesUpButton = document.querySelector('#files-up');
const filesRefreshButton = document.querySelector('#files-refresh');
const filesSettingsButton = document.querySelector('#files-settings');
const filesBreadcrumbElement = document.querySelector('#files-breadcrumb');
const filesRootsElement = document.querySelector('#files-roots');
const filesListElement = document.querySelector('#files-list');
const filesEmptyHintElement = document.querySelector('#files-empty-hint');
const filesUploadInput = document.querySelector('#files-upload');
const footerTermElement = document.querySelector('#footer-term');
const footerFilesElement = document.querySelector('#footer-files');
const filesActionsDialog = document.querySelector('#files-actions-dialog');
const filesActionsTitle = document.querySelector('#files-actions-title');
const filesActionsPath = document.querySelector('#files-actions-path');
const filesActionsClose = document.querySelector('#files-actions-close');
const filesActionPreview = document.querySelector('#files-action-preview');
const filesActionDownload = document.querySelector('#files-action-download');
const filesActionInsert = document.querySelector('#files-action-insert');
const filesActionDelete = document.querySelector('#files-action-delete');
const filesPreviewDialog = document.querySelector('#files-preview-dialog');
const filesPreviewTitle = document.querySelector('#files-preview-title');
const filesPreviewBody = document.querySelector('#files-preview-body');
const filesPreviewClose = document.querySelector('#files-preview-close');
const viewModeElement = document.querySelector('#view-mode');
const appHeaderElement = document.querySelector('#app-header');
const headerSummaryButton = document.querySelector('#header-summary');
const currentSessionElement = document.querySelector('#current-session');
const connectionDotElement = document.querySelector('#connection-dot');
const statusElement = document.querySelector('#status');
const keyboardButton = document.querySelector('#keyboard');
const pasteButton = document.querySelector('#paste');
const selectionCopyChip = document.querySelector('#selection-copy-chip');
const scrollCatcherElement = document.querySelector('#scroll-catcher');
const scrollPositionElement = document.querySelector('#scroll-position');
const scrollThumbElement = document.querySelector('#scroll-thumb');
const footerDrawerElement = document.querySelector('#footer-drawer');
const footerPinsElement = document.querySelector('#footer-pins');
const drawerKeysButton = document.querySelector('#drawer-keys');
const drawerSnipsButton = document.querySelector('#drawer-snips');
const drawerFindButton = document.querySelector('#drawer-find');
const settingsDialogElement = document.querySelector('#settings-dialog');
const terminalThemeElement = document.querySelector('#terminal-theme');
const shortcutEditorList = document.querySelector('#shortcut-editor-list');
const shortcutAddSelect = document.querySelector('#shortcut-add-select');
const shortcutAddButton = document.querySelector('#shortcut-add');
const shortcutResetButton = document.querySelector('#shortcut-reset');
const customKeyLabelInput = document.querySelector('#custom-key-label');
const customKeyTypeSelect = document.querySelector('#custom-key-type');
const customKeyValueInput = document.querySelector('#custom-key-value');
const customKeyScrollSelect = document.querySelector('#custom-key-scroll');
const customKeyAddButton = document.querySelector('#custom-key-add');
const snippetEditorList = document.querySelector('#snippet-editor-list');
const snippetLabelInput = document.querySelector('#snippet-label-input');
const snippetBodyInput = document.querySelector('#snippet-body-input');
const snippetRunInput = document.querySelector('#snippet-run-input');
const snippetSaveButton = document.querySelector('#snippet-save');
const snippetResetButton = document.querySelector('#snippet-reset');
const settingsTabsElement = document.querySelector('.settings-tabs');
const findBarElement = document.querySelector('#find-bar');
const findInputElement = document.querySelector('#find-input');
const findPrevButton = document.querySelector('#find-prev');
const findNextButton = document.querySelector('#find-next');
const findCloseButton = document.querySelector('#find-close');
const installAppButton = document.querySelector('#install-app');
const installHelpElement = document.querySelector('#install-help');
const decoder = new TextDecoder();
const activeSessionStorageKey = 'vps-terminal-active-session';
const terminalFontSizeStorageKey = 'vps-terminal-font-size';
const terminalThemeStorageKey = 'vps-terminal-theme';
const sessionThemeStorageKey = 'vps-terminal-session-themes';
const shortcutsStorageKey = 'vps-terminal-shortcuts';
const customKeysStorageKey = 'vps-terminal-custom-keys';
const footerPinsStorageKey = 'vps-terminal-footer-pins';
const viewModeStorageKey = 'vps-terminal-view-mode';
const filesNavStorageKey = 'vps-terminal-files-nav';
const filesShowHiddenStorageKey = 'vps-terminal-files-show-hidden';
const settingsLastTabStorageKey = 'vps-terminal-settings-tab';
const connectionConnectTimeoutMs = 10000;
const pinHintStorageKey = 'vps-terminal-pin-hint-seen';
const maximumPasteLength = 16384;
const chipLongPressMilliseconds = 480;
const chipLongPressMoveTolerance = 10;
// Main strip scrolls; allow more pins without crowding Settings.
const maximumFooterPins = 8;
const maximumCustomKeys = 24;
const maximumCustomKeyLabelLength = 16;
const maximumCustomKeySequenceLength = 32;
const maximumPasteImageBytes = 5 * 1024 * 1024;
const defaultTerminalFontSize = 13;
const minimumTerminalFontSize = 9;
const maximumTerminalFontSize = 22;
const nativeScrollActivationDistance = 5;
const nativeScrollDeltaThreshold = 1;
const nativeInputSentinel = '\u200b';
const nativeDeleteDeduplicationMilliseconds = 250;
const nativeDeleteRepeatDelayMilliseconds = 400;
const nativeDeleteRepeatIntervalMilliseconds = 75;
const nativeSelectionSettleMilliseconds = 1000;
const nativeSelectionViewportSettleMilliseconds = 1200;
const nativeTapMaximumMilliseconds = 350;
const nativeSelectionLongPressMilliseconds = 480;
const headerAutoCollapseMilliseconds = 4000;
const sessionRefreshMilliseconds = 30000;
const sessionLongPressMilliseconds = 500;
const sessionLongPressMoveTolerance = 10;
const nativeTouchSelection = shouldUseNativeTouchSelection();
const terminalFontFamily =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';// Built-in key chips (paste / keyboard / settings / find stay fixed chrome).
// Find is only the footer Find button + Ctrl/Cmd+F — not a Keys chip.
const builtinShortcutCatalog = {
  esc: { label: 'Esc', kind: 'sequence', sequence: '\u001b' },
  ctrl: { label: 'Ctrl', kind: 'ctrl' },
  'ctrl-a': { label: 'Ctrl+A', kind: 'sequence', sequence: '\u0001' },
  'ctrl-b': { label: 'Ctrl+B', kind: 'sequence', sequence: '\u0002' },
  'ctrl-c': { label: 'Ctrl+C', kind: 'sequence', sequence: '\u0003' },
  'ctrl-d': { label: 'Ctrl+D', kind: 'sequence', sequence: '\u0004' },
  'ctrl-e': { label: 'Ctrl+E', kind: 'sequence', sequence: '\u0005' },
  'ctrl-f': { label: 'Ctrl+F', kind: 'sequence', sequence: '\u0006' },
  'ctrl-g': { label: 'Ctrl+G', kind: 'sequence', sequence: '\u0007' },
  'ctrl-h': { label: 'Ctrl+H', kind: 'sequence', sequence: '\u0008' },
  'ctrl-k': { label: 'Ctrl+K', kind: 'sequence', sequence: '\u000b' },
  'ctrl-l': { label: 'Ctrl+L', kind: 'sequence', sequence: '\u000c' },
  'ctrl-n': { label: 'Ctrl+N', kind: 'sequence', sequence: '\u000e' },
  'ctrl-o': { label: 'Ctrl+O', kind: 'sequence', sequence: '\u000f' },
  'ctrl-p': { label: 'Ctrl+P', kind: 'sequence', sequence: '\u0010' },
  'ctrl-r': { label: 'Ctrl+R', kind: 'sequence', sequence: '\u0012' },
  'ctrl-t': { label: 'Ctrl+T', kind: 'sequence', sequence: '\u0014' },
  'ctrl-u': { label: 'Ctrl+U', kind: 'sequence', sequence: '\u0015' },
  'ctrl-v': { label: 'Ctrl+V', kind: 'sequence', sequence: '\u0016' },
  'ctrl-w': { label: 'Ctrl+W', kind: 'sequence', sequence: '\u0017' },
  'ctrl-x': { label: 'Ctrl+X', kind: 'sequence', sequence: '\u0018' },
  'ctrl-y': { label: 'Ctrl+Y', kind: 'sequence', sequence: '\u0019' },
  'ctrl-z': { label: 'Ctrl+Z', kind: 'sequence', sequence: '\u001a' },
  tab: { label: 'Tab', kind: 'sequence', sequence: '\t' },
  'shift-tab': { label: 'S-Tab', kind: 'sequence', sequence: '\u001b[Z' },
  left: { label: '←', kind: 'sequence', sequence: '\u001b[D' },
  up: { label: '↑', kind: 'sequence', sequence: '\u001b[A' },
  down: { label: '↓', kind: 'sequence', sequence: '\u001b[B' },
  right: { label: '→', kind: 'sequence', sequence: '\u001b[C' },
  enter: { label: 'Enter', kind: 'sequence', sequence: '\r' },
  space: { label: 'Space', kind: 'sequence', sequence: ' ' },
  backspace: { label: 'Bksp', kind: 'sequence', sequence: '\u007f' },
  delete: { label: 'Del', kind: 'sequence', sequence: '\u001b[3~' },
  insert: { label: 'Ins', kind: 'sequence', sequence: '\u001b[2~' },
  home: { label: 'Home', kind: 'sequence', sequence: '\u001b[H' },
  end: { label: 'End', kind: 'sequence', sequence: '\u001b[F' },
  pgup: { label: 'PgUp', kind: 'scroll', scroll: 'up' },
  pgdn: { label: 'PgDn', kind: 'scroll', scroll: 'down' },
  'scroll-end': { label: 'Bottom', kind: 'scroll', scroll: 'bottom' },
  f1: { label: 'F1', kind: 'sequence', sequence: '\u001bOP' },
  f2: { label: 'F2', kind: 'sequence', sequence: '\u001bOQ' },
  f3: { label: 'F3', kind: 'sequence', sequence: '\u001bOR' },
  f4: { label: 'F4', kind: 'sequence', sequence: '\u001bOS' },
  f5: { label: 'F5', kind: 'sequence', sequence: '\u001b[15~' },
  f6: { label: 'F6', kind: 'sequence', sequence: '\u001b[17~' },
  f7: { label: 'F7', kind: 'sequence', sequence: '\u001b[18~' },
  f8: { label: 'F8', kind: 'sequence', sequence: '\u001b[19~' },
  f9: { label: 'F9', kind: 'sequence', sequence: '\u001b[20~' },
  f10: { label: 'F10', kind: 'sequence', sequence: '\u001b[21~' },
  f11: { label: 'F11', kind: 'sequence', sequence: '\u001b[23~' },
  f12: { label: 'F12', kind: 'sequence', sequence: '\u001b[24~' }
};
// Grouped for the Settings → Keys add picker (order within groups is picker order).
const builtinShortcutGroups = [
  {
    label: 'Shell',
    ids: [
      'esc',
      'ctrl',
      'tab',
      'shift-tab',
      'enter',
      'space',
      'backspace',
      'delete',
      'insert'
    ]
  },
  {
    label: 'Ctrl',
    ids: [
      'ctrl-a',
      'ctrl-b',
      'ctrl-c',
      'ctrl-d',
      'ctrl-e',
      'ctrl-f',
      'ctrl-g',
      'ctrl-h',
      'ctrl-k',
      'ctrl-l',
      'ctrl-n',
      'ctrl-o',
      'ctrl-p',
      'ctrl-r',
      'ctrl-t',
      'ctrl-u',
      'ctrl-v',
      'ctrl-w',
      'ctrl-x',
      'ctrl-y',
      'ctrl-z'
    ]
  },
  {
    label: 'Arrows',
    ids: ['left', 'up', 'down', 'right', 'home', 'end']
  },
  {
    label: 'Scroll',
    ids: ['pgup', 'pgdn', 'scroll-end']
  },
  {
    label: 'Function',
    ids: [
      'f1',
      'f2',
      'f3',
      'f4',
      'f5',
      'f6',
      'f7',
      'f8',
      'f9',
      'f10',
      'f11',
      'f12'
    ]
  }
];
// Drawer defaults: shell/tmux essentials. Arrows live here (not main bar).
const defaultShortcutIds = [
  'esc',
  'ctrl',
  'tab',
  'enter',
  'ctrl-c',
  'ctrl-d',
  'ctrl-z',
  'ctrl-l',
  'ctrl-b',
  'left',
  'up',
  'down',
  'right',
  'pgup',
  'pgdn',
  'scroll-end'
];
// Display labels for the settings picker (order is picker order).
const terminalThemeLabels = {
  matrix: 'Matrix',
  groknight: 'Grok Night',
  tokyonight: 'Tokyo Night',
  rosepine: 'Rosé Pine Moon',
  oscura: 'Oscura Midnight',
  dracula: 'Dracula',
  solarized: 'Solarized Dark',
  nord: 'Nord',
  monokai: 'Monokai',
  gruvbox: 'Gruvbox Dark'
};
const terminalThemes = {
  // Former Termius Dark — green-on-navy classic.
  matrix: {
    background: '#141729',
    foreground: '#00cc74',
    cursor: '#21b568',
    cursorAccent: '#000000',
    selectionBackground: 'rgba(32, 181, 104, 0.5)',
    black: '#575757',
    red: '#ff2c6d',
    green: '#19f9d8',
    yellow: '#ffb86c',
    blue: '#45a9f9',
    magenta: '#ff75b5',
    cyan: '#b084eb',
    white: '#cdcdcd',
    brightBlack: '#757575',
    brightRed: '#ff2c6d',
    brightGreen: '#19f9d8',
    brightYellow: '#ffcc95',
    brightBlue: '#6fc1ff',
    brightMagenta: '#ff9ac1',
    brightCyan: '#bcaafe',
    brightWhite: '#e6e6e6'
  },
  // Inspired by Grok Build default (neutral dark + magenta accent).
  groknight: {
    background: '#121214',
    foreground: '#e8e6ed',
    cursor: '#7d4bc6',
    cursorAccent: '#121214',
    selectionBackground: 'rgba(125, 75, 198, 0.4)',
    black: '#1c1c1f',
    red: '#f07178',
    green: '#7fd962',
    yellow: '#e5c07b',
    blue: '#61afef',
    magenta: '#7d4bc6',
    cyan: '#56b6c2',
    white: '#d4d2db',
    brightBlack: '#5c5c66',
    brightRed: '#ff7b82',
    brightGreen: '#95f07a',
    brightYellow: '#f0d48a',
    brightBlue: '#7dc0ff',
    brightMagenta: '#a078e0',
    brightCyan: '#6fd4e0',
    brightWhite: '#ffffff'
  },
  tokyonight: {
    background: '#1a1b26',
    foreground: '#c0caf5',
    cursor: '#c0caf5',
    cursorAccent: '#1a1b26',
    selectionBackground: 'rgba(54, 59, 84, 0.85)',
    black: '#15161e',
    red: '#f7768e',
    green: '#9ece6a',
    yellow: '#e0af68',
    blue: '#7aa2f7',
    magenta: '#bb9af7',
    cyan: '#7dcfff',
    white: '#a9b1d6',
    brightBlack: '#414868',
    brightRed: '#f7768e',
    brightGreen: '#9ece6a',
    brightYellow: '#e0af68',
    brightBlue: '#7aa2f7',
    brightMagenta: '#bb9af7',
    brightCyan: '#7dcfff',
    brightWhite: '#c0caf5'
  },
  rosepine: {
    background: '#232136',
    foreground: '#e0def4',
    cursor: '#e0def4',
    cursorAccent: '#232136',
    selectionBackground: 'rgba(68, 65, 90, 0.85)',
    black: '#393552',
    red: '#eb6f92',
    green: '#3e8fb0',
    yellow: '#f6c177',
    blue: '#9ccfd8',
    magenta: '#c4a7e7',
    cyan: '#ea9a97',
    white: '#e0def4',
    brightBlack: '#6e6a86',
    brightRed: '#eb6f92',
    brightGreen: '#3e8fb0',
    brightYellow: '#f6c177',
    brightBlue: '#9ccfd8',
    brightMagenta: '#c4a7e7',
    brightCyan: '#ea9a97',
    brightWhite: '#e0def4'
  },
  oscura: {
    background: '#0b0b0f',
    foreground: '#e6e1ef',
    cursor: '#c4b5fd',
    cursorAccent: '#0b0b0f',
    selectionBackground: 'rgba(124, 58, 237, 0.35)',
    black: '#1a1a22',
    red: '#f87171',
    green: '#4ade80',
    yellow: '#fbbf24',
    blue: '#60a5fa',
    magenta: '#c4b5fd',
    cyan: '#22d3ee',
    white: '#e6e1ef',
    brightBlack: '#52525b',
    brightRed: '#fca5a5',
    brightGreen: '#86efac',
    brightYellow: '#fde68a',
    brightBlue: '#93c5fd',
    brightMagenta: '#ddd6fe',
    brightCyan: '#67e8f9',
    brightWhite: '#ffffff'
  },
  dracula: {
    background: '#282a36',
    foreground: '#f8f8f2',
    cursor: '#f8f8f2',
    cursorAccent: '#282a36',
    selectionBackground: 'rgba(68, 71, 90, 0.8)',
    black: '#21222c',
    red: '#ff5555',
    green: '#50fa7b',
    yellow: '#f1fa8c',
    blue: '#bd93f9',
    magenta: '#ff79c6',
    cyan: '#8be9fd',
    white: '#f8f8f2',
    brightBlack: '#6272a4',
    brightRed: '#ff6e6e',
    brightGreen: '#69ff94',
    brightYellow: '#ffffa5',
    brightBlue: '#d6acff',
    brightMagenta: '#ff92df',
    brightCyan: '#a4ffff',
    brightWhite: '#ffffff'
  },
  solarized: {
    background: '#002b36',
    foreground: '#839496',
    cursor: '#93a1a1',
    cursorAccent: '#002b36',
    selectionBackground: 'rgba(7, 54, 66, 0.9)',
    black: '#073642',
    red: '#dc322f',
    green: '#859900',
    yellow: '#b58900',
    blue: '#268bd2',
    magenta: '#d33682',
    cyan: '#2aa198',
    white: '#eee8d5',
    brightBlack: '#586e75',
    brightRed: '#cb4b16',
    brightGreen: '#586e75',
    brightYellow: '#657b83',
    brightBlue: '#839496',
    brightMagenta: '#6c71c4',
    brightCyan: '#93a1a1',
    brightWhite: '#fdf6e3'
  },
  nord: {
    background: '#2e3440',
    foreground: '#d8dee9',
    cursor: '#d8dee9',
    cursorAccent: '#2e3440',
    selectionBackground: 'rgba(67, 76, 94, 0.9)',
    black: '#3b4252',
    red: '#bf616a',
    green: '#a3be8c',
    yellow: '#ebcb8b',
    blue: '#81a1c1',
    magenta: '#b48ead',
    cyan: '#88c0d0',
    white: '#e5e9f0',
    brightBlack: '#4c566a',
    brightRed: '#bf616a',
    brightGreen: '#a3be8c',
    brightYellow: '#ebcb8b',
    brightBlue: '#81a1c1',
    brightMagenta: '#b48ead',
    brightCyan: '#8fbcbb',
    brightWhite: '#eceff4'
  },
  monokai: {
    background: '#272822',
    foreground: '#f8f8f2',
    cursor: '#f8f8f0',
    cursorAccent: '#272822',
    selectionBackground: 'rgba(73, 72, 62, 0.9)',
    black: '#272822',
    red: '#f92672',
    green: '#a6e22e',
    yellow: '#f4bf75',
    blue: '#66d9ef',
    magenta: '#ae81ff',
    cyan: '#a1efe4',
    white: '#f8f8f2',
    brightBlack: '#75715e',
    brightRed: '#f92672',
    brightGreen: '#a6e22e',
    brightYellow: '#f4bf75',
    brightBlue: '#66d9ef',
    brightMagenta: '#ae81ff',
    brightCyan: '#a1efe4',
    brightWhite: '#f9f8f5'
  },
  gruvbox: {
    background: '#282828',
    foreground: '#ebdbb2',
    cursor: '#ebdbb2',
    cursorAccent: '#282828',
    selectionBackground: 'rgba(80, 73, 69, 0.9)',
    black: '#282828',
    red: '#cc241d',
    green: '#98971a',
    yellow: '#d79921',
    blue: '#458588',
    magenta: '#b16286',
    cyan: '#689d6a',
    white: '#a89984',
    brightBlack: '#928374',
    brightRed: '#fb4934',
    brightGreen: '#b8bb26',
    brightYellow: '#fabd2f',
    brightBlue: '#83a598',
    brightMagenta: '#d3869b',
    brightCyan: '#8ec07c',
    brightWhite: '#ebdbb2'
  }
};
let sessions = [];
let activeSession = null;
let terminal = null;
let terminalInitialization = null;
let fitAddon = null;
let searchAddon = null;
let socket = null;
let lastSentTerminalCols = null;
let lastSentTerminalRows = null;
let reconnectTimer = null;
let intentionalClose = false;
let touchLastY = null;
let touchMoved = false;
let pinchStartDistance = null;
let pinchStartFontSize = null;
let terminalFontSize = rememberedFontSize();
let terminalThemeName = rememberedTerminalThemeName();
let fontResizeFrame = null;
let fontSizeChangedDuringPinch = false;
let ctrlArmed = false;
let scrollPositionTimer = null;
let statusTimer = null;
let headerCollapseTimer = null;
let connectionState = 'idle';
let nativeTouchScrolling = false;
let nativeTouchStartX = null;
let nativeTouchStartY = null;
let nativeTouchMaxDistance = 0;
let nativeTouchStartedAt = Number.NEGATIVE_INFINITY;
let nativeSelectionLongPressTimer = null;
let xtermTouchSelecting = false;
let xtermSelectionAnchor = null;
let selectionPresentAtGestureStart = false;
let pendingFitAfterTouch = false;
let documentTouchGestureActive = false;
let keyboardLayoutLock = null;
let keyboardDismissing = false;
let keyboardDismissPollTimer = null;
let holdKeyboardLayoutForSelection = false;
let scrollPixelAccumulator = 0;
let nativeDeleteKeyDownAt = Number.NEGATIVE_INFINITY;
let nativeDeleteBeforeInputAt = Number.NEGATIVE_INFINITY;
let nativeDeleteRepeatDelayTimer = null;
let nativeDeleteRepeatIntervalTimer = null;
let nativeInputSentinelTimer = null;
let nativeInputComposing = false;
let suppressCompatibilityMouseUntil = 0;
let selectionViewportLock = null;
let selectionViewportGestureActive = false;
let selectionViewportReleaseTimer = null;
let visualViewportUpdateFrame = null;
let fitFrame = null;
let lastAppliedViewportHeight = null;
let lastAppliedViewportTop = null;
let lastSelectionApplyLogAt = 0;
let lastTouchClientX = 0;
let lastTouchClientY = 0;
let deferredInstallPrompt = null;
let footerDrawer = null; // 'keys' | 'snips' | null
let viewMode = 'term'; // 'term' | 'files'
let filesRootId = 'home';
let filesPath = '';
let filesWritable = true;
let filesListing = null;
let filesActionTarget = null;
let filesLoadPromise = null;
/** @type {Array<{ id: string, label: string, displayPrefix?: string, writable?: boolean }>} */
let filesRootsCatalog = [];
let filesShowHidden = false;
let connectionWatchTimer = null;
let appDisplayName = 'VPS Terminal';
let snippetsList = [];
let snippetsLoadPromise = null;
let snippetEditorSelectedId = null;

document.documentElement.classList.toggle(
  'native-touch-terminal',
  nativeTouchSelection
);

function shouldUseNativeTouchSelection() {
  const appleTouchDevice =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return Boolean(
    appleTouchDevice &&
    window.matchMedia?.('(hover: none) and (pointer: coarse)').matches
  );
}

let lastConnectionDetail = '';

function setStatus(message, options = {}) {
  clearTimeout(statusTimer);
  statusTimer = null;
  statusElement.textContent = message;
  statusElement.classList.add('visible');
  statusElement.classList.toggle('sticky', Boolean(options.sticky));
  if (options.sticky) {
    return;
  }
  statusTimer = setTimeout(() => {
    statusElement.classList.remove('visible');
    statusElement.classList.remove('sticky');
    statusTimer = null;
  }, options.durationMs || 1800);
}

function clearStatus() {
  clearTimeout(statusTimer);
  statusTimer = null;
  statusElement.classList.remove('visible');
  statusElement.classList.remove('sticky');
}

function connectionDotTitle() {
  if (!activeSession) {
    return 'No session';
  }
  if (connectionState === 'connected') {
    return `Connected to ${activeSession}. Tap to reconnect.`;
  }
  if (connectionState === 'connecting') {
    return lastConnectionDetail || `Connecting to ${activeSession}…`;
  }
  if (connectionState === 'error') {
    return lastConnectionDetail || `Connection error for ${activeSession}. Tap to retry.`;
  }
  return lastConnectionDetail || activeSession;
}

function renderHeaderSummary() {
  currentSessionElement.textContent = activeSession || 'No session';
  connectionDotElement.dataset.state = connectionState;
  connectionDotElement.title = connectionDotTitle();
  connectionDotElement.setAttribute(
    'aria-label',
    connectionDotTitle()
  );
}

function sessionTransportLive() {
  return Boolean(
    activeSession && socket && socket.readyState === WebSocket.OPEN
  );
}

function updateTermControlsEnabled() {
  const live = sessionTransportLive();
  if (keyboardButton) {
    keyboardButton.disabled = !live;
    if (!live) {
      keyboardButton.classList.remove('active');
      keyboardButton.setAttribute('aria-pressed', 'false');
      keyboardButton.title = 'Connect a session to use the keyboard';
      keyboardButton.setAttribute(
        'aria-label',
        'Connect a session to use the keyboard'
      );
    }
  }
  if (pasteButton && !terminalHasCopyableSelection()) {
    pasteButton.disabled = !live;
    pasteButton.title = live
      ? 'Paste'
      : 'Connect a session to paste';
    pasteButton.setAttribute(
      'aria-label',
      live ? 'Paste' : 'Connect a session to paste'
    );
  } else if (pasteButton && terminalHasCopyableSelection()) {
    pasteButton.disabled = false;
  }
  if (drawerFindButton) {
    drawerFindButton.disabled = !live;
    drawerFindButton.title = live
      ? 'Find'
      : 'Connect a session to search scrollback';
    drawerFindButton.setAttribute(
      'aria-label',
      live ? 'Find in scrollback' : 'Connect a session to search scrollback'
    );
  }
}

function clearConnectionWatch() {
  clearTimeout(connectionWatchTimer);
  connectionWatchTimer = null;
}

function armConnectionWatch(sessionName) {
  clearConnectionWatch();
  connectionWatchTimer = setTimeout(() => {
    connectionWatchTimer = null;
    if (
      activeSession === sessionName &&
      connectionState === 'connecting' &&
      !sessionTransportLive()
    ) {
      lastConnectionDetail = `Still connecting to ${sessionName}… Tap the green/red dot to retry.`;
      setConnectionState('error', lastConnectionDetail);
      setStatus(lastConnectionDetail, { sticky: true });
    }
  }, connectionConnectTimeoutMs);
}

function setConnectionState(value, detail = '') {
  connectionState = value;
  if (detail) {
    lastConnectionDetail = detail;
  } else if (value === 'idle') {
    lastConnectionDetail = '';
  }
  if (value === 'connected' || value === 'idle' || value === 'error') {
    clearConnectionWatch();
  }
  renderHeaderSummary();
  updateTermControlsEnabled();
}

function forceReconnectActiveSession() {
  if (!activeSession) {
    setStatus('No session');
    return;
  }
  clearTimeout(reconnectTimer);
  reconnectTimer = null;
  lastConnectionDetail = `Reconnecting to ${activeSession}…`;
  setConnectionState('connecting', lastConnectionDetail);
  setStatus(lastConnectionDetail, { sticky: true });
  // Force a fresh socket even if a half-open one exists.
  intentionalClose = true;
  if (socket) {
    try {
      socket.close();
    } catch {
      // Ignore close races.
    }
    socket = null;
  }
  intentionalClose = false;
  void connect(activeSession);
}

function scheduleHeaderCollapse() {
  clearTimeout(headerCollapseTimer);
  headerCollapseTimer = null;
  if (!appHeaderElement.classList.contains('collapsed') && activeSession) {
    headerCollapseTimer = setTimeout(
      () => setHeaderCollapsed(true),
      headerAutoCollapseMilliseconds
    );
  }
}

function setHeaderCollapsed(collapsed) {
  clearTimeout(headerCollapseTimer);
  headerCollapseTimer = null;
  appHeaderElement.classList.toggle('collapsed', collapsed);
  headerSummaryButton.setAttribute('aria-expanded', String(!collapsed));
  if (!collapsed) {
    scheduleHeaderCollapse();
  }
}

function setCtrlArmed(value) {
  ctrlArmed = value;
  document
    .querySelectorAll(
      '[data-shortcut-id="ctrl"], [data-pin-kind="key"][data-pin-id="ctrl"]'
    )
    .forEach((ctrlButton) => {
      ctrlButton.classList.toggle('active', value);
      ctrlButton.setAttribute('aria-pressed', String(value));
    });
}

function isCustomKeyId(id) {
  return typeof id === 'string' && id.startsWith('custom-');
}

function sanitizeCustomKeyLabel(label) {
  if (typeof label !== 'string') {
    return '';
  }
  return label.replace(/\s+/g, ' ').trim().slice(0, maximumCustomKeyLabelLength);
}

/** Expand \e \n \r \t \\ \xHH \uHHHH in custom sequence specs. */
function parseSequenceSpec(spec) {
  if (typeof spec !== 'string') {
    return null;
  }
  const trimmed = spec.trim();
  if (!trimmed) {
    return null;
  }
  let out = '';
  for (let i = 0; i < trimmed.length; i += 1) {
    const ch = trimmed[i];
    if (ch !== '\\') {
      out += ch;
      if (out.length > maximumCustomKeySequenceLength) {
        return null;
      }
      continue;
    }
    const next = trimmed[i + 1];
    if (next === undefined) {
      return null;
    }
    if (next === 'e' || next === 'E') {
      out += '\u001b';
      i += 1;
    } else if (next === 'n') {
      out += '\n';
      i += 1;
    } else if (next === 'r') {
      out += '\r';
      i += 1;
    } else if (next === 't') {
      out += '\t';
      i += 1;
    } else if (next === '\\') {
      out += '\\';
      i += 1;
    } else if (next === 'x' || next === 'X') {
      const hex = trimmed.slice(i + 2, i + 4);
      if (!/^[0-9a-fA-F]{2}$/.test(hex)) {
        return null;
      }
      out += String.fromCharCode(Number.parseInt(hex, 16));
      i += 3;
    } else if (next === 'u' || next === 'U') {
      const hex = trimmed.slice(i + 2, i + 6);
      if (!/^[0-9a-fA-F]{4}$/.test(hex)) {
        return null;
      }
      out += String.fromCharCode(Number.parseInt(hex, 16));
      i += 5;
    } else {
      return null;
    }
    if (out.length > maximumCustomKeySequenceLength) {
      return null;
    }
  }
  return out.length > 0 ? out : null;
}

function sanitizeCustomKeyDef(entry) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }
  if (!isCustomKeyId(entry.id) || !/^[a-z0-9-]{8,48}$/.test(entry.id)) {
    return null;
  }
  const label = sanitizeCustomKeyLabel(entry.label);
  if (!label) {
    return null;
  }
  if (entry.kind === 'scroll') {
    if (entry.scroll !== 'up' && entry.scroll !== 'down' && entry.scroll !== 'bottom') {
      return null;
    }
    return { id: entry.id, label, kind: 'scroll', scroll: entry.scroll };
  }
  if (entry.kind === 'sequence') {
    if (typeof entry.sequence !== 'string' || entry.sequence.length === 0) {
      return null;
    }
    if (entry.sequence.length > maximumCustomKeySequenceLength) {
      return null;
    }
    return {
      id: entry.id,
      label,
      kind: 'sequence',
      sequence: entry.sequence
    };
  }
  return null;
}

function loadCustomKeyDefs() {
  try {
    const raw = window.localStorage.getItem(customKeysStorageKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    const seen = new Set();
    const cleaned = [];
    for (const entry of parsed) {
      const def = sanitizeCustomKeyDef(entry);
      if (!def || seen.has(def.id)) {
        continue;
      }
      seen.add(def.id);
      cleaned.push(def);
      if (cleaned.length >= maximumCustomKeys) {
        break;
      }
    }
    return cleaned;
  } catch {
    return [];
  }
}

function saveCustomKeyDefs(defs) {
  const cleaned = [];
  const seen = new Set();
  for (const entry of defs) {
    const def = sanitizeCustomKeyDef(entry);
    if (!def || seen.has(def.id)) {
      continue;
    }
    seen.add(def.id);
    cleaned.push(def);
    if (cleaned.length >= maximumCustomKeys) {
      break;
    }
  }
  try {
    window.localStorage.setItem(customKeysStorageKey, JSON.stringify(cleaned));
  } catch {
    // Continue without persistence.
  }
  return cleaned;
}

function getShortcutDef(id) {
  if (typeof id !== 'string') {
    return null;
  }
  if (Object.hasOwn(builtinShortcutCatalog, id)) {
    return builtinShortcutCatalog[id];
  }
  return loadCustomKeyDefs().find((entry) => entry.id === id) || null;
}

function isKnownShortcutId(id) {
  return getShortcutDef(id) !== null;
}

function sanitizeShortcutIds(ids) {
  if (!Array.isArray(ids)) {
    return [...defaultShortcutIds];
  }
  const seen = new Set();
  const cleaned = [];
  for (const id of ids) {
    // Drop legacy "find" key and any unknown ids.
    if (typeof id !== 'string' || id === 'find' || !isKnownShortcutId(id)) {
      continue;
    }
    if (seen.has(id)) {
      continue;
    }
    seen.add(id);
    cleaned.push(id);
  }
  return cleaned.length > 0 ? cleaned : [...defaultShortcutIds];
}

function loadShortcutIds() {
  try {
    const raw = window.localStorage.getItem(shortcutsStorageKey);
    if (!raw) {
      return [...defaultShortcutIds];
    }
    return sanitizeShortcutIds(JSON.parse(raw));
  } catch {
    return [...defaultShortcutIds];
  }
}

function saveShortcutIds(ids) {
  const cleaned = sanitizeShortcutIds(ids);
  try {
    window.localStorage.setItem(shortcutsStorageKey, JSON.stringify(cleaned));
  } catch {
    // Continue without persistence when browser storage is unavailable.
  }
  return cleaned;
}

function activateShortcut(id) {
  const def = getShortcutDef(id);
  if (!def) {
    return;
  }
  if (def.kind === 'ctrl') {
    clearTerminalSelection();
    setCtrlArmed(!ctrlArmed);
    return;
  }
  if (def.kind === 'scroll') {
    scrollTerminal(def.scroll);
    return;
  }
  if (def.kind === 'sequence') {
    clearTerminalSelection();
    setCtrlArmed(false);
    sendInput(def.sequence);
  }
}

const findSearchOptions = {
  caseSensitive: false,
  wholeWord: false,
  regex: false,
  decorations: {
    matchBackground: '#294a34',
    activeMatchBackground: '#21b568',
    matchBorder: '#3d6b4a',
    activeMatchBorder: '#5ff0a4',
    matchOverviewRuler: '#21b568',
    activeMatchColorOverviewRuler: '#5ff0a4'
  }
};

function isFindBarOpen() {
  return Boolean(findBarElement && !findBarElement.hidden);
}

function openFindBar() {
  if (!findBarElement || !findInputElement) {
    return;
  }
  if (viewMode === 'files') {
    setViewMode('term');
  }
  if (!sessionTransportLive() || !terminal || !searchAddon) {
    setStatus('Connect a session first');
    return;
  }
  findBarElement.hidden = false;
  findInputElement.focus({ preventScroll: true });
  findInputElement.select();
  const term = findInputElement.value.trim();
  if (term) {
    runFind('next');
  }
}

function closeFindBar() {
  if (!findBarElement) {
    return;
  }
  findBarElement.hidden = true;
  try {
    searchAddon?.clearDecorations?.();
  } catch {
    // Ignore cleanup failures.
  }
  // Blur the find field so the soft keyboard can dismiss, then restore
  // full-height layout (same path as terminal keyboard blur).
  if (findInputElement && document.activeElement === findInputElement) {
    findInputElement.blur();
  }
  if (
    !terminalInputIsFocused() &&
    !holdKeyboardLayoutForSelection &&
    !terminal?.hasSelection()
  ) {
    releaseKeyboardLayoutLock();
  }
}

function runFind(direction) {
  if (!terminal || !searchAddon || !findInputElement) {
    return false;
  }
  const term = findInputElement.value;
  if (!term) {
    try {
      searchAddon.clearDecorations?.();
    } catch {
      // Ignore.
    }
    terminal.clearSelection();
    return false;
  }
  try {
    const found =
      direction === 'prev'
        ? searchAddon.findPrevious(term, findSearchOptions)
        : searchAddon.findNext(term, findSearchOptions);
    if (!found) {
      setStatus('No matches');
    }
    return Boolean(found);
  } catch (error) {
    clientDebug('find-error', {
      message: String(error?.message || error).slice(0, 120)
    });
    setStatus('Find failed');
    return false;
  }
}

function loadFooterPins() {
  try {
    const raw = window.localStorage.getItem(footerPinsStorageKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter((entry) => {
        if (!entry || typeof entry.id !== 'string') {
          return false;
        }
        if (entry.kind === 'key') {
          // Drop legacy find pins and unknown keys.
          return entry.id !== 'find' && isKnownShortcutId(entry.id);
        }
        return entry.kind === 'snip';
      })
      .slice(0, maximumFooterPins);
  } catch {
    return [];
  }
}

function saveFooterPins(pins) {
  try {
    window.localStorage.setItem(
      footerPinsStorageKey,
      JSON.stringify(pins.slice(0, maximumFooterPins))
    );
  } catch {
    // Continue without persistence.
  }
}

function isPinned(kind, id) {
  return loadFooterPins().some(
    (entry) => entry.kind === kind && entry.id === id
  );
}

function toggleFooterPin(kind, id) {
  const pins = loadFooterPins();
  const index = pins.findIndex(
    (entry) => entry.kind === kind && entry.id === id
  );
  if (index >= 0) {
    pins.splice(index, 1);
    setStatus('Unpinned');
  } else {
    if (pins.length >= maximumFooterPins) {
      setStatus(`Pin limit ${maximumFooterPins}`);
      return;
    }
    if (kind === 'key' && !isKnownShortcutId(id)) {
      return;
    }
    if (kind === 'snip' && !snippetsList.some((entry) => entry.id === id)) {
      return;
    }
    pins.push({ kind, id });
    try {
      if (window.localStorage.getItem(pinHintStorageKey) !== '1') {
        window.localStorage.setItem(pinHintStorageKey, '1');
        setStatus('Pinned — hold chip again to remove');
      } else {
        setStatus('Pinned');
      }
    } catch {
      setStatus('Pinned');
    }
  }
  saveFooterPins(pins);
  renderFooterPins();
  renderFooterDrawer();
}

function setFooterDrawer(mode) {
  const next = mode === 'keys' || mode === 'snips' ? mode : null;
  footerDrawer = footerDrawer === next ? null : next;
  if (drawerKeysButton) {
    drawerKeysButton.classList.toggle('active', footerDrawer === 'keys');
    drawerKeysButton.setAttribute(
      'aria-pressed',
      String(footerDrawer === 'keys')
    );
  }
  if (drawerSnipsButton) {
    drawerSnipsButton.classList.toggle('active', footerDrawer === 'snips');
    drawerSnipsButton.setAttribute(
      'aria-pressed',
      String(footerDrawer === 'snips')
    );
  }
  if (footerDrawer === 'snips' && snippetsList.length === 0) {
    void loadSnippetsFromServer();
  }
  renderFooterDrawer();
}

function closeFooterDrawer() {
  if (!footerDrawer) {
    return;
  }
  footerDrawer = null;
  drawerKeysButton?.classList.remove('active');
  drawerKeysButton?.setAttribute('aria-pressed', 'false');
  drawerSnipsButton?.classList.remove('active');
  drawerSnipsButton?.setAttribute('aria-pressed', 'false');
  if (footerDrawerElement) {
    footerDrawerElement.hidden = true;
    footerDrawerElement.replaceChildren();
  }
}

function createKeyChipButton(id, options = {}) {
  const def = getShortcutDef(id);
  if (!def) {
    return null;
  }
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.shortcutId = id;
  button.textContent = def.label;
  button.title = options.pinned
    ? `${def.label} — hold to unpin`
    : `${def.label} — hold to pin`;
  if (def.kind === 'ctrl') {
    button.setAttribute('aria-pressed', String(ctrlArmed));
    if (ctrlArmed) {
      button.classList.add('active');
    }
  }
  if (options.pinned) {
    button.dataset.pinKind = 'key';
    button.dataset.pinId = id;
  }
  installChipLongPress(button, {
    onTap: () => activateShortcut(id),
    onHold: () => toggleFooterPin('key', id)
  });
  return button;
}

function createSnipChipButton(snippet, options = {}) {
  if (!snippet) {
    return null;
  }
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.snippetId = snippet.id;
  button.textContent = snippet.label;
  const runs = snippet.run !== false;
  button.classList.toggle('snippet-run', runs);
  button.title = options.pinned
    ? `${snippet.label} — hold to unpin`
    : runs
      ? `${snippet.label} — tap to run, hold to pin`
      : `${snippet.label} — tap to insert, hold to pin`;
  if (options.pinned) {
    button.dataset.pinKind = 'snip';
    button.dataset.pinId = snippet.id;
  }
  installChipLongPress(button, {
    onTap: () => runSnippet(snippet.id),
    onHold: () => toggleFooterPin('snip', snippet.id)
  });
  return button;
}

function renderFooterDrawer() {
  if (!footerDrawerElement) {
    return;
  }
  footerDrawerElement.replaceChildren();
  if (!footerDrawer) {
    footerDrawerElement.hidden = true;
    return;
  }
  footerDrawerElement.hidden = false;
  if (footerDrawer === 'keys') {
    for (const id of loadShortcutIds()) {
      const button = createKeyChipButton(id, { pinned: isPinned('key', id) });
      if (button) {
        if (isPinned('key', id)) {
          button.classList.add('active');
        }
        footerDrawerElement.append(button);
      }
    }
    return;
  }
  for (const snippet of snippetsList) {
    const button = createSnipChipButton(snippet, {
      pinned: isPinned('snip', snippet.id)
    });
    if (button) {
      if (isPinned('snip', snippet.id)) {
        button.classList.add('active');
      }
      footerDrawerElement.append(button);
    }
  }
}

function renderFooterPins() {
  if (!footerPinsElement) {
    return;
  }
  footerPinsElement.replaceChildren();
  for (const pin of loadFooterPins()) {
    if (pin.kind === 'key') {
      const button = createKeyChipButton(pin.id, { pinned: true });
      if (button) {
        footerPinsElement.append(button);
      }
      continue;
    }
    const snippet = snippetsList.find((entry) => entry.id === pin.id);
    if (!snippet) {
      continue;
    }
    const button = createSnipChipButton(snippet, { pinned: true });
    if (button) {
      footerPinsElement.append(button);
    }
  }
}

function installChipLongPress(button, { onTap, onHold }) {
  let timer = null;
  let startX = 0;
  let startY = 0;
  let longPressFired = false;
  let tracking = false;

  const clearTimer = () => {
    clearTimeout(timer);
    timer = null;
  };

  button.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) {
      return;
    }
    tracking = true;
    longPressFired = false;
    startX = event.clientX;
    startY = event.clientY;
    clearTimer();
    timer = window.setTimeout(() => {
      timer = null;
      longPressFired = true;
      onHold?.();
    }, chipLongPressMilliseconds);
  });
  button.addEventListener('pointermove', (event) => {
    if (!tracking || timer === null) {
      return;
    }
    if (
      Math.hypot(event.clientX - startX, event.clientY - startY) >
      chipLongPressMoveTolerance
    ) {
      clearTimer();
    }
  });
  button.addEventListener('pointerup', () => {
    tracking = false;
    clearTimer();
  });
  button.addEventListener('pointercancel', () => {
    tracking = false;
    clearTimer();
    longPressFired = false;
  });
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (longPressFired) {
      longPressFired = false;
      return;
    }
    onTap?.();
  });
}

function setSettingsTab(tabId) {
  const allowed = new Set(['theme', 'keys', 'snips', 'app']);
  const active = allowed.has(tabId) ? tabId : 'theme';
  try {
    window.localStorage.setItem(settingsLastTabStorageKey, active);
  } catch {
    // ignore
  }
  document.querySelectorAll('.settings-tab').forEach((tab) => {
    const selected = tab.dataset.settingsTab === active;
    tab.setAttribute('aria-selected', String(selected));
  });
  document.querySelectorAll('.settings-panel').forEach((panel) => {
    panel.hidden = panel.dataset.settingsPanel !== active;
  });
  if (active === 'keys') {
    renderShortcutEditor();
  }
  if (active === 'snips') {
    void loadSnippetsFromServer();
  }
  if (active === 'app') {
    updateInstallSettings();
    updateAppHelpPanel();
  }
}

function loadLastSettingsTab() {
  try {
    const tab = window.localStorage.getItem(settingsLastTabStorageKey);
    if (tab === 'theme' || tab === 'keys' || tab === 'snips' || tab === 'app') {
      return tab;
    }
  } catch {
    // ignore
  }
  return 'theme';
}

function updateAppHelpPanel() {
  const help = document.querySelector('#app-help-text');
  if (!help) {
    return;
  }
  help.textContent = [
    `${appDisplayName}.`,
    'Hold a Keys/Snips chip to pin it on the main bar.',
    'Find needs an active session (scrollback search).',
    'Hardware keyboard: when focus is on chrome, keys route to the session;',
    'browser reload chords (Ctrl/Cmd+R, etc.) stay with the browser when not focused in the terminal.'
  ].join(' ');
}

async function loadAppConfig() {
  try {
    const cfg = await api('/api/config');
    if (cfg && typeof cfg.appName === 'string' && cfg.appName.trim()) {
      appDisplayName = cfg.appName.trim().slice(0, 64);
      document.title = appDisplayName;
      const apple = document.querySelector('meta[name="apple-mobile-web-app-title"]');
      if (apple) {
        apple.setAttribute('content', appDisplayName);
      }
      const titleEl = document.querySelector('#settings-title');
      if (titleEl) {
        titleEl.textContent = `${appDisplayName} settings`;
      }
    }
  } catch {
    // Optional endpoint — keep defaults.
  }
}

function runSnippet(id, options = {}) {
  const snippet = snippetsList.find((entry) => entry.id === id);
  if (!snippet || typeof snippet.body !== 'string' || snippet.body.length === 0) {
    setStatus('Snippet empty');
    return;
  }
  if (!terminal || socket?.readyState !== WebSocket.OPEN) {
    setStatus('Connect a session first');
    return;
  }
  clearTerminalSelection();
  setCtrlArmed(false);
  let body = snippet.body.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  // Default from snippet.run; options.invert flips for long-press on pin.
  let shouldRun = snippet.run !== false;
  if (options.invert) {
    shouldRun = !shouldRun;
  }
  if (options.run === true) {
    shouldRun = true;
  }
  if (options.run === false) {
    shouldRun = false;
  }
  body = body.replace(/\n+$/g, '');
  if (shouldRun) {
    body = `${body}\n`;
  }
  if (!body) {
    setStatus('Snippet empty');
    return;
  }
  const sent = sendInput(body);
  if (!sent) {
    setStatus('Could not send snippet');
    return;
  }
  setStatus(shouldRun ? `Ran: ${snippet.label}` : `Inserted: ${snippet.label}`);
}

async function loadSnippetsFromServer() {
  if (snippetsLoadPromise) {
    return snippetsLoadPromise;
  }
  snippetsLoadPromise = (async () => {
    try {
      const documentValue = await api('/api/snippets');
      snippetsList = Array.isArray(documentValue.snippets)
        ? documentValue.snippets
        : [];
    } catch (error) {
      snippetsList = [];
      setStatus(error.message || 'Could not load snippets');
    } finally {
      snippetsLoadPromise = null;
    }
    if (footerDrawer === 'snips') {
      renderFooterDrawer();
    }
    renderFooterPins();
    renderSnippetEditor();
    return snippetsList;
  })();
  return snippetsLoadPromise;
}

async function saveSnippetsToServer(nextList) {
  const saved = await api('/api/snippets', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ version: 1, snippets: nextList })
  });
  snippetsList = Array.isArray(saved.snippets) ? saved.snippets : nextList;
  if (footerDrawer === 'snips') {
    renderFooterDrawer();
  }
  renderFooterPins();
  renderSnippetEditor();
  return snippetsList;
}

function renderSnippetEditor() {
  if (!snippetEditorList) {
    return;
  }
  snippetEditorList.replaceChildren();
  snippetsList.forEach((snippet, index) => {
    const item = document.createElement('li');
    item.className = 'shortcut-editor-item';
    item.dataset.snippetId = snippet.id;
    if (snippetEditorSelectedId === snippet.id) {
      item.classList.add('active');
    }

    const label = document.createElement('span');
    label.className = 'shortcut-editor-label';
    const runMark = snippet.run !== false ? '▸' : '·';
    label.textContent = `${runMark} ${snippet.label}`;
    label.title = `${snippet.run !== false ? 'Run' : 'Insert'}: ${snippet.body.slice(0, 120)}`;

    const actions = document.createElement('div');
    actions.className = 'shortcut-editor-actions';

    const edit = document.createElement('button');
    edit.type = 'button';
    edit.dataset.action = 'edit';
    edit.title = 'Edit';
    edit.setAttribute('aria-label', `Edit ${snippet.label}`);
    edit.textContent = '✎';

    const up = document.createElement('button');
    up.type = 'button';
    up.dataset.action = 'up';
    up.title = 'Move up';
    up.textContent = '↑';
    up.disabled = index === 0;

    const down = document.createElement('button');
    down.type = 'button';
    down.dataset.action = 'down';
    down.title = 'Move down';
    down.textContent = '↓';
    down.disabled = index === snippetsList.length - 1;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.dataset.action = 'remove';
    remove.title = 'Remove';
    remove.textContent = '×';

    actions.append(edit, up, down, remove);
    item.append(label, actions);
    snippetEditorList.append(item);
  });
}

function clearSnippetEditorForm() {
  snippetEditorSelectedId = null;
  if (snippetLabelInput) {
    snippetLabelInput.value = '';
  }
  if (snippetBodyInput) {
    snippetBodyInput.value = '';
  }
  if (snippetRunInput) {
    snippetRunInput.checked = true;
  }
  if (snippetSaveButton) {
    snippetSaveButton.textContent = 'Add snippet';
  }
  renderSnippetEditor();
}

function beginEditSnippet(id) {
  const snippet = snippetsList.find((entry) => entry.id === id);
  if (!snippet) {
    return;
  }
  snippetEditorSelectedId = id;
  if (snippetLabelInput) {
    snippetLabelInput.value = snippet.label;
  }
  if (snippetBodyInput) {
    snippetBodyInput.value = snippet.body;
  }
  if (snippetRunInput) {
    snippetRunInput.checked = snippet.run !== false;
  }
  if (snippetSaveButton) {
    snippetSaveButton.textContent = 'Save snippet';
  }
  renderSnippetEditor();
}

async function moveSnippet(id, delta) {
  const index = snippetsList.findIndex((entry) => entry.id === id);
  if (index < 0) {
    return;
  }
  const next = index + delta;
  if (next < 0 || next >= snippetsList.length) {
    return;
  }
  const copy = [...snippetsList];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  try {
    await saveSnippetsToServer(copy);
  } catch (error) {
    window.alert(error.message);
  }
}

async function removeSnippet(id) {
  const next = snippetsList.filter((entry) => entry.id !== id);
  if (snippetEditorSelectedId === id) {
    clearSnippetEditorForm();
  }
  try {
    await saveSnippetsToServer(next);
  } catch (error) {
    window.alert(error.message);
  }
}

async function saveSnippetFromForm() {
  const label = (snippetLabelInput?.value || '').trim();
  let body = snippetBodyInput?.value || '';
  const run = snippetRunInput ? snippetRunInput.checked : true;
  if (!label) {
    window.alert('Label is required');
    return;
  }
  if (!body.trim()) {
    window.alert('Body is required');
    return;
  }
  body = body.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const copy = [...snippetsList];
  if (snippetEditorSelectedId) {
    const index = copy.findIndex(
      (entry) => entry.id === snippetEditorSelectedId
    );
    if (index >= 0) {
      copy[index] = {
        ...copy[index],
        label,
        body,
        run,
        source: copy[index].source === 'preset' ? 'preset' : 'custom'
      };
    }
  } else {
    const id = `c-${Date.now().toString(36)}`;
    copy.push({ id, label, body, run, source: 'custom' });
  }
  try {
    await saveSnippetsToServer(copy);
    clearSnippetEditorForm();
    setStatus('Snippets saved');
  } catch (error) {
    window.alert(error.message);
  }
}

async function resetSnippetsToPresets() {
  if (!window.confirm('Reset snippets to built-in presets?')) {
    return;
  }
  try {
    // Empty list → server sanitize returns defaults when? Our sanitize returns
    // defaults if empty on write — but writeSnippetsDocument sanitize empty
    // becomes defaultSnippetsDocument. Sending { snippets: [] } works.
    await saveSnippetsToServer([]);
    clearSnippetEditorForm();
    setStatus('Snippets reset');
  } catch (error) {
    window.alert(error.message);
  }
}

function refreshKeysUi() {
  if (footerDrawer === 'keys') {
    renderFooterDrawer();
  }
  renderFooterPins();
  renderShortcutEditor();
  syncCustomKeyFormFields();
}

function syncCustomKeyFormFields() {
  const type = customKeyTypeSelect?.value || 'ctrl';
  if (customKeyValueInput) {
    const showValue = type === 'ctrl' || type === 'text';
    customKeyValueInput.hidden = !showValue;
    if (type === 'ctrl') {
      customKeyValueInput.placeholder = 'letter (a–z)';
      customKeyValueInput.maxLength = 1;
      customKeyValueInput.setAttribute('aria-label', 'Ctrl letter');
    } else if (type === 'text') {
      customKeyValueInput.placeholder = 'text or \\e \\x1b \\n';
      customKeyValueInput.maxLength = 64;
      customKeyValueInput.setAttribute('aria-label', 'Sequence');
    }
  }
  if (customKeyScrollSelect) {
    customKeyScrollSelect.hidden = type !== 'scroll';
  }
}

function createCustomKeyId() {
  const random =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  return `custom-${random}`;
}

function renderShortcutEditor() {
  if (!shortcutEditorList || !shortcutAddSelect) {
    return;
  }
  const ids = loadShortcutIds();
  shortcutEditorList.replaceChildren();
  ids.forEach((id, index) => {
    const def = getShortcutDef(id);
    if (!def) {
      return;
    }
    const item = document.createElement('li');
    item.className = 'shortcut-editor-item';
    item.dataset.shortcutId = id;

    const label = document.createElement('span');
    label.className = 'shortcut-editor-label';
    label.textContent = isCustomKeyId(id) ? `${def.label} · custom` : def.label;

    const actions = document.createElement('div');
    actions.className = 'shortcut-editor-actions';

    const up = document.createElement('button');
    up.type = 'button';
    up.dataset.action = 'up';
    up.title = 'Move up';
    up.setAttribute('aria-label', `Move ${def.label} up`);
    up.textContent = '↑';
    up.disabled = index === 0;

    const down = document.createElement('button');
    down.type = 'button';
    down.dataset.action = 'down';
    down.title = 'Move down';
    down.setAttribute('aria-label', `Move ${def.label} down`);
    down.textContent = '↓';
    down.disabled = index === ids.length - 1;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.dataset.action = 'remove';
    remove.title = isCustomKeyId(id)
      ? 'Remove from Keys and delete custom key'
      : 'Remove from Keys';
    remove.setAttribute('aria-label', `Remove ${def.label}`);
    remove.textContent = '×';

    actions.append(up, down, remove);
    item.append(label, actions);
    shortcutEditorList.append(item);
  });

  shortcutAddSelect.replaceChildren();
  let availableCount = 0;
  const active = new Set(ids);

  for (const group of builtinShortcutGroups) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.label;
    for (const id of group.ids) {
      if (active.has(id) || !Object.hasOwn(builtinShortcutCatalog, id)) {
        continue;
      }
      const option = document.createElement('option');
      option.value = id;
      option.textContent = builtinShortcutCatalog[id].label;
      optgroup.append(option);
      availableCount += 1;
    }
    if (optgroup.childElementCount > 0) {
      shortcutAddSelect.append(optgroup);
    }
  }

  const customDefs = loadCustomKeyDefs().filter((entry) => !active.has(entry.id));
  if (customDefs.length > 0) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = 'Custom';
    for (const def of customDefs) {
      const option = document.createElement('option');
      option.value = def.id;
      option.textContent = def.label;
      optgroup.append(option);
      availableCount += 1;
    }
    shortcutAddSelect.append(optgroup);
  }

  if (availableCount === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'All built-in keys added';
    shortcutAddSelect.append(option);
    shortcutAddSelect.disabled = true;
    if (shortcutAddButton) {
      shortcutAddButton.disabled = true;
    }
  } else {
    shortcutAddSelect.disabled = false;
    if (shortcutAddButton) {
      shortcutAddButton.disabled = false;
    }
  }
  syncCustomKeyFormFields();
}

function moveShortcut(id, delta) {
  const ids = loadShortcutIds();
  const index = ids.indexOf(id);
  if (index < 0) {
    return;
  }
  const next = index + delta;
  if (next < 0 || next >= ids.length) {
    return;
  }
  const copy = [...ids];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  saveShortcutIds(copy);
  refreshKeysUi();
}

function removeShortcut(id) {
  const ids = loadShortcutIds().filter((entry) => entry !== id);
  saveShortcutIds(ids);
  if (id === 'ctrl') {
    ctrlArmed = false;
  }
  // Removing a custom key also deletes its definition (re-create if needed).
  if (isCustomKeyId(id)) {
    saveCustomKeyDefs(loadCustomKeyDefs().filter((entry) => entry.id !== id));
    const pins = loadFooterPins().filter(
      (pin) => !(pin.kind === 'key' && pin.id === id)
    );
    saveFooterPins(pins);
  }
  refreshKeysUi();
}

function addShortcut(id) {
  if (!isKnownShortcutId(id)) {
    return;
  }
  const ids = loadShortcutIds();
  if (ids.includes(id)) {
    return;
  }
  ids.push(id);
  saveShortcutIds(ids);
  refreshKeysUi();
}

function addCustomKeyFromForm() {
  if (loadCustomKeyDefs().length >= maximumCustomKeys) {
    setStatus(`Custom key limit ${maximumCustomKeys}`);
    return;
  }
  const type = customKeyTypeSelect?.value || 'ctrl';
  let label = sanitizeCustomKeyLabel(customKeyLabelInput?.value || '');
  let def = null;

  if (type === 'ctrl') {
    const letter = String(customKeyValueInput?.value || '')
      .trim()
      .toLowerCase();
    if (!/^[a-z]$/.test(letter)) {
      setStatus('Enter a letter a–z for Ctrl+…');
      return;
    }
    if (!label) {
      label = `Ctrl+${letter.toUpperCase()}`;
    }
    def = {
      id: createCustomKeyId(),
      label,
      kind: 'sequence',
      sequence: String.fromCharCode(letter.toUpperCase().charCodeAt(0) - 64)
    };
  } else if (type === 'scroll') {
    const scroll = customKeyScrollSelect?.value || 'bottom';
    if (scroll !== 'up' && scroll !== 'down' && scroll !== 'bottom') {
      setStatus('Pick a scroll action');
      return;
    }
    if (!label) {
      label =
        scroll === 'up' ? 'PgUp' : scroll === 'down' ? 'PgDn' : 'Bottom';
    }
    def = {
      id: createCustomKeyId(),
      label,
      kind: 'scroll',
      scroll
    };
  } else if (type === 'text') {
    const sequence = parseSequenceSpec(customKeyValueInput?.value || '');
    if (!sequence) {
      setStatus('Invalid sequence (try \\e, \\x1b, text)');
      return;
    }
    if (!label) {
      setStatus('Label required for custom sequence');
      return;
    }
    def = {
      id: createCustomKeyId(),
      label,
      kind: 'sequence',
      sequence
    };
  } else {
    setStatus('Unknown key type');
    return;
  }

  const cleaned = sanitizeCustomKeyDef(def);
  if (!cleaned) {
    setStatus('Could not save custom key');
    return;
  }
  const nextDefs = [...loadCustomKeyDefs(), cleaned];
  saveCustomKeyDefs(nextDefs);
  const ids = loadShortcutIds();
  if (!ids.includes(cleaned.id)) {
    ids.push(cleaned.id);
    saveShortcutIds(ids);
  }
  if (customKeyLabelInput) {
    customKeyLabelInput.value = '';
  }
  if (customKeyValueInput) {
    customKeyValueInput.value = '';
  }
  setStatus(`Added: ${cleaned.label}`);
  refreshKeysUi();
}

function resetShortcuts() {
  saveShortcutIds([...defaultShortcutIds]);
  // Keep custom key definitions; only reset which chips are active to defaults.
  ctrlArmed = false;
  refreshKeysUi();
}

function transformedInput(data) {
  if (!ctrlArmed) {
    return data;
  }
  setCtrlArmed(false);
  if (data.length === 1 && /^[A-Za-z]$/.test(data)) {
    return String.fromCharCode(data.toUpperCase().charCodeAt(0) - 64);
  }
  return data;
}

function sendInput(data) {
  if (
    socket?.readyState !== WebSocket.OPEN ||
    typeof data !== 'string'
  ) {
    return false;
  }
  socket.send(JSON.stringify({ type: 'input', data: transformedInput(data) }));
  return true;
}

function clearTerminalSelection() {
  xtermTouchSelecting = false;
  xtermSelectionAnchor = null;
  terminal?.clearSelection();
  window.getSelection()?.removeAllRanges();
  hideSelectionCopyChip();
  pasteButton.classList.remove('copy-needs-attention');
  updateClipboardButton();
  // Selection is done — allow the keyboard-dismiss resize to finish now.
  if (holdKeyboardLayoutForSelection) {
    holdKeyboardLayoutForSelection = false;
    if (!terminalInputIsFocused()) {
      releaseKeyboardLayoutLock();
    }
  }
}

function hideSelectionCopyChip() {
  if (!selectionCopyChip) {
    return;
  }
  selectionCopyChip.hidden = true;
}

function showSelectionCopyChip(clientX, clientY) {
  if (!selectionCopyChip) {
    return;
  }
  const margin = 12;
  const maxX = Math.max(margin, window.innerWidth - margin);
  const maxY = Math.max(margin, window.innerHeight - margin);
  const x = Math.min(maxX, Math.max(margin, clientX || lastTouchClientX || window.innerWidth / 2));
  const y = Math.min(maxY, Math.max(margin, clientY || lastTouchClientY || window.innerHeight / 2));
  selectionCopyChip.style.left = `${Math.round(x)}px`;
  selectionCopyChip.style.top = `${Math.round(y)}px`;
  selectionCopyChip.hidden = false;
  pasteButton.classList.add('copy-needs-attention');
}

function markCopyNeedsAttention(clientX, clientY) {
  showSelectionCopyChip(clientX, clientY);
}

function terminalInputIsFocused() {
  return Boolean(
    document.activeElement && terminalElement.contains(document.activeElement)
  );
}

function terminalHasCopyableSelection() {
  return Boolean(terminal?.hasSelection());
}

const clientDebugEntries = [];
const maximumClientDebugEntries = 250;

function clientDebug(event, detail = {}) {
  const entry = {
    t: new Date().toISOString(),
    event,
    detail
  };
  clientDebugEntries.push(entry);
  if (clientDebugEntries.length > maximumClientDebugEntries) {
    clientDebugEntries.splice(
      0,
      clientDebugEntries.length - maximumClientDebugEntries
    );
  }
  try {
    console.debug('[vps-terminal]', event, detail);
  } catch {
    // Ignore console failures.
  }
  // Best-effort ship to the server so we can inspect after a device test.
  try {
    fetch('/api/client-debug', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries: [entry] }),
      keepalive: true
    }).catch(() => {});
  } catch {
    // Ignore transport failures.
  }
}

function selectionDebugSnapshot(extra = {}) {
  const position = terminal?.getSelectionPosition?.() || null;
  const apiText = terminal?.getSelection?.() || '';
  return {
    hasSelection: Boolean(terminal?.hasSelection?.()),
    apiLength: apiText.length,
    apiLines: apiText ? apiText.split('\n').length : 0,
    apiPreview: apiText.slice(0, 48).replace(/[^\x20-\x7E\n]/g, '?'),
    position,
    holdKeyboardLayoutForSelection,
    xtermTouchSelecting,
    ...extra
  };
}

function readBufferRangeText(start, end) {
  if (!terminal || !start || !end) {
    return '';
  }
  const buffer = terminal.buffer.active;
  const lines = [];
  const firstY = Math.min(start.y, end.y);
  const lastY = Math.max(start.y, end.y);
  for (let row = firstY; row <= lastY; row += 1) {
    const line = buffer.getLine(row);
    if (!line) {
      lines.push('');
      continue;
    }
    let startCol = 0;
    let endCol = terminal.cols - 1;
    if (row === start.y && row === end.y) {
      startCol = Math.min(start.x, end.x);
      endCol = Math.max(start.x, end.x);
    } else if (row === firstY) {
      startCol = firstY === start.y ? start.x : end.x;
    } else if (row === lastY) {
      endCol = lastY === end.y ? end.x : start.x;
    }
    startCol = Math.max(0, Math.min(terminal.cols - 1, startCol));
    endCol = Math.max(0, Math.min(terminal.cols - 1, endCol));
    let text = '';
    for (let column = startCol; column <= endCol; column += 1) {
      const cell = line.getCell(column);
      if (!cell || cell.getWidth() === 0) {
        continue;
      }
      const chars = cell.getChars();
      text += chars && chars.length > 0 ? chars : ' ';
    }
    lines.push(text.replace(/[ \t]+$/g, ''));
  }
  return lines.join('\n');
}

function readTerminalSelectionText() {
  if (!terminal?.hasSelection()) {
    return '';
  }
  const apiText = terminal.getSelection() || '';
  if (apiText.length > 0) {
    return apiText;
  }
  // Fallback when getSelection() is empty for multi-line ranges.
  const position = terminal.getSelectionPosition?.();
  if (!position) {
    return '';
  }
  return readBufferRangeText(position.start, position.end);
}

function updateClipboardButton() {
  const canCopy = terminalHasCopyableSelection();
  pasteButton.classList.toggle('copy-mode', canCopy);
  pasteButton.title = canCopy ? 'Copy selection' : 'Paste';
  pasteButton.setAttribute('aria-label', canCopy ? 'Copy selection' : 'Paste');
}

function clearNativeSelectionLongPressTimer() {
  clearTimeout(nativeSelectionLongPressTimer);
  nativeSelectionLongPressTimer = null;
}

function updateScrollCatcherMode() {
  if (!scrollCatcherElement || !nativeTouchSelection) {
    if (scrollCatcherElement) {
      scrollCatcherElement.hidden = true;
    }
    return;
  }
  scrollCatcherElement.hidden = terminalElement.hidden;
}

function terminalCellFromPoint(clientX, clientY) {
  if (!terminal?.element) {
    return null;
  }
  const screen =
    terminal.element.querySelector('.xterm-screen') || terminal.element;
  const bounds = screen.getBoundingClientRect();
  if (bounds.width <= 0 || bounds.height <= 0) {
    return null;
  }
  const col = Math.min(
    terminal.cols - 1,
    Math.max(
      0,
      Math.floor(((clientX - bounds.left) / bounds.width) * terminal.cols)
    )
  );
  const row = Math.min(
    terminal.rows - 1,
    Math.max(
      0,
      Math.floor(((clientY - bounds.top) / bounds.height) * terminal.rows)
    )
  );
  return { col, row };
}

function bufferCellIsSelectable(line, column) {
  if (!line || column < 0) {
    return false;
  }
  const cell = line.getCell(column);
  if (!cell || cell.getWidth() === 0) {
    return false;
  }
  const chars = cell.getChars();
  return Boolean(chars && /\S/.test(chars));
}

function selectWordAtTerminalCell(cell) {
  if (!terminal) {
    return cell;
  }
  const buffer = terminal.buffer.active;
  const row = cell.row + buffer.viewportY;
  const line = buffer.getLine(row);
  if (!line || !bufferCellIsSelectable(line, cell.col)) {
    terminal.select(cell.col, row, 1);
    return cell;
  }
  let start = cell.col;
  let end = cell.col;
  while (start > 0 && bufferCellIsSelectable(line, start - 1)) {
    start -= 1;
  }
  while (
    end < terminal.cols - 1 &&
    bufferCellIsSelectable(line, end + 1)
  ) {
    end += 1;
  }
  terminal.select(start, row, end - start + 1);
  return { col: start, row: cell.row };
}

function beginXtermTouchSelection(clientX, clientY) {
  if (!terminal || nativeTouchScrolling) {
    return;
  }
  const cell = terminalCellFromPoint(clientX, clientY);
  if (!cell) {
    return;
  }
  clearNativeSelectionLongPressTimer();
  xtermTouchSelecting = true;
  touchMoved = true;
  window.getSelection()?.removeAllRanges();
  xtermSelectionAnchor = selectWordAtTerminalCell(cell);
  updateClipboardButton();
}

function applyXtermTouchSelection(endCell) {
  if (!terminal || !xtermSelectionAnchor || !endCell) {
    return;
  }
  const buffer = terminal.buffer.active;
  let startCol = xtermSelectionAnchor.col;
  let startRow = xtermSelectionAnchor.row + buffer.viewportY;
  let endCol = endCell.col;
  let endRow = endCell.row + buffer.viewportY;
  if (startRow > endRow || (startRow === endRow && startCol > endCol)) {
    const swapCol = startCol;
    const swapRow = startRow;
    startCol = endCol;
    startRow = endRow;
    endCol = swapCol;
    endRow = swapRow;
  }
  if (startRow === endRow) {
    terminal.select(startCol, startRow, Math.max(1, endCol - startCol + 1));
  } else {
    // selectLines is whole-line only. Prefer line-by-line select for the first
    // and last partial lines by selecting the full span via repeated API:
    // xterm has no selectRange, so use selectLines then rely on buffer text
    // extraction for copy accuracy of partial end columns.
    terminal.selectLines(startRow, endRow);
  }
  // Throttle drag logs; release/copy events still capture the final range.
  const now = window.performance.now();
  if (now - lastSelectionApplyLogAt >= 250) {
    lastSelectionApplyLogAt = now;
    clientDebug(
      'selection-apply',
      selectionDebugSnapshot({
        startCol,
        startRow,
        endCol,
        endRow,
        multiLine: startRow !== endRow
      })
    );
  }
}

function armTerminalSelectionLongPress() {
  clearNativeSelectionLongPressTimer();
  if (!nativeTouchSelection) {
    return;
  }
  nativeSelectionLongPressTimer = window.setTimeout(() => {
    nativeSelectionLongPressTimer = null;
    if (
      nativeTouchStartX === null ||
      nativeTouchScrolling ||
      nativeTouchMaxDistance >= nativeScrollActivationDistance
    ) {
      return;
    }
    beginLongPressTerminalSelection(
      nativeTouchStartX,
      nativeTouchStartY
    );
  }, nativeSelectionLongPressMilliseconds);
}

function beginLongPressTerminalSelection(clientX, clientY) {
  if (nativeTouchScrolling || !terminal) {
    return;
  }
  clientDebug('selection-long-press', {
    clientX: Math.round(clientX),
    clientY: Math.round(clientY),
    keyboardFocused: terminalInputIsFocused(),
    keyboardReduced: keyboardViewportIsReduced()
  });
  // Freeze the current keyboard-open size BEFORE blur. Otherwise blur releases
  // the layout lock, fit() resizes rows, and the new selection is wiped.
  if (
    terminalInputIsFocused() ||
    keyboardLayoutLock ||
    keyboardViewportIsReduced()
  ) {
    if (!keyboardLayoutLock) {
      captureKeyboardLayoutLock();
    }
    holdKeyboardLayoutForSelection = true;
    keyboardDismissing = false;
    clearTimeout(keyboardDismissPollTimer);
    keyboardDismissPollTimer = null;
  }
  if (terminalInputIsFocused()) {
    terminal.blur();
  }
  beginXtermTouchSelection(clientX, clientY);
  updateClipboardButton();
  clientDebug('selection-started', selectionDebugSnapshot());
  if (terminal.hasSelection()) {
    setStatus('Selected — drag to adjust');
  }
}

function applySelectionViewportLockStyles() {
  if (!selectionViewportLock) {
    return;
  }
  const height = selectionViewportLock.height;
  const top = selectionViewportLock.top;
  if (
    height === lastAppliedViewportHeight &&
    top === lastAppliedViewportTop &&
    document.documentElement.classList.contains('keyboard-open')
  ) {
    return;
  }
  lastAppliedViewportHeight = height;
  lastAppliedViewportTop = top;
  document.documentElement.classList.add('keyboard-open');
  document.documentElement.classList.remove('standalone-reserved-bottom');
  document.documentElement.style.setProperty('--app-height', `${height}px`);
  document.documentElement.style.setProperty('--app-top', `${top}px`);
}

function preserveKeyboardState(event) {
  const button = event.target.closest?.('button');
  if (!button) {
    return;
  }
  if (terminalInputIsFocused()) {
    event.preventDefault();
  }
}

function setKeyboardButtonState(visible) {
  keyboardButton.classList.toggle('active', visible);
  keyboardButton.setAttribute('aria-pressed', String(visible));
  const keyboardLabel = visible ? 'Hide keyboard' : 'Show keyboard';
  keyboardButton.title = keyboardLabel;
  keyboardButton.setAttribute('aria-label', keyboardLabel);
}

function primeNativeTerminalInput() {
  const textarea = terminal?.textarea;
  if (
    !nativeTouchSelection ||
    !textarea ||
    nativeInputComposing ||
    document.activeElement !== textarea
  ) {
    return;
  }
  textarea.value = nativeInputSentinel;
  textarea.setSelectionRange(
    nativeInputSentinel.length,
    nativeInputSentinel.length
  );
}

function scheduleNativeTerminalInputPrime() {
  clearTimeout(nativeInputSentinelTimer);
  nativeInputSentinelTimer = setTimeout(() => {
    nativeInputSentinelTimer = null;
    primeNativeTerminalInput();
  }, 0);
}

function stopNativeDeleteRepeat() {
  clearTimeout(nativeDeleteRepeatDelayTimer);
  clearInterval(nativeDeleteRepeatIntervalTimer);
  nativeDeleteRepeatDelayTimer = null;
  nativeDeleteRepeatIntervalTimer = null;
}

function startNativeDeleteRepeat(deleteSequence) {
  stopNativeDeleteRepeat();
  nativeDeleteRepeatDelayTimer = setTimeout(() => {
    nativeDeleteRepeatDelayTimer = null;
    nativeDeleteRepeatIntervalTimer = setInterval(() => {
      nativeDeleteKeyDownAt = window.performance.now();
      sendInput(deleteSequence);
      scheduleNativeTerminalInputPrime();
    }, nativeDeleteRepeatIntervalMilliseconds);
  }, nativeDeleteRepeatDelayMilliseconds);
}

/**
 * Browser chords we never claim from a document-level bridge
 * (reload, new tab, close tab, address bar, print, quit, devtools).
 * When the xterm textarea is focused, xterm still owns shell Ctrl chords.
 */
function isBrowserReservedHardwareChord(event) {
  if (!event || event.isComposing) {
    return false;
  }
  const key = event.key;
  if (key === 'F5' || key === 'F11' || key === 'F12') {
    return true;
  }
  const lower = typeof key === 'string' ? key.toLowerCase() : '';
  const mod = event.ctrlKey || event.metaKey;
  if (!mod) {
    return false;
  }
  // Hard reload / devtools / inspect.
  if (event.shiftKey && ['r', 'i', 'j', 'c', 'k'].includes(lower)) {
    return true;
  }
  // Reload (leave free when focus is outside the terminal).
  if (!event.shiftKey && !event.altKey && lower === 'r') {
    return true;
  }
  // Tab chrome / window / print — not shell.
  if (!event.altKey && ['w', 't', 'n', 'l', 'q', 'p'].includes(lower)) {
    return true;
  }
  // Browser tab cycle.
  if (key === 'Tab' && (event.ctrlKey || event.metaKey)) {
    return true;
  }
  return false;
}

function isHardwareKeyboardUiCaptureTarget(target) {
  if (!(target instanceof Element)) {
    return false;
  }
  // Find, settings, Files, and form fields keep keyboard focus.
  if (target.closest('#find-bar')) {
    return true;
  }
  if (target.closest('#files-panel')) {
    return true;
  }
  if (target.closest('dialog')) {
    return true;
  }
  const field = target.closest('input, textarea, select, [contenteditable="true"]');
  if (!field) {
    return false;
  }
  // xterm's helper textarea is the terminal focus target — not a UI capture field.
  if (terminal?.textarea && (field === terminal.textarea || terminal.textarea.contains(field))) {
    return false;
  }
  return true;
}

/** CSI / C0 sequences for keys we bridge when focus is on chrome, not xterm. */
function hardwareKeySequence(event) {
  if (!event || event.type !== 'keydown' || event.isComposing) {
    return null;
  }
  const key = event.key;
  if (!key || key === 'Unidentified') {
    return null;
  }
  // Modifier-only.
  if (
    key === 'Control' ||
    key === 'Shift' ||
    key === 'Alt' ||
    key === 'Meta' ||
    key === 'CapsLock' ||
    key === 'Dead'
  ) {
    return null;
  }

  const esc = '\u001b';
  // Ctrl+letter → C0 (shell interrupt, etc.). Ignore meta-only browser chords here.
  if (event.ctrlKey && !event.metaKey && !event.altKey && key.length === 1) {
    const code = key.toUpperCase().charCodeAt(0);
    if (code >= 64 && code <= 95) {
      return String.fromCharCode(code - 64);
    }
  }

  // Alt/Option as meta: ESC + key (matches macOptionIsMeta).
  if (event.altKey && !event.ctrlKey && !event.metaKey && key.length === 1) {
    return esc + key;
  }

  if (event.metaKey && !event.ctrlKey) {
    // Leave Cmd+… to the browser unless we already handled find.
    return null;
  }

  switch (key) {
    case 'Escape':
      return esc;
    case 'Tab':
      return event.shiftKey ? `${esc}[Z` : '\t';
    case 'Enter':
      return '\r';
    case 'Backspace':
      return event.ctrlKey ? '\b' : '\u007f';
    case 'Delete':
      return `${esc}[3~`;
    case 'Insert':
      return `${esc}[2~`;
    case 'Home':
      return `${esc}[H`;
    case 'End':
      return `${esc}[F`;
    case 'PageUp':
      return event.shiftKey ? null : `${esc}[5~`;
    case 'PageDown':
      return event.shiftKey ? null : `${esc}[6~`;
    case 'ArrowUp':
      return `${esc}[A`;
    case 'ArrowDown':
      return `${esc}[B`;
    case 'ArrowRight':
      return `${esc}[C`;
    case 'ArrowLeft':
      return `${esc}[D`;
    case 'F1':
    case 'F2':
    case 'F3':
    case 'F4':
    case 'F5':
    case 'F6':
    case 'F7':
    case 'F8':
    case 'F9':
    case 'F10':
    case 'F11':
    case 'F12': {
      // F5/F11/F12 stay browser-reserved in the chrome bridge; xterm owns them when focused.
      const fKeys = {
        F1: `${esc}OP`,
        F2: `${esc}OQ`,
        F3: `${esc}OR`,
        F4: `${esc}OS`,
        F5: `${esc}[15~`,
        F6: `${esc}[17~`,
        F7: `${esc}[18~`,
        F8: `${esc}[19~`,
        F9: `${esc}[20~`,
        F10: `${esc}[21~`,
        F11: `${esc}[23~`,
        F12: `${esc}[24~`
      };
      return fKeys[key] || null;
    }
    default:
      break;
  }

  // Printable without modifiers (or with Shift only).
  if (
    key.length === 1 &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey
  ) {
    return key;
  }
  return null;
}

function handleNativeTerminalKeyEvent(event) {
  // Ctrl/Cmd+F opens scrollback find (all platforms).
  if (
    event.type === 'keydown' &&
    !event.isComposing &&
    (event.key === 'f' || event.key === 'F') &&
    (event.ctrlKey || event.metaKey) &&
    !event.altKey
  ) {
    event.preventDefault();
    openFindBar();
    return false;
  }
  if (event.type === 'keydown' && event.key === 'Escape' && isFindBarOpen()) {
    event.preventDefault();
    closeFindBar();
    return false;
  }
  // Keep Tab inside the terminal (don't move focus to footer/chrome).
  if (
    event.type === 'keydown' &&
    event.key === 'Tab' &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey
  ) {
    // Let xterm emit the sequence; only cancel browser focus traversal.
    event.preventDefault();
    return true;
  }
  if (
    !nativeTouchSelection ||
    event.isComposing ||
    (event.key !== 'Backspace' && event.keyCode !== 8)
  ) {
    return true;
  }
  event.preventDefault();
  if (event.type === 'keyup') {
    stopNativeDeleteRepeat();
    return false;
  }
  if (event.type !== 'keydown') {
    return false;
  }
  if (nativeDeleteRepeatIntervalTimer !== null) {
    return false;
  }
  nativeDeleteKeyDownAt = window.performance.now();
  const deleteSequence = `${event.altKey ? '\u001b' : ''}${
    event.ctrlKey ? '\b' : '\u007f'
  }`;
  sendInput(deleteSequence);
  scheduleNativeTerminalInputPrime();
  if (nativeDeleteRepeatDelayTimer === null) {
    startNativeDeleteRepeat(deleteSequence);
  }
  return false;
}

/**
 * When a session is live but focus is on footer/chrome (not find/settings),
 * route hardware keyboard input into the PTY so arrows/Tab/Esc/Ctrl work
 * without first tapping the keyboard button.
 */
function handleHardwareKeyboardBridge(event) {
  if (event.type !== 'keydown' || event.isComposing || event.defaultPrevented) {
    return;
  }
  if (viewMode === 'files') {
    return;
  }
  if (!terminal || !activeSession || terminalElement?.hidden) {
    return;
  }
  if (isHardwareKeyboardUiCaptureTarget(event.target)) {
    return;
  }
  // xterm already owns events on its textarea.
  if (terminalInputIsFocused()) {
    return;
  }
  // Find open but focus elsewhere (e.g. footer): Esc closes find first.
  if (event.key === 'Escape' && isFindBarOpen()) {
    event.preventDefault();
    closeFindBar();
    return;
  }
  // Ctrl/Cmd+F is handled by the global find listener; skip here.
  if (
    (event.key === 'f' || event.key === 'F') &&
    (event.ctrlKey || event.metaKey) &&
    !event.altKey
  ) {
    return;
  }
  if (isBrowserReservedHardwareChord(event)) {
    return;
  }
  const sequence = hardwareKeySequence(event);
  if (sequence === null) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  clearTerminalSelection();
  // Prefer focusing so subsequent keys go through xterm natively.
  try {
    terminal.focus();
  } catch {
    // Ignore focus failures; still deliver this key.
  }
  sendInput(sequence);
  scheduleNativeTerminalInputPrime();
}

function handleNativeTerminalDeleteInput(event) {
  if (
    !nativeTouchSelection ||
    event.isComposing ||
    event.inputType !== 'deleteContentBackward'
  ) {
    return;
  }
  if (event.type === 'beforeinput') {
    const now = window.performance.now();
    nativeDeleteBeforeInputAt = now;
    if (event.cancelable) {
      event.preventDefault();
    }
    if (
      now - nativeDeleteKeyDownAt >
      nativeDeleteDeduplicationMilliseconds
    ) {
      sendInput('\u007f');
    }
    scheduleNativeTerminalInputPrime();
    return;
  }
  const now = window.performance.now();
  if (
    now - nativeDeleteBeforeInputAt >
      nativeDeleteDeduplicationMilliseconds &&
    now - nativeDeleteKeyDownAt >
      nativeDeleteDeduplicationMilliseconds
  ) {
    sendInput('\u007f');
  }
  scheduleNativeTerminalInputPrime();
}

function toggleKeyboard() {
  if (!terminal || !activeSession) {
    return;
  }
  if (terminalInputIsFocused()) {
    terminal.blur();
    return;
  }
  clearTerminalSelection();
  terminal.focus();
}

function hideScrollPosition() {
  clearTimeout(scrollPositionTimer);
  scrollPositionTimer = null;
  scrollPositionElement.hidden = true;
  scrollThumbElement.classList.remove('visible');
}

function showScrollPosition(viewportY) {
  if (!terminal) {
    return;
  }
  const buffer = terminal.buffer.active;
  const trackHeight = Math.max(0, terminalElement.clientHeight - 20);
  if (buffer.length <= terminal.rows || trackHeight === 0) {
    hideScrollPosition();
    return;
  }
  const visibleEnd = Math.min(buffer.length, viewportY + terminal.rows);
  const thumbHeight = Math.max(
    20,
    trackHeight * Math.min(1, terminal.rows / buffer.length)
  );
  const progress =
    buffer.baseY > 0
      ? Math.min(1, Math.max(0, viewportY / buffer.baseY))
      : 1;
  scrollPositionElement.textContent = `${visibleEnd} / ${buffer.length}`;
  scrollPositionElement.hidden = false;
  scrollThumbElement.style.top =
    `${10 + (trackHeight - thumbHeight) * progress}px`;
  scrollThumbElement.style.height = `${thumbHeight}px`;
  scrollThumbElement.classList.add('visible');
  clearTimeout(scrollPositionTimer);
  scrollPositionTimer = setTimeout(hideScrollPosition, 1100);
}

function rememberedSession() {
  try {
    return window.localStorage.getItem(activeSessionStorageKey);
  } catch {
    return null;
  }
}

function rememberSession(name) {
  try {
    window.localStorage.setItem(activeSessionStorageKey, name);
  } catch {
    // Continue without persistence when browser storage is unavailable.
  }
}

function rememberedFontSize() {
  try {
    const value = Number(window.localStorage.getItem(terminalFontSizeStorageKey));
    if (
      Number.isFinite(value) &&
      value >= minimumTerminalFontSize &&
      value <= maximumTerminalFontSize
    ) {
      return value;
    }
  } catch {
    // Continue with the default size when browser storage is unavailable.
  }
  return defaultTerminalFontSize;
}

function rememberFontSize() {
  try {
    window.localStorage.setItem(
      terminalFontSizeStorageKey,
      String(terminalFontSize)
    );
  } catch {
    // Continue without persistence when browser storage is unavailable.
  }
}

function resolveThemeName(name) {
  if (name === 'termius') {
    return 'matrix';
  }
  return name;
}

function rememberedTerminalThemeName() {
  try {
    const value = resolveThemeName(
      window.localStorage.getItem(terminalThemeStorageKey)
    );
    if (value && Object.hasOwn(terminalThemes, value)) {
      return value;
    }
  } catch {
    // Continue with the default theme when browser storage is unavailable.
  }
  return 'matrix';
}

function loadSessionThemes() {
  try {
    const raw = window.localStorage.getItem(sessionThemeStorageKey);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function saveSessionThemes(map) {
  try {
    window.localStorage.setItem(sessionThemeStorageKey, JSON.stringify(map));
  } catch {
    // Continue without persistence when browser storage is unavailable.
  }
}

function themeForSession(sessionName) {
  if (!sessionName) {
    return rememberedTerminalThemeName();
  }
  const map = loadSessionThemes();
  const value = resolveThemeName(map[sessionName]);
  if (value && Object.hasOwn(terminalThemes, value)) {
    return value;
  }
  return rememberedTerminalThemeName();
}

function rememberSessionTheme(sessionName, themeName) {
  if (!sessionName || !Object.hasOwn(terminalThemes, themeName)) {
    return;
  }
  const map = loadSessionThemes();
  map[sessionName] = themeName;
  saveSessionThemes(map);
}

function renameSessionTheme(fromName, toName) {
  if (!fromName || !toName || fromName === toName) {
    return;
  }
  const map = loadSessionThemes();
  if (!Object.hasOwn(map, fromName)) {
    return;
  }
  if (!Object.hasOwn(map, toName)) {
    map[toName] = map[fromName];
  }
  delete map[fromName];
  saveSessionThemes(map);
}

function populateThemeSelect() {
  if (!terminalThemeElement) {
    return;
  }
  terminalThemeElement.replaceChildren();
  for (const [id, label] of Object.entries(terminalThemeLabels)) {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = label;
    terminalThemeElement.append(option);
  }
  terminalThemeElement.value = terminalThemeName;
}

function applyTerminalTheme(name, options = {}) {
  const persist = options.persist !== false;
  const resolved = resolveThemeName(name);
  if (!Object.hasOwn(terminalThemes, resolved)) {
    return;
  }
  terminalThemeName = resolved;
  if (terminalThemeElement) {
    terminalThemeElement.value = resolved;
  }
  if (terminal) {
    terminal.options.theme = terminalThemes[resolved];
  }
  const background = terminalThemes[resolved].background;
  document.documentElement.style.setProperty('--terminal-bg', background);
  if (!persist) {
    return;
  }
  try {
    window.localStorage.setItem(terminalThemeStorageKey, resolved);
  } catch {
    // Continue without persistence when browser storage is unavailable.
  }
  if (activeSession) {
    rememberSessionTheme(activeSession, resolved);
  }
}

function runningAsInstalledWebApp() {
  return Boolean(
    window.navigator.standalone ||
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches
  );
}

function updateInstallSettings() {
  if (runningAsInstalledWebApp()) {
    installAppButton.disabled = true;
    installAppButton.textContent = 'Installed';
    installHelpElement.textContent =
      'Running without Safari browser controls.';
    return;
  }
  installAppButton.disabled = false;
  installAppButton.textContent = deferredInstallPrompt
    ? 'Install web app'
    : 'Installation steps';
  const appleTouchDevice =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  installHelpElement.textContent = appleTouchDevice
    ? 'In Safari, tap Share, choose Add to Home Screen, keep Open as Web App enabled, then launch VPS from its Home Screen icon.'
    : deferredInstallPrompt
      ? 'Install for a standalone terminal without browser controls.'
      : 'Use your browser menu and choose Install app or Add to Home Screen.';
}

async function installWebApp() {
  if (!deferredInstallPrompt) {
    updateInstallSettings();
    return;
  }
  const prompt = deferredInstallPrompt;
  deferredInstallPrompt = null;
  await prompt.prompt();
  await prompt.userChoice;
  updateInstallSettings();
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'same-origin',
    redirect: 'manual',
    ...options
  });
  if (response.type === 'opaqueredirect' || response.status === 0) {
    window.location.reload();
    throw new Error('Authentication expired');
  }
  const type = response.headers.get('content-type') || '';
  if (!type.includes('application/json')) {
    window.location.reload();
    throw new Error('Authentication expired');
  }
  const value = await response.json();
  if (!response.ok) {
    throw new Error(value.error || 'Request failed');
  }
  return value;
}

function loadViewMode() {
  try {
    return window.localStorage.getItem(viewModeStorageKey) === 'files'
      ? 'files'
      : 'term';
  } catch {
    return 'term';
  }
}

function saveViewMode(mode) {
  try {
    window.localStorage.setItem(
      viewModeStorageKey,
      mode === 'files' ? 'files' : 'term'
    );
  } catch {
    // ignore
  }
}

function loadFilesNav() {
  try {
    const raw = window.localStorage.getItem(filesNavStorageKey);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    if (typeof parsed?.root === 'string' && /^[a-z][a-z0-9_-]{0,31}$/.test(parsed.root)) {
      filesRootId = parsed.root;
    }
    if (typeof parsed?.path === 'string' && !parsed.path.includes('..')) {
      filesPath = parsed.path;
    }
  } catch {
    // ignore
  }
  try {
    filesShowHidden =
      window.localStorage.getItem(filesShowHiddenStorageKey) === '1';
  } catch {
    filesShowHidden = false;
  }
}

function saveFilesShowHidden() {
  try {
    window.localStorage.setItem(
      filesShowHiddenStorageKey,
      filesShowHidden ? '1' : '0'
    );
  } catch {
    // ignore
  }
}

function isHiddenFileName(name) {
  return typeof name === 'string' && name.startsWith('.') && name !== '.' && name !== '..';
}

function filesRootMeta(rootId) {
  return (
    filesRootsCatalog.find((entry) => entry.id === rootId) ||
    filesRootsCatalog[0] ||
    null
  );
}

function filesDisplayPrefix(rootId) {
  const meta = filesRootMeta(rootId);
  if (meta?.displayPrefix) {
    return meta.displayPrefix;
  }
  if (rootId === 'home') {
    return '~';
  }
  return `~/${rootId || 'home'}`;
}

function saveFilesNav() {
  try {
    window.localStorage.setItem(
      filesNavStorageKey,
      JSON.stringify({ root: filesRootId, path: filesPath })
    );
  } catch {
    // ignore
  }
}

function formatFilesSize(bytes) {
  const n = Number(bytes) || 0;
  if (n < 1024) {
    return `${n} B`;
  }
  if (n < 1024 * 1024) {
    return `${(n / 1024).toFixed(n < 10 * 1024 ? 1 : 0)} KB`;
  }
  return `${(n / (1024 * 1024)).toFixed(n < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

function formatFilesMtime(ms) {
  if (!ms) {
    return '';
  }
  try {
    return new Date(ms).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
}

function filesDisplayPath(rootId, relativePath) {
  const prefix = filesDisplayPrefix(rootId);
  return relativePath ? `${prefix}/${relativePath}` : prefix;
}

function setViewMode(mode, options = {}) {
  const next = mode === 'files' ? 'files' : 'term';
  viewMode = next;
  if (options.persist !== false) {
    saveViewMode(next);
  }
  document.body.classList.toggle('files-view', next === 'files');
  document.querySelectorAll('[data-view-mode]').forEach((button) => {
    button.setAttribute(
      'aria-selected',
      String(button.dataset.viewMode === next)
    );
  });
  if (filesPanelElement) {
    filesPanelElement.hidden = next !== 'files';
  }
  if (footerTermElement) {
    footerTermElement.hidden = next === 'files';
  }
  if (footerFilesElement) {
    footerFilesElement.hidden = next !== 'files';
  }
  if (next === 'files') {
    closeFindBar();
    closeFooterDrawer();
    terminal?.blur();
    // Collapse session chrome — not used in Files.
    setHeaderCollapsed(true);
    if (emptyElement) {
      emptyElement.hidden = true;
    }
    if (terminalElement) {
      terminalElement.hidden = true;
    }
    updateScrollCatcherMode();
    void ensureFilesRoots().then(() => refreshFilesListing());
    return;
  }
  // Term mode: show empty or terminal based on session.
  if (activeSession) {
    if (emptyElement) {
      emptyElement.hidden = true;
    }
    if (terminalElement) {
      terminalElement.hidden = false;
    }
    updateScrollCatcherMode();
    scheduleFit();
  } else {
    if (emptyElement) {
      emptyElement.hidden = false;
    }
    if (terminalElement) {
      terminalElement.hidden = true;
    }
    updateScrollCatcherMode();
  }
}

async function ensureFilesRoots() {
  if (filesRootsCatalog.length > 0) {
    return filesRootsCatalog;
  }
  try {
    const value = await api('/api/fs/roots');
    filesRootsCatalog = Array.isArray(value.roots) ? value.roots : [];
  } catch (error) {
    filesRootsCatalog = [
      { id: 'home', label: 'home', displayPrefix: '~', writable: true },
      { id: 'projects', label: 'projects', writable: true },
      { id: 'paste', label: 'paste', writable: true }
    ];
    setStatus(error.message || 'Could not load file roots');
  }
  if (
    filesRootsCatalog.length > 0 &&
    !filesRootsCatalog.some((entry) => entry.id === filesRootId)
  ) {
    filesRootId = filesRootsCatalog[0].id;
    filesPath = '';
    saveFilesNav();
  }
  renderFilesRoots();
  return filesRootsCatalog;
}

function renderFilesRoots() {
  if (!filesRootsElement) {
    return;
  }
  filesRootsElement.replaceChildren();
  const roots =
    filesRootsCatalog.length > 0
      ? filesRootsCatalog
      : [
          { id: 'home', label: 'home' },
          { id: 'projects', label: 'projects' },
          { id: 'paste', label: 'paste' }
        ];
  for (const root of roots) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = root.label || root.id;
    button.dataset.filesRoot = root.id;
    button.classList.toggle('active', filesRootId === root.id);
    button.setAttribute('aria-selected', String(filesRootId === root.id));
    button.title = root.displayPrefix || root.label || root.id;
    button.addEventListener('click', () => {
      if (filesRootId === root.id) {
        void refreshFilesListing();
        return;
      }
      filesRootId = root.id;
      filesPath = '';
      saveFilesNav();
      void refreshFilesListing();
    });
    filesRootsElement.append(button);
  }
  const hiddenToggle = document.createElement('button');
  hiddenToggle.type = 'button';
  hiddenToggle.id = 'files-hidden-toggle';
  hiddenToggle.textContent = filesShowHidden ? '· hide' : '· show';
  hiddenToggle.title = filesShowHidden
    ? 'Hide dotfiles (names starting with .)'
    : 'Show hidden files (names starting with .)';
  hiddenToggle.setAttribute('aria-pressed', String(filesShowHidden));
  hiddenToggle.classList.toggle('active', filesShowHidden);
  hiddenToggle.addEventListener('click', () => {
    filesShowHidden = !filesShowHidden;
    saveFilesShowHidden();
    if (filesListing) {
      renderFilesListing(filesListing);
    } else {
      void refreshFilesListing();
    }
  });
  filesRootsElement.append(hiddenToggle);
}

function renderFilesBreadcrumb(listing) {
  if (!filesBreadcrumbElement) {
    return;
  }
  filesBreadcrumbElement.replaceChildren();
  const prefix =
    listing.displayPrefix || filesDisplayPrefix(listing.root || filesRootId);
  const rel =
    typeof listing.path === 'string' ? listing.path : filesPath || '';
  const segments = rel ? rel.split('/').filter(Boolean) : [];

  const appendCrumb = (label, pathValue, isLast) => {
    if (filesBreadcrumbElement.childElementCount > 0) {
      const sep = document.createElement('span');
      sep.className = 'crumb-sep';
      sep.textContent = '/';
      sep.setAttribute('aria-hidden', 'true');
      filesBreadcrumbElement.append(sep);
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    if (isLast) {
      button.disabled = true;
      button.setAttribute('aria-current', 'location');
    } else {
      button.addEventListener('click', () => {
        filesPath = pathValue;
        saveFilesNav();
        void refreshFilesListing();
      });
    }
    filesBreadcrumbElement.append(button);
  };

  appendCrumb(prefix, '', segments.length === 0);
  let acc = '';
  segments.forEach((segment, index) => {
    acc = acc ? `${acc}/${segment}` : segment;
    appendCrumb(segment, acc, index === segments.length - 1);
  });
}

function renderFilesListing(listing) {
  filesListing = listing;
  filesWritable = listing.writable !== false;
  filesRootId = listing.root || filesRootId;
  renderFilesBreadcrumb(listing);
  if (filesUpButton) {
    filesUpButton.disabled =
      listing.parent === null || listing.parent === undefined;
  }
  if (filesUploadInput) {
    filesUploadInput.disabled = !filesWritable;
  }
  if (!filesListElement) {
    return;
  }
  filesListElement.replaceChildren();
  const rawEntries = Array.isArray(listing.entries) ? listing.entries : [];
  const hiddenCount = rawEntries.filter((entry) =>
    isHiddenFileName(entry.name)
  ).length;
  const entries = filesShowHidden
    ? rawEntries
    : rawEntries.filter((entry) => !isHiddenFileName(entry.name));
  if (filesEmptyHintElement) {
    if (entries.length > 0) {
      filesEmptyHintElement.hidden = true;
    } else {
      filesEmptyHintElement.hidden = false;
      if (rawEntries.length > 0 && !filesShowHidden) {
        filesEmptyHintElement.textContent = `No visible items (${hiddenCount} hidden). Tap “· show”.`;
      } else if (rawEntries.length === 0) {
        filesEmptyHintElement.textContent = 'Empty folder';
      } else {
        filesEmptyHintElement.textContent = 'Empty folder';
      }
    }
  }
  for (const entry of entries) {
    const item = document.createElement('li');
    item.dataset.name = entry.name;
    item.dataset.type = entry.type;
    const name = document.createElement('span');
    name.className = `files-entry-name ${entry.type === 'dir' ? 'dir' : 'file'}`;
    name.textContent = entry.name;
    const meta = document.createElement('span');
    meta.className = 'files-entry-meta';
    meta.textContent =
      entry.type === 'dir'
        ? 'folder'
        : `${formatFilesSize(entry.size)} · ${formatFilesMtime(entry.mtime)}`;
    item.append(name, meta);
    item.addEventListener('click', () => {
      if (entry.type === 'dir') {
        const next = listing.path ? `${listing.path}/${entry.name}` : entry.name;
        filesPath = next;
        saveFilesNav();
        void refreshFilesListing();
        return;
      }
      openFilesActions({
        root: listing.root,
        path: listing.path ? `${listing.path}/${entry.name}` : entry.name,
        name: entry.name,
        type: 'file',
        size: entry.size
      });
    });
    filesListElement.append(item);
  }
  renderFilesRoots();
}

async function refreshFilesListing() {
  if (filesLoadPromise) {
    return filesLoadPromise;
  }
  filesLoadPromise = (async () => {
    try {
      const query = new URLSearchParams({
        root: filesRootId,
        path: filesPath || ''
      });
      const listing = await api(`/api/fs/list?${query.toString()}`);
      filesRootId = listing.root || filesRootId;
      filesPath = typeof listing.path === 'string' ? listing.path : '';
      saveFilesNav();
      renderFilesListing(listing);
      if (listing.truncated) {
        setStatus('Folder truncated (too many entries)');
      }
    } catch (error) {
      // Path vanished — bounce to root of current tree.
      if (filesPath) {
        filesPath = '';
        saveFilesNav();
        filesLoadPromise = null;
        return refreshFilesListing();
      }
      setStatus(error.message || 'Could not list files');
      if (filesListElement) {
        filesListElement.replaceChildren();
      }
      if (filesEmptyHintElement) {
        filesEmptyHintElement.hidden = false;
        filesEmptyHintElement.textContent = error.message || 'Could not list files';
      }
    } finally {
      filesLoadPromise = null;
    }
  })();
  return filesLoadPromise;
}

function openFilesActions(target) {
  filesActionTarget = target;
  if (filesActionsTitle) {
    filesActionsTitle.textContent = target.name;
  }
  if (filesActionsPath) {
    filesActionsPath.textContent = filesDisplayPath(target.root, target.path);
  }
  if (filesActionDelete) {
    filesActionDelete.hidden = !filesWritable;
  }
  if (filesActionsDialog && !filesActionsDialog.open) {
    filesActionsDialog.showModal();
  }
}

function closeFilesActions() {
  filesActionTarget = null;
  if (filesActionsDialog?.open) {
    filesActionsDialog.close();
  }
}

function closeFilesPreview() {
  if (filesPreviewBody) {
    filesPreviewBody.textContent = '';
  }
  if (filesPreviewDialog?.open) {
    filesPreviewDialog.close();
  }
}

async function previewFilesTarget(target) {
  const query = new URLSearchParams({
    root: target.root,
    path: target.path
  });
  const preview = await api(`/api/fs/read?${query.toString()}`);
  if (filesPreviewTitle) {
    filesPreviewTitle.textContent = target.name;
  }
  if (filesPreviewBody) {
    filesPreviewBody.textContent = preview.text || '';
  }
  closeFilesActions();
  if (filesPreviewDialog && !filesPreviewDialog.open) {
    filesPreviewDialog.showModal();
  }
}

async function downloadFilesTarget(target) {
  const query = new URLSearchParams({
    root: target.root,
    path: target.path
  });
  const response = await fetch(`/api/fs/download?${query.toString()}`, {
    credentials: 'same-origin',
    redirect: 'manual'
  });
  if (response.type === 'opaqueredirect' || response.status === 0) {
    window.location.reload();
    throw new Error('Authentication expired');
  }
  if (!response.ok) {
    let message = 'Download failed';
    try {
      const value = await response.json();
      message = value.error || message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = target.name || 'download';
  anchor.rel = 'noopener';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  setStatus(`Downloaded ${target.name}`);
  closeFilesActions();
}

function insertFilesPath(target) {
  const display = filesDisplayPath(target.root, target.path);
  setViewMode('term');
  if (!activeSession || !terminal || socket?.readyState !== WebSocket.OPEN) {
    setStatus(`Path: ${display} (connect a session to insert)`);
    // Still leave the path in status; try clipboard as bonus.
    try {
      void navigator.clipboard?.writeText?.(display);
    } catch {
      // ignore
    }
    closeFilesActions();
    return;
  }
  clearTerminalSelection();
  setCtrlArmed(false);
  const sent = sendInput(display);
  setStatus(sent ? `Inserted ${display}` : `Could not insert ${display}`);
  closeFilesActions();
}

async function deleteFilesTarget(target) {
  const ok = window.confirm(`Delete ${filesDisplayPath(target.root, target.path)}?`);
  if (!ok) {
    return;
  }
  const query = new URLSearchParams({
    root: target.root,
    path: target.path
  });
  await api(`/api/fs/entry?${query.toString()}`, { method: 'DELETE' });
  setStatus(`Deleted ${target.name}`);
  closeFilesActions();
  await refreshFilesListing();
}

async function uploadFilesSelected(fileList) {
  const file = fileList?.[0];
  if (!file) {
    return;
  }
  if (!filesWritable) {
    setStatus('This folder is read-only', { sticky: true });
    return;
  }
  if (file.size > 20 * 1024 * 1024) {
    setStatus('File is too large (max 20 MB)', { sticky: true });
    return;
  }
  try {
    setStatus(`Uploading ${file.name}…`, { sticky: true });
    const buffer = await file.arrayBuffer();
    const query = new URLSearchParams({
      root: filesRootId,
      path: filesPath || '',
      filename: file.name
    });
    await api(`/api/fs/upload?${query.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-File-Name': file.name
      },
      body: buffer
    });
    setStatus(`Uploaded ${file.name}`);
    await refreshFilesListing();
  } catch (error) {
    setStatus(error.message || 'Upload failed', { sticky: true });
  } finally {
    if (filesUploadInput) {
      filesUploadInput.value = '';
    }
  }
}

function installSessionRenameLongPress(button, sessionName) {
  let longPressTimer = null;
  let startX = 0;
  let startY = 0;
  let longPressFired = false;

  const clearLongPress = () => {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  };

  button.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }
    longPressFired = false;
    startX = event.clientX;
    startY = event.clientY;
    clearLongPress();
    longPressTimer = window.setTimeout(() => {
      longPressTimer = null;
      longPressFired = true;
      try {
        button.releasePointerCapture?.(event.pointerId);
      } catch {
        // Ignore capture release failures on older engines.
      }
      renameSession(sessionName);
    }, sessionLongPressMilliseconds);
  });
  button.addEventListener('pointermove', (event) => {
    if (longPressTimer === null) {
      return;
    }
    const distance = Math.hypot(
      event.clientX - startX,
      event.clientY - startY
    );
    if (distance > sessionLongPressMoveTolerance) {
      clearLongPress();
    }
  });
  button.addEventListener('pointerup', clearLongPress);
  button.addEventListener('pointercancel', clearLongPress);
  button.addEventListener('pointerleave', clearLongPress);
  button.addEventListener('click', (event) => {
    if (!longPressFired) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    longPressFired = false;
  });
  button.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    clearLongPress();
    renameSession(sessionName);
  });
}

function renderSessions() {
  sessionsElement.replaceChildren();
  for (const session of sessions) {
    const item = document.createElement('div');
    item.className = 'session-item';
    const button = document.createElement('button');
    button.type = 'button';
    const isActive = session.name === activeSession;
    button.className = isActive
      ? 'session active closable'
      : 'session';
    button.textContent = session.name;
    button.title =
      `${session.windows} window(s), ${session.attached} client(s). ` +
      'Long-press to rename.';
    button.addEventListener('click', () => connect(session.name));
    installSessionRenameLongPress(button, session.name);
    item.append(button);
    if (isActive) {
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'session-close';
      closeButton.textContent = '×';
      closeButton.title = `Kill ${session.name}`;
      closeButton.setAttribute('aria-label', `Kill session ${session.name}`);
      closeButton.addEventListener('click', () => killSession(session.name));
      item.append(closeButton);
    }
    sessionsElement.append(item);
  }
  keyboardButton.disabled = !activeSession;
  renderHeaderSummary();
}

async function refreshSessions(selectFirst = false, quiet = false) {
  try {
    const value = await api('/api/sessions');
    sessions = value.sessions;
    if (
      activeSession &&
      !sessions.some((session) => session.name === activeSession)
    ) {
      disconnect();
    }
    renderSessions();
    if (selectFirst && !activeSession && sessions.length > 0) {
      const remembered = rememberedSession();
      const selected =
        sessions.find((session) => session.name === remembered) || sessions[0];
      connect(selected.name);
    }
    if (!quiet) {
      setStatus(`${sessions.length} tmux session${sessions.length === 1 ? '' : 's'}`);
    }
  } catch (error) {
    setStatus(error.message);
  }
}

async function ensureTerminal() {
  if (terminal) {
    return;
  }
  if (!terminalInitialization) {
    terminalInitialization = (async () => {
      try {
        await Promise.all([
          document.fonts?.load(`400 ${terminalFontSize}px "JetBrains Mono"`),
          document.fonts?.load(`600 ${terminalFontSize}px "JetBrains Mono"`),
          document.fonts?.ready
        ]);
      } catch {
        // Continue with the platform monospace fallback if font loading fails.
      }
      terminal = new Terminal({
        // Decorations used by scrollback find highlights.
        allowProposedApi: true,
        convertEol: false,
        cursorBlink: true,
        // Option/Alt sends ESC+key (shell meta), important for Mac/iPad keyboards.
        macOptionIsMeta: true,
        fontFamily: terminalFontFamily,
        fontSize: terminalFontSize,
        fontWeight: '400',
        fontWeightBold: '600',
        letterSpacing: 0,
        lineHeight: 1,
        drawBoldTextInBrightColors: true,
        fastScrollSensitivity: 5,
        scrollSensitivity: 1,
        scrollback: 10000,
        theme: terminalThemes[terminalThemeName]
      });
      fitAddon = new FitAddon.FitAddon();
      terminal.loadAddon(fitAddon);
      if (typeof SearchAddon !== 'undefined' && SearchAddon.SearchAddon) {
        searchAddon = new SearchAddon.SearchAddon();
        terminal.loadAddon(searchAddon);
      }
      terminal.open(terminalElement);
      terminal.textarea?.addEventListener('focus', () => {
        keyboardDismissing = false;
        clearTimeout(keyboardDismissPollTimer);
        keyboardDismissPollTimer = null;
        terminalElement.classList.add('keyboard-input-active');
        clearTerminalSelection();
        setKeyboardButtonState(true);
        scheduleNativeTerminalInputPrime();
        // Wait for the keyboard animation, then freeze layout so later
        // visualViewport pans cannot slide the whole page.
        scheduleVisualViewportUpdate();
        window.setTimeout(() => {
          if (terminalInputIsFocused() || keyboardViewportIsReduced()) {
            captureKeyboardLayoutLock();
            scheduleFit();
          }
        }, 320);
      });
      terminal.textarea?.addEventListener('blur', () => {
        stopNativeDeleteRepeat();
        terminalElement.classList.remove('keyboard-input-active');
        setKeyboardButtonState(false);
        // Do not expand layout while a long-press selection is in progress.
        if (!holdKeyboardLayoutForSelection && !terminal?.hasSelection()) {
          releaseKeyboardLayoutLock();
        }
      });
      terminal.onSelectionChange(() => {
        updateClipboardButton();
        if (
          holdKeyboardLayoutForSelection &&
          !terminal?.hasSelection() &&
          !xtermTouchSelecting &&
          !terminalInputIsFocused()
        ) {
          holdKeyboardLayoutForSelection = false;
          releaseKeyboardLayoutLock();
        }
      });
      terminal.textarea?.addEventListener('compositionstart', () => {
        stopNativeDeleteRepeat();
        nativeInputComposing = true;
      });
      terminal.textarea?.addEventListener('compositionend', () => {
        nativeInputComposing = false;
        scheduleNativeTerminalInputPrime();
      });
      terminal.textarea?.addEventListener(
        'beforeinput',
        handleNativeTerminalDeleteInput,
        { capture: true }
      );
      terminal.textarea?.addEventListener(
        'input',
        handleNativeTerminalDeleteInput,
        { capture: true }
      );
      terminal.attachCustomKeyEventHandler(handleNativeTerminalKeyEvent);
      terminal.element?.classList.toggle(
        'native-touch-selection',
        nativeTouchSelection
      );
      terminal.onData((data) => {
        sendInput(data);
        scheduleNativeTerminalInputPrime();
      });
      terminal.onScroll(showScrollPosition);
      terminal.refresh(0, terminal.rows - 1);
      installTouchScrolling();
    })();
  }
  await terminalInitialization;
}

function sendTmuxWheel(button, count, clientX, clientY) {
  if (socket?.readyState !== WebSocket.OPEN || !terminal) {
    return;
  }
  const bounds = terminalElement.getBoundingClientRect();
  const col = Math.min(
    terminal.cols,
    Math.max(1, Math.floor(((clientX - bounds.left) / bounds.width) * terminal.cols) + 1)
  );
  const row = Math.min(
    terminal.rows,
    Math.max(1, Math.floor(((clientY - bounds.top) / bounds.height) * terminal.rows) + 1)
  );
  const sequence = `\u001b[<${button};${col};${row}M`.repeat(count);
  socket.send(JSON.stringify({ type: 'input', data: sequence }));
}

function handleTerminalTap(clientX, clientY) {
  if (
    socket?.readyState !== WebSocket.OPEN ||
    !terminal
  ) {
    return;
  }
  const bounds = terminalElement.getBoundingClientRect();
  const col = Math.min(
    terminal.cols,
    Math.max(1, Math.floor(((clientX - bounds.left) / bounds.width) * terminal.cols) + 1)
  );
  const row = Math.min(
    terminal.rows,
    Math.max(1, Math.floor(((clientY - bounds.top) / bounds.height) * terminal.rows) + 1)
  );
  // Open keyboard on a plain tap when closed. Prefer the lower area (prompt),
  // but any non-scroll tap should also bring up the keyboard for typing.
  const nearPrompt = row > terminal.rows - 8;
  if (!terminalInputIsFocused() && nearPrompt) {
    clearTerminalSelection();
    terminal.focus();
  } else if (!terminalInputIsFocused() && terminal.modes.mouseTrackingMode === 'none') {
    // Full-screen mouse apps skip auto-focus; normal shells open keyboard.
    clearTerminalSelection();
    terminal.focus();
  }
  if (terminal.modes.mouseTrackingMode === 'none') {
    return;
  }
  const sequence = `\u001b[<0;${col};${row}M\u001b[<0;${col};${row}m`;
  socket.send(JSON.stringify({ type: 'input', data: sequence }));
}

function scrollTerminal(direction) {
  if (!terminal || terminalElement.hidden) {
    return;
  }
  const tracksMouse = terminal.modes.mouseTrackingMode !== 'none';
  if (!tracksMouse) {
    if (direction === 'bottom') {
      terminal.scrollToBottom();
    } else {
      terminal.scrollPages(direction === 'up' ? -1 : 1);
    }
    return;
  }

  const bounds = terminalElement.getBoundingClientRect();
  const clientX = bounds.left + bounds.width / 2;
  const clientY = bounds.top + bounds.height / 2;
  const button = direction === 'up' ? 64 : 65;
  sendTmuxWheel(button, direction === 'bottom' ? 18 : 6, clientX, clientY);
}

function resetPinch() {
  pinchStartDistance = null;
  pinchStartFontSize = null;
}

function touchDistance(touches) {
  if (touches.length !== 2) {
    return null;
  }
  const [first, second] = touches;
  return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
}

function scheduleFit() {
  // Fitting mid-gesture or mid-selection reflows rows and wipes selection.
  if (
    nativeTouchStartX !== null ||
    nativeTouchScrolling ||
    holdKeyboardLayoutForSelection ||
    xtermTouchSelecting
  ) {
    pendingFitAfterTouch = true;
    return;
  }
  if (fitFrame !== null) {
    return;
  }
  fitFrame = window.requestAnimationFrame(() => {
    fitFrame = null;
    fit();
  });
}

function captureKeyboardLayoutLock() {
  if (keyboardDismissing && !holdKeyboardLayoutForSelection) {
    return;
  }
  keyboardLayoutLock = currentVisualViewportGeometry();
  lastAppliedViewportHeight = keyboardLayoutLock.height;
  lastAppliedViewportTop = 0;
  keyboardLayoutLock.top = 0;
  document.documentElement.classList.add('keyboard-open');
  document.documentElement.classList.remove('standalone-reserved-bottom');
  document.documentElement.style.setProperty(
    '--app-height',
    `${keyboardLayoutLock.height}px`
  );
  // Keep the app pinned to the visible top; do not track later visualViewport
  // rubber-band pans (those look like the whole page is scrolling).
  document.documentElement.style.setProperty('--app-top', '0px');
}

function clearLockedAppGeometry() {
  lastAppliedViewportHeight = null;
  lastAppliedViewportTop = null;
  document.documentElement.style.removeProperty('--app-height');
  document.documentElement.style.removeProperty('--app-top');
  document.documentElement.classList.remove('keyboard-open');
  window.scrollTo(0, 0);
}

function releaseKeyboardLayoutLock() {
  // Keep frozen keyboard geometry while a long-press selection is active so
  // the terminal does not refit and drop the selection.
  if (holdKeyboardLayoutForSelection || terminal?.hasSelection()) {
    return;
  }
  keyboardLayoutLock = null;
  keyboardDismissing = true;
  clearTimeout(keyboardDismissPollTimer);
  keyboardDismissPollTimer = null;
  // Drop the frozen keyboard-open geometry immediately so the grid can grow
  // again; then re-sync through the keyboard close animation.
  clearLockedAppGeometry();
  scheduleFit();
  let attempts = 0;
  const pollKeyboardClosed = () => {
    keyboardDismissPollTimer = null;
    // Terminal soft-keyboard focus reclaims the lock; Find focus alone should
    // not cancel dismiss when the OS already hid the keyboard.
    if (terminalInputIsFocused()) {
      keyboardDismissing = false;
      return;
    }
    if (holdKeyboardLayoutForSelection || terminal?.hasSelection()) {
      keyboardDismissing = false;
      return;
    }
    attempts += 1;
    window.scrollTo(0, 0);
    if (!keyboardViewportIsReduced() || attempts >= 24) {
      keyboardDismissing = false;
      clearLockedAppGeometry();
      scheduleFit();
      scheduleVisualViewportUpdate();
      return;
    }
    // Follow the expanding visual viewport while the keyboard animates away.
    const viewport = window.visualViewport;
    const height = Math.round(viewport?.height || window.innerHeight);
    document.documentElement.classList.add('keyboard-open');
    document.documentElement.style.setProperty('--app-height', `${height}px`);
    document.documentElement.style.setProperty('--app-top', '0px');
    lastAppliedViewportHeight = height;
    lastAppliedViewportTop = 0;
    scheduleFit();
    keyboardDismissPollTimer = window.setTimeout(pollKeyboardClosed, 50);
  };
  keyboardDismissPollTimer = window.setTimeout(pollKeyboardClosed, 50);
}

function preventBrowserPagePan(event) {
  if (event.cancelable) {
    event.preventDefault();
  }
}

function scheduleFontResize() {
  if (fontResizeFrame !== null) {
    return;
  }
  fontResizeFrame = window.requestAnimationFrame(() => {
    fontResizeFrame = null;
    scheduleFit();
  });
}

function updatePinchFontSize(touches) {
  const distance = touchDistance(touches);
  if (
    !terminal ||
    distance === null ||
    pinchStartDistance === null ||
    pinchStartFontSize === null ||
    pinchStartDistance === 0
  ) {
    return;
  }
  const proposed = Math.round(
    Math.min(
      maximumTerminalFontSize,
      Math.max(
        minimumTerminalFontSize,
        pinchStartFontSize * (distance / pinchStartDistance)
      )
    ) * 2
  ) / 2;
  if (proposed === terminalFontSize) {
    return;
  }
  terminalFontSize = proposed;
  terminal.options.fontSize = proposed;
  fontSizeChangedDuringPinch = true;
  setStatus(`Font size ${proposed}px`);
  scheduleFontResize();
}

function detachDocumentTouchGesture() {
  if (!documentTouchGestureActive) {
    return;
  }
  documentTouchGestureActive = false;
  document.removeEventListener('touchmove', handleDocumentTouchMove, true);
  document.removeEventListener('touchend', handleDocumentTouchEnd, true);
  document.removeEventListener('touchcancel', handleDocumentTouchCancel, true);
}

function attachDocumentTouchGesture() {
  if (documentTouchGestureActive) {
    return;
  }
  documentTouchGestureActive = true;
  // Capture outside #terminal so a finger that leaves the element mid-swipe
  // still delivers touchmove (a common intermittent iOS scroll cancel).
  document.addEventListener('touchmove', handleDocumentTouchMove, {
    capture: true,
    passive: false
  });
  document.addEventListener('touchend', handleDocumentTouchEnd, {
    capture: true,
    passive: false
  });
  document.addEventListener('touchcancel', handleDocumentTouchCancel, {
    capture: true,
    passive: false
  });
}

function finishTouchGesture() {
  clearNativeSelectionLongPressTimer();
  detachDocumentTouchGesture();
  const wasScrolling = nativeTouchScrolling;
  const wasXtermSelecting = xtermTouchSelecting;
  touchLastY = null;
  nativeTouchScrolling = false;
  xtermTouchSelecting = false;
  xtermSelectionAnchor = null;
  scrollPixelAccumulator = 0;
  nativeTouchStartX = null;
  nativeTouchStartY = null;
  nativeTouchMaxDistance = 0;
  nativeTouchStartedAt = Number.NEGATIVE_INFINITY;
  scrollCatcherElement?.classList.remove('scrolling');
  resetPinch();
  if (fontSizeChangedDuringPinch) {
    fontSizeChangedDuringPinch = false;
    rememberFontSize();
  }
  if (wasXtermSelecting) {
    updateClipboardButton();
  }
  // Do not fit while selection still holds the keyboard layout freeze.
  if (pendingFitAfterTouch && !holdKeyboardLayoutForSelection) {
    pendingFitAfterTouch = false;
    scheduleFit();
  }
  return { wasScrolling, wasXtermSelecting };
}

function lockSelectionViewportIfKeyboardOpen() {
  if (!keyboardViewportIsReduced() && !selectionViewportLock) {
    return;
  }
  clearTimeout(selectionViewportReleaseTimer);
  selectionViewportReleaseTimer = null;
  selectionViewportGestureActive = true;
  if (!selectionViewportLock) {
    selectionViewportLock = currentVisualViewportGeometry();
  }
  applySelectionViewportLockStyles();
}

function currentVisualViewportGeometry() {
  const viewport = window.visualViewport;
  return {
    height: Math.round(viewport?.height || window.innerHeight),
    top: Math.round(viewport?.offsetTop || 0)
  };
}

function releaseSelectionViewport() {
  clearTimeout(selectionViewportReleaseTimer);
  selectionViewportReleaseTimer = null;
  selectionViewportLock = null;
  selectionViewportGestureActive = false;
  lastAppliedViewportHeight = null;
  lastAppliedViewportTop = null;
  scheduleVisualViewportUpdate();
}

function scheduleSelectionViewportRelease() {
  clearTimeout(selectionViewportReleaseTimer);
  selectionViewportReleaseTimer = setTimeout(() => {
    selectionViewportReleaseTimer = null;
    selectionViewportGestureActive = false;
    if (!terminal?.hasSelection()) {
      releaseSelectionViewport();
    }
  }, nativeSelectionViewportSettleMilliseconds);
}

function startNativeTouchGesture(touch) {
  clearNativeSelectionLongPressTimer();
  nativeTouchScrolling = false;
  xtermTouchSelecting = false;
  xtermSelectionAnchor = null;
  selectionPresentAtGestureStart = Boolean(terminal?.hasSelection());
  scrollPixelAccumulator = 0;
  nativeTouchStartX = touch.clientX;
  nativeTouchStartY = touch.clientY;
  nativeTouchMaxDistance = 0;
  nativeTouchStartedAt = window.performance.now();
  scrollCatcherElement?.classList.remove('scrolling');
  attachDocumentTouchGesture();
  armTerminalSelectionLongPress();
}

function applyTerminalTouchScroll(touch) {
  if (!terminal || touchLastY === null) {
    return;
  }
  const delta = touch.clientY - touchLastY;
  touchLastY = touch.clientY;
  if (delta === 0) {
    return;
  }
  // Finger down → reveal earlier history (negative scrollLines).
  scrollPixelAccumulator += delta;
  const lineHeight = Math.max(
    8,
    terminalElement.clientHeight / Math.max(1, terminal.rows)
  );
  const threshold = Math.max(2, lineHeight * 0.25);
  if (Math.abs(scrollPixelAccumulator) < threshold) {
    return;
  }
  const steps = Math.min(
    20,
    Math.max(1, Math.round(Math.abs(scrollPixelAccumulator) / lineHeight))
  );
  const direction = scrollPixelAccumulator > 0 ? -1 : 1;
  scrollPixelAccumulator = 0;
  if (terminal.modes.mouseTrackingMode === 'none') {
    terminal.scrollLines(direction * steps);
  } else {
    sendTmuxWheel(
      direction < 0 ? 64 : 65,
      steps,
      touch.clientX,
      touch.clientY
    );
  }
}

function handleTerminalTouchMove(event) {
  if (event.__vpsTerminalTouchHandled) {
    return false;
  }
  event.__vpsTerminalTouchHandled = true;
  if (event.touches.length === 2) {
    event.preventDefault();
    event.stopPropagation();
    touchMoved = true;
    lockNativeTouchToScrolling();
    if (pinchStartDistance === null) {
      pinchStartDistance = touchDistance(event.touches);
      pinchStartFontSize = terminalFontSize;
    }
    updatePinchFontSize(event.touches);
    touchLastY = null;
    return true;
  }
  if (
    event.touches.length !== 1 ||
    touchLastY === null ||
    !terminal ||
    nativeTouchStartX === null ||
    nativeTouchStartY === null
  ) {
    return false;
  }
  const touch = event.touches[0];
  const distanceFromStart = Math.hypot(
    touch.clientX - nativeTouchStartX,
    touch.clientY - nativeTouchStartY
  );
  nativeTouchMaxDistance = Math.max(nativeTouchMaxDistance, distanceFromStart);
  if (distanceFromStart >= nativeScrollActivationDistance) {
    clearNativeSelectionLongPressTimer();
  }

  event.preventDefault();
  event.stopPropagation();
  // After long-press selection starts, drag extends the selection.
  if (xtermTouchSelecting) {
    touchMoved = true;
    const cell = terminalCellFromPoint(touch.clientX, touch.clientY);
    if (cell) {
      applyXtermTouchSelection(cell);
    }
    updateClipboardButton();
    return true;
  }
  if (distanceFromStart >= nativeScrollActivationDistance) {
    touchMoved = true;
    lockNativeTouchToScrolling();
    applyTerminalTouchScroll(touch);
  }
  return true;
}

function handleDocumentTouchMove(event) {
  if (nativeTouchStartX === null) {
    return;
  }
  handleTerminalTouchMove(event);
}

function handleDocumentTouchEnd(event) {
  if (nativeTouchStartX === null) {
    return;
  }
  // Ignore ends that are not part of our active terminal gesture completion.
  if (event.touches.length > 0) {
    touchLastY =
      event.touches.length === 1 ? event.touches[0].clientY : null;
    touchMoved = true;
    resetPinch();
    return;
  }
  completeTerminalTouchEnd(event);
}

function handleDocumentTouchCancel() {
  if (nativeTouchStartX === null) {
    return;
  }
  finishTouchGesture();
  updateClipboardButton();
}

function completeTerminalTouchEnd(event) {
  if (event.__vpsTerminalTouchEndHandled || nativeTouchStartX === null) {
    return;
  }
  event.__vpsTerminalTouchEndHandled = true;
  suppressCompatibilityMouseUntil = window.performance.now() + 10000;
  // Capture before finishTouchGesture clears gesture flags.
  const madeSelectionThisGesture = xtermTouchSelecting;
  const hadSelectionAtStart = selectionPresentAtGestureStart;
  const shouldHandleTap =
    !touchMoved &&
    window.performance.now() - nativeTouchStartedAt <=
      nativeTapMaximumMilliseconds &&
    pinchStartDistance === null;
  const touch = event.changedTouches?.[0];
  if (touch) {
    lastTouchClientX = touch.clientX;
    lastTouchClientY = touch.clientY;
  }
  // Always offer the floating Copy chip after a selection gesture. Silent
  // auto-copy is unreliable on iOS after preventDefault-owned drags; a one-tap
  // chip is the consistent path and matches what users expect.
  if (madeSelectionThisGesture && terminal?.hasSelection()) {
    const releaseX = touch?.clientX ?? lastTouchClientX;
    const releaseY = touch?.clientY ?? lastTouchClientY;
    showSelectionCopyChip(releaseX, releaseY);
    clientDebug(
      'selection-release',
      selectionDebugSnapshot({
        madeSelectionThisGesture,
        hadSelectionAtStart,
        showCopyChip: true
      })
    );
  }
  const { wasScrolling } = finishTouchGesture();

  // Selection release already showed the Copy chip. Only plain taps clear an
  // older selection or focus the terminal.
  if (shouldHandleTap && !madeSelectionThisGesture) {
    if (hadSelectionAtStart || terminal?.hasSelection()) {
      clientDebug('selection-tap-clear', selectionDebugSnapshot({
        hadSelectionAtStart
      }));
      clearTerminalSelection();
    } else if (touch) {
      handleTerminalTap(touch.clientX, touch.clientY);
    }
  }
  if (!wasScrolling) {
    scheduleVisualViewportUpdate();
  }
  updateClipboardButton();
}

function lockNativeTouchToScrolling() {
  clearNativeSelectionLongPressTimer();
  xtermTouchSelecting = false;
  xtermSelectionAnchor = null;
  if (!nativeTouchScrolling) {
    nativeTouchScrolling = true;
    scrollCatcherElement?.classList.add('scrolling');
  }
  if (terminal?.hasSelection()) {
    terminal.clearSelection();
  }
  window.getSelection()?.removeAllRanges();
  hideSelectionCopyChip();
  pasteButton.classList.remove('copy-needs-attention');
  updateClipboardButton();
}


function suppressCompatibilityMouseEvent(event) {
  if (
    !event.sourceCapabilities?.firesTouchEvents &&
    window.performance.now() >= suppressCompatibilityMouseUntil
  ) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
}

function isolateNativeSelectionContextMenu(event) {
  event.stopPropagation();
}

function installScrollCatcherGestures() {
  if (!scrollCatcherElement) {
    return;
  }
  // Scroll and long-press selection share this stable overlay so xterm DOM is
  // never the touch target (that was canceling mid-content swipes).
  scrollCatcherElement.addEventListener(
    'touchstart',
    (event) => {
      suppressCompatibilityMouseUntil = window.performance.now() + 10000;
      if (event.touches.length === 2) {
        event.preventDefault();
        event.stopPropagation();
        clearTerminalSelection();
        touchMoved = true;
        startNativeTouchGesture(event.touches[0]);
        lockNativeTouchToScrolling();
        pinchStartDistance = touchDistance(event.touches);
        pinchStartFontSize = terminalFontSize;
        touchLastY = null;
        return;
      }
      if (event.touches.length !== 1) {
        return;
      }
      // Claim immediately so scroll stays solid. Long-press selection is handled
      // with a timer under this claimed gesture (no delayed preventDefault).
      event.preventDefault();
      event.stopPropagation();
      const touch = event.touches[0];
      startNativeTouchGesture(touch);
      touchLastY = touch.clientY;
      touchMoved = false;
      resetPinch();
    },
    { capture: true, passive: false }
  );
  scrollCatcherElement.addEventListener(
    'touchmove',
    (event) => {
      handleTerminalTouchMove(event);
    },
    { capture: true, passive: false }
  );
  scrollCatcherElement.addEventListener(
    'touchend',
    (event) => {
      if (nativeTouchStartX === null) {
        return;
      }
      if (event.touches.length > 0) {
        touchLastY =
          event.touches.length === 1 ? event.touches[0].clientY : null;
        touchMoved = true;
        resetPinch();
        return;
      }
      completeTerminalTouchEnd(event);
    },
    { capture: true, passive: false }
  );
  scrollCatcherElement.addEventListener(
    'touchcancel',
    () => {
      if (nativeTouchStartX === null) {
        return;
      }
      finishTouchGesture();
      updateClipboardButton();
    },
    { capture: true, passive: false }
  );
}

function installNativeTouchGestures() {
  installScrollCatcherGestures();
  updateScrollCatcherMode();

  // Catcher owns single-finger scroll. Keep terminal handlers for pinch if a
  // touch reaches under the catcher, and for compatibility mouse suppression.
  terminalElement.addEventListener(
    'touchstart',
    (event) => {
      suppressCompatibilityMouseUntil = window.performance.now() + 10000;
      if (event.touches.length === 2) {
        event.preventDefault();
        event.stopPropagation();
        clearTerminalSelection();
        touchMoved = true;
        startNativeTouchGesture(event.touches[0]);
        lockNativeTouchToScrolling();
        pinchStartDistance = touchDistance(event.touches);
        pinchStartFontSize = terminalFontSize;
        touchLastY = null;
      }
    },
    { capture: true, passive: false }
  );
  terminalElement.addEventListener(
    'touchmove',
    (event) => {
      if (event.touches.length === 2) {
        handleTerminalTouchMove(event);
      }
    },
    { capture: true, passive: false }
  );
  for (const type of [
    'mousedown',
    'mousemove',
    'mouseup',
    'click',
    'dblclick',
    'pointerdown',
    'pointermove',
    'pointerup'
  ]) {
    terminalElement.addEventListener(type, suppressCompatibilityMouseEvent, {
      capture: true,
      passive: false
    });
  }
  terminalElement.addEventListener(
    'contextmenu',
    isolateNativeSelectionContextMenu,
    { capture: true }
  );
  document.addEventListener(
    'touchmove',
    (event) => {
      if (nativeTouchStartX === null) {
        return;
      }
      preventBrowserPagePan(event);
    },
    { capture: true, passive: false }
  );
}

function installTouchScrolling() {
  if (nativeTouchSelection) {
    installNativeTouchGestures();
    return;
  }
  terminalElement.addEventListener(
    'touchstart',
    (event) => {
      if (event.touches.length === 2) {
        event.preventDefault();
        event.stopPropagation();
        touchLastY = null;
        touchMoved = true;
        pinchStartDistance = touchDistance(event.touches);
        pinchStartFontSize = terminalFontSize;
        return;
      }
      if (event.touches.length !== 1) {
        touchLastY = null;
        resetPinch();
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      touchLastY = event.touches[0].clientY;
      touchMoved = false;
    },
    { capture: true, passive: false }
  );
  terminalElement.addEventListener(
    'touchmove',
    (event) => {
      if (event.touches.length === 2 && pinchStartDistance !== null) {
        event.preventDefault();
        event.stopPropagation();
        updatePinchFontSize(event.touches);
        return;
      }
      if (event.touches.length !== 1 || touchLastY === null || !terminal) {
        return;
      }
      const currentY = event.touches[0].clientY;
      const delta = currentY - touchLastY;
      event.preventDefault();
      event.stopPropagation();
      if (Math.abs(delta) < 12) {
        return;
      }
      touchMoved = true;
      const steps = Math.min(6, Math.max(1, Math.floor(Math.abs(delta) / 18)));
      if (terminal.modes.mouseTrackingMode === 'none') {
        terminal.scrollLines(delta > 0 ? -steps : steps);
      } else {
        sendTmuxWheel(
          delta > 0 ? 64 : 65,
          steps,
          event.touches[0].clientX,
          currentY
        );
      }
      touchLastY = currentY;
    },
    { capture: true, passive: false }
  );
  terminalElement.addEventListener(
    'touchend',
    (event) => {
      if (event.touches.length > 0) {
        touchLastY = null;
        return;
      }
      finishTouchGesture();
    },
    { capture: true, passive: true }
  );
  terminalElement.addEventListener(
    'touchcancel',
    () => {
      finishTouchGesture();
    },
    { capture: true, passive: true }
  );
}

function fit() {
  if (!terminal || terminalElement.hidden) {
    return;
  }
  const previousBuffer = terminal.buffer.active;
  const previousViewportY = previousBuffer.viewportY;
  const atBottom = previousViewportY >= previousBuffer.baseY;
  fitAddon.fit();
  const buffer = terminal.buffer.active;
  // Preserve the absolute viewport line. Distance-from-bottom restore can jump
  // when row count changes after a keyboard viewport fit.
  if (atBottom) {
    terminal.scrollToBottom();
  } else {
    terminal.scrollToLine(
      Math.max(0, Math.min(previousViewportY, buffer.baseY))
    );
  }
  if (
    socket?.readyState === WebSocket.OPEN &&
    (terminal.cols !== lastSentTerminalCols ||
      terminal.rows !== lastSentTerminalRows)
  ) {
    socket.send(
      JSON.stringify({
        type: 'resize',
        cols: terminal.cols,
        rows: terminal.rows
      })
    );
    lastSentTerminalCols = terminal.cols;
    lastSentTerminalRows = terminal.rows;
  }
}

function disconnect() {
  stopNativeDeleteRepeat();
  intentionalClose = true;
  clearTimeout(reconnectTimer);
  reconnectTimer = null;
  if (socket) {
    socket.close();
    socket = null;
  }
  lastSentTerminalCols = null;
  lastSentTerminalRows = null;
  activeSession = null;
  clearConnectionWatch();
  setConnectionState('idle');
  setHeaderCollapsed(false);
  terminal?.blur();
  setKeyboardButtonState(false);
  setCtrlArmed(false);
  clearTerminalSelection();
  hideScrollPosition();
  terminalElement.hidden = true;
  updateScrollCatcherMode();
  emptyElement.hidden = viewMode === 'files';
  renderSessions();
  updateTermControlsEnabled();
}

async function connect(name) {
  stopNativeDeleteRepeat();
  if (name === activeSession && socket?.readyState === WebSocket.OPEN) {
    setHeaderCollapsed(true);
    updateTermControlsEnabled();
    return;
  }
  intentionalClose = true;
  clearTimeout(reconnectTimer);
  if (socket) {
    socket.close();
  }
  intentionalClose = false;
  activeSession = name;
  setConnectionState('connecting', `Connecting to ${name}…`);
  setStatus(`Connecting to ${name}…`, { sticky: true });
  armConnectionWatch(name);
  rememberSession(name);
  // Per-session theme; do not rewrite storage until the user changes it.
  applyTerminalTheme(themeForSession(name), { persist: false });
  renderSessions();
  await ensureTerminal();
  if (activeSession !== name) {
    return;
  }
  // ensureTerminal may have opened with the previous theme.
  applyTerminalTheme(themeForSession(name), { persist: false });
  terminal.reset();
  clearTerminalSelection();
  hideScrollPosition();
  emptyElement.hidden = true;
  terminalElement.hidden = viewMode === 'files';
  updateScrollCatcherMode();
  if (viewMode !== 'files') {
    fit();
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  socket = new WebSocket(
    `${protocol}//${window.location.host}/ws?session=${encodeURIComponent(name)}`
  );
  lastSentTerminalCols = null;
  lastSentTerminalRows = null;
  socket.binaryType = 'arraybuffer';
  socket.addEventListener('open', () => {
    clearConnectionWatch();
    lastConnectionDetail = `Connected to ${name}`;
    setConnectionState('connected', lastConnectionDetail);
    setStatus(`Connected to ${name}`);
    setHeaderCollapsed(true);
    updateTermControlsEnabled();
    fit();
  });
  socket.addEventListener('message', (event) => {
    terminal.write(
      typeof event.data === 'string' ? event.data : decoder.decode(event.data)
    );
  });
  socket.addEventListener('close', () => {
    stopNativeDeleteRepeat();
    updateTermControlsEnabled();
    if (intentionalClose || activeSession !== name) {
      return;
    }
    setCtrlArmed(false);
    lastConnectionDetail = `Disconnected from ${name}; reconnecting…`;
    setConnectionState('connecting', lastConnectionDetail);
    setStatus(lastConnectionDetail, { sticky: true });
    armConnectionWatch(name);
    reconnectTimer = setTimeout(() => connect(name), 1500);
  });
  socket.addEventListener('error', () => {
    lastConnectionDetail = `Connection error for ${name}. Tap the status dot to retry.`;
    setConnectionState('error', lastConnectionDetail);
    setStatus(lastConnectionDetail, { sticky: true });
    updateTermControlsEnabled();
  });
}

async function createSession() {
  const proposed = window.prompt('New tmux session name:');
  if (proposed === null) {
    return;
  }
  const name = proposed.trim();
  try {
    await api('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    await refreshSessions();
    connect(name);
  } catch (error) {
    window.alert(error.message);
  }
}

async function killSession(name = activeSession) {
  if (
    !name ||
    !window.confirm(`Kill tmux session “${name}”? Processes in it will stop.`)
  ) {
    return;
  }
  try {
    await api(`/api/sessions/${encodeURIComponent(name)}`, {
      method: 'DELETE'
    });
    disconnect();
    await refreshSessions(true);
  } catch (error) {
    window.alert(error.message);
  }
}

async function renameSession(name) {
  if (!name) {
    return;
  }
  const proposed = window.prompt('Rename tmux session:', name);
  if (proposed === null) {
    return;
  }
  const nextName = proposed.trim();
  if (!nextName || nextName === name) {
    return;
  }
  try {
    const result = await api(`/api/sessions/${encodeURIComponent(name)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nextName })
    });
    const renamed = result.name || nextName;
    // tmux keeps the same session attached after rename; only client labels
    // and remembered state need to update.
    renameSessionTheme(name, renamed);
    if (activeSession === name) {
      activeSession = renamed;
      rememberSession(renamed);
      renderHeaderSummary();
    }
    await refreshSessions(false, true);
    setStatus(`Renamed to ${renamed}`);
  } catch (error) {
    window.alert(error.message);
  }
}

function writeTextToClipboardLegacy(text) {
  // Synchronous copy keeps the iOS user-gesture (async clipboard often fails
  // after touchend). Never use window.prompt for copy.
  if (!text) {
    return false;
  }
  const carrier = document.createElement('textarea');
  carrier.value = text;
  carrier.setAttribute('readonly', '');
  // iOS is picky: fully invisible 1×1 carriers sometimes make execCommand
  // return false even inside a gesture. Keep a tiny, nearly-transparent box.
  carrier.style.cssText =
    'position:fixed;top:0;left:0;width:2em;height:2em;margin:0;padding:0;' +
    'border:0;outline:none;box-shadow:none;background:transparent;' +
    'opacity:0.01;color:transparent;caret-color:transparent;' +
    'font:12px monospace;z-index:-1;';
  document.body.append(carrier);
  const previousFocus = document.activeElement;
  carrier.focus({ preventScroll: true });
  carrier.select();
  carrier.setSelectionRange(0, carrier.value.length);
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (error) {
    clientDebug('copy-legacy-error', {
      message: String(error?.message || error).slice(0, 120)
    });
    copied = false;
  }
  carrier.remove();
  if (
    previousFocus &&
    typeof previousFocus.focus === 'function' &&
    previousFocus !== carrier
  ) {
    try {
      previousFocus.focus({ preventScroll: true });
    } catch {
      // Ignore focus restore failures.
    }
  }
  return copied;
}

async function copyTerminalSelection(options = {}) {
  const clearAfter = Boolean(options.clearAfter);
  const source = options.source || 'button';
  const apiText = terminal?.getSelection?.() || '';
  const text = readTerminalSelectionText();
  clientDebug(
    'copy-attempt',
    selectionDebugSnapshot({
      source,
      clearAfter,
      extractedLength: text.length,
      extractedLines: text ? text.split('\n').length : 0,
      extractedPreview: text.slice(0, 48).replace(/[^\x20-\x7E\n]/g, '?'),
      apiEmpty: apiText.length === 0 && text.length > 0
    })
  );
  if (!text) {
    setStatus('Copy failed — empty selection');
    updateClipboardButton();
    return false;
  }
  // Prefer sync legacy copy (works from chip/button user gestures on iOS).
  const legacyOk = writeTextToClipboardLegacy(text);
  let clipboardOk = false;
  if (!legacyOk && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      clipboardOk = true;
    } catch (error) {
      clientDebug('copy-clipboard-error', {
        name: error?.name || 'Error',
        message: String(error?.message || error).slice(0, 120)
      });
    }
  }
  const copied = legacyOk || clipboardOk;
  clientDebug('copy-result', {
    source,
    copied,
    legacyOk,
    clipboardOk,
    textLength: text.length,
    lineCount: text.split('\n').length
  });
  if (copied) {
    // In-app mirror so Paste works even when iOS blocks clipboard.readText.
    appClipboardText = text;
    setStatus('Copied');
    hideSelectionCopyChip();
    pasteButton.classList.remove('copy-needs-attention');
    if (clearAfter) {
      clearTerminalSelection();
    } else {
      updateClipboardButton();
    }
  } else {
    // Keep selection and chip so the user can try again (chip is the affordance).
    markCopyNeedsAttention(options.clientX, options.clientY);
    updateClipboardButton();
  }
  return copied;
}

async function uploadPasteImage(blob) {
  if (!blob || blob.size <= 0) {
    throw new Error('empty image');
  }
  if (blob.size > maximumPasteImageBytes) {
    throw new Error('image is too large (max 5 MB)');
  }
  const contentType =
    blob.type && blob.type.startsWith('image/') ? blob.type : 'image/png';
  const response = await fetch('/api/paste-image', {
    method: 'POST',
    credentials: 'same-origin',
    redirect: 'manual',
    headers: {
      'Content-Type': contentType
    },
    body: blob
  });
  if (response.type === 'opaqueredirect' || response.status === 0) {
    window.location.reload();
    throw new Error('Authentication expired');
  }
  const type = response.headers.get('content-type') || '';
  if (!type.includes('application/json')) {
    window.location.reload();
    throw new Error('Authentication expired');
  }
  const value = await response.json();
  if (!response.ok) {
    throw new Error(value.error || 'Image upload failed');
  }
  if (typeof value.path !== 'string' || !value.path.startsWith('/')) {
    throw new Error('Invalid image path from server');
  }
  return value;
}

function pasteTextForImage(saved) {
  // Prefer short ~/paste/… form; fall back to absolute path.
  const candidate =
    (typeof saved.pasteText === 'string' && saved.pasteText) ||
    (typeof saved.displayPath === 'string' && saved.displayPath) ||
    saved.path;
  if (typeof candidate !== 'string' || candidate.length === 0) {
    throw new Error('Invalid image path from server');
  }
  // Trailing space so another paste or typed text stays separate.
  return candidate.endsWith(' ') ? candidate : `${candidate} `;
}

// Last text we successfully copied in-app (fallback only when OS clipboard
// cannot be read). Never preferred over a live clipboard image.
let appClipboardText = '';
// Prefetch started on pointerdown; may fail — always allow a click retry.
let pasteGesturePayload = null;

async function parseClipboardItems(items) {
  let text = '';
  let imageBlob = null;
  for (const item of items) {
    if (!text && item.types.includes('text/plain')) {
      try {
        text = await (await item.getType('text/plain')).text();
      } catch {
        // Ignore per-type failures.
      }
    }
    if (!imageBlob) {
      for (const type of item.types) {
        if (type.startsWith('image/')) {
          try {
            imageBlob = await item.getType(type);
            break;
          } catch {
            // Ignore per-type failures.
          }
        }
      }
    }
  }
  return { text: text || '', imageBlob, error: null, apiOk: true };
}

function beginPasteGestureClipboardRead() {
  // Prefer clipboard.read() once so screenshots and text share one activation.
  if (navigator.clipboard?.read) {
    pasteGesturePayload = navigator.clipboard
      .read()
      .then((items) => parseClipboardItems(items))
      .catch((error) => ({
        text: '',
        imageBlob: null,
        error: String(error?.message || error).slice(0, 80),
        apiOk: false
      }));
    return;
  }
  if (navigator.clipboard?.readText) {
    pasteGesturePayload = navigator.clipboard
      .readText()
      .then((text) => ({
        text: text || '',
        imageBlob: null,
        error: null,
        apiOk: true
      }))
      .catch((error) => ({
        text: '',
        imageBlob: null,
        error: String(error?.message || error).slice(0, 80),
        apiOk: false
      }));
    return;
  }
  pasteGesturePayload = null;
}

async function readClipboardPayloadBestEffort() {
  let text = '';
  let imageBlob = null;
  let error = null;
  let apiOk = false;

  // 1) Gesture prefetch from pointerdown (text + image when possible).
  if (pasteGesturePayload) {
    try {
      const result = await pasteGesturePayload;
      text = result.text || '';
      imageBlob = result.imageBlob || null;
      error = result.error || null;
      apiOk = Boolean(result.apiOk);
      // If prefetch already has useful content, keep it.
      if (text || imageBlob) {
        pasteGesturePayload = null;
        return { text, imageBlob, error, apiOk };
      }
    } catch (err) {
      error = String(err?.message || err).slice(0, 80);
      apiOk = false;
    } finally {
      pasteGesturePayload = null;
    }
  }

  // 2) Fresh full read on click (one activation for both text and image).
  if (navigator.clipboard?.read) {
    try {
      const items = await navigator.clipboard.read();
      const parsed = await parseClipboardItems(items);
      return parsed;
    } catch (err) {
      error = String(err?.message || err).slice(0, 80);
      clientDebug('paste-clipboard-read', {
        reason: 'read-failed',
        message: error
      });
    }
  }

  // 3) Text-only fallback.
  if (navigator.clipboard?.readText) {
    try {
      text = (await navigator.clipboard.readText()) || '';
      return { text, imageBlob: null, error: null, apiOk: true };
    } catch (err) {
      error = String(err?.message || err).slice(0, 80);
    }
  } else if (!error) {
    error = 'clipboard-api-missing';
  }

  return { text: '', imageBlob: null, error, apiOk: false };
}

async function pasteImageBlob(blob) {
  if (!blob) {
    return false;
  }
  try {
    const saved = await uploadPasteImage(blob);
    const pathText = pasteTextForImage(saved);
    clearTerminalSelection();
    setCtrlArmed(false);
    if (!sendInput(pathText)) {
      terminal.paste?.(pathText);
    }
    const shown =
      (typeof saved.displayPath === 'string' && saved.displayPath) ||
      pathText.trim();
    setStatus(`Image: ${shown}`);
    clientDebug('paste-image', {
      bytes: saved.bytes || blob.size,
      mimeType: saved.mimeType || blob.type || 'image/*',
      pathLength: pathText.trim().length,
      displayPath: shown
    });
    return true;
  } catch (error) {
    clientDebug('paste-image-error', {
      message: String(error?.message || error).slice(0, 120)
    });
    setStatus(error.message || 'Image paste failed');
    return false;
  }
}

function insertPastedText(text) {
  const pasted = text.slice(0, maximumPasteLength);
  clearTerminalSelection();
  setCtrlArmed(false);
  if (!sendInput(pasted)) {
    terminal.paste?.(pasted);
  }
  if (pasted.length !== text.length) {
    setStatus(`Paste limited to ${maximumPasteLength} characters`);
  }
}

async function pasteClipboard() {
  if (!terminal || socket?.readyState !== WebSocket.OPEN) {
    return;
  }
  const { text, imageBlob, error, apiOk } = await readClipboardPayloadBestEffort();
  const hasText = typeof text === 'string' && text.length > 0;

  // Screenshots are often image-only. Prefer image when there is no text so we
  // never paste a stale in-app text copy over a live screenshot.
  if (imageBlob && !hasText) {
    const ok = await pasteImageBlob(imageBlob);
    if (ok) {
      return;
    }
  }

  if (hasText) {
    insertPastedText(text);
    return;
  }

  // Both present (rare): still prefer image for screenshot+empty-metadata cases
  // already handled; if we had text we returned above.
  if (imageBlob) {
    const ok = await pasteImageBlob(imageBlob);
    if (ok) {
      return;
    }
  }

  // Last resort: text we copied earlier in this app (OS clipboard blocked).
  if (appClipboardText) {
    insertPastedText(appClipboardText);
    clientDebug('paste-text', {
      source: 'app-mirror',
      length: appClipboardText.length,
      apiOk: Boolean(apiOk)
    });
    return;
  }

  if (error) {
    setStatus('Clipboard unavailable');
    clientDebug('paste-text-error', {
      reason: 'clipboard-read-failed',
      error
    });
    return;
  }
  setStatus('Clipboard empty');
}

async function pasteOrCopyClipboard() {
  if (terminalHasCopyableSelection()) {
    pasteGesturePayload = null;
    await copyTerminalSelection({ source: 'button' });
    return;
  }
  await pasteClipboard();
}

async function handleSelectionCopyChipClick(event) {
  event.preventDefault();
  event.stopPropagation();
  if (!terminalHasCopyableSelection()) {
    hideSelectionCopyChip();
    return;
  }
  await copyTerminalSelection({ clearAfter: true, source: 'chip' });
}

findPrevButton?.addEventListener('click', () => {
  runFind('prev');
});
findNextButton?.addEventListener('click', () => {
  runFind('next');
});
findCloseButton?.addEventListener('click', () => {
  closeFindBar();
});
findInputElement?.addEventListener('focus', () => {
  keyboardDismissing = false;
  clearTimeout(keyboardDismissPollTimer);
  keyboardDismissPollTimer = null;
  // Wait for the soft keyboard, then freeze layout (same as terminal focus).
  // Only lock once the viewport is actually reduced so desktop / keyboard-
  // dismiss does not pin a full-height "keyboard-open" layout.
  scheduleVisualViewportUpdate();
  window.setTimeout(() => {
    if (
      document.activeElement === findInputElement &&
      keyboardViewportIsReduced()
    ) {
      captureKeyboardLayoutLock();
      scheduleFit();
    }
  }, 320);
});
findInputElement?.addEventListener('blur', () => {
  // Leaving find (or dismissing the keyboard) must grow the UI again.
  if (
    !terminalInputIsFocused() &&
    !holdKeyboardLayoutForSelection &&
    !terminal?.hasSelection()
  ) {
    releaseKeyboardLayoutLock();
  }
});
findInputElement?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeFindBar();
    return;
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    runFind(event.shiftKey ? 'prev' : 'next');
  }
});
// Capture Ctrl/Cmd+F when focus is outside xterm (e.g. footer buttons).
document.addEventListener(
  'keydown',
  (event) => {
    if (
      event.isComposing ||
      (event.key !== 'f' && event.key !== 'F') ||
      !(event.ctrlKey || event.metaKey) ||
      event.altKey
    ) {
      return;
    }
    // Let the terminal handler own it when xterm is focused.
    if (terminalInputIsFocused()) {
      return;
    }
    // Don't fight browser find in settings/dialogs/form fields.
    if (isHardwareKeyboardUiCaptureTarget(event.target)) {
      return;
    }
    event.preventDefault();
    openFindBar();
  },
  true
);
// Hardware keyboard → PTY when session is active but focus is on chrome.
document.addEventListener('keydown', handleHardwareKeyboardBridge, true);

viewModeElement?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-view-mode]');
  if (!button || !viewModeElement.contains(button)) {
    return;
  }
  setViewMode(button.dataset.viewMode);
});
filesUpButton?.addEventListener('click', () => {
  if (!filesListing || filesListing.parent === null || filesListing.parent === undefined) {
    return;
  }
  filesPath = filesListing.parent;
  saveFilesNav();
  void refreshFilesListing();
});
filesRefreshButton?.addEventListener('click', () => {
  void refreshFilesListing();
});
filesSettingsButton?.addEventListener('click', () => {
  setSettingsTab(loadLastSettingsTab());
  if (settingsDialogElement && !settingsDialogElement.open) {
    settingsDialogElement.showModal();
  }
});
filesUploadInput?.addEventListener('change', () => {
  void uploadFilesSelected(filesUploadInput.files);
});
filesActionsClose?.addEventListener('click', () => {
  closeFilesActions();
});
filesActionPreview?.addEventListener('click', () => {
  if (!filesActionTarget) {
    return;
  }
  void previewFilesTarget(filesActionTarget).catch((error) => {
    setStatus(error.message || 'Preview failed');
  });
});
filesActionDownload?.addEventListener('click', () => {
  if (!filesActionTarget) {
    return;
  }
  void downloadFilesTarget(filesActionTarget).catch((error) => {
    setStatus(error.message || 'Download failed');
  });
});
filesActionInsert?.addEventListener('click', () => {
  if (!filesActionTarget) {
    return;
  }
  insertFilesPath(filesActionTarget);
});
filesActionDelete?.addEventListener('click', () => {
  if (!filesActionTarget) {
    return;
  }
  void deleteFilesTarget(filesActionTarget).catch((error) => {
    setStatus(error.message || 'Delete failed');
  });
});
filesPreviewClose?.addEventListener('click', () => {
  closeFilesPreview();
});
filesActionsDialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeFilesActions();
});
filesPreviewDialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeFilesPreview();
});

document.querySelector('#create').addEventListener('click', createSession);
headerSummaryButton.addEventListener('click', () => {
  setHeaderCollapsed(false);
  refreshSessions(false, true);
});
document
  .querySelector('#header-expanded')
  .addEventListener('pointerdown', scheduleHeaderCollapse);
document
  .querySelector('#collapse-header')
  .addEventListener('click', () => setHeaderCollapsed(true));
keyboardButton.addEventListener('click', toggleKeyboard);
// Start clipboard read on the earliest gesture (text + image in one call).
pasteButton.addEventListener(
  'pointerdown',
  (event) => {
    if (event.button !== 0) {
      return;
    }
    if (terminalHasCopyableSelection()) {
      pasteGesturePayload = null;
      return;
    }
    beginPasteGestureClipboardRead();
  },
  { capture: true }
);
pasteButton.addEventListener(
  'touchstart',
  () => {
    if (terminalHasCopyableSelection()) {
      pasteGesturePayload = null;
      return;
    }
    beginPasteGestureClipboardRead();
  },
  { capture: true, passive: true }
);
pasteButton.addEventListener('click', (event) => {
  event.preventDefault();
  void pasteOrCopyClipboard();
});
selectionCopyChip?.addEventListener('click', handleSelectionCopyChipClick);
// Prefer pointerup so iOS grants clipboard activation reliably for the chip.
selectionCopyChip?.addEventListener(
  'pointerdown',
  (event) => {
    // Keep the keyboard from collapsing when a layout lock is active.
    if (terminalInputIsFocused() || holdKeyboardLayoutForSelection) {
      event.preventDefault();
    }
  },
  { passive: false }
);
drawerKeysButton?.addEventListener('click', () => {
  setFooterDrawer('keys');
});
drawerSnipsButton?.addEventListener('click', () => {
  setFooterDrawer('snips');
});
drawerFindButton?.addEventListener('click', () => {
  closeFooterDrawer();
  openFindBar();
});
settingsTabsElement?.addEventListener('click', (event) => {
  const tab = event.target.closest('[data-settings-tab]');
  if (!tab || !settingsTabsElement.contains(tab)) {
    return;
  }
  setSettingsTab(tab.dataset.settingsTab);
});
document.querySelector('#settings').addEventListener('click', () => {
  setSettingsTab(loadLastSettingsTab());
  if (!settingsDialogElement.open) {
    settingsDialogElement.showModal();
  }
});
document.querySelector('#create-collapsed')?.addEventListener('click', () => {
  void createSession();
});
document.querySelector('#settings-close').addEventListener('click', () => {
  settingsDialogElement.close();
});
shortcutEditorList?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  const item = event.target.closest('.shortcut-editor-item');
  if (!button || !item || !shortcutEditorList.contains(item)) {
    return;
  }
  const id = item.dataset.shortcutId;
  const action = button.dataset.action;
  if (action === 'up') {
    moveShortcut(id, -1);
  } else if (action === 'down') {
    moveShortcut(id, 1);
  } else if (action === 'remove') {
    removeShortcut(id);
  }
});
shortcutAddButton?.addEventListener('click', () => {
  const id = shortcutAddSelect?.value;
  if (id) {
    addShortcut(id);
  }
});
shortcutResetButton?.addEventListener('click', () => {
  resetShortcuts();
});
customKeyTypeSelect?.addEventListener('change', () => {
  syncCustomKeyFormFields();
});
customKeyAddButton?.addEventListener('click', () => {
  addCustomKeyFromForm();
});
syncCustomKeyFormFields();
snippetEditorList?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  const item = event.target.closest('.shortcut-editor-item');
  if (!button || !item || !snippetEditorList.contains(item)) {
    return;
  }
  const id = item.dataset.snippetId;
  const action = button.dataset.action;
  if (action === 'edit') {
    beginEditSnippet(id);
  } else if (action === 'up') {
    void moveSnippet(id, -1);
  } else if (action === 'down') {
    void moveSnippet(id, 1);
  } else if (action === 'remove') {
    void removeSnippet(id);
  }
});
snippetSaveButton?.addEventListener('click', () => {
  void saveSnippetFromForm();
});
snippetResetButton?.addEventListener('click', () => {
  void resetSnippetsToPresets();
});
populateThemeSelect();
applyTerminalTheme(terminalThemeName, { persist: false });
renderFooterPins();
closeFooterDrawer();
loadFilesNav();
updateTermControlsEnabled();
void loadAppConfig();
setViewMode(loadViewMode(), { persist: false });
if (viewMode === 'files') {
  void ensureFilesRoots();
}
void loadSnippetsFromServer();
terminalThemeElement.addEventListener('change', () => {
  applyTerminalTheme(terminalThemeElement.value, { persist: true });
});
installAppButton.addEventListener('click', installWebApp);
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  updateInstallSettings();
});
window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  updateInstallSettings();
});

document.addEventListener('pointerdown', preserveKeyboardState, {
  capture: true
});
const resizeObserver = new ResizeObserver(scheduleFit);
resizeObserver.observe(terminalElement);

function keyboardViewportIsReduced() {
  const viewport = window.visualViewport;
  if (!viewport || Math.abs(viewport.scale - 1) > 0.01) {
    return false;
  }
  const layoutHeight = Math.round(
    document.documentElement.clientHeight || window.innerHeight
  );
  return layoutHeight - Math.round(viewport.height) > 120;
}

function safeBottomInsetPixels() {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--safe-bottom');
  return Math.max(0, Number.parseFloat(value) || 0);
}

function standaloneViewportReservesBottom(layoutHeight) {
  if (
    !runningAsInstalledWebApp() ||
    !window.matchMedia?.('(orientation: portrait)').matches
  ) {
    return false;
  }
  const safeBottom = safeBottomInsetPixels();
  const unavailableHeight = Math.max(
    0,
    Math.round(window.screen?.height || layoutHeight) - layoutHeight
  );
  return safeBottom > 0 && unavailableHeight >= safeBottom;
}

function updateVisualViewport() {
  visualViewportUpdateFrame = null;
  // Never reflow under an active terminal finger — that cancels iOS gestures
  // and was also sliding the whole UI when the keyboard was open.
  if (nativeTouchStartX !== null) {
    if (selectionViewportLock) {
      applySelectionViewportLockStyles();
    } else if (keyboardLayoutLock) {
      document.documentElement.style.setProperty(
        '--app-height',
        `${keyboardLayoutLock.height}px`
      );
      document.documentElement.style.setProperty('--app-top', '0px');
    }
    window.scrollTo(0, 0);
    return;
  }
  const viewport = window.visualViewport;
  const layoutHeight = Math.round(
    document.documentElement.clientHeight || window.innerHeight
  );
  if (keyboardDismissing && !terminalInputIsFocused()) {
    // Keyboard close path owns geometry until the animation finishes.
    window.scrollTo(0, 0);
    return;
  }
  // Soft keyboard dismissed (viewport full again) while a lock remains —
  // e.g. Find field still focused after the OS hid the keyboard. Drop the
  // frozen short height so the UI moves back down.
  if (
    keyboardLayoutLock &&
    !keyboardDismissing &&
    !selectionViewportLock &&
    !holdKeyboardLayoutForSelection &&
    !terminal?.hasSelection() &&
    !terminalInputIsFocused() &&
    !keyboardViewportIsReduced()
  ) {
    releaseKeyboardLayoutLock();
    return;
  }
  const keyboardOpen = Boolean(
    selectionViewportLock ||
    keyboardLayoutLock ||
    (!keyboardDismissing &&
      (keyboardViewportIsReduced() || terminalInputIsFocused()))
  );
  const pageZoomed = Boolean(
    viewport && Math.abs(viewport.scale - 1) > 0.01
  );
  document.documentElement.classList.toggle('keyboard-open', keyboardOpen);
  document.documentElement.classList.toggle(
    'standalone-reserved-bottom',
    !keyboardOpen && standaloneViewportReservesBottom(layoutHeight)
  );
  if (!selectionViewportLock && !keyboardOpen && !pageZoomed) {
    keyboardLayoutLock = null;
    keyboardDismissing = false;
    clearLockedAppGeometry();
    scheduleFit();
    return;
  }
  // Prefer a frozen keyboard layout. Tracking visualViewport.offsetTop makes
  // the entire chrome slide when iOS tries to pan under an open keyboard.
  // Find field is covered by keyboardViewportIsReduced() once the OS keyboard
  // is up; do not treat find-focus alone as a keyboard-open lock.
  if (
    keyboardOpen &&
    !selectionViewportLock &&
    !keyboardLayoutLock &&
    !keyboardDismissing &&
    (terminalInputIsFocused() || keyboardViewportIsReduced())
  ) {
    captureKeyboardLayoutLock();
  }
  const height =
    selectionViewportLock?.height ??
    keyboardLayoutLock?.height ??
    Math.round(viewport?.height || window.innerHeight);
  const top = selectionViewportLock?.top ?? keyboardLayoutLock?.top ?? 0;
  if (
    height === lastAppliedViewportHeight &&
    top === lastAppliedViewportTop
  ) {
    window.scrollTo(0, 0);
    return;
  }
  lastAppliedViewportHeight = height;
  lastAppliedViewportTop = top;
  document.documentElement.style.setProperty('--app-height', `${height}px`);
  document.documentElement.style.setProperty('--app-top', `${top}px`);
  window.scrollTo(0, 0);
  scheduleFit();
}

function scheduleVisualViewportUpdate() {
  if (visualViewportUpdateFrame !== null) {
    return;
  }
  visualViewportUpdateFrame = window.requestAnimationFrame(
    updateVisualViewport
  );
}

window.addEventListener('resize', scheduleVisualViewportUpdate);
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    if (selectionViewportLock) {
      selectionViewportLock = currentVisualViewportGeometry();
    }
    scheduleVisualViewportUpdate();
  }, 150);
});
window.visualViewport?.addEventListener('resize', scheduleVisualViewportUpdate);
window.visualViewport?.addEventListener('scroll', () => {
  // Kill iOS keyboard rubber-band panning of the layout.
  window.scrollTo(0, 0);
  if (nativeTouchStartX !== null || keyboardLayoutLock || keyboardDismissing) {
    if (keyboardLayoutLock && !keyboardDismissing) {
      document.documentElement.style.setProperty(
        '--app-height',
        `${keyboardLayoutLock.height}px`
      );
      document.documentElement.style.setProperty('--app-top', '0px');
    }
    return;
  }
  scheduleVisualViewportUpdate();
});
window.addEventListener('blur', stopNativeDeleteRepeat);
window.addEventListener('pagehide', stopNativeDeleteRepeat);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopNativeDeleteRepeat();
    return;
  }
  if (activeSession && socket?.readyState !== WebSocket.OPEN) {
    lastConnectionDetail = `Reconnecting to ${activeSession}…`;
    setConnectionState('connecting', lastConnectionDetail);
    setStatus(lastConnectionDetail, { sticky: true });
    connect(activeSession);
  }
});

connectionDotElement.addEventListener('click', (event) => {
  // Dot is inside the summary button; keep reconnect separate from expand.
  event.preventDefault();
  event.stopPropagation();
  if (!activeSession) {
    setHeaderCollapsed(false);
    return;
  }
  if (
    connectionState === 'connected' &&
    socket?.readyState === WebSocket.OPEN
  ) {
    setStatus(`Connected to ${activeSession}`);
    return;
  }
  forceReconnectActiveSession();
});

scheduleVisualViewportUpdate();
refreshSessions(true);
window.setInterval(
  () => refreshSessions(false, true),
  sessionRefreshMilliseconds
);
