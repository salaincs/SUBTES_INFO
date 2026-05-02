/* ═══════════════════════════════════════════
   SalaIncs · IoT Ferroviario
   dashboard/app.js — Main controller
═══════════════════════════════════════════ */

/* ── State ──────────────────────────────── */
let selLine   = 'D';
let selTrain  = null;
let fleet     = {};      // { lineKey: [{id,pos,dir,speed,dwell,dwellAt}] }
let envData   = {};      // { lineKey: [{name,co2,temp,hum,iaq,trends...}] }
let raf       = null;

/* ── Init ───────────────────────────────── */
function init() {
  buildFleet();
  buildEnvData();
  buildLineTabs();
  initMap();
  selectLine(selLine);
  startClock();
  startEnvLoop();
  startEventLoop();
  requestAnimationFrame(loop);
}

/* ── Fleet ──────────────────────────────── */
function buildFleet() {
  Object.keys(LINES).forEach(k => {
    const n = LINES[k].ests.length;
    fleet[k] = FLEET_INIT[k]
      .filter((_, i) => i < 2 || n > 10)
      .map(cfg => ({
        id: cfg.id, pos: cfg.pos, dir: cfg.dir,
        speed: 25 + Math.random() * 22,
        dwell: 0, dwellAt: -1,
        color: LINES[k].color,
        selected: false,
      }));
  });
}

function updateFleet() {
  const k = selLine;
  const L = LINES[k];
  const n = L.ests.length;
  fleet[k].forEach(f => {
    if (f.dwell > 0) { f.dwell--; return; }
    const step = (f.speed / 3600) * 0.016 / 2;
    f.pos += f.dir * step;
    // Dwell at stations
    const si  = Math.round(f.pos * (n - 1));
    const stp = si / (n - 1);
    if (Math.abs(f.pos - stp) < 0.006 && si !== f.dwellAt) {
      f.dwellAt = si;
      f.dwell   = 70 + Math.floor(Math.random() * 80);
      f.pos     = stp;
      f.speed   = 0;
    } else if (f.dwell === 0) {
      f.speed += (Math.random() - .5) * 0.5;
      f.speed  = Math.max(18, Math.min(68, f.speed));
    }
    if (f.pos >= 0.99) { f.pos = 0.99; f.dir = -1; f.dwellAt = -1; }
    if (f.pos <= 0.01) { f.pos = 0.01; f.dir =  1; f.dwellAt = -1; }
    updateTrainRow(f);
  });
}

function updateTrainRow(f) {
  const spdEl = document.getElementById('ts-' + f.id);
  const barEl = document.getElementById('tb-' + f.id);
  const stEl  = document.getElementById('tst-' + f.id);
  const n     = LINES[selLine].ests.length;
  const si    = Math.min(Math.round(f.pos * (n - 1)), n - 1);
  if (spdEl) spdEl.textContent = (f.dwell > 0 ? 0 : Math.round(f.speed)) + ' km/h';
  if (barEl) barEl.style.width = (f.speed / 80 * 100) + '%';
  if (stEl)  stEl.textContent  = LINES[selLine].ests[si];
}

/* ── Env data ───────────────────────────── */
function buildEnvData() {
  Object.keys(LINES).forEach(k => {
    envData[k] = LINES[k].envStations.map(name => ({
      name, co2: 680 + Math.random() * 450,
      temp: 20 + Math.random() * 12,
      hum: 45 + Math.random() * 28,
      iaq: 30 + Math.floor(Math.random() * 65),
      co2t: 0, tempt: 0, humt: 0, iaqt: 0,
    }));
  });
}

function startEnvLoop() {
  setInterval(() => {
    Object.keys(LINES).forEach(k => {
      envData[k].forEach((e, i) => {
        e.co2t  = e.co2t  * 0.82 + (Math.random() - .5) * 3.5;
        e.co2   = Math.max(500, Math.min(1400, e.co2 + e.co2t));
        e.tempt = e.tempt * 0.88 + (Math.random() - .5) * 0.035;
        e.temp  = Math.max(17, Math.min(36, e.temp + e.tempt));
        e.humt  = e.humt  * 0.86 + (Math.random() - .5) * 0.12;
        e.hum   = Math.max(38, Math.min(78, e.hum + e.humt));
        e.iaqt  = e.iaqt  * 0.84 + (Math.random() - .5) * 0.7;
        e.iaq   = Math.max(15, Math.min(130, e.iaq + e.iaqt));
        if (k === selLine) updateEnvCard(k, i, e);
      });
    });
    updateMetrics();
  }, 5500);
}

function updateEnvCard(k, i, e) {
  const co2El = document.getElementById('eco2-' + k + i);
  const tmpEl = document.getElementById('etmp-' + k + i);
  const humEl = document.getElementById('ehum-' + k + i);
  const iaqEl = document.getElementById('eiaq-' + k + i);
  const barEl = document.getElementById('ebar-' + k + i);
  const over  = e.co2 > 900;
  if (co2El) { co2El.textContent = Math.round(e.co2); co2El.style.color = over ? 'var(--orange)' : 'var(--green)'; }
  if (tmpEl) tmpEl.textContent = e.temp.toFixed(1);
  if (humEl) humEl.textContent = Math.round(e.hum);
  if (iaqEl) { iaqEl.textContent = Math.round(e.iaq); iaqEl.style.color = e.iaq > 70 ? 'var(--orange)' : 'var(--green)'; }
  if (barEl) { barEl.style.width = (e.co2 / 1500 * 100) + '%'; barEl.style.background = over ? 'var(--orange)' : 'var(--accent)'; }
}

/* ── Event log ──────────────────────────── */
function startEventLoop() {
  let li = 0;
  pushEvent(li++ % 6);
  setInterval(() => pushEvent(li++ % 6), 9500);
}

function pushEvent(lineIdx) {
  const k    = Object.keys(LINES)[lineIdx];
  const msgs = ALARMS[k];
  const msg  = msgs[Math.floor(Math.random() * msgs.length)];
  const types = [
    {t:'INFO',c:'var(--accent)'},
    {t:'WARN',c:'var(--orange)'},
    {t:'OK',  c:'var(--green)'},
    {t:'ALRM',c:'var(--red)'},
  ];
  const type = types[Math.floor(Math.random() * types.length)];
  const now  = new Date();
  const ts   = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  const el   = document.getElementById('event-log');
  if (!el) return;
  const row = document.createElement('div');
  row.className = 'event-row';
  row.style.cssText = `border-color:${type.c};background:${type.c.replace('var(','rgba(').replace(')','')}11)`;
  row.innerHTML = `<span class="event-type" style="color:${type.c}">[${type.t}]</span><span class="event-time">${ts}·L${k}</span><span class="event-msg">${msg}</span>`;
  el.insertBefore(row, el.firstChild);
  while (el.children.length > 8) el.removeChild(el.lastChild);
}

/* ── Clock ──────────────────────────────── */
function startClock() {
  function tick() {
    const el = document.getElementById('clock');
    if (!el) return;
    const n = new Date();
    el.textContent = `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`;
  }
  tick(); setInterval(tick, 1000);
}

/* ── Line tabs ──────────────────────────── */
function buildLineTabs() {
  const el = document.getElementById('line-tabs');
  el.innerHTML = Object.entries(LINES).map(([k, L]) =>
    `<div class="line-tab" id="tab-${k}"
       style="color:${L.color};border-color:${L.color}40;background:${L.color}12"
       onclick="selectLine('${k}')">${k}</div>`
  ).join('');
}

/* ── Select line ────────────────────────── */
function selectLine(k) {
  selLine  = k;
  selTrain = null;
  // Tabs
  Object.keys(LINES).forEach(kk => {
    const t = document.getElementById('tab-' + kk);
    if (!t) return;
    const L = LINES[kk];
    if (kk === k) {
      t.classList.add('active');
      t.style.background   = L.color + '30';
      t.style.borderColor  = L.color;
    } else {
      t.classList.remove('active');
      t.style.background   = L.color + '12';
      t.style.borderColor  = L.color + '40';
    }
  });
  // Map label
  const lbl = document.getElementById('map-label');
  if (lbl) {
    lbl.textContent = `${LINES[k].name} · ${LINES[k].from} ↔ ${LINES[k].to} · ${LINES[k].ests.length} estaciones · Tiempo real`;
    lbl.style.color       = LINES[k].color;
    lbl.style.borderColor = LINES[k].color;
  }
  // Mobile map button
  const mobBtn = document.getElementById('mob-map-btn');
  if (mobBtn) mobBtn.textContent = `🗺 Ver mapa · ${LINES[k].name}`;
  // Rebuild panels
  buildTrainList(k);
  buildEnvList(k);
  buildMetrics(k);
  resizeMap();
}

/* ── Train list ─────────────────────────── */
function buildTrainList(k) {
  const el = document.getElementById('trains-body');
  const L  = LINES[k];
  if (!el) return;
  el.innerHTML = fleet[k].map(f => {
    const n  = L.ests.length;
    const si = Math.min(Math.round(f.pos * (n - 1)), n - 1);
    const st = L.ests[si];
    return `
    <div class="train-card${f.selected ? ' selected' : ''}" id="tc-${f.id}"
         onclick="selectTrain('${f.id}')"
         style="border-left-color:${f.selected ? L.color : 'transparent'}">
      <div class="train-badge" style="background:${L.color}">${f.id}</div>
      <div class="train-info">
        <div class="train-station" id="tst-${f.id}">${st}</div>
        <div class="train-speed-row">
          <span class="train-speed" id="ts-${f.id}" style="color:${L.color}">${Math.round(f.speed)} km/h</span>
          <div class="speed-bar"><div class="speed-fill" id="tb-${f.id}" style="background:${L.color};width:${f.speed/80*100}%"></div></div>
          <span class="train-dir">${f.dir > 0 ? '→' : '←'}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

function selectTrain(id) {
  selTrain = id;
  fleet[selLine].forEach(f => {
    f.selected = f.id === id;
    const card = document.getElementById('tc-' + f.id);
    if (card) {
      card.classList.toggle('selected', f.selected);
      card.style.borderLeftColor = f.selected ? LINES[selLine].color : 'transparent';
    }
  });
}

/* ── Env list ───────────────────────────── */
function buildEnvList(k) {
  const el = document.getElementById('env-body');
  if (!el) return;
  el.innerHTML = envData[k].map((e, i) => {
    const over = e.co2 > 900;
    return `
    <div class="env-card" style="border-left-color:${over ? 'var(--orange)' : 'var(--accent)'}">
      <div class="env-name">${e.name}</div>
      <div class="env-values">
        <div class="env-chip" style="color:${over?'var(--orange)':'var(--green)'}" id="eco2-${k}${i}">${Math.round(e.co2)}<span>ppm</span></div>
        <div class="env-chip" style="color:var(--accent)" id="etmp-${k}${i}">${e.temp.toFixed(1)}<span>°C</span></div>
        <div class="env-chip" style="color:var(--accent)" id="ehum-${k}${i}">${Math.round(e.hum)}<span>%</span></div>
        <div class="env-chip" style="color:${e.iaq>70?'var(--orange)':'var(--green)'}" id="eiaq-${k}${i}">${Math.round(e.iaq)}<span>IAQ</span></div>
      </div>
      <div class="env-bar"><div class="env-bar-fill" id="ebar-${k}${i}" style="width:${e.co2/1500*100}%;background:${over?'var(--orange)':'var(--accent)'}"></div></div>
    </div>`;
  }).join('');
}

/* ── Metrics ────────────────────────────── */
function buildMetrics(k) {
  const L = LINES[k];
  const trains = fleet[k];
  const avgSpd = Math.round(trains.reduce((s, t) => s + t.speed, 0) / trains.length);
  const env    = envData[k];
  const avgCo2 = Math.round(env.reduce((s, e) => s + e.co2, 0) / env.length);
  const avgTmp = (env.reduce((s, e) => s + e.temp, 0) / env.length).toFixed(1);
  const items = [
    { label:'Formaciones', value: trains.length,      unit:'',     color: L.color },
    { label:'Vel. Promedio', value: avgSpd,            unit:'km/h', color: L.color },
    { label:'CO₂ Prom.',     value: avgCo2,            unit:'ppm',  color: avgCo2>900?'var(--orange)':'var(--green)' },
    { label:'Temp. Media',   value: avgTmp,            unit:'°C',   color: 'var(--accent)' },
    { label:'Estaciones',    value: L.ests.length,     unit:'',     color: 'var(--accent)' },
    { label:'Módulos OK',    value: '6/6',             unit:'',     color: 'var(--green)' },
  ];
  const el = document.getElementById('metrics-bar');
  if (!el) return;
  el.innerHTML = items.map(m =>
    `<div class="metric" style="border-top-color:${m.color}">
      <div class="metric-label">${m.label}</div>
      <div><span class="metric-value" style="color:${m.color}">${m.value}</span><span class="metric-unit">${m.unit}</span></div>
    </div>`
  ).join('');
}

function updateMetrics() {
  if (document.getElementById('metrics-bar')) buildMetrics(selLine);
}

/* ── Mobile map toggle ──────────────────── */
function toggleMobMap() {
  const panel = document.getElementById('map-panel');
  if (!panel) return;
  const visible = panel.classList.toggle('mob-visible');
  const btn = document.getElementById('mob-map-btn');
  if (btn) btn.textContent = visible
    ? `✕ Cerrar mapa · ${LINES[selLine].name}`
    : `🗺 Ver mapa · ${LINES[selLine].name}`;
  if (visible) { resizeMap(); }
}

/* ── Main loop ──────────────────────────── */
function loop() {
  updateFleet();
  drawMap(selLine, fleet[selLine]);
  requestAnimationFrame(loop);
}

/* ── Start ──────────────────────────────── */
window.addEventListener('load', init);
window.addEventListener('resize', () => resizeMap());
