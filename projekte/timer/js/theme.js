// ─── theme.js ─────────────────────────────────────────────────────────────────
// Lädt gespeichertes Theme aus localStorage und bindet den Toggle-Button.

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnThemeToggle');

  function updateIcon() {
    const isLight = document.body.classList.contains('light');
    btn.innerHTML = isLight
      ? '<i data-lucide="moon"></i>'
      : '<i data-lucide="sun"></i>';
    lucide.createIcons();
  }

  updateIcon();

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcon();
  });
});
