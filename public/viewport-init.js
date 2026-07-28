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
