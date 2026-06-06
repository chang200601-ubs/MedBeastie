// ── 提醒清單，每筆：{ time: "HH:MM", msg: "...", fired: false } ──
const reminders = [];

// ── 請求通知權限 ──
function requestPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') return;
  Notification.requestPermission();
}

// ── 新增提醒 ──
function addReminder() {
  const timeInput = document.getElementById('notifyTime');
  const msgInput  = document.getElementById('notifyMsg');
  const time = timeInput.value;
  const msg  = msgInput.value.trim() || '💊 吃藥時間到了！';

  if (!time) {
    showNotifyStatus('請先選擇提醒時間', 'warn');
    return;
  }

  reminders.push({ time, msg, fired: false });
  timeInput.value = '';
  msgInput.value  = '';

  renderReminderList();
  requestPermission();
  showNotifyStatus('✅ 提醒已設定！請保持網頁開啟', 'ok');
}

// ── 刪除提醒 ──
function removeReminder(i) {
  reminders.splice(i, 1);
  renderReminderList();
}

// ── 渲染提醒清單 ──
function renderReminderList() {
  const list = document.getElementById('reminderList');
  if (reminders.length === 0) {
    list.innerHTML = '<li class="reminder-empty">尚未設定任何提醒</li>';
    return;
  }
  list.innerHTML = reminders.map((r, i) => `
    <li class="reminder-item">
      <span class="reminder-time">⏰ ${r.time}</span>
      <span class="reminder-msg">${r.msg}</span>
      <button class="reminder-del" onclick="removeReminder(${i})">✕</button>
    </li>
  `).join('');
}

// ── 檢查時間 ──
function checkReminders() {
  const now    = new Date();
  const hh     = String(now.getHours()).padStart(2, '0');
  const mm     = String(now.getMinutes()).padStart(2, '0');
  const nowStr = `${hh}:${mm}`;

  reminders.forEach(r => {
    if (r.time === nowStr && !r.fired) {
      r.fired = true;
      fireNotification(r.msg);
    }
    if (r.time !== nowStr) r.fired = false;
  });
}

// ── 發送提醒（系統通知 + 頁面橫幅雙保險）──
function fireNotification(msg) {
  // 系統通知（如果有權限）
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    new Notification('MedBeastie 🐾', { body: msg });
  }
  // 頁面內橫幅（無論如何都會跳）
  showBanner(msg);
}

// ── 頁面橫幅提醒 ──
function showBanner(msg) {
  const existing = document.getElementById('alertBanner');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.id = 'alertBanner';
  banner.innerHTML = `
    <div class="banner-icon">🐻</div>
    <div class="banner-content">
      <div class="banner-title">MedBeastie 提醒你！</div>
      <div class="banner-msg">${msg}</div>
    </div>
    <button class="banner-close" onclick="this.parentElement.remove()">✕</button>
  `;
  document.body.appendChild(banner);
}

// ── 狀態提示文字 ──
function showNotifyStatus(text, type) {
  const el = document.getElementById('notifyStatus');
  el.textContent = text;
  el.className = 'notify-status ' + (type === 'warn' ? 'notify-warn' : 'notify-ok');
  setTimeout(() => { el.textContent = ''; el.className = 'notify-status'; }, 4000);
}

// ── 啟動 ──
renderReminderList();
setInterval(checkReminders, 10000);