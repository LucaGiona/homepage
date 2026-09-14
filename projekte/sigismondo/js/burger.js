// ── Burger Menu ──
const burgerBtn = document.getElementById('burger-btn');
const burgerNav = document.getElementById('burger-nav');
const burgerOverlay = document.getElementById('burger-overlay');

function openMenu() {
  burgerNav.classList.add('open');
  burgerOverlay.classList.add('open');
  burgerBtn.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  burgerNav.classList.remove('open');
  burgerOverlay.classList.remove('open');
  burgerBtn.classList.remove('open');
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  burgerNav.classList.contains('open') ? closeMenu() : openMenu();
});

burgerOverlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// ── Aktive Seite markieren ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.burger-nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
