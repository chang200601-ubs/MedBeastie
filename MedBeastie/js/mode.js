// ── Mode Toggle (吃藥 / 好習慣) ──
let currentMode = 'med';

// 預先快取 DOM，避免每次切換都重新查詢
const modeElements = {
  med:         null,
  habit:       null,
  heroMascot:  null,
  heroDesc:    null,
  recordTitle: null,
  todayLabel:  null,
};

function initModeElements() {
  modeElements.med         = document.getElementById('mode-med');
  modeElements.habit       = document.getElementById('mode-habit');
  modeElements.heroMascot  = document.getElementById('heroMascot');
  modeElements.heroDesc    = document.getElementById('heroDesc');
  modeElements.recordTitle = document.getElementById('recordTitle');
  modeElements.todayLabel  = document.getElementById('todayLabel');
}

const modeConfig = {
  med: {
    mascot:      '🐻',
    desc:        '忘記吃藥？讓可愛的動物夥伴每天提醒你！輕鬆建立吃藥習慣，不再錯過每一顆藥。',
    recordTitle: '每日記錄',
    todayLabel:  '今天要吃的藥 💊',
    list:        () => medData,
  },
  habit: {
    mascot:      '🐰',
    desc:        '用好習慣模式追蹤每天的運動、喝水、閱讀，讓你的生活更健康充實！',
    recordTitle: '好習慣記錄',
    todayLabel:  '今天的好習慣 🌱',
    list:        () => habitData,
  },
};

function setMode(mode) {
  if (currentMode === mode) return; // 同一個模式不重複執行
  currentMode = mode;

  const cfg = modeConfig[mode];

  // 只更新有變化的文字，不重建整個 DOM
  modeElements.med.classList.toggle('active', mode === 'med');
  modeElements.habit.classList.toggle('active', mode === 'habit');
  modeElements.heroMascot.textContent  = cfg.mascot;
  modeElements.heroDesc.textContent    = cfg.desc;
  modeElements.recordTitle.textContent = cfg.recordTitle;
  modeElements.todayLabel.textContent  = cfg.todayLabel;

  // 用 requestAnimationFrame 讓瀏覽器先完成上面的 UI 更新再渲染清單
  requestAnimationFrame(() => renderMedList(cfg.list()));
}

// 初始化時快取元素
document.addEventListener('DOMContentLoaded', initModeElements);