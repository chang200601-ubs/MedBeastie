// ── Page Navigation ──
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const el = document.getElementById('nav-' + name);
  if (el) el.classList.add('active');
  return false;
}

// ── Hamburger / Drawer ──
function closeDrawer() {
  document.getElementById('navDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
}

document.getElementById('hamburgerBtn').addEventListener('click', () => {
  document.getElementById('navDrawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('open');
});
