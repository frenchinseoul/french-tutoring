// Registers the service worker that precaches key assets for faster repeat visits.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .catch(() => {
        // Best-effort; ignore failures to avoid blocking page load.
      });
  });
}
