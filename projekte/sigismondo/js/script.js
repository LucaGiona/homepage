// ── Drawer ──
const backdrop = document.getElementById('drawer-backdrop');

function openDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  const isOpen = drawer.classList.contains('open');
  document.querySelectorAll('.drawer').forEach(d => d.classList.remove('open'));
  backdrop.classList.remove('open');
  if (!isOpen) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
  }
}

// DEBUG - Pfeil
document.querySelectorAll('.modul-arrow').forEach(arrow => {
  console.log('arrow gefunden:', arrow, '| data-drawer:', arrow.getAttribute('data-drawer'));
  arrow.addEventListener('click', (e) => {
    console.log('arrow geklickt!', arrow.getAttribute('data-drawer'));
    openDrawer(arrow.getAttribute('data-drawer'));
  });
});

// Klick auf Bild → Drawer öffnen (nur Mobile/Tablet ≤1020px)
document.querySelectorAll('.modul-bg').forEach(img => {
  img.style.pointerEvents = 'auto';
  img.addEventListener('click', () => {
    if (window.innerWidth > 1020) return;
    const drawerId = img.closest('.modul').querySelector('[data-drawer]').getAttribute('data-drawer');
    openDrawer(drawerId);
  });
});

// Klick auf "Mehr erfahren" Button → Drawer öffnen
document.querySelectorAll('.modul-btn[data-drawer]').forEach(btn => {
  btn.addEventListener('click', () => {
    openDrawer(btn.getAttribute('data-drawer'));
  });
});

// Drawer schliessen
document.querySelectorAll('.drawer-close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.closest('.drawer').classList.remove('open');
    backdrop.classList.remove('open');
  });
});

// Backdrop schliessen
backdrop.addEventListener('click', () => {
  document.querySelectorAll('.drawer').forEach(d => d.classList.remove('open'));
  backdrop.classList.remove('open');
});
