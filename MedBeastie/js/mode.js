// ── Mode Toggle (吃藥 / 好習慣) ──
let currentMode = 'med';

function setMode(mode) {
  currentMode = mode;
  document.getElementById('mode-med').classList.toggle('active', mode === 'med');
  document.getElementById('mode-habit').classList.toggle('active', mode === 'habit');

  if (mode === 'med') {
    document.getElementById('heroMascot').textContent = '🐻';
    document.getElementById('heroDesc').textContent = '忘記吃藥？讓可愛的動物夥伴每天提醒你！輕鬆建立吃藥習慣，不再錯過每一顆藥。';
    document.getElementById('recordTitle').textContent = '每日記錄';
    document.getElementById('todayLabel').textContent = '今天要吃的藥 💊';
    renderMedList(medData);
  } else {
    document.getElementById('heroMascot').textContent = '🐰';
    document.getElementById('heroDesc').textContent = '用好習慣模式追蹤每天的運動、喝水、閱讀，讓你的生活更健康充實！';
    document.getElementById('recordTitle').textContent = '好習慣記錄';
    document.getElementById('todayLabel').textContent = '今天的好習慣 🌱';
    renderMedList(habitData);
  }
}
