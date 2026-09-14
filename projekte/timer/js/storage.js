// ─── DataStore ────────────────────────────────────────────────────────────────

const STORE_KEY = 'dataStore';

function getDataStore() {
  const raw = localStorage.getItem(STORE_KEY);
  const fallback = { arbeitstitel: [], aktiverTitel: null, schritte: {}, settings: { taxRate: 19, currency: 'EUR' } };
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveDataStore(store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

// ─── Migration altes Format → dataStore ──────────────────────────────────────

function migrateIfNeeded() {
  // Bereits migriert oder nichts zu migrieren
  if (localStorage.getItem(STORE_KEY) !== null) return;
  const oldTitles = localStorage.getItem('arbeitstitel');
  if (!oldTitles) return;

  const titles = JSON.parse(oldTitles);
  const aktiverTitel = localStorage.getItem('aktiverTitel') || null;
  const schritte = {};

  titles.forEach(title => {
    const raw = localStorage.getItem(`schritte_${title}`);
    schritte[title] = raw ? JSON.parse(raw) : [];
  });

  saveDataStore({ arbeitstitel: titles, aktiverTitel, schritte, settings: { taxRate: 19, currency: 'EUR' } });

  // Alte Keys aufräumen
  localStorage.removeItem('arbeitstitel');
  localStorage.removeItem('aktiverTitel');
  titles.forEach(title => localStorage.removeItem(`schritte_${title}`));
}
