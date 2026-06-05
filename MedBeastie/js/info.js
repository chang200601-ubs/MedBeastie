// ── 藥物清單（使用者可新增/刪除）──
let allMeds = [
  { name: '阿斯匹靈', category: '止痛/退燒', desc: '用於緩解輕至中度疼痛、退燒，也可預防心血管疾病。' },
  { name: '普拿疼',   category: '止痛/退燒', desc: '廣泛用於頭痛、發燒及輕度疼痛，應避免與酒精並用。' },
  { name: '胃乳片',   category: '腸胃',      desc: '中和胃酸，緩解胃灼熱與消化不良。' },
  { name: '抗組織胺', category: '過敏',      desc: '減輕過敏症狀如打噴嚏、流鼻水、皮膚癢等。' },
];

let currentQuery = '';

function renderMedCards(data) {
  const container = document.getElementById('medCards');
  if (data.length === 0) {
    container.innerHTML = '<p class="info-empty">找不到相關藥物，或尚未新增任何藥物。</p>';
    return;
  }
  container.innerHTML = data.map((m, i) => `
    <div class="med-card">
      <div class="med-card-top">
        <h4>${m.name}</h4>
        <button class="info-del-btn" onclick="deleteInfoMed(${allMeds.indexOf(m)})">🗑️</button>
      </div>
      <p>${m.desc || '（無說明）'}</p>
      <span class="tag">${m.category || '未分類'}</span>
    </div>
  `).join('');
}

function searchMed() {
  currentQuery = document.getElementById('searchInput').value.trim().toLowerCase();
  const results = currentQuery
    ? allMeds.filter(m => m.name.includes(currentQuery) || m.category.includes(currentQuery))
    : allMeds;
  renderMedCards(results);
}

function addInfoMed() {
  const name     = document.getElementById('infoName').value.trim();
  const category = document.getElementById('infoCategory').value.trim();
  const desc     = document.getElementById('infoDesc').value.trim();

  if (!name) {
    document.getElementById('infoName').focus();
    return;
  }

  allMeds.push({ name, category: category || '未分類', desc: desc || '' });

  // 清空欄位
  document.getElementById('infoName').value     = '';
  document.getElementById('infoCategory').value = '';
  document.getElementById('infoDesc').value     = '';

  searchMed(); // 重新套用目前的搜尋
}

function deleteInfoMed(i) {
  allMeds.splice(i, 1);
  searchMed();
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('searchInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') searchMed();
  });
});