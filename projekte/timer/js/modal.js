// ─── Info Modal ───────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const modal    = document.getElementById('infoModal');
  const btnOpen  = document.getElementById('btnInfo');
  const btnClose = document.getElementById('btnInfoClose');
  const backdrop = document.getElementById('infoModalBackdrop');

  function openModal() {
    modal.classList.remove('hidden');
    btnClose.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    btnOpen.focus();
  }

  btnOpen.addEventListener('click', openModal);
  btnClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
});
