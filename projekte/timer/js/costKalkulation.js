// ─── costKalkulation.js ───────────────────────────────────────────────────────
// Berechnet den Umsatz pro gewähltem Zeitraum basierend auf:
//   - der importierten Messzeit (aus der Session)
//   - dem Preis Brutto
//   - dem gewählten Produktionszeitraum (15 / 30 / 45 min oder Manuell)

// ─── Hilfsfunktion: "MM:SS.cs" oder "HH:MM:SS.cs" → Minuten ─────────────────

// Liest die drei Prod-Inputs (Std / Min / Sek) und gibt Minuten zurück
function getProdMinutes() {
  const std = parseInt(document.getElementById('prodStd')?.value || '0', 10) || 0;
  const min = parseInt(document.getElementById('prodMin')?.value || '0', 10) || 0;
  const sek = parseInt(document.getElementById('prodSek')?.value || '0', 10) || 0;
  const totalSeconds = std * 3600 + min * 60 + sek;
  return totalSeconds > 0 ? totalSeconds / 60 : NaN;
}

// Liest die drei Zeit-Inputs (Std / Min / Sek) und gibt Minuten zurück
function getManualTimeMinutes() {
  const sek = parseInt(document.getElementById('zeitSek')?.value || '0', 10) || 0;
  const min = parseInt(document.getElementById('zeitMin')?.value || '0', 10) || 0;
  const std = parseInt(document.getElementById('zeitStd')?.value || '0', 10) || 0;
  const totalSeconds = std * 3600 + min * 60 + sek;
  return totalSeconds > 0 ? totalSeconds / 60 : NaN;
}

function parseDurationToMinutes(str) {
  if (!str || !str.trim()) return NaN;
  const parts = str.trim().split(':');
  let totalSeconds = 0;

  if (parts.length === 3) {
    // HH:MM:SS.cs
    totalSeconds =
      parseInt(parts[0], 10) * 3600 +
      parseInt(parts[1], 10) * 60 +
      parseFloat(parts[2]);
  } else if (parts.length === 2) {
    // MM:SS.cs
    totalSeconds =
      parseInt(parts[0], 10) * 60 +
      parseFloat(parts[1]);
  } else {
    return NaN;
  }

  return totalSeconds / 60;
}

// ─── Umsatz neu berechnen ─────────────────────────────────────────────────────

function recalcUmsatz() {
  const bruttoInput   = document.getElementById('preisBrutto');
  const importZeit    = document.getElementById('importiertZeit');
  const produktionSel = document.getElementById('produktionZeit');
  const umsatzField   = document.getElementById('umsatzStunde');

  if (!bruttoInput || !produktionSel || !umsatzField) return;

  const brutto = parseInputValue(bruttoInput.value);
  if (!Number.isFinite(brutto) || brutto <= 0) {
    umsatzField.value = '';
    return;
  }

  // Gesessene Zeit hat Vorrang; manuell eingegebene Zeit als Fallback
  let measuredMinutes = importZeit ? parseDurationToMinutes(importZeit.value) : NaN;
  if (!Number.isFinite(measuredMinutes) || measuredMinutes <= 0) {
    measuredMinutes = getManualTimeMinutes();
  }
  if (!Number.isFinite(measuredMinutes) || measuredMinutes <= 0) {
    umsatzField.value = '';
    return;
  }

  const selectedMinutes = produktionSel.value === 'manual'
    ? getProdMinutes()
    : Number(produktionSel.value);

  if (!Number.isFinite(selectedMinutes) || selectedMinutes <= 0) {
    umsatzField.value = '';
    return;
  }

  const faktor = selectedMinutes / measuredMinutes;
  umsatzField.value = formatForInput(faktor * brutto);
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function setupCostKalkulation() {
  const produktionSel = document.getElementById('produktionZeit');
  const bruttoInput   = document.getElementById('preisBrutto');

  if (!produktionSel || !bruttoInput) return;

  function toggleManualInput() {
    const isManual = produktionSel.value === 'manual';
    const row = document.getElementById('prodManualRow');
    if (row) row.classList.toggle('hidden', !isManual);
    if (isManual) document.getElementById('prodStd')?.focus();
  }

  toggleManualInput(); // Initialzustand setzen

  produktionSel.addEventListener('change', () => {
    toggleManualInput();
    recalcUmsatz();
  });

  bruttoInput.addEventListener('input', recalcUmsatz);

  // preisNetto-Eingabe setzt preisBrutto programmatisch (kein input-Event) →
  // recalcUmsatz direkt auf netto + mwst hören
  const nettoInput = document.getElementById('preisNetto');
  const mwstSelect = document.getElementById('mwstSatz');
  const mwstCustom = document.getElementById('mwstCustom');
  if (nettoInput) nettoInput.addEventListener('input',  recalcUmsatz);
  if (mwstSelect) mwstSelect.addEventListener('change', recalcUmsatz);
  if (mwstCustom) mwstCustom.addEventListener('input',  recalcUmsatz);
}

document.addEventListener('DOMContentLoaded', setupCostKalkulation);
