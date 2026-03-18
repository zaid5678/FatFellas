/* ============================================
   FAT FELLAS — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- CURRENT PAGE NAV HIGHLIGHT ---- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('href') === page) l.classList.add('current');
  });


  /* ---- NAV: SCROLL SHADOW ---- */
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });


  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on nav link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on backdrop click
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }


  /* ---- INTERSECTION OBSERVER: FADE-UP + POLAROIDS ---- */
  const fadeEls    = document.querySelectorAll('.fade-up');
  const polaroids  = document.querySelectorAll('.polaroid');
  const allReveal  = [...fadeEls, ...polaroids];

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    allReveal.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    allReveal.forEach(el => el.classList.add('visible'));
  }


  /* ---- ACTIVE NAV LINK HIGHLIGHT (scroll-spy for single-page) ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if ('IntersectionObserver' in window && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const matches = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', matches);
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => sectionObserver.observe(s));
  }


  /* ---- BOOKING FORM: BOOK AGAIN BUTTON ---- */
  const bookAgainBtn = document.getElementById('book-again');
  const formSuccess  = document.querySelector('.form-success');
  const bookingForm  = document.querySelector('.booking-form');

  if (bookAgainBtn && formSuccess && bookingForm) {
    bookAgainBtn.addEventListener('click', () => {
      formSuccess.style.display = 'none';
      formSuccess.classList.remove('visible');
      bookingForm.style.display = 'block';
      bookingForm.style.opacity = '1';
      bookingForm.style.transform = '';
      bookingForm.reset();
      const submitBtn = bookingForm.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'LOCK IT IN \u2192';
        submitBtn.disabled = false;
      }
      bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }


  /* ---- GALLERY: DRAG TO SCROLL ---- */
  const galleryScroll = document.querySelector('.gallery-scroll-area');

  if (galleryScroll) {
    let isDown  = false;
    let startX;
    let scrollLeft;

    galleryScroll.addEventListener('mousedown', e => {
      isDown = true;
      galleryScroll.classList.add('grabbing');
      startX    = e.pageX - galleryScroll.offsetLeft;
      scrollLeft = galleryScroll.scrollLeft;
    });

    galleryScroll.addEventListener('mouseleave', () => {
      isDown = false;
      galleryScroll.classList.remove('grabbing');
    });

    galleryScroll.addEventListener('mouseup', () => {
      isDown = false;
      galleryScroll.classList.remove('grabbing');
    });

    galleryScroll.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - galleryScroll.offsetLeft;
      const walk = (x - startX) * 1.4;
      galleryScroll.scrollLeft = scrollLeft - walk;
    });
  }


  /* ---- COMIC BUBBLES: CSS VAR ROTATION FIX ---- */
  // Set floating keyframe rotation to match inline transform
  const boom = document.querySelector('.boom');
  const pow  = document.querySelector('.pow');
  const yum  = document.querySelector('.yum');

  if (boom) boom.style.setProperty('--rot', '8deg');
  if (pow)  pow.style.setProperty('--rot', '-10deg');
  if (yum)  yum.style.setProperty('--rot', '5deg');

});
