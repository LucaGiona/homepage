// ─── timer-steps.js ───────────────────────────────────────────────────────────
// Verbindet die Stoppuhr mit den definierten Arbeitsschritten.
// Voraussetzung: stopwatch.js (mit getElapsed()), steps.js sind geladen.


// ─── Hilfsfunktion: ms → "MM:SS.hh" ──────────────────────────────────────────

function formatDuration(ms) {
  const cs      = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000) % 60;
  const hours   = Math.floor(ms / 3600000);

  if (hours > 0) {
    return pad2(hours) + ':' + pad2(minutes) + ':' + pad2(seconds) + '.' + pad2(cs);
  }
  return pad2(minutes) + ':' + pad2(seconds) + '.' + pad2(cs);
}

function pad2(n) {
  return n.toString().padStart(2, '0');
}

// ─── Session starten ──────────────────────────────────────────────────────────

function startSession() {
  if (appState.steps.list.length === 0) {
    const input = document.getElementById('stepInput');
    if (input) {
      input.placeholder = t('placeholderStepRequired');
      input.classList.add('input--error');
      setTimeout(() => {
        input.placeholder = t('placeholderStepInput');
        input.classList.remove('input--error');
      }, 2500);
    }
    return;
  }

  // Fehler-State im Input zurücksetzen falls noch vorhanden
  const stepInput = document.getElementById('stepInput');
  if (stepInput) {
    stepInput.classList.remove('input--error');
    stepInput.placeholder = t('placeholderStepAdding');
  }

  // Timer explizit auf 0 zurücksetzen
  appState.timer.running = false;
  clearInterval(appState.timer.timerInterval);
  appState.timer.elapsed = 0;
  updateDisplay();

  start(); // neu starten

  appState.session.active           = true;
  appState.session.currentStepIndex = 0;
  appState.session.stepStartTime    = getElapsed();
  appState.session.stepDurations    = [];

  openDrawer();
  renderDrawerSteps();
  updateDrawerState();
  updateDrawerNextButton();
  updateSessionButtons();
}

// ─── Nächster Schritt ─────────────────────────────────────────────────────────

function nextStep() {
  if (!appState.session.active) return;

  const duration = getElapsed() - appState.session.stepStartTime;
  appState.session.stepDurations[appState.session.currentStepIndex] = duration;

  showDrawerStepTime(appState.session.currentStepIndex, duration);
  showStepTime(appState.session.currentStepIndex, duration); // auch auf Hauptseite

  appState.session.currentStepIndex++;
  appState.session.stepStartTime = getElapsed();

  if (appState.session.currentStepIndex >= appState.steps.list.length) {
    endSession();
    return;
  }

  updateDrawerState();
  updateDrawerNextButton();
  renderSessionState(); // Hauptseite mitführen
}

// ─── Session beenden ──────────────────────────────────────────────────────────

function endSession() {
  pause();
  appState.session.active = false;

  const total = appState.session.stepDurations.reduce((sum, d) => sum + d, 0);

  // Total im Drawer anzeigen
  const totalEl     = document.getElementById('drawerTotal');
  const totalTimeEl = document.getElementById('drawerTotalTime');
  if (totalEl && totalTimeEl) {
    totalTimeEl.textContent = formatDuration(total);
    totalEl.classList.remove('hidden');
  }

  // Total auch auf Hauptseite
  showTotal(total);

  // Export-Button einblenden
  const btnExport = document.getElementById('btnExportKalkulation');
  if (btnExport) btnExport.classList.remove('hidden');

  // Drawer-Buttons: Weiter ausblenden, Abbrechen → Schließen
  const btnNext = document.getElementById('btnSessionNext');
  if (btnNext) btnNext.classList.add('hidden');

  const btnCancel = document.getElementById('btnSessionCancel');
  if (btnCancel) {
    btnCancel.textContent = t('btnClose');
    btnCancel.onclick     = closeDrawer;
  }

  updateSessionButtons();
}

// ─── Session abbrechen ───────────────────────────────────────────────────────

function cancelSession() {
  if (!appState.session.active) return;
  appState.session.active = false;
  stop();
  closeDrawer();
  clearSessionUI();
  updateSessionButtons();
}

// ─── Backdrop-Klick ───────────────────────────────────────────────────────────

function handleBackdropClick() {
  if (appState.session.active) {
    cancelSession();
  } else {
    closeDrawer();
  }
}

// ─── Drawer öffnen / schließen ────────────────────────────────────────────────

function openDrawer() {
  const drawer = document.getElementById('sessionDrawer');
  if (!drawer) return;
  drawer.classList.remove('hidden');

  // Reset: Total ausblenden, Buttons zurücksetzen
  const totalEl = document.getElementById('drawerTotal');
  if (totalEl) totalEl.classList.add('hidden');

  const btnExport = document.getElementById('btnExportKalkulation');
  if (btnExport) btnExport.classList.add('hidden');

  const btnNext = document.getElementById('btnSessionNext');
  if (btnNext) btnNext.classList.remove('hidden');

  const btnCancel = document.getElementById('btnSessionCancel');
  if (btnCancel) {
    btnCancel.textContent = t('btnSessionCancel');
    btnCancel.onclick     = cancelSession;
  }
}

function closeDrawer() {
  const drawer = document.getElementById('sessionDrawer');
  if (drawer) drawer.classList.add('hidden');
}

function resetForTitleChange() {
  // Stoppuhr direkt auf 0 setzen
  appState.timer.running = false;
  clearInterval(appState.timer.timerInterval);
  appState.timer.elapsed = 0;

  // Drawer-Anzeige sofort auf 00:00:00 setzen
  const dt = document.getElementById('drawerTime');
  const dm = document.getElementById('drawerMillis');
  if (dt) dt.textContent = '00:00:00';
  if (dm) dm.textContent = '.00';

  // Session abbrechen falls aktiv, UI immer leeren
  appState.session.active = false;
  closeDrawer();
  clearSessionUI();
  updateSessionButtons();

  // Kalkulation-Felder leeren
  const importZeit  = document.getElementById('importiertZeit');
  const importTitel = document.getElementById('importiertTitel');
  const kalSelect   = document.getElementById('kalTitelSelect');
  const preisNetto  = document.getElementById('preisNetto');
  const preisBrutto = document.getElementById('preisBrutto');
  const zeitSek     = document.getElementById('zeitSek');
  const zeitMin     = document.getElementById('zeitMin');
  const zeitStd     = document.getElementById('zeitStd');
  const umsatzField = document.getElementById('umsatzStunde');
  const prodStd     = document.getElementById('prodStd');
  const prodMin     = document.getElementById('prodMin');
  const prodSek     = document.getElementById('prodSek');
  if (importZeit)  importZeit.value  = '';
  if (importTitel) importTitel.value = '';
  if (kalSelect)   kalSelect.value   = '';
  if (preisNetto)  preisNetto.value  = '';
  if (preisBrutto) preisBrutto.value = '';
  if (zeitSek)     zeitSek.value     = '';
  if (zeitMin)     zeitMin.value     = '';
  if (zeitStd)     zeitStd.value     = '';
  if (umsatzField) umsatzField.value = '';
  if (prodStd)     prodStd.value     = '';
  if (prodMin)     prodMin.value     = '';
  if (prodSek)     prodSek.value     = '';
}

function exportToKalkulation() {
  const totalTimeEl  = document.getElementById('drawerTotalTime');
  const importZeit   = document.getElementById('importiertZeit');
  const importTitel  = document.getElementById('importiertTitel');
  const titelInput   = document.getElementById('jobTitleInput');

  if (totalTimeEl && importZeit) {
    importZeit.value  = totalTimeEl.textContent;
    if (importTitel && titelInput) importTitel.value = titelInput.value.trim();
    closeDrawer();
    recalcUmsatz();
    importZeit.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ─── Drawer: Schritte rendern ─────────────────────────────────────────────────

function renderDrawerSteps() {
  const list = document.getElementById('drawerStepList');
  if (!list) return;
  list.innerHTML = '';

  appState.steps.list.forEach((step, i) => {
    const li = document.createElement('li');

    const numSpan = document.createElement('span');
    numSpan.className   = 'step-num';
    numSpan.textContent = (i + 1) + '.';

    const labelSpan = document.createElement('span');
    labelSpan.className   = 'step-label';
    labelSpan.textContent = step;

    li.appendChild(numSpan);
    li.appendChild(labelSpan);
    list.appendChild(li);
  });
}

// ─── Drawer: Schritt-Zustände aktualisieren ───────────────────────────────────

function updateDrawerState() {
  const listItems = document.querySelectorAll('#drawerStepList li');

  listItems.forEach((li, i) => {
    li.classList.remove('step--active', 'step--done', 'step--pending');

    if (i < appState.session.currentStepIndex) {
      li.classList.add('step--done');
    } else if (i === appState.session.currentStepIndex) {
      li.classList.add('step--active');
      li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      li.classList.add('step--pending');
    }
  });
}

// ─── Drawer: Zeit-Badge neben einem Schritt ───────────────────────────────────

function showDrawerStepTime(index, ms) {
  const listItems = document.querySelectorAll('#drawerStepList li');
  if (!listItems[index]) return;

  const existing = listItems[index].querySelector('.step-time');
  if (existing) existing.remove();

  const badge = document.createElement('span');
  badge.className   = 'step-time';
  badge.textContent = formatDuration(ms);
  listItems[index].appendChild(badge);
}

// ─── Drawer: Nächster-Schritt-Button Text ─────────────────────────────────────

function updateDrawerNextButton() {
  const btnNext = document.getElementById('btnSessionNext');
  if (!btnNext) return;
  btnNext.textContent = (appState.session.currentStepIndex === appState.steps.list.length - 1)
    ? t('btnDone')
    : t('btnSessionNext');
}

// ─── Hauptseite: aktiven Schritt hervorheben ──────────────────────────────────

function renderSessionState() {
  const listItems = document.querySelectorAll('#stepList li');

  listItems.forEach((li, i) => {
    li.classList.remove('step--active', 'step--done', 'step--pending');

    if (i < appState.session.currentStepIndex) {
      li.classList.add('step--done');
    } else if (i === appState.session.currentStepIndex) {
      li.classList.add('step--active');
    } else {
      li.classList.add('step--pending');
    }
  });
}

// ─── Hauptseite: Zeit-Badge ───────────────────────────────────────────────────

function showStepTime(index, ms) {
  const listItems = document.querySelectorAll('#stepList li');
  if (!listItems[index]) return;

  const existing = listItems[index].querySelector('.step-time');
  if (existing) existing.remove();

  const badge = document.createElement('span');
  badge.className   = 'step-time';
  badge.textContent = formatDuration(ms);
  listItems[index].appendChild(badge);
}

// ─── Hauptseite: Total anzeigen ───────────────────────────────────────────────

function showTotal(ms) {
  let totalEl = document.getElementById('sessionTotal');
  if (!totalEl) {
    totalEl = document.createElement('div');
    totalEl.id        = 'sessionTotal';
    totalEl.className = 'session-total';
    document.getElementById('stepList').after(totalEl);
  }
  totalEl.innerHTML =
    `<span class="session-total__label">${t('drawerTotal')}</span>` +
    `<span class="session-total__time">${formatDuration(ms)}</span>`;
  totalEl.classList.remove('hidden');
}

// ─── Hauptseite: Session-UI zurücksetzen ──────────────────────────────────────

function clearSessionUI() {
  document.querySelectorAll('#stepList li').forEach(li => {
    li.classList.remove('step--active', 'step--done', 'step--pending');
    const badge = li.querySelector('.step-time');
    if (badge) badge.remove();
  });

  const totalEl = document.getElementById('sessionTotal');
  if (totalEl) totalEl.classList.add('hidden');
}

// ─── Session-Start-Button ein-/ausblenden ─────────────────────────────────────

function updateSessionButtons() {
  const btnStart = document.getElementById('btnSessionStart');
  if (!btnStart) return;

  if (appState.session.active) {
    btnStart.classList.add('hidden');
  } else {
    btnStart.classList.remove('hidden');
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  updateSessionButtons();

  // Placeholder im Step-Input zurücksetzen sobald Schritte in der Liste erscheinen
  const stepList = document.getElementById('stepList');
  if (stepList) {
    const observer = new MutationObserver(() => {
      const input = document.getElementById('stepInput');
      if (!input) return;
      const hasSteps = stepList.children.length > 0;
      if (hasSteps) {
        input.classList.remove('input--error');
        updateStepPlaceholder();
      }
    });
    observer.observe(stepList, { childList: true });
  }

});
