// ─── i18n.js ──────────────────────────────────────────────────────────────────

// ─── t() Helper ──────────────────────────────────────────────────────────────
// Gibt den übersetzten String für key zurück.
// Variablen-Ersetzung: t('key', { name: 'Foo' }) ersetzt {name} im String.
// Fallback: aktuelle Sprache → Deutsch → key selbst

function t(key, vars = {}) {
  const lang = localStorage.getItem('appLang') || 'de';
  let str = translations?.[lang]?.[key] ?? translations?.de?.[key] ?? key;
  Object.keys(vars).forEach(k => {
    str = str.replaceAll(`{${k}}`, vars[k]);
  });
  return str;
}

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });

  document.documentElement.lang = lang;
  localStorage.setItem('appLang', lang);

  // ─── Dynamische UI-Teile neu rendern ────────────────────────────────────────
  if (typeof renderTitleOptions === 'function') {
    const store = typeof getDataStore === 'function' ? getDataStore() : null;
    if (store) {
      const selected = document.getElementById('jobTitleSelect')?.value || '';
      renderTitleOptions(store.arbeitstitel, selected);
    }
  }

  if (typeof renderSteps === 'function')            renderSteps();
  if (typeof updateStepPlaceholder === 'function')  updateStepPlaceholder();
  if (typeof updateDrawerNextButton === 'function') updateDrawerNextButton();
}

document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('langSelect');
  const savedLang = localStorage.getItem('appLang') || 'de';
  if (langSelect) langSelect.value = savedLang;
  applyTranslations(savedLang);

  langSelect?.addEventListener('change', e => applyTranslations(e.target.value));
});
