'use strict';

const sessionsElement = document.querySelector('#sessions');
const terminalElement = document.querySelector('#terminal');
const emptyElement = document.querySelector('#empty');
const filesPanelElement = document.querySelector('#files-panel');
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
const filesHeaderNav = document.querySelector('#files-header-nav');
const filesToolbarElement = document.querySelector('#files-toolbar');
const filesUpNavButton = document.querySelector('#files-up-nav');
const filesLocationWrap = document.querySelector('#files-location-select-wrap');
const filesOptionsDialog = document.querySelector('#files-options-dialog');
const filesOptionsClose = document.querySelector('#files-options-close');
const filesOptionNewFolder = document.querySelector('#files-option-new-folder');
const filesOptionHidden = document.querySelector('#files-option-hidden');
const filesOptionTerminal = document.querySelector('#files-option-terminal');
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
const commandPaletteDialog = document.querySelector('#command-palette');
const commandPaletteInput = document.querySelector('#command-palette-input');
const commandPaletteList = document.querySelector('#command-palette-list');
const commandPaletteEmpty = document.querySelector('#command-palette-empty');
const commandPaletteClose = document.querySelector('#command-palette-close');
const quickMenuDialog = document.querySelector('#quick-menu-dialog');
const quickMenuCloseButton = document.querySelector('#quick-menu-close');
const quickMenuProfileSection = document.querySelector('#quick-menu-profile');
const quickMenuProfileValue = document.querySelector(
  '#quick-menu-profile-value'
);
const quickMenuProfileHint = document.querySelector('#quick-menu-profile-hint');
const quickMenuProfileList = document.querySelector('#quick-menu-profile-list');
const quickMenuViewButton = document.querySelector('#quick-menu-view');
const quickMenuFindButton = document.querySelector('#quick-menu-find');
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
const pasteHistoryElement = document.querySelector('#paste-history');
const selectionCopyChip = document.querySelector('#selection-copy-chip');
const terminalLinkChip = document.querySelector('#terminal-link-chip');
const scrollCatcherElement = document.querySelector('#scroll-catcher');
const pickerScrimElement = document.querySelector('#picker-scrim');
const scrollPositionElement = document.querySelector('#scroll-position');
const scrollThumbElement = document.querySelector('#scroll-thumb');
const footerDrawerElement = document.querySelector('#footer-drawer');
const footerPinsElement = document.querySelector('#footer-pins');
const footerScrollElement = document.querySelector('#footer-scroll');
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
// Written by applyAppTheme, read before first paint by viewport-init.js.
//
// One colour was not enough: :root defines dark defaults for every theme token and
// `body` paints `var(--surface)`, so setting only the html background left the body
// painting dark over it. These are the tokens that decide what the first frame looks
// like; the rest can wait for app.js.
const terminalThemePaintStorageKey = 'vps-terminal-theme-paint';
const terminalThemePaintTokens = [
  '--surface',
  '--surface-raised',
  '--surface-deep',
  '--terminal-bg',
  '--text',
  '--muted',
  '--border',
  '--accent'
];
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
const footerRecentChipsStorageKey = 'vps-terminal-footer-recent';
const pasteHistoryStorageKey = 'vps-terminal-paste-history';
const pasteHistoryPersistStorageKey = 'vps-terminal-paste-history-keep';
const viewModeStorageKey = 'vps-terminal-view-mode';
const filesNavStorageKey = 'vps-terminal-files-nav';
const filesShowHiddenStorageKey = 'vps-terminal-files-show-hidden';
const settingsLastTabStorageKey = 'vps-terminal-settings-tab';
const qaShellMode =
  new URLSearchParams(window.location.search).get('qa-shell') === '1';
const connectionConnectTimeoutMs = 10000;
// Reconnect pacing. A socket that never opened is a different failure from one that
// dropped after working: the first is the server refusing us — capacity, auth, a dead
// session — and retrying it twice a second forever is what kept the connection cap
// exhausted, since every stale tab did it too. A drop after a working session is
// usually a network blip and deserves a prompt retry.
const reconnectBaseDelayMs = 1500;
const reconnectMaxDelayMs = 30000;
// After this many failures in a row, stop claiming to be "connecting" and say what is
// happening. Retries continue in the background.
const reconnectAttemptsBeforeError = 3;

/**
 * Delay before retry attempt `attempt` (1-based). Doubles, capped.
 */
function reconnectDelayForAttempt(attempt) {
  // A non-finite attempt count would produce a NaN delay, and setTimeout treats NaN as
  // zero — a spin loop against a server that is already refusing us.
  const safe = Number.isFinite(attempt) ? attempt : 1;
  const steps = Math.max(0, Math.min(safe - 1, 10));
  return Math.min(reconnectBaseDelayMs * 2 ** steps, reconnectMaxDelayMs);
}
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
// Horizontal travel that claims a gesture as a view swipe. Deliberately larger
// than nativeScrollActivationDistance (5px): a scroll must be able to start
// before a swipe can, or a slightly-off-vertical flick would page the view.
const viewSwipeActivationDistance = 22;
// |dx| must exceed this multiple of |dy|. Without it a diagonal drag pages the
// view, which is the failure mode that makes swipe navigation feel broken.
const viewSwipeDominanceRatio = 1.8;
// Fraction of viewport width that commits the switch on release.
const viewSwipeCommitFraction = 0.22;
const viewSwipeMinimumCommitDistance = 56;
// iOS Safari claims edge drags for back/forward when not installed as a web app,
// so a swipe starting in this band would fight the browser and lose.
const viewSwipeEdgeGuard = 24;
const viewSwipeSettleMilliseconds = 180;
const nativeScrollDeltaThreshold = 1;
const nativeInputSentinel = '\u200b';
const nativeDeleteDeduplicationMilliseconds = 250;
const nativeDeleteRepeatDelayMilliseconds = 400;
const nativeDeleteRepeatIntervalMilliseconds = 75;
// Held Backspace escalates from characters to words, the way iOS does. The
// sequence is the one Alt+Backspace already sends here: ESC DEL, readline's
// backward-kill-word, which the tty also honours as WERASE.
const nativeDeleteWordSequence = '\u001b\u007f';
const nativeDeleteWordEscalationMilliseconds = 1200;
// Slower than the character cadence: a word is a bigger step, and each one is a
// round trip to tmux and back.
const nativeDeleteWordIntervalMilliseconds = 145;
// A pause longer than this starts a new run. Above any soft-keyboard auto-repeat
// interval, below the cadence of deliberate tapping.
const nativeDeleteRunGapMilliseconds = 400;
// Repeats in one run before it counts as held. Reached in well under a second at
// any repeat rate, and not reachable by tapping, since a tap gap breaks the run.
const nativeDeleteRunEscalateAfter = 5;
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
  f12: { label: 'F12', kind: 'sequence', sequence: '\u001b[24~' },
  // Only reachable through the contextual vim chip set, and deliberately absent
  // from builtinShortcutGroups: the picker offers keys, not editor commands.
  'vim-write': { label: ':w', kind: 'sequence', sequence: ':w\r' }
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
// The picker's contents. populateThemeSelect() calls replaceChildren(), so the
// <option> elements in index.html are discarded before they are ever seen — this map
// is the only thing that decides what a user can pick. Adding a theme without adding
// it here leaves it unreachable, which is exactly what happened once.
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
  gruvbox: 'Gruvbox Dark',
  pierrelight: 'Pierre Light',
  latte: 'Catppuccin Latte',
  rosepinedawn: 'Rosé Pine Dawn',
  gruvboxlight: 'Gruvbox Light'
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
  },
  // --- Light themes. All three palettes come from the Shiki themes T3 Code ships,
  // including its own house theme, so the ANSI colours are the authors' rather than
  // guesses at light equivalents. See THIRD_PARTY_NOTICES.md.
  //
  // Kept last so the picker reads dark-then-light.
  pierrelight: {
    // T3 Code's own. Crisp: near-black on white, one blue accent.
    background: '#ffffff',
    foreground: '#0a0a0a',
    cursor: '#009fff',
    cursorAccent: '#ffffff',
    selectionBackground: 'rgba(0, 159, 255, 0.24)',
    black: '#1d1d1d',
    red: '#d52c36',
    green: '#18a46c',
    yellow: '#d5a910',
    blue: '#1a85d4',
    magenta: '#bd2e90',
    cyan: '#1ca1c7',
    white: '#bcbcbc',
    brightBlack: '#5c5c5c',
    brightRed: '#d52c36',
    brightGreen: '#77a42a',
    brightYellow: '#b98f0d',
    brightBlue: '#1a85d4',
    brightMagenta: '#bd2e90',
    brightCyan: '#1ca1c7',
    brightWhite: '#8a8a8a'
  },
  latte: {
    // Catppuccin Latte. Softer: warm off-white, muted ink.
    background: '#eff1f5',
    foreground: '#4c4f69',
    cursor: '#dc8a78',
    cursorAccent: '#eff1f5',
    selectionBackground: 'rgba(124, 127, 147, 0.30)',
    black: '#5c5f77',
    red: '#d20f39',
    green: '#40a02b',
    yellow: '#df8e1d',
    blue: '#1e66f5',
    magenta: '#ea76cb',
    cyan: '#179299',
    white: '#acb0be',
    brightBlack: '#6c6f85',
    brightRed: '#de293e',
    brightGreen: '#49af3d',
    brightYellow: '#c78108',
    brightBlue: '#456eff',
    brightMagenta: '#d359b0',
    brightCyan: '#2d9fa8',
    brightWhite: '#8c91a1'
  },
  gruvboxlight: {
    // Gruvbox Light Medium. The warm end of the range: a genuinely cream page, and
    // the counterpart to Gruvbox Dark above.
    background: '#fbf1c7',
    foreground: '#3c3836',
    cursor: '#af3a03',
    cursorAccent: '#fbf1c7',
    selectionBackground: 'rgba(104, 157, 106, 0.30)',
    black: '#a89984',
    red: '#cc241d',
    green: '#798104',
    yellow: '#b57614',
    blue: '#458588',
    magenta: '#b16286',
    cyan: '#689d6a',
    white: '#7c6f64',
    brightBlack: '#7c6f64',
    brightRed: '#9d0006',
    brightGreen: '#79740e',
    brightYellow: '#8f6413',
    brightBlue: '#076678',
    brightMagenta: '#8f3f71',
    brightCyan: '#427b58',
    brightWhite: '#3c3836'
  },
  rosepinedawn: {
    // Rosé Pine Dawn. Warm rosy off-white — the counterpart to Rosé Pine Moon above.
    background: '#faf4ed',
    foreground: '#575279',
    cursor: '#d7827e',
    cursorAccent: '#faf4ed',
    selectionBackground: 'rgba(110, 106, 134, 0.24)',
    black: '#9893a5',
    red: '#b4637a',
    green: '#286983',
    yellow: '#a06a1c',
    blue: '#56949f',
    magenta: '#907aa9',
    cyan: '#b2635f',
    white: '#575279',
    brightBlack: '#797593',
    brightRed: '#9c4f65',
    brightGreen: '#215772',
    brightYellow: '#8a5a17',
    brightBlue: '#3f7c86',
    brightMagenta: '#7d6795',
    brightCyan: '#a05451',
    brightWhite: '#575279'
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
// Consecutive failures to establish a socket. Reset the moment one opens.
let reconnectAttempts = 0;
// The session a connect() is currently opening a socket for, so a concurrent connect
// for the same session does not open a second one.
let connectingSession = null;
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
// Gesture origin for the non-Apple terminal path, which tracked only Y.
// The long press blurs the terminal so the keyboard is out of the way while a
// selection is dragged. Nothing used to put it back, so copying or pasting from
// a long press closed the keyboard and left it closed.
let terminalFocusedBeforeSelection = false;
// Tracks the keyboard-open animation so the layout is frozen once, at the end.
let keyboardSettleState = null;
let genericTouchStartX = null;
let genericTouchStartY = null;
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
// The current run of soft-keyboard deletes, used to tell a held key from taps.
let nativeDeleteRunAt = null;
let nativeDeleteRunLength = 0;
let nativeDeleteWordSentAt = Number.NEGATIVE_INFINITY;
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
  renderKeybindingHints();
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
  if (quickMenuViewButton) {
    // Names the destination, not the current view: 'Browse files' while the
    // terminal is up, and back again from Files.
    quickMenuViewButton.textContent =
      viewMode === 'files' ? 'Show terminal' : 'Browse files';
  }
  describeMenuAction(quickMenuViewButton, true);
  describeMenuAction(
    quickMenuFindButton,
    live,
    live ? '' : 'connect a session first'
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
  // An explicit retry is a fresh start: without this the user waits out whatever
  // backoff the automatic attempts had reached, having just asked for it now.
  reconnectAttempts = 0;
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
  noteChipUsed('key', id);
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
    recordKeyboardTransition('find-close');
    releaseKeyboardLayoutLock();
  } else {
    recordKeyboardTransition('find-close-held');
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

// ---- Start of the pure footer rail block. ----
// Written free of DOM and browser globals so it can be sliced out of the shipped
// source for tests, the same way the keyboard transition block is.

// How many chips the rail builds before the measure pass hides what does not fit.
// The measure decides what is visible; this only bounds how much DOM is made.
const maximumFooterRailChips = 10;

/**
 * Chip sets by foreground command, keyed on tmux `pane_current_command`.
 *
 * The point of the rail is to be right most of the time without being curated.
 * Commands are matched as exact lowercase basenames — a prefix match would make
 * `nodemon` an agent and `vimdiff` an editor, and both are wrong often enough to
 * be worse than the fallback.
 */
const contextualChipSets = [
  {
    // Agent CLIs. `node` is here because Codex and most agent wrappers report it.
    commands: ['claude', 'codex', 'node', 'aider', 'grok'],
    ids: ['esc', 'shift-tab', 'ctrl-c', 'up']
  },
  {
    commands: ['vim', 'nvim', 'vi', 'view'],
    ids: ['esc', 'vim-write', 'ctrl-c', 'up']
  },
  {
    commands: ['bash', 'zsh', 'sh', 'fish', 'ksh', 'dash'],
    ids: ['tab', 'ctrl-r', 'ctrl-c', 'up']
  },
  {
    // Pagers: scrolling and quitting, not editing.
    commands: ['less', 'more', 'man', 'git'],
    ids: ['space', 'up', 'down', 'ctrl-c']
  }
];

/**
 * Last resort, used only when pins, context and recents together produce nothing
 * — a fresh profile watching an unrecognised command. An empty rail reads as
 * broken, and these four are useful under anything.
 */
const defaultRailChipIds = ['esc', 'tab', 'up', 'ctrl-c'];

/**
 * Chip ids for a foreground command, or [] when the command is unknown. Empty is
 * the honest answer: the caller falls back to pins and recents rather than
 * emptying the rail.
 */
function contextualChipIdsForCommand(command) {
  if (typeof command !== 'string' || command.length === 0) {
    return [];
  }
  const normalized = command.trim().toLowerCase();
  const set = contextualChipSets.find((entry) =>
    entry.commands.includes(normalized)
  );
  return set ? [...set.ids] : [];
}

/**
 * The rail, in order: pinned chips first, then the contextual set for whatever is
 * running, then most-recently-used. Pins keep their slots because they are listed
 * first and the measure pass hides from the end — so a contextual chip can never
 * push a pin off the rail.
 */
function orderFooterRailChips(options = {}) {
  const pins = options.pins || [];
  const contextual = options.contextual || [];
  const recent = options.recent || [];
  const isKnown = options.isKnown || (() => true);
  const limit = options.limit ?? maximumFooterRailChips;
  const seen = new Set();
  const chips = [];
  const push = (kind, id, source) => {
    const key = `${kind}:${id}`;
    if (seen.has(key) || chips.length >= limit || !isKnown(kind, id)) {
      return;
    }
    seen.add(key);
    chips.push({ kind, id, source, pinned: source === 'pin' });
  };
  for (const pin of pins) {
    push(pin.kind, pin.id, 'pin');
  }
  for (const id of contextual) {
    push('key', id, 'contextual');
  }
  for (const entry of recent) {
    push(entry.kind, entry.id, 'recent');
  }
  if (chips.length === 0) {
    for (const id of options.fallback || defaultRailChipIds) {
      push('key', id, 'default');
    }
  }
  return chips;
}

/**
 * Move a chip to the front of the recent list. Bounded, and it stores only the
 * kind and id of a chip the user already has — no terminal content.
 */
function recordChipUse(recent, kind, id, limit = maximumFooterRailChips) {
  const next = (recent || []).filter(
    (entry) => entry.kind !== kind || entry.id !== id
  );
  next.unshift({ kind, id });
  return next.slice(0, limit);
}
// ---- End of the pure footer rail block. ----

// Most-recently-used chips, newest first. Chip identities only — never terminal
// content — so this is ordinary preference data, not paste-buffer data.
let footerRecentChips = loadFooterRecentChips();

function loadFooterRecentChips() {
  if (qaShellMode) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(footerRecentChipsStorageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter(
        (entry) =>
          entry &&
          (entry.kind === 'key' || entry.kind === 'snip') &&
          typeof entry.id === 'string' &&
          entry.id.length > 0 &&
          entry.id.length <= 64
      )
      .slice(0, maximumFooterRailChips)
      .map((entry) => ({ kind: entry.kind, id: entry.id }));
  } catch {
    return [];
  }
}

function saveFooterRecentChips() {
  if (qaShellMode) {
    return;
  }
  try {
    window.localStorage.setItem(
      footerRecentChipsStorageKey,
      JSON.stringify(footerRecentChips)
    );
  } catch {
    // Continue without persistence.
  }
}

/**
 * Deliberately does not re-render. Rebuilding the rail on the tap that is being
 * handled would swap the DOM out from under the finger that pressed it; the new
 * order lands on the next natural rebuild (session, profile, or command change).
 */
function noteChipUsed(kind, id) {
  footerRecentChips = recordChipUse(footerRecentChips, kind, id);
  saveFooterRecentChips();
}

/** The foreground command of the active session, or null when unknown. */
function activeSessionCommand() {
  if (!activeSession) {
    return null;
  }
  const session = sessions.find((entry) => entry.name === activeSession);
  return typeof session?.command === 'string' ? session.command : null;
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
    mode === 'keys' || mode === 'snips' ? mode : null;
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
  if (footerDrawerElement) {
    footerDrawerElement.hidden = true;
    footerDrawerElement.replaceChildren();
  }
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

// What the rail was last built for, so a poll that changed nothing does not
// rebuild the DOM under the user's finger.
let footerRailCommand = null;

function renderFooterPins() {
  if (!footerPinsElement) {
    return;
  }
  const snippets = snippetsForProfile();
  footerRailCommand = activeSessionCommand();
  const chips = orderFooterRailChips({
    pins: loadFooterPins(),
    contextual: contextualChipIdsForCommand(footerRailCommand),
    recent: footerRecentChips,
    isKnown: (kind, id) =>
      kind === 'key'
        ? isKnownShortcutId(id)
        : snippets.some((entry) => entry.id === id)
  });
  footerPinsElement.replaceChildren();
  for (const chip of chips) {
    if (chip.kind === 'key') {
      const button = createKeyChipButton(chip.id, { pinned: chip.pinned });
      if (button) {
        button.dataset.chipSource = chip.source;
        footerPinsElement.append(button);
      }
      continue;
    }
    const snippet = snippets.find((entry) => entry.id === chip.id);
    if (!snippet) {
      continue;
    }
    const button = createSnipChipButton(snippet, { pinned: chip.pinned });
    if (button) {
      button.dataset.chipSource = chip.source;
      footerPinsElement.append(button);
    }
  }
}

/** Rebuild the rail only when the foreground command actually moved. */
function refreshFooterRailForCommand() {
  if (activeSessionCommand() === footerRailCommand) {
    return;
  }
  renderFooterPins();
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
  const allowed = new Set(['profiles', 'library', 'theme', 'app', 'debug']);
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
  // The Theme tab's only job is showing what a theme does to the terminal, so on
  // that tab the sheet drops to a bottom strip and stops blurring what is behind
  // it. Keyed off the sheet so the ::backdrop can be restyled too.
  settingsDialogElement?.classList.toggle('theme-preview', active === 'theme');
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
  if (active === 'debug') {
    renderKeyboardTransitionDump();
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
  noteChipUsed('snip', id);
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
  if (footerDrawer === 'keys' || footerDrawer === 'snips') {
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
    recordKeyboardTransition('selection-cleared');
    // terminalFocusedBeforeSelection means the keyboard was up before the long
    // press took it away and is about to be put back. Releasing here would run
    // clearLockedAppGeometry({force:true}), grow the layout to full height, and
    // then the returning keyboard would freeze it short again — the whole UI
    // drops and rises within a frame or two. Holding the frozen height across
    // the restore means nothing moves, because the keyboard returns to the same
    // height it left.
    if (!terminalInputIsFocused() && !terminalFocusedBeforeSelection) {
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

// ---- Start of the pure chip placement block. ----
// Written free of DOM and browser globals so it can be sliced out for tests.

/** Gap between the touch point and the chip. */
const terminalChipAnchorGap = 14;
const terminalChipMargin = 8;

/**
 * Where to put a chip of `size` anchored at `anchor`, kept inside `bounds`.
 *
 * The chip is centred on the anchor and sits above it, so clamping the anchor is
 * not enough: half the chip's width and all of its height live outside the
 * anchor point. This clamps the rendered box instead, and flips the chip below
 * the anchor when there is no room above — clamping upward would drop it on top
 * of the very text it is pointing at.
 */
function placeTerminalChip(anchor, size, bounds) {
  const margin = terminalChipMargin;
  const gap = terminalChipAnchorGap;
  const above = anchor.y - gap - size.height;
  const flip = above < bounds.top + margin;
  let top = flip ? anchor.y + gap : above;
  // A viewport too short for either placement: sit as high as it can.
  const maxTop = bounds.bottom - margin - size.height;
  top = Math.min(Math.max(top, bounds.top + margin), Math.max(bounds.top + margin, maxTop));
  let left = anchor.x - size.width / 2;
  const maxLeft = bounds.right - margin - size.width;
  left = Math.min(
    Math.max(left, bounds.left + margin),
    Math.max(bounds.left + margin, maxLeft)
  );
  return { left: Math.round(left), top: Math.round(top), flipped: flip };
}
// ---- End of the pure chip placement block. ----

/** The area a chip may occupy: the terminal surface, never the header or footer. */
function terminalChipBounds() {
  const main = mainViewElement();
  const rect = main?.getBoundingClientRect();
  if (!rect || rect.height <= 0) {
    return {
      top: 0,
      left: 0,
      right: window.innerWidth,
      bottom: window.innerHeight
    };
  }
  return {
    top: Math.max(0, rect.top),
    left: Math.max(0, rect.left),
    right: Math.min(window.innerWidth, rect.right),
    bottom: Math.min(window.innerHeight, rect.bottom)
  };
}

/** The Copy chip after a long press that selected something. */
function showSelectionCopyChip(clientX, clientY) {
  if (!selectionCopyChip) {
    return;
  }
  selectionCopyChip.textContent = 'Copy';
  selectionCopyChip.setAttribute('aria-label', 'Copy selection');
  // Measured, then positioned from the real box: see placeTerminalChip().
  selectionCopyChip.style.left = '0px';
  selectionCopyChip.style.top = '0px';
  selectionCopyChip.hidden = false;
  const placed = placeTerminalChip(
    {
      x: clientX || lastTouchClientX || window.innerWidth / 2,
      y: clientY || lastTouchClientY || window.innerHeight / 2
    },
    {
      width: selectionCopyChip.offsetWidth,
      height: selectionCopyChip.offsetHeight
    },
    terminalChipBounds()
  );
  selectionCopyChip.classList.toggle('chip-below', placed.flipped);
  selectionCopyChip.style.left = `${placed.left}px`;
  selectionCopyChip.style.top = `${placed.top}px`;
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

// ---- Keyboard transition ring buffer (T19) — start of the pure block. ----
// Keyboard geometry is derived from six interacting flags: keyboardLayoutLock,
// selectionViewportLock, keyboardDismissing, holdKeyboardLayoutForSelection,
// terminal.hasSelection() and terminalInputIsFocused(). Restoring the resting
// layout needs all six false at once. One flag left true holds the frozen
// keyboard height, and from the outside that is indistinguishable from a
// keyboard event the page never received.
//
// The failure is intermittent and only reproduces on a phone, so the capture
// ships before any fix. Nothing below the marker touches the DOM or a browser
// global, so test/keyboard-transitions.test.js slices this block out of the
// shipped bundle the way the keybinding and OSC 52 blocks are.

// A live session on a phone produced 579 transitions in six minutes, so 50 held
// only the last ~14 seconds — and the fault being chased happened in the first
// few. Keep a head segment permanently as well as the tail: the beginning of a
// session is where boot-time faults live, and it is exactly what a plain ring
// buffer throws away first.
// How long the reduced viewport must hold one height before the layout is frozen
// at it, and the deadline after which it is frozen regardless.
const keyboardSettleMilliseconds = 120;
const maximumKeyboardSettleWaitMilliseconds = 420;
const maximumKeyboardTransitions = 150;
const maximumKeyboardTransitionsHead = 30;

// Recorded on every entry, in the order the dump prints them.
const keyboardTransitionFlagNames = [
  'terminalFocused',
  'holdForSelection',
  'hasSelection',
  'selectionLock',
  'dismissing',
  'layoutLock',
  'keyboardReduced'
];

// Any one of these true keeps releaseKeyboardLayoutLock() and the release branch
// in updateVisualViewport() from restoring the resting layout. layoutLock is not
// here: it is the thing being released, not a reason to hold it.
const keyboardReleaseBlockerNames = [
  'terminalFocused',
  'holdForSelection',
  'hasSelection',
  'selectionLock',
  'dismissing',
  'keyboardReduced'
];

function keyboardReleaseBlockers(flags) {
  return keyboardReleaseBlockerNames.filter((name) => Boolean(flags?.[name]));
}

/**
 * Two answers for one viewport frame: is the soft keyboard open, and is this the
 * frame that should freeze the layout at the current height? Both require the
 * visual viewport to actually be reduced.
 *
 * Focus alone is not enough. iOS fires focus 80-300 ms before it raises the
 * keyboard, so gating on focus set `keyboard-open` and froze the *full* height
 * about 9 ms after focus. `html.keyboard-open` sets `--layout-safe-bottom` to 0,
 * so the home-indicator spacer disappeared for that window on every keyboard
 * open — T18, confirmed from an iPhone 18.7 dump.
 */
/**
 * Has the reduced viewport stopped moving?
 *
 * The keyboard animates in over roughly 300 ms, and keyboardViewportIsReduced()
 * turns true the moment it has covered 120 px — while it is still rising. Freezing
 * there captures a half-open height, fit() sets rows for it, and the 320 ms settle
 * timer then re-captures at the final height and fits again. Two resizes, and the
 * row-count difference between them is the jump: about three lines on a 390x844
 * phone.
 *
 * The wait is measured in milliseconds, not frames. A frame count cannot tell a
 * settled keyboard from the gap between two of its own animation steps — rAF runs
 * every ~16 ms and the resize events are tens of milliseconds apart, so a rising
 * keyboard holds the same height across consecutive frames and looks settled.
 *
 * While waiting, the layout simply stays where it was. That is what a native app
 * does: content does not reflow until the keyboard has arrived.
 */
function keyboardSettleStep(state, height, now) {
  const waitingSince = state ? state.waitingSince : now;
  // The deadline is checked on both paths on purpose. A viewport that changes
  // height on every single sample never takes the unchanged path, so checking the
  // deadline only there would leave it unfrozen forever — the stuck-layout state
  // this whole wait is supposed to avoid.
  const overdue = now - waitingSince >= maximumKeyboardSettleWaitMilliseconds;
  if (!state || state.height !== height) {
    if (overdue) {
      return { settled: true, state: null };
    }
    // Moved, or first sample of an open: restart the stability clock, keep the
    // deadline.
    return { settled: false, state: { height, stableSince: now, waitingSince } };
  }
  if (now - state.stableSince >= keyboardSettleMilliseconds || overdue) {
    return { settled: true, state: null };
  }
  return { settled: false, state };
}

function keyboardOpenDecision(flags) {
  const selectionLock = Boolean(flags?.selectionLock);
  const layoutLock = Boolean(flags?.layoutLock);
  const dismissing = Boolean(flags?.dismissing);
  const keyboardReduced = Boolean(flags?.keyboardReduced);
  // An existing lock keeps the class on while the viewport rubber-bands or the
  // keyboard animates away; only the reduction can turn it on in the first place.
  const open = Boolean(
    selectionLock || layoutLock || (!dismissing && keyboardReduced)
  );
  return {
    open,
    // Nothing frozen yet and the viewport really is short. A selection lock or an
    // existing layout lock already owns the height, so neither may re-capture.
    capture: Boolean(
      open && !selectionLock && !layoutLock && !dismissing && keyboardReduced
    )
  };
}

function keyboardFlagState(flags) {
  return keyboardTransitionFlagNames
    .map((name) => (flags?.[name] ? '1' : '0'))
    .join('');
}

function keyboardTransitionSignature(event, flags) {
  return `${event}|${keyboardFlagState(flags)}`;
}

function createKeyboardTransitionLog(
  limit = maximumKeyboardTransitions,
  headLimit = 0
) {
  // Entries split in two: `head` is never evicted, `tail` is the ring. A dump
  // prints head, then how many were dropped between, then tail.
  const head = [];
  const entries = [];
  let sequence = 0;
  let dropped = 0;
  const lastEntry = () =>
    entries.length > 0 ? entries[entries.length - 1] : head[head.length - 1];
  return {
    /**
     * Push a transition, or fold it into the previous entry when the event name
     * and all seven flags are unchanged.
     *
     * Folding is what makes a stuck state readable. A release declined 200 times
     * in a row becomes one line with a count, instead of 200 lines that push
     * every transition leading up to the stuck state out of the buffer.
     */
    record(event, flags, at = 0, extra = null, options = {}) {
      const signature = keyboardTransitionSignature(event, flags);
      const previous = lastEntry();
      if (previous && previous.signature === signature) {
        previous.count += 1;
        previous.lastAt = at;
        if (extra) {
          previous.extra = extra;
        }
        return previous;
      }
      // For events that only report that a decision was re-evaluated: if no flag
      // moved since the previous entry there is nothing to report, and recording
      // it costs a slot. Folding instead would inflate the previous entry's count
      // and claim that event happened twice.
      if (
        options.skipIfFlagsUnchanged &&
        previous &&
        previous.signature.endsWith(`|${keyboardFlagState(flags)}`)
      ) {
        return null;
      }
      sequence += 1;
      const entry = {
        sequence,
        event,
        at,
        lastAt: at,
        count: 1,
        signature,
        flags: { ...flags },
        blockedBy: keyboardReleaseBlockers(flags),
        extra: extra || null
      };
      if (head.length < headLimit) {
        head.push(entry);
        return entry;
      }
      entries.push(entry);
      if (entries.length > limit) {
        dropped += entries.length - limit;
        entries.splice(0, entries.length - limit);
      }
      return entry;
    },
    entries() {
      return [...head, ...entries];
    },
    headCount() {
      return head.length;
    },
    dropped() {
      return dropped;
    },
    clear() {
      head.length = 0;
      entries.length = 0;
      dropped = 0;
      sequence = 0;
    }
  };
}

function formatKeyboardTransitionFlags(flags) {
  const lockHeight = flags?.layoutLockHeight;
  const selectionLockHeight = flags?.selectionLockHeight;
  return [
    `focus=${flags?.terminalFocused ? 'y' : 'n'}`,
    `hold=${flags?.holdForSelection ? 'y' : 'n'}`,
    `sel=${flags?.hasSelection ? 'y' : 'n'}`,
    `selLock=${flags?.selectionLock ? selectionLockHeight ?? 'y' : 'n'}`,
    `dis=${flags?.dismissing ? 'y' : 'n'}`,
    `lock=${flags?.layoutLock ? lockHeight ?? 'y' : 'n'}`,
    `reduced=${flags?.keyboardReduced ? 'y' : 'n'}`,
    `open=${flags?.keyboardOpenClass ? 'y' : 'n'}`,
    `vv=${flags?.viewportHeight ?? '?'}`,
    `lay=${flags?.layoutHeight ?? '?'}`
  ].join(' ');
}

function formatKeyboardTransitions(entries, options = {}) {
  const dropped = options.dropped || 0;
  // Entries before this index are the retained head; the drop happened after it.
  const headCount = options.headCount || 0;
  const lines = [];
  if (entries.length === 0) {
    if (dropped > 0) {
      lines.push(`... ${dropped} earlier transition(s) dropped`);
    }
    lines.push('(no keyboard transitions recorded)');
    return lines.join('\n');
  }
  if (dropped > 0 && headCount === 0) {
    lines.push(`... ${dropped} earlier transition(s) dropped`);
  }
  entries.forEach((entry, index) => {
    if (dropped > 0 && headCount > 0 && index === headCount) {
      lines.push(`... ${dropped} transition(s) dropped here`);
    }
    const repeat = entry.count > 1 ? ` x${entry.count}` : '';
    const span =
      entry.count > 1 && entry.lastAt !== entry.at
        ? `..+${entry.lastAt}ms`
        : '';
    const blocked =
      entry.blockedBy.length > 0 ? entry.blockedBy.join(',') : '-';
    const extra = entry.extra
      ? ` ${Object.entries(entry.extra)
          .map(([key, value]) => `${key}=${value}`)
          .join(' ')}`
      : '';
    lines.push(
      `#${entry.sequence} +${entry.at}ms${span} ${entry.event}${repeat}` +
        ` blockedBy=${blocked} ${formatKeyboardTransitionFlags(entry.flags)}${extra}`
    );
  });
  return lines.join('\n');
}
// ---- End of the pure keyboard transition block. ----

const keyboardTransitionLog = createKeyboardTransitionLog(
  maximumKeyboardTransitions,
  maximumKeyboardTransitionsHead
);

/**
 * Read the six flags plus the geometry needed to tell a real keyboard close from
 * a stuck lock. keyboardViewportIsReduced() reads clientHeight, so this is a
 * layout read — every caller already sits on a path that reflows.
 */
function keyboardTransitionFlags() {
  const root = document.documentElement;
  const viewport = window.visualViewport;
  return {
    terminalFocused: terminalInputIsFocused(),
    holdForSelection: holdKeyboardLayoutForSelection,
    hasSelection: Boolean(terminal?.hasSelection?.()),
    selectionLock: Boolean(selectionViewportLock),
    selectionLockHeight: selectionViewportLock?.height ?? null,
    dismissing: keyboardDismissing,
    layoutLock: Boolean(keyboardLayoutLock),
    layoutLockHeight: keyboardLayoutLock?.height ?? null,
    keyboardReduced: keyboardViewportIsReduced(),
    keyboardOpenClass: root.classList.contains('keyboard-open'),
    viewportHeight: Math.round(viewport?.height || window.innerHeight || 0),
    layoutHeight: Math.round(root.clientHeight || window.innerHeight || 0)
  };
}

function recordKeyboardTransition(event, extra = null, options = {}) {
  try {
    const at = Math.round(window.performance?.now?.() || 0);
    const entry = keyboardTransitionLog.record(
      event,
      keyboardTransitionFlags(),
      at,
      extra,
      options
    );
    // Only the first of a folded run reaches clientDebug. The repeats are what
    // the ring buffer exists to bound, and shipping each one defeats that.
    if (entry && entry.count === 1) {
      clientDebug('keyboard-transition', {
        event: entry.event,
        blockedBy: entry.blockedBy.join(',') || '-',
        ...entry.flags,
        ...(extra || {})
      });
    }
  } catch {
    // Diagnostics must never break the keyboard path.
  }
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

/**
 * Is there a selection with something worth copying in it?
 *
 * terminal.hasSelection() is true for a whitespace-only range, so a long press
 * on blank rows below the prompt reports a selection that Copy would turn into
 * an empty string. This asks the question the gesture actually needs, using the
 * same extraction the copy path uses so the answer matches what Copy would do.
 *
 * Deliberately not folded into terminalHasCopyableSelection(): that one runs on
 * every updateClipboardButton() call, and this walks the buffer.
 */
function terminalSelectionHasText() {
  if (!terminal?.hasSelection()) {
    return false;
  }
  return readTerminalSelectionText().trim().length > 0;
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
    recordKeyboardTransition('selection-long-press-hold');
  }
  if (terminalInputIsFocused()) {
    // Recorded before the blur, and consumed once the gesture resolves into a
    // copy or a paste. Only a keyboard that was up gets put back — this must not
    // open one the user never had.
    terminalFocusedBeforeSelection = true;
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
  // The key is up, so the next delete starts a fresh run rather than inheriting
  // this one and escalating immediately.
  nativeDeleteRunAt = null;
  nativeDeleteRunLength = 0;
  nativeDeleteWordSentAt = Number.NEGATIVE_INFINITY;
  clearTimeout(nativeDeleteRepeatDelayTimer);
  // A timeout now, not an interval: the repeat reschedules itself so the cadence
  // can change when it escalates to words.
  clearTimeout(nativeDeleteRepeatIntervalTimer);
  nativeDeleteRepeatDelayTimer = null;
  nativeDeleteRepeatIntervalTimer = null;
}

// ---- Start of the pure delete repeat block. ----

/**
 * What a held Backspace should send next, and how long to wait after it.
 *
 * A terminal deletes one character per keystroke and each one is a round trip to
 * tmux, so holding the key to clear a long path is slow in a way the native
 * keyboard is not — iOS escalates to whole words after about a second. This does
 * the same, switching to ESC DEL, which is readline's backward-kill-word and what
 * Alt+Backspace already sends here.
 *
 * Only a plain Backspace escalates. Alt or Ctrl held means the user already chose
 * a deletion mode, and changing it under them would be wrong.
 */
function nativeDeleteRepeatStep(baseSequence, heldForMilliseconds) {
  const escalates =
    baseSequence === '\u007f' &&
    heldForMilliseconds >= nativeDeleteWordEscalationMilliseconds;
  return {
    sequence: escalates ? nativeDeleteWordSequence : baseSequence,
    delay: escalates
      ? nativeDeleteWordIntervalMilliseconds
      : nativeDeleteRepeatIntervalMilliseconds,
    wordMode: escalates
  };
}
/**
 * How far into a run of deletes are we, and is it long enough to be a held key?
 *
 * The soft keyboard gives nothing to hold onto — no keydown, no keyup we can
 * rely on — so a run is inferred from the gaps. Anything arriving within
 * nativeDeleteRunGapMilliseconds of the previous delete continues the run;
 * a longer pause starts a new one.
 *
 * This counts deletes rather than measuring their rate. The rate version assumed
 * iOS repeats at about 100ms and never escalated on Safari, where the observed
 * repeat is slower — a threshold tuned to a guessed interval fails silently the
 * moment the interval differs. A count works whatever the rate: five repeats in
 * a row is a hold at any speed, and hand-tapping does not reach five before a gap
 * breaks the run.
 */
function nativeDeleteRunStep(previousAt, runLength, now) {
  const continues =
    previousAt !== null && now - previousAt <= nativeDeleteRunGapMilliseconds;
  const run = continues ? runLength + 1 : 1;
  return { run, wordMode: run > nativeDeleteRunEscalateAfter };
}

// ---- End of the pure delete repeat block. ----

function startNativeDeleteRepeat(deleteSequence) {
  stopNativeDeleteRepeat();
  const heldSince = window.performance.now();
  // A rescheduling timeout rather than setInterval, because the cadence changes
  // when the repeat escalates from characters to words.
  const tick = () => {
    const step = nativeDeleteRepeatStep(
      deleteSequence,
      window.performance.now() - heldSince
    );
    nativeDeleteKeyDownAt = window.performance.now();
    sendInput(step.sequence);
    scheduleNativeTerminalInputPrime();
    nativeDeleteRepeatIntervalTimer = window.setTimeout(tick, step.delay);
  };
  nativeDeleteRepeatDelayTimer = setTimeout(() => {
    nativeDeleteRepeatDelayTimer = null;
    tick();
  }, nativeDeleteRepeatDelayMilliseconds);
}

/**
 * Browser chords we never claim from a document-level bridge
 * (reload, new tab, close tab, address bar, print, quit, devtools).
 * When the xterm textarea is focused, xterm still owns shell Ctrl chords.
 */
// Command palette.
//
// Keyboard-only and desktop-only, and deliberately unreachable while the terminal
// has focus: `Ctrl+K` is readline's kill-line, and the terminal is the product, so
// the shell keeps it.
//
// That leaves the palette for the times focus is on header or footer chrome, or
// there is no session. Note it is *not* reachable once focus moves inside the Files
// panel, because that counts as uiCapture and Files owns its own keyboard contract.
// It adds no persistent control, so it costs nothing when unused. Discoverability
// improves once T7 puts chord hints beside the actions themselves.
//
// The filter is a pure function so it can be sliced out and tested.
// Everything to the end-of-block marker is free of DOM and browser globals.
function normalizePaletteQuery(query) {
  return String(query ?? '')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Every term has to appear somewhere in the label or its keywords. Terms are
 * matched independently, so "files hidden" finds "Show hidden files" regardless of
 * word order, and a stray space never empties the list.
 */
function paletteCommandMatches(command, terms) {
  if (terms.length === 0) {
    return true;
  }
  const haystack = `${command.label} ${command.keywords || ''}`.toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

function filterPaletteCommands(commands, query) {
  const terms = normalizePaletteQuery(query);
  return commands.filter(
    (command) =>
      (typeof command.available !== 'function' || command.available()) &&
      paletteCommandMatches(command, terms)
  );
}

// Wrap so ArrowUp from the first entry lands on the last: the list is short and a
// dead end at either edge is worse than wrapping.
function nextPaletteIndex(index, count, delta) {
  if (count <= 0) {
    return -1;
  }
  return (((index + delta) % count) + count) % count;
}
// End of the pure palette block.

// The palette dispatches existing actions; it never owns behaviour of its own.
// `available` keeps an action that cannot work right now out of the list entirely,
// rather than offering it and failing.
function commandPaletteCommands() {
  const hasSession = Boolean(activeSession);
  const commands = [
    {
      id: 'view.terminal',
      label: 'Show Terminal',
      keywords: 'term view switch',
      available: () => viewMode !== 'term',
      run: () => setViewMode('term')
    },
    {
      id: 'view.files',
      label: 'Show Files',
      keywords: 'browser folder view switch',
      available: () => viewMode !== 'files',
      run: () => setViewMode('files')
    },
    {
      id: 'find.open',
      label: 'Find in scrollback',
      keywords: 'search grep',
      available: () => hasSession,
      run: () => openFindBar()
    },
    {
      id: 'session.new',
      label: 'New session',
      keywords: 'create tmux',
      run: () => void createSession()
    },
    {
      id: 'session.picker',
      label: 'Switch session…',
      keywords: 'sessions list picker',
      run: () => {
        setHeaderCollapsed(false);
        refreshSessions(false, true);
      }
    },
    {
      id: 'session.rename',
      label: 'Rename session',
      keywords: 'title name',
      available: () => hasSession,
      run: () => void renameSession(activeSession)
    },
    {
      id: 'session.reconnect',
      label: 'Reconnect session',
      keywords: 'retry transport socket',
      available: () => hasSession,
      run: () => forceReconnectActiveSession()
    },
    {
      id: 'menu.open',
      label: 'Open Menu',
      keywords: 'sheet profile actions',
      available: () => hasSession,
      run: () => openQuickMenu()
    },
    {
      id: 'settings.open',
      label: 'Open Settings',
      keywords: 'preferences theme profiles library',
      run: () => openSettingsDialog()
    }
  ];
  // One entry per other session, so switching is a single action rather than
  // opening the picker and then choosing.
  for (const session of sessions) {
    if (session.name === activeSession) {
      continue;
    }
    commands.push({
      id: `session.connect:${session.name}`,
      label: `Connect to ${session.name}`,
      keywords: 'session switch attach',
      run: () => void connect(session.name)
    });
  }
  return commands;
}

let commandPaletteVisible = [];
let commandPaletteIndex = -1;
let commandPaletteReturnFocus = null;

function isCommandPaletteOpen() {
  return Boolean(commandPaletteDialog?.open);
}

function renderCommandPalette() {
  if (!commandPaletteList) {
    return;
  }
  commandPaletteVisible = filterPaletteCommands(
    commandPaletteCommands(),
    commandPaletteInput?.value
  );
  if (commandPaletteVisible.length === 0) {
    commandPaletteIndex = -1;
  } else if (commandPaletteIndex < 0 || commandPaletteIndex >= commandPaletteVisible.length) {
    commandPaletteIndex = 0;
  }
  commandPaletteList.replaceChildren();
  commandPaletteVisible.forEach((command, index) => {
    const item = document.createElement('li');
    item.id = `command-palette-option-${index}`;
    item.className = 'command-palette-option';
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', String(index === commandPaletteIndex));
    item.textContent = command.label;
    // Pointer selection mirrors keyboard selection so both agree on what Enter
    // would run.
    item.addEventListener('pointermove', () => {
      if (commandPaletteIndex !== index) {
        commandPaletteIndex = index;
        syncCommandPaletteSelection();
      }
    });
    item.addEventListener('click', () => runCommandPaletteSelection(index));
    commandPaletteList.append(item);
  });
  if (commandPaletteEmpty) {
    commandPaletteEmpty.hidden = commandPaletteVisible.length > 0;
  }
  commandPaletteInput?.setAttribute(
    'aria-expanded',
    String(commandPaletteVisible.length > 0)
  );
  syncCommandPaletteSelection();
}

function syncCommandPaletteSelection() {
  if (!commandPaletteList) {
    return;
  }
  const options = [...commandPaletteList.children];
  options.forEach((option, index) => {
    option.setAttribute('aria-selected', String(index === commandPaletteIndex));
  });
  const active = options[commandPaletteIndex];
  if (active) {
    // The input keeps DOM focus so typing continues to filter; the listbox
    // selection is announced through aria-activedescendant instead.
    commandPaletteInput?.setAttribute('aria-activedescendant', active.id);
    active.scrollIntoView({ block: 'nearest' });
  } else {
    commandPaletteInput?.removeAttribute('aria-activedescendant');
  }
}

function moveCommandPaletteSelection(delta) {
  commandPaletteIndex = nextPaletteIndex(
    commandPaletteIndex,
    commandPaletteVisible.length,
    delta
  );
  syncCommandPaletteSelection();
}

function runCommandPaletteSelection(index = commandPaletteIndex) {
  const command = commandPaletteVisible[index];
  if (!command) {
    return;
  }
  // Close first: several of these open another surface, and two transient
  // surfaces at once is exactly what the design principles forbid.
  closeCommandPalette({ restoreFocus: false });
  command.run();
}

function openCommandPalette() {
  if (!commandPaletteDialog || isCommandPaletteOpen()) {
    return;
  }
  // One transient surface at a time — but only where the picker is genuinely
  // transient. With no session the expanded bar is the resting state the empty view
  // points at, and nothing here re-expands it on close, so collapsing it would
  // strand the user. Same qualifier the Escape binding uses.
  closeFooterDrawer();
  if (activeSession) {
    setHeaderCollapsed(true);
  }
  commandPaletteReturnFocus =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  if (commandPaletteInput) {
    commandPaletteInput.value = '';
  }
  commandPaletteIndex = 0;
  renderCommandPalette();
  commandPaletteDialog.showModal();
  commandPaletteInput?.focus({ preventScroll: true });
}

function closeCommandPalette(options = {}) {
  if (!commandPaletteDialog?.open) {
    return;
  }
  if (options.restoreFocus === false) {
    // The command about to run owns focus from here — several of them open another
    // surface, and returning focus to the invoker first would fight that.
    commandPaletteReturnFocus = null;
  }
  // State reset and focus restoration live in the dialog's `close` listener, so
  // Escape and the backdrop take the same path as this call.
  commandPaletteDialog.close();
}

// Keybindings: one table, resolved against focus context.
//
// Everything from here to the end-of-block marker is free of DOM and browser
// globals so `test/` can slice it out and assert on it, the same way the
// terminal-link and OSC 52 blocks are tested.
//
// This replaces per-chord `if` blocks scattered across three call sites. Ctrl/Cmd+F
// alone lived in the xterm handler, in a document listener, and as a "skip here"
// branch in the hardware bridge that existed only to stop the three from fighting.
// A chord's meaning belongs in one place, keyed by what currently has focus.
//
// "Keybinding" deliberately, not "shortcut": a Shortcut here is already a Keys
// drawer chip that sends a sequence to the pty, which is a different thing.
function platformIsApple() {
  const platform =
    navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || '';
  return /mac|iphone|ipad|ipod/i.test(platform);
}

const keybindingKeyAliases = { esc: 'escape', ' ': 'space', spacebar: 'space' };
// Punctuation reported by `code`, so a binding matches regardless of layout.
const keybindingCodeAliases = {
  BracketLeft: '[',
  BracketRight: ']',
  Comma: ',',
  Period: '.',
  Slash: '/',
  Backslash: '\\',
  Semicolon: ';',
  Quote: "'",
  Minus: '-',
  Equal: '=',
  Backquote: '`'
};

function normalizeKeybindingKey(value) {
  const lower = String(value ?? '').toLowerCase();
  return keybindingKeyAliases[lower] ?? lower;
}

function parseKeybinding(binding, isApple = false) {
  const spec = {
    key: '',
    ctrl: false,
    meta: false,
    shift: false,
    alt: false
  };
  for (const raw of String(binding).toLowerCase().split('+')) {
    const part = raw.trim();
    if (!part) {
      continue;
    }
    if (part === 'mod') {
      spec[isApple ? 'meta' : 'ctrl'] = true;
    } else if (part === 'ctrl' || part === 'control') {
      spec.ctrl = true;
    } else if (part === 'meta' || part === 'cmd') {
      spec.meta = true;
    } else if (part === 'shift') {
      spec.shift = true;
    } else if (part === 'alt' || part === 'option') {
      spec.alt = true;
    } else {
      spec.key = normalizeKeybindingKey(part);
    }
  }
  return spec;
}

// `key` alone is layout-dependent: on a Cyrillic or Dvorak layout the physical F
// reports something else entirely. `code` covers that, and its aliases cover
// punctuation.
// Anything a binding could name. The pressed label wins over the physical key
// whenever it is one of these.
const keybindingNameableKeys = new Set(Object.values(keybindingCodeAliases));

function isNameableKeybindingKey(value) {
  return /^[a-z0-9]$/.test(value) || keybindingNameableKeys.has(value);
}

function keybindingEventKeys(event) {
  const primary = normalizeKeybindingKey(event.key);
  const keys = new Set([primary]);
  // The `code` fallback must not apply in either direction, or a remapped layout loses chords the
  // shell needs. On Dvorak physical KeyF types `u`, so falling back to the code let
  // `mod+f` claim Ctrl+U and steal kill-line. The mirror case is just as real:
  // physical Semicolon types `s` there, so an unconditional alias lookup would let
  // `mod+;` claim Ctrl+S — XOFF, a C0 control.
  if (isNameableKeybindingKey(primary)) {
    return keys;
  }
  // Reached only for a label no binding could name — Cyrillic, Greek, Arabic —
  // where every letter binding would otherwise be unreachable.
  const code = typeof event.code === 'string' ? event.code : '';
  const letter = /^Key([A-Z])$/.exec(code);
  if (letter) {
    keys.add(letter[1].toLowerCase());
  }
  const digit = /^Digit(\d)$/.exec(code);
  if (digit) {
    keys.add(digit[1]);
  }
  const alias = keybindingCodeAliases[code];
  if (alias) {
    keys.add(alias);
  }
  return keys;
}

// Modifiers match exactly, so a binding for `mod+f` does not also swallow
// `Ctrl+Shift+F`. `mod` is resolved once while compiling: Cmd on Apple and Ctrl
// elsewhere.
function keybindingMatchesEvent(spec, event) {
  if (!spec.key || !keybindingEventKeys(event).has(spec.key)) {
    return false;
  }
  if (spec.ctrl !== Boolean(event.ctrlKey)) {
    return false;
  }
  if (spec.meta !== Boolean(event.metaKey)) {
    return false;
  }
  return (
    spec.shift === Boolean(event.shiftKey) && spec.alt === Boolean(event.altKey)
  );
}

// `when` supports a bare context name, `!name`, and `&&` between them. That is
// all the bindings need; anything richer would be a parser to maintain for no
// current caller. An unknown name evaluates false rather than passing silently,
// so a typo disables its binding instead of firing it everywhere — and a test
// asserts every name in the table exists.
function evaluateKeybindingWhen(when, context) {
  if (!when) {
    return true;
  }
  return String(when)
    .split('&&')
    .every((clause) => {
      const trimmed = clause.trim();
      const negated = trimmed.startsWith('!');
      const name = (negated ? trimmed.slice(1) : trimmed).trim();
      if (!name || !Object.hasOwn(context, name)) {
        return false;
      }
      return negated ? !context[name] : Boolean(context[name]);
    });
}

/**
 * `context` may be a value or a thunk. As a thunk it is built at most once, and
 * only after some binding's key already matched — this runs on every keystroke
 * in the terminal, and the context costs several DOM traversals plus a selection
 * read.
 */
function resolveKeybinding(bindings, event, context) {
  const provider = typeof context === 'function' ? context : () => context;
  let resolved;
  let built = false;
  for (const binding of bindings) {
    if (!keybindingMatchesEvent(binding.spec, event)) {
      continue;
    }
    if (!built) {
      resolved = provider();
      built = true;
    }
    if (!evaluateKeybindingWhen(binding.when, resolved)) {
      continue;
    }
    return binding;
  }
  return null;
}

function compileKeybindings(table, isApple = false) {
  return table.map((binding) => ({
    ...binding,
    spec: parseKeybinding(binding.key, isApple)
  }));
}

// Render a chord for display. Apple gets the glyphs its users expect; everything
// else spells the modifiers out.
const keybindingDisplayOrder = ['ctrl', 'alt', 'shift', 'meta'];
const keybindingDisplayNames = {
  arrowleft: '←',
  arrowright: '→',
  arrowup: '↑',
  arrowdown: '↓',
  escape: 'Esc',
  backspace: '⌫',
  insert: 'Ins',
  space: 'Space'
};

function keybindingModifierLabel(modifier, isApple) {
  if (isApple) {
    return { ctrl: '⌃', alt: '⌥', shift: '⇧', meta: '⌘' }[modifier];
  }
  return { ctrl: 'Ctrl', alt: 'Alt', shift: 'Shift', meta: 'Meta' }[modifier];
}

function keybindingKeyLabel(key) {
  if (Object.hasOwn(keybindingDisplayNames, key)) {
    return keybindingDisplayNames[key];
  }
  return key.length === 1 ? key.toUpperCase() : key;
}

/**
 * The parts of a chord, in a stable order. Returned as an array so a caller can
 * render each part as its own <kbd> rather than parsing a joined string.
 */
function keybindingLabelParts(spec, isApple = false) {
  const parts = [];
  for (const modifier of keybindingDisplayOrder) {
    if (spec[modifier]) {
      parts.push(keybindingModifierLabel(modifier, isApple));
    }
  }
  parts.push(keybindingKeyLabel(spec.key));
  return parts;
}

/**
 * The chord bound to a command, or null when nothing is. Derived from the compiled
 * table, so a hint cannot describe a binding that no longer exists.
 */
function keybindingLabelForCommand(bindings, command, isApple = false) {
  const binding = bindings.find((entry) => entry.command === command);
  return binding ? keybindingLabelParts(binding.spec, isApple) : null;
}
// End of the pure keybinding block.

// Order matters: the first match wins, so Escape closes Find before the session
// picker, which is the precedence these chords already had.
const keybindingTable = compileKeybindings([
  { key: 'mod+f', command: 'find.open', when: '!uiCapture' },
  // Ctrl+K is readline's kill-line, so this is available only while focus is
  // outside the terminal. finePointer gates it by capability: the palette is a
  // keyboard surface and has no place on a touch-only device.
  {
    key: 'mod+k',
    command: 'palette.open',
    when: '!terminalFocus && !uiCapture && finePointer'
  },
  {
    key: 'mod+c',
    command: 'terminal.copySelection',
    when: 'terminalFocus && terminalSelection'
  },
  { key: 'mod+v', command: 'terminal.paste', when: 'terminalFocus' },
  // The conventional copy/paste chords in Linux terminals. They worked before this
  // table because the old handler compared `event.key` case-insensitively, and
  // `Shift` makes it 'C'. xterm emits nothing for ctrl+shift+letter, so without
  // these the chords are silently dead rather than falling through.
  //
  // Literally `ctrl`, not `mod`: this pair is not platform-relative. `mod` would
  // make it Cmd+Shift+C on Apple, which is Chrome's inspect-element rather than a
  // terminal convention, and would stop the named chord working there at all.
  {
    key: 'ctrl+shift+c',
    command: 'terminal.copySelection',
    when: 'terminalFocus && terminalSelection'
  },
  { key: 'ctrl+shift+v', command: 'terminal.paste', when: 'terminalFocus' },
  { key: 'shift+insert', command: 'clipboard.paste', when: 'terminalFocus' },
  // Native text-editing chords translated to the escape sequences readline
  // actually binds. xterm sends `\e[1;3D` for Alt+Left, which bash does not bind
  // by default, so word movement silently did nothing before this.
  //
  // Alt+Arrow is browser-back on Windows/Linux and Cmd+Arrow is browser-back on
  // macOS. Claiming both is deliberate: navigating away from a live terminal by
  // accident costs far more than the gesture is worth here.
  { key: 'alt+arrowleft', command: 'terminal.wordLeft', when: 'terminalFocus' },
  { key: 'alt+arrowright', command: 'terminal.wordRight', when: 'terminalFocus' },
  {
    key: 'alt+backspace',
    command: 'terminal.deleteWordLeft',
    when: 'terminalFocus'
  },
  // Apple only: Cmd+Arrow means line start/end there, while on Windows/Linux the
  // same chord belongs to the browser and no shell convention claims it.
  {
    key: 'meta+arrowleft',
    command: 'terminal.lineStart',
    when: 'terminalFocus && applePlatform'
  },
  {
    key: 'meta+arrowright',
    command: 'terminal.lineEnd',
    when: 'terminalFocus && applePlatform'
  },
  {
    key: 'meta+backspace',
    command: 'terminal.deleteToLineStart',
    when: 'terminalFocus && applePlatform'
  },
  // The find input owns its Escape key at the target phase. Keep this binding
  // for terminal/chrome focus without also closing the bar from document
  // capture before the input's existing handler runs.
  { key: 'escape', command: 'find.close', when: 'findOpen && !uiCapture' },
  {
    // terminalOpen and !filesView came from the bridge branch this replaced.
    // Without a session the expanded bar is the resting state the empty view
    // points at, so Escape leaves it alone — the same rule the pointer gesture
    // follows.
    key: 'escape',
    command: 'picker.close',
    when:
      'pickerOpen && terminalOpen && !filesView && !terminalFocus && !uiCapture'
  }
], platformIsApple());

// What each command is called in the shortcuts reference. Every command needs one, or
// it appears in the table and nowhere a user can read it.
const keybindingCommandLabels = {
  'find.open': 'Find in scrollback',
  'find.close': 'Close find',
  'palette.open': 'Commands',
  'picker.close': 'Close session picker',
  'terminal.copySelection': 'Copy selection',
  'terminal.paste': 'Paste',
  'clipboard.paste': 'Paste',
  'terminal.wordLeft': 'Move back one word',
  'terminal.wordRight': 'Move forward one word',
  'terminal.deleteWordLeft': 'Delete previous word',
  'terminal.lineStart': 'Jump to line start',
  'terminal.lineEnd': 'Jump to line end',
  'terminal.deleteToLineStart': 'Delete to line start'
};

const keybindingCommands = {
  'find.open': { run: () => openFindBar() },
  'palette.open': { run: () => openCommandPalette() },
  'find.close': { run: () => closeFindBar() },
  'picker.close': { run: () => setHeaderCollapsed(true), stopPropagation: true },
  'terminal.copySelection': {
    run: () => void copyTerminalSelection({ source: 'keyboard' })
  },
  // Deliberately does not preventDefault: the browser's own paste has to run so
  // handleTerminalPasteEvent receives clipboardData, which carries images without
  // a permission prompt. Returning false to xterm is what stops the pty seeing ^V.
  'terminal.paste': { run: () => expectNativePasteEvent(), preventDefault: false },
  'clipboard.paste': { run: () => void pasteClipboard() },
  // Readline's own bindings, not the terminal's modified-arrow sequences.
  'terminal.wordLeft': { run: () => sendTerminalSequence('\u001bb') },
  'terminal.wordRight': { run: () => sendTerminalSequence('\u001bf') },
  'terminal.deleteWordLeft': { run: () => sendTerminalSequence('\u001b\u007f') },
  'terminal.lineStart': { run: () => sendTerminalSequence('\u0001') },
  'terminal.lineEnd': { run: () => sendTerminalSequence('\u0005') },
  'terminal.deleteToLineStart': { run: () => sendTerminalSequence('\u0015') }
};

// Deliver a literal sequence to the pty and keep the mobile input primer in step,
// the same pair the native Backspace path uses.
function sendTerminalSequence(sequence) {
  sendInput(sequence);
  scheduleNativeTerminalInputPrime();
}

/**
 * Put the chord for `command` beside a control, as <kbd> parts.
 *
 * Only where a hardware keyboard is plausible: a hint is noise on a touch-only
 * device, and principle 9 asks for short labels over unexplained decoration. The
 * hint is not a tab stop and never a tap target.
 */
function renderKeybindingHint(element, command) {
  if (!element) {
    return;
  }
  element.querySelector('.kbd-hint')?.remove();
  if (!window.matchMedia?.('(pointer: fine)').matches) {
    return;
  }
  const parts = keybindingLabelForCommand(
    keybindingTable,
    command,
    platformIsApple()
  );
  if (!parts) {
    return;
  }
  const hint = document.createElement('span');
  hint.className = 'kbd-hint';
  // Hidden from assistive tech: the control already has an accessible name, and
  // spelling the glyphs out adds noise rather than information.
  hint.setAttribute('aria-hidden', 'true');
  for (const part of parts) {
    const key = document.createElement('kbd');
    key.textContent = part;
    hint.append(key);
  }
  element.append(hint);
}

/**
 * Where a binding applies, in words.
 *
 * Worth stating: `Ctrl+K` opening the palette only outside the terminal is otherwise
 * a mystery, and the readline chords only inside it. Anything else is unqualified
 * rather than guessed at.
 */
function keybindingScopeLabel(when) {
  if (!when) {
    return '';
  }
  if (when.includes('!terminalFocus')) {
    return 'outside the terminal';
  }
  if (when.includes('terminalFocus')) {
    return 'in the terminal';
  }
  return '';
}

/**
 * One row per command, with every chord bound to it.
 *
 * Derived from the compiled table so it cannot drift, and grouped by command because
 * two chords for one action — Ctrl+C and Ctrl+Shift+C both copy — read as duplicates
 * otherwise. Apple-only bindings are dropped off Apple and vice versa, since a chord
 * that cannot fire is worse than absent.
 */
function keybindingReferenceRows(bindings, isApple = platformIsApple()) {
  const rows = new Map();
  for (const binding of bindings) {
    const label = keybindingCommandLabels[binding.command];
    if (!label) {
      continue;
    }
    if (binding.when?.includes('applePlatform') && !isApple) {
      continue;
    }
    const chord = keybindingLabelParts(binding.spec, isApple).join(' ');
    const scope = keybindingScopeLabel(binding.when);
    // Keyed by what the reader sees, not by command id: Ctrl+V and Shift+Insert are
    // separate commands that both mean Paste, and two rows reading "Paste" look like
    // two different actions.
    const key = `${label}|${scope}`;
    const existing = rows.get(key);
    if (existing) {
      if (!existing.chords.includes(chord)) {
        existing.chords.push(chord);
      }
      continue;
    }
    rows.set(key, {
      command: binding.command,
      label,
      scope,
      chords: [chord]
    });
  }
  return [...rows.values()];
}

function renderKeybindingReference() {
  const section = document.querySelector('#keybinding-reference-section');
  const list = document.querySelector('#keybinding-reference');
  if (!section || !list) {
    return;
  }
  // `any-pointer: fine` rather than `pointer: fine`: a tablet with a trackpad and a
  // keyboard has a coarse *primary* pointer but can still use every chord here.
  const usable = Boolean(window.matchMedia?.('(any-pointer: fine)').matches);
  const rows = usable ? keybindingReferenceRows(keybindingTable) : [];
  section.hidden = rows.length === 0;
  list.replaceChildren();
  for (const row of rows) {
    const term = document.createElement('dt');
    for (const chord of row.chords) {
      const hint = document.createElement('span');
      hint.className = 'kbd-hint';
      for (const part of chord.split(' ')) {
        const key = document.createElement('kbd');
        key.textContent = part;
        hint.append(key);
      }
      term.append(hint);
    }
    const description = document.createElement('dd');
    description.textContent = row.scope
      ? `${row.label} — ${row.scope}`
      : row.label;
    list.append(term, description);
  }
}

function renderKeybindingHints() {
  renderKeybindingHint(quickMenuFindButton, 'find.open');
}

function keybindingContext(event) {
  return {
    terminalFocus: terminalInputIsFocused(),
    terminalSelection: terminalHasCopyableSelection(),
    findOpen: isFindBarOpen(),
    pickerOpen: headerPickerOpen(),
    filesView: viewMode === 'files',
    terminalOpen: Boolean(terminal && activeSession && !terminalElement?.hidden),
    applePlatform: platformIsApple(),
    // Capability, not user-agent: a hardware keyboard is what makes a keyboard-only
    // surface worth offering.
    finePointer: Boolean(window.matchMedia?.('(pointer: fine)').matches),
    uiCapture: isHardwareKeyboardUiCaptureTarget(event?.target)
  };
}

/**
 * Resolve and run a binding for this event. Returns true when one fired, so the
 * caller can stop the key going anywhere else.
 */
function runMatchingKeybinding(event) {
  if (event.type !== 'keydown' || event.isComposing) {
    return false;
  }
  const binding = resolveKeybinding(keybindingTable, event, () =>
    keybindingContext(event)
  );
  if (!binding) {
    return false;
  }
  const command = keybindingCommands[binding.command];
  if (!command) {
    return false;
  }
  if (command.preventDefault !== false) {
    event.preventDefault();
  }
  if (command.stopPropagation) {
    event.stopPropagation();
  }
  command.run();
  return true;
}

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
  // Chrome chords come from the keybinding table; returning false keeps the key
  // out of the pty. Everything below is terminal input handling, not a binding.
  if (runMatchingKeybinding(event)) {
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
  // Escape-closes-Find, Escape-closes-picker, and Ctrl/Cmd+F are keybindings now.
  // The listener above runs first and marks the event handled, so the
  // defaultPrevented check at the top of this function skips them.
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

/**
 * Send one soft-keyboard delete, as a character or as a word once the key has
 * clearly been held. This is the path an iPhone actually uses: the keydown
 * repeat in startNativeDeleteRepeat() is for hardware keyboards, which is why
 * escalating there alone changed nothing on the phone.
 */
function sendNativeDeleteForInput(now) {
  const step = nativeDeleteRunStep(nativeDeleteRunAt, nativeDeleteRunLength, now);
  const gap = nativeDeleteRunAt === null ? null : Math.round(now - nativeDeleteRunAt);
  nativeDeleteRunAt = now;
  nativeDeleteRunLength = step.run;
  if (!step.wordMode) {
    // Recorded so a Settings > Debug dump shows what the device actually sends:
    // the gap between repeats is the number this behaviour depends on, and it is
    // not observable from here.
    recordKeyboardTransition('delete-char', { gap, run: step.run });
    sendInput('\u007f');
    return;
  }
  // Held. Words are a bigger step than the repeat rate assumes, so they go out no
  // faster than the word cadence; the deletes in between are dropped rather than
  // sent as characters, which would undo the escalation.
  if (now - nativeDeleteWordSentAt < nativeDeleteWordIntervalMilliseconds) {
    return;
  }
  nativeDeleteWordSentAt = now;
  recordKeyboardTransition('delete-word', { gap, run: step.run });
  sendInput(nativeDeleteWordSequence);
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
      sendNativeDeleteForInput(now);
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
    sendNativeDeleteForInput(now);
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

/**
 * How hard xterm should work to keep foregrounds readable.
 *
 * 1 disables the adjustment, which is what dark themes want: a TUI's chosen colours
 * are already legible there and nudging them changes how its author's palette looks.
 * On a light theme the same colours are often near-invisible — dim grey and
 * near-background truecolor both assume something dark behind them — so ask for the
 * WCAG AA ratio and let xterm lift whatever falls short.
 */
function terminalMinimumContrastRatio(themeName) {
  const theme = terminalThemes[resolveThemeName(themeName)];
  return theme && isLightHexColor(theme.background) ? 4.5 : 1;
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
  gruvbox: 'yellow',
  pierrelight: 'cursor',
  latte: 'blue',
  rosepinedawn: 'magenta',
  gruvboxlight: 'blue'
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

function hexColorLuminance(value) {
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
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/**
 * Whether a surface is light enough that contrast has to be gained by darkening.
 *
 * Every derivation below used to assume a dark background and mix toward white.
 * On a light theme that is backwards: it lowers contrast instead of raising it, and
 * `ensureHexColorContrast` could never reach its target ratio so it returned pure
 * white. This is the one decision the rest of the palette hangs off.
 */
function isLightHexColor(value) {
  return hexColorLuminance(value) > 0.4;
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
  // On a light background, contrast is gained by darkening, not lightening. Without
  // this every text token mixed toward white, so "strong" text came out *lighter*
  // than normal text and the contrast guards below could never reach their ratio.
  const light = isLightHexColor(theme.background);
  const contrastTarget = light ? '#000000' : '#ffffff';
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
      3,
      contrastTarget
    ),
    '--text': mixHexColors(theme.foreground, contrastTarget, 0.08),
    '--text-strong': mixHexColors(theme.foreground, contrastTarget, 0.22),
    '--accent': accent,
    '--accent-surface': accentSurface,
    '--accent-text': ensureHexColorContrast(
      mixHexColors(theme.foreground, accent, 0.22),
      accentSurface,
      4.5,
      contrastTarget
    ),
    '--danger': ensureHexColorContrast(
      danger,
      dangerSurface,
      4.5,
      contrastTarget
    ),
    '--danger-surface': dangerSurface,
    '--focus-ring': mixHexColors(accent, contrastTarget, 0.24),
    // Scrollbars were the one surface a theme did not own, so a light theme still
    // showed a dark thumb. Derived from the same foreground mix as the borders.
    '--app-scrollbar-thumb': mixHexColors(theme.background, theme.foreground, 0.28),
    '--app-scrollbar-thumb-hover': mixHexColors(
      theme.background,
      theme.foreground,
      0.42
    ),
    '--app-scrollbar-track': mixHexColors(theme.background, theme.foreground, 0.06)
  };
  for (const [property, value] of Object.entries(variables)) {
    root.style.setProperty(property, value);
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme.background);
  // Cached for the pre-paint script in viewport-init.js. Storing resolved values
  // rather than the theme name keeps the palette and its derivations in one place: a
  // second copy over there would drift the first time either changed.
  try {
    window.localStorage.setItem(
      terminalThemePaintStorageKey,
      JSON.stringify({
        // Drives color-scheme, so native controls and scrollbars match from the
        // first frame rather than flipping once app.js runs.
        scheme: light ? 'light' : 'dark',
        vars: Object.fromEntries(
          terminalThemePaintTokens
            .filter((name) => variables[name])
            .map((name) => [name, variables[name]])
        )
      })
    );
  } catch {
    // A first paint without the cache just falls back to the built-in colours.
  }
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
    terminal.options.minimumContrastRatio =
      terminalMinimumContrastRatio(resolved);
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
  syncFilesNavPlacement();
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
    // It describes a terminal cell, so it has no meaning here.
    hideTerminalLinkChip();
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

/**
 * Parent-folder and the location select live in the header while Files is open on
 * a portrait phone, and in the toolbar everywhere else.
 *
 * Moving the nodes rather than duplicating them keeps one set of listeners and one
 * disabled state — a second copy of Parent-folder would need both kept in sync,
 * and they would drift.
 *
 * Portrait touch only. The landscape header is a 48px side rail with no room for a
 * select, and a fine pointer keeps the Term/Files switch up there.
 */
function filesNavBelongsInHeader() {
  return (
    viewMode === 'files' &&
    Boolean(
      window.matchMedia?.('(orientation: portrait) and (pointer: coarse)').matches
    )
  );
}

function syncFilesNavPlacement() {
  if (!filesHeaderNav || !filesToolbarElement || !filesUpNavButton || !filesLocationWrap) {
    return;
  }
  const inHeader = filesNavBelongsInHeader();
  if (inHeader) {
    if (filesUpNavButton.parentElement !== filesHeaderNav) {
      filesHeaderNav.append(filesUpNavButton, filesLocationWrap);
    }
    filesHeaderNav.hidden = false;
    return;
  }
  if (filesUpNavButton.parentElement === filesHeaderNav) {
    // Back to the front of the toolbar, ahead of the breadcrumb, which is where
    // they started.
    filesToolbarElement.prepend(filesUpNavButton, filesLocationWrap);
  }
  filesHeaderNav.hidden = true;
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

/**
 * Show the build this page is running, read from the shell the server rendered.
 *
 * A reload is the only way to pick up a new bundle, so when this disagrees with the
 * deployed build the page is stale — which otherwise looks exactly like a deploy
 * that did not land.
 */
function renderAppBuildId() {
  const target = document.querySelector('#app-build-id');
  if (!target) {
    return;
  }
  const build = document
    .querySelector('meta[name="vps-build-id"]')
    ?.getAttribute('content');
  // Unsubstituted means the file was opened without the server, so say nothing
  // rather than showing the placeholder.
  if (!build || build.startsWith('__')) {
    target.hidden = true;
    return;
  }
  target.hidden = false;
  target.textContent = `Build ${build} — reload to pick up a new one.`;
}

// Built when the panel renders, copied verbatim by the Copy button. Copying reads
// this rather than the live log: writeTextToClipboardLegacy() focuses a carrier
// textarea, which moves focus and would add transitions to the dump being copied.
let lastKeyboardTransitionDumpText = '';

/**
 * Render the keyboard transition ring buffer into Settings → Debug.
 *
 * iOS Safari has no reachable console, so a dump that cannot be read and copied
 * from inside the app is no use on the one device that reproduces the bug.
 */
function renderKeyboardTransitionDump() {
  const dumpElement = document.querySelector('#keyboard-debug-dump');
  if (!dumpElement) {
    return;
  }
  const stateElement = document.querySelector('#keyboard-debug-state');
  const countElement = document.querySelector('#keyboard-debug-count');
  const entries = keyboardTransitionLog.entries();
  const dropped = keyboardTransitionLog.dropped();
  const headCount = keyboardTransitionLog.headCount();
  const body = formatKeyboardTransitions(entries, { dropped, headCount });
  dumpElement.textContent = body;
  if (countElement) {
    const total = maximumKeyboardTransitions + maximumKeyboardTransitionsHead;
    countElement.textContent = `${entries.length}/${total}${
      dropped > 0 ? ` (+${dropped} dropped)` : ''
    }`;
  }
  // Reading the panel must not record a transition, so this snapshots the flags
  // without going through recordKeyboardTransition().
  const flags = keyboardTransitionFlags();
  const blockers = keyboardReleaseBlockers(flags);
  if (stateElement) {
    stateElement.textContent =
      blockers.length > 0
        ? `Holding now: ${blockers.join(', ')}`
        : 'Holding now: nothing.';
  }
  const build =
    document
      .querySelector('meta[name="vps-build-id"]')
      ?.getAttribute('content') || 'unknown';
  lastKeyboardTransitionDumpText = [
    'vps-terminal keyboard transitions',
    `build=${build}`,
    `ua=${navigator.userAgent}`,
    `displayMode=${document.documentElement.dataset.displayMode || 'browser'}`,
    `orientation=${
      window.matchMedia('(orientation: landscape)').matches
        ? 'landscape'
        : 'portrait'
    }`,
    `now blockedBy=${blockers.join(',') || '-'} ${formatKeyboardTransitionFlags(flags)}`,
    '',
    body
  ].join('\n');
}

/**
 * Close a modal `<dialog>` on a tap that both starts and ends outside its box.
 *
 * A native modal dialog closes on Escape but not on a backdrop tap, and the
 * backdrop is a pseudo-element, so the dialog itself is the only thing there is
 * to bind to. A click on the backdrop targets the dialog element.
 *
 * Three guards, each for a case that would otherwise dismiss wrongly:
 *
 * - A click's target is the common ancestor of pointerdown and pointerup, so a
 *   press that starts on a control in the sheet and releases past its edge
 *   arrives here indistinguishable from a backdrop tap. Requiring the gesture to
 *   have started outside too is what keeps a drag off a control from closing.
 * - The dialog's own padding also targets the dialog, so identity alone would
 *   treat part of the visible card as outside. Compare against its box.
 * - iOS draws the `<select>` picker over the backdrop, so the tap that closes a
 *   picker would land here and close the sheet underneath it. An open picker
 *   keeps its select focused, which is the only signal available from script.
 */
function installDialogBackdropDismiss(dialog, dismiss) {
  if (!dialog) {
    return;
  }
  const outsideBox = (event) => {
    const bounds = dialog.getBoundingClientRect();
    return (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    );
  };
  let armed = false;
  dialog.addEventListener('pointerdown', (event) => {
    armed =
      event.target === dialog &&
      outsideBox(event) &&
      // Tested here rather than on click: pointerdown's default action moves
      // focus off the select, so by the time the click fires activeElement is
      // no longer the picker's and the guard would never hold.
      document.activeElement?.tagName !== 'SELECT';
  });
  dialog.addEventListener('click', (event) => {
    const wasArmed = armed;
    armed = false;
    if (!wasArmed || event.target !== dialog || !outsideBox(event)) {
      return;
    }
    dismiss();
  });
}

function openSettingsDialog() {
  renderAppBuildId();
  renderKeybindingReference();
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
      // Rename sits on the session it renames, next to Delete, rather than in the
      // Menu — the session is the thing being acted on and it is already here.
      // The long-press on the name still works, for every session rather than
      // only the active one.
      const renameButton = document.createElement('button');
      renameButton.type = 'button';
      renameButton.className = 'session-rename';
      renameButton.innerHTML =
        '<svg viewBox="0 0 16 16" aria-hidden="true">' +
        '<path d="M10.5 2.5l3 3-7.5 7.5H3v-3z" /></svg>';
      renameButton.title = `Rename ${session.name}`;
      renameButton.setAttribute('aria-label', `Rename session ${session.name}`);
      renameButton.addEventListener('click', (event) => {
        event.stopPropagation();
        void renameSession(session.name);
      });
      item.append(renameButton);
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
    // The rail is keyed on the foreground command, which only this poll reports.
    refreshFooterRailForCommand();
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
        // Raise washed-out foregrounds to a readable ratio. This exists for light
        // themes: our light palettes invert the ANSI black/white that TUIs written
        // for dark backgrounds assume, so dim text and near-background truecolor —
        // Claude Code's status line, for one — come out unreadable. Kept at 1 (off)
        // on dark themes, where those apps already look as their authors intended.
        minimumContrastRatio: terminalMinimumContrastRatio(terminalThemeName),
        // OSC 8 hyperlinks are handled by xterm's own provider, not ours. With no
        // handler set it opens them from a plain left-click after a `confirm()`,
        // which contradicts the modifier gate everywhere else. `ls
        // --hyperlink=auto`, eza, gh, and delta all emit OSC 8, so route
        // activation through the same check.
        //
        // Only activation: their hover decoration comes from xterm and cannot be
        // gated the same way. Non-http schemes were already refused before this
        // — the vendored provider runs that check whenever no handler is set — so
        // `allowNonHttpProtocols: false` restates the default rather than closing
        // a hole. It stays for explicitness.
        linkHandler: {
          // Not activateTerminalLink directly: xterm calls this as
          // (event, text, range), so its third argument would arrive where the
          // link kind belongs. OSC 8 targets are always URLs.
          activate: (event, text) => activateTerminalLink(event, text, 'url'),
          allowNonHttpProtocols: false
        },
        theme: terminalThemes[terminalThemeName]
      });
      fitAddon = new FitAddon.FitAddon();
      terminal.loadAddon(fitAddon);
      if (typeof SearchAddon !== 'undefined' && SearchAddon.SearchAddon) {
        searchAddon = new SearchAddon.SearchAddon();
        terminal.loadAddon(searchAddon);
      }
      terminal.open(terminalElement);
      terminal.parser?.registerOscHandler?.(52, handleClipboardOsc);
      terminal.registerLinkProvider?.({ provideLinks: provideTerminalLinks });
      installTerminalLinkModifierTracking();
      terminalElement.addEventListener('paste', handleTerminalPasteEvent, {
        capture: true
      });
      terminal.textarea?.addEventListener('focus', () => {
        recordKeyboardTransition('terminal-focus');
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
          if (keyboardLayoutLock) {
            // The settle gate in updateVisualViewport() already froze a height
            // that had stopped moving. Re-capturing here would overwrite it with
            // whatever this instant happens to be and refit the terminal again.
            recordKeyboardTransition('focus-settle-already-locked');
          } else if (keyboardViewportIsReduced()) {
            captureKeyboardLayoutLock();
            scheduleFit();
          } else {
            // Either the blur landed inside the 320 ms animation window or the
            // keyboard never came up. Both mean the viewport is full height, and
            // freezing it there is the T18 bug — updateVisualViewport() captures
            // once the reduction actually arrives.
            recordKeyboardTransition('focus-settle-skipped');
          }
        }, 320);
      });
      terminal.textarea?.addEventListener('blur', () => {
        stopNativeDeleteRepeat();
        terminalElement.classList.remove('keyboard-input-active');
        setKeyboardButtonState(false);
        // Do not expand layout while a long-press selection is in progress.
        if (!holdKeyboardLayoutForSelection && !terminal?.hasSelection()) {
          recordKeyboardTransition('terminal-blur');
          releaseKeyboardLayoutLock();
        } else {
          recordKeyboardTransition('terminal-blur-held');
        }
      });
      terminal.onSelectionChange(() => {
        updateClipboardButton();
        if (
          holdKeyboardLayoutForSelection &&
          !terminal?.hasSelection() &&
          !xtermTouchSelecting &&
          !terminalInputIsFocused() &&
          // Copying clears the selection, which fires this synchronously, before
          // the focus restore runs. Releasing here drops the frozen height and the
          // returning keyboard freezes it again — the jump, and the reason copy
          // still jumped after paste stopped. Paste restores focus inside the same
          // touchend, so terminalInputIsFocused() is already true by the time this
          // fires; copy restores on a later tap.
          !terminalFocusedBeforeSelection
        ) {
          holdKeyboardLayoutForSelection = false;
          recordKeyboardTransition('selection-change-release');
          releaseKeyboardLayoutLock();
        } else if (holdKeyboardLayoutForSelection || terminal?.hasSelection()) {
          // Only when a selection or its hold is live. xterm fires this on every
          // write that clears an empty selection, which is ~20 events during boot
          // and tells us nothing about keyboard geometry.
          recordKeyboardTransition('selection-change');
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
      // Baseline, so a dump always opens with a known state. xterm focuses the
      // helper textarea inside terminal.open(), which happens before the focus
      // listener above exists — without this the first entry in the buffer is
      // whatever incidental event came next.
      recordKeyboardTransition('startup');
      terminal.element?.classList.toggle(
        'native-touch-selection',
        nativeTouchSelection
      );
      terminal.onData((data) => {
        sendInput(data);
        scheduleNativeTerminalInputPrime();
      });
      terminal.onScroll(() => {
        showScrollPosition();
        // The chip points at one cell of one row, so a scroll invalidates it —
        // except the reflow from the keyboard the offering tap just raised, which
        // would otherwise dismiss the chip immediately.
        if (window.performance.now() >= terminalLinkChipSettleUntil) {
          hideTerminalLinkChip();
        }
      });
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
  // A tap on a link offers the chip. Deliberately before the focus handling below,
  // and additive: the tap still positions the cursor and raises the keyboard.
  offerTerminalLinkOnTap(clientX, clientY);
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
    recordKeyboardTransition('capture-declined');
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
  // Recorded last so the entry carries the height that was frozen. Every other
  // event records the state it produced, and a 'capture' reading lock=n would
  // read as a capture that did not happen.
  recordKeyboardTransition('capture');
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
    // The prime suspect for T19: a selection that is never cleared holds the
    // frozen height for the rest of the page's life. Folded, so a stuck state
    // reads as one line with a large count.
    recordKeyboardTransition('release-declined');
    return;
  }
  recordKeyboardTransition('release-begin');
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
      recordKeyboardTransition('dismiss-poll-refocused', { attempts });
      return;
    }
    if (holdKeyboardLayoutForSelection || terminal?.hasSelection()) {
      keyboardDismissing = false;
      recordKeyboardTransition('dismiss-poll-selection', { attempts });
      return;
    }
    attempts += 1;
    pinPageToOrigin();
    if (!keyboardViewportIsReduced() || attempts >= 24) {
      keyboardDismissing = false;
      // attempts >= 24 means the viewport never grew back — a real stuck close
      // rather than a normal one, and the two must be told apart in the dump.
      recordKeyboardTransition('dismiss-poll-done', {
        attempts,
        exhausted: attempts >= 24
      });
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
    // Folds into one entry whose count is the number of 50 ms ticks the close
    // took, so a close that ran the poll out is visible without 24 lines.
    recordKeyboardTransition('dismiss-poll-follow');
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
  recordKeyboardTransition('selection-viewport-lock');
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
  recordKeyboardTransition('selection-viewport-release');
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
  // A gesture that ended without restoring focus must not leave the frozen
  // layout held for the rest of the page's life — that is the T19 failure mode.
  terminalFocusedBeforeSelection = false;
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

// ---- Start of the pure view swipe block. ----
// Written free of DOM and browser globals so it can be sliced out of the shipped
// source for tests, like the keyboard transition and footer rail blocks.

/** Left to right. A swipe left advances, a swipe right retreats. */
const viewSwipeOrder = ['term', 'files'];

/**
 * Which view a horizontal swipe of `dx` from `mode` would land on, or null when
 * there is nothing that way. Null is what produces the rubber-band: the drag is
 * still tracked, it just cannot commit.
 */
function viewSwipeTarget(mode, dx) {
  const index = viewSwipeOrder.indexOf(mode);
  if (index < 0 || dx === 0) {
    return null;
  }
  return viewSwipeOrder[index + (dx < 0 ? 1 : -1)] ?? null;
}

/**
 * Should this movement be treated as a view swipe rather than a scroll?
 *
 * Order matters. An active selection drag always wins, and a gesture already
 * locked to scrolling stays locked — that is the hysteresis which stops a long
 * scroll from turning into a page flip halfway through.
 */
function viewSwipeShouldClaim(state) {
  if (state.selecting || state.scrolling) {
    return false;
  }
  const absX = Math.abs(state.dx);
  if (absX < viewSwipeActivationDistance) {
    return false;
  }
  if (absX < Math.abs(state.dy) * viewSwipeDominanceRatio) {
    return false;
  }
  return !state.nearEdge;
}

/**
 * Should the terminal's scroll lock be held off for one more frame?
 *
 * The terminal locks to vertical scrolling at 5px of travel in any direction,
 * and a swipe needs 22px of horizontal travel. Left alone, the lock wins that
 * race on the first touchmove of anything but a fast flick, latches
 * `nativeTouchScrolling`, and then refuses the swipe for the rest of the
 * gesture — which is exactly why swiping out of the terminal felt hard while
 * swiping out of Files did not.
 *
 * So while the movement leans horizontal but has not yet earned the swipe, the
 * lock waits. Vertical scrolling keeps its 5px responsiveness, because vertical
 * intent means |dy| >= |dx| and that falls straight through.
 */
function viewSwipeShouldDeferScroll(state) {
  if (state.scrolling || state.selecting) {
    return false;
  }
  const absX = Math.abs(state.dx);
  if (absX <= Math.abs(state.dy)) {
    return false;
  }
  return absX < viewSwipeActivationDistance;
}

/** Travel needed to commit, given a viewport width. */
function viewSwipeCommitDistance(viewportWidth) {
  return Math.max(
    viewSwipeMinimumCommitDistance,
    Math.round((viewportWidth || 0) * viewSwipeCommitFraction)
  );
}

/**
 * How far the view is dragged, in pixels. Movement toward a view that does not
 * exist is damped to a third so the edge of the deck is felt rather than moving
 * like a real page.
 */
function viewSwipeOffset(dx, hasTarget) {
  return hasTarget ? dx : Math.round(dx / 3);
}

function viewSwipeShouldCommit(dx, viewportWidth, hasTarget) {
  return hasTarget && Math.abs(dx) >= viewSwipeCommitDistance(viewportWidth);
}
// ---- End of the pure view swipe block. ----

// Non-null only while a horizontal swipe owns the gesture.
let viewSwipe = null;
let viewSwipeSettleTimer = null;

function mainViewElement() {
  return document.querySelector('main');
}

function beginViewSwipe(fromMode) {
  const main = mainViewElement();
  if (!main) {
    return;
  }
  window.clearTimeout(viewSwipeSettleTimer);
  viewSwipeSettleTimer = null;
  viewSwipe = { from: fromMode, dx: 0, committed: false };
  main.style.transition = 'none';
  document.body.classList.add('view-swiping');
}

function updateViewSwipe(dx) {
  const main = mainViewElement();
  if (!viewSwipe || !main) {
    return;
  }
  viewSwipe.dx = dx;
  const target = viewSwipeTarget(viewSwipe.from, dx);
  main.style.transform = `translateX(${viewSwipeOffset(dx, Boolean(target))}px)`;
}

function finishViewSwipe() {
  const main = mainViewElement();
  if (!viewSwipe || !main) {
    viewSwipe = null;
    return false;
  }
  const { dx, from } = viewSwipe;
  const target = viewSwipeTarget(from, dx);
  const commit = viewSwipeShouldCommit(dx, window.innerWidth, Boolean(target));
  viewSwipe = null;
  document.body.classList.remove('view-swiping');
  if (!commit) {
    // Snap back from wherever the finger left it.
    main.style.transition = `transform ${viewSwipeSettleMilliseconds}ms ease-out`;
    main.style.transform = 'translateX(0)';
    viewSwipeSettleTimer = window.setTimeout(() => {
      main.style.transition = '';
      main.style.transform = '';
    }, viewSwipeSettleMilliseconds);
    return false;
  }
  // Switch first, then slide the new view in from the side the finger came from.
  // Sliding the old one out first would double the time before anything is
  // readable, and paging should feel immediate.
  setViewMode(target);
  main.style.transition = 'none';
  main.style.transform = `translateX(${dx < 0 ? '100%' : '-100%'})`;
  // Force the start offset to be applied before the transition to 0.
  void main.offsetWidth;
  main.style.transition = `transform ${viewSwipeSettleMilliseconds}ms ease-out`;
  main.style.transform = 'translateX(0)';
  viewSwipeSettleTimer = window.setTimeout(() => {
    main.style.transition = '';
    main.style.transform = '';
  }, viewSwipeSettleMilliseconds);
  return true;
}

function cancelViewSwipe() {
  if (!viewSwipe) {
    return;
  }
  viewSwipe.dx = 0;
  finishViewSwipe();
}

/**
 * One swipe listener on `main`, covering both views.
 *
 * It has to exist alongside the hook in handleTerminalTouchMove because the app
 * has two touch architectures, not one. #scroll-catcher and the whole
 * startNativeTouchGesture pipeline only run when shouldUseNativeTouchSelection()
 * is true, which requires an Apple user agent — so on iOS the terminal swipe
 * belongs to that pipeline, and everywhere else there is no pipeline at all.
 * This listener takes every case the pipeline does not:
 *
 * - iOS, Files view — the pipeline is terminal-only.
 * - Android and desktop touch, both views — the pipeline never runs.
 *
 * Without it the swipe would work on an iPhone terminal and silently nowhere else.
 */
function installViewSwipeGestures() {
  const main = mainViewElement();
  if (!main) {
    return;
  }
  let start = null;

  // A drag beginning on something that scrolls sideways belongs to it — the
  // Files toolbar and the footer drawer both do.
  const scrollsHorizontally = (node) => {
    for (let el = node; el && el !== main; el = el.parentElement) {
      if (el.scrollWidth > el.clientWidth + 1) {
        return true;
      }
    }
    return false;
  };

  // True when the iOS terminal pipeline owns this gesture already.
  const pipelineOwnsIt = () =>
    nativeTouchSelection && viewMode === 'term';

  main.addEventListener(
    'touchstart',
    (event) => {
      start = null;
      if (event.touches.length !== 1 || pipelineOwnsIt()) {
        return;
      }
      const touch = event.touches[0];
      if (scrollsHorizontally(event.target)) {
        return;
      }
      start = {
        x: touch.clientX,
        y: touch.clientY,
        // Set once the finger commits to the surface's own vertical axis.
        abandoned: false
      };
    },
    { passive: true }
  );

  main.addEventListener(
    'touchmove',
    (event) => {
      if (!start || event.touches.length !== 1) {
        return;
      }
      const touch = event.touches[0];
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (viewSwipe) {
        event.preventDefault();
        updateViewSwipe(dx);
        return;
      }
      if (start.abandoned) {
        return;
      }
      // Vertical intent first. Once the surface is being scrolled the gesture is
      // its own for the rest of its life, which is the same hysteresis the
      // terminal path gets from nativeTouchScrolling.
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        start.abandoned = true;
        return;
      }
      if (
        viewSwipeShouldClaim({
          dx,
          dy,
          selecting: Boolean(terminal?.hasSelection?.()),
          scrolling: false,
          nearEdge:
            start.x <= viewSwipeEdgeGuard ||
            start.x >= window.innerWidth - viewSwipeEdgeGuard
        })
      ) {
        event.preventDefault();
        beginViewSwipe(viewMode);
        updateViewSwipe(dx);
      }
    },
    { passive: false }
  );

  const end = () => {
    start = null;
    if (viewSwipe) {
      finishViewSwipe();
    }
  };
  main.addEventListener('touchend', end);
  main.addEventListener('touchcancel', end);
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
  // A horizontal drag on the terminal had no meaning before this: any direction
  // past 5px locked the gesture to vertical scrolling. It is now a view swipe,
  // claimed only when clearly horizontal and only before the scroll lock takes.
  const dx = touch.clientX - nativeTouchStartX;
  const dy = touch.clientY - nativeTouchStartY;
  if (viewSwipe) {
    touchMoved = true;
    updateViewSwipe(dx);
    return true;
  }
  if (
    !selectionViewportLock &&
    viewSwipeShouldClaim({
      dx,
      dy,
      selecting: xtermTouchSelecting,
      scrolling: nativeTouchScrolling,
      nearEdge:
        nativeTouchStartX <= viewSwipeEdgeGuard ||
        nativeTouchStartX >= window.innerWidth - viewSwipeEdgeGuard
    })
  ) {
    touchMoved = true;
    clearNativeSelectionLongPressTimer();
    beginViewSwipe(viewMode);
    updateViewSwipe(dx);
    return true;
  }
  // Hold the scroll lock while the gesture still leans horizontal but has not
  // travelled far enough to be a swipe. Without this the 5px lock wins the race
  // on the first touchmove and the swipe needs a flick to land.
  if (
    viewSwipeShouldDeferScroll({
      dx,
      dy,
      scrolling: nativeTouchScrolling,
      selecting: xtermTouchSelecting
    })
  ) {
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
  cancelViewSwipe();
  finishTouchGesture();
  updateClipboardButton();
}

function completeTerminalTouchEnd(event) {
  if (event.__vpsTerminalTouchEndHandled || nativeTouchStartX === null) {
    return;
  }
  event.__vpsTerminalTouchEndHandled = true;
  suppressCompatibilityMouseUntil = window.performance.now() + 10000;
  // A swipe owned this gesture, so it is not a tap, a selection, or a scroll.
  // Settle it and stop before any of that runs.
  if (viewSwipe) {
    finishViewSwipe();
    finishTouchGesture();
    return;
  }
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
  if (madeSelectionThisGesture && terminalSelectionHasText()) {
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
  } else if (madeSelectionThisGesture) {
    // The long press landed somewhere with nothing to select, so the gesture means
    // paste. Read the clipboard straight from this touchend instead of offering
    // our own chip first: iOS raises its own permission bubble for the read, and a
    // chip in front of it is two bubbles for one intent.
    //
    // The read is started here, synchronously, while this touch is still the live
    // user activation. pasteClipboard() then consumes that one read rather than
    // starting a second.
    clientDebug(
      'selection-release-empty',
      selectionDebugSnapshot({
        madeSelectionThisGesture,
        hadSelectionAtStart,
        directPaste: true
      })
    );
    hideSelectionCopyChip();
    restoreTerminalFocusAfterSelection();
    beginPasteGestureClipboardRead();
    void pasteClipboard();
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
      // The swipe needs an origin, and this path only tracked Y.
      genericTouchStartX = event.touches[0].clientX;
      genericTouchStartY = event.touches[0].clientY;
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
      // View swipe, on the non-Apple path. This handler stops propagation, so
      // the listener on <main> never sees terminal touches here and the swipe
      // has to be claimed inside it.
      if (genericTouchStartX !== null) {
        const swipeDx = event.touches[0].clientX - genericTouchStartX;
        const swipeDy = currentY - genericTouchStartY;
        if (viewSwipe) {
          touchMoved = true;
          updateViewSwipe(swipeDx);
          return;
        }
        if (
          !touchMoved &&
          viewSwipeShouldClaim({
            dx: swipeDx,
            dy: swipeDy,
            selecting: Boolean(terminal?.hasSelection?.()),
            scrolling: false,
            nearEdge:
              genericTouchStartX <= viewSwipeEdgeGuard ||
              genericTouchStartX >= window.innerWidth - viewSwipeEdgeGuard
          })
        ) {
          touchMoved = true;
          beginViewSwipe(viewMode);
          updateViewSwipe(swipeDx);
          return;
        }
        if (
          viewSwipeShouldDeferScroll({
            dx: swipeDx,
            dy: swipeDy,
            scrolling: touchMoved,
            selecting: Boolean(terminal?.hasSelection?.())
          })
        ) {
          return;
        }
      }
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
      genericTouchStartX = null;
      if (viewSwipe) {
        finishViewSwipe();
      }
      finishTouchGesture();
    },
    { capture: true, passive: true }
  );
  terminalElement.addEventListener(
    'touchcancel',
    () => {
      genericTouchStartX = null;
      cancelViewSwipe();
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
  // Any in-flight connect is now void; leaving the flag set would block the next one.
  connectingSession = null;
  // The chip refers to a cell in this session's buffer.
  hideTerminalLinkChip();
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
  // A connect for this session is already opening a socket. Without this, a click that
  // lands while the app is auto-connecting the remembered session opens a second socket
  // for the same pane, and the loser is discarded — which counts against the server's
  // connection cap until it is reaped.
  //
  // The guard has to be released on every exit, including a rejection: an earlier
  // version cleared it only on the success path, so one failed ensureTerminal() left
  // the flag set and every later connect became a silent no-op.
  if (connectingSession === name) {
    return;
  }
  connectingSession = name;
  try {
    await openSessionSocket(name);
  } finally {
    if (connectingSession === name) {
      connectingSession = null;
    }
  }
}

async function openSessionSocket(name) {

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
  let socketDidOpen = false;
  nextSocket.addEventListener('open', () => {
    socketDidOpen = true;
    // A working connection clears the debt: the next failure starts from the short
    // delay again rather than inheriting a long one.
    reconnectAttempts = 0;
    if (socket !== nextSocket) {
      // Superseded before it finished connecting — another connect() replaced it.
      // Returning without closing left this one open on the server forever, and the
      // server caps concurrent connections, so a handful of reloads exhausted the
      // cap and every later upgrade was refused.
      nextSocket.close(1000, 'superseded');
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
    // A socket that opened and then dropped starts the count again; one that never
    // opened was refused, and repeated refusals back off.
    reconnectAttempts = socketDidOpen ? 1 : reconnectAttempts + 1;
    const delay = reconnectDelayForAttempt(reconnectAttempts);
    if (reconnectAttempts >= reconnectAttemptsBeforeError) {
      // Stop saying "reconnecting" when it has failed repeatedly. The close event used
      // to overwrite the error state the error event had just set, so the actionable
      // message only ever flickered.
      lastConnectionDetail =
        `Cannot reach ${name}. Retrying every ` +
        `${Math.round(delay / 1000)}s — tap the status dot to retry now.`;
      setConnectionState('error', lastConnectionDetail);
    } else {
      lastConnectionDetail = `Disconnected from ${name}; reconnecting…`;
      setConnectionState('connecting', lastConnectionDetail);
      armConnectionWatch(name);
    }
    setStatus(lastConnectionDetail, { sticky: true });
    reconnectTimer = setTimeout(() => connect(name), delay);
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

// Terminal links: pure detection and resolution. Everything from here to the
// end-of-block marker is free of DOM and browser globals so `test/` can slice
// it out of the shipped source and assert on it directly, the same way the
// OSC 52 decoder below is tested.
//
// Detection is deliberately conservative. Terminal output is mostly prose and
// diagnostics, so a wrong link that navigates somewhere unexpected is worse
// than a path left as plain text.
const terminalLinkUrlPattern = /https?:\/\/[^\s"'`<>]+/g;
// Two alternatives, both deliberately narrow. Underlining half a build log in a
// terminal-first product is worse than missing `src/Makefile`.
//
// A sigil form (`/`, `./`, `../`, `~/`) counts on its own, but only where the
// sigil does not continue a word: without that lookbehind, `Proceed? y/n` yields
// `/n`, `and/or` yields `/or`, and `1/10` yields `/10`.
//
// Windows path shapes are intentionally absent: this only ever talks to a Linux
// VPS, so `C:\` would add ambiguity for no reachable target.
//
// A bare `a/b` form additionally needs a real extension on the last segment —
// letter-initial, so `HTTP/1.1` and `0.15/0.20` are not filenames, and allowing
// interior dots so `file.test.js` is not truncated to `file.test`. Without this,
// `read/write`, `2026/07/30`, `192.168.1.10/24`, and `[13/Jul/2026:10:00:00]` all
// matched.
const terminalLinkPathPattern =
  /(?<![A-Za-z0-9._~-])(?:~\/|\.{1,2}\/|\/)[^\s"'`<>]+|[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*\/[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*\.[A-Za-z][A-Za-z0-9]{0,9}(?::\d+){0,2}/g;
const terminalLinkTrailingPunctuationPattern = /[.,;:!?]+$/;

// Compilers, linters, and shells all wrap paths in delimiters, so a match
// frequently carries a closer that belongs to the surrounding sentence rather
// than to the path: `(see /etc/nginx.conf)` or `["src/app.js"]`. Only drop a
// closer that has no opener inside the match itself, so a genuinely bracketed
// filename survives.
function trimTerminalLinkDelimiters(value) {
  let output = value.replace(terminalLinkTrailingPunctuationPattern, '');
  const trimUnbalanced = (open, close) => {
    while (output.endsWith(close)) {
      const opens = output.split(open).length - 1;
      const closes = output.split(close).length - 1;
      if (opens >= closes) {
        return;
      }
      output = output.slice(0, -1);
    }
  };
  trimUnbalanced('(', ')');
  trimUnbalanced('[', ']');
  trimUnbalanced('{', '}');
  return output;
}

function terminalLinkRangesOverlap(first, second) {
  return first.start < second.end && second.start < first.end;
}

function collectTerminalLinkMatches(line, kind, pattern, existing) {
  const matches = [];
  pattern.lastIndex = 0;
  for (const rawMatch of line.matchAll(pattern)) {
    const raw = rawMatch[0];
    const start = rawMatch.index ?? -1;
    if (start < 0 || raw.length === 0) {
      continue;
    }
    const trimmed = trimTerminalLinkDelimiters(raw);
    if (trimmed.length === 0) {
      continue;
    }
    // A URL contains slashes and dots, so the path pattern matches its tail as
    // well. URLs are collected first and win the overlap.
    if (kind === 'path' && /^https?:\/\//i.test(trimmed)) {
      continue;
    }
    // A leading `//` means we matched the tail of some other scheme's URL
    // (`ssh://host/repo.git`, `file:///etc`). Windows UNC paths are out of scope,
    // so nothing legitimate starts this way.
    if (kind === 'path' && trimmed.startsWith('//')) {
      continue;
    }
    // A sigil path must not continue a word, or `Proceed? y/n` yields `/n`,
    // `and/or` yields `/or`, and `1/10` yields `/10`. Done here rather than with a
    // RegExp lookbehind: iOS Safari below 16.4 cannot parse one, and that fails
    // the whole file rather than degrading. Bare matches need no such check —
    // their first character class already starts them at a word boundary.
    if (
      kind === 'path' &&
      start > 0 &&
      /^[~./]/.test(trimmed) &&
      /[A-Za-z0-9._~-]/.test(line[start - 1])
    ) {
      continue;
    }
    const candidate = { kind, text: trimmed, start, end: start + trimmed.length };
    const collides = [...existing, ...matches].some((other) =>
      terminalLinkRangesOverlap(candidate, other)
    );
    if (collides) {
      continue;
    }
    matches.push(candidate);
  }
  return matches;
}

function extractTerminalLinks(line) {
  const urlMatches = collectTerminalLinkMatches(
    line,
    'url',
    terminalLinkUrlPattern,
    []
  );
  const pathMatches = collectTerminalLinkMatches(
    line,
    'path',
    terminalLinkPathPattern,
    urlMatches
  );
  return [...urlMatches, ...pathMatches].sort((a, b) => a.start - b.start);
}

// `app.js:12:34`, `app.js:12`, or neither. A single trailing number is a line,
// not a column, which is what every editor and compiler means by it.
function splitTerminalLinkPosition(value) {
  let path = value;
  let line;
  let column;
  const first = path.match(/:(\d+)$/);
  if (!first) {
    return { path, line: undefined, column: undefined };
  }
  column = first[1];
  path = path.slice(0, -first[0].length);
  const second = path.match(/:(\d+)$/);
  if (second) {
    line = second[1];
    path = path.slice(0, -second[0].length);
  } else {
    line = column;
    column = undefined;
  }
  return { path, line, column };
}

// Map each string index produced by `translateToString` to its 1-based cell
// column. The two are not interchangeable: a double-width glyph (CJK, emoji)
// takes two cells but one string position, and a combining mark adds a string
// position without advancing a cell. Treating an index as a column puts both the
// underline and the click target in the wrong place on any row containing them.
//
// `line` only needs `length` and `getCell`. This mirrors xterm's own
// translation: take each cell's characters (a blank cell reads as one space) and
// advance by the cell's width, which skips the continuation cell of a wide glyph.
//
// Widths are kept alongside the columns because a range's end has to point at
// the glyph's *last* cell, not its first, or a link ending in a wide glyph
// underlines one cell short and rejects a click on that glyph's right half.
//
// `reusableCell` is optional and purely about allocation: xterm's `getCell(i)`
// builds a fresh CellData per call, and this runs per row on every hover that
// crosses a row boundary.
function terminalLineColumnMap(line, reusableCell) {
  if (typeof line?.getCell !== 'function') {
    return undefined;
  }
  const columns = [];
  const widths = [];
  const cellCount = line.length ?? 0;
  for (let cellIndex = 0; cellIndex < cellCount; ) {
    const cell = reusableCell
      ? line.getCell(cellIndex, reusableCell)
      : line.getCell(cellIndex);
    if (!cell) {
      break;
    }
    const characters = cell.getChars() || ' ';
    const width = cell.getWidth() || 1;
    for (let offset = 0; offset < characters.length; offset += 1) {
      columns.push(cellIndex + 1);
      widths.push(width);
    }
    cellIndex += width;
  }
  return { columns, widths };
}

// A path longer than the window is stored across several buffer rows flagged
// `isWrapped`. Reading only the clicked row would truncate the link, so walk
// back to the row that started the logical line, then forward to its end, and
// keep each row's slice offsets so a match can be mapped back to buffer
// coordinates.
function collectWrappedTerminalLinkLine(bufferLineNumber, getLine) {
  const anchor = getLine(bufferLineNumber - 1);
  if (!anchor) {
    return null;
  }
  let startNumber = bufferLineNumber;
  let startLine = anchor;
  while (startNumber > 1 && startLine.isWrapped) {
    const previous = getLine(startNumber - 2);
    if (!previous) {
      return null;
    }
    startNumber -= 1;
    startLine = previous;
  }
  const segments = [];
  let nextStartIndex = 0;
  let currentNumber = startNumber;
  for (;;) {
    const currentLine = getLine(currentNumber - 1);
    if (!currentLine) {
      break;
    }
    const continues = getLine(currentNumber)?.isWrapped === true;
    // Only the final row may be right-trimmed; trimming a continued row would
    // delete padding that is part of the logical line.
    const text = currentLine.translateToString(!continues);
    segments.push({
      bufferLineNumber: currentNumber,
      text,
      startIndex: nextStartIndex,
      endIndex: nextStartIndex + text.length,
      // The row itself, not its column map: the map is only read when a match
      // actually lands in this segment, so rows with no link never build one.
      // A map built from the untrimmed row still lines up with a right-trimmed
      // `text`, which is only ever a prefix.
      columnSource: currentLine
    });
    nextStartIndex += text.length;
    if (!continues) {
      break;
    }
    currentNumber += 1;
  }
  return { text: segments.map((segment) => segment.text).join(''), segments };
}

// xterm buffer coordinates are 1-based. Without a column map — a caller that
// only supplied strings, as some unit tests do — the index is the best available
// approximation, which is exact for single-width text.
//
// `atEnd` returns the glyph's last cell instead of its first, which only differs
// for a double-width glyph.
function terminalLinkColumnFor(segment, localIndex, atEnd) {
  const map = segment.columnSource?.columnMap;
  const column = map?.columns?.[localIndex];
  if (column === undefined) {
    return localIndex + 1;
  }
  return atEnd ? column + (map.widths?.[localIndex] ?? 1) - 1 : column;
}

function resolveTerminalLinkCharacter(segments, characterIndex, atEnd) {
  for (const segment of segments) {
    if (characterIndex < segment.endIndex) {
      return {
        x: terminalLinkColumnFor(segment, characterIndex - segment.startIndex, atEnd),
        y: segment.bufferLineNumber
      };
    }
  }
  const last = segments[segments.length - 1];
  const lastIndex = Math.max((last?.text.length ?? 1) - 1, 0);
  return {
    x: last ? terminalLinkColumnFor(last, lastIndex, atEnd) : 1,
    y: last?.bufferLineNumber ?? 1
  };
}

function resolveWrappedTerminalLinkRange(wrappedLine, match) {
  return {
    start: resolveTerminalLinkCharacter(wrappedLine.segments, match.start, false),
    end: resolveTerminalLinkCharacter(wrappedLine.segments, match.end - 1, true)
  };
}

/**
 * Is `column` on `bufferLineNumber` inside this link's range?
 *
 * A range can span wrapped rows, so the first and last rows are bounded by the
 * range's own columns while any row between them is covered end to end.
 */
function terminalLinkRangeContains(range, column, bufferLineNumber) {
  if (bufferLineNumber < range.start.y || bufferLineNumber > range.end.y) {
    return false;
  }
  if (bufferLineNumber === range.start.y && column < range.start.x) {
    return false;
  }
  if (bufferLineNumber === range.end.y && column > range.end.x) {
    return false;
  }
  return true;
}

/**
 * The link covering a cell, or null. Used by the touch path, which has no hover to
 * lean on and must decide from a tap position alone.
 */
function findTerminalLinkAtCell(bufferLineNumber, column, getLine) {
  const wrappedLine = collectWrappedTerminalLinkLine(bufferLineNumber, getLine);
  if (!wrappedLine) {
    return null;
  }
  for (const match of extractTerminalLinks(wrappedLine.text)) {
    const range = resolveWrappedTerminalLinkRange(wrappedLine, match);
    if (terminalLinkRangeContains(range, column, bufferLineNumber)) {
      return { ...match, range };
    }
  }
  return null;
}

// End of the pure terminal-link block.

// URLs open in a new tab; paths resolve through /api/fs/resolve and open in the
// Files view.
//
// Activation requires Ctrl/Cmd, which keeps an ordinary click free to position
// the cursor and drag a selection — the terminal is the product, so a stray
// click must never navigate. The underline and pointer cursor follow the
// modifier rather than advertising a plain click that does nothing. Touch has no
// modifier and is deliberately not covered here.
//
// Decoration state has to be written in two places because of how xterm handles
// it. On hover it *snapshots* the `decorations` we provided, applies the cursor
// and underline from that snapshot, and only then calls `hover` — after which it
// replaces `link.decorations` with its own accessor-backed object. So the value
// supplied at provide time decides the initial appearance, and every later
// change must be written through the link's own `decorations` property.
let terminalLinkModifierHeld = false;
let hoveredTerminalLink = null;

function terminalLinkModifierActive(event, isApple = platformIsApple()) {
  // Cmd on Apple, Ctrl elsewhere — mutually exclusive, unlike the `mod` used for
  // keyboard chords. Ctrl+click *is* the context-menu gesture on macOS, and
  // whether it arrives as a secondary button or as button 0 plus a separate
  // `contextmenu` event is engine-dependent, so accepting Ctrl there means the
  // menu and the link can both appear. Alt and Shift are excluded because the
  // terminal uses them for mouse reporting and for extending a selection.
  const modifier = isApple
    ? event.metaKey && !event.ctrlKey
    : event.ctrlKey && !event.metaKey;
  return Boolean(modifier && !event.altKey && !event.shiftKey);
}

function applyTerminalLinkDecorations() {
  const decorations = hoveredTerminalLink?.decorations;
  if (!decorations) {
    return;
  }
  decorations.pointerCursor = terminalLinkModifierHeld;
  decorations.underline = terminalLinkModifierHeld;
}

function setTerminalLinkModifierHeld(held) {
  if (terminalLinkModifierHeld === held) {
    return;
  }
  terminalLinkModifierHeld = held;
  applyTerminalLinkDecorations();
}

function syncTerminalLinkModifier(event) {
  setTerminalLinkModifierHeld(terminalLinkModifierActive(event));
}

const TERMINAL_PATH_LINK_UNRESOLVED_MESSAGE = 'That path is not available in Files';

/**
 * Open a path printed in the terminal in the Files view.
 *
 * The server does the resolving: it owns the mapping from an absolute path to a
 * root, and it reads the session's working directory for a relative one, which
 * is fresher than anything cached here. It answers a flat "not found" for a path
 * outside its approved roots, so a failure here says nothing about the
 * filesystem and is reported quietly — the click was, after all, a guess about
 * arbitrary text.
 */
async function openTerminalPathLink(rawPath) {
  const { path: pathText, line } = splitTerminalLinkPosition(rawPath);
  const query = new URLSearchParams({ path: pathText });
  if (activeSession) {
    query.set('session', activeSession);
  }
  let resolved;
  try {
    resolved = await api(`/api/fs/resolve?${query.toString()}`);
  } catch {
    setStatus(TERMINAL_PATH_LINK_UNRESOLVED_MESSAGE);
    return;
  }
  const isDirectory = resolved.type === 'dir';
  const segments = String(resolved.relativePath || '').split('/');
  const name = segments[segments.length - 1] || '';
  const directory = isDirectory
    ? resolved.relativePath
    : segments.slice(0, -1).join('/');

  closeFilesPreview({ restoreFocus: false });
  filesRootId = resolved.rootId;
  filesPath = directory;
  filesSelectedName = '';
  filesSelectedIndex = -1;
  // Land on the file itself in the listing rather than just its folder.
  filesRestoreSelectionName = isDirectory ? '' : name;
  saveFilesNav();
  // Before setViewMode, which fires its own un-awaited ensureFilesRoots(); that
  // helper has no in-flight guard, so two /api/fs/roots requests would race.
  await ensureFilesRoots();
  setViewMode('files');
  await refreshFilesListing();
  if (isDirectory) {
    return;
  }
  // `refreshFilesListing` falls back to the root when a directory cannot be
  // listed, and `previewFilesTarget` then returns silently because its guard no
  // longer matches — leaving the user somewhere unexpected with no explanation.
  if (filesRootId !== resolved.rootId || filesPath !== directory) {
    setStatus(`Opened ${resolved.rootId} — could not show ${name}`);
    return;
  }
  try {
    await previewFilesTarget({
      root: resolved.rootId,
      path: resolved.relativePath,
      name,
      type: 'file'
    });
  } catch (error) {
    setStatus(error.message || FILES_PREVIEW_FAILED_MESSAGE);
    return;
  }
  if (line) {
    // The preview pane has no line addressing yet, so a `file:12` link opens the
    // right file at the top rather than pretending to jump.
    setStatus(`Opened ${name} (line ${line} not shown)`);
  }
}

// Shared by our own link provider and by xterm's OSC 8 handler, so both honour
// the same gate.
function activateTerminalLink(event, text, kind = 'url') {
  // xterm binds mouseup with no button filter, so the button is checked here:
  // a middle-click paste or a right-click on a link must not also open it.
  //
  // macOS Ctrl+click is settled separately, in terminalLinkModifierActive: the
  // modifier there is Cmd on Apple and Ctrl elsewhere, so Ctrl+click cannot
  // reach this at all on a Mac. This guard still earns its place for
  // middle-click paste and for a right-click landing on a link.
  if ((event.button ?? 0) !== 0) {
    return;
  }
  if (!terminalLinkModifierActive(event)) {
    return;
  }
  if (kind === 'path') {
    void openTerminalPathLink(text);
    return;
  }
  openTerminalUrlLink(text);
}

function openTerminalUrlLink(url) {
  // Terminal output is untrusted — a process can print whatever it likes — so
  // the scheme is re-checked here rather than relying on the match pattern
  // alone. `noopener`/`noreferrer` stop the opened page reaching back into this
  // one, which for an authenticated terminal session matters more than usual.
  if (!/^https?:\/\//i.test(url)) {
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

// xterm asks per buffer row and expects 1-based absolute buffer coordinates,
// which is the space `collectWrappedTerminalLinkLine` already works in.
function provideTerminalLinks(bufferLineNumber, callback) {
  const buffer = terminal?.buffer?.active;
  if (!buffer) {
    callback(undefined);
    return;
  }
  // One cell object reused for every column of every row, and a column map built
  // only if something in that row is actually resolved to buffer coordinates.
  const reusableCell = buffer.getNullCell?.();
  const wrappedLine = collectWrappedTerminalLinkLine(bufferLineNumber, (index) => {
    const line = buffer.getLine(index);
    if (!line) {
      return undefined;
    }
    let columnMap;
    return {
      isWrapped: line.isWrapped,
      translateToString: (trimRight) => line.translateToString(trimRight),
      get columnMap() {
        columnMap ??= terminalLineColumnMap(line, reusableCell);
        return columnMap;
      }
    };
  });
  if (!wrappedLine) {
    callback(undefined);
    return;
  }
  const links = [];
  for (const match of extractTerminalLinks(wrappedLine.text)) {
    const link = {
      range: resolveWrappedTerminalLinkRange(wrappedLine, match),
      text: match.text,
      // Read at hover time by xterm, so it has to reflect the modifier now.
      decorations: {
        pointerCursor: terminalLinkModifierHeld,
        underline: terminalLinkModifierHeld
      },
      activate: (event, text) => activateTerminalLink(event, text, match.kind),
      hover: (event) => {
        hoveredTerminalLink = link;
        // This runs before xterm installs its accessors, so writing decorations
        // now would land on the object it is about to discard; the microtask
        // re-applies once they exist.
        //
        // The flag is only ever *raised* here, never lowered. This event can be
        // stale: xterm re-asks for links when the hovered rows repaint, reusing
        // its last mousemove event, so a session producing output would otherwise
        // report `ctrlKey: false` and strip the decoration while the modifier is
        // physically held. Lowering belongs to keyup and blur, which are live.
        // Raising still covers a modifier held before the window regained focus,
        // where no keydown was ever seen.
        if (terminalLinkModifierActive(event)) {
          terminalLinkModifierHeld = true;
        }
        queueMicrotask(applyTerminalLinkDecorations);
      },
      leave: () => {
        if (hoveredTerminalLink === link) {
          hoveredTerminalLink = null;
        }
      }
    };
    links.push(link);
  }
  callback(links.length > 0 ? links : undefined);
}

// Touch link affordance.
//
// The desktop gesture is Ctrl/Cmd+click, and touch has no modifier. Long-press was
// the obvious alternative but it already means text selection on this terminal, and
// adding a third meaning to it would be worse than the gap. So a tap that lands on a
// link offers a chip instead: the plain tap still positions the cursor and raises
// the keyboard exactly as before, and the chip is a real button, which is also how a
// one-cell-wide link becomes reachable at a proper touch size.
let terminalLinkChipTarget = null;
let terminalLinkChipTimer = null;
let terminalLinkChipSettleUntil = 0;

function hideTerminalLinkChip() {
  if (terminalLinkChipTimer !== null) {
    window.clearTimeout(terminalLinkChipTimer);
    terminalLinkChipTimer = null;
  }
  terminalLinkChipTarget = null;
  if (terminalLinkChip) {
    terminalLinkChip.hidden = true;
  }
}

function terminalLinkAtClientPoint(clientX, clientY) {
  const buffer = terminal?.buffer?.active;
  if (!buffer || !terminalElement) {
    return null;
  }
  const bounds = terminalElement.getBoundingClientRect();
  if (bounds.width <= 0 || bounds.height <= 0) {
    return null;
  }
  const column = Math.min(
    terminal.cols,
    Math.max(
      1,
      Math.floor(((clientX - bounds.left) / bounds.width) * terminal.cols) + 1
    )
  );
  const row = Math.min(
    terminal.rows,
    Math.max(1, Math.floor(((clientY - bounds.top) / bounds.height) * terminal.rows) + 1)
  );
  // Rows are viewport-relative; the link helpers work in absolute buffer lines.
  const bufferLineNumber = buffer.viewportY + row;
  const reusableCell = buffer.getNullCell?.();
  return findTerminalLinkAtCell(bufferLineNumber, column, (index) => {
    const line = buffer.getLine(index);
    if (!line) {
      return undefined;
    }
    let columnMap;
    return {
      isWrapped: line.isWrapped,
      translateToString: (trimRight) => line.translateToString(trimRight),
      get columnMap() {
        columnMap ??= terminalLineColumnMap(line, reusableCell);
        return columnMap;
      }
    };
  });
}

function showTerminalLinkChip(match, clientX, clientY) {
  if (!terminalLinkChip) {
    return;
  }
  terminalLinkChipTarget = match;
  const label = match.kind === 'url' ? 'Open link' : 'Open file';
  terminalLinkChip.textContent = label;
  // The chip carries the whole accessible name; the target text is deliberately
  // left out of it, since a path or URL read aloud in full is noise.
  terminalLinkChip.setAttribute('aria-label', label);
  const margin = 12;
  const x = Math.min(
    Math.max(margin, clientX),
    Math.max(margin, window.innerWidth - margin)
  );
  const y = Math.min(
    Math.max(margin, clientY),
    Math.max(margin, window.innerHeight - margin)
  );
  // Keep it above the soft keyboard. The tap that offers the chip is usually the
  // tap that raises the keyboard, and the chip is positioned in client
  // coordinates, so without this it can be anchored underneath it.
  const visibleBottom = window.visualViewport
    ? window.visualViewport.offsetTop + window.visualViewport.height
    : window.innerHeight;
  const clampedY = Math.min(y, Math.max(margin, visibleBottom - margin));
  terminalLinkChip.style.left = `${Math.round(x)}px`;
  terminalLinkChip.style.top = `${Math.round(clampedY)}px`;
  terminalLinkChip.hidden = false;
  // The keyboard's reflow can move viewportY and so fire onScroll, which would
  // retire the chip that the same tap just offered. Ignore scroll-driven hiding
  // briefly; a deliberate scroll after that still dismisses it.
  terminalLinkChipSettleUntil = window.performance.now() + 700;
  if (terminalLinkChipTimer !== null) {
    window.clearTimeout(terminalLinkChipTimer);
  }
  // Expendable chrome, so it retires on its own rather than lingering over the
  // terminal. Any tap elsewhere hides it sooner.
  terminalLinkChipTimer = window.setTimeout(hideTerminalLinkChip, 4000);
}

/**
 * Offer the chip when a coarse-pointer tap lands on a link. Returns nothing and
 * changes no other behaviour: the caller's normal tap handling continues either way.
 */
function offerTerminalLinkOnTap(clientX, clientY) {
  if (!terminalLinkChip) {
    return;
  }
  // Capability, not user-agent. A device with a fine pointer already has the
  // modifier gesture and does not need this.
  if (window.matchMedia?.('(pointer: fine)').matches) {
    return;
  }
  const match = terminalLinkAtClientPoint(clientX, clientY);
  if (!match) {
    hideTerminalLinkChip();
    return;
  }
  showTerminalLinkChip(match, clientX, clientY);
}

function activateTerminalLinkChip() {
  const match = terminalLinkChipTarget;
  hideTerminalLinkChip();
  if (!match) {
    return;
  }
  if (match.kind === 'path') {
    void openTerminalPathLink(match.text);
    return;
  }
  openTerminalUrlLink(match.text);
}

function installTerminalLinkModifierTracking() {
  // The modifier can be pressed or released while the pointer already rests on a
  // link, which produces no mouse event of its own, so track the keys directly.
  window.addEventListener('keydown', syncTerminalLinkModifier);
  window.addEventListener('keyup', syncTerminalLinkModifier);
  // A held modifier is lost when the window loses focus; leaving the decoration
  // on would promise a click that no longer opens anything.
  window.addEventListener('blur', () => setTerminalLinkModifierHeld(false));
}

// Largest OSC 52 payload we will decode. tmux sends the whole yanked region, so
// this has to allow a screenful of scrollback while still refusing a runaway
// sequence from a process writing to the pty.
const maximumClipboardOscBase64Length = 2 * 1024 * 1024;

function decodeClipboardOscPayload(payload) {
  // OSC 52 is `<targets>;<base64>`; targets are advisory (c, p, s, …) and empty
  // means the default selection, so only the data half matters here.
  const separator = payload.indexOf(';');
  if (separator < 0) {
    return null;
  }
  const encoded = payload.slice(separator + 1).trim();
  // `?` is a clipboard *read* request. Answering it would hand the host
  // clipboard to whatever is running in the pty, so it is swallowed, not served.
  if (!encoded || encoded === '?') {
    return null;
  }
  if (encoded.length > maximumClipboardOscBase64Length) {
    return null;
  }
  if (!/^[A-Za-z0-9+/=]+$/.test(encoded)) {
    return null;
  }
  try {
    const binary = window.atob(encoded);
    const bytes = Uint8Array.from(binary, (character) =>
      character.charCodeAt(0)
    );
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

// tmux is already configured to report copies this way (`set-clipboard
// external` plus the `xterm*:clipboard` terminal feature), and xterm.js has no
// OSC 52 handler of its own, so those copies used to reach tmux's paste buffer
// and stop there. This is also the only copy path that survives a repainting
// TUI, which drops xterm's own selection on redraw.
function handleClipboardOsc(payload) {
  const text = decodeClipboardOscPayload(payload);
  if (!text) {
    // Returning true still consumes the sequence: an unhandled OSC would
    // otherwise be echoed into the terminal as text.
    return true;
  }
  // Mirror first, so the in-app Paste fallback holds it even if the browser
  // refuses the clipboard write below.
  appClipboardText = text;
  if (!navigator.clipboard?.writeText) {
    setStatus('Copied in app — browser clipboard unavailable');
    clientDebug('copy-osc52', { copied: false, length: text.length });
    return true;
  }
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setStatus('Copied');
      clientDebug('copy-osc52', {
        copied: true,
        clipboardOk: true,
        length: text.length
      });
    })
    .catch((error) => {
      // No user gesture drives this path, so a refusal is expected on some
      // browsers; the mirror above keeps Paste working.
      setStatus('Copied in app — browser blocked the clipboard');
      clientDebug('copy-osc52', {
        copied: false,
        clipboardOk: false,
        errorName: error?.name || 'Error',
        length: text.length
      });
    });
  return true;
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

// ---- Start of the pure paste history block. ----
// Written free of DOM and browser globals so it can be sliced out of the shipped
// source for tests, the same way the keyboard transition block is.

const maximumPasteHistoryEntries = 5;
// Each entry keeps enough to paste and to preview. A terminal paste can be huge,
// and the history is not the place to hold a whole file in memory.
const maximumPasteHistoryEntryLength = 4096;
const maximumPastePreviewLength = 48;

/**
 * One line describing an entry without showing it all: the first line truncated,
 * then the real size. Control characters are stripped so a paste carrying escape
 * sequences cannot redraw the popover it is listed in.
 */
function formatPasteEntryPreview(text) {
  const value = typeof text === 'string' ? text : '';
  const lines = value.split('\n');
  // eslint-disable-next-line no-control-regex
  const firstLine = lines[0].replace(/[\u0000-\u001f\u007f]/g, ' ').trim();
  const truncated =
    firstLine.length > maximumPastePreviewLength
      ? `${firstLine.slice(0, maximumPastePreviewLength - 1)}…`
      : firstLine;
  const lineCount = lines.length;
  const detail =
    lineCount > 1
      ? `${lineCount} lines · ${value.length} chars`
      : `${value.length} chars`;
  return {
    // A paste of pure whitespace has no visible first line; say so rather than
    // rendering a blank row that looks like a broken entry.
    label: truncated || '(whitespace)',
    detail
  };
}

/**
 * Newest first, deduplicated by exact text, capped in both count and per-entry
 * size. Holds text only — the caller decides whether it is ever persisted.
 */
function createPasteHistory(limit = maximumPasteHistoryEntries) {
  let entries = [];
  return {
    add(text) {
      if (typeof text !== 'string' || text.length === 0) {
        return null;
      }
      const value = text.slice(0, maximumPasteHistoryEntryLength);
      // Re-pasting the same text moves it to the front rather than adding a
      // second identical row.
      entries = entries.filter((entry) => entry.text !== value);
      const entry = { text: value, truncated: value.length < text.length };
      entries.unshift(entry);
      entries = entries.slice(0, limit);
      return entry;
    },
    entries() {
      return entries.map((entry) => ({ ...entry }));
    },
    size() {
      return entries.length;
    },
    clear() {
      entries = [];
    },
    replaceAll(values) {
      entries = [];
      // Oldest first, so the newest ends up at the front.
      for (const value of [...(values || [])].reverse()) {
        this.add(typeof value === 'string' ? value : value?.text);
      }
      return entries.length;
    }
  };
}
// ---- End of the pure paste history block. ----

// Last text we successfully copied in-app (fallback only when OS clipboard
// cannot be read). Never preferred over a live clipboard image.
let appClipboardText = '';
const pasteHistory = createPasteHistory();
// Prefetch started on pointerdown; may fail — always allow a click retry.
let pasteGesturePayload = null;
let pasteGestureStartedAt = 0;
// A prefetch left pending by a gesture that never became a click must not block
// the next one. On iOS the read stays pending until the native bubble is tapped,
// so this has to outlast a slow human, not a fast one.
const pasteGestureReadStaleMilliseconds = 20000;

function pasteGestureReadIsStale() {
  return (
    window.performance.now() - pasteGestureStartedAt >
    pasteGestureReadStaleMilliseconds
  );
}

async function parseClipboardItems(items) {
  let text = '';
  let imageBlob = null;
  let itemCount = 0;
  // getType() rejects when the activation that authorised read() has expired,
  // which is exactly what happens to a prefetch started on pointerdown. Swallowing
  // that silently made a screenshot look like an empty clipboard, so it is now
  // reported and the caller can retry the one case that deserves it.
  let extractionFailed = false;
  for (const item of items) {
    itemCount += 1;
    if (!text && item.types.includes('text/plain')) {
      try {
        text = await (await item.getType('text/plain')).text();
      } catch {
        extractionFailed = true;
      }
    }
    if (!imageBlob) {
      for (const type of item.types) {
        if (type.startsWith('image/')) {
          try {
            imageBlob = await item.getType(type);
            break;
          } catch {
            extractionFailed = true;
          }
        }
      }
    }
  }
  return {
    text: text || '',
    imageBlob,
    error: null,
    apiOk: true,
    itemCount,
    extractionFailed
  };
}

/**
 * Start at most one clipboard read per gesture.
 *
 * Every clipboard access raises its own native Paste confirmation on iOS
 * Safari, so two accesses mean two bubbles. Two things caused that: this ran
 * from both pointerdown and touchstart, which both fire for one tap on iOS,
 * and readClipboardPayloadBestEffort() used to cascade read() into readText()
 * after a failure. Both are now single-shot.
 */
function beginPasteGestureClipboardRead() {
  if (pasteGesturePayload && !pasteGestureReadIsStale()) {
    return;
  }
  pasteGestureStartedAt = window.performance.now();
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
  // One clipboard access per call, plus a single retry in the one case that
  // needs it: something was on the clipboard and this attempt could not extract
  // it. Each access costs a native Paste confirmation on iOS, so an unconditional
  // fallback chain is a bubble chain — but a screenshot the prefetch could not
  // reach has to be reachable, and that retry is the only way to it.
  let prefetchFailed = false;
  if (pasteGesturePayload) {
    try {
      const result = await pasteGesturePayload;
      if (result.text || result.imageBlob) {
        return {
          text: result.text || '',
          imageBlob: result.imageBlob || null,
          error: result.error || null,
          apiOk: Boolean(result.apiOk)
        };
      }
      // Nothing usable came back. Retry only when the clipboard held something
      // this attempt could not extract — a rejected read, or items whose
      // getType() failed because the pointerdown activation had expired. That is
      // the screenshot case. A read that succeeded and found nothing is an empty
      // clipboard, and asking again just to hear it twice is what doubled the
      // native bubble.
      prefetchFailed =
        !result.apiOk || result.extractionFailed || result.itemCount > 0;
      if (!prefetchFailed) {
        return {
          text: '',
          imageBlob: null,
          error: result.error || null,
          apiOk: Boolean(result.apiOk)
        };
      }
    } catch (err) {
      prefetchFailed = true;
      clientDebug('paste-clipboard-read', { reason: 'prefetch-threw' });
    } finally {
      pasteGesturePayload = null;
    }
  }

  // No prefetch — this call is the gesture. read() covers text and images in one
  // access; readText() is only used where read() does not exist at all, never as
  // a retry after it fails.
  if (navigator.clipboard?.read) {
    try {
      return await parseClipboardItems(await navigator.clipboard.read());
    } catch (err) {
      clientDebug('paste-clipboard-read', { reason: 'read-failed' });
      return {
        text: '',
        imageBlob: null,
        error: String(err?.message || err).slice(0, 80),
        apiOk: false
      };
    }
  }

  if (navigator.clipboard?.readText) {
    try {
      return {
        text: (await navigator.clipboard.readText()) || '',
        imageBlob: null,
        error: null,
        apiOk: true
      };
    } catch (err) {
      return {
        text: '',
        imageBlob: null,
        error: String(err?.message || err).slice(0, 80),
        apiOk: false
      };
    }
  }

  return {
    text: '',
    imageBlob: null,
    error: 'clipboard-api-missing',
    apiOk: false
  };
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

// Set when Ctrl/Cmd+V let the browser's own paste proceed, so a browser that
// does not deliver a paste event still gets the direct clipboard read.
let nativePasteFallbackTimer = null;

function expectNativePasteEvent() {
  cancelNativePasteFallback();
  nativePasteFallbackTimer = window.setTimeout(() => {
    nativePasteFallbackTimer = null;
    void pasteClipboard();
  }, 200);
}

function cancelNativePasteFallback() {
  if (nativePasteFallbackTimer) {
    window.clearTimeout(nativePasteFallbackTimer);
    nativePasteFallbackTimer = null;
  }
}

// The browser's own paste carries text *and* images in clipboardData, with no
// permission prompt and no async read the browser can refuse — the async
// Clipboard API's `read()` is what fails for a desktop screenshot, leaving the
// text-only fallback to report an empty clipboard.
//
// Registered on the terminal container in the capture phase so it runs before
// xterm's own textarea paste listener, which would otherwise insert the text a
// second time.
function handleTerminalPasteEvent(event) {
  const data = event.clipboardData;
  if (!data || !terminal || socket?.readyState !== WebSocket.OPEN) {
    return;
  }
  cancelNativePasteFallback();
  const text = data.getData('text/plain') || '';
  let imageBlob = null;
  for (const item of data.items || []) {
    if (item.kind === 'file' && item.type?.startsWith('image/')) {
      imageBlob = item.getAsFile();
      if (imageBlob) {
        break;
      }
    }
  }
  if (!text && !imageBlob) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  // Text wins when both are present, matching the button path; a screenshot
  // arrives image-only.
  if (text) {
    insertPastedText(text);
    return;
  }
  void pasteImageBlob(imageBlob);
}

function insertPastedText(text) {
  const pasted = text.slice(0, maximumPasteLength);
  clearTerminalSelection();
  setCtrlArmed(false);
  // Prefer xterm's paste: it wraps the text in bracketed-paste markers when the
  // running application asked for them, which is what keeps a multi-line paste
  // one block instead of a line-by-line submission. Its output reaches the
  // socket through onData, so raw sending is only the fallback.
  if (terminal?.paste) {
    terminal.paste(pasted);
  } else {
    sendInput(pasted);
  }
  // Remember what was actually pasted, so the history matches what the terminal
  // received rather than what the clipboard held.
  pasteHistory.add(pasted);
  savePasteHistoryIfOptedIn();
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

  // Last resort: text we copied earlier in this app — but only when the OS
  // clipboard could not be read at all. A successful read that returned nothing
  // means the clipboard holds something this browser will not hand over (a
  // desktop screenshot, when `read()` is unavailable or refused), and inserting
  // unrelated older text into a live shell prompt is worse than pasting
  // nothing.
  if (appClipboardText && error) {
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

// ---- Paste history popover ----

/**
 * Persistence is opt-in and off by default. A terminal paste buffer is where
 * tokens and passwords go, and entries in localStorage outlive the tab and are
 * readable by anything running on this origin.
 */
function pasteHistoryPersistEnabled() {
  if (qaShellMode) {
    return false;
  }
  try {
    return window.localStorage.getItem(pasteHistoryPersistStorageKey) === '1';
  } catch {
    return false;
  }
}

function savePasteHistoryIfOptedIn() {
  if (!pasteHistoryPersistEnabled()) {
    return;
  }
  try {
    window.localStorage.setItem(
      pasteHistoryStorageKey,
      JSON.stringify(pasteHistory.entries().map((entry) => entry.text))
    );
  } catch {
    // Continue without persistence.
  }
}

function restorePasteHistoryIfOptedIn() {
  if (!pasteHistoryPersistEnabled()) {
    return;
  }
  try {
    const raw = window.localStorage.getItem(pasteHistoryStorageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      pasteHistory.replaceAll(parsed);
    }
  } catch {
    // Leave the history empty.
  }
}

function clearPasteHistory() {
  pasteHistory.clear();
  try {
    window.localStorage.removeItem(pasteHistoryStorageKey);
  } catch {
    // Nothing to remove.
  }
  closePasteHistoryPopover();
  setStatus('Paste history cleared');
}

function setPasteHistoryPersist(enabled) {
  try {
    if (enabled) {
      window.localStorage.setItem(pasteHistoryPersistStorageKey, '1');
      savePasteHistoryIfOptedIn();
    } else {
      window.localStorage.removeItem(pasteHistoryPersistStorageKey);
      window.localStorage.removeItem(pasteHistoryStorageKey);
    }
  } catch {
    // Continue without persistence.
  }
}

function pasteHistoryPopoverIsOpen() {
  return Boolean(pasteHistoryElement && !pasteHistoryElement.hidden);
}

function closePasteHistoryPopover() {
  if (!pasteHistoryElement || pasteHistoryElement.hidden) {
    return;
  }
  pasteHistoryElement.hidden = true;
  pasteHistoryElement.replaceChildren();
  pasteButton?.setAttribute('aria-expanded', 'false');
}

function createPasteHistoryItem(label, detail, onChoose) {
  const item = document.createElement('button');
  item.type = 'button';
  item.className = 'paste-popover-item';
  item.setAttribute('role', 'menuitem');
  const labelElement = document.createElement('span');
  labelElement.className = 'paste-popover-label';
  // textContent, never innerHTML: an entry is terminal text, not markup.
  labelElement.textContent = label;
  item.append(labelElement);
  if (detail) {
    const detailElement = document.createElement('span');
    detailElement.className = 'paste-popover-detail';
    detailElement.textContent = detail;
    item.append(detailElement);
  }
  item.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    onChoose();
  });
  return item;
}

function positionPasteHistoryPopover() {
  if (!pasteHistoryElement || !pasteButton) {
    return;
  }
  const anchor = pasteButton.getBoundingClientRect();
  const width = pasteHistoryElement.offsetWidth;
  const margin = 12;
  const maximumLeft = Math.max(margin, window.innerWidth - width - margin);
  pasteHistoryElement.style.left = `${Math.min(Math.max(anchor.left, margin), maximumLeft)}px`;
  pasteHistoryElement.style.bottom = `${Math.max(margin, window.innerHeight - anchor.top + 8)}px`;
}

function openPasteHistoryPopover() {
  if (!pasteHistoryElement) {
    return;
  }
  pasteHistoryElement.replaceChildren();
  const heading = document.createElement('div');
  heading.className = 'paste-popover-heading';
  // Named for what it is. Something copied in another app is legitimately
  // absent, and without this label that reads as a bug.
  heading.textContent = 'Pasted in this app';
  pasteHistoryElement.append(heading);

  // The system clipboard cannot be previewed on iOS without reading it, and a
  // read needs a user gesture. A menu-item tap is its own gesture, so the read
  // happens on tap and this row stays unlabelled until then.
  pasteHistoryElement.append(
    createPasteHistoryItem('Clipboard', 'read on tap', () => {
      closePasteHistoryPopover();
      void pasteClipboard();
    })
  );

  for (const entry of pasteHistory.entries()) {
    const preview = formatPasteEntryPreview(entry.text);
    pasteHistoryElement.append(
      createPasteHistoryItem(preview.label, preview.detail, () => {
        closePasteHistoryPopover();
        insertPastedText(entry.text);
      })
    );
  }

  const footer = document.createElement('div');
  footer.className = 'paste-popover-footer';
  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.textContent = 'Clear';
  clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    clearPasteHistory();
  });
  const persistButton = document.createElement('button');
  persistButton.type = 'button';
  const persisted = pasteHistoryPersistEnabled();
  persistButton.textContent = persisted ? 'Keep: on' : 'Keep: off';
  persistButton.title = persisted
    ? 'Stop keeping paste history after this tab closes'
    : 'Keep paste history after this tab closes';
  persistButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPasteHistoryPersist(!persisted);
    openPasteHistoryPopover();
  });
  footer.append(clearButton, persistButton);
  pasteHistoryElement.append(footer);

  pasteHistoryElement.hidden = false;
  pasteButton?.setAttribute('aria-expanded', 'true');
  positionPasteHistoryPopover();
}

async function pasteOrCopyClipboard() {
  if (terminalHasCopyableSelection()) {
    pasteGesturePayload = null;
    closePasteHistoryPopover();
    await copyTerminalSelection({ source: 'button' });
    return;
  }
  if (pasteHistoryPopoverIsOpen()) {
    closePasteHistoryPopover();
    return;
  }
  // With nothing in the history there is no choice to offer, so Paste still
  // pastes. The popover only appears once picking one is a real decision.
  if (pasteHistory.size() === 0) {
    await pasteClipboard();
    return;
  }
  openPasteHistoryPopover();
}

/**
 * Put the keyboard back after a long press that took it away.
 *
 * Must be called from inside a touchend or click handler: iOS only reopens the
 * soft keyboard for a focus() that happens during a user gesture, and ignores
 * one that does not.
 */
function restoreTerminalFocusAfterSelection() {
  if (!terminalFocusedBeforeSelection) {
    return;
  }
  terminalFocusedBeforeSelection = false;
  terminal?.focus();
}

async function handleSelectionCopyChipClick(event) {
  event.preventDefault();
  event.stopPropagation();
  if (!terminalHasCopyableSelection()) {
    hideSelectionCopyChip();
    return;
  }
  await copyTerminalSelection({ clearAfter: true, source: 'chip' });
  restoreTerminalFocusAfterSelection();
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
  recordKeyboardTransition('find-focus');
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
    recordKeyboardTransition('find-blur');
    releaseKeyboardLayoutLock();
  } else {
    recordKeyboardTransition('find-blur-held');
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
// Chrome-focused chords. xterm's own handler owns keys while the terminal has
// focus, so this returns early there rather than resolving the same binding twice.
// Registered before the hardware bridge so a binding that fires marks the event
// handled and the bridge's defaultPrevented check skips it.
document.addEventListener(
  'keydown',
  (event) => {
    if (event.defaultPrevented || terminalInputIsFocused()) {
      return;
    }
    runMatchingKeybinding(event);
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
filesOptionTerminal?.addEventListener('click', () => {
  closeFilesOptions();
  setViewMode('term');
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
// Tapping away dismisses. Bound on pointerdown so it closes before the tap
// reaches the terminal, and armed only while the popover is actually open.
document.addEventListener(
  'pointerdown',
  (event) => {
    if (!pasteHistoryPopoverIsOpen()) {
      return;
    }
    if (
      pasteHistoryElement?.contains(event.target) ||
      pasteButton?.contains(event.target)
    ) {
      return;
    }
    closePasteHistoryPopover();
  },
  { capture: true }
);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && pasteHistoryPopoverIsOpen()) {
    closePasteHistoryPopover();
    pasteButton?.focus();
  }
});
// The popover is position:fixed against the button's rect, so it has to move
// when the footer does — a keyboard open is the common case.
window.addEventListener('resize', () => {
  if (pasteHistoryPopoverIsOpen()) {
    positionPasteHistoryPopover();
  }
});
window.visualViewport?.addEventListener('resize', () => {
  if (pasteHistoryPopoverIsOpen()) {
    positionPasteHistoryPopover();
  }
});
restorePasteHistoryIfOptedIn();
installViewSwipeGestures();
terminalLinkChip?.addEventListener('click', activateTerminalLinkChip);
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
commandPaletteClose?.addEventListener('click', () => closeCommandPalette());
commandPaletteInput?.addEventListener('input', () => {
  // A new query invalidates the old selection, so start from the top.
  commandPaletteIndex = 0;
  renderCommandPalette();
});
commandPaletteInput?.addEventListener('keydown', (event) => {
  if (event.isComposing) {
    return;
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveCommandPaletteSelection(1);
    return;
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveCommandPaletteSelection(-1);
    return;
  }
  if (event.key === 'Home') {
    event.preventDefault();
    commandPaletteIndex = commandPaletteVisible.length > 0 ? 0 : -1;
    syncCommandPaletteSelection();
    return;
  }
  if (event.key === 'End') {
    event.preventDefault();
    commandPaletteIndex = commandPaletteVisible.length - 1;
    syncCommandPaletteSelection();
    return;
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    runCommandPaletteSelection();
  }
});
// Escape and the backdrop both reach this: a modal dialog's own cancel handles
// Escape, and a click that lands on the dialog element itself is a click on the
// backdrop rather than on any option.
commandPaletteDialog?.addEventListener('click', (event) => {
  if (event.target !== commandPaletteDialog) {
    return;
  }
  // A click on the dialog's own padding also targets the dialog, so identity alone
  // would treat part of the visible card as "outside". Compare against its box.
  const bounds = commandPaletteDialog.getBoundingClientRect();
  const outside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;
  if (outside) {
    closeCommandPalette();
  }
});
commandPaletteDialog?.addEventListener('close', () => {
  commandPaletteVisible = [];
  commandPaletteIndex = -1;
  const target = commandPaletteReturnFocus;
  commandPaletteReturnFocus = null;
  try {
    target?.focus({ preventScroll: true });
  } catch {
    // A control that vanished while the palette was open is not worth failing on.
  }
});
quickMenuViewButton?.addEventListener('click', () => {
  const next = viewMode === 'files' ? 'term' : 'files';
  closeQuickMenu();
  setViewMode(next);
});
quickMenuFindButton?.addEventListener('click', () => {
  closeQuickMenu();
  openFindBar();
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
document
  .querySelector('#keyboard-debug-refresh')
  ?.addEventListener('click', () => {
    renderKeyboardTransitionDump();
  });
document.querySelector('#keyboard-debug-copy')?.addEventListener('click', () => {
  // Copies the text built at render time. Re-rendering first would fold this
  // gesture's own focus changes into what gets copied.
  const text = lastKeyboardTransitionDumpText;
  if (!text) {
    setStatus('Nothing to copy');
    return;
  }
  if (writeTextToClipboardLegacy(text)) {
    setStatus('Dump copied');
    return;
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(
      () => setStatus('Dump copied'),
      () => setStatus('Copy failed — select the dump and copy manually')
    );
    return;
  }
  setStatus('Copy failed — select the dump and copy manually');
});
document
  .querySelector('#keyboard-debug-clear')
  ?.addEventListener('click', () => {
    keyboardTransitionLog.clear();
    renderKeyboardTransitionDump();
    setStatus('Transitions cleared');
  });
document.querySelector('#settings').addEventListener('click', openQuickMenu);
headerSettingsButton?.addEventListener('click', openQuickMenu);
document.querySelector('#settings-close').addEventListener('click', () => {
  settingsDialogElement.close();
});
installDialogBackdropDismiss(settingsDialogElement, () => {
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
  // Rotation and keyboard open/close both land here. Recorded before any of the
  // geometry runs, so a rotate-while-open is visible as its own transition.
  // Orientation decides where the Files nav lives.
  syncFilesNavPlacement();
  recordKeyboardTransition('viewport-geometry-change');
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
  // Deliberately not instrumented. recordKeyboardTransition() reads clientHeight
  // through keyboardViewportIsReduced(), and this branch runs every frame while a
  // finger is down — the one place the comment above forbids extra layout work.
  // The gesture's own transitions (selection-viewport-lock, selection-change)
  // already show that a touch is in progress.
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
    recordKeyboardTransition('viewport-dismiss-follow');
    applyRestingAppHeight({ force: true });
    updateEffectiveSafeAreaInsets();
    pinPageToOrigin();
    scheduleFit();
    return;
  }
  // One layout read for the whole frame; keyboardViewportIsReduced() reads
  // clientHeight and three branches below need the answer.
  const keyboardReduced = keyboardViewportIsReduced();
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
    // A copy is about to put the keyboard back. Releasing here drops the frozen
    // height for the frame or two before focus returns, and the keyboard then
    // freezes it again — the jump. Paste never hit this because it restores focus
    // inside the same touchend, so terminalInputIsFocused() is already true by
    // the time this branch is evaluated; copy restores on a later tap.
    !terminalFocusedBeforeSelection &&
    !keyboardReduced
  ) {
    recordKeyboardTransition('viewport-release-stale-lock');
    releaseKeyboardLayoutLock();
    return;
  }
  // The whole conjunction, evaluated on every viewport frame. When the UI stops
  // reacting this folds into one entry whose blockedBy names the flag that is
  // stuck, which is the reading the ticket is after.
  //
  // Skipped when no flag moved since the previous entry: a live session showed
  // this duplicating the terminal-focus and viewport-geometry-change entries it
  // follows, twice per keyboard open, for no added information.
  recordKeyboardTransition('viewport-evaluate', null, {
    skipIfFlagsUnchanged: true
  });
  const { open: keyboardOpen, capture: shouldFreezeKeyboardLayout } =
    keyboardOpenDecision({
      selectionLock: Boolean(selectionViewportLock),
      layoutLock: Boolean(keyboardLayoutLock),
      dismissing: keyboardDismissing,
      keyboardReduced
    });
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
    recordKeyboardTransition('viewport-resting');
    applyRestingAppHeight();
    scheduleFit();
    return;
  }
  // Prefer a frozen keyboard layout. Tracking visualViewport.offsetTop makes
  // the entire chrome slide when iOS tries to pan under an open keyboard.
  // Neither terminal focus nor find focus counts on its own — the viewport has
  // to be reduced first, or this freezes the full height (T18).
  if (shouldFreezeKeyboardLayout) {
    const step = keyboardSettleStep(
      keyboardSettleState,
      // The same source captureKeyboardLayoutLock() freezes, so the height that
      // settles is the height that gets frozen.
      currentVisualViewportGeometry().height,
      window.performance.now()
    );
    keyboardSettleState = step.state;
    if (step.settled) {
      captureKeyboardLayoutLock();
    } else {
      // Still rising. Look again next frame rather than freezing a height the
      // keyboard is about to move past, and leave --app-height exactly as it is
      // meanwhile. Falling through would apply the live viewport height on every
      // frame of the animation, which refits the terminal repeatedly and is the
      // jump this is meant to remove. The page still gets pinned, because iOS
      // will otherwise pan it under the rising keyboard.
      recordKeyboardTransition('capture-waiting', null, {
        skipIfFlagsUnchanged: true
      });
      scheduleVisualViewportUpdate();
      window.scrollTo(0, 0);
      return;
    }
  } else if (keyboardLayoutLock || !keyboardOpen) {
    keyboardSettleState = null;
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
