// ── 每天的記錄資料，key 為 "YYYY-M-D" ──
const dayRecords = {};

// ── 目前展開的日期 ──
let openedDay = null;

// ── Calendar ──
let calDate = new Date();

function getKey(year, month, d) {
  return `${year}-${month}-${d}`;
}

function getDayColor(key) {
  const r = dayRecords[key];
  if (!r) return null;
  if (r.status === 'taken')  return 'taken';   // 橘：有吃藥
  if (r.status === 'missed') return 'missed';  // 紅：忘記吃
  if (r.status === 'habit')  return 'habit';   // 藍：好習慣
  if (r.note)                return 'noted';   // 黃：只有備註
  return null;
}

function renderCalendar() {
  const year  = calDate.getFullYear();
  const month = calDate.getMonth();
  document.getElementById('calMonthLabel').textContent = `${year} 年 ${month + 1} 月`;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  // 星期標題列
  ['日','一','二','三','四','五','六'].forEach(l => {
    const el = document.createElement('div');
    el.className = 'cal-day-label';
    el.textContent = l;
    grid.appendChild(el);
  });

  // 第一天前補空格
  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    grid.appendChild(el);
  }

  // 日期格子
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let d = 1; d <= daysInMonth; d++) {
    const key = getKey(year, month, d);
    const color = getDayColor(key);

    const wrapper = document.createElement('div');
    wrapper.className = 'cal-cell';

    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;

    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      el.classList.add('today');
    }
    if (color) el.classList.add(color);
    if (openedDay === key) el.classList.add('opened');

    el.onclick = () => toggleDayPanel(year, month, d, key);
    wrapper.appendChild(el);

    // 展開面板（插在格子正下方）
    if (openedDay === key) {
      const panel = buildPanel(year, month, d, key);
      wrapper.appendChild(panel);
    }

    grid.appendChild(wrapper);
  }
}

function toggleDayPanel(year, month, d, key) {
  openedDay = (openedDay === key) ? null : key;
  renderCalendar();
}

function buildPanel(year, month, d, key) {
  const r = dayRecords[key] || {};
  const panel = document.createElement('div');
  panel.className = 'day-panel';

  panel.innerHTML = `
    <div class="day-panel-title">${month + 1} 月 ${d} 日</div>

    <div class="day-panel-btns">
      <button class="status-btn ${r.status === 'taken'  ? 'active-taken'  : ''}" onclick="setStatus('${key}','taken')">✅ 有吃藥</button>
      <button class="status-btn ${r.status === 'missed' ? 'active-missed' : ''}" onclick="setStatus('${key}','missed')">❌ 忘記吃藥</button>
      <button class="status-btn ${r.status === 'habit'  ? 'active-habit'  : ''}" onclick="setStatus('${key}','habit')">🌱 好習慣完成</button>
    </div>

    <textarea class="day-note" placeholder="📝 備註（可選填）" oninput="setNote('${key}', this.value)">${r.note || ''}</textarea>

    <button class="day-panel-close" onclick="toggleDayPanel(${year},${month},${d},'${key}')">收起 ▲</button>
  `;

  return panel;
}

function setStatus(key, status) {
  if (!dayRecords[key]) dayRecords[key] = {};
  // 再次點同一個 → 取消
  dayRecords[key].status = (dayRecords[key].status === status) ? null : status;
  renderCalendar();
}

function setNote(key, value) {
  if (!dayRecords[key]) dayRecords[key] = {};
  dayRecords[key].note = value;
  // 不重新 render（避免 textarea 游標跳掉）
  // 只更新格子顏色
  updateDayColor(key);
}

function updateDayColor(key) {
  // 找到對應格子重新套色（不重 render 整個月曆）
  const cells = document.querySelectorAll('.cal-day');
  cells.forEach(el => {
    // 找到 opened 那格
    if (el.classList.contains('opened')) {
      ['taken','missed','habit','noted'].forEach(c => el.classList.remove(c));
      const color = getDayColor(key);
      if (color) el.classList.add(color);
    }
  });
}

function changeMonth(dir) {
  openedDay = null;
  calDate.setMonth(calDate.getMonth() + dir);
  renderCalendar();
}

// ── 打卡清單 ──
const medData = [
  { name: '血壓藥',   time: '早上 08:00' },
  { name: '維他命 C', time: '早上 08:00' },
  { name: '腸胃藥',   time: '中午 12:00' },
  { name: '安眠藥',   time: '晚上 10:00' },
];

const habitData = [
  { name: '喝 2000ml 水',  time: '全天' },
  { name: '運動 30 分鐘',  time: '下午 06:00' },
  { name: '閱讀 20 頁',    time: '晚上 09:00' },
];

function renderMedList(data) {
  document.getElementById('medList').innerHTML = data.map((m, i) => `
    <div class="med-item">
      <button class="med-check" id="chk-${i}" onclick="toggleCheck(${i})"></button>
      <div class="med-info">
        <div class="med-name">${m.name}</div>
        <div class="med-time">${m.time}</div>
      </div>
    </div>
  `).join('');
}

function toggleCheck(i) {
  const btn = document.getElementById('chk-' + i);
  const checked = btn.classList.toggle('checked');
  btn.textContent = checked ? '✓' : '';
}