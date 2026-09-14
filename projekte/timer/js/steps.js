// ─── Hilfsfunktionen localStorage ────────────────────────────────────────────

function loadStepsForTitle(title) {
  return getDataStore().schritte[title] || [];
}

// ─── Schritt-Input aktivieren / deaktivieren ──────────────────────────────────

function updateStepInputState() {
  const hasTitle = Boolean(document.getElementById('jobTitleInput').value.trim());
  document.getElementById('stepInput').disabled      = !hasTitle;
  document.getElementById('btnAddStep').disabled     = !hasTitle;
  document.getElementById('btnEditTitle').disabled   = !hasTitle;
  document.getElementById('btnDeleteTitle').disabled = !hasTitle;
  document.getElementById('btnSaveTitle').disabled   = !hasTitle;
}

// ─── Titel-Dropdown ───────────────────────────────────────────────────────────

function renderTitleOptions(titles, selectedValue = '') {
  const select    = document.getElementById('jobTitleSelect');
  const kalSelect = document.getElementById('kalTitelSelect');

  const defaultOption = t('titleSelectDefault');
  select.innerHTML = `<option value="">${defaultOption}</option>`;
  if (kalSelect) kalSelect.innerHTML = `<option value="">${defaultOption}</option>`;

  titles.forEach((titel) => {
    const opt = document.createElement('option');
    opt.value = titel;
    opt.textContent = titel;
    select.appendChild(opt);

    if (kalSelect) {
      const kalOpt = document.createElement('option');
      kalOpt.value = titel;
      kalOpt.textContent = titel;
      kalSelect.appendChild(kalOpt);
    }
  });

  select.value = selectedValue || '';
}

function selectKalTitel() {
  const select = document.getElementById('kalTitelSelect');
  const input  = document.getElementById('importiertTitel');
  if (!select || !select.value) return;
  input.value = select.value;

  [
    'importiertZeit',
    'preisNetto', 'preisBrutto', 'umsatzStunde',
    'zeitStd', 'zeitMin', 'zeitSek',
    'prodStd', 'prodMin', 'prodSek'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function selectJobTitle() {
  const select = document.getElementById('jobTitleSelect');
  const input  = document.getElementById('jobTitleInput');
  const title  = select.value;
  if (!title) return;

  resetForTitleChange();

  input.value = title;
  appState.steps.currentSavedTitle = title;

  appState.steps.list.length = 0;
  appState.steps.list.push(...loadStepsForTitle(title));
  renderSteps();
  updateStepInputState();
}

// ─── Titel bearbeiten ────────────────────────────────────────────────────────

function editTitle() {
  const input = document.getElementById('jobTitleInput');
  input.focus();
  input.select();
}

// ─── Titel speichern (nur Titel, ohne Schritte) ───────────────────────────────

function saveTitle() {
  const titleInput = document.getElementById('jobTitleInput');
  const titleError = document.getElementById('jobTitleError');
  const title      = titleInput.value.trim();

  if (!title) {
    titleInput.classList.add('input--error');
    titleError.textContent = t('titleError');
    titleError.classList.remove('hidden');
    titleInput.focus();
    return;
  }

  titleInput.classList.remove('input--error');
  titleError.classList.add('hidden');

  const store = getDataStore();

  if (appState.steps.currentSavedTitle && appState.steps.currentSavedTitle !== title) {
    if (store.arbeitstitel.includes(title)) {
      titleInput.classList.add('input--error');
      titleError.textContent = t('titleExists', { title });
      titleError.classList.remove('hidden');
      titleInput.focus();
      return;
    }
    store.schritte[title] = store.schritte[appState.steps.currentSavedTitle] || [];
    delete store.schritte[appState.steps.currentSavedTitle];
    store.arbeitstitel = store.arbeitstitel.map(titel =>
      titel === appState.steps.currentSavedTitle ? title : titel
    );
    if (store.aktiverTitel === appState.steps.currentSavedTitle) store.aktiverTitel = title;
    saveDataStore(store);
    appState.steps.currentSavedTitle = title;
    renderTitleOptions(store.arbeitstitel, title);
  } else if (!appState.steps.currentSavedTitle) {
    if (!store.arbeitstitel.includes(title)) store.arbeitstitel.push(title);
    store.aktiverTitel = title;
    saveDataStore(store);
    appState.steps.currentSavedTitle = title;
    renderTitleOptions(store.arbeitstitel, title);
  }

  updateStepInputState();
}

// ─── Neuer Titel ─────────────────────────────────────────────────────────────

function newTitle() {
  resetForTitleChange();
  document.getElementById('jobTitleInput').value = '';
  document.getElementById('jobTitleSelect').value = '';
  appState.steps.list.length = 0;
  renderSteps();
  appState.steps.currentSavedTitle = null;
  updateStepInputState();
  document.getElementById('jobTitleInput').focus();
}

// ─── Titel löschen ────────────────────────────────────────────────────────────

function deleteTitle() {
  const title = document.getElementById('jobTitleInput').value.trim();
  if (!title) return;

  if (!confirm(t('confirmDeleteTitle', { title }))) return;

  const store = getDataStore();
  if (store.arbeitstitel.includes(title)) {
    delete store.schritte[title];
    store.arbeitstitel = store.arbeitstitel.filter(titel => titel !== title);
    if (store.aktiverTitel === title) store.aktiverTitel = null;
    saveDataStore(store);
    renderTitleOptions(store.arbeitstitel);
  }

  document.getElementById('jobTitleInput').value = '';
  appState.steps.list.length = 0;
  renderSteps();
  appState.steps.currentSavedTitle = null;
  updateStepInputState();
}

// ─── Schritte hinzufügen ──────────────────────────────────────────────────────

function addStep() {
  const titleInput = document.getElementById('jobTitleInput');
  const titleError = document.getElementById('jobTitleError');

  if (!titleInput.value.trim()) {
    titleInput.classList.add('input--error');
    titleError.textContent = t('titleError');
    titleError.classList.remove('hidden');
    titleInput.focus();
    return;
  }

  const input = document.getElementById('stepInput');
  const value = input.value.trim();
  if (!value) {
    input.focus();
    return;
  }

  appState.steps.list.push(value);
  renderSteps();
  input.value = '';
  input.focus();
}

// ─── Speichern ────────────────────────────────────────────────────────────────

function saveSteps() {
  const titleInput = document.getElementById('jobTitleInput');
  const titleError = document.getElementById('jobTitleError');
  const title      = titleInput.value.trim();

  if (!title) {
    titleInput.classList.add('input--error');
    titleError.textContent = t('titleError');
    titleError.classList.remove('hidden');
    titleInput.focus();
    return;
  }

  titleInput.classList.remove('input--error');
  titleError.classList.add('hidden');

  const stepInput   = document.getElementById('stepInput');
  const pendingStep = stepInput.value.trim();
  if (pendingStep) {
    appState.steps.list.push(pendingStep);
    stepInput.value = '';
    renderSteps();
  }

  if (appState.steps.list.length === 0) {
    stepInput.focus();
    return;
  }

  const store = getDataStore();

  if (appState.steps.currentSavedTitle && appState.steps.currentSavedTitle !== title) {
    if (store.arbeitstitel.includes(title)) {
      titleInput.classList.add('input--error');
      titleError.textContent = t('titleExists', { title });
      titleError.classList.remove('hidden');
      titleInput.focus();
      return;
    }
    delete store.schritte[appState.steps.currentSavedTitle];
    store.arbeitstitel = store.arbeitstitel.filter(
      titel => titel !== appState.steps.currentSavedTitle
    );
    if (store.aktiverTitel === appState.steps.currentSavedTitle) store.aktiverTitel = null;
  }

  store.schritte[title] = [...appState.steps.list];
  if (!store.arbeitstitel.includes(title)) store.arbeitstitel.push(title);
  store.aktiverTitel = title;
  saveDataStore(store);

  renderTitleOptions(store.arbeitstitel, title);
  appState.steps.currentSavedTitle = title;

  const count    = appState.steps.list.length;
  const suffix   = count === 1 ? t('stepSingular') : t('stepPlural');
  const confirmEl = document.getElementById('saveConfirm');
  confirmEl.textContent = t('stepsSaved', { title, count, suffix });
  confirmEl.classList.remove('hidden');
  setTimeout(() => confirmEl.classList.add('hidden'), 3000);
}

// ─── Schritte rendern ─────────────────────────────────────────────────────────

function makeIconBtn(iconName, className, ariaLabel, onClick) {
  const btn = document.createElement('button');
  btn.className = `step-btn ${className}`;
  btn.setAttribute('aria-label', ariaLabel);
  btn.innerHTML = `<i data-lucide="${iconName}"></i>`;
  btn.addEventListener('click', onClick);
  return btn;
}

function updateStepPlaceholder() {
  const input = document.getElementById('stepInput');
  if (!input || input.classList.contains('input--error')) return;
  input.placeholder = appState.steps.list.length > 0
    ? t('placeholderStepMore')
    : t('placeholderStepInput');
}

function renderSteps() {
  const list = document.getElementById('stepList');
  list.innerHTML = '';

  appState.steps.list.forEach((step, index) => {
    const li = document.createElement('li');

    const text = document.createElement('span');
    text.className   = 'step-text';
    text.textContent = step;

    const btnEdit   = makeIconBtn('pencil',  'step-btn--edit',   t('ariaEditStep',   { index: index + 1 }), () => editStep(index));
    const btnDelete = makeIconBtn('trash-2', 'step-btn--delete', t('ariaDeleteStep', { index: index + 1 }), () => deleteStep(index));

    li.appendChild(text);
    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    list.appendChild(li);
  });

  lucide.createIcons();
  updateStepPlaceholder();
}

function editStep(index) {
  const list = document.getElementById('stepList');
  const li   = list.children[index];

  const input = document.createElement('input');
  input.type      = 'text';
  input.value     = appState.steps.list[index];
  input.className = 'step-edit-input';
  input.setAttribute('aria-label', t('ariaEditStep', { index: index + 1 }));

  const btnSave   = makeIconBtn('check', 'step-btn--save',   t('ariaSaveChange'), confirmEdit);
  const btnCancel = makeIconBtn('x',     'step-btn--cancel', t('ariaCancelEdit'), () => renderSteps());

  function confirmEdit() {
    const newValue = input.value.trim();
    if (newValue) appState.steps.list[index] = newValue;
    renderSteps();
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')  confirmEdit();
    if (e.key === 'Escape') renderSteps();
  });

  li.innerHTML = '';
  li.appendChild(input);
  li.appendChild(btnSave);
  li.appendChild(btnCancel);
  lucide.createIcons();
  input.focus();
  input.select();
}

function deleteStep(index) {
  appState.steps.list.splice(index, 1);
  renderSteps();
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  migrateIfNeeded();

  updateStepInputState();

  const store = getDataStore();
  renderTitleOptions(store.arbeitstitel);

  const aktiverTitel = store.aktiverTitel;
  if (aktiverTitel && store.arbeitstitel.includes(aktiverTitel)) {
    document.getElementById('jobTitleInput').value  = aktiverTitel;
    document.getElementById('jobTitleSelect').value = aktiverTitel;
    appState.steps.currentSavedTitle = aktiverTitel;
    appState.steps.list.push(...(store.schritte[aktiverTitel] || []));
    renderSteps();
    updateStepInputState();
  }

  lucide.createIcons();
});
