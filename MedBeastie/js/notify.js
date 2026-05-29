// ── 提醒清單，每筆：{ time: "HH:MM", msg: "...", fired: false } ──
const reminders = [];

// ── 請求通知權限 ──
function requestPermission() {
  if (!('Notification' in window)) {
    showNotifyStatus('⚠️ 你的瀏覽器不支援通知功能', 'warn');
    return;
  }
  if (Notification.permission === 'granted') return;
  Notification.requestPermission().then(permission => {
    if (permission !== 'granted') {
      showNotifyStatus('⚠️ 請允許通知權限才能使用提醒功能', 'warn');
    }
  });
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

// ── 每分鐘檢查時間 ──
function checkReminders() {
  const now   = new Date();
  const hh    = String(now.getHours()).padStart(2, '0');
  const mm    = String(now.getMinutes()).padStart(2, '0');
  const nowStr = `${hh}:${mm}`;

  reminders.forEach(r => {
    if (r.time === nowStr && !r.fired) {
      r.fired = true;
      fireNotification(r.msg);
    }
    // 隔天重置（換到新的一分鐘後就能再觸發）
    if (r.time !== nowStr) r.fired = false;
  });
}

function fireNotification(msg) {
  if (Notification.permission === 'granted') {
    new Notification('MedBeastie 🐾', {
      body: msg,
      icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bear/3D/bear_3d.png'
    });
  }
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
setInterval(checkReminders, 10000); // 每 10 秒檢查一次（更即時）