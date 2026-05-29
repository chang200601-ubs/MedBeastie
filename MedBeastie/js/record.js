// ── 每天的記錄資料，key 為 "YYYY-M-D" ──
// 結構：{ med: 'taken'|'missed'|null, habit: bool, mood: '😊'|...|null, note: '' }
const dayRecords = {};

// ── 目前展開的日期 ──
let openedDay = null;

// ── Calendar ──
let calDate = new Date();

// 心情 emoji 選項
const MOODS = ['😊','😢','😠','😨','🤔'];

function getKey(year, month, d) {
  return `${year}-${month}-${d}`;
}

function getDayClasses(key) {
  const r = dayRecords[key];
  if (!r) return [];
  const classes = [];
  if (r.med === 'taken')   classes.push('taken');
  if (r.med === 'missed')  classes.push('missed');
  if (r.habit)             classes.push('habit');
  if (!classes.length && r.note) classes.push('noted');
  return classes;
}

function renderCalendar() {
  const year  = calDate.getFullYear();
  const month = calDate.getMonth();
  document.getElementById('calMonthLabel').textContent = `${year} 年 ${month + 1} 月`;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  ['日','一','二','三','四','五','六'].forEach(l => {
    const el = document.createElement('div');
    el.className = 'cal-day-label';
    el.textContent = l;
    grid.appendChild(el);
  });

  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    grid.appendChild(el);
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let d = 1; d <= daysInMonth; d++) {
    const key = getKey(year, month, d);
    const r = dayRecords[key] || {};
    const colorClasses = getDayClasses(key);

    const wrapper = document.createElement('div');
    wrapper.className = 'cal-cell';

    const el = document.createElement('div');
    el.className = 'cal-day';

    // 格子內容：日期數字 + emoji（若有）
    const emojiSpan = r.mood ? `<span class="cal-emoji">${r.mood}</span>` : '';
    el.innerHTML = `<span class="cal-num">${d}</span>${emojiSpan}`;

    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      el.classList.add('today');
    }
    colorClasses.forEach(c => el.classList.add(c));
    if (openedDay === key) el.classList.add('opened');

    el.onclick = () => toggleDayPanel(year, month, d, key);
    wrapper.appendChild(el);

    if (openedDay === key) {
      wrapper.appendChild(buildPanel(year, month, d, key));
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

  const medTaken  = r.med === 'taken';
  const medMissed = r.med === 'missed';
  const habit     = r.habit || false;

  const moodBtns = MOODS.map(m => `
    <button id="btn-mood-${key}-${m}" class="mood-btn ${r.mood === m ? 'active-mood' : ''}"
      onclick="setMood('${key}','${m}')">${m}</button>
  `).join('');

  panel.innerHTML = `
    <div class="day-panel-title">${month + 1} 月 ${d} 日</div>

    <div class="day-panel-section-label">💊 吃藥狀況（擇一）</div>
    <div class="day-panel-btns">
      <button id="btn-taken-${key}"  class="status-btn ${medTaken  ? 'active-taken'  : ''}" onclick="setMed('${key}','taken')">✅ 有吃藥</button>
      <button id="btn-missed-${key}" class="status-btn ${medMissed ? 'active-missed' : ''}" onclick="setMed('${key}','missed')">❌ 忘記吃藥</button>
    </div>

    <div class="day-panel-section-label">🌱 好習慣（可與上方同時選）</div>
    <div class="day-panel-btns">
      <button id="btn-habit-${key}" class="status-btn ${habit ? 'active-habit' : ''}" onclick="setHabit('${key}')">🌱 好習慣完成</button>
    </div>

    <div class="day-panel-section-label">😊 今天心情</div>
    <div class="mood-row">${moodBtns}</div>

    <textarea class="day-note" placeholder="📝 備註（可選填）" oninput="setNote('${key}', this.value)">${r.note || ''}</textarea>

    <button class="day-panel-close" onclick="toggleDayPanel(${year},${month},${d},'${key}')">收起 ▲</button>
  `;

  return panel;
}

// 吃藥互斥：再點同一個取消，點另一個切換
function setMed(key, status) {
  if (!dayRecords[key]) dayRecords[key] = {};
  dayRecords[key].med = (dayRecords[key].med === status) ? null : status;
  // 更新兩個吃藥按鈕的樣式
  const r = dayRecords[key];
  document.getElementById('btn-taken-'  + key).className = 'status-btn' + (r.med === 'taken'  ? ' active-taken'  : '');
  document.getElementById('btn-missed-' + key).className = 'status-btn' + (r.med === 'missed' ? ' active-missed' : '');
  // 更新格子顏色
  refreshDayCell(key);
}

// 好習慣獨立 toggle
function setHabit(key) {
  if (!dayRecords[key]) dayRecords[key] = {};
  dayRecords[key].habit = !dayRecords[key].habit;
  const habitBtn = document.getElementById('btn-habit-' + key);
  habitBtn.className = 'status-btn' + (dayRecords[key].habit ? ' active-habit' : '');
  refreshDayCell(key);
}

// 心情 emoji：再點同一個取消
function setMood(key, mood) {
  if (!dayRecords[key]) dayRecords[key] = {};
  dayRecords[key].mood = (dayRecords[key].mood === mood) ? null : mood;
  // 更新所有心情按鈕樣式
  MOODS.forEach(m => {
    const btn = document.getElementById(`btn-mood-${key}-${m}`);
    if (btn) btn.className = 'mood-btn' + (dayRecords[key].mood === m ? ' active-mood' : '');
  });
  // 重新渲染月曆（讓格子 emoji 更新）
  renderCalendar();
}

// 只更新格子顏色，不重新渲染整個月曆
function refreshDayCell(key) {
  const el = document.querySelector('.cal-day.opened');
  if (!el) return;
  ['taken','missed','habit','noted'].forEach(c => el.classList.remove(c));
  getDayClasses(key).forEach(c => el.classList.add(c));
}

function setNote(key, value) {
  if (!dayRecords[key]) dayRecords[key] = {};
  dayRecords[key].note = value;
  // 不 re-render 避免 textarea 游標跳掉，只更新格子顏色
  const cells = document.querySelectorAll('.cal-day.opened');
  cells.forEach(el => {
    ['taken','missed','habit','noted'].forEach(c => el.classList.remove(c));
    getDayClasses(key).forEach(c => el.classList.add(c));
  });
}

function changeMonth(dir) {
  openedDay = null;
  calDate.setMonth(calDate.getMonth() + dir);
  renderCalendar();
}

// ── 打卡清單（使用者可編輯）──
let medData = [
  { name: '血壓藥',   time: '08:00', checked: false },
  { name: '維他命 C', time: '08:00', checked: false },
  { name: '腸胃藥',   time: '12:00', checked: false },
  { name: '安眠藥',   time: '22:00', checked: false },
];

let habitData = [
  { name: '喝 2000ml 水',  time: '00:00', checked: false },
  { name: '運動 30 分鐘',  time: '18:00', checked: false },
  { name: '閱讀 20 頁',    time: '21:00', checked: false },
];

// 目前顯示的清單
let currentList = medData;

function renderMedList(data) {
  currentList = data;
  const list = document.getElementById('medList');

  if (data.length === 0) {
    list.innerHTML = '<p class="med-empty">尚未新增任何項目</p>';
    return;
  }

  list.innerHTML = data.map((m, i) => `
    <div class="med-item" id="med-item-${i}">
      <button class="med-check ${m.checked ? 'checked' : ''}" onclick="toggleCheck(${i})">${m.checked ? '✓' : ''}</button>
      <div class="med-info">
        <div class="med-name">${m.name}</div>
        <div class="med-time">⏰ ${m.time}</div>
      </div>
      <button class="med-edit-btn" onclick="editMed(${i})">✏️</button>
      <button class="med-del-btn"  onclick="deleteMed(${i})">🗑️</button>
    </div>
  `).join('');
}

function toggleCheck(i) {
  currentList[i].checked = !currentList[i].checked;
  renderMedList(currentList);
}

function deleteMed(i) {
  currentList.splice(i, 1);
  renderMedList(currentList);
}

function editMed(i) {
  const item = currentList[i];
  const row = document.getElementById('med-item-' + i);

  // 將那筆換成編輯模式
  row.innerHTML = `
    <input class="med-edit-name" id="edit-name-${i}" value="${item.name}" placeholder="藥名" />
    <input class="med-edit-time" id="edit-time-${i}" type="time" value="${item.time}" />
    <button class="med-save-btn" onclick="saveMed(${i})">✅ 儲存</button>
  `;
}

function saveMed(i) {
  const name = document.getElementById('edit-name-' + i).value.trim();
  const time = document.getElementById('edit-time-' + i).value;
  if (!name) return;
  currentList[i].name = name;
  currentList[i].time = time;
  renderMedList(currentList);
}

// ── 新增藥物 ──
function addMed() {
  const nameEl = document.getElementById('addMedName');
  const timeEl = document.getElementById('addMedTime');
  const name = nameEl.value.trim();
  const time = timeEl.value;
  if (!name || !time) return;
  currentList.push({ name, time, checked: false });
  nameEl.value = '';
  timeEl.value = '';
  renderMedList(currentList);
}