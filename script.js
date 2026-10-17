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
  { word: 'आमा', hint: 'परिवारको माया' },
  { word: 'बुबा', hint: 'परिवारका अभिभावक' },
  { word: 'दूध', hint: 'सेतो पौष्टिक पेय' },
  { word: 'भात', hint: 'दैनिक खाने मुख्य खाना' },
  { word: 'रोटी', hint: 'पिठोबाट बनाइने खाना' },
  { word: 'स्याउ', hint: 'रातो वा हरियो फल' },
  { word: 'सुन्तला', hint: 'रसिलो फल' },
  { word: 'आकाश', hint: 'हाम्रो माथि देखिन्छ' },
  { word: 'बादल', hint: 'आकाशमा तैरिन्छ' },
  { word: 'सूर्य', hint: 'दिनमा उज्यालो दिन्छ' },
  { word: 'तारा', hint: 'राति आकाशमा चम्किन्छ' },
  { word: 'वर्षा', hint: 'आकाशबाट पानी पर्छ' },
  { word: 'हावा', hint: 'देखिँदैन तर महसुस हुन्छ' },
  { word: 'रुख', hint: 'हाँगा र पात भएको बिरुवा' },
  { word: 'पात', hint: 'रुखमा हरियो हुन्छ' },
  { word: 'कमल', hint: 'पानीमा फुल्ने फूल' },
  { word: 'माछा', hint: 'पानीमा पौडिन्छ' },
  { word: 'बिरालो', hint: 'म्याउँ गर्ने घरपालुवा जनावर' },
  { word: 'घोडा', hint: 'दौडने ठूलो जनावर' },
  { word: 'खरायो', hint: 'लामो कान भएको जनावर' },
  { word: 'कुखुरा', hint: 'अण्डा दिने घरपालुवा चरा' },
  { word: 'साइकल', hint: 'दुई पाङ्ग्रे सवारी' },
  { word: 'रेल', hint: 'लिकमा चल्ने सवारी' },
  { word: 'जहाज', hint: 'आकाशमा उड्ने सवारी' },
  { word: 'बल', hint: 'खेलमा प्रयोग गरिन्छ' },
  { word: 'पतंग', hint: 'हावामा उडाइन्छ' },
  { word: 'गुडिया', hint: 'बच्चाहरू खेल्ने खेलौना' },
  { word: 'झोला', hint: 'सामान बोक्न प्रयोग हुन्छ' },
  { word: 'कलम', hint: 'लेख्न प्रयोग गरिन्छ' },
  { word: 'कुर्सी', hint: 'बस्न प्रयोग गरिन्छ' },
  { word: 'झ्याल', hint: 'घरमा हावा र उज्यालो आउने ठाउँ' },
  { word: 'ढोका', hint: 'घरभित्र पस्ने बाटो' },
  { word: 'ऐना', hint: 'आफ्नो अनुहार हेर्न सकिन्छ' },
  { word: 'बत्ती', hint: 'अँध्यारोमा उज्यालो दिन्छ' },
  { word: 'छुरी', hint: 'काट्न प्रयोग गरिन्छ' },
  { word: 'बजार', hint: 'सामान किन्न जाने ठाउँ' },
  { word: 'अस्पताल', hint: 'उपचार गर्न जाने ठाउँ' },
  { word: 'मन्दिर', hint: 'पूजा गर्न जाने ठाउँ' },
  { word: 'समुद्र', hint: 'धेरै ठूलो नुनिलो पानी' },
  { word: 'जंगल', hint: 'धेरै रुख भएको ठाउँ' }
];

const HISTORY_KEY = 'shabda-chhali-used-words';
const state = { players: [], currentPlayer: 0, word: null, imposterIndex: -1, timerId: null, secondsLeft: 120, roundMinutes: 2 };
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
  Object.values(screens).forEach((screen) => screen?.classList.remove('active'));
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
  row.innerHTML = `<span class="name-number">${nepaliNumber(index)}</span><input type="text" maxlength="18" placeholder="खेलाडी ${nepaliNumber(index)} को नाम" ${index === 1 ? 'autofocus' : ''}><button class="remove-player" type="button" aria-label="खेलाडी हटाउनुहोस्">×</button>`;
  row.querySelector('input').value = value;
  list.appendChild(row);
  updatePlayerCount();
}

function renumberPlayers() {
  document.querySelectorAll('.name-row').forEach((row, index) => {
    row.querySelector('.name-number').textContent = nepaliNumber(index + 1);
    row.querySelector('input').placeholder = `खेलाडी ${nepaliNumber(index + 1)} को नाम`;
  });
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

const setupForm = $('#setupForm');
if (setupForm) setupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const names = [...document.querySelectorAll('.name-row input')].map((input, index) => input.value.trim() || `खेलाडी ${nepaliNumber(index + 1)}`);
  if (names.length < 3) return;
  sessionStorage.setItem('shabda-chhali-players', JSON.stringify(names));
  const requestedMinutes = Number($('#roundTime').value);
  const roundMinutes = Math.min(60, Math.max(1, Number.isFinite(requestedMinutes) ? requestedMinutes : 2));
  sessionStorage.setItem('shabda-chhali-time', String(roundMinutes));
  window.open('game.html', '_blank', 'noopener');
});

if ($('#nameList')) $('#nameList').addEventListener('click', (event) => {
  if (!event.target.classList.contains('remove-player')) return;
  if (document.querySelectorAll('.name-row').length <= 3) return;
  event.target.closest('.name-row').remove();
  renumberPlayers();
});

function loadGamePlayers() {
  try {
    const names = JSON.parse(sessionStorage.getItem('shabda-chhali-players'));
    if (Array.isArray(names) && names.length >= 3) state.players = names;
  } catch { return; }
  const savedMinutes = Number(sessionStorage.getItem('shabda-chhali-time'));
  state.roundMinutes = Math.min(60, Math.max(1, Number.isFinite(savedMinutes) ? savedMinutes : 2));
}

function updateTimer() {
  const minutes = Math.floor(state.secondsLeft / 60);
  const seconds = String(state.secondsLeft % 60).padStart(2, '0');
  $('#timer').textContent = `${nepaliNumber(minutes)}:${nepaliNumber(seconds)}`;
}

function startTimer() {
  clearInterval(state.timerId);
  state.secondsLeft = state.roundMinutes * 60;
  updateTimer();
  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    updateTimer();
    if (state.secondsLeft <= 0) {
      clearInterval(state.timerId);
      $('#timer').classList.add('timer-finished');
    }
  }, 1000);
}

function startGamePage() {
  loadGamePlayers();
  if (state.players.length < 3) return;
  state.currentPlayer = 0;
  state.word = chooseWord();
  state.imposterIndex = Math.floor(Math.random() * state.players.length);
  showScreen('reveal');
  prepareReveal();
}

if ($('#addPlayerButton')) $('#addPlayerButton').addEventListener('click', () => addNameInput());
$('#revealButton').addEventListener('click', revealRole);
$('#nextPlayerButton').addEventListener('click', () => {
  state.currentPlayer += 1;
  if (state.currentPlayer >= state.players.length) {
    showScreen('discussion');
    startTimer();
  }
  else prepareReveal();
});
if (screens.setup) $('#backToSetup').addEventListener('click', () => showScreen('setup'));
$('#newRoundButton').addEventListener('click', () => {
  clearInterval(state.timerId);
  state.currentPlayer = 0;
  state.word = chooseWord();
  state.imposterIndex = Math.floor(Math.random() * state.players.length);
  showScreen('reveal');
  prepareReveal();
});
if ($('#resetHistoryButton')) $('#resetHistoryButton').addEventListener('click', () => {
  localStorage.removeItem(HISTORY_KEY);
  $('#resetHistoryButton').textContent = 'शब्दको सूची खाली भयो ✓';
});

const dialog = $('#helpDialog');
if (dialog) {
  $('#helpButton').addEventListener('click', () => dialog.showModal());
  $('#closeHelp').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
}

if (setupForm) {
  addNameInput();
  addNameInput();
  addNameInput();
}

if (document.body.dataset.page === 'game') startGamePage();
