// ── Medicine Data ──
const allMeds = [
  { name: '阿斯匹靈', category: '止痛/退燒', desc: '用於緩解輕至中度疼痛、退燒，也可預防心血管疾病。' },
  { name: '普拿疼',   category: '止痛/退燒', desc: '廣泛用於頭痛、發燒及輕度疼痛，應避免與酒精並用。' },
  { name: '胃乳片',   category: '腸胃',      desc: '中和胃酸，緩解胃灼熱與消化不良。' },
  { name: '抗組織胺', category: '過敏',      desc: '減輕過敏症狀如打噴嚏、流鼻水、皮膚癢等。' },
];

function renderMedCards(data) {
  document.getElementById('medCards').innerHTML = data.map(m => `
    <div class="med-card">
      <h4>${m.name}</h4>
      <p>${m.desc}</p>
      <span class="tag">${m.category}</span>
    </div>
  `).join('');
}

function searchMed() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const results = q
    ? allMeds.filter(m => m.name.includes(q) || m.category.includes(q))
    : allMeds;
  renderMedCards(results.length ? results : [{ name: '找不到結果', category: '—', desc: '請嘗試其他關鍵字。' }]);
}

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') searchMed();
});
