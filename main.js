/* ============================================================
   Habib Khair — Data Analyst Portfolio
   main.js
   ============================================================ */

/* ---------- EmailJS Init ---------- */
emailjs.init('plvLuACvWGmQC0Qjl');

/* ---------- Scroll Reveal ---------- */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---------- Project Filter ---------- */
function filterProjects(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.project-card').forEach(card => {
    card.style.display =
      cat === 'all' || card.dataset.cat === cat ? '' : 'none';
  });
}

/* ---------- Lightbox ---------- */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxCap   = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

// Attach click handlers to every gallery image
document.querySelectorAll('.project-gallery img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCap.textContent = img.dataset.caption || img.alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// Close on ✕ button
lightboxClose.addEventListener('click', closeLightbox);

// Close when clicking the dark backdrop (not the image itself)
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target === document.getElementById('lightbox-inner')) {
    closeLightbox();
  }
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  // Clear src after transition so there's no flash next open
  setTimeout(() => { lightboxImg.src = ''; }, 200);
}

/* ---------- Contact Form (EmailJS) ---------- */
function handleSubmit(e) {
  e.preventDefault();

  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  emailjs
    .send('service_8wod0yk', 'template_qqay05w', {
      from_name:  document.getElementById('senderName').value.trim(),
      from_email: document.getElementById('senderEmail').value.trim(),
      subject:    document.getElementById('subject').value.trim() || 'Portfolio Enquiry',
      message:    document.getElementById('message').value.trim(),
    })
    .then(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#4caf88';
      e.target.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      btn.textContent = '✗ Failed — Try Again';
      btn.style.background = '#e05c5c';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
      }, 3000);
    });
}

