function getElapsed() { return appState.timer.elapsed; }

function updateDisplay() {
  const total = appState.timer.elapsed;
  const ms = Math.floor((total % 1000) / 10);
  const seconds = Math.floor(total / 1000) % 60;
  const minutes = Math.floor(total / 60000) % 60;
  const hours = Math.floor(total / 3600000);

  const timeStr   = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  const millisStr = '.' + pad(ms);

  const drawerTime   = document.getElementById('drawerTime');
  const drawerMillis = document.getElementById('drawerMillis');
  if (drawerTime)   drawerTime.textContent   = timeStr;
  if (drawerMillis) drawerMillis.textContent = millisStr;
}

function pad(n) {
  return n.toString().padStart(2, '0');
}

function start() {
  if (appState.timer.running) return;
  appState.timer.running = true;
  appState.timer.startTime = Date.now() - appState.timer.elapsed;
  appState.timer.timerInterval = setInterval(() => {
    appState.timer.elapsed = Date.now() - appState.timer.startTime;
    updateDisplay();
  }, 10);
}

function pause() {
  if (!appState.timer.running) return;
  appState.timer.running = false;
  clearInterval(appState.timer.timerInterval);
}

function stop() {
  appState.timer.running = false;
  clearInterval(appState.timer.timerInterval);
  appState.timer.elapsed = 0;
  updateDisplay();
}
