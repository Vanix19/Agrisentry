const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Public submission endpoint. Feedback remains in the admin's restricted Google Sheet.
const feedbackEndpoint = 'https://script.google.com/macros/s/AKfycbye8hPH66Fotosgo1rvLYNa_QqQeRSkjjWKJHDUIHEu_rsGSDRrUcl4k8t9uyySuz_Y2A/exec';
const feedbackForm = document.querySelector('#feedback-form');
if (feedbackForm) {
  const submit = feedbackForm.querySelector('button[type="submit"]');
  const status = document.querySelector('#feedback-status');
  if (/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(feedbackEndpoint)) {
    feedbackForm.action = feedbackEndpoint;
    submit.disabled = false;
  } else {
    status.textContent = 'Feedback is being set up. Please try again later.';
  }
}
