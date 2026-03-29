/* ============================================================
   Habib Khair — Data Analyst Portfolio
   main.js
   ============================================================ */

/* ---------- EmailJS Init ---------- */
emailjs.init('plvLuACvWGmQC0Qjl');

/* ---------- Scroll Reveal ---------- */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Project Filter ---------- */
function filterProjects(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.display =
      cat === 'all' || card.dataset.cat === cat ? '' : 'none';
  });
}

/* ============================================================
   LANGUAGE SWITCHER
   Strategy: every translatable element carries data-en and
   data-ar attributes. Switching just swaps innerHTML/textContent
   and toggles html[lang] + dir, which CSS uses for RTL layout.
   ============================================================ */

let currentLang = 'en';

const langToggle = document.getElementById('lang-toggle');
const langLabel  = document.getElementById('lang-label');
const htmlEl     = document.documentElement;

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  applyLanguage(currentLang);
});

function applyLanguage(lang) {
  // Update <html> attributes for CSS RTL rules
  htmlEl.lang = lang;
  htmlEl.dir  = lang === 'ar' ? 'rtl' : 'ltr';

  // Toggle button label
  langLabel.textContent = lang === 'ar' ? 'EN' : 'ع';

  // Swap all elements that have data-en / data-ar
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.dataset[lang];
    if (!text) return;

    // Use innerHTML so <br/> and <span> tags work in headings
    if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  // Swap form placeholders (stored as data-placeholder-en / data-placeholder-ar)
  document.querySelectorAll('[data-placeholder-en]').forEach(el => {
    el.placeholder = lang === 'ar'
      ? el.dataset.placeholderAr
      : el.dataset.placeholderEn;
  });

  // Swap lightbox captions (images store data-caption and data-caption-ar)
  // The lightbox reads them fresh on each open, so nothing to do here.
}

/* ---------- Lightbox ---------- */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxCap   = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.project-gallery img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    // Use Arabic caption if currently in AR mode
    const caption = (currentLang === 'ar' && img.dataset.captionAr)
      ? img.dataset.captionAr
      : (img.dataset.caption || img.alt || '');
    lightboxCap.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target === document.getElementById('lightbox-inner')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 200);
}

/* ---------- Contact Form (EmailJS) ---------- */
function handleSubmit(e) {
  e.preventDefault();

  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = currentLang === 'ar' ? 'جارٍ الإرسال…' : 'Sending…';
  btn.disabled = true;

  emailjs
    .send('service_8wod0yk', 'template_qqay05w', {
      from_name:  document.getElementById('senderName').value.trim(),
      from_email: document.getElementById('senderEmail').value.trim(),
      subject:    document.getElementById('subject').value.trim() || 'Portfolio Enquiry',
      message:    document.getElementById('message').value.trim(),
    })
    .then(() => {
      btn.textContent = currentLang === 'ar' ? '✓ تم الإرسال!' : '✓ Message Sent!';
      btn.style.background = '#4caf88';
      e.target.reset();
      setTimeout(() => {
        btn.textContent = currentLang === 'ar' ? 'إرسال الرسالة' : 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      btn.textContent = currentLang === 'ar' ? '✗ فشل — حاول مجدداً' : '✗ Failed — Try Again';
      btn.style.background = '#e05c5c';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = currentLang === 'ar' ? 'إرسال الرسالة' : 'Send Message';
        btn.style.background = '';
      }, 3000);
    });
}
