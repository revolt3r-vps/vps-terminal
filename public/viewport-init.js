'use strict';

/*
 * Run before CSS so iOS standalone mode gets the correct viewport policy on
 * first paint. This file must stay external because production CSP forbids
 * inline scripts.
 */
try {
  const meta = document.querySelector('meta[name="viewport"]');
  if (meta) {
    const cover = 'width=device-width, initial-scale=1, viewport-fit=cover';
    const inset =
      'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no';
    const installed =
      window.navigator.standalone === true ||
      (window.matchMedia &&
        (window.matchMedia('(display-mode: standalone)').matches ||
          window.matchMedia('(display-mode: fullscreen)').matches));
    const useCover = !installed;
    meta.setAttribute('content', useCover ? cover : inset);
    document.documentElement.classList.toggle('viewport-cover', useCover);
    document.documentElement.classList.toggle('viewport-no-cover', !useCover);
    document.documentElement.dataset.displayMode = installed
      ? 'standalone'
      : 'browser';
  }
} catch {
  // app.js repeats the policy after load.
}

/*
 * Apply the stored theme before first paint.
 *
 * app.js runs after the first frame, so without this a light theme flashed the
 * built-in dark one. Setting only the html background was not enough: :root defines
 * dark defaults for every theme token and `body` paints `var(--surface)`, so the body
 * covered it. applyAppTheme caches the handful of resolved tokens that decide the
 * first frame; this only reads them, so there is no second copy of the palette or its
 * derivations to drift.
 *
 * Everything is validated before use. It comes from browser storage, which any script
 * on the origin can write.
 */
try {
  const raw = window.localStorage.getItem('vps-terminal-theme-paint');
  const cached = raw ? JSON.parse(raw) : null;
  const vars = cached && typeof cached.vars === 'object' ? cached.vars : null;
  if (vars) {
    const root = document.documentElement;
    const isColor = (value) => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
    for (const name of Object.keys(vars)) {
      // Only names this app owns, and only literal colours.
      if (/^--[a-z-]+$/.test(name) && isColor(vars[name])) {
        root.style.setProperty(name, vars[name]);
      }
    }
    if (isColor(vars['--surface'])) {
      root.style.backgroundColor = vars['--surface'];
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', vars['--surface']);
    }
    if (isColor(vars['--text'])) {
      root.style.color = vars['--text'];
    }
    if (cached.scheme === 'light' || cached.scheme === 'dark') {
      root.style.colorScheme = cached.scheme;
    }
  }
} catch {
  // No storage, unparseable cache, or a blocked read: the built-in colours stand.
}
