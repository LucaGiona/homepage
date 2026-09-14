function roundCurrency(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function formatForInput(value) {
  if (!Number.isFinite(value)) return '';
  return roundCurrency(value).toFixed(2);
}

function parseInputValue(value) {
  if (typeof value !== 'string') return NaN;
  const normalized = value.replace(',', '.').trim();
  if (!normalized) return NaN;
  return Number(normalized);
}

function setupKalkulation() {
  const nettoInput   = document.getElementById('preisNetto');
  const bruttoInput  = document.getElementById('preisBrutto');
  const mwstSelect   = document.getElementById('mwstSatz');
  const mwstCustom   = document.getElementById('mwstCustom');
  const mwstUnit     = document.getElementById('mwstCustomUnit');

  if (!nettoInput || !bruttoInput || !mwstSelect) return;

  let activeSource = null;

  function getTaxRate() {
    if (mwstSelect.value === 'custom') {
      const v = parseInputValue(mwstCustom.value);
      return Number.isFinite(v) ? v / 100 : 0;
    }
    return Number(mwstSelect.value) / 100;
  }

  function updateFromNetto() {
    const netto = parseInputValue(nettoInput.value);
    if (!Number.isFinite(netto)) {
      bruttoInput.value = '';
      return;
    }

    const brutto = netto * (1 + getTaxRate());
    bruttoInput.value = formatForInput(brutto);
  }

  function updateFromBrutto() {
    const brutto = parseInputValue(bruttoInput.value);
    if (!Number.isFinite(brutto)) {
      nettoInput.value = '';
      return;
    }

    const netto = brutto / (1 + getTaxRate());
    nettoInput.value = formatForInput(netto);
  }

  nettoInput.addEventListener('focus', () => {
    activeSource = 'netto';
  });

  bruttoInput.addEventListener('focus', () => {
    activeSource = 'brutto';
  });

  nettoInput.addEventListener('input', () => {
    activeSource = 'netto';
    updateFromNetto();
  });

  bruttoInput.addEventListener('input', () => {
    activeSource = 'brutto';
    updateFromBrutto();
  });

  mwstSelect.addEventListener('change', () => {
    const isCustom = mwstSelect.value === 'custom';
    mwstCustom.classList.toggle('hidden', !isCustom);
    mwstUnit.classList.toggle('hidden', !isCustom);
    if (isCustom) { mwstCustom.focus(); return; }

    if (activeSource === 'brutto') updateFromBrutto();
    else updateFromNetto();
  });

  mwstCustom.addEventListener('input', () => {
    if (activeSource === 'brutto') updateFromBrutto();
    else updateFromNetto();
  });
}

document.addEventListener('DOMContentLoaded', setupKalkulation);