// ─── Theme ──────────────────────────────────────────
const body     = document.body;
const themeBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
    themeBtn.textContent = 'dark';
  } else {
    body.classList.remove('light');
    themeBtn.textContent = 'light';
  }
}
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const next = body.classList.contains('light') ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// ─── Email Copy Toast ────────────────────────────────
const EMAIL = 'parsaghezelbash04@gmail.com';

function showToast(msg) {
  const el = document.createElement('div');
  el.className = 'notification';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

document.querySelectorAll('.email-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    navigator.clipboard.writeText(EMAIL)
      .then(() => showToast('Email copied to clipboard!'))
      .catch(() => showToast(`Email: ${EMAIL}`));
  });
});
