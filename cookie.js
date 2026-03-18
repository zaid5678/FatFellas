(function() {
  if (localStorage.getItem('ff_cookie_accepted')) return;

  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = '<p>🍪 We use cookies to make your experience tastier. By using this site, you agree to our use of cookies.</p><div class="cookie-btns"><button id="cookie-accept" class="btn btn-red">Got it</button><a href="#" class="cookie-learn">Learn More</a></div>';
  document.body.appendChild(banner);
  document.body.classList.add('cookie-visible');

  document.getElementById('cookie-accept').addEventListener('click', function() {
    localStorage.setItem('ff_cookie_accepted', '1');
    banner.classList.add('cookie-hide');
    document.body.classList.remove('cookie-visible');
    setTimeout(function() { banner.remove(); }, 400);
  });
})();
