(function () {
  'use strict';

  var COOKIE_NAME = 'cb_consent';
  var COOKIE_DAYS = 365;

  function setCookie(name, value, days) {
    var expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) +
      '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  function getCookie(name) {
    var match = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
    return match ? decodeURIComponent(match[1]) : null;
  }

  // Don't show if already consented
  if (getCookie(COOKIE_NAME)) return;

  var banner    = document.getElementById('cookie-banner');
  var btnClose  = document.getElementById('cb-close');
  var btnAccept = document.getElementById('cb-accept');
  var btnDeny   = document.getElementById('cb-deny');
  var btnManage = document.getElementById('cb-manage');
  var settings  = document.getElementById('cb-settings');
  var settingsOpen = false;

  // Global functions для платформы
  window.showCookieBanner = function () {
    banner.hidden = false;
    setTimeout(function () { banner.classList.add('is-visible'); }, 10);
  };
  window.hideCookieBanner = function () {
    banner.classList.remove('is-visible');
    setTimeout(function () { banner.hidden = true; }, 400);
  };

  // Show
  setTimeout(function () { banner.classList.add('is-visible'); }, 300);

  function save(prefs) {
    setCookie(COOKIE_NAME, JSON.stringify(prefs), COOKIE_DAYS);
    banner.classList.remove('is-visible');
    setTimeout(function () { banner.hidden = true; }, 400);
  }

  // Accept All
  btnAccept.addEventListener('click', function () {
    if (settingsOpen) {
      // Save current toggles selection
      save({
        necessary:   true,
        preferences: document.getElementById('cb-pref').checked,
        statistics:  document.getElementById('cb-stat').checked,
        marketing:   document.getElementById('cb-mkt').checked
      });
    } else {
      save({ necessary: true, preferences: true, statistics: true, marketing: true });
    }
  });

  // Essential Only
  btnDeny.addEventListener('click', function () {
    save({ necessary: true, preferences: false, statistics: false, marketing: false });
  });

  // Close = Essential Only
  btnClose.addEventListener('click', function () {
    save({ necessary: true, preferences: false, statistics: false, marketing: false });
  });

  // Toggle settings panel
  btnManage.addEventListener('click', function () {
    settingsOpen = !settingsOpen;
    settings.hidden = !settingsOpen;
    btnManage.textContent = settingsOpen ? 'Hide settings' : 'Manage my cookies';
    btnAccept.querySelector('svg').style.display = settingsOpen ? 'none' : '';
    btnAccept.childNodes[0].textContent = settingsOpen ? 'Save selection ' : 'Accept All ';
  });

})();
