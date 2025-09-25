// main.js — обновлён для riichi/корейского маджонга по стандарту FluffyStuff

// === НАЗВАНИЯ ТАЙЛОВ (риичи-стиль) ===
const tileNames = {
  // Ман (Characters) — иероглифы
  '🀐': 'Ман 1', '🀑': 'Ман 2', '🀒': 'Ман 3', '🀓': 'Ман 4', '🀔': 'Ман 5',
  '🀕': 'Ман 6', '🀖': 'Ман 7', '🀗': 'Ман 8', '🀘': 'Ман 9',
  // Пин (Dots) — кружки
  '🀇': 'Пин 1', '🀈': 'Пин 2', '🀉': 'Пин 3', '🀊': 'Пин 4', '🀋': 'Пин 5',
  '🀌': 'Пин 6', '🀍': 'Пин 7', '🀎': 'Пин 8', '🀏': 'Пин 9',
  // Соу (Bamboo) — бамбуки
  '🀙': 'Соу 1', '🀚': 'Соу 2', '🀛': 'Соу 3', '🀜': 'Соу 4', '🀝': 'Соу 5',
  '🀞': 'Соу 6', '🀟': 'Соу 7', '🀠': 'Соу 8', '🀡': 'Соу 9',
  // Ветра
  '🀀': 'Восток', '🀁': 'Юг', '🀂': 'Запад', '🀃': 'Север',
  // Драконы
  '🀅': 'Красный дракон', '🀆': 'Зелёный дракон', '🀄': 'Белый дракон'
};

// === ЦВЕТА ПО СТАНДАРТУ FluffyStuff (riichi-mahjong-tiles) ===
const TILE_COLORS = {
  man: '#C41E3A',     // красный (ман)
  pin: '#0066CC',     // синий (пин)
  sou: '#008000',     // зелёный (соу)
  wind: '#000000',    // чёрный (ветра)
  dragon: '#000000'   // драконы — чёрные (кроме цвета иероглифа)
};

// Определяем масть по символу
function getTileSuit(char) {
  if ('🀐🀑🀒🀓🀔🀕🀖🀗🀘'.includes(char)) return 'man';
  if ('🀇🀈🀉🀊🀋🀌🀍🀎🀏'.includes(char)) return 'pin';
  if ('🀙🀚🀛🀜🀝🀞🀟🀠🀡'.includes(char)) return 'sou';
  if ('🀀🀁🀂🀃'.includes(char)) return 'wind';
  if ('🀅🀆🀄'.includes(char)) return 'dragon';
  return 'other';
}

// === ГЕНЕРАЦИЯ ЦВЕТНОГО SVG-ТАЙЛА ===
function createTileSVG(char) {
  const suit = getTileSuit(char);
  let color = TILE_COLORS[suit] || '#000000';

  // Особые случаи для драконов
  if (char === '🀅') color = '#C41E3A'; // Красный дракон — красный
  if (char === '🀆') color = '#008000'; // Зелёный дракон — зелёный

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140" width="100%" height="100%">
      <rect width="100" height="140" rx="10" fill="white" stroke="#aaa" stroke-width="2"/>
      <text x="50" y="95" font-size="60" text-anchor="middle" fill="${color}" 
            font-family="sans-serif, Arial" font-weight="bold">${char}</text>
    </svg>
  `;
}

// === ЗВУКИ (base64, без внешних файлов) ===
function playSound(name) {
  const sounds = {
    click: "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",
    success: "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
  };

  if (sounds[name]) {
    const audio = new Audio(sounds[name]);
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Звук заблокирован:", e));
  }
}

// === КЛИК ПО ТАЙЛУ (для уроков и тренажёра) ===
document.addEventListener('click', (e) => {
  if (e.target.closest('.tile')) {
    const tileEl = e.target.closest('.tile');
    const char = tileEl.dataset.char || tileEl.textContent.trim();
    const name = tileNames[char] || 'Неизвестный тайл';
    alert(`Тайл: ${name}`);
    playSound('click');
  }
});

// === ЛОГИКА ПРОВЕРКИ РУКИ (для уровня 3) ===
function checkHand(tiles) {
  const counts = {};
  tiles.forEach(t => counts[t] = (counts[t] || 0) + 1);

  const pungs = []; // 3+ одинаковых
  const pairs = [];
  const singles = [];

  for (const [tile, count] of Object.entries(counts)) {
    if (count >= 3) {
      pungs.push(tile);
      if (count > 3) singles.push(...Array(count - 3).fill(tile));
    } else if (count === 2) {
      pairs.push(tile);
    } else {
      singles.push(...Array(count).fill(tile));
    }
  }

  // Поиск чоу (рядов) — только для числовых мастей
  const numericTiles = singles.filter(t => '🀇🀈🀉🀊🀋🀌🀍🀎🀏🀙🀚🀛🀜🀝🀞🀟🀠🀡🀐🀑🀒🀓🀔🀕🀖🀗🀘'.includes(t));
  const chows = findChows(numericTiles);

  const totalMelds = pungs.length + chows.length;
  const hasPair = pairs.length >= 1;

  return {
    pungs,
    chows,
    pairs,
    isComplete: totalMelds === 4 && hasPair
  };
}

function findChows(tiles) {
  const suits = { pin: [], sou: [], man: [] };
  tiles.forEach(t => {
    if ('🀇🀈🀉🀊🀋🀌🀍🀎🀏'.includes(t)) suits.pin.push(t);
    else if ('🀙🀚🀛🀜🀝🀞🀟🀠🀡'.includes(t)) suits.sou.push(t);
    else if ('🀐🀑🀒🀓🀔🀕🀖🀗🀘'.includes(t)) suits.man.push(t);
  });

  let chowCount = 0;
  for (const suitTiles of Object.values(suits)) {
    if (suitTiles.length < 3) continue;
    const codes = [...new Set(suitTiles.map(t => t.codePointAt(0)))].sort((a, b) => a - b);
    for (let i = 0; i <= codes.length - 3; i++) {
      if (codes[i+1] === codes[i] + 1 && codes[i+2] === codes[i] + 2) {
        chowCount++;
        // Удалим использованные (упрощённо)
        break;
      }
    }
  }
  return Array(chowCount).fill('chow');
}

// === ЭКСПОРТ ДЛЯ ДРУГИХ СТРАНИЦ ===
window.tileNames = tileNames;
window.createTileSVG = createTileSVG;
window.playSound = playSound;
window.checkHand = checkHand;
window.getTileSuit = getTileSuit;
