// main.js — простая учебная логика
// Ожидает папку tiles/regular/... со svg-тайлами.
// Если названия у вашего набора другие, поправьте TILE_LIST.

const TILE_LIST = [
  // масти — m = characters (man), p = circles (pin), s = bamboo (sou)
  'Man1.svg','Man2.svg','Man3.svg','Man4.svg','Man5.svg','Man6.svg','Man7.svg','Man8.svg','Man9.svg',
  'Pin1.svg','Pin2.svg','Pin3.svg','Pin4.svg','Pin5.svg','Pin6.svg','Pin7.svg','Pin8.svg','Pin9.svg',
  'Sou1.svg','Sou2.svg','Sou3.svg','Sou4.svg','Sou5.svg','Sou6.svg','Sou7.svg','Sou8.svg','Sou9.svg',
  // ветра и драконы (часто называются east/west/south/north/white/green/red)
  'Chun.svg','Haku.svg','Hatsu.svg','Nan.svg','Pei.svg','Shaa.svg','Ton.svg'
  // цветочные/сезонные необязательные: flower1..4, season1..4
  // если есть
];

const TILE_BASE = 'tiles/regular/'; // путь; если вы использовали submodule: public/tiles/riichi-tiles/Regular/
const TILE_BASE_ALT = 'public/tiles/riichi-tiles/Regular/'; // возможный путь если submodule

function tilePath(name){
  // попробуем оба пути (независимо от выбора)
  return TILE_BASE + name;
}

// --- Превью на главной ---
function initPreview(){
  const el = document.getElementById('preview-tiles');
  if(!el) return;
  const sample = TILE_LIST.slice(0, 18);
  sample.forEach(fn=>{
    const wrap = document.createElement('div');
    wrap.className = 'tile';
    const img = document.createElement('img');
    img.src = tryPaths(fn);
    img.alt = fn;
    img.onclick = ()=> alert(prettifyName(fn));
    wrap.appendChild(img);
    el.appendChild(wrap);
  });
}

function tryPaths(fn){
  // пытаемся вернуть существующий путь (браузер проверит сам — но подготовим оба варианта)
  // проще: сначала основной путь; если не найден — пользователь сам поправит
  return TILE_BASE + fn;
}

function prettifyName(fn){
  return fn.replace('.svg','').replace(/([a-z]+)(\d*)/i, (m,p,n)=> (p.toUpperCase() + (n||'')));
}

// --- Урок: показать все плитки кликабельные ---
function initLessonTiles(){
  const el = document.getElementById('lesson-tiles-grid');
  if(!el) return;
  TILE_LIST.forEach(fn=>{
    const wrap = document.createElement('div');
    wrap.className = 'tile';
    const img = document.createElement('img');
    img.src = tryPaths(fn);
    img.alt = fn;
    img.onclick = ()=> {
      showTileInfo(fn);
    };
    wrap.appendChild(img);
    el.appendChild(wrap);
  });
}

function showTileInfo(fn){
  const name = prettifyName(fn);
  alert(`Плитка: ${name}\nФайл: ${fn}\n(Дополни урок: описание этой плитки и её роль в корейском маджонге)`);
}

// --- Урок 2: генерация руки и подсказка на найдённые пон/чоу ---
function initHandTrainer(){
  const el = document.getElementById('hand-area');
  if(!el) return;
  const btn = document.getElementById('shuffle-hand');
  btn.onclick = ()=> renderHand(el, generateRandomHand());
  // initial
  renderHand(el, generateRandomHand());
}

function generateRandomHand(){
  // простая реализация: случайные 13 плиток из TILE_LIST (с повторениями)
  const hand=[];
  for(let i=0;i<13;i++){
    const idx = Math.floor(Math.random()*TILE_LIST.length);
    hand.push(TILE_LIST[idx]);
  }
  return hand;
}

function renderHand(container, hand){
  container.innerHTML='';
  hand.forEach((t, i)=>{
    const d = document.createElement('div');
    d.className='tile';
    const img = document.createElement('img');
    img.src = tryPaths(t);
    img.alt = t;
    d.appendChild(img);
    container.appendChild(d);
  });
  const hint = document.getElementById('hand-hint');
  hint.textContent = findSimpleSets(hand);
}

function findSimpleSets(hand){
  // Очень упрощённо: ищем три одинаковых (pon) или последовательности в одной масти (chow)
  // Интерпретируем имена m1..m9, p1..p9, s1..s9
  const counts = {};
  hand.forEach(t=> counts[t] = (counts[t]||0)+1);
  const pons = Object.keys(counts).filter(k=>counts[k]>=3);
  if(pons.length) return 'Пон: ' + pons.map(prettifyName).join(', ');

  // для chow пытаемся найти x, x+1, x+2 в одной масти
  const numeric = hand.map(t=>{
    const m = t.match(/^([mps])(\d)/);
    if(m) return {s:m[1], n:parseInt(m[2]), raw:t};
    return null;
  }).filter(Boolean);

  for(let i=0;i<numeric.length;i++){
    const a = numeric[i];
    if(numeric.some(x=>x.s===a.s && x.n===a.n+1) && numeric.some(x=>x.s===a.s && x.n===a.n+2)){
      return 'Чоу возможен в масти ' + a.s.toUpperCase() + ' (пример: ' + a.n + ',' + (a.n+1) + ',' + (a.n+2) + ')';
    }
  }
  return 'Пон/Чоу не найдено (попробуйте другую руку)';
}

// --- Урок 3: простая головоломка ---
function initPuzzle(){
  const area = document.getElementById('puzzle-area');
  if(!area) return;
  const btn = document.getElementById('reset-puzzle');
  const chk = document.getElementById('show-solution');
  btn.onclick = ()=> createPuzzle(area, chk.checked);
  chk.onchange = ()=> createPuzzle(area, chk.checked);
  createPuzzle(area, chk.checked);
}

function createPuzzle(area, showSolution){
  area.innerHTML='';
  // простая реализация: создаём 13 случайных и предложим 3 варианта (drop1, drop2, drop3)
  const hand = generateRandomHand();
  const variants = [
    generateRandomTileChoice(),
    generateRandomTileChoice(),
    generateRandomTileChoice()
  ];
  // render hand
  const hdiv = document.createElement('div');
  hdiv.className='hand-area';
  hand.forEach(t=>{
    const d = document.createElement('div'); d.className='tile';
    const img=document.createElement('img'); img.src=tryPaths(t);
    d.appendChild(img); hdiv.appendChild(d);
  });
  area.appendChild(hdiv);

  const opts = document.createElement('div');
  opts.style.marginTop='10px';
  variants.forEach((v, i)=>{
    const b = document.createElement('button');
    b.className='btn';
    b.style.marginRight='8px';
    b.textContent = 'Сбросить ' + prettifyName(v);
    b.onclick = ()=>{
      alert('Вы сбросили '+prettifyName(v)+'. Проверка: (упрощённо) если это дает набор — поздравляю!');
    };
    opts.appendChild(b);
  });
  area.appendChild(opts);

  if(showSolution){
    const sol = document.createElement('div');
    sol.className='preview';
    sol.style.marginTop='10px';
    sol.textContent = 'Подсказка: ищите пары/пон/чоу в руке — попробуйте подобрать вариант для сброса, который даёт завершённую комбинацию.';
    area.appendChild(sol);
  }
}

function generateRandomTileChoice(){
  return TILE_LIST[Math.floor(Math.random()*TILE_LIST.length)];
}

// --- Тренажёр ---
function initTrainer(){
  const el = document.getElementById('trainer-hand');
  if(!el) return;
  const btn = document.getElementById('trainer-deal');
  const suggest = document.getElementById('trainer-suggest');
  btn.onclick = ()=> renderTrainerHand(el, generateRandomHand());
  suggest.onclick = ()=> {
    document.getElementById('trainer-message').textContent = 'Подсказка: ищите повторяющиеся плитки или последовательности (учебная подсказка).';
  };
  renderTrainerHand(el, generateRandomHand());
}

function renderTrainerHand(container, hand){
  container.innerHTML='';
  hand.forEach((t,i)=>{
    const d = document.createElement('div'); d.className='tile';
    const img=document.createElement('img'); img.src=tryPaths(t);
    img.onclick = ()=> {
      // remove tile (drop)
      hand.splice(i,1);
      renderTrainerHand(container, hand);
      document.getElementById('trainer-message').textContent = 'Вы сбросили ' + prettifyName(t);
    };
    d.appendChild(img); container.appendChild(d);
  });
}
