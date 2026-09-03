// ---- Page navigation ----
var pages = document.querySelectorAll('.page');
var navLinks = document.querySelectorAll('[data-nav]');
var navMenu = document.getElementById('main-nav');
var navToggle = document.getElementById('nav-toggle');

function showPage(id) {
  pages.forEach(function (p) {
    p.classList.toggle('active', p.id === id);
  });
  navLinks.forEach(function (l) {
    l.classList.toggle('active', l.getAttribute('data-nav') === id);
  });
  window.scrollTo(0, 0);
}

function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    showPage(link.getAttribute('data-nav'));
    closeMenu();
  });
});

navToggle.addEventListener('click', function () {
  var isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

window.addEventListener('resize', function () {
  if (window.innerWidth > 760) closeMenu();
});

// ---- Threat ticker ----
var feed = [
  { time: '04:12:09', vector: 'PHISHING', level: 'critical', detail: 'Spoofed bank SMS requesting KYC re-verification' },
  { time: '04:12:41', vector: 'SIM SWAP', level: 'critical', detail: 'Duplicate SIM issued via forged ID at retail outlet' },
  { time: '04:13:15', vector: 'UPI FRAUD', level: 'caution', detail: 'QR code manipulated to trigger a collect request' },
  { time: '04:13:52', vector: 'RANSOMWARE', level: 'critical', detail: 'Encrypted file share traced to a malicious macro' },
  { time: '04:14:20', vector: 'JOB SCAM', level: 'caution', detail: 'Advance fee requested for a fabricated work-from-home offer' },
  { time: '04:14:58', vector: 'DEEPFAKE', level: 'critical', detail: 'Voice clone used in a fake emergency call for funds' },
  { time: '04:15:33', vector: 'BEC', level: 'critical', detail: 'Invoice altered mid-thread, bank details swapped' },
  { time: '04:16:02', vector: 'CREDENTIAL LEAK', level: 'contained', detail: 'Reused password surfaced in a third-party breach dump' },
];

var body = document.getElementById('terminal-body');
var i = 0;

function addRow() {
  if (i >= feed.length) {
    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '_';
    body.appendChild(cursor);
    return;
  }
  var e = feed[i];
  var row = document.createElement('div');
  row.className = 'log-row';
  row.innerHTML =
    '<span class="log-time">' + e.time + '</span>' +
    '<span class="log-vector ' + e.level + '">' + e.vector + '</span>' +
    '<span class="log-detail">' + e.detail + '</span>';
  body.appendChild(row);
  i++;
  setTimeout(addRow, 550);
}
addRow();