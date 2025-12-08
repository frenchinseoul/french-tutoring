(function(){
  var MEASUREMENT_ID = 'G-CJ2R92X66J';
  var STORAGE_KEY = 'ga_consent_choice';
  var CONSENT_GRANTED = 'granted';
  var CONSENT_DENIED = 'denied';
  var banner = null;

  function getStoredConsent(){
    try { return localStorage.getItem(STORAGE_KEY); }
    catch (e) { return null; }
  }

  function setStoredConsent(value){
    try { localStorage.setItem(STORAGE_KEY, value); }
    catch (e) { /* storage unavailable */ }
  }

  function updateConsent(value){
    if (typeof gtag !== 'function') return;
    gtag('consent','update',{
      ad_storage:value,
      ad_user_data:value,
      ad_personalization:value,
      analytics_storage:value
    });
  }

  function bootAnalytics(){
    if (window.__gaInitialized) return;
    if (typeof gtag !== 'function') return;
    window.__gaInitialized = true;
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID, {
      anonymize_ip:true,
      allow_google_signals:false,
      allow_ad_personalization_signals:false
    });
  }

  function applyChoice(value){
    setStoredConsent(value);
    updateConsent(value);
    if (value === CONSENT_GRANTED) bootAnalytics();
    hideBanner();
  }

  function hideBanner(){
    if (!banner) return;
    banner.classList.remove('is-visible');
    setTimeout(function(){
      if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
      banner = null;
    }, 180);
  }

  function showBanner(){
    if (!document.body) return;
    banner = document.createElement('section');
    banner.className = 'consent-banner';
    banner.setAttribute('role','dialog');
    banner.setAttribute('aria-label','Cookie consent');
    banner.innerHTML = ''
      + '<p class=\"consent-banner__title\">쿠키 사용에 동의하시나요?</p>'
      + '<p style=\"margin:6px 0 0; line-height:1.5; color:#374151\">사이트 개선을 위해 Google Analytics를 사용합니다. 동의하시면 분석 쿠키가 설정됩니다.</p>'
      + '<div class=\"consent-banner__actions\">'
      + '  <button type=\"button\" class=\"btn btn-outline\" data-consent-reject>거부</button>'
      + '  <button type=\"button\" class=\"btn\" data-consent-accept>동의</button>'
      + '</div>'
      + '<p class=\"consent-banner__links\">'
      + '  <a href=\"https://french-in-seoul.com/개인정보-처리방침/\" target=\"_blank\" rel=\"noopener\">개인정보 처리방침</a>'
      + '</p>';
    document.body.appendChild(banner);
    setTimeout(function(){ banner.classList.add('is-visible'); }, 20);

    var acceptBtn = banner.querySelector('[data-consent-accept]');
    var rejectBtn = banner.querySelector('[data-consent-reject]');
    if (acceptBtn) acceptBtn.addEventListener('click', function(){ applyChoice(CONSENT_GRANTED); });
    if (rejectBtn) rejectBtn.addEventListener('click', function(){ applyChoice(CONSENT_DENIED); });
  }

  var storedChoice = getStoredConsent();
  if (storedChoice === CONSENT_GRANTED){
    updateConsent(CONSENT_GRANTED);
    bootAnalytics();
    return;
  }
  if (storedChoice === CONSENT_DENIED){
    updateConsent(CONSENT_DENIED);
    return;
  }

  showBanner();
})();
