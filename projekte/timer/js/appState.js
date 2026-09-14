// ─── Zentraler Anwendungszustand ──────────────────────────────────────────────

const appState = {
  timer: {
    startTime: 0,
    elapsed: 0,
    timerInterval: null,
    running: false
  },
  steps: {
    list: [],
    currentSavedTitle: null
  },
  session: {
    active: false,
    currentStepIndex: 0,
    stepStartTime: 0,
    stepDurations: []
  }
};
