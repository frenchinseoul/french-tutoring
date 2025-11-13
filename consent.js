(function () {
  var GA_ID = 'G-CJ2R92X66J';
  var STORAGE_KEY = 'fis-consent';
  var banner;
  var gaLoaded = false;
  var storedState = getStoredState();

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  if (storedState === 'granted') {
    applyAnalyticsConsent(true);
    loadGA();
  } else if (storedState === 'denied') {
    applyAnalyticsConsent(false);
  } else {
    showBanner();
  }

  attachManageButtons();

  function attachManageButtons() {
    document.querySelectorAll('[data-consent-open]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showBanner(true);
      });
    });
  }

  function showBanner(isManage) {
    if (banner) {
      banner.classList.add('is-visible');
      if (isManage) {
        banner.querySelector('.consent-banner__title').textContent = 'Update your cookie preference';
      }
      return;
    }
    var heading = isManage ? 'Update your cookie preference' : 'Allow analytics cookies?';
    banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.innerHTML = [
      '<div class="consent-banner__content">',
      '  <h3 class="consent-banner__title">' + heading + '</h3>',
      '  <p>We use Google Analytics 4 to understand which lessons people read. No ads are served, and nothing loads until you choose. You can change your mind anytime.</p>',
      '  <div class="consent-banner__actions">',
      '    <button type="button" class="btn btn-outline" data-consent-decline>Decline</button>',
      '    <button type="button" class="btn btn-white" data-consent-accept>Accept analytics</button>',
      '  </div>',
      '  <p class="consent-banner__links">',
      '    <a href="https://french-in-seoul.com/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a>',
      '  </p>',
      '</div>'
    ].join('');
    document.body.appendChild(banner);
    requestAnimationFrame(function () {
      banner.classList.add('is-visible');
    });
    banner.querySelector('[data-consent-accept]').addEventListener('click', function () {
      saveState('granted');
      applyAnalyticsConsent(true);
      loadGA();
      hideBanner();
    });
    banner.querySelector('[data-consent-decline]').addEventListener('click', function () {
      saveState('denied');
      applyAnalyticsConsent(false);
      hideBanner();
    });
  }

  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('is-visible');
  }

  function applyAnalyticsConsent(accepted) {
    window.gtag('consent', 'update', {
      analytics_storage: accepted ? 'granted' : 'denied'
    });
  }

  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    script.onload = function () {
      window.gtag('js', new Date());
      window.gtag('config', GA_ID);
    };
    document.head.appendChild(script);
  }

  function saveState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, state);
    } catch (err) {
      // noop; storage might be unavailable
    }
  }

  function getStoredState() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }
})();
