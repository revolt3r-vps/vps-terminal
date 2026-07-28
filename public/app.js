'use strict';

const sessionsElement = document.querySelector('#sessions');
const terminalElement = document.querySelector('#terminal');
const emptyElement = document.querySelector('#empty');
const filesPanelElement = document.querySelector('#files-panel');
const filesToolbarElement = document.querySelector('#files-toolbar');
const filesUpButton = document.querySelector('#files-up-nav');
const filesLocationSelect = document.querySelector('#files-location-select');
const filesNewFolderDesktopButton = document.querySelector(
  '#files-new-folder-desktop'
);
const filesRefreshButton = document.querySelector('#files-refresh');
const filesRefreshDesktopButton = document.querySelector('#files-refresh-desktop');
const filesSettingsButton = document.querySelector('#files-settings');
const filesSettingsDesktopButton = document.querySelector('#files-settings-desktop');
const filesBreadcrumbElement = document.querySelector('#files-breadcrumb');
const filesRootsElement = document.querySelector('#files-roots');
const filesListElement = document.querySelector('#files-list');
const filesEmptyHintElement = document.querySelector('#files-empty-hint');
const filesStatusbarElement = document.querySelector('#files-statusbar');
const filesUploadInput = document.querySelector('#files-upload');
const filesUploadDesktopInput = document.querySelector('#files-upload-desktop');
const filesUploadTriggers = document.querySelectorAll(
  '[data-files-upload-trigger]'
);
const footerTermElement = document.querySelector('#footer-term');
const footerFilesElement = document.querySelector('#footer-files');
const filesActionsDialog = document.querySelector('#files-actions-dialog');
const filesActionsTitle = document.querySelector('#files-actions-title');
const filesActionsPath = document.querySelector('#files-actions-path');
const filesActionsClose = document.querySelector('#files-actions-close');
const filesActionPreview = document.querySelector('#files-action-preview');
const filesActionDownload = document.querySelector('#files-action-download');
const filesActionRename = document.querySelector('#files-action-rename');
const filesActionInsert = document.querySelector('#files-action-insert');
const filesActionDelete = document.querySelector('#files-action-delete');
const filesPreviewDialog = document.querySelector('#files-preview-dialog');
const filesPreviewTitle = document.querySelector('#files-preview-title');
const filesPreviewBody = document.querySelector('#files-preview-body');
const filesPreviewClose = document.querySelector('#files-preview-close');
const filesPreviewPane = document.querySelector('#files-preview-pane');
const filesPreviewPaneTitle = document.querySelector('#files-preview-pane-title');
const filesPreviewPaneBody = document.querySelector('#files-preview-pane-body');
const filesPreviewPaneClose = document.querySelector('#files-preview-pane-close');
const filesOptionsDialog = document.querySelector('#files-options-dialog');
const filesOptionsClose = document.querySelector('#files-options-close');
const filesOptionNewFolder = document.querySelector('#files-option-new-folder');
const filesOptionHidden = document.querySelector('#files-option-hidden');
const filesOptionSettings = document.querySelector('#files-option-settings');
const filesNameDialog = document.querySelector('#files-name-dialog');
const filesNameForm = document.querySelector('#files-name-form');
const filesNameTitle = document.querySelector('#files-name-title');
const filesNameLabel = document.querySelector('#files-name-label');
const filesNameInput = document.querySelector('#files-name-input');
const filesNameError = document.querySelector('#files-name-error');
const filesNameSubmit = document.querySelector('#files-name-submit');
const filesNameClose = document.querySelector('#files-name-close');
const filesNameCancel = document.querySelector('#files-name-cancel');
const viewModeElement = document.querySelector('#view-mode');
const appHeaderElement = document.querySelector('#app-header');
const headerSettingsButton = document.querySelector('#header-settings');
const headerSummaryButton = document.querySelector('#header-summary');
const headerExpandedElement = document.querySelector('#header-expanded');
const currentSessionElement = document.querySelector('#current-session');
const activeProfileElement = document.querySelector('#active-profile');
const quickMenuDialog = document.querySelector('#quick-menu-dialog');
const quickMenuCloseButton = document.querySelector('#quick-menu-close');
const quickMenuProfileSection = document.querySelector('#quick-menu-profile');
const quickMenuProfileValue = document.querySelector(
  '#quick-menu-profile-value'
);
const quickMenuProfileHint = document.querySelector('#quick-menu-profile-hint');
const quickMenuProfileList = document.querySelector('#quick-menu-profile-list');
const quickMenuFindButton = document.querySelector('#quick-menu-find');
const quickMenuRenameButton = document.querySelector('#quick-menu-rename');
const quickMenuReconnectButton = document.querySelector(
  '#quick-menu-reconnect'
);
const quickMenuSettingsButton = document.querySelector('#quick-menu-settings');
const connectionStateLabelElement = document.querySelector(
  '#connection-state-label'
);
const connectionDotElement = document.querySelector('#connection-dot');
const statusElement = document.querySelector('#status');
const keyboardButton = document.querySelector('#keyboard');
const pasteButton = document.querySelector('#paste');
const selectionCopyChip = document.querySelector('#selection-copy-chip');
const scrollCatcherElement = document.querySelector('#scroll-catcher');
const pickerScrimElement = document.querySelector('#picker-scrim');
const scrollPositionElement = document.querySelector('#scroll-position');
const scrollThumbElement = document.querySelector('#scroll-thumb');
const footerDrawerElement = document.querySelector('#footer-drawer');
const footerPinsElement = document.querySelector('#footer-pins');
const footerScrollElement = document.querySelector('#footer-scroll');
const footerPinOverflowButton = document.querySelector(
  '#footer-pin-overflow'
);
const drawerKeysButton = document.querySelector('#drawer-keys');
const drawerSnipsButton = document.querySelector('#drawer-snips');
const settingsDialogElement = document.querySelector('#settings-dialog');
const terminalThemeElement = document.querySelector('#terminal-theme');
const shortcutEditorList = document.querySelector('#shortcut-editor-list');
const shortcutAddSelect = document.querySelector('#shortcut-add-select');
const shortcutAddButton = document.querySelector('#shortcut-add');
const shortcutResetButton = document.querySelector('#shortcut-reset');
const keyProfileSelect = document.querySelector('#key-profile-select');
const keyProfileDefaultSelect = document.querySelector(
  '#key-profile-default-select'
);
const keyProfileSummary = document.querySelector('#key-profile-summary');
const profileKeyCount = document.querySelector('#profile-key-count');
const profileSnippetCount = document.querySelector('#profile-snippet-count');
const profileSnippetList = document.querySelector('#profile-snippet-list');
const profileSnippetsAllButton = document.querySelector(
  '#profile-snippets-all'
);
const profileSnippetsNoneButton = document.querySelector(
  '#profile-snippets-none'
);
const keyProfileNewButton = document.querySelector('#key-profile-new');
const keyProfileDuplicateButton = document.querySelector(
  '#key-profile-duplicate'
);
const keyProfileRenameButton = document.querySelector('#key-profile-rename');
const keyProfileDeleteButton = document.querySelector('#key-profile-delete');
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
const preferencesSyncStatusElement = document.querySelector(
  '#preferences-sync-status'
);
const preferencesSyncHelpElement = document.querySelector(
  '#preferences-sync-help'
);
const preferencesSyncEnableButton = document.querySelector(
  '#preferences-sync-enable'
);
const preferencesSyncLoadButton = document.querySelector(
  '#preferences-sync-load'
);
const preferencesSyncReplaceButton = document.querySelector(
  '#preferences-sync-replace'
);
const preferencesSyncRetryButton = document.querySelector(
  '#preferences-sync-retry'
);
const decoder = new TextDecoder();
const activeSessionStorageKey = 'vps-terminal-active-session';
const terminalFontSizeStorageKey = 'vps-terminal-font-size';
const terminalThemeStorageKey = 'vps-terminal-theme';
const sessionThemeStorageKey = 'vps-terminal-session-themes';
// Legacy keys are read once when creating the initial Shell profile.
const shortcutsStorageKey = 'vps-terminal-shortcuts';
const customKeysStorageKey = 'vps-terminal-custom-keys';
const keyProfilesStorageKey = 'vps-terminal-key-profiles-v1';
const sessionKeyProfilesStorageKey = 'vps-terminal-session-key-profiles-v1';
const preferencesSyncStorageKey = 'vps-terminal-preferences-sync-v1';
const preferencesCacheStorageKey = 'vps-terminal-preferences-cache-v1';
const preferencesLastIdentityStorageKey =
  'vps-terminal-preferences-last-identity-v1';
const preferencesPendingCacheStorageKey =
  'vps-terminal-preferences-pending-cache-v1';
const preferencesBootstrapStorageKey =
  'vps-terminal-preferences-bootstrap-v1';
const footerPinsStorageKey = 'vps-terminal-footer-pins';
const viewModeStorageKey = 'vps-terminal-view-mode';
const filesNavStorageKey = 'vps-terminal-files-nav';
const filesShowHiddenStorageKey = 'vps-terminal-files-show-hidden';
const settingsLastTabStorageKey = 'vps-terminal-settings-tab';
const qaShellMode =
  new URLSearchParams(window.location.search).get('qa-shell') === '1';
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
const maximumKeyProfiles = 12;
const maximumKeyProfileNameLength = 24;
const maximumProfileSnippetIds = 50;
const starterKeyProfilesVersion = 1;
const starterProfileSnippetSelectionsVersion = 1;
const preferencesSyncDebounceMs = 650;
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
const filesEntryLongPressMilliseconds = 520;
const filesEntryLongPressMoveTolerance = 10;
const nativeTouchSelection = shouldUseNativeTouchSelection();
const terminalFontFamily =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
// Find lives in the Menu sheet and Ctrl/Cmd+F, but is deliberately not a
// permanent footer control or a configurable key chip.
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
// Starter profiles stay deliberately small. Agent-specific additions are
// documented TUI controls; shared prompt text remains user-owned in Library.
const starterKeyProfileTemplates = [
  {
    id: 'profile-codex0000',
    name: 'Codex',
    shortcutIds: [
      'esc',
      'shift-tab',
      'ctrl-c',
      'ctrl-o',
      'tab',
      'enter',
      'ctrl',
      'left',
      'up',
      'down',
      'right',
      'pgup',
      'pgdn',
      'scroll-end'
    ],
    snippetIds: [],
    pins: [
      { kind: 'key', id: 'esc' },
      { kind: 'key', id: 'shift-tab' }
    ]
  },
  {
    id: 'profile-claude000',
    name: 'Claude',
    shortcutIds: [
      'esc',
      'shift-tab',
      'ctrl-c',
      'ctrl-d',
      'tab',
      'enter',
      'ctrl',
      'left',
      'up',
      'down',
      'right',
      'pgup',
      'pgdn',
      'scroll-end'
    ],
    snippetIds: [],
    pins: [
      { kind: 'key', id: 'esc' },
      { kind: 'key', id: 'shift-tab' }
    ]
  },
  {
    id: 'profile-grok0000',
    name: 'Grok',
    shortcutIds: [
      'esc',
      'shift-tab',
      'ctrl-p',
      'ctrl-x',
      'f2',
      'ctrl-c',
      'ctrl-d',
      'tab',
      'enter',
      'left',
      'up',
      'down',
      'right',
      'pgup',
      'pgdn',
      'scroll-end'
    ],
    snippetIds: [],
    pins: [
      { kind: 'key', id: 'esc' },
      { kind: 'key', id: 'shift-tab' }
    ]
  }
];
const starterProfileSnippetCandidateGroups = [
  ['git-st', 'proj-git'],
  ['pastes', 'paste-ls']
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
let touchLastY = null;
let touchMoved = false;
let pinchStartDistance = null;
let pinchStartFontSize = null;
let terminalFontSize = rememberedFontSize();
let globalTerminalThemeName = null;
let terminalThemeName = rememberedTerminalThemeName();
globalTerminalThemeName = terminalThemeName;
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
let terminalScrollClampFrame = null;
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
let filesVisibleEntries = [];
let filesSelectedIndex = -1;
let filesSelectedName = '';
let filesRestoreSelectionName = '';
let filesRestoreSelectionIndex = -1;
let filesPreviewTargetName = '';
let filesPreviewRequestedName = '';
let filesPreviewRequestId = 0;
let filesNameMode = '';
let filesNameTarget = null;
let filesNameOriginRoot = '';
let filesNameOriginPath = '';
let filesNameGeneration = 0;
let filesTypeahead = '';
let filesTypeaheadTimer = null;
/** @type {Array<{ id: string, label: string, displayPrefix?: string, writable?: boolean }>} */
let filesRootsCatalog = [];
let filesShowHidden = false;
let connectionWatchTimer = null;
let appDisplayName = 'VPS Terminal';
let snippetsList = [];
let snippetsLoadPromise = null;
let snippetEditorSelectedId = null;
let keyProfilesDocument = null;
let keyProfileEditorId = null;
let sessionKeyProfileAssignments = null;
let sessionThemesMemory = null;
const hadDurablePreferencesAtBoot = hasDurableBrowserPreferences();
const initialPreferencesLastIdentity = loadLastPreferencesIdentity();
const embeddedPreferencesIdentity = loadEmbeddedPreferencesIdentity();
const initialPreferencesSyncIdentity =
  embeddedPreferencesIdentity || initialPreferencesLastIdentity;
const initialPreferencesSyncMetadata = loadPreferencesSyncMetadata(
  initialPreferencesSyncIdentity
);
let preferencesSyncIdentity = initialPreferencesSyncIdentity;
// The no-store HTML response is already behind the authenticated reverse
// proxy, so its hashed subject is authority for selecting the private cache.
// GET /api/preferences remains a second confirmation and revision lookup.
let preferencesSyncIdentityConfirmed = Boolean(embeddedPreferencesIdentity);
let preferencesSyncEnabled = initialPreferencesSyncMetadata.enabled;
let preferencesSyncRevision = initialPreferencesSyncMetadata.revision;
let preferencesSyncDirty =
  initialPreferencesSyncMetadata.dirty ||
  (!embeddedPreferencesIdentity && hasPendingPreferencesCache()) ||
  (!initialPreferencesSyncMetadata.found &&
    Boolean(readPreferencesCache(initialPreferencesSyncIdentity)));
let preferencesSyncState = 'loading';
let preferencesSyncTimer = null;
let preferencesSyncWriting = false;
let preferencesSyncPending = false;
let preferencesApplying = false;
let preferencesBootstrapMutation = false;
let preferencesTrackingReady = false;
let preferencesLocalMutationVersion = 0;

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

// Most callers just pass a message; this infers a tone from the same
// wording they already use consistently (failure verbs vs. past-tense
// completion verbs) so error/success get a second, non-color-only cue
// without every call site needing to opt in individually.
// Covers this app's actual failure vocabulary (every user-facing
// server error string plus the client's own), not just a few examples —
// checked against the full list in server.js/fs-jail.js/preferences-store.js.
// Residual risk: a future error string that matches none of these still
// renders neutral; call sites that already know they're reporting a
// failure can pass {tone: 'error'} explicitly instead of relying on this.
const statusErrorPattern =
  /\b(failed|error|could not|cannot|invalid|expired|rejected|unavailable|too large|too many|limit|required|already exists|does not exist|not found|not a (directory|file)|permission denied|read-only|forbidden|not allowed|unsupported|empty)\b/i;
const statusSuccessPattern =
  /^(Copied|Saved|Created|Duplicated|Renamed|Deleted|Uploaded|Downloaded|Inserted|Loaded latest|Connected to|Pinned|Unpinned|Ran:|Added:|Shared setup (enabled|replaced)|Snippets (saved|reset)|(Created|Duplicated|Renamed|Deleted|Default) profile)/;

function inferStatusTone(message) {
  if (typeof message !== 'string') {
    return 'neutral';
  }
  if (statusErrorPattern.test(message)) {
    return 'error';
  }
  if (statusSuccessPattern.test(message)) {
    return 'success';
  }
  return 'neutral';
}

function setStatus(message, options = {}) {
  clearTimeout(statusTimer);
  statusTimer = null;
  statusElement.textContent = message;
  statusElement.classList.add('visible');
  statusElement.classList.toggle('sticky', Boolean(options.sticky));
  statusElement.dataset.tone = options.tone || inferStatusTone(message);
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

function connectionStateLabel() {
  if (!activeSession) {
    return '';
  }
  if (connectionState === 'connected') {
    return 'Connected';
  }
  if (connectionState === 'connecting') {
    return 'Connecting';
  }
  if (connectionState === 'error') {
    return 'Connection issue';
  }
  return '';
}

function shortProfileLabel(profile) {
  const known = {
    Terminal: 'TM',
    Codex: 'CX',
    Claude: 'CL',
    Grok: 'GR'
  };
  if (known[profile?.name]) {
    return known[profile.name];
  }
  return String(profile?.name || '')
    .replace(/[^A-Za-z0-9]+/g, '')
    .slice(0, 2)
    .toLocaleUpperCase();
}

function renderHeaderSummary() {
  const profile = activeKeyProfile();
  currentSessionElement.textContent = activeSession || 'No session';
  if (activeProfileElement) {
    activeProfileElement.textContent = profile.name;
    activeProfileElement.dataset.shortLabel = shortProfileLabel(profile);
    activeProfileElement.title = `Profile: ${profile.name}`;
    activeProfileElement.setAttribute(
      'aria-label',
      `Active profile: ${profile.name}`
    );
    activeProfileElement.hidden = !activeSession;
  }
  connectionDotElement.dataset.state = connectionState;
  connectionDotElement.title = connectionDotTitle();
  connectionDotElement.setAttribute('aria-label', connectionDotTitle());
  connectionDotElement.disabled = !activeSession;
  if (connectionStateLabelElement) {
    connectionStateLabelElement.textContent = connectionStateLabel();
    connectionStateLabelElement.dataset.state = connectionState;
    connectionStateLabelElement.hidden = !activeSession;
  }
  renderQuickMenu();
  syncPickerScrim();
}

/** Session profile assignment lives in the Menu sheet, not in the top bar. */
function renderQuickMenu() {
  if (!quickMenuProfileSection || !quickMenuProfileList) {
    return;
  }
  quickMenuProfileSection.hidden = !activeSession;
  if (!activeSession) {
    quickMenuProfileList.replaceChildren();
    return;
  }
  const profile = activeKeyProfile();
  const assignments = loadSessionKeyProfileAssignments();
  const assignedProfileId = assignments[activeSession] || '';
  if (quickMenuProfileValue) {
    quickMenuProfileValue.textContent = profile.name;
  }
  if (quickMenuProfileHint) {
    quickMenuProfileHint.textContent =
      `Keys, Snippets, and pins used by ${activeSession}.`;
  }
  // A background reconnect can rebuild this list while it is open, so keep the
  // caller's place instead of dropping focus and scroll to the top.
  const focusedProfileId = quickMenuProfileList.contains(document.activeElement)
    ? document.activeElement.dataset.profileId ?? null
    : null;
  const listScrollTop = quickMenuProfileList.scrollTop;
  quickMenuProfileList.replaceChildren();

  const options = [
    {
      id: '',
      label: `Use default — ${defaultKeyProfile().name}`
    },
    ...loadKeyProfilesDocument().profiles.map((entry) => ({
      id: entry.id,
      label: entry.name
    }))
  ];
  for (const option of options) {
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'menuitemradio';
    button.dataset.profileId = option.id;
    button.textContent = option.label;
    const checked = option.id === assignedProfileId;
    button.setAttribute('aria-checked', String(checked));
    // Roving tabindex: Tab reaches the list once, arrows move inside it. The
    // tab stop follows the arrow-key position, not the assignment, so a
    // background re-render cannot desync the focus ring from the Tab order.
    button.tabIndex = option.id === (focusedProfileId ?? assignedProfileId)
      ? 0
      : -1;
    quickMenuProfileList.append(button);
  }
  quickMenuProfileList.scrollTop = listScrollTop;
  if (focusedProfileId !== null) {
    quickMenuProfileList.querySelector(
      `button[data-profile-id="${CSS.escape(focusedProfileId)}"]`
    )?.focus({ preventScroll: true });
  }
}

/** role="menu" implies arrow-key movement, so implement it. */
function moveQuickMenuProfileFocus(key) {
  if (!quickMenuProfileList) {
    return false;
  }
  const options = [...quickMenuProfileList.querySelectorAll('button')];
  if (options.length === 0) {
    return false;
  }
  const current = options.indexOf(document.activeElement);
  let next = current;
  if (key === 'ArrowDown') {
    next = current < 0 ? 0 : (current + 1) % options.length;
  } else if (key === 'ArrowUp') {
    next = current <= 0 ? options.length - 1 : current - 1;
  } else if (key === 'Home') {
    next = 0;
  } else if (key === 'End') {
    next = options.length - 1;
  } else {
    return false;
  }
  for (const option of options) {
    option.tabIndex = option === options[next] ? 0 : -1;
  }
  options[next].focus({ preventScroll: false });
  return true;
}

function openQuickMenu() {
  // Everything in the sheet is session-scoped, so with no session the control
  // keeps its old meaning and opens settings directly.
  if (!quickMenuDialog || !activeSession) {
    openSettingsDialog();
    return;
  }
  renderQuickMenu();
  updateTermControlsEnabled();
  if (!quickMenuDialog.open) {
    quickMenuDialog.showModal();
    // Focus the sheet, not the close button, so nothing reads as pre-selected.
    quickMenuDialog.focus({ preventScroll: true });
  }
}

function closeQuickMenu() {
  if (quickMenuDialog?.open) {
    quickMenuDialog.close();
  }
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
  // Reasons go on aria-label too, because a disabled button's title is not
  // announced — but the accessible name keeps the visible label as a prefix so
  // voice control still matches what the user reads (WCAG 2.5.3).
  const describeMenuAction = (button, enabled, detail) => {
    if (!button) {
      return;
    }
    const visible = button.textContent.trim();
    const name = detail ? `${visible} — ${detail}` : visible;
    button.disabled = !enabled;
    button.title = name;
    button.setAttribute('aria-label', name);
  };
  describeMenuAction(
    quickMenuFindButton,
    live,
    live ? '' : 'connect a session first'
  );
  describeMenuAction(
    quickMenuRenameButton,
    Boolean(activeSession),
    activeSession || 'select a session first'
  );
  describeMenuAction(
    quickMenuReconnectButton,
    Boolean(activeSession),
    activeSession || 'select a session first'
  );
  // With no session the control opens settings directly, so it says so.
  for (const button of [
    document.querySelector('#settings'),
    headerSettingsButton
  ]) {
    if (!button) {
      continue;
    }
    button.title = activeSession ? 'Menu' : 'Settings';
    button.setAttribute(
      'aria-label',
      activeSession ? 'Open menu' : 'Open settings'
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
  // Retire the old socket before close so its callbacks cannot schedule retries.
  const retiredSocket = socket;
  socket = null;
  if (retiredSocket) {
    try {
      retiredSocket.close();
    } catch {
      // Ignore close races.
    }
  }
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

function headerPickerOpen() {
  return !appHeaderElement.classList.contains('collapsed');
}

/**
 * The scrim only exists to take the dismissing tap away from the session, so
 * it appears exactly when the picker overlays a live terminal.
 */
function syncPickerScrim() {
  if (!pickerScrimElement) {
    return;
  }
  pickerScrimElement.hidden = !(
    headerPickerOpen() && activeSession && viewMode !== 'files'
  );
}

function setHeaderCollapsed(collapsed) {
  clearTimeout(headerCollapseTimer);
  headerCollapseTimer = null;
  const hadFocusInside = headerExpandedElement?.contains(document.activeElement);
  appHeaderElement.classList.toggle('collapsed', collapsed);
  headerSummaryButton.setAttribute('aria-expanded', String(!collapsed));
  if (collapsed) {
    // Hiding the picker must not leave focus on a display:none control. In
    // Files mode the summary is hidden too, so focus goes to the view switch.
    if (hadFocusInside) {
      const target = headerSummaryButton.offsetParent
        ? headerSummaryButton
        : viewModeElement?.querySelector(`[data-view-mode="${viewMode}"]`);
      target?.focus({ preventScroll: true });
    }
  } else {
    // Picker and tools drawer are both overlays; only one at a time.
    closeFooterDrawer();
    scheduleHeaderCollapse();
  }
  syncPickerScrim();
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

function sanitizeCustomKeyDefs(defs) {
  const cleaned = [];
  const seen = new Set();
  if (!Array.isArray(defs)) {
    return cleaned;
  }
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
  return cleaned;
}

function loadLegacyCustomKeyDefs() {
  try {
    const raw = window.localStorage.getItem(customKeysStorageKey);
    if (!raw) {
      return [];
    }
    return sanitizeCustomKeyDefs(JSON.parse(raw));
  } catch {
    return [];
  }
}

function sanitizeKeyProfileName(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maximumKeyProfileNameLength);
}

function isValidKeyProfileId(value) {
  return (
    value === 'shell' ||
    (typeof value === 'string' &&
      /^profile-[a-z0-9]{8,48}$/.test(value))
  );
}

function sanitizeShortcutIdsForProfile(ids, customKeys, useDefaults = true) {
  const customIds = new Set(customKeys.map((entry) => entry.id));
  const seen = new Set();
  const cleaned = [];
  if (Array.isArray(ids)) {
    for (const id of ids) {
      const known =
        typeof id === 'string' &&
        id !== 'find' &&
        (Object.hasOwn(builtinShortcutCatalog, id) || customIds.has(id));
      if (!known || seen.has(id)) {
        continue;
      }
      seen.add(id);
      cleaned.push(id);
    }
  }
  if (cleaned.length > 0 || !useDefaults) {
    return cleaned;
  }
  return [...defaultShortcutIds];
}

function sanitizeProfileSnippetIds(ids) {
  if (ids === null || ids === undefined) {
    // Legacy profiles showed the whole shared library.
    return null;
  }
  if (!Array.isArray(ids)) {
    return [];
  }
  const seen = new Set();
  const cleaned = [];
  for (const id of ids) {
    if (
      typeof id !== 'string' ||
      !/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(id) ||
      seen.has(id)
    ) {
      continue;
    }
    seen.add(id);
    cleaned.push(id);
    if (cleaned.length >= maximumProfileSnippetIds) {
      break;
    }
  }
  return cleaned;
}

function sanitizeProfilePins(pins, customKeys = []) {
  const customIds = new Set(customKeys.map((entry) => entry.id));
  const seen = new Set();
  const cleaned = [];
  if (!Array.isArray(pins)) {
    return cleaned;
  }
  for (const entry of pins) {
    if (
      !entry ||
      typeof entry.id !== 'string' ||
      entry.id.length === 0 ||
      entry.id.length > 128
    ) {
      continue;
    }
    const valid =
      (entry.kind === 'key' &&
        entry.id !== 'find' &&
        (Object.hasOwn(builtinShortcutCatalog, entry.id) ||
          customIds.has(entry.id))) ||
      entry.kind === 'snip';
    const identity = `${entry.kind}:${entry.id}`;
    if (!valid || seen.has(identity)) {
      continue;
    }
    seen.add(identity);
    cleaned.push({ kind: entry.kind, id: entry.id });
    if (cleaned.length >= maximumFooterPins) {
      break;
    }
  }
  return cleaned;
}

function loadLegacyFooterPins(customKeys) {
  try {
    const raw = window.localStorage.getItem(footerPinsStorageKey);
    return raw
      ? sanitizeProfilePins(JSON.parse(raw), customKeys)
      : [];
  } catch {
    return [];
  }
}

function sanitizeKeyProfile(entry, usedIds = new Set()) {
  if (
    !entry ||
    typeof entry !== 'object' ||
    !isValidKeyProfileId(entry.id) ||
    usedIds.has(entry.id)
  ) {
    return null;
  }
  const name = sanitizeKeyProfileName(entry.name);
  if (!name) {
    return null;
  }
  const customKeys = sanitizeCustomKeyDefs(entry.customKeys);
  const pins = sanitizeProfilePins(
    Array.isArray(entry.pins)
      ? entry.pins
      : entry.id === 'shell'
        ? loadLegacyFooterPins(customKeys)
        : [],
    customKeys
  );
  return {
    id: entry.id,
    name,
    shortcutIds: sanitizeShortcutIdsForProfile(
      entry.shortcutIds,
      customKeys
    ),
    customKeys,
    snippetIds: sanitizeProfileSnippetIds(entry.snippetIds),
    pins
  };
}

function loadLegacyShortcutIds(customKeys) {
  try {
    const raw = window.localStorage.getItem(shortcutsStorageKey);
    if (!raw) {
      return [...defaultShortcutIds];
    }
    return sanitizeShortcutIdsForProfile(JSON.parse(raw), customKeys);
  } catch {
    return [...defaultShortcutIds];
  }
}

function migratedShellKeyProfile() {
  const customKeys = loadLegacyCustomKeyDefs();
  return {
    id: 'shell',
    name: 'Terminal',
    shortcutIds: loadLegacyShortcutIds(customKeys),
    customKeys,
    snippetIds: null,
    pins: loadLegacyFooterPins(customKeys)
  };
}

function sanitizeKeyProfilesDocument(value) {
  const usedIds = new Set();
  const profiles = [];
  if (value && typeof value === 'object' && Array.isArray(value.profiles)) {
    for (const entry of value.profiles) {
      const profile = sanitizeKeyProfile(entry, usedIds);
      if (!profile) {
        continue;
      }
      usedIds.add(profile.id);
      profiles.push(profile);
      if (profiles.length >= maximumKeyProfiles) {
        break;
      }
    }
  }
  if (profiles.length === 0) {
    profiles.push(migratedShellKeyProfile());
  }
  const requestedDefault =
    typeof value?.defaultProfileId === 'string'
      ? value.defaultProfileId
      : '';
  const defaultProfileId = profiles.some(
    (profile) => profile.id === requestedDefault
  )
    ? requestedDefault
    : profiles.find((profile) => profile.id === 'shell')?.id || profiles[0].id;
  const starterProfilesVersionValue = Number.isInteger(
    value?.starterProfilesVersion
  )
    ? Math.max(0, value.starterProfilesVersion)
    : 0;
  const starterSnippetSelectionsVersionValue = Number.isInteger(
    value?.starterSnippetSelectionsVersion
  )
    ? Math.max(0, value.starterSnippetSelectionsVersion)
    : 0;
  return {
    version: 2,
    starterProfilesVersion: starterProfilesVersionValue,
    starterSnippetSelectionsVersion: starterSnippetSelectionsVersionValue,
    defaultProfileId,
    profiles
  };
}

function withStarterKeyProfiles(documentValue) {
  if (documentValue.starterProfilesVersion >= starterKeyProfilesVersion) {
    return documentValue;
  }
  const profiles = documentValue.profiles.map((profile) =>
    profile.id === 'shell' && profile.name === 'Shell'
      ? { ...profile, name: 'Terminal' }
      : profile
  );
  for (const template of starterKeyProfileTemplates) {
    if (profiles.length >= maximumKeyProfiles) {
      break;
    }
    const duplicate = profiles.some(
      (profile) =>
        profile.id === template.id ||
        profile.name.toLocaleLowerCase() === template.name.toLocaleLowerCase()
    );
    if (duplicate) {
      continue;
    }
    profiles.push({
      id: template.id,
      name: template.name,
      shortcutIds: [...template.shortcutIds],
      customKeys: [],
      snippetIds: [...template.snippetIds],
      pins: template.pins.map((pin) => ({ ...pin }))
    });
  }
  const allStartersHandled = starterKeyProfileTemplates.every((template) =>
    profiles.some(
      (profile) =>
        profile.id === template.id ||
        profile.name.toLocaleLowerCase() === template.name.toLocaleLowerCase()
    )
  );
  return {
    ...documentValue,
    version: 2,
    starterProfilesVersion: allStartersHandled
      ? starterKeyProfilesVersion
      : documentValue.starterProfilesVersion,
    profiles
  };
}

function applyStarterProfileSnippetSelections() {
  const documentValue = loadKeyProfilesDocument();
  if (
    documentValue.starterSnippetSelectionsVersion >=
    starterProfileSnippetSelectionsVersion
  ) {
    return;
  }
  const availableIds = new Set(snippetsList.map((snippet) => snippet.id));
  const selectedIds = starterProfileSnippetCandidateGroups
    .map((candidates) => candidates.find((id) => availableIds.has(id)))
    .filter(Boolean);
  const starterIds = new Set(
    starterKeyProfileTemplates.map((template) => template.id)
  );
  const profiles = documentValue.profiles.map((profile) =>
    starterIds.has(profile.id)
      ? { ...profile, snippetIds: [...selectedIds] }
      : profile
  );
  preferencesBootstrapMutation = true;
  try {
    saveKeyProfilesDocument({
      ...documentValue,
      starterSnippetSelectionsVersion:
        starterProfileSnippetSelectionsVersion,
      profiles
    });
  } finally {
    preferencesBootstrapMutation = false;
  }
}

function saveKeyProfilesDocument(value) {
  const cleaned = sanitizeKeyProfilesDocument(value);
  keyProfilesDocument = cleaned;
  if (!qaShellMode) {
    try {
      window.localStorage.setItem(
        keyProfilesStorageKey,
        JSON.stringify(cleaned)
      );
    } catch {
      // Continue with the in-memory profile document.
    }
  }
  noteDurablePreferencesChange();
  return cleaned;
}

function loadKeyProfilesDocument() {
  if (keyProfilesDocument) {
    return keyProfilesDocument;
  }
  try {
    const raw = window.localStorage.getItem(keyProfilesStorageKey);
    if (raw) {
      return saveKeyProfilesDocument(
        withStarterKeyProfiles(
          sanitizeKeyProfilesDocument(JSON.parse(raw))
        )
      );
    }
  } catch {
    // Migrate from legacy Keys storage below.
  }
  markPreferencesBootstrapGenerated();
  return saveKeyProfilesDocument(
    withStarterKeyProfiles({
      version: 2,
      starterProfilesVersion: 0,
      starterSnippetSelectionsVersion: 0,
      defaultProfileId: 'shell',
      profiles: [migratedShellKeyProfile()]
    })
  );
}

function keyProfileById(id) {
  return (
    loadKeyProfilesDocument().profiles.find((profile) => profile.id === id) ||
    null
  );
}

function defaultKeyProfile() {
  const documentValue = loadKeyProfilesDocument();
  return (
    keyProfileById(documentValue.defaultProfileId) ||
    documentValue.profiles[0]
  );
}

function loadSessionKeyProfileAssignments() {
  if (sessionKeyProfileAssignments) {
    return { ...sessionKeyProfileAssignments };
  }
  try {
    const raw = window.localStorage.getItem(sessionKeyProfilesStorageKey);
    if (!raw) {
      sessionKeyProfileAssignments = {};
      return {};
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      sessionKeyProfileAssignments = {};
      return {};
    }
    const cleaned = {};
    for (const [sessionName, profileId] of Object.entries(parsed)) {
      if (
        typeof sessionName === 'string' &&
        sessionName.length > 0 &&
        sessionName.length <= 128 &&
        typeof profileId === 'string' &&
        keyProfileById(profileId)
      ) {
        cleaned[sessionName] = profileId;
      }
    }
    sessionKeyProfileAssignments = cleaned;
    return { ...cleaned };
  } catch {
    sessionKeyProfileAssignments = {};
    return {};
  }
}

function saveSessionKeyProfileAssignments(assignments) {
  const cleaned = {};
  for (const [sessionName, profileId] of Object.entries(assignments || {})) {
    if (
      typeof sessionName === 'string' &&
      sessionName.length > 0 &&
      sessionName.length <= 128 &&
      keyProfileById(profileId)
    ) {
      cleaned[sessionName] = profileId;
    }
  }
  sessionKeyProfileAssignments = cleaned;
  if (!qaShellMode) {
    try {
      window.localStorage.setItem(
        sessionKeyProfilesStorageKey,
        JSON.stringify(cleaned)
      );
    } catch {
      // Continue without persistence.
    }
  }
  noteDurablePreferencesChange();
  return { ...cleaned };
}

function keyProfileForSession(sessionName) {
  const assignments = loadSessionKeyProfileAssignments();
  return keyProfileById(assignments[sessionName]) || defaultKeyProfile();
}

function activeKeyProfile() {
  return activeSession
    ? keyProfileForSession(activeSession)
    : defaultKeyProfile();
}

function editorKeyProfile() {
  return keyProfileById(keyProfileEditorId) || activeKeyProfile();
}

function updateKeyProfile(profileId, updater) {
  const documentValue = loadKeyProfilesDocument();
  const nextProfiles = documentValue.profiles.map((profile) => {
    if (profile.id !== profileId) {
      return profile;
    }
    return updater({
      ...profile,
      shortcutIds: [...profile.shortcutIds],
      customKeys: profile.customKeys.map((entry) => ({ ...entry })),
      snippetIds:
        profile.snippetIds === null ? null : [...profile.snippetIds],
      pins: profile.pins.map((entry) => ({ ...entry }))
    });
  });
  return saveKeyProfilesDocument({
    ...documentValue,
    profiles: nextProfiles
  });
}

function getShortcutDef(id, profile = activeKeyProfile()) {
  if (typeof id !== 'string') {
    return null;
  }
  if (Object.hasOwn(builtinShortcutCatalog, id)) {
    return builtinShortcutCatalog[id];
  }
  return profile?.customKeys?.find((entry) => entry.id === id) || null;
}

function isKnownShortcutId(id, profile = activeKeyProfile()) {
  return getShortcutDef(id, profile) !== null;
}

function loadCustomKeyDefs(profile = editorKeyProfile()) {
  return profile?.customKeys?.map((entry) => ({ ...entry })) || [];
}

function saveCustomKeyDefs(defs, profileId = editorKeyProfile().id) {
  const cleaned = sanitizeCustomKeyDefs(defs);
  updateKeyProfile(profileId, (profile) => ({
    ...profile,
    customKeys: cleaned,
    shortcutIds: sanitizeShortcutIdsForProfile(
      profile.shortcutIds,
      cleaned
    )
  }));
  return cleaned;
}

function loadShortcutIds(profile = activeKeyProfile()) {
  return [...(profile?.shortcutIds || defaultShortcutIds)];
}

function saveShortcutIds(ids, profileId = editorKeyProfile().id) {
  const profile = keyProfileById(profileId) || editorKeyProfile();
  const cleaned = sanitizeShortcutIdsForProfile(ids, profile.customKeys);
  updateKeyProfile(profile.id, (entry) => ({
    ...entry,
    shortcutIds: cleaned
  }));
  return cleaned;
}

function snippetsForProfile(profile = activeKeyProfile()) {
  if (!profile || profile.snippetIds === null) {
    return [...snippetsList];
  }
  const included = new Set(profile.snippetIds);
  return snippetsList.filter((snippet) => included.has(snippet.id));
}

function saveProfileSnippetIds(ids, profileId = editorKeyProfile().id) {
  const previousScrollTop = profileSnippetList?.scrollTop || 0;
  const cleaned = sanitizeProfileSnippetIds(ids);
  updateKeyProfile(profileId, (profile) => ({
    ...profile,
    snippetIds: cleaned,
    pins:
      cleaned === null
        ? profile.pins
        : profile.pins.filter(
            (pin) => pin.kind !== 'snip' || cleaned.includes(pin.id)
          )
  }));
  refreshKeysUi();
  if (profileSnippetList) {
    profileSnippetList.scrollTop = previousScrollTop;
  }
  return cleaned;
}

function reconcileSnippetReferences() {
  const knownIds = new Set(snippetsList.map((snippet) => snippet.id));
  const documentValue = loadKeyProfilesDocument();
  let changed = false;
  const profiles = documentValue.profiles.map((profile) => {
    const snippetIds =
      profile.snippetIds === null
        ? null
        : profile.snippetIds.filter((id) => knownIds.has(id));
    const selectedIds = snippetIds === null ? knownIds : new Set(snippetIds);
    const pins = profile.pins.filter(
      (pin) =>
        pin.kind !== 'snip' ||
        (knownIds.has(pin.id) && selectedIds.has(pin.id))
    );
    if (
      (snippetIds !== null &&
        snippetIds.length !== profile.snippetIds.length) ||
      pins.length !== profile.pins.length
    ) {
      changed = true;
      return { ...profile, snippetIds, pins };
    }
    return profile;
  });
  if (changed) {
    saveKeyProfilesDocument({ ...documentValue, profiles });
  }
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
      errorName: error?.name || 'Error'
    });
    setStatus('Find failed');
    return false;
  }
}

function loadFooterPins(profile = activeKeyProfile()) {
  return sanitizeProfilePins(profile?.pins, profile?.customKeys);
}

function saveFooterPins(pins, profileId = activeKeyProfile().id) {
  const profile = keyProfileById(profileId) || activeKeyProfile();
  const cleaned = sanitizeProfilePins(pins, profile.customKeys);
  updateKeyProfile(profile.id, (entry) => ({
    ...entry,
    pins: cleaned
  }));
  return cleaned;
}

function removeFooterPinFromEveryProfile(kind, id) {
  const documentValue = loadKeyProfilesDocument();
  let changed = false;
  const profiles = documentValue.profiles.map((profile) => {
    const pins = profile.pins.filter(
      (pin) => pin.kind !== kind || pin.id !== id
    );
    if (pins.length === profile.pins.length) {
      return profile;
    }
    changed = true;
    return { ...profile, pins };
  });
  if (changed) {
    saveKeyProfilesDocument({ ...documentValue, profiles });
  }
}

function isPinned(kind, id, profile = activeKeyProfile()) {
  return loadFooterPins(profile).some(
    (entry) => entry.kind === kind && entry.id === id
  );
}

function toggleProfilePin(profileId, kind, id) {
  const profile = keyProfileById(profileId);
  if (!profile) {
    return;
  }
  const pins = loadFooterPins(profile);
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
    if (kind === 'key' && !isKnownShortcutId(id, profile)) {
      return;
    }
    if (
      kind === 'snip' &&
      !snippetsForProfile(profile).some((entry) => entry.id === id)
    ) {
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
  saveFooterPins(pins, profile.id);
  refreshKeysUi();
}

function toggleFooterPin(kind, id) {
  toggleProfilePin(activeKeyProfile().id, kind, id);
}

function setFooterDrawer(mode) {
  const next =
    mode === 'keys' || mode === 'snips' || mode === 'pins' ? mode : null;
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
  if (footerPinOverflowButton) {
    footerPinOverflowButton.classList.toggle(
      'active',
      footerDrawer === 'pins'
    );
    footerPinOverflowButton.setAttribute(
      'aria-pressed',
      String(footerDrawer === 'pins')
    );
  }
  if (footerDrawer === 'snips' && snippetsList.length === 0) {
    void loadSnippetsFromServer();
  }
  renderFooterDrawer();
  scheduleFooterPinLayout();
  scheduleLayoutDebug('drawer');
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
  footerPinOverflowButton?.classList.remove('active');
  footerPinOverflowButton?.setAttribute('aria-pressed', 'false');
  if (footerDrawerElement) {
    footerDrawerElement.hidden = true;
    footerDrawerElement.replaceChildren();
  }
  scheduleFooterPinLayout();
  scheduleLayoutDebug('drawer');
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

/** An open drawer always says something; a blank strip looks broken. */
function appendDrawerEmptyHint(text) {
  if (!footerDrawerElement || footerDrawerElement.childElementCount > 0) {
    return;
  }
  const hint = document.createElement('span');
  hint.className = 'drawer-empty-hint';
  hint.textContent = text;
  footerDrawerElement.append(hint);
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
    appendDrawerEmptyHint('No keys in this profile');
    return;
  }
  if (footerDrawer === 'pins') {
    for (const pin of loadFooterPins()) {
      const button =
        pin.kind === 'key'
          ? createKeyChipButton(pin.id, { pinned: true })
          : createSnipChipButton(
              snippetsForProfile().find((entry) => entry.id === pin.id),
              { pinned: true }
            );
      if (button) {
        footerDrawerElement.append(button);
      }
    }
    if (footerSnipsInOverflow) {
      const snippetsButton = document.createElement('button');
      snippetsButton.type = 'button';
      snippetsButton.className = 'drawer-action';
      snippetsButton.textContent = 'Snips';
      snippetsButton.title = 'Open profile snippets';
      snippetsButton.addEventListener('click', () => {
        setFooterDrawer('snips');
      });
      footerDrawerElement.append(snippetsButton);
    }
    appendDrawerEmptyHint('No pins in this profile');
    return;
  }
  for (const snippet of snippetsForProfile()) {
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
  appendDrawerEmptyHint('No snippets in this profile');
}

let footerPinLayoutFrame = 0;
let footerSnipsInOverflow = false;
let footerHiddenPinCount = 0;

function updateFooterPinOverflow() {
  if (
    !footerPinsElement ||
    !footerScrollElement ||
    !footerPinOverflowButton
  ) {
    return;
  }
  const buttons = [...footerPinsElement.querySelectorAll('button')];
  const landscapeRail = window.matchMedia?.(
    '(orientation: landscape) and (pointer: coarse)'
  ).matches;
  const overflows = () =>
    landscapeRail
      ? footerScrollElement.scrollHeight >
        footerScrollElement.clientHeight + 1
      : footerScrollElement.scrollWidth >
        footerScrollElement.clientWidth + 1;
  if (
    (footerDrawer === 'pins' || footerDrawer === 'snips') &&
    footerSnipsInOverflow
  ) {
    const preservedHiddenCount = Math.min(
      footerHiddenPinCount,
      Math.max(0, buttons.length - 1)
    );
    footerHiddenPinCount = preservedHiddenCount;
    buttons.forEach((button, index) => {
      button.hidden =
        index >= buttons.length - preservedHiddenCount;
    });
    let nextHiddenIndex = buttons.length - preservedHiddenCount - 1;
    while (nextHiddenIndex >= 1 && overflows()) {
      buttons[nextHiddenIndex].hidden = true;
      footerHiddenPinCount += 1;
      nextHiddenIndex -= 1;
    }
    drawerSnipsButton.hidden = true;
    footerPinOverflowButton.hidden = false;
    footerPinOverflowButton.classList.add('active');
    footerPinOverflowButton.setAttribute('aria-pressed', 'true');
    footerPinOverflowButton.textContent = '−';
    footerPinOverflowButton.title =
      footerDrawer === 'pins'
        ? 'Close pinned shortcuts'
        : 'Close profile snippets';
    footerPinOverflowButton.setAttribute(
      'aria-label',
      footerPinOverflowButton.title
    );
    return;
  }
  for (const button of buttons) {
    button.hidden = false;
  }
  footerSnipsInOverflow = false;
  footerHiddenPinCount = 0;
  drawerSnipsButton.hidden = false;
  footerPinOverflowButton.classList.remove('active');
  footerPinOverflowButton.setAttribute('aria-pressed', 'false');
  footerPinOverflowButton.hidden = true;
  footerPinOverflowButton.textContent = '+0';
  if (
    buttons.length === 0 ||
    footerScrollElement.clientWidth === 0 ||
    footerScrollElement.clientHeight === 0
  ) {
    return;
  }
  if (!overflows()) {
    return;
  }
  footerPinOverflowButton.hidden = false;
  drawerSnipsButton.hidden = true;
  footerSnipsInOverflow = true;
  let hiddenCount = 0;
  for (let index = buttons.length - 1; index >= 0 && overflows(); index -= 1) {
    buttons[index].hidden = true;
    hiddenCount += 1;
  }
  footerHiddenPinCount = hiddenCount;
  if (hiddenCount === 0) {
    footerPinOverflowButton.textContent = '•••';
    footerPinOverflowButton.title = 'More terminal tools';
    footerPinOverflowButton.setAttribute(
      'aria-label',
      'Show more terminal tools'
    );
    return;
  }
  footerPinOverflowButton.textContent = `+${hiddenCount}`;
  footerPinOverflowButton.title = `${hiddenCount} more pinned shortcuts`;
  footerPinOverflowButton.setAttribute(
    'aria-label',
    `Show ${hiddenCount} more pinned shortcuts`
  );
}

function scheduleFooterPinLayout() {
  cancelAnimationFrame(footerPinLayoutFrame);
  footerPinLayoutFrame = requestAnimationFrame(() => {
    footerPinLayoutFrame = 0;
    updateFooterPinOverflow();
  });
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
    const snippet = snippetsForProfile().find((entry) => entry.id === pin.id);
    if (!snippet) {
      continue;
    }
    const button = createSnipChipButton(snippet, { pinned: true });
    if (button) {
      footerPinsElement.append(button);
    }
  }
  scheduleFooterPinLayout();
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
  const migrated =
    tabId === 'keys' ? 'profiles' : tabId === 'snips' ? 'library' : tabId;
  const allowed = new Set(['profiles', 'library', 'theme', 'app']);
  const active = allowed.has(migrated) ? migrated : 'profiles';
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
  if (active === 'profiles') {
    renderKeyProfileControls();
    renderShortcutEditor();
    renderProfileSnippetSelector();
    if (snippetsList.length === 0) {
      void loadSnippetsFromServer();
    }
  }
  if (active === 'library') {
    void loadSnippetsFromServer();
  }
  if (active === 'app') {
    updateInstallSettings();
    updateAppHelpPanel();
    updatePreferencesSyncUi();
  }
}

function loadLastSettingsTab() {
  try {
    const tab = window.localStorage.getItem(settingsLastTabStorageKey);
    if (tab === 'keys') {
      return 'profiles';
    }
    if (tab === 'snips') {
      return 'library';
    }
    if (tab === 'profiles' || tab === 'library' || tab === 'theme' || tab === 'app') {
      return tab;
    }
  } catch {
    // ignore
  }
  return 'profiles';
}

function updateAppHelpPanel() {
  const help = document.querySelector('#app-help-text');
  if (!help) {
    return;
  }
  help.textContent = [
    `${appDisplayName}.`,
    'Hold a Keys/Snips chip to pin it to the main bar.',
    'Menu holds Find, rename, reconnect, and session profile.',
    'Keys reach the session even when focus is on chrome, except reserved browser shortcuts (Ctrl/Cmd+R, etc.).'
  ].join(' ');
}

async function loadAppConfig() {
  try {
    const cfg = await api('/api/config');
    const shouldFlushClientDebug =
      cfg?.clientDebug === true && !clientDebugServerEnabled;
    clientDebugServerEnabled = cfg?.clientDebug === true;
    if (shouldFlushClientDebug) {
      shipClientDebugEntries(clientDebugEntries.slice(-20));
    }
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
      applyStarterProfileSnippetSelections();
      reconcileSnippetReferences();
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
    renderProfileSnippetSelector();
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
  reconcileSnippetReferences();
  if (footerDrawer === 'snips') {
    renderFooterDrawer();
  }
  renderFooterPins();
  renderSnippetEditor();
  renderProfileSnippetSelector();
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
    removeFooterPinFromEveryProfile('snip', id);
    renderFooterPins();
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
  if (!window.confirm('Reset snippets to their built-in defaults?')) {
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
  if (
    footerDrawer === 'keys' ||
    footerDrawer === 'snips' ||
    footerDrawer === 'pins'
  ) {
    renderFooterDrawer();
  }
  renderFooterPins();
  renderHeaderSummary();
  renderKeyProfileControls();
  renderShortcutEditor();
  renderProfileSnippetSelector();
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

function createKeyProfileId() {
  const random =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 16)
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  return `profile-${random}`;
}

function keyProfileNameExists(name, exceptId = '') {
  const normalized = sanitizeKeyProfileName(name).toLocaleLowerCase();
  return loadKeyProfilesDocument().profiles.some(
    (profile) =>
      profile.id !== exceptId &&
      profile.name.toLocaleLowerCase() === normalized
  );
}

function appendKeyProfileOptions(select) {
  if (!select) {
    return;
  }
  const documentValue = loadKeyProfilesDocument();
  select.replaceChildren();
  for (const profile of documentValue.profiles) {
    const option = document.createElement('option');
    option.value = profile.id;
    option.textContent = profile.name;
    select.append(option);
  }
}

function renderKeyProfileControls() {
  if (!keyProfileSelect) {
    return;
  }
  const documentValue = loadKeyProfilesDocument();
  if (!keyProfileById(keyProfileEditorId)) {
    keyProfileEditorId = activeKeyProfile().id;
  }
  appendKeyProfileOptions(keyProfileSelect);
  keyProfileSelect.value = keyProfileEditorId;

  appendKeyProfileOptions(keyProfileDefaultSelect);
  if (keyProfileDefaultSelect) {
    keyProfileDefaultSelect.value = documentValue.defaultProfileId;
  }

  if (keyProfileNewButton) {
    keyProfileNewButton.disabled =
      documentValue.profiles.length >= maximumKeyProfiles;
  }
  if (keyProfileDuplicateButton) {
    keyProfileDuplicateButton.disabled =
      documentValue.profiles.length >= maximumKeyProfiles;
  }
  if (keyProfileDeleteButton) {
    keyProfileDeleteButton.disabled = documentValue.profiles.length <= 1;
  }
  const profile = editorKeyProfile();
  const visibleSnippetCount = snippetsForProfile(profile).length;
  if (keyProfileSummary) {
    keyProfileSummary.textContent = [
      `${profile.shortcutIds.length} keys`,
      `${visibleSnippetCount} snippets`,
      `${profile.pins.length} pinned`
    ].join(' · ');
  }
  if (profileKeyCount) {
    profileKeyCount.textContent = String(profile.shortcutIds.length);
  }
  if (profileSnippetCount) {
    profileSnippetCount.textContent =
      profile.snippetIds === null
        ? `${visibleSnippetCount} · all`
        : String(visibleSnippetCount);
  }
}

function createProfilePinToggle(kind, id, label, profile, options = {}) {
  const pinned = isPinned(kind, id, profile);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'settings-profile-pin';
  button.dataset.action = 'pin';
  button.classList.toggle('active', pinned);
  button.disabled = options.disabled === true;
  button.title = pinned ? `Unpin ${label}` : `Pin ${label} to main bar`;
  button.setAttribute('aria-label', button.title);
  button.setAttribute('aria-pressed', String(pinned));
  button.innerHTML =
    '<svg viewBox="0 0 20 20" aria-hidden="true">' +
    '<path d="M7 3h6l-.8 4 2.3 2.3v1.2h-4V17l-1 1-1-1v-6.5h-4V9.3L6.8 7z" />' +
    '</svg>';
  return button;
}

function renderProfileSnippetSelector() {
  if (!profileSnippetList) {
    return;
  }
  profileSnippetList.replaceChildren();
  if (snippetsList.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'settings-hint';
    empty.textContent = 'No Library snippets available.';
    profileSnippetList.append(empty);
    return;
  }
  const profile = editorKeyProfile();
  const selected = new Set(
    profile.snippetIds === null
      ? snippetsList.map((snippet) => snippet.id)
      : profile.snippetIds
  );
  for (const snippet of snippetsList) {
    const item = document.createElement('div');
    item.className = 'settings-profile-snippet-item';
    item.dataset.snippetId = snippet.id;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = snippet.id;
    input.checked = selected.has(snippet.id);
    input.setAttribute(
      'aria-label',
      `${input.checked ? 'Remove' : 'Add'} ${snippet.label} from ${profile.name}`
    );

    const selection = document.createElement('label');
    selection.className = 'settings-profile-snippet-select';

    const label = document.createElement('span');
    label.className = 'settings-profile-snippet-label';
    label.textContent = snippet.label;

    const behavior = document.createElement('span');
    behavior.className = 'settings-profile-snippet-behavior';
    behavior.textContent = snippet.run === false ? 'Insert' : 'Run';

    const pin = createProfilePinToggle(
      'snip',
      snippet.id,
      snippet.label,
      profile,
      { disabled: !input.checked }
    );

    selection.append(input, label, behavior);
    item.append(selection, pin);
    profileSnippetList.append(item);
  }
}

function createKeyProfile() {
  if (loadKeyProfilesDocument().profiles.length >= maximumKeyProfiles) {
    setStatus(`Profile limit ${maximumKeyProfiles}`);
    return;
  }
  const proposed = window.prompt('New profile name:', 'New profile');
  if (proposed === null) {
    return;
  }
  const name = sanitizeKeyProfileName(proposed);
  if (!name) {
    setStatus('Profile name required');
    return;
  }
  if (keyProfileNameExists(name)) {
    setStatus('Profile name already exists');
    return;
  }
  const profile = {
    id: createKeyProfileId(),
    name,
    shortcutIds: [...defaultShortcutIds],
    customKeys: [],
    snippetIds: [],
    pins: []
  };
  const documentValue = loadKeyProfilesDocument();
  saveKeyProfilesDocument({
    ...documentValue,
    profiles: [...documentValue.profiles, profile]
  });
  keyProfileEditorId = profile.id;
  setStatus(`Created profile: ${name}`);
  refreshKeysUi();
}

function duplicateKeyProfile() {
  const source = editorKeyProfile();
  const documentValue = loadKeyProfilesDocument();
  if (documentValue.profiles.length >= maximumKeyProfiles) {
    setStatus(`Profile limit ${maximumKeyProfiles}`);
    return;
  }
  const proposed = window.prompt(
    'Duplicate profile as:',
    `${source.name} copy`
  );
  if (proposed === null) {
    return;
  }
  const name = sanitizeKeyProfileName(proposed);
  if (!name || keyProfileNameExists(name)) {
    setStatus(name ? 'Profile name already exists' : 'Profile name required');
    return;
  }
  const idMap = new Map();
  const customKeys = source.customKeys.map((entry) => {
    const id = createCustomKeyId();
    idMap.set(entry.id, id);
    return { ...entry, id };
  });
  const profile = {
    id: createKeyProfileId(),
    name,
    shortcutIds: source.shortcutIds.map((id) => idMap.get(id) || id),
    customKeys,
    snippetIds:
      source.snippetIds === null ? null : [...source.snippetIds],
    pins: source.pins.map((pin) => ({
      ...pin,
      id: pin.kind === 'key' ? idMap.get(pin.id) || pin.id : pin.id
    }))
  };
  saveKeyProfilesDocument({
    ...documentValue,
    profiles: [...documentValue.profiles, profile]
  });
  keyProfileEditorId = profile.id;
  setStatus(`Duplicated profile: ${name}`);
  refreshKeysUi();
}

function renameKeyProfile() {
  const profile = editorKeyProfile();
  const proposed = window.prompt('Rename profile:', profile.name);
  if (proposed === null) {
    return;
  }
  const name = sanitizeKeyProfileName(proposed);
  if (!name) {
    setStatus('Profile name required');
    return;
  }
  if (keyProfileNameExists(name, profile.id)) {
    setStatus('Profile name already exists');
    return;
  }
  updateKeyProfile(profile.id, (entry) => ({ ...entry, name }));
  renderSessions();
  setStatus(`Renamed profile: ${name}`);
  refreshKeysUi();
}

function deleteKeyProfile() {
  const profile = editorKeyProfile();
  const documentValue = loadKeyProfilesDocument();
  if (
    documentValue.profiles.length <= 1 ||
    !window.confirm(
      `Delete profile “${profile.name}”? Sessions using it will fall back to the default profile.`
    )
  ) {
    return;
  }
  const profiles = documentValue.profiles.filter(
    (entry) => entry.id !== profile.id
  );
  const defaultProfileId =
    documentValue.defaultProfileId === profile.id
      ? profiles.find((entry) => entry.id === 'shell')?.id || profiles[0].id
      : documentValue.defaultProfileId;
  saveKeyProfilesDocument(
    withStarterKeyProfiles({
      ...documentValue,
      defaultProfileId,
      profiles
    })
  );
  const assignments = loadSessionKeyProfileAssignments();
  for (const [sessionName, profileId] of Object.entries(assignments)) {
    if (profileId === profile.id) {
      delete assignments[sessionName];
    }
  }
  saveSessionKeyProfileAssignments(assignments);
  keyProfileEditorId = defaultProfileId;
  setCtrlArmed(false);
  renderSessions();
  setStatus(`Deleted profile: ${profile.name}`);
  refreshKeysUi();
}

function selectKeyProfileForEditor(profileId) {
  if (!keyProfileById(profileId)) {
    return;
  }
  keyProfileEditorId = profileId;
  renderKeyProfileControls();
  renderShortcutEditor();
  renderProfileSnippetSelector();
}

function setDefaultKeyProfile(profileId) {
  if (!keyProfileById(profileId)) {
    return;
  }
  const documentValue = loadKeyProfilesDocument();
  saveKeyProfilesDocument({
    ...documentValue,
    defaultProfileId: profileId
  });
  renderSessions();
  setStatus(`Default profile: ${keyProfileById(profileId).name}`);
  refreshKeysUi();
}

function assignActiveSessionKeyProfile(profileId) {
  if (!activeSession) {
    return;
  }
  const assignments = loadSessionKeyProfileAssignments();
  if (profileId && keyProfileById(profileId)) {
    assignments[activeSession] = profileId;
  } else {
    delete assignments[activeSession];
  }
  saveSessionKeyProfileAssignments(assignments);
  keyProfileEditorId = activeKeyProfile().id;
  setCtrlArmed(false);
  renderSessions();
  setStatus(`${activeSession}: ${activeKeyProfile().name} profile`);
  refreshKeysUi();
}

function syncActiveKeyProfileUi() {
  keyProfileEditorId = activeKeyProfile().id;
  setCtrlArmed(false);
  refreshKeysUi();
}

function renameSessionKeyProfileAssignment(fromName, toName) {
  const assignments = loadSessionKeyProfileAssignments();
  if (!assignments[fromName]) {
    return;
  }
  assignments[toName] = assignments[fromName];
  delete assignments[fromName];
  saveSessionKeyProfileAssignments(assignments);
}

function renderShortcutEditor() {
  if (!shortcutEditorList || !shortcutAddSelect) {
    return;
  }
  const profile = editorKeyProfile();
  const ids = loadShortcutIds(profile);
  shortcutEditorList.replaceChildren();
  ids.forEach((id, index) => {
    const def = getShortcutDef(id, profile);
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

    const pin = createProfilePinToggle('key', id, def.label, profile);

    const more = document.createElement('details');
    more.className = 'shortcut-editor-more';
    const moreSummary = document.createElement('summary');
    moreSummary.title = `Manage ${def.label}`;
    moreSummary.setAttribute('aria-label', `Manage ${def.label}`);
    moreSummary.textContent = '•••';
    const moreActions = document.createElement('div');
    moreActions.className = 'shortcut-editor-more-actions';

    const up = document.createElement('button');
    up.type = 'button';
    up.dataset.action = 'up';
    up.title = 'Move up';
    up.setAttribute('aria-label', `Move ${def.label} up`);
    up.textContent = 'Move up';
    up.disabled = index === 0;

    const down = document.createElement('button');
    down.type = 'button';
    down.dataset.action = 'down';
    down.title = 'Move down';
    down.setAttribute('aria-label', `Move ${def.label} down`);
    down.textContent = 'Move down';
    down.disabled = index === ids.length - 1;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.dataset.action = 'remove';
    remove.title = isCustomKeyId(id)
      ? 'Remove from Keys and delete custom key'
      : 'Remove from Keys';
    remove.setAttribute('aria-label', `Remove ${def.label}`);
    remove.textContent = 'Remove';

    moreActions.append(up, down, remove);
    more.append(moreSummary, moreActions);
    actions.append(pin, more);
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

  const customDefs = loadCustomKeyDefs(profile).filter(
    (entry) => !active.has(entry.id)
  );
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
  const profile = editorKeyProfile();
  const ids = loadShortcutIds(profile);
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
  saveShortcutIds(copy, profile.id);
  refreshKeysUi();
}

function removeShortcut(id) {
  const profile = editorKeyProfile();
  const ids = loadShortcutIds(profile).filter((entry) => entry !== id);
  saveShortcutIds(ids, profile.id);
  if (id === 'ctrl') {
    ctrlArmed = false;
  }
  // Removing a custom key also deletes its definition (re-create if needed).
  if (isCustomKeyId(id)) {
    saveCustomKeyDefs(
      loadCustomKeyDefs(profile).filter((entry) => entry.id !== id),
      profile.id
    );
    const pins = loadFooterPins(profile).filter(
      (pin) => !(pin.kind === 'key' && pin.id === id)
    );
    saveFooterPins(pins, profile.id);
  }
  refreshKeysUi();
}

function addShortcut(id) {
  const profile = editorKeyProfile();
  if (!isKnownShortcutId(id, profile)) {
    return;
  }
  const ids = loadShortcutIds(profile);
  if (ids.includes(id)) {
    return;
  }
  ids.push(id);
  saveShortcutIds(ids, profile.id);
  refreshKeysUi();
}

function addCustomKeyFromForm() {
  const profile = editorKeyProfile();
  if (loadCustomKeyDefs(profile).length >= maximumCustomKeys) {
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
  const nextDefs = [...loadCustomKeyDefs(profile), cleaned];
  saveCustomKeyDefs(nextDefs, profile.id);
  const ids = loadShortcutIds(keyProfileById(profile.id));
  if (!ids.includes(cleaned.id)) {
    ids.push(cleaned.id);
    saveShortcutIds(ids, profile.id);
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
  const profile = editorKeyProfile();
  const starter = starterKeyProfileTemplates.find(
    (template) => template.id === profile.id
  );
  saveShortcutIds(
    [...(starter?.shortcutIds || defaultShortcutIds)],
    profile.id
  );
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
let clientDebugServerEnabled = false;
let layoutDebugFrame = null;
let layoutDebugReason = 'initial';
let lastLayoutDebugSignature = '';

function shipClientDebugEntries(entries) {
  if (!clientDebugServerEnabled || entries.length === 0) {
    return;
  }
  try {
    fetch('/api/client-debug', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries }),
      keepalive: true
    }).catch(() => {});
  } catch {
    // Ignore transport failures.
  }
}

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
  if (!clientDebugServerEnabled) {
    return;
  }
  // Best-effort ship metadata to the bounded, opt-in server log.
  shipClientDebugEntries([entry]);
}

function layoutDebugSnapshot(reason) {
  const root = document.documentElement;
  const rootStyle = window.getComputedStyle(root);
  const headerBounds = appHeaderElement.getBoundingClientRect();
  const mainBounds = document.querySelector('main').getBoundingClientRect();
  const footerBounds = document.querySelector('footer').getBoundingClientRect();
  const terminalBounds = terminalElement.getBoundingClientRect();
  const cssPixels = (name) =>
    Math.round(Number.parseFloat(rootStyle.getPropertyValue(name)) || 0);
  return {
    reason,
    viewportWidth: Math.round(window.visualViewport?.width || window.innerWidth),
    viewportHeight: Math.round(
      window.visualViewport?.height || window.innerHeight
    ),
    layoutWidth: Math.round(root.clientWidth || window.innerWidth),
    layoutHeight: Math.round(root.clientHeight || window.innerHeight),
    orientation: window.matchMedia('(orientation: landscape)').matches
      ? 'landscape'
      : 'portrait',
    pointer: window.matchMedia('(hover: none) and (pointer: coarse)').matches
      ? 'coarse'
      : 'fine',
    displayMode: root.dataset.displayMode || 'browser',
    viewMode,
    keyboardOpen: root.classList.contains('keyboard-open'),
    drawerOpen: !footerDrawerElement?.hidden,
    safeTop: cssPixels('--safe-top'),
    safeRight: cssPixels('--safe-right'),
    safeBottom: cssPixels('--safe-bottom'),
    safeLeft: cssPixels('--safe-left'),
    headerWidth: Math.round(headerBounds.width),
    headerHeight: Math.round(headerBounds.height),
    mainWidth: Math.round(mainBounds.width),
    mainHeight: Math.round(mainBounds.height),
    footerWidth: Math.round(footerBounds.width),
    footerHeight: Math.round(footerBounds.height),
    terminalWidth: Math.round(terminalBounds.width),
    terminalHeight: Math.round(terminalBounds.height)
  };
}

function scheduleLayoutDebug(reason = 'viewport') {
  layoutDebugReason = reason;
  if (layoutDebugFrame !== null) {
    return;
  }
  layoutDebugFrame = window.requestAnimationFrame(() => {
    layoutDebugFrame = null;
    const snapshot = layoutDebugSnapshot(layoutDebugReason);
    const signature = JSON.stringify({ ...snapshot, reason: undefined });
    if (signature === lastLayoutDebugSignature) {
      return;
    }
    lastLayoutDebugSignature = signature;
    clientDebug('layout', snapshot);
  });
}

function selectionDebugSnapshot(extra = {}) {
  const position = terminal?.getSelectionPosition?.() || null;
  const apiText = terminal?.getSelection?.() || '';
  const range = position
    ? {
        selectionStartColumn: position.start?.x,
        selectionStartRow: position.start?.y,
        selectionEndColumn: position.end?.x,
        selectionEndRow: position.end?.y
      }
    : {};
  return {
    hasSelection: Boolean(terminal?.hasSelection?.()),
    apiLength: apiText.length,
    apiLines: apiText ? apiText.split('\n').length : 0,
    ...range,
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
  // Ctrl/Cmd+C copies an active selection instead of sending SIGINT. xterm's
  // selection is its own internal model, not a native browser Selection —
  // the DOM renderer only *looks* selected — so the browser's native copy
  // shortcut has nothing to act on by itself. Desktop/fine-pointer chrome
  // also has no footer, so the mobile copy button/chip aren't reachable
  // here either; reuse the same copyTerminalSelection() they call so the
  // clipboard-write path (and its iOS-safe fallback) stays in one place.
  if (
    event.type === 'keydown' &&
    !event.isComposing &&
    (event.key === 'c' || event.key === 'C') &&
    (event.ctrlKey || event.metaKey) &&
    !event.altKey &&
    terminalHasCopyableSelection()
  ) {
    event.preventDefault();
    void copyTerminalSelection({ source: 'keyboard' });
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
  // Then the session picker, which is an overlay in portrait. Focus inside the
  // terminal or another UI capture target already returned above, so Escape
  // still reaches the PTY and dialogs.
  if (event.key === 'Escape' && headerPickerOpen()) {
    event.preventDefault();
    event.stopPropagation();
    setHeaderCollapsed(true);
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

function clampTerminalScrollBounds() {
  if (!terminal || terminalElement.hidden) {
    return;
  }
  const buffer = terminal.buffer.active;
  if (buffer.viewportY < 0) {
    terminal.scrollToLine(0);
  } else if (buffer.viewportY > buffer.baseY) {
    terminal.scrollToBottom();
  }
}

function scrollTerminalLinesClamped(lineDelta) {
  if (!terminal || terminalElement.hidden || !Number.isFinite(lineDelta)) {
    return;
  }
  const buffer = terminal.buffer.active;
  terminal.scrollToLine(
    Math.max(0, Math.min(buffer.baseY, buffer.viewportY + lineDelta))
  );
  scheduleTerminalScrollClamp();
}

function scheduleTerminalScrollClamp() {
  if (terminalScrollClampFrame !== null) {
    return;
  }
  terminalScrollClampFrame = window.requestAnimationFrame(() => {
    terminalScrollClampFrame = null;
    clampTerminalScrollBounds();
  });
}

function showScrollPosition(viewportY) {
  if (!terminal) {
    return;
  }
  scheduleTerminalScrollClamp();
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
  if (
    globalTerminalThemeName &&
    Object.hasOwn(terminalThemes, globalTerminalThemeName)
  ) {
    return globalTerminalThemeName;
  }
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
  if (sessionThemesMemory) {
    return { ...sessionThemesMemory };
  }
  try {
    const raw = window.localStorage.getItem(sessionThemeStorageKey);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    sessionThemesMemory = sanitizeSessionThemes(parsed);
    return { ...sessionThemesMemory };
  } catch {
    sessionThemesMemory = {};
    return {};
  }
}

function sanitizeSessionThemes(map) {
  const cleaned = {};
  if (!map || typeof map !== 'object' || Array.isArray(map)) {
    return cleaned;
  }
  for (const [sessionName, themeName] of Object.entries(map)) {
    const resolved = resolveThemeName(themeName);
    if (
      /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/.test(sessionName) &&
      Object.hasOwn(terminalThemes, resolved)
    ) {
      cleaned[sessionName] = resolved;
    }
  }
  return cleaned;
}

function saveSessionThemes(map) {
  const cleaned = sanitizeSessionThemes(map);
  sessionThemesMemory = cleaned;
  try {
    window.localStorage.setItem(
      sessionThemeStorageKey,
      JSON.stringify(cleaned)
    );
  } catch {
    // Continue without persistence when browser storage is unavailable.
  }
  noteDurablePreferencesChange();
  return cleaned;
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

const terminalThemeAccentKeys = {
  matrix: 'cursor',
  groknight: 'magenta',
  tokyonight: 'blue',
  rosepine: 'magenta',
  oscura: 'blue',
  dracula: 'magenta',
  solarized: 'blue',
  nord: 'blue',
  monokai: 'magenta',
  gruvbox: 'yellow'
};

function mixHexColors(base, overlay, overlayWeight) {
  const parse = (value) => {
    const match = /^#([0-9a-f]{6})$/i.exec(value || '');
    if (!match) {
      return null;
    }
    const packed = Number.parseInt(match[1], 16);
    return [
      (packed >> 16) & 255,
      (packed >> 8) & 255,
      packed & 255
    ];
  };
  const baseRgb = parse(base);
  const overlayRgb = parse(overlay);
  if (!baseRgb || !overlayRgb) {
    return base;
  }
  const weight = Math.max(0, Math.min(1, overlayWeight));
  const mixed = baseRgb.map((channel, index) =>
    Math.round(channel + (overlayRgb[index] - channel) * weight)
  );
  return `#${mixed
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`;
}

function hexColorContrast(foreground, background) {
  const luminance = (value) => {
    const match = /^#([0-9a-f]{6})$/i.exec(value || '');
    if (!match) {
      return 0;
    }
    const packed = Number.parseInt(match[1], 16);
    const channels = [
      (packed >> 16) & 255,
      (packed >> 8) & 255,
      packed & 255
    ].map((channel) => {
      const normalized = channel / 255;
      return normalized <= 0.04045
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return (
      0.2126 * channels[0] +
      0.7152 * channels[1] +
      0.0722 * channels[2]
    );
  };
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  return (
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
  );
}

function ensureHexColorContrast(
  foreground,
  background,
  minimumRatio,
  target = '#ffffff'
) {
  if (hexColorContrast(foreground, background) >= minimumRatio) {
    return foreground;
  }
  for (let step = 1; step <= 20; step += 1) {
    const candidate = mixHexColors(foreground, target, step / 20);
    if (hexColorContrast(candidate, background) >= minimumRatio) {
      return candidate;
    }
  }
  return target;
}

function applyAppTheme(themeName) {
  const theme = terminalThemes[themeName];
  const accentKey = terminalThemeAccentKeys[themeName] || 'cursor';
  const accent = theme[accentKey] || theme.cursor || theme.foreground;
  const raisedSurface = mixHexColors(
    theme.background,
    theme.foreground,
    0.08
  );
  const accentSurface = mixHexColors(theme.background, accent, 0.24);
  const danger = theme.brightRed || theme.red;
  const dangerSurface = mixHexColors(theme.background, danger, 0.18);
  const root = document.documentElement;
  const variables = {
    '--terminal-bg': theme.background,
    '--surface': theme.background,
    '--surface-raised': raisedSurface,
    '--surface-deep': mixHexColors(theme.background, '#000000', 0.14),
    '--surface-pressed': mixHexColors(theme.background, theme.foreground, 0.15),
    '--border': mixHexColors(theme.background, theme.foreground, 0.18),
    '--control-border': mixHexColors(theme.background, theme.foreground, 0.25),
    '--muted': ensureHexColorContrast(
      mixHexColors(theme.background, theme.foreground, 0.62),
      raisedSurface,
      3
    ),
    '--text': mixHexColors(theme.foreground, '#ffffff', 0.08),
    '--text-strong': mixHexColors(theme.foreground, '#ffffff', 0.22),
    '--accent': accent,
    '--accent-surface': accentSurface,
    '--accent-text': ensureHexColorContrast(
      mixHexColors(theme.foreground, accent, 0.22),
      accentSurface,
      4.5
    ),
    '--danger': ensureHexColorContrast(
      danger,
      dangerSurface,
      4.5
    ),
    '--danger-surface': dangerSurface,
    '--focus-ring': mixHexColors(accent, '#ffffff', 0.24)
  };
  for (const [property, value] of Object.entries(variables)) {
    root.style.setProperty(property, value);
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme.background);
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
  applyAppTheme(resolved);
  if (!persist) {
    return;
  }
  globalTerminalThemeName = resolved;
  try {
    window.localStorage.setItem(terminalThemeStorageKey, resolved);
  } catch {
    // Continue without persistence when browser storage is unavailable.
  }
  if (activeSession) {
    rememberSessionTheme(activeSession, resolved);
  }
  noteDurablePreferencesChange();
}

function runningAsInstalledWebApp() {
  return Boolean(
    window.navigator.standalone ||
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches
  );
}

const viewportMetaCoverContent =
  'width=device-width, initial-scale=1, viewport-fit=cover';
const viewportMetaInsetContent =
  'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no';

function currentDisplayMode() {
  return runningAsInstalledWebApp() ? 'standalone' : 'browser';
}

/**
 * Browser tabs keep viewport-fit=cover. Installed PWAs drop cover and shift
 * the footer with an effective safe-area inset (see updateEffectiveSafeAreaInsets).
 */
function applyViewportFitPolicy() {
  const meta = document.querySelector('meta[name="viewport"]');
  const installed = runningAsInstalledWebApp();
  const useCover = !installed;
  if (meta) {
    meta.setAttribute(
      'content',
      useCover ? viewportMetaCoverContent : viewportMetaInsetContent
    );
  }
  document.documentElement.classList.toggle('viewport-cover', useCover);
  document.documentElement.classList.toggle('viewport-no-cover', !useCover);
  document.documentElement.dataset.displayMode = currentDisplayMode();
  updateEffectiveSafeAreaInsets();
  return { useCover, installed };
}

/**
 * Read env(safe-area-inset-*) via a probe (more reliable than parsing CSS vars).
 */
function measureEnvSafeAreaInsets() {
  if (!document.body) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  const probe = document.createElement('div');
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText = [
    'position:fixed',
    'left:0',
    'top:0',
    'width:0',
    'height:0',
    'padding-top:env(safe-area-inset-top, 0px)',
    'padding-right:env(safe-area-inset-right, 0px)',
    'padding-bottom:env(safe-area-inset-bottom, 0px)',
    'padding-left:env(safe-area-inset-left, 0px)',
    'visibility:hidden',
    'pointer-events:none'
  ].join(';');
  document.body.appendChild(probe);
  const style = window.getComputedStyle(probe);
  const insets = {
    top: Math.max(0, Math.round(Number.parseFloat(style.paddingTop) || 0)),
    right: Math.max(0, Math.round(Number.parseFloat(style.paddingRight) || 0)),
    bottom: Math.max(0, Math.round(Number.parseFloat(style.paddingBottom) || 0)),
    left: Math.max(0, Math.round(Number.parseFloat(style.paddingLeft) || 0))
  };
  probe.remove();
  return insets;
}

function isLikelyIphoneWithHomeIndicator() {
  const ua = navigator.userAgent || '';
  const iPhone = /iPhone|iPod/.test(ua);
  const iPadOsDesktopUa =
    navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  if (!iPhone && !iPadOsDesktopUa) {
    return false;
  }
  const longSide = Math.max(
    window.screen?.width || 0,
    window.screen?.height || 0
  );
  // iPhone X+ logical min height is 812.
  return longSide >= 812;
}

/**
 * When standalone + no cover, iOS often reports safe-area-inset-bottom as 0
 * even though the home indicator still overlaps the bottom of the webview.
 * Use env when present; otherwise a conservative synthetic inset.
 */
function estimateEffectiveSafeBottom(envInsets) {
  // Keyboard already owns the bottom edge — never stack home-indicator pad.
  if (document.documentElement.classList.contains('keyboard-open')) {
    return { bottom: 0, source: 'keyboard-open' };
  }
  const envBottom = envInsets?.bottom || 0;
  if (envBottom > 0) {
    return { bottom: envBottom, source: 'env' };
  }
  if (!runningAsInstalledWebApp()) {
    return { bottom: 0, source: 'env-zero' };
  }
  // Prefer known home-indicator size on notched iPhones.
  if (isLikelyIphoneWithHomeIndicator()) {
    return { bottom: 34, source: 'iphone-home-indicator' };
  }
  const screenH = Math.round(window.screen?.height || 0);
  const layoutH = Math.round(
    window.innerHeight || document.documentElement.clientHeight || 0
  );
  const gap = Math.max(0, screenH - layoutH);
  if (gap >= 50) {
    const guess = Math.min(40, Math.max(20, Math.round(gap * 0.45)));
    return { bottom: guess, source: `screen-gap:${gap}` };
  }
  return { bottom: 0, source: 'none' };
}

function updateEffectiveSafeAreaInsets() {
  const env = measureEnvSafeAreaInsets();
  const estimated = estimateEffectiveSafeBottom(env);
  const keyboardOpen = document.documentElement.classList.contains(
    'keyboard-open'
  );
  const effectiveBottom = keyboardOpen ? 0 : estimated.bottom;
  const root = document.documentElement;
  root.style.setProperty('--safe-bottom-env', `${env.bottom}px`);
  root.style.setProperty('--safe-top-env', `${env.top}px`);
  root.style.setProperty('--safe-bottom-effective', `${effectiveBottom}px`);
  root.style.setProperty('--safe-bottom', `${effectiveBottom}px`);
  // Drop any debug/profile inline pad overrides when the keyboard is open so
  // html.keyboard-open CSS (4px, no safe-area) wins.
  if (keyboardOpen) {
    root.style.removeProperty('--layout-safe-bottom');
    root.style.removeProperty('--footer-bottom-padding');
  } else if (root.classList.contains('viewport-no-cover')) {
    root.style.setProperty('--layout-safe-bottom', `${effectiveBottom}px`);
    root.style.setProperty(
      '--footer-bottom-padding',
      `${Math.max(6, effectiveBottom)}px`
    );
  } else {
    root.style.removeProperty('--layout-safe-bottom');
    root.style.removeProperty('--footer-bottom-padding');
  }
  return { env, effectiveBottom, source: estimated.source };
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
    const error = new Error(value.error || 'Request failed');
    error.status = response.status;
    error.payload = value;
    throw error;
  }
  return value;
}

function hasDurableBrowserPreferences() {
  if (qaShellMode) {
    return false;
  }
  const durableKeys = [
    terminalThemeStorageKey,
    sessionThemeStorageKey,
    shortcutsStorageKey,
    customKeysStorageKey,
    sessionKeyProfilesStorageKey,
    footerPinsStorageKey
  ];
  try {
    const generatedBootstrap =
      window.localStorage.getItem(preferencesBootstrapStorageKey) === '1';
    return (
      durableKeys.some(
        (storageKey) => window.localStorage.getItem(storageKey) !== null
      ) ||
      (!generatedBootstrap &&
        window.localStorage.getItem(keyProfilesStorageKey) !== null)
    );
  } catch {
    return false;
  }
}

function markPreferencesBootstrapGenerated() {
  if (qaShellMode) {
    return;
  }
  try {
    window.localStorage.setItem(preferencesBootstrapStorageKey, '1');
  } catch {
    // In-memory dirty tracking still protects edits for this page lifetime.
  }
}

function clearPreferencesBootstrapMarker() {
  if (qaShellMode) {
    return;
  }
  try {
    window.localStorage.removeItem(preferencesBootstrapStorageKey);
  } catch {
    // In-memory dirty tracking still protects edits for this page lifetime.
  }
}

function preferencesSyncMetadataStorageKey(identity) {
  return identity
    ? `${preferencesSyncStorageKey}:${identity}`
    : '';
}

function preferencesCacheStorageKeyFor(identity) {
  return identity
    ? `${preferencesCacheStorageKey}:${identity}`
    : preferencesPendingCacheStorageKey;
}

function validPreferencesIdentity(identity) {
  return typeof identity === 'string' && /^[a-f0-9]{64}$/.test(identity);
}

function preferencesWriteAllowed(identity, confirmed) {
  return confirmed === true && validPreferencesIdentity(identity);
}

function preferencesWriteInProgress(state, writing) {
  return writing === true || state === 'saving';
}

function loadLastPreferencesIdentity() {
  if (qaShellMode) {
    return '';
  }
  try {
    const identity = window.localStorage.getItem(
      preferencesLastIdentityStorageKey
    );
    return validPreferencesIdentity(identity) ? identity : '';
  } catch {
    return '';
  }
}

function loadEmbeddedPreferencesIdentity() {
  if (qaShellMode) {
    return '';
  }
  const identity = document
    .querySelector('meta[name="vps-preferences-subject"]')
    ?.getAttribute('content');
  return validPreferencesIdentity(identity) ? identity : '';
}

function saveLastPreferencesIdentity(identity) {
  if (qaShellMode || !validPreferencesIdentity(identity)) {
    return;
  }
  try {
    window.localStorage.setItem(
      preferencesLastIdentityStorageKey,
      identity
    );
  } catch {
    // The current page still keeps its adopted identity in memory.
  }
}

function readPreferencesCache(identity = preferencesSyncIdentity) {
  if (qaShellMode) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(
      preferencesCacheStorageKeyFor(identity)
    );
    if (!raw) {
      return null;
    }
    const value = JSON.parse(raw);
    return value && typeof value === 'object' && !Array.isArray(value)
      ? value
      : null;
  } catch {
    return null;
  }
}

function hasPendingPreferencesCache() {
  return readPreferencesCache('') !== null;
}

function writePreferencesCache(
  preferences,
  identity = preferencesSyncIdentity
) {
  if (
    qaShellMode ||
    !preferences ||
    typeof preferences !== 'object'
  ) {
    return;
  }
  try {
    window.localStorage.setItem(
      preferencesCacheStorageKeyFor(identity),
      JSON.stringify(preferences)
    );
  } catch {
    // Existing unscoped storage remains the in-page fallback.
  }
}

function removePendingPreferencesCache() {
  if (qaShellMode) {
    return;
  }
  try {
    window.localStorage.removeItem(preferencesPendingCacheStorageKey);
  } catch {
    // A stale pending cache causes a conservative conflict, not data loss.
  }
}

function loadPreferencesSyncMetadata(identity = preferencesSyncIdentity) {
  const storageKey = preferencesSyncMetadataStorageKey(identity);
  if (!storageKey) {
    return { found: false, enabled: false, revision: 0, dirty: false };
  }
  try {
    const value = JSON.parse(
      window.localStorage.getItem(storageKey) || 'null'
    );
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return { found: false, enabled: false, revision: 0, dirty: false };
    }
    return {
      found: true,
      enabled: value.enabled === true,
      revision:
        Number.isSafeInteger(value.revision) && value.revision >= 0
          ? value.revision
          : 0,
      dirty: value.dirty === true
    };
  } catch {
    return { found: false, enabled: false, revision: 0, dirty: false };
  }
}

function savePreferencesSyncMetadata() {
  if (!preferencesSyncIdentityConfirmed) {
    return;
  }
  savePreferencesSyncMetadataForIdentity(preferencesSyncIdentity, {
    enabled: preferencesSyncEnabled,
    revision: preferencesSyncRevision,
    dirty: preferencesSyncDirty
  });
}

function savePreferencesSyncMetadataForIdentity(identity, metadata) {
  const storageKey = preferencesSyncMetadataStorageKey(identity);
  if (
    qaShellMode ||
    !storageKey ||
    !metadata ||
    typeof metadata !== 'object'
  ) {
    return;
  }
  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        enabled: metadata.enabled === true,
        revision:
          Number.isSafeInteger(metadata.revision) && metadata.revision >= 0
            ? metadata.revision
            : 0,
        dirty: metadata.dirty === true
      })
    );
  } catch {
    // In-memory conflict protection still applies for this page lifetime.
  }
}

function resolveAdoptedPreferencesDirty(
  metadata,
  hasPendingCache,
  hasUntrackedCache
) {
  return (
    metadata.dirty ||
    hasPendingCache ||
    (!metadata.found && hasUntrackedCache)
  );
}

function selectAdoptedPreferencesCache(pendingCache, accountCache) {
  return pendingCache || accountCache || null;
}

function adoptPreferencesSyncIdentity(identity) {
  if (!validPreferencesIdentity(identity)) {
    throw new Error('Shared setup identity is invalid');
  }
  if (
    identity === preferencesSyncIdentity &&
    preferencesSyncIdentityConfirmed
  ) {
    return;
  }
  const previousIdentity = preferencesSyncIdentity;
  const previousIdentityWasConfirmed = preferencesSyncIdentityConfirmed;
  if (previousIdentity && previousIdentityWasConfirmed) {
    writePreferencesCache(
      durablePreferencesSnapshot(),
      previousIdentity
    );
  }
  const pendingCacheCandidate = previousIdentityWasConfirmed
    ? null
    : readPreferencesCache('');
  const adoptedCache = readPreferencesCache(identity);
  const selectedCache = selectAdoptedPreferencesCache(
    pendingCacheCandidate,
    adoptedCache
  );
  const pendingCache =
    pendingCacheCandidate === selectedCache ? pendingCacheCandidate : null;
  preferencesSyncIdentity = identity;
  preferencesSyncIdentityConfirmed = true;
  const metadata = loadPreferencesSyncMetadata(identity);
  preferencesSyncEnabled = metadata.enabled;
  preferencesSyncRevision = metadata.revision;
  if (selectedCache) {
    applySharedPreferences(selectedCache);
  }
  if (pendingCache) {
    writePreferencesCache(pendingCache, identity);
    removePendingPreferencesCache();
  } else if (
    !selectedCache &&
    previousIdentity &&
    previousIdentity !== identity
  ) {
    applySharedPreferences(freshPreferencesSnapshot());
  } else if (!selectedCache && hadDurablePreferencesAtBoot) {
    writePreferencesCache(durablePreferencesSnapshot(), identity);
  }
  preferencesSyncDirty = resolveAdoptedPreferencesDirty(
    metadata,
    Boolean(pendingCache),
    Boolean(
      adoptedCache ||
      (!previousIdentity && hadDurablePreferencesAtBoot)
    )
  );
  saveLastPreferencesIdentity(identity);
  savePreferencesSyncMetadata();
}

function noteDurablePreferencesChange() {
  if (
    qaShellMode ||
    preferencesApplying ||
    !preferencesTrackingReady
  ) {
    return;
  }
  if (preferencesBootstrapMutation && !preferencesSyncEnabled) {
    return;
  }
  if (!preferencesBootstrapMutation) {
    clearPreferencesBootstrapMarker();
  }
  preferencesLocalMutationVersion += 1;
  preferencesSyncDirty = true;
  writePreferencesCache(
    durablePreferencesSnapshot(),
    preferencesSyncIdentityConfirmed ? preferencesSyncIdentity : ''
  );
  savePreferencesSyncMetadata();
  schedulePreferencesSync();
}

function resolvePreferencesLoadAction(options) {
  if (
    (options.forceRemote && !options.mutatedDuringLoad) ||
    (!options.dirty && !options.mutatedDuringLoad)
  ) {
    return 'apply';
  }
  if (
    options.knownEnabled &&
    options.knownRevision === options.remoteRevision
  ) {
    return 'flush';
  }
  return 'conflict';
}

function durablePreferencesSnapshot() {
  return {
    keyProfiles: loadKeyProfilesDocument(),
    sessionProfiles: loadSessionKeyProfileAssignments(),
    theme: rememberedTerminalThemeName(),
    sessionThemes: loadSessionThemes()
  };
}

function freshPreferencesSnapshot() {
  return {
    keyProfiles: withStarterKeyProfiles({
      version: 2,
      starterProfilesVersion: 0,
      starterSnippetSelectionsVersion: 0,
      defaultProfileId: 'shell',
      profiles: [
        {
          id: 'shell',
          name: 'Terminal',
          shortcutIds: [...defaultShortcutIds],
          customKeys: [],
          snippetIds: null,
          pins: []
        }
      ]
    }),
    sessionProfiles: {},
    theme: 'matrix',
    sessionThemes: {}
  };
}

function prepareInitialPreferences() {
  if (qaShellMode) {
    return;
  }
  if (preferencesSyncIdentityConfirmed) {
    const accountCache = readPreferencesCache(preferencesSyncIdentity);
    const canMigrateBrowserSetup =
      !initialPreferencesLastIdentity ||
      initialPreferencesLastIdentity === preferencesSyncIdentity;
    if (
      !accountCache &&
      canMigrateBrowserSetup &&
      hadDurablePreferencesAtBoot
    ) {
      writePreferencesCache(
        durablePreferencesSnapshot(),
        preferencesSyncIdentity
      );
      // The migrated setup predates revision metadata. Preserve it until the
      // user chooses between it and any already-saved shared setup.
      preferencesSyncDirty = true;
    }
    const selectedCache =
      readPreferencesCache(preferencesSyncIdentity) ||
      freshPreferencesSnapshot();
    applySharedPreferences(selectedCache);
    removePendingPreferencesCache();
    saveLastPreferencesIdentity(preferencesSyncIdentity);
    return;
  }
  if (validPreferencesIdentity(initialPreferencesSyncIdentity)) {
    // A pending cache from another page cannot be attributed safely after an
    // auth switch. Current-page edits create a new pending cache below.
    removePendingPreferencesCache();
    if (
      hadDurablePreferencesAtBoot &&
      !readPreferencesCache(initialPreferencesSyncIdentity)
    ) {
      writePreferencesCache(
        durablePreferencesSnapshot(),
        initialPreferencesSyncIdentity
      );
    }
  } else if (
    hadDurablePreferencesAtBoot &&
    !hasPendingPreferencesCache()
  ) {
    // One-time migration for browsers that predate account-scoped setup.
    writePreferencesCache(durablePreferencesSnapshot(), '');
  }
  // A last-login marker is not proof of the current authenticated request.
  // Keep its setup private until GET /api/preferences confirms the identity.
  applySharedPreferences(freshPreferencesSnapshot());
}

function setPreferencesSyncState(state) {
  preferencesSyncState = state;
  updatePreferencesSyncUi();
}

function updatePreferencesSyncUi() {
  if (!preferencesSyncStatusElement) {
    return;
  }
  const states = {
    loading: {
      label: 'Checking…',
      help: 'Checking for a shared setup saved for this login.'
    },
    local: {
      label: 'Not enabled',
      help:
        'This browser is local-only. Enable to sync profiles, pins, ' +
        'sessions, and themes to your login.'
    },
    saving: {
      label: 'Saving…',
      help: 'Your shared setup is being updated.'
    },
    synced: {
      label: 'Synced',
      help:
        'Profiles, pins, sessions, and themes follow your login; view, path, ' +
        'font size, and layout stay on this device.'
    },
    offline: {
      label: 'Local fallback',
      help:
        'Shared setup is temporarily unavailable. Changes stay on this ' +
        'device until it reconnects.'
    },
    conflict: {
      label: 'Needs choice',
      help: 'Another browser saved a newer setup — load it, or keep this browser’s.'
    }
  };
  const current = states[preferencesSyncState] || states.offline;
  preferencesSyncStatusElement.textContent = current.label;
  preferencesSyncStatusElement.dataset.state = preferencesSyncState;
  if (preferencesSyncHelpElement) {
    preferencesSyncHelpElement.textContent = current.help;
  }
  if (preferencesSyncEnableButton) {
    preferencesSyncEnableButton.hidden = preferencesSyncState !== 'local';
  }
  if (preferencesSyncLoadButton) {
    preferencesSyncLoadButton.hidden = preferencesSyncState !== 'conflict';
  }
  if (preferencesSyncReplaceButton) {
    preferencesSyncReplaceButton.hidden =
      preferencesSyncState !== 'conflict';
  }
  if (preferencesSyncRetryButton) {
    preferencesSyncRetryButton.hidden =
      preferencesSyncState !== 'offline';
  }
}

function applySharedPreferences(preferences) {
  if (!preferences || typeof preferences !== 'object') {
    throw new Error('Shared setup is invalid');
  }
  preferencesApplying = true;
  try {
    const profiles = withStarterKeyProfiles(
      sanitizeKeyProfilesDocument(preferences.keyProfiles)
    );
    saveKeyProfilesDocument(profiles);
    sessionKeyProfileAssignments = null;
    saveSessionKeyProfileAssignments(preferences.sessionProfiles);
    const globalTheme = resolveThemeName(preferences.theme);
    const cleanGlobalTheme = Object.hasOwn(terminalThemes, globalTheme)
      ? globalTheme
      : 'matrix';
    globalTerminalThemeName = cleanGlobalTheme;
    try {
      window.localStorage.setItem(
        terminalThemeStorageKey,
        cleanGlobalTheme
      );
    } catch {
      // The in-memory setup still works when browser storage is unavailable.
    }
    const cleanSessionThemes = saveSessionThemes(preferences.sessionThemes);
    const nextTheme =
      (activeSession && cleanSessionThemes[activeSession]) ||
      cleanGlobalTheme;
    applyTerminalTheme(nextTheme, { persist: false });
    keyProfileEditorId = activeKeyProfile().id;
  } finally {
    preferencesApplying = false;
  }
  renderSessions();
  refreshKeysUi();
}

function adoptSavedSharedPreferences(saved, mutationVersionAtStart) {
  const mutatedDuringSave =
    preferencesLocalMutationVersion !== mutationVersionAtStart;
  if (
    !mutatedDuringSave &&
    saved?.preferences &&
    typeof saved.preferences === 'object'
  ) {
    applySharedPreferences(saved.preferences);
  }
  preferencesSyncDirty = mutatedDuringSave;
  writePreferencesCache(durablePreferencesSnapshot());
  return mutatedDuringSave;
}

async function loadPreferencesFromServer(options = {}) {
  const mutationVersionAtStart = preferencesLocalMutationVersion;
  setPreferencesSyncState('loading');
  try {
    const documentValue = await api('/api/preferences');
    adoptPreferencesSyncIdentity(documentValue.subject);
    const knownEnabled = preferencesSyncEnabled;
    const knownRevision = preferencesSyncRevision;
    const remoteRevision = Number.isSafeInteger(documentValue.revision)
      ? documentValue.revision
      : 0;
    if (
      documentValue.enabled === true &&
      documentValue.preferences &&
      typeof documentValue.preferences === 'object'
    ) {
      const action = resolvePreferencesLoadAction({
        forceRemote: options.forceRemote === true,
        dirty: preferencesSyncDirty,
        mutatedDuringLoad:
          preferencesLocalMutationVersion !== mutationVersionAtStart,
        knownEnabled,
        knownRevision,
        remoteRevision
      });
      preferencesSyncEnabled = true;
      if (action === 'conflict') {
        setPreferencesSyncState('conflict');
        return documentValue;
      }
      preferencesSyncRevision = remoteRevision;
      if (action === 'flush') {
        preferencesSyncDirty = true;
        savePreferencesSyncMetadata();
        setPreferencesSyncState('synced');
        await flushPreferencesSync();
        return documentValue;
      }
      applySharedPreferences(documentValue.preferences);
      preferencesSyncDirty = false;
      writePreferencesCache(durablePreferencesSnapshot());
      savePreferencesSyncMetadata();
      setPreferencesSyncState('synced');
    } else {
      preferencesSyncEnabled = false;
      preferencesSyncRevision = 0;
      savePreferencesSyncMetadata();
      setPreferencesSyncState('local');
    }
    return documentValue;
  } catch (error) {
    setPreferencesSyncState('offline');
    return null;
  }
}

function schedulePreferencesSync() {
  if (
    qaShellMode ||
    preferencesApplying ||
    !preferencesWriteAllowed(
      preferencesSyncIdentity,
      preferencesSyncIdentityConfirmed
    ) ||
    !preferencesSyncEnabled ||
    preferencesSyncState === 'loading' ||
    preferencesSyncState === 'conflict'
  ) {
    return;
  }
  if (
    preferencesWriteInProgress(
      preferencesSyncState,
      preferencesSyncWriting
    )
  ) {
    preferencesSyncPending = true;
    return;
  }
  clearTimeout(preferencesSyncTimer);
  preferencesSyncTimer = window.setTimeout(() => {
    preferencesSyncTimer = null;
    void flushPreferencesSync();
  }, preferencesSyncDebounceMs);
}

async function flushPreferencesSync() {
  if (
    !preferencesWriteAllowed(
      preferencesSyncIdentity,
      preferencesSyncIdentityConfirmed
    ) ||
    !preferencesSyncEnabled ||
    preferencesSyncState === 'conflict'
  ) {
    return;
  }
  if (
    preferencesWriteInProgress(
      preferencesSyncState,
      preferencesSyncWriting
    )
  ) {
    preferencesSyncPending = true;
    return;
  }
  preferencesSyncWriting = true;
  const mutationVersionAtWrite = preferencesLocalMutationVersion;
  setPreferencesSyncState('saving');
  try {
    const saved = await api('/api/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expectedSubject: preferencesSyncIdentity,
        expectedRevision: preferencesSyncRevision,
        preferences: durablePreferencesSnapshot()
      })
    });
    preferencesSyncRevision = saved.revision;
    adoptSavedSharedPreferences(saved, mutationVersionAtWrite);
    savePreferencesSyncMetadata();
    setPreferencesSyncState('synced');
  } catch (error) {
    if (error.status === 412) {
      preferencesSyncIdentityConfirmed = false;
      setPreferencesSyncState('offline');
    } else if (error.status === 409) {
      setPreferencesSyncState('conflict');
    } else {
      setPreferencesSyncState('offline');
    }
  } finally {
    preferencesSyncWriting = false;
    if (
      preferencesSyncPending &&
      preferencesSyncState !== 'conflict'
    ) {
      preferencesSyncPending = false;
      schedulePreferencesSync();
    }
  }
}

async function enablePreferencesSync() {
  if (
    preferencesSyncState !== 'local' ||
    !preferencesWriteAllowed(
      preferencesSyncIdentity,
      preferencesSyncIdentityConfirmed
    )
  ) {
    return;
  }
  const seededPreferences = durablePreferencesSnapshot();
  const mutationVersionAtSeed = preferencesLocalMutationVersion;
  setPreferencesSyncState('saving');
  try {
    const saved = await api('/api/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expectedSubject: preferencesSyncIdentity,
        expectedRevision: 0,
        preferences: seededPreferences
      })
    });
    preferencesSyncEnabled = true;
    preferencesSyncRevision = saved.revision;
    adoptSavedSharedPreferences(saved, mutationVersionAtSeed);
    savePreferencesSyncMetadata();
    setPreferencesSyncState('synced');
    if (preferencesSyncDirty) {
      preferencesSyncPending = false;
      schedulePreferencesSync();
    }
    setStatus('Shared setup enabled');
  } catch (error) {
    if (error.status === 412) {
      preferencesSyncIdentityConfirmed = false;
      setPreferencesSyncState('offline');
      setStatus('Login changed; reload shared setup');
    } else if (error.status === 409) {
      await loadPreferencesFromServer();
      setStatus('Loaded the setup enabled in another browser');
    } else {
      setPreferencesSyncState('offline');
      setStatus('Could not enable shared setup');
    }
  }
}

async function replaceSharedPreferences() {
  if (
    preferencesSyncState !== 'conflict' ||
    !preferencesWriteAllowed(
      preferencesSyncIdentity,
      preferencesSyncIdentityConfirmed
    ) ||
    !window.confirm(
      'Replace the newer shared setup with this browser’s? This can’t be undone.'
    )
  ) {
    return;
  }
  const localPreferences = durablePreferencesSnapshot();
  const mutationVersionAtReplace = preferencesLocalMutationVersion;
  setPreferencesSyncState('saving');
  try {
    const latest = await api('/api/preferences');
    if (latest.subject !== preferencesSyncIdentity) {
      preferencesSyncIdentityConfirmed = false;
      setPreferencesSyncState('offline');
      return;
    }
    const saved = await api('/api/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expectedSubject: preferencesSyncIdentity,
        expectedRevision: latest.revision,
        preferences: localPreferences
      })
    });
    preferencesSyncEnabled = true;
    preferencesSyncRevision = saved.revision;
    adoptSavedSharedPreferences(saved, mutationVersionAtReplace);
    savePreferencesSyncMetadata();
    setPreferencesSyncState('synced');
    const needsFollowUp = preferencesSyncDirty || preferencesSyncPending;
    preferencesSyncPending = false;
    if (needsFollowUp) {
      schedulePreferencesSync();
    }
    setStatus('Shared setup replaced');
  } catch (error) {
    if (error.status === 412) {
      preferencesSyncIdentityConfirmed = false;
      setPreferencesSyncState('offline');
    } else {
      setPreferencesSyncState(error.status === 409 ? 'conflict' : 'offline');
    }
  }
}

async function loadLatestSharedPreferences() {
  if (
    preferencesSyncState !== 'conflict' ||
    !window.confirm(
      'Load the latest shared setup? This browser’s unsynced changes will be discarded.'
    )
  ) {
    return;
  }
  const wasDirty = preferencesSyncDirty;
  preferencesSyncDirty = false;
  await loadPreferencesFromServer({ forceRemote: true });
  if (preferencesSyncState === 'synced') {
    setStatus('Loaded latest shared setup');
  } else {
    preferencesSyncDirty = wasDirty || preferencesSyncDirty;
    savePreferencesSyncMetadata();
  }
}

async function initializeSharedSetupAndSnippets() {
  if (qaShellMode) {
    setPreferencesSyncState('local');
  } else {
    await loadPreferencesFromServer();
  }
  await loadSnippetsFromServer();
}

function loadViewMode() {
  if (qaShellMode) {
    return 'term';
  }
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

function filesPrimaryPointerIsFine() {
  return Boolean(
    window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
  );
}

function filesUsesCompactLocationSelector() {
  return (
    !filesPrimaryPointerIsFine() &&
    (window.innerWidth < 700 || window.innerHeight < 600)
  );
}

function filesEntryTarget(entry, listing = filesListing) {
  if (!entry || !listing) {
    return null;
  }
  return {
    root: listing.root || filesRootId,
    path: listing.path ? `${listing.path}/${entry.name}` : entry.name,
    name: entry.name,
    type: entry.type,
    size: entry.size
  };
}

function updateFilesStatusbar() {
  if (!filesStatusbarElement) {
    return;
  }
  const count = filesVisibleEntries.length;
  const itemLabel = `${count} ${count === 1 ? 'item' : 'items'}`;
  const selected = filesVisibleEntries[filesSelectedIndex];
  if (selected) {
    const detail =
      selected.type === 'dir'
        ? 'Folder'
        : formatFilesSize(selected.size);
    filesStatusbarElement.textContent = filesPrimaryPointerIsFine()
      ? `${selected.name} · ${detail} · Enter open · F2 rename`
      : `${itemLabel} · ${selected.name}`;
    return;
  }
  filesStatusbarElement.textContent = filesPrimaryPointerIsFine()
    ? `${itemLabel} · Arrow keys navigate · Ctrl+Shift+N new folder`
    : itemLabel;
}

function setFilesSelection(index, options = {}) {
  if (!filesListElement) {
    return;
  }
  const rows = [...filesListElement.querySelectorAll('[role="option"]')];
  const nextIndex =
    Number.isInteger(index) && index >= 0 && index < rows.length ? index : -1;
  filesSelectedIndex = nextIndex;
  filesSelectedName =
    nextIndex >= 0 ? filesVisibleEntries[nextIndex]?.name || '' : '';
  const previewSelectionName =
    filesPreviewRequestedName || filesPreviewTargetName;
  if (
    previewSelectionName &&
    filesSelectedName !== previewSelectionName
  ) {
    closeFilesPreview({ restoreFocus: false });
  }
  rows.forEach((row, rowIndex) => {
    row.setAttribute('aria-selected', String(rowIndex === nextIndex));
  });
  if (nextIndex >= 0) {
    filesListElement.setAttribute('aria-activedescendant', rows[nextIndex].id);
    if (options.scroll !== false) {
      rows[nextIndex].scrollIntoView({ block: 'nearest' });
    }
  } else {
    filesListElement.removeAttribute('aria-activedescendant');
  }
  if (options.focus) {
    filesListElement.focus({ preventScroll: true });
  }
  updateFilesStatusbar();
}

function clearFilesSelection() {
  setFilesSelection(-1, { scroll: false });
}

function navigateFilesParent() {
  if (
    !filesListing ||
    filesListing.parent === null ||
    filesListing.parent === undefined
  ) {
    return false;
  }
  const segments = String(filesListing.path || '').split('/').filter(Boolean);
  closeFilesPreview({ restoreFocus: false });
  filesRestoreSelectionName = segments.at(-1) || '';
  filesSelectedName = '';
  filesSelectedIndex = -1;
  filesPath = filesListing.parent;
  saveFilesNav();
  void refreshFilesListing();
  return true;
}

function activateFilesEntry(entry, options = {}) {
  const target = filesEntryTarget(entry);
  if (!target) {
    return;
  }
  if (entry.type === 'dir') {
    closeFilesPreview({ restoreFocus: false });
    filesRestoreSelectionName = '';
    filesSelectedName = '';
    filesSelectedIndex = -1;
    filesPath = target.path;
    saveFilesNav();
    void refreshFilesListing();
    return;
  }
  if (filesPrimaryPointerIsFine() && !options.directTouch) {
    void previewFilesTarget(target).catch((error) => {
      setStatus(error.message || FILES_PREVIEW_FAILED_MESSAGE);
    });
    return;
  }
  openFilesActions(target, undefined, { touch: options.directTouch });
}

function handleFilesListKeydown(event) {
  if (!filesListElement || viewMode !== 'files') {
    return;
  }
  if (event.altKey && event.key === 'ArrowUp') {
    event.preventDefault();
    navigateFilesParent();
    return;
  }
  if (
    (event.ctrlKey || event.metaKey) &&
    event.shiftKey &&
    event.key.toLocaleLowerCase() === 'n'
  ) {
    event.preventDefault();
    openFilesNameDialog('create');
    return;
  }
  if (event.key === 'ArrowLeft' || event.key === 'Backspace') {
    event.preventDefault();
    navigateFilesParent();
    return;
  }
  if (filesVisibleEntries.length === 0) {
    return;
  }
  const lastIndex = filesVisibleEntries.length - 1;
  let nextIndex = filesSelectedIndex;
  if (event.ctrlKey || event.metaKey) {
    return;
  }
  if (event.key === 'ArrowDown') {
    nextIndex = filesSelectedIndex < 0 ? 0 : Math.min(lastIndex, filesSelectedIndex + 1);
  } else if (event.key === 'ArrowUp') {
    nextIndex = filesSelectedIndex < 0 ? lastIndex : Math.max(0, filesSelectedIndex - 1);
  } else if (event.key === 'Home') {
    nextIndex = 0;
  } else if (event.key === 'End') {
    nextIndex = lastIndex;
  } else if (event.key === 'PageDown') {
    nextIndex = filesSelectedIndex < 0 ? 0 : Math.min(lastIndex, filesSelectedIndex + 10);
  } else if (event.key === 'PageUp') {
    nextIndex = filesSelectedIndex < 0 ? 0 : Math.max(0, filesSelectedIndex - 10);
  } else if (event.key === 'Enter') {
    event.preventDefault();
    if (filesSelectedIndex >= 0) {
      activateFilesEntry(filesVisibleEntries[filesSelectedIndex]);
    }
    return;
  } else if (event.key === 'F2') {
    event.preventDefault();
    if (filesSelectedIndex >= 0) {
      openFilesNameDialog(
        'rename',
        filesEntryTarget(filesVisibleEntries[filesSelectedIndex])
      );
    }
    return;
  } else if (event.key === 'Delete') {
    event.preventDefault();
    if (filesSelectedIndex >= 0 && filesWritable && !event.repeat) {
      void deleteFilesTarget(
        filesEntryTarget(filesVisibleEntries[filesSelectedIndex])
      ).catch((error) => {
        setStatus(error.message || FILES_DELETE_FAILED_MESSAGE);
      });
    }
    return;
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    const selected = filesVisibleEntries[filesSelectedIndex];
    if (selected?.type === 'dir') {
      activateFilesEntry(selected);
    }
    return;
  } else if (
    event.key === 'ContextMenu' ||
    (event.shiftKey && event.key === 'F10')
  ) {
    event.preventDefault();
    if (filesSelectedIndex >= 0) {
      const row = filesListElement.querySelectorAll('[role="option"]')[
        filesSelectedIndex
      ];
      const bounds = row?.getBoundingClientRect();
      openFilesActions(
        filesEntryTarget(filesVisibleEntries[filesSelectedIndex]),
        bounds
          ? { x: bounds.left + 24, y: bounds.top + Math.min(28, bounds.height) }
          : undefined
      );
    }
    return;
  } else if (event.key === 'Escape') {
    event.preventDefault();
    clearFilesSelection();
    return;
  } else if (
    event.key.length === 1 &&
    !event.altKey &&
    !event.isComposing &&
    /\S/.test(event.key)
  ) {
    event.preventDefault();
    window.clearTimeout(filesTypeaheadTimer);
    filesTypeahead += event.key.toLocaleLowerCase();
    filesTypeaheadTimer = window.setTimeout(() => {
      filesTypeahead = '';
    }, 650);
    const start = Math.max(0, filesSelectedIndex + 1);
    const ordered = [
      ...filesVisibleEntries.slice(start),
      ...filesVisibleEntries.slice(0, start)
    ];
    const match = ordered.find((entry) =>
      entry.name.toLocaleLowerCase().startsWith(filesTypeahead)
    );
    if (match) {
      nextIndex = filesVisibleEntries.indexOf(match);
    } else {
      return;
    }
  } else {
    return;
  }
  event.preventDefault();
  setFilesSelection(nextIndex, { scroll: true });
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
    scheduleLayoutDebug('view-mode');
    return;
  }
  closeFilesActions({ restoreFocus: false });
  closeFilesPreview();
  closeFilesOptions();
  closeFilesNameDialog();
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
  scheduleLayoutDebug('view-mode');
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
  if (filesLocationSelect) {
    filesLocationSelect.replaceChildren();
    for (const root of roots) {
      const option = document.createElement('option');
      option.value = root.id;
      option.textContent = root.label || root.id;
      option.title = root.displayPrefix || root.label || root.id;
      filesLocationSelect.append(option);
    }
    filesLocationSelect.value = filesRootId;
    filesLocationSelect.disabled = roots.length < 2;
  }
  for (const root of roots) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = root.label || root.id;
    button.dataset.filesRoot = root.id;
    button.classList.toggle('active', filesRootId === root.id);
    if (filesRootId === root.id) {
      button.setAttribute('aria-current', 'location');
    }
    button.title = root.displayPrefix || root.label || root.id;
    button.addEventListener('click', () => {
      switchFilesRoot(root.id);
    });
    filesRootsElement.append(button);
  }
  const hiddenControl = document.createElement('label');
  hiddenControl.id = 'files-hidden-toggle';
  hiddenControl.className = 'files-checkbox-control';
  hiddenControl.title = 'Include dotfiles (names starting with .)';
  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'checkbox';
  hiddenInput.checked = filesShowHidden;
  const hiddenLabel = document.createElement('span');
  hiddenLabel.textContent = 'Show hidden files';
  hiddenInput.addEventListener('change', () => {
    filesShowHidden = hiddenInput.checked;
    saveFilesShowHidden();
    updateFilesHiddenControls();
    if (filesListing) {
      renderFilesListing(filesListing);
    } else {
      void refreshFilesListing();
    }
  });
  hiddenControl.append(hiddenInput, hiddenLabel);
  filesRootsElement.append(hiddenControl);
  updateFilesHiddenControls();
}

function updateFilesHiddenControls() {
  const sidebarInput = filesRootsElement?.querySelector(
    '#files-hidden-toggle input[type="checkbox"]'
  );
  if (sidebarInput) {
    sidebarInput.checked = filesShowHidden;
  }
  if (filesOptionHidden) {
    filesOptionHidden.checked = filesShowHidden;
  }
}

function switchFilesRoot(rootId) {
  const nextRoot = filesRootsCatalog.find((entry) => entry.id === rootId);
  if (!nextRoot) {
    return false;
  }
  if (filesRootId === nextRoot.id) {
    void refreshFilesListing();
    return true;
  }
  closeFilesPreview({ restoreFocus: false });
  filesRootId = nextRoot.id;
  filesPath = '';
  filesRestoreSelectionName = '';
  clearFilesSelection();
  saveFilesNav();
  renderFilesRoots();
  void refreshFilesListing();
  return true;
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
        filesRestoreSelectionName = '';
        clearFilesSelection();
        saveFilesNav();
        void refreshFilesListing();
      });
    }
    filesBreadcrumbElement.append(button);
  };

  if (!filesUsesCompactLocationSelector()) {
    appendCrumb(prefix, '', segments.length === 0);
  }
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
  const atRoot = listing.parent === null || listing.parent === undefined;
  if (filesUpButton) {
    filesUpButton.disabled = atRoot;
  }
  if (filesNewFolderDesktopButton) {
    filesNewFolderDesktopButton.disabled = !filesWritable;
  }
  if (filesOptionNewFolder) {
    filesOptionNewFolder.disabled = !filesWritable;
  }
  for (const input of [filesUploadInput, filesUploadDesktopInput]) {
    if (input) {
      input.disabled = !filesWritable;
    }
  }
  filesUploadTriggers.forEach((trigger) => {
    trigger.setAttribute('aria-disabled', String(!filesWritable));
    trigger.tabIndex = filesWritable ? 0 : -1;
  });
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
  filesVisibleEntries = entries;
  if (filesEmptyHintElement) {
    if (entries.length > 0) {
      filesEmptyHintElement.hidden = true;
    } else {
      filesEmptyHintElement.hidden = false;
      if (rawEntries.length > 0 && !filesShowHidden) {
        filesEmptyHintElement.textContent =
          `No visible items (${hiddenCount} hidden). Enable “Show hidden files” in File options.`;
      } else {
        filesEmptyHintElement.textContent = 'Empty folder';
      }
    }
  }
  const selectionName = filesRestoreSelectionName || filesSelectedName;
  const selectionIndex = filesRestoreSelectionIndex;
  filesRestoreSelectionName = '';
  filesRestoreSelectionIndex = -1;
  filesSelectedIndex = -1;
  filesSelectedName = '';
  entries.forEach((entry, index) => {
    const item = document.createElement('li');
    item.id = `files-entry-${index}`;
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', 'false');
    item.dataset.name = entry.name;
    item.dataset.type = entry.type;
    const icon = document.createElement('span');
    icon.className = `files-entry-icon ${entry.type === 'dir' ? 'dir' : 'file'}`;
    icon.setAttribute('aria-hidden', 'true');
    const name = document.createElement('span');
    name.className = `files-entry-name ${entry.type === 'dir' ? 'dir' : 'file'}`;
    name.textContent = entry.name;
    const meta = document.createElement('span');
    meta.className = 'files-entry-meta';
    // The folder icon already says "folder"; don't spend a line restating it.
    meta.textContent =
      entry.type === 'dir'
        ? ''
        : `${formatFilesSize(entry.size)} · ${formatFilesMtime(entry.mtime)}`;
    const modified = document.createElement('span');
    modified.className = 'files-entry-modified';
    modified.textContent = formatFilesMtime(entry.mtime) || '—';
    const size = document.createElement('span');
    size.className = 'files-entry-size';
    size.textContent = entry.type === 'dir' ? '—' : formatFilesSize(entry.size);
    item.setAttribute(
      'aria-label',
      entry.type === 'dir'
        ? `${entry.name}, folder`
        : `${entry.name}, file, ${formatFilesSize(entry.size)}, ${formatFilesMtime(entry.mtime)}`
    );
    item.append(icon, name, meta, modified, size);
    let entryLongPressTimer = null;
    let entryLongPressPointerId = null;
    let entryLongPressStartX = 0;
    let entryLongPressStartY = 0;
    const cancelEntryLongPress = () => {
      window.clearTimeout(entryLongPressTimer);
      entryLongPressTimer = null;
      entryLongPressPointerId = null;
    };
    item.addEventListener('pointerdown', (event) => {
      item.dataset.lastPointerType = event.pointerType || '';
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') {
        return;
      }
      cancelEntryLongPress();
      entryLongPressPointerId = event.pointerId;
      entryLongPressStartX = event.clientX;
      entryLongPressStartY = event.clientY;
      entryLongPressTimer = window.setTimeout(() => {
        entryLongPressTimer = null;
        item.dataset.longPressActivated = '1';
        setFilesSelection(index, { scroll: false });
        openFilesActions(filesEntryTarget(entry, listing), undefined, {
          touch: true
        });
      }, filesEntryLongPressMilliseconds);
    });
    item.addEventListener('pointermove', (event) => {
      if (
        entryLongPressTimer === null ||
        event.pointerId !== entryLongPressPointerId
      ) {
        return;
      }
      if (
        Math.hypot(
          event.clientX - entryLongPressStartX,
          event.clientY - entryLongPressStartY
        ) > filesEntryLongPressMoveTolerance
      ) {
        cancelEntryLongPress();
      }
    });
    item.addEventListener('pointerup', cancelEntryLongPress);
    item.addEventListener('pointercancel', cancelEntryLongPress);
    item.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'touch') {
        cancelEntryLongPress();
      }
    });
    item.addEventListener('click', (event) => {
      if (item.dataset.longPressActivated === '1') {
        delete item.dataset.longPressActivated;
        item.dataset.lastPointerType = '';
        event.preventDefault();
        return;
      }
      setFilesSelection(index, {
        focus: filesPrimaryPointerIsFine(),
        scroll: false
      });
      const directTouch =
        item.dataset.lastPointerType === 'touch' ||
        item.dataset.lastPointerType === 'pen';
      item.dataset.lastPointerType = '';
      if (filesPrimaryPointerIsFine() && !directTouch) {
        return;
      }
      activateFilesEntry(entry, { directTouch });
    });
    item.addEventListener('dblclick', (event) => {
      if (!filesPrimaryPointerIsFine()) {
        return;
      }
      event.preventDefault();
      setFilesSelection(index, { focus: true, scroll: false });
      activateFilesEntry(entry);
    });
    item.addEventListener('contextmenu', (event) => {
      if (!filesPrimaryPointerIsFine()) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      setFilesSelection(index, { focus: true, scroll: false });
      openFilesActions(filesEntryTarget(entry, listing), {
        x: event.clientX,
        y: event.clientY
      });
    });
    filesListElement.append(item);
  });
  let selectionApplied = false;
  if (selectionName) {
    const namedSelectionIndex = entries.findIndex(
      (entry) => entry.name === selectionName
    );
    if (namedSelectionIndex >= 0) {
      setFilesSelection(namedSelectionIndex, { scroll: true });
      selectionApplied = true;
    }
  }
  if (!selectionApplied && selectionIndex >= 0 && entries.length > 0) {
    setFilesSelection(Math.min(selectionIndex, entries.length - 1), {
      scroll: true
    });
    selectionApplied = true;
  }
  if (
    !selectionApplied &&
    document.activeElement === filesListElement &&
    entries.length > 0
  ) {
    setFilesSelection(0, { scroll: false });
    selectionApplied = true;
  }
  if (!selectionApplied) {
    filesListElement.removeAttribute('aria-activedescendant');
    updateFilesStatusbar();
    if (filesPreviewRequestedName || filesPreviewTargetName) {
      closeFilesPreview({ restoreFocus: false });
    }
  }
  renderFilesRoots();
}

async function refreshFilesListing() {
  if (filesLoadPromise) {
    return filesLoadPromise;
  }
  filesLoadPromise = (async () => {
    filesPanelElement?.setAttribute('aria-busy', 'true');
    for (const button of [filesRefreshButton, filesRefreshDesktopButton]) {
      if (button) {
        button.disabled = true;
      }
    }
    try {
      let triedRootFallback = false;
      while (true) {
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
          break;
        } catch (error) {
          // A remembered path may disappear between visits. Retry its root
          // within the same guarded load so a second refresh cannot race it.
          if (filesPath && !triedRootFallback) {
            closeFilesPreview({ restoreFocus: false });
            filesPath = '';
            saveFilesNav();
            triedRootFallback = true;
            continue;
          }
          setStatus(error.message || 'Could not list files');
          if (filesListElement) {
            filesListElement.replaceChildren();
          }
          filesVisibleEntries = [];
          filesSelectedIndex = -1;
          filesSelectedName = '';
          filesListElement?.removeAttribute('aria-activedescendant');
          updateFilesStatusbar();
          if (filesEmptyHintElement) {
            filesEmptyHintElement.hidden = false;
            filesEmptyHintElement.textContent =
              error.message || 'Could not list files';
          }
          break;
        }
      }
    } finally {
      filesPanelElement?.setAttribute('aria-busy', 'false');
      for (const button of [filesRefreshButton, filesRefreshDesktopButton]) {
        if (button) {
          button.disabled = false;
        }
      }
      filesLoadPromise = null;
    }
  })();
  return filesLoadPromise;
}

async function refreshFilesListingAfterMutation(
  rootId,
  directoryPath,
  selection = {}
) {
  const inFlight = filesLoadPromise;
  if (inFlight) {
    await inFlight;
  }
  if (filesRootId !== rootId || filesPath !== directoryPath) {
    return false;
  }
  filesRestoreSelectionName = selection.name || '';
  filesRestoreSelectionIndex = Number.isInteger(selection.index)
    ? selection.index
    : -1;
  await refreshFilesListing();
  return true;
}

function openFilesActions(target, anchor, options = {}) {
  if (!target) {
    return;
  }
  if (filesActionsDialog?.open) {
    filesActionsDialog.close();
  }
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
  if (filesActionRename) {
    filesActionRename.hidden = !filesWritable;
  }
  if (filesActionPreview) {
    filesActionPreview.hidden = target.type !== 'file';
  }
  if (filesActionDownload) {
    filesActionDownload.hidden = target.type !== 'file';
  }
  if (!filesActionsDialog) {
    return;
  }
  const useActionSheet = options.touch || !filesPrimaryPointerIsFine();
  filesActionsDialog.classList.toggle('files-action-sheet', useActionSheet);
  if (!useActionSheet) {
    filesActionsDialog.show();
    const bounds = filesActionsDialog.getBoundingClientRect();
    const requestedX = Number.isFinite(anchor?.x)
      ? anchor.x
      : window.innerWidth / 2;
    const requestedY = Number.isFinite(anchor?.y)
      ? anchor.y
      : window.innerHeight / 2;
    const left = Math.max(
      6,
      Math.min(requestedX, window.innerWidth - bounds.width - 6)
    );
    const top = Math.max(
      6,
      Math.min(requestedY, window.innerHeight - bounds.height - 6)
    );
    filesActionsDialog.style.left = `${Math.round(left)}px`;
    filesActionsDialog.style.top = `${Math.round(top)}px`;
    filesActionsDialog
      .querySelector('.files-actions-buttons button:not([hidden])')
      ?.focus({ preventScroll: true });
  } else {
    filesActionsDialog.style.removeProperty('left');
    filesActionsDialog.style.removeProperty('top');
    filesActionsDialog.showModal();
    filesActionsDialog.focus({ preventScroll: true });
  }
}

function closeFilesActions(options = {}) {
  filesActionTarget = null;
  if (filesActionsDialog?.open) {
    filesActionsDialog.close();
  }
  filesActionsDialog?.classList.remove('files-action-sheet');
  if (
    options.restoreFocus !== false &&
    viewMode === 'files' &&
    filesPrimaryPointerIsFine()
  ) {
    filesListElement?.focus({ preventScroll: true });
  }
}

function closeFilesPreview(options = {}) {
  filesPreviewRequestId += 1;
  filesPreviewTargetName = '';
  filesPreviewRequestedName = '';
  for (const body of [filesPreviewBody, filesPreviewPaneBody]) {
    if (body) {
      body.textContent = '';
    }
  }
  if (filesPreviewDialog?.open) {
    filesPreviewDialog.close();
  }
  if (filesPreviewPane) {
    filesPreviewPane.hidden = true;
  }
  if (
    options.restoreFocus !== false &&
    viewMode === 'files' &&
    filesPrimaryPointerIsFine()
  ) {
    filesListElement?.focus({ preventScroll: true });
  }
}

function openFilesOptions() {
  updateFilesHiddenControls();
  if (filesOptionsDialog && !filesOptionsDialog.open) {
    filesOptionsDialog.showModal();
    filesOptionsDialog.focus({ preventScroll: true });
  }
}

function closeFilesOptions() {
  if (filesOptionsDialog?.open) {
    filesOptionsDialog.close();
  }
}

function validateFilesEntryName(name) {
  if (!name) {
    return 'Enter a name.';
  }
  if (name.length > 180) {
    return 'Use 180 characters or fewer.';
  }
  if (new TextEncoder().encode(name).length > 255) {
    return 'This name is too large for the filesystem.';
  }
  if (name !== name.trim()) {
    return 'Remove spaces from the beginning or end.';
  }
  if (
    name === '.' ||
    name === '..' ||
    /[\/\\\0-\x1f\x7f]/.test(name)
  ) {
    return 'Names cannot be “.”, “..”, contain slashes, or control characters.';
  }
  return '';
}

function openFilesNameDialog(mode, target = null) {
  if (!filesWritable) {
    setStatus('This location is read-only', { sticky: true });
    return false;
  }
  if (mode === 'rename' && !target) {
    return false;
  }
  filesNameGeneration += 1;
  filesNameMode = mode === 'rename' ? 'rename' : 'create';
  filesNameTarget = target;
  filesNameOriginRoot = filesRootId;
  filesNameOriginPath = filesPath || '';
  closeFilesActions({ restoreFocus: false });
  closeFilesOptions();
  if (filesNameTitle) {
    filesNameTitle.textContent =
      filesNameMode === 'rename' ? 'Rename item' : 'New folder';
  }
  if (filesNameLabel) {
    filesNameLabel.textContent =
      filesNameMode === 'rename' ? 'New name' : 'Folder name';
  }
  if (filesNameSubmit) {
    filesNameSubmit.textContent =
      filesNameMode === 'rename' ? 'Rename' : 'Create';
    filesNameSubmit.disabled = false;
  }
  if (filesNameError) {
    filesNameError.textContent = '';
  }
  if (filesNameInput) {
    filesNameInput.value = filesNameMode === 'rename' ? target.name : '';
  }
  if (filesNameDialog && !filesNameDialog.open) {
    filesNameDialog.showModal();
  }
  window.requestAnimationFrame(() => {
    filesNameInput?.focus({ preventScroll: true });
    if (filesNameMode === 'rename' && target?.type === 'file') {
      const dotIndex = target.name.lastIndexOf('.');
      filesNameInput?.setSelectionRange(
        0,
        dotIndex > 0 ? dotIndex : target.name.length
      );
    } else {
      filesNameInput?.select();
    }
  });
  return true;
}

function closeFilesNameDialog(options = {}) {
  filesNameGeneration += 1;
  if (filesNameDialog?.open) {
    filesNameDialog.close();
  }
  filesNameMode = '';
  filesNameTarget = null;
  filesNameOriginRoot = '';
  filesNameOriginPath = '';
  if (filesNameError) {
    filesNameError.textContent = '';
  }
  if (
    options.restoreFocus !== false &&
    viewMode === 'files' &&
    filesPrimaryPointerIsFine()
  ) {
    filesListElement?.focus({ preventScroll: true });
  }
}

async function submitFilesName() {
  if (filesNameSubmit?.disabled) {
    return;
  }
  const generation = filesNameGeneration;
  const mode = filesNameMode;
  const target = filesNameTarget;
  const originRoot = filesNameOriginRoot;
  const originPath = filesNameOriginPath;
  const name = filesNameInput?.value || '';
  const validationError = validateFilesEntryName(name);
  if (validationError) {
    if (filesNameError) {
      filesNameError.textContent = validationError;
    }
    filesNameInput?.focus({ preventScroll: true });
    return;
  }
  if (!mode || (mode === 'rename' && !target)) {
    return;
  }
  if (filesNameSubmit) {
    filesNameSubmit.disabled = true;
  }
  if (filesNameError) {
    filesNameError.textContent = '';
  }
  try {
    if (mode === 'rename') {
      await api('/api/fs/entry', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          root: target.root,
          path: target.path,
          name
        })
      });
      if (
        generation === filesNameGeneration &&
        filesRootId === target.root &&
        filesPath === originPath &&
        (
          filesPreviewTargetName === target.name ||
          filesPreviewRequestedName === target.name
        )
      ) {
        closeFilesPreview({ restoreFocus: false });
      }
      setStatus(`Renamed ${target.name} to ${name}`);
    } else {
      await api('/api/fs/directory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          root: originRoot,
          path: originPath,
          name
        })
      });
      setStatus(`Created ${name}`);
    }
    const dialogStillCurrent =
      generation === filesNameGeneration && filesNameDialog?.open;
    if (dialogStillCurrent) {
      closeFilesNameDialog({ restoreFocus: false });
    }
    const refreshed = await refreshFilesListingAfterMutation(
      originRoot,
      originPath,
      dialogStillCurrent ? { name } : {}
    );
    if (refreshed && filesPrimaryPointerIsFine() && !filesNameDialog?.open) {
      filesListElement?.focus({ preventScroll: true });
    }
  } catch (error) {
    if (generation !== filesNameGeneration || !filesNameDialog?.open) {
      setStatus(error.message || 'Operation failed', { sticky: true });
      return;
    }
    if (filesNameError) {
      filesNameError.textContent = error.message || 'Operation failed';
    }
    filesNameInput?.focus({ preventScroll: true });
  } finally {
    if (
      filesNameSubmit &&
      filesNameDialog?.open &&
      generation === filesNameGeneration
    ) {
      filesNameSubmit.disabled = false;
    }
  }
}

// Shared with both the desktop context menu and the mobile action sheet,
// which each fall back to these when the server gives no error detail.
const FILES_PREVIEW_FAILED_MESSAGE = 'Preview failed';
const FILES_DOWNLOAD_FAILED_MESSAGE = 'Download failed';
const FILES_DELETE_FAILED_MESSAGE = 'Delete failed';

async function previewFilesTarget(target) {
  const targetDirectory = target.path
    .split('/')
    .slice(0, -1)
    .join('/');
  const query = new URLSearchParams({
    root: target.root,
    path: target.path
  });
  const requestId = ++filesPreviewRequestId;
  filesPreviewRequestedName = target.name;
  let preview;
  try {
    preview = await api(`/api/fs/read?${query.toString()}`);
  } catch (error) {
    if (requestId !== filesPreviewRequestId) {
      return;
    }
    throw error;
  }
  if (
    requestId !== filesPreviewRequestId ||
    viewMode !== 'files' ||
    filesRootId !== target.root ||
    filesPath !== targetDirectory
  ) {
    return;
  }
  for (const title of [filesPreviewTitle, filesPreviewPaneTitle]) {
    if (title) {
      title.textContent = target.name;
    }
  }
  for (const body of [filesPreviewBody, filesPreviewPaneBody]) {
    if (body) {
      body.textContent = preview.text || '';
    }
  }
  filesPreviewTargetName = target.name;
  closeFilesActions({ restoreFocus: false });
  if (
    filesPrimaryPointerIsFine() &&
    window.matchMedia?.('(min-width: 840px)').matches
  ) {
    if (filesPreviewPane) {
      filesPreviewPane.hidden = false;
    }
  } else if (filesPreviewDialog && !filesPreviewDialog.open) {
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
    let message = FILES_DOWNLOAD_FAILED_MESSAGE;
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
  // The server only ever removes an empty directory (no recursive rm), so
  // there is no extra "and its contents" consequence to describe here —
  // both files and directories get the same plain, undoable-consequence text.
  const ok = window.confirm(
    `Delete ${filesDisplayPath(target.root, target.path)}? This can’t be undone.`
  );
  if (!ok) {
    return;
  }
  const deletedIndex = filesVisibleEntries.findIndex(
    (entry) => entry.name === target.name
  );
  const targetDirectory = target.path
    .split('/')
    .slice(0, -1)
    .join('/');
  const query = new URLSearchParams({
    root: target.root,
    path: target.path
  });
  await api(`/api/fs/entry?${query.toString()}`, { method: 'DELETE' });
  setStatus(`Deleted ${target.name}`);
  closeFilesActions();
  await refreshFilesListingAfterMutation(target.root, targetDirectory, {
    index: Math.max(0, deletedIndex)
  });
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
  const uploadRootId = filesRootId;
  const uploadPath = filesPath || '';
  try {
    setStatus(`Uploading ${file.name}…`, { sticky: true });
    const buffer = await file.arrayBuffer();
    const query = new URLSearchParams({
      root: uploadRootId,
      path: uploadPath,
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
    await refreshFilesListingAfterMutation(uploadRootId, uploadPath, {
      name: file.name
    });
  } catch (error) {
    setStatus(error.message || 'Upload failed', { sticky: true });
  } finally {
    if (filesUploadInput) {
      filesUploadInput.value = '';
    }
    if (filesUploadDesktopInput) {
      filesUploadDesktopInput.value = '';
    }
  }
}

function openSettingsDialog() {
  setSettingsTab(loadLastSettingsTab());
  if (settingsDialogElement && !settingsDialogElement.open) {
    settingsDialogElement.showModal();
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
    item.classList.toggle('active', isActive);
    button.className = isActive ? 'session active' : 'session';
    const profile = keyProfileForSession(session.name);
    const sessionName = document.createElement('span');
    sessionName.className = 'session-name';
    sessionName.textContent = session.name;
    const profileBadge = document.createElement('span');
    profileBadge.className = 'session-profile-label';
    profileBadge.textContent = profile.name;
    profileBadge.dataset.shortLabel = shortProfileLabel(profile);
    profileBadge.title = `Profile: ${profile.name}`;
    button.append(sessionName, profileBadge);
    button.title =
      `${session.windows} window(s), ${session.attached} client(s). ` +
      `Profile: ${profile.name}. ` +
      'Long-press to rename.';
    button.addEventListener('click', () => connect(session.name));
    installSessionRenameLongPress(button, session.name);
    item.append(button);
    if (isActive) {
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'session-close';
      closeButton.innerHTML =
        '<svg viewBox="0 0 16 16" aria-hidden="true">' +
        '<path d="m4 4 8 8M12 4l-8 8" /></svg>';
      closeButton.title = `Delete ${session.name}`;
      closeButton.setAttribute('aria-label', `Delete session ${session.name}`);
      closeButton.addEventListener('click', () => killSession(session.name));
      item.append(closeButton);
    }
    sessionsElement.append(item);
  }
  keyboardButton.disabled = !activeSession;
  renderHeaderSummary();
}

async function refreshSessions(selectFirst = false, quiet = false) {
  if (qaShellMode) {
    return;
  }
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
    if (selectFirst && !qaShellMode && !activeSession && sessions.length > 0) {
      const remembered = rememberedSession();
      const selected =
        sessions.find((session) => session.name === remembered) || sessions[0];
      connect(selected.name);
    }
    if (!quiet) {
      setStatus(`${sessions.length} session${sessions.length === 1 ? '' : 's'}`);
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
      scrollTerminalLinesClamped(
        (direction === 'up' ? -1 : 1) * Math.max(1, terminal.rows - 1)
      );
    }
    scheduleTerminalScrollClamp();
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
  updateEffectiveSafeAreaInsets();
  document.documentElement.style.setProperty(
    '--app-height',
    `${keyboardLayoutLock.height}px`
  );
  // Keep the app pinned to the visible top; do not track later visualViewport
  // rubber-band pans (those look like the whole page is scrolling).
  document.documentElement.style.setProperty('--app-top', '0px');
}

/**
 * Pin body height to the real interactive viewport (visualViewport / innerHeight).
 * On iOS standalone, CSS 100dvh often disagrees with hit-testing until the first
 * terminal gesture — leaving the footer visible but untappable.
 */
function pinPageToOrigin() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function applyRestingAppHeight(options = {}) {
  const force = options.force === true;
  if (
    selectionViewportLock ||
    (!force &&
      (keyboardLayoutLock ||
        keyboardDismissing ||
        document.documentElement.classList.contains('keyboard-open')))
  ) {
    return;
  }
  const viewport = window.visualViewport;
  const height = Math.round(
    viewport?.height ||
      window.innerHeight ||
      document.documentElement.clientHeight ||
      0
  );
  if (height <= 0) {
    return;
  }
  lastAppliedViewportHeight = height;
  lastAppliedViewportTop = 0;
  document.documentElement.style.setProperty('--app-height', `${height}px`);
  document.documentElement.style.setProperty('--app-top', '0px');
  pinPageToOrigin();
}

function clearLockedAppGeometry(options = {}) {
  lastAppliedViewportHeight = null;
  lastAppliedViewportTop = null;
  document.documentElement.classList.remove('keyboard-open');
  // Prefer an explicit resting height over bare 100dvh (standalone hit-test).
  applyRestingAppHeight(options);
  updateEffectiveSafeAreaInsets();
  pinPageToOrigin();
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
  clearLockedAppGeometry({ force: true });
  updateEffectiveSafeAreaInsets();
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
    pinPageToOrigin();
    if (!keyboardViewportIsReduced() || attempts >= 24) {
      keyboardDismissing = false;
      clearLockedAppGeometry({ force: true });
      updateEffectiveSafeAreaInsets();
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
    pinPageToOrigin();
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
    scrollTerminalLinesClamped(direction * steps);
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
        scrollTerminalLinesClamped(delta > 0 ? -steps : steps);
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
  scheduleTerminalScrollClamp();
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
  clearTimeout(reconnectTimer);
  reconnectTimer = null;
  if (socket) {
    socket.close();
    socket = null;
  }
  lastSentTerminalCols = null;
  lastSentTerminalRows = null;
  activeSession = null;
  syncActiveKeyProfileUi();
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
  clearTimeout(reconnectTimer);
  const retiredSocket = socket;
  socket = null;
  if (retiredSocket) {
    retiredSocket.close();
  }
  activeSession = name;
  syncActiveKeyProfileUi();
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
  const nextSocket = new WebSocket(
    `${protocol}//${window.location.host}/ws?session=${encodeURIComponent(name)}`
  );
  socket = nextSocket;
  lastSentTerminalCols = null;
  lastSentTerminalRows = null;
  nextSocket.binaryType = 'arraybuffer';
  nextSocket.addEventListener('open', () => {
    if (socket !== nextSocket) {
      return;
    }
    clearConnectionWatch();
    lastConnectionDetail = `Connected to ${name}`;
    setConnectionState('connected', lastConnectionDetail);
    setStatus(`Connected to ${name}`);
    setHeaderCollapsed(true);
    updateTermControlsEnabled();
    fit();
  });
  nextSocket.addEventListener('message', (event) => {
    if (socket !== nextSocket) {
      return;
    }
    terminal.write(
      typeof event.data === 'string' ? event.data : decoder.decode(event.data)
    );
  });
  nextSocket.addEventListener('close', () => {
    stopNativeDeleteRepeat();
    updateTermControlsEnabled();
    if (
      socket !== nextSocket ||
      activeSession !== name
    ) {
      return;
    }
    socket = null;
    setCtrlArmed(false);
    lastConnectionDetail = `Disconnected from ${name}; reconnecting…`;
    setConnectionState('connecting', lastConnectionDetail);
    setStatus(lastConnectionDetail, { sticky: true });
    armConnectionWatch(name);
    reconnectTimer = setTimeout(() => connect(name), 1500);
  });
  nextSocket.addEventListener('error', () => {
    if (socket !== nextSocket) {
      return;
    }
    lastConnectionDetail = `Connection error for ${name}. Tap the status dot to retry.`;
    setConnectionState('error', lastConnectionDetail);
    setStatus(lastConnectionDetail, { sticky: true });
    updateTermControlsEnabled();
  });
}

async function createSession() {
  const proposed = window.prompt('New session name:');
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
    !window.confirm(`Delete session “${name}”? Its processes will stop.`)
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
  const proposed = window.prompt('Rename session:', name);
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
    renameSessionKeyProfileAssignment(name, renamed);
    if (activeSession === name) {
      activeSession = renamed;
      rememberSession(renamed);
      syncActiveKeyProfileUi();
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
      errorName: error?.name || 'Error'
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
        errorName: error?.name || 'Error'
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
        reason: 'read-failed'
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
      pathLength: pathText.trim().length
    });
    return true;
  } catch (error) {
    clientDebug('paste-image-error', {
      errorName: error?.name || 'Error'
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
      reason: 'clipboard-read-failed'
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
window.addEventListener('blur', stopNativeDeleteRepeat);
window.addEventListener('pagehide', stopNativeDeleteRepeat);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopNativeDeleteRepeat();
  }
});

viewModeElement?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-view-mode]');
  if (!button || !viewModeElement.contains(button)) {
    return;
  }
  setViewMode(button.dataset.viewMode);
});
filesUpButton?.addEventListener('click', () => {
  navigateFilesParent();
});
filesLocationSelect?.addEventListener('change', () => {
  switchFilesRoot(filesLocationSelect.value);
});
filesNewFolderDesktopButton?.addEventListener('click', () => {
  openFilesNameDialog('create');
});
filesRefreshButton?.addEventListener('click', () => {
  void refreshFilesListing();
});
filesRefreshDesktopButton?.addEventListener('click', () => {
  void refreshFilesListing();
});
filesSettingsButton?.addEventListener('click', () => {
  openFilesOptions();
});
filesSettingsDesktopButton?.addEventListener('click', () => {
  openSettingsDialog();
});
filesUploadInput?.addEventListener('change', () => {
  void uploadFilesSelected(filesUploadInput.files);
});
filesUploadDesktopInput?.addEventListener('change', () => {
  void uploadFilesSelected(filesUploadDesktopInput.files);
});
filesUploadTriggers.forEach((trigger) => {
  trigger.addEventListener('keydown', (event) => {
    if (
      trigger.getAttribute('aria-disabled') === 'true' ||
      (event.key !== 'Enter' && event.key !== ' ')
    ) {
      return;
    }
    event.preventDefault();
    trigger.querySelector('input[type="file"]')?.click();
  });
});
filesListElement?.addEventListener('keydown', handleFilesListKeydown);
filesListElement?.addEventListener('focus', () => {
  if (filesSelectedIndex < 0 && filesVisibleEntries.length > 0) {
    setFilesSelection(0, { scroll: false });
  }
});
filesActionsClose?.addEventListener('click', () => {
  closeFilesActions();
});
filesActionPreview?.addEventListener('click', () => {
  if (!filesActionTarget) {
    return;
  }
  void previewFilesTarget(filesActionTarget).catch((error) => {
    setStatus(error.message || FILES_PREVIEW_FAILED_MESSAGE);
  });
});
filesActionDownload?.addEventListener('click', () => {
  if (!filesActionTarget) {
    return;
  }
  void downloadFilesTarget(filesActionTarget).catch((error) => {
    setStatus(error.message || FILES_DOWNLOAD_FAILED_MESSAGE);
  });
});
filesActionRename?.addEventListener('click', () => {
  if (!filesActionTarget) {
    return;
  }
  openFilesNameDialog('rename', filesActionTarget);
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
    setStatus(error.message || FILES_DELETE_FAILED_MESSAGE);
  });
});
filesPreviewClose?.addEventListener('click', () => {
  closeFilesPreview();
});
filesPreviewPaneClose?.addEventListener('click', () => {
  closeFilesPreview();
});
filesOptionsClose?.addEventListener('click', () => {
  closeFilesOptions();
});
filesOptionNewFolder?.addEventListener('click', () => {
  openFilesNameDialog('create');
});
filesOptionHidden?.addEventListener('change', () => {
  filesShowHidden = filesOptionHidden.checked;
  saveFilesShowHidden();
  updateFilesHiddenControls();
  if (filesListing) {
    renderFilesListing(filesListing);
  } else {
    void refreshFilesListing();
  }
});
filesNameClose?.addEventListener('click', () => {
  closeFilesNameDialog();
});
filesNameCancel?.addEventListener('click', () => {
  closeFilesNameDialog();
});
filesNameForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  void submitFilesName();
});
filesOptionSettings?.addEventListener('click', () => {
  closeFilesOptions();
  openSettingsDialog();
});
filesActionsDialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeFilesActions();
});
filesPreviewDialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeFilesPreview();
});
filesOptionsDialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeFilesOptions();
});
filesNameDialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeFilesNameDialog();
});
document.addEventListener('pointerdown', (event) => {
  if (
    filesActionsDialog?.open &&
    !filesActionsDialog.matches(':modal') &&
    !filesActionsDialog.contains(event.target)
  ) {
    closeFilesActions({ restoreFocus: false });
  }
});
document.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    filesActionsDialog?.open &&
    !filesActionsDialog.matches(':modal')
  ) {
    event.preventDefault();
    closeFilesActions();
  }
});
window.addEventListener('resize', () => {
  scheduleFooterPinLayout();
  if (filesActionsDialog?.open && !filesActionsDialog.matches(':modal')) {
    closeFilesActions({ restoreFocus: false });
  }
  if (
    filesPreviewPane &&
    !filesPreviewPane.hidden &&
    !window.matchMedia?.('(min-width: 840px)').matches
  ) {
    closeFilesPreview({ restoreFocus: false });
  }
  if (filesListing && viewMode === 'files') {
    renderFilesBreadcrumb(filesListing);
  }
});

document.querySelector('#create').addEventListener('click', createSession);
headerSummaryButton.addEventListener('click', () => {
  // The row stays in place while the picker is open, so it toggles.
  if (headerPickerOpen()) {
    setHeaderCollapsed(true);
    return;
  }
  setHeaderCollapsed(false);
  refreshSessions(false, true);
});
connectionDotElement.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  forceReconnectActiveSession();
});
// Any interaction with the picker — pointer, keyboard, or scrolling a long
// session list — defers auto-collapse.
// Capture, because `scroll` on the session list does not bubble.
for (const activity of ['pointerdown', 'keydown', 'focusin', 'scroll']) {
  headerExpandedElement?.addEventListener(activity, scheduleHeaderCollapse, {
    capture: true,
    passive: true
  });
}
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
footerPinOverflowButton?.addEventListener('click', () => {
  if (footerDrawer === 'snips' && footerSnipsInOverflow) {
    closeFooterDrawer();
  } else {
    setFooterDrawer('pins');
  }
});
quickMenuProfileList?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-profile-id]');
  if (!button || !quickMenuProfileList.contains(button)) {
    return;
  }
  assignActiveSessionKeyProfile(button.dataset.profileId);
  closeQuickMenu();
});
quickMenuProfileList?.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return;
  }
  if (moveQuickMenuProfileFocus(event.key)) {
    event.preventDefault();
    event.stopPropagation();
  }
});
quickMenuCloseButton?.addEventListener('click', closeQuickMenu);
quickMenuFindButton?.addEventListener('click', () => {
  closeQuickMenu();
  openFindBar();
});
quickMenuRenameButton?.addEventListener('click', () => {
  const session = activeSession;
  closeQuickMenu();
  void renameSession(session);
});
quickMenuReconnectButton?.addEventListener('click', () => {
  closeQuickMenu();
  forceReconnectActiveSession();
});
quickMenuSettingsButton?.addEventListener('click', () => {
  closeQuickMenu();
  openSettingsDialog();
});
// Tapping the app outside an open session picker dismisses it. Taps over the
// terminal land on #picker-scrim, so they never reach the session; other
// controls (find bar, footer) stay one-tap. Without a session the expanded bar
// is the resting state that the empty view points at, so it is left alone.
document.addEventListener('pointerdown', (event) => {
  if (
    !activeSession ||
    !headerPickerOpen() ||
    appHeaderElement.contains(event.target)
  ) {
    return;
  }
  setHeaderCollapsed(true);
});
settingsTabsElement?.addEventListener('click', (event) => {
  const tab = event.target.closest('[data-settings-tab]');
  if (!tab || !settingsTabsElement.contains(tab)) {
    return;
  }
  setSettingsTab(tab.dataset.settingsTab);
});
document.querySelector('#settings').addEventListener('click', openQuickMenu);
headerSettingsButton?.addEventListener('click', openQuickMenu);
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
  if (action === 'pin') {
    toggleProfilePin(editorKeyProfile().id, 'key', id);
  } else if (action === 'up') {
    moveShortcut(id, -1);
  } else if (action === 'down') {
    moveShortcut(id, 1);
  } else if (action === 'remove') {
    removeShortcut(id);
  }
  button.closest('details')?.removeAttribute('open');
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
keyProfileSelect?.addEventListener('change', () => {
  selectKeyProfileForEditor(keyProfileSelect.value);
});
keyProfileDefaultSelect?.addEventListener('change', () => {
  setDefaultKeyProfile(keyProfileDefaultSelect.value);
});
keyProfileNewButton?.addEventListener('click', createKeyProfile);
keyProfileDuplicateButton?.addEventListener('click', duplicateKeyProfile);
keyProfileRenameButton?.addEventListener('click', renameKeyProfile);
keyProfileDeleteButton?.addEventListener('click', deleteKeyProfile);
for (const button of [
  keyProfileNewButton,
  keyProfileDuplicateButton,
  keyProfileRenameButton,
  keyProfileDeleteButton
]) {
  button?.addEventListener('click', () => {
    button.closest('details')?.removeAttribute('open');
  });
}
profileSnippetList?.addEventListener('change', (event) => {
  if (!event.target.matches('input[type="checkbox"]')) {
    return;
  }
  const ids = [...profileSnippetList.querySelectorAll(
    'input[type="checkbox"]:checked'
  )].map((input) => input.value);
  saveProfileSnippetIds(ids);
});
profileSnippetList?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="pin"]');
  const item = event.target.closest('[data-snippet-id]');
  if (!button || !item || !profileSnippetList.contains(item)) {
    return;
  }
  toggleProfilePin(editorKeyProfile().id, 'snip', item.dataset.snippetId);
});
profileSnippetsAllButton?.addEventListener('click', () => {
  saveProfileSnippetIds(null);
});
profileSnippetsNoneButton?.addEventListener('click', () => {
  saveProfileSnippetIds([]);
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
preferencesSyncEnableButton?.addEventListener('click', () => {
  void enablePreferencesSync();
});
preferencesSyncLoadButton?.addEventListener('click', () => {
  void loadLatestSharedPreferences();
});
preferencesSyncReplaceButton?.addEventListener('click', () => {
  void replaceSharedPreferences();
});
preferencesSyncRetryButton?.addEventListener('click', () => {
  if (
    preferencesSyncEnabled &&
    preferencesWriteAllowed(
      preferencesSyncIdentity,
      preferencesSyncIdentityConfirmed
    )
  ) {
    void flushPreferencesSync();
  } else {
    void loadPreferencesFromServer();
  }
});
populateThemeSelect();
applyTerminalTheme(terminalThemeName, { persist: false });
loadKeyProfilesDocument();
keyProfileEditorId = activeKeyProfile().id;
renderKeyProfileControls();
renderFooterPins();
closeFooterDrawer();
loadFilesNav();
updateTermControlsEnabled();
void loadAppConfig();
prepareInitialPreferences();
preferencesTrackingReady = true;
void initializeSharedSetupAndSnippets();
setViewMode(loadViewMode(), { persist: false });
if (viewMode === 'files') {
  void ensureFilesRoots();
}
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
const footerPinResizeObserver = new ResizeObserver(scheduleFooterPinLayout);
footerPinResizeObserver.observe(footerScrollElement);
// The portrait session menu sizes itself against the real footer, which grows
// when a Keys/Snips drawer is open.
const footerElement = document.querySelector('footer');
const publishFooterHeight = () => {
  if (!footerElement) {
    return;
  }
  const height = Math.round(footerElement.getBoundingClientRect().height);
  // Publish only where the value is consumed — the portrait bottom bar. The
  // landscape rail is a full-height column, and leaving its height behind would
  // starve the portrait menu after a rotation.
  const bottomBar = window.matchMedia?.(
    '(orientation: portrait) and (pointer: coarse)'
  ).matches;
  if (height > 0 && bottomBar) {
    document.documentElement.style.setProperty(
      '--footer-height',
      `${height}px`
    );
  } else {
    document.documentElement.style.removeProperty('--footer-height');
  }
};
const footerHeightResizeObserver = new ResizeObserver(publishFooterHeight);
if (footerElement) {
  footerHeightResizeObserver.observe(footerElement);
  publishFooterHeight();
}
const handleViewportGeometryChange = () => {
  applyRestingAppHeight();
  publishFooterHeight();
  scheduleVisualViewportUpdate();
  scheduleLayoutDebug('viewport');
};
window.addEventListener('resize', handleViewportGeometryChange);
window.addEventListener('orientationchange', handleViewportGeometryChange);
window.visualViewport?.addEventListener('resize', handleViewportGeometryChange);
window.visualViewport?.addEventListener('scroll', () => {
  scheduleVisualViewportUpdate();
  scheduleLayoutDebug('visual-viewport');
});

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
    // Follow the expanding viewport during keyboard close. Keeping the old
    // keyboard-height lock here leaves the terminal bottom halfway up the
    // screen after an iOS swipe-to-dismiss.
    applyRestingAppHeight({ force: true });
    updateEffectiveSafeAreaInsets();
    pinPageToOrigin();
    scheduleFit();
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
  // Recompute effective safe-area after keyboard-open class changes.
  updateEffectiveSafeAreaInsets();
  if (!selectionViewportLock && !keyboardOpen && !pageZoomed) {
    keyboardLayoutLock = null;
    keyboardDismissing = false;
    applyRestingAppHeight();
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

// Re-apply after full JS load (head script already ran once for first paint).
applyViewportFitPolicy();
applyRestingAppHeight();
scheduleVisualViewportUpdate();
// Second pass after iOS settles standalone chrome (safe-area + innerHeight).
window.setTimeout(() => {
  applyViewportFitPolicy();
  applyRestingAppHeight();
  scheduleVisualViewportUpdate();
  scheduleFit();
}, 100);
window.setTimeout(() => {
  applyRestingAppHeight();
  scheduleVisualViewportUpdate();
  scheduleFit();
  scheduleLayoutDebug('settled');
}, 400);
if (!qaShellMode) {
  refreshSessions(true);
  window.setInterval(
    () => refreshSessions(false, true),
    sessionRefreshMilliseconds
  );
}
