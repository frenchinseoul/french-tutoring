// Registers the service worker that precaches key assets for faster repeat visits,
// but skips registration on 127.0.0.1.
if ('serviceWorker' in navigator && location.hostname !== '127.0.0.1') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch(() => {
        // Best-effort; ignore failures to avoid blocking page load.
      });
  });
}
