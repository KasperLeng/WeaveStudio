const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
const navLinks = document.querySelectorAll('.site-nav__link[data-section]');
const sections = document.querySelectorAll('[data-nav-section]');
const filterButtons = document.querySelectorAll('.filters .pill');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');

/**
 * Deliver form submissions to your inbox:
 * 1. Create a form at https://formspree.io (free tier) and set the notification email to kasperleng@gmail.com.
 * 2. Add the form URL to `.env` as VITE_CONTACT_FORM_URL (e.g. https://formspree.io/f/abcdefgh).
 * 3. Rebuild / restart `npm run dev` so Vite injects the variable.
 *
 * Until that URL is set, submit only shows the success message locally — nothing is emailed.
 */
const CONTACT_FORM_URL = import.meta.env.VITE_CONTACT_FORM_URL?.trim() || '';

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const match = link.getAttribute('data-section') === sectionId;
    link.classList.toggle('is-active', match);
  });
}

function closeMobileNav() {
  if (!header || !navToggle) return;
  header.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
}

if (navToggle && header && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = header.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  siteNav.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 767px)').matches) {
        closeMobileNav();
      }
    });
  });

  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 767px)').matches) {
      closeMobileNav();
    }
  });
}

const observerOptions = {
  root: null,
  threshold: 0.4,
};

let currentSection = '';

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('data-nav-section');
    if (id && id !== currentSection) {
      currentSection = id;
      setActiveNav(id);
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener('load', () => {
  const visible = [...sections].find((el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.25;
  });
  if (visible) {
    const id = visible.getAttribute('data-nav-section');
    if (id) setActiveNav(id);
  }
});

function applyFilter(genre) {
  projectCards.forEach((card) => {
    const g = card.getAttribute('data-genre');
    const show = genre === 'all' || g === genre;
    card.classList.toggle('is-dimmed', !show);
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const genre = btn.getAttribute('data-filter') || 'all';
    filterButtons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('pill--active', active);
      b.setAttribute('aria-selected', String(active));
    });
    applyFilter(genre);
  });
});

function updateContactSubmitState() {
  const submitBtn = document.getElementById('contact-submit');
  const nameEl = document.getElementById('contact-name');
  const emailEl = document.getElementById('contact-email');
  const messageEl = document.getElementById('contact-message');
  if (!submitBtn || !nameEl || !emailEl || !messageEl) return;

  const nameOk = nameEl.value.trim().length > 0;
  const emailOk = emailEl.value.trim().length > 0 && emailEl.checkValidity();
  const messageOk = messageEl.value.trim().length > 0;
  const ready = nameOk && emailOk && messageOk;

  submitBtn.disabled = !ready;
  submitBtn.setAttribute('aria-disabled', String(!ready));
}

function hideFormMessages() {
  if (formSuccess) formSuccess.hidden = true;
  if (formError) {
    formError.hidden = true;
    formError.textContent = '';
  }
}

if (contactForm && formSuccess) {
  const submitBtn = document.getElementById('contact-submit');
  const inputs = contactForm.querySelectorAll('#contact-name, #contact-email, #contact-message');

  inputs.forEach((el) => {
    el.addEventListener('input', () => {
      hideFormMessages();
      updateContactSubmitState();
    });
  });

  updateContactSubmitState();

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideFormMessages();
    updateContactSubmitState();
    if (submitBtn?.disabled) return;

    if (!CONTACT_FORM_URL) {
      formSuccess.hidden = false;
      contactForm.reset();
      updateContactSubmitState();
      return;
    }

    const fd = new FormData(contactForm);
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-disabled', 'true');

    try {
      const res = await fetch(CONTACT_FORM_URL, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        formSuccess.hidden = false;
        contactForm.reset();
        updateContactSubmitState();
      } else if (formError) {
        const msg =
          typeof data.error === 'string'
            ? data.error
            : 'Something went wrong. Please try again or email us directly.';
        formError.textContent = msg;
        formError.hidden = false;
        updateContactSubmitState();
      }
    } catch {
      if (formError) {
        formError.textContent = 'Network error. Check your connection and try again.';
        formError.hidden = false;
      }
      updateContactSubmitState();
    }
  });
}
