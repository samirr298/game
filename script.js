const WORDS = [
  { word: 'घर', hint: 'जहाँ हामी बस्छौँ' },
  { word: 'चिया', hint: 'तातो पेय पदार्थ' },
  { word: 'किताब', hint: 'पढ्ने कुरा' },
  { word: 'फूल', hint: 'बगैँचामा फुल्छ' },
  { word: 'कुकुर', hint: 'घरमा पालिने जनावर' },
  { word: 'आम', hint: 'गर्मीमा पाइने मीठो फल' },
  { word: 'विद्यालय', hint: 'पढ्न जाने ठाउँ' },
  { word: 'छाता', hint: 'पानीबाट बचाउँछ' },
  { word: 'बस', hint: 'सडकमा चल्ने सवारी' },
  { word: 'दियो', hint: 'उज्यालो दिने वस्तु' },
  { word: 'पहाड', hint: 'धेरै अग्लो जमिन' },
  { word: 'नदी', hint: 'बग्ने पानी' },
  { word: 'केरा', hint: 'पहेंलो फल' },
  { word: 'चस्मा', hint: 'आँखामा लगाइन्छ' },
  { word: 'घडी', hint: 'समय देखाउँछ' },
  { word: 'हात्ती', hint: 'ठूलो जनावर' },
  { word: 'चन्द्रमा', hint: 'राति आकाशमा देखिन्छ' },
  { word: 'मोबाइल', hint: 'फोन गर्न प्रयोग हुन्छ' },
  { word: 'आमा', hint: 'परिवारको माया' }
];

const HISTORY_KEY = 'shabda-chhali-used-words';
const state = { players: [], currentPlayer: 0, word: null, imposterIndex: -1 };
const $ = (selector) => document.querySelector(selector);

const screens = {
  setup: $('#setupScreen'),
  reveal: $('#revealScreen'),
  discussion: $('#discussionScreen')
};

function getUsedWords() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch { return []; }
}

function chooseWord() {
  let used = getUsedWords();
  let available = WORDS.filter((item) => !used.includes(item.word));
  if (!available.length) {
    used = [];
    available = [...WORDS];
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  }
  const selected = available[Math.floor(Math.random() * available.length)];
  localStorage.setItem(HISTORY_KEY, JSON.stringify([...used, selected.word]));
  return selected;
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nepaliNumber(number) {
  return String(number).replace(/[0-9]/g, (digit) => '०१२३४५६७८९'[digit]);
}

function updatePlayerCount() {
  const count = state.players.length || document.querySelectorAll('.name-row').length;
  $('#playerCount').textContent = `${nepaliNumber(count)} जना`;
}

function addNameInput(value = '') {
  const list = $('#nameList');
  if (list.children.length >= 10) return;
  const index = list.children.length + 1;
  const row = document.createElement('label');
  row.className = 'name-row';
  row.innerHTML = `<span class="name-number">${nepaliNumber(index)}</span><input type="text" maxlength="18" placeholder="खेलाडी ${nepaliNumber(index)} को नाम" value="${value}" ${index === 1 ? 'autofocus' : ''}>`;
  list.appendChild(row);
  updatePlayerCount();
}

function prepareReveal() {
  const playerName = state.players[state.currentPlayer];
  $('#revealProgress').textContent = `खेलाडी ${nepaliNumber(state.currentPlayer + 1)} / ${nepaliNumber(state.players.length)}`;
  $('#revealTitle').textContent = playerName;
  $('#revealButton').classList.remove('hidden');
  $('#secretResult').classList.add('hidden');
  $('#revealButton').focus();
}

function revealRole() {
  const isImposter = state.currentPlayer === state.imposterIndex;
  $('#resultLabel').textContent = isImposter ? 'तपाईंको गोप्य भूमिका' : 'तपाईंको शब्द';
  $('#secretWord').textContent = isImposter ? 'छली' : state.word.word;
  $('#resultHint').textContent = isImposter ? 'तपाईंलाई शब्द थाहा छैन। अरूको कुरा सुनेर मिल्ने जस्तो संकेत दिनुहोस्!' : `${state.word.hint} — शब्द सीधै नभन्नुहोस्।`;
  $('#revealButton').classList.add('hidden');
  $('#secretResult').classList.remove('hidden');
}

$('#setupForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const names = [...document.querySelectorAll('.name-row input')].map((input, index) => input.value.trim() || `खेलाडी ${nepaliNumber(index + 1)}`);
  if (names.length < 3) return;
  state.players = names;
  state.currentPlayer = 0;
  state.word = chooseWord();
  state.imposterIndex = Math.floor(Math.random() * state.players.length);
  showScreen('reveal');
  prepareReveal();
});

$('#addPlayerButton').addEventListener('click', () => addNameInput());
$('#revealButton').addEventListener('click', revealRole);
$('#nextPlayerButton').addEventListener('click', () => {
  state.currentPlayer += 1;
  if (state.currentPlayer >= state.players.length) showScreen('discussion');
  else prepareReveal();
});
$('#backToSetup').addEventListener('click', () => showScreen('setup'));
$('#newRoundButton').addEventListener('click', () => {
  state.currentPlayer = 0;
  state.word = chooseWord();
  state.imposterIndex = Math.floor(Math.random() * state.players.length);
  showScreen('reveal');
  prepareReveal();
});
$('#resetHistoryButton').addEventListener('click', () => {
  localStorage.removeItem(HISTORY_KEY);
  $('#resetHistoryButton').textContent = 'शब्दको सूची खाली भयो ✓';
});

const dialog = $('#helpDialog');
$('#helpButton').addEventListener('click', () => dialog.showModal());
$('#closeHelp').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

addNameInput();
addNameInput();
addNameInput();
