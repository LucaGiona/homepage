// ─── ui.js ────────────────────────────────────────────────────────────────────
// Bindet alle Event-Handler der statischen UI-Elemente per addEventListener.
// Wird als letztes Script geladen, sodass alle Funktionen bereits definiert sind.

function setupEventHandlers() {

  // ─── Arbeitstitel ────────────────────────────────────────────────────────────
  document.getElementById('btnNewTitle')
    .addEventListener('click', newTitle);
  document.getElementById('jobTitleSelect')
    .addEventListener('change', selectJobTitle);
  document.getElementById('btnEditTitle')
    .addEventListener('click', editTitle);
  document.getElementById('btnDeleteTitle')
    .addEventListener('click', deleteTitle);
  document.getElementById('btnSaveTitle')
    .addEventListener('click', saveTitle);

  // ─── Titel-Input: Fehlerstatus und Button-State ──────────────────────────────
  document.getElementById('jobTitleInput').addEventListener('input', () => {
    document.getElementById('jobTitleInput').classList.remove('input--error');
    document.getElementById('jobTitleError').classList.add('hidden');
    updateStepInputState();
  });

  // ─── Schritte ────────────────────────────────────────────────────────────────
  document.getElementById('btnAddStep')
    .addEventListener('click', addStep);
  document.getElementById('btnSaveSteps')
    .addEventListener('click', saveSteps);
  document.getElementById('stepInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addStep();
  });

  // ─── Session ─────────────────────────────────────────────────────────────────
  document.getElementById('btnSessionStart')
    .addEventListener('click', startSession);
  document.getElementById('btnSessionNext')
    .addEventListener('click', nextStep);
  document.getElementById('btnSessionCancel')
    .addEventListener('click', cancelSession);
  document.getElementById('btnExportKalkulation')
    .addEventListener('click', exportToKalkulation);
  document.getElementById('drawerBackdrop')
    .addEventListener('click', handleBackdropClick);

  // ─── Kalkulation ─────────────────────────────────────────────────────────────
  document.getElementById('kalTitelSelect')
    .addEventListener('change', selectKalTitel);

  // ─── Zeit-Inputs (Sek → Min → Std) ──────────────────────────────────────────
  setupZeitInputs();
}

function setupZeitInputs() {
  const sek = document.getElementById('zeitSek');
  const min = document.getElementById('zeitMin');
  const std = document.getElementById('zeitStd');
  if (!sek || !min || !std) return;

  function bindField(el, nextEl, prevEl) {
    el.addEventListener('input', () => {
      el.value = el.value.replace(/\D/g, '').slice(0, 2);
      recalcUmsatz();
      if (el.value.length === 2 && nextEl) nextEl.focus();
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && el.value === '' && prevEl) {
        e.preventDefault();
        prevEl.focus();
      }
    });
  }

  bindField(std, min, null);
  bindField(min, sek, std);
  bindField(sek, null, min);

  const prodStd = document.getElementById('prodStd');
  const prodMin = document.getElementById('prodMin');
  const prodSek = document.getElementById('prodSek');
  if (prodStd && prodMin && prodSek) {
    bindField(prodStd, prodMin, null);
    bindField(prodMin, prodSek, prodStd);
    bindField(prodSek, null,    prodMin);
  }
}

document.addEventListener('DOMContentLoaded', setupEventHandlers);
