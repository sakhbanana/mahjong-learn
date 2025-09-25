// main.js

// === НАЗВАНИЯ ТАЙЛОВ ===
const tileNames = {
  '🀇': 'Пинь 1 (кружки)', '🀈': 'Пинь 2', '🀉': 'Пинь 3', '🀊': 'Пинь 4', '🀋': 'Пинь 5',
  '🀌': 'Пинь 6', '🀍': 'Пинь 7', '🀎': 'Пинь 8', '🀏': 'Пинь 9',
  '🀙': 'Соу 1 (бамбуки)', '🀚': 'Соу 2', '🀛': 'Соу 3', '🀜': 'Соу 4', '🀝': 'Соу 5',
  '🀞': 'Соу 6', '🀟': 'Соу 7', '🀠': 'Соу 8', '🀡': 'Соу 9',
  '🀐': 'Мань 1 (иероглифы)', '🀑': 'Мань 2', '🀒': 'Мань 3', '🀓': 'Мань 4', '🀔': 'Мань 5',
  '🀕': 'Мань 6', '🀖': 'Мань 7', '🀗': 'Мань 8', '🀘': 'Мань 9',
  '🀀': 'Восток', '🀁': 'Юг', '🀂': 'Запад', '🀃': 'Север',
  '🀅': 'Красный дракон', '🀆': 'Зелёный дракон', '🀄': 'Белый дракон'
};

// === ЗВУКИ ===
function playSound(name) {
  // Создаём аудио "на лету" — не нужно хранить файлы
  const sounds = {
    click: "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",
    success: "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
  };

  if (sounds[name]) {
    const audio = new Audio(sounds[name]);
    audio.volume = 0.4;
    audio.play().catch(e => console.log("Звук заблокирован браузером:", e));
  }
}

// === КЛИК ПО ТАЙЛУ ===
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('tile')) {
    const char = e.target.textContent.trim();
    const name = tileNames[char] || 'Неизвестный тайл';
    alert(`Тайл: ${name}`);
    playSound('click');
  }
});

// === ЛОГИКА ПРОВЕРКИ РУКИ (оставляем как в предыдущем ответе) ===
function checkHand(tiles) {
  const counts = {};
  tiles.forEach(t => counts[t] = (counts[t] || 0) + 1);

  const pungs = [];
  const pairs = [];
  const singles = [];

  for (const [tile, count] of Object.entries(counts)) {
    if (count >= 3) {
      pungs.push(tile);
      if (count === 4) singles.push(tile);
    } else if (count === 2) {
      pairs.push(tile);
    } else {
      singles.push(...Array(count).fill(tile));
    }
  }

  const numericTiles = singles.filter(t => '🀇🀈🀉🀊🀋🀌🀍🀎🀏🀙🀚🀛🀜🀝🀞🀟🀠🀡🀐🀑🀒🀓🀔🀕🀖🀗🀘'.includes(t));
  const chows = findChows(numericTiles);

  const totalMelds = pungs.length + chows.length;
  const hasPair = pairs.length >= 1;

  return { pungs, chows, pairs, isComplete: totalMelds === 4 && hasPair };
}

function findChows(tiles) {
  const suits = { pin: [], sou: [], man: [] };
  tiles.forEach(t => {
    if ('🀇🀈🀉🀊🀋🀌🀍🀎🀏'.includes(t)) suits.pin.push(t);
    else if ('🀙🀚🀛🀜🀝🀞🀟🀠🀡'.includes(t)) suits.sou.push(t);
    else if ('🀐🀑🀒🀓🀔🀕🀖🀗🀘'.includes(t)) suits.man.push(t);
  });

  let chowCount = 0;
  for (const suit of Object.values(suits)) {
    const codes = [...new Set(suit.map(t => t.codePointAt(0)).sort((a, b) => a - b))];
    for (let i = 0; i <= codes.length - 3; i++) {
      if (codes[i+1] === codes[i] + 1 && codes[i+2] === codes[i] + 2) {
        chowCount++;
        break;
      }
    }
  }
  return Array(chowCount).fill('chow');
}

// Экспорт для других страниц
window.checkHand = checkHand;
window.tileNames = tileNames;
window.playSound = playSound;
