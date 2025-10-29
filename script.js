// Basic terminal-style portfolio interactions
const outputEl = document.getElementById('output');
const inputEl = document.getElementById('userInput');

function appendLine(text, className) {
  const line = document.createElement('div');
  line.className = className ? className : 'line';
  line.textContent = text;
  outputEl.appendChild(line);
  outputEl.scrollTop = outputEl.scrollHeight;
}

function clearOutput() {
  outputEl.innerHTML = '';
}

function renderCommands() {
  const container = document.createElement('div');
  container.className = 'commands';

  const buttons = [
    { label: 'about', cmd: 'about' },
    { label: 'work', cmd: 'work' },
    { label: 'contact', cmd: 'contact' },
    { label: 'resume', cmd: 'resume' },
    { label: 'help', cmd: 'help' },
    { label: 'clear', cmd: 'clear' }
  ];

  buttons.forEach(({ label, cmd }) => {
    const b = document.createElement('button');
    b.className = 'cmd';
    b.type = 'button';
    b.setAttribute('aria-label', `Run ${label} command`);
    b.textContent = label;
    b.addEventListener('click', () => runCommand(cmd));
    container.appendChild(b);
  });

  outputEl.appendChild(container);
  outputEl.scrollTop = outputEl.scrollHeight;
}

function renderWelcome() {
  appendLine('welcome to david\'s portfolio terminal', 'line2');
  appendLine('type a command or use the buttons below');
  appendLine('try "help" to see all commands');
  renderCommands();
}

function renderAbout() {
  appendLine('about', 'line2');
  appendLine('i\'m david owusu-acheaw, a graphic designer focused on brand identity,');
  appendLine('typography, and striking visual systems. i turn ideas into visuals that');
  appendLine('are simple, memorable, and strategic.');
}

function renderWork() {
  appendLine('selected work', 'line2');
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
  grid.style.gap = '12px';
  grid.style.marginTop = '10px';

  const projects = [
    { title: 'Icey Campaign', src: 'images/icey.jpg' },
    { title: 'Brand System A', src: 'images/icey.jpg' },
    { title: 'Poster Series', src: 'images/icey.jpg' },
    { title: 'Typography Study', src: 'images/icey.jpg' }
  ];

  projects.forEach(p => {
    const card = document.createElement('figure');
    card.style.margin = '0';
    card.style.background = '#111';
    card.style.border = '1px solid rgba(255,255,255,0.08)';
    card.style.borderRadius = '8px';
    card.style.overflow = 'hidden';
    card.style.cursor = 'pointer';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${p.title} – open image`);

    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.title;
    img.style.width = '100%';
    img.style.height = '140px';
    img.style.objectFit = 'cover';

    const cap = document.createElement('figcaption');
    cap.textContent = p.title;
    cap.style.padding = '8px 10px';
    cap.style.fontSize = '0.9rem';
    cap.style.color = '#b6ffd8';

    card.appendChild(img);
    card.appendChild(cap);

    const openPreview = () => openLightbox(p.src, p.title);
    card.addEventListener('click', openPreview);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPreview();
      }
    });

    grid.appendChild(card);
  });

  outputEl.appendChild(grid);
  outputEl.scrollTop = outputEl.scrollHeight;
}

function openLightbox(src, title) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.7)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';

  const wrapper = document.createElement('div');
  wrapper.style.maxWidth = '90vw';
  wrapper.style.maxHeight = '85vh';
  wrapper.style.outline = '2px solid #00ff9f';
  wrapper.style.borderRadius = '8px';
  wrapper.style.overflow = 'hidden';
  wrapper.style.background = '#000';

  const img = document.createElement('img');
  img.src = src;
  img.alt = title;
  img.style.display = 'block';
  img.style.maxWidth = '90vw';
  img.style.maxHeight = '85vh';
  img.style.objectFit = 'contain';

  wrapper.appendChild(img);
  overlay.appendChild(wrapper);
  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.addEventListener('click', close);
  window.addEventListener('keydown', function onEsc(e) {
    if (e.key === 'Escape') {
      window.removeEventListener('keydown', onEsc);
      close();
    }
  });
}

function renderContact() {
  appendLine('contact', 'line2');
  appendLine('email: david.oacheaw@example.com');
  appendLine('instagram: @yourhandle');
  appendLine('dribbble/behance: add your links');
}

function renderResume() {
  appendLine('resume', 'line2');
  appendLine('request a copy via email, or link a PDF here.');
}

function renderHelp() {
  appendLine('available commands', 'line2');
  appendLine('about  – who i am');
  appendLine('work   – selected projects');
  appendLine('contact– get in touch');
  appendLine('resume – resume info');
  appendLine('clear  – clear screen');
}

function runCommand(cmdRaw) {
  const cmd = (cmdRaw || '').trim().toLowerCase();
  if (!cmd) return;
  appendLine(`> ${cmd}`, 'command');

  switch (cmd) {
    case 'about':
      renderAbout();
      break;
    case 'work':
      renderWork();
      break;
    case 'contact':
      renderContact();
      break;
    case 'resume':
      renderResume();
      break;
    case 'help':
      renderHelp();
      break;
    case 'clear':
      clearOutput();
      break;
    default:
      appendLine('command not found. try "help"');
  }
  renderCommands();
}

// Input handling
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const val = inputEl.value;
    inputEl.value = '';
    runCommand(val);
  }
});

// Initial render
renderWelcome();

