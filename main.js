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
  // Update active tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show / hide cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.display =
      cat === 'all' || card.dataset.cat === cat ? 'block' : 'none';
  });
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
