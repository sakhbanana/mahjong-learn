// main.js

// Сопоставление эмодзи → название (для корейского маджонга)
const tileNames = {
  '🀇': 'Пинь 1 (кружок)', '🀈': 'Пинь 2', '🀉': 'Пинь 3', '🀊': 'Пинь 4', '🀋': 'Пинь 5',
  '🀌': 'Пинь 6', '🀍': 'Пинь 7', '🀎': 'Пинь 8', '🀏': 'Пинь 9',
  '🀙': 'Соу 1 (бамбук)', '🀚': 'Соу 2', '🀛': 'Соу 3', '🀜': 'Соу 4', '🀝': 'Соу 5',
  '🀞': 'Соу 6', '🀟': 'Соу 7', '🀠': 'Соу 8', '🀡': 'Соу 9',
  '🀐': 'Мань 1 (иероглиф)', '🀑': 'Мань 2', '🀒': 'Мань 3', '🀓': 'Мань 4', '🀔': 'Мань 5',
  '🀕': 'Мань 6', '🀖': 'Мань 7', '🀗': 'Мань 8', '🀘': 'Мань 9',
  '🀀': 'Восток', '🀁': 'Юг', '🀂': 'Запад', '🀃': 'Север',
  '🀆': 'Зелёный дракон', '🀅': 'Красный дракон'
  // Белый дракон (🀄) редко используется в корейском — можно добавить при желании
};

// Показ названия при клике
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('tile')) {
    const char = e.target.textContent.trim();
    const name = tileNames[char] || 'Неизвестный тайл';
    alert(`Тайл: ${name}`);
    
    // Опционально: звук
    // playSound('click');
  }
});

// Звуки (раскомментируй, если добавишь папку sounds/)
/*
function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play().catch(e => console.log("Звук отключён:", e));
}
*/

// Проверка комбинаций (упрощённая)
function checkHand(tiles) {
  const counts = {};
  tiles.forEach(t => counts[t] = (counts[t] || 0) + 1);

  const pungs = []; // сеты (3 одинаковых)
  const pairs = []; // пары
  const singles = []; // остатки

  for (const [tile, count] of Object.entries(counts)) {
    if (count >= 3) {
      pungs.push(tile);
      if (count === 4) singles.push(tile); // четвёртый — остаётся
    } else if (count === 2) {
      pairs.push(tile);
    } else {
      singles.push(...Array(count).fill(tile));
    }
  }

  // Простая проверка чоу (ряды) — только для числовых мастей
  const numericTiles = singles.filter(t => '🀇🀈🀉🀊🀋🀌🀍🀎🀏🀙🀚🀛🀜🀝🀞🀟🀠🀡🀐🀑🀒🀓🀔🀕🀖🀗🀘'.includes(t));
  const chows = findChows(numericTiles);

  // Готовая рука: 4 комбинации (пунги/чоу) + 1 пара
  const totalMelds = pungs.length + chows.length;
  const hasPair = pairs.length >= 1;

  return {
    pungs,
    chows,
    pairs,
    isComplete: totalMelds === 4 && hasPair
  };
}

// Найти последовательности (чоу) — очень упрощённо
function findChows(tiles) {
  // Группируем по масти
  const suits = {
    pin: [], // 🀇-🀏
    sou: [], // 🀙-🀡
    man: []  // 🀐-🀘
  };

  tiles.forEach(t => {
    if ('🀇🀈🀉🀊🀋🀌🀍🀎🀏'.includes(t)) suits.pin.push(t);
    else if ('🀙🀚🀛🀜🀝🀞🀟🀠🀡'.includes(t)) suits.sou.push(t);
    else if ('🀐🀑🀒🀓🀔🀕🀖🀗🀘'.includes(t)) suits.man.push(t);
  });

  let chowCount = 0;

  for (const suit of Object.values(suits)) {
    const codes = suit.map(t => t.codePointAt(0)).sort((a, b) => a - b);
    const unique = [...new Set(codes)];
    // Ищем тройки подряд
    for (let i = 0; i <= unique.length - 3; i++) {
      if (unique[i+1] === unique[i] + 1 && unique[i+2] === unique[i] + 2) {
        chowCount++;
        // Удаляем использованные (упрощённо)
        break;
      }
    }
  }

  return Array(chowCount).fill('chow');
}

// Экспортируем, если нужно (для trainer.html)
window.checkHand = checkHand;
window.tileNames = tileNames;
