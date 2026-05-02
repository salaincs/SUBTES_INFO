/* ═══════════════════════════════════════════
   SalaIncs · IoT Ferroviario
   dashboard.css — Control center styles
═══════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
@import 'variables.css';

/* ── Layout ────────────────────────────── */
html, body {
  height: 100%;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* ── Top bar ────────────────────────────── */
#topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: rgba(4,10,22,.95);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  z-index: 10;
}
.tb-logo { display: flex; align-items: center; gap: 10px; }
.tb-logo img { height: 32px; width: 32px; object-fit: contain; }
.tb-name {
  font-size: 18px; font-weight: 900;
  letter-spacing: 3px; color: #fff;
}
.tb-name em { color: var(--orange); font-style: normal; }
.tb-right { display: flex; align-items: center; gap: 20px; }
.tb-status {
  font-size: 14px; font-weight: 700;
  letter-spacing: 1px; color: var(--green);
}
#clock {
  font-size: 28px; font-weight: 900;
  letter-spacing: 2px; color: var(--text);
  min-width: 90px; text-align: right;
}

/* ── Line tabs ──────────────────────────── */
#line-tabs {
  display: flex;
  gap: 8px;
  padding: 10px 24px;
  background: rgba(6,14,26,.9);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  overflow-x: auto;
}
.line-tab {
  font-family: var(--font-head);
  font-size: 22px; font-weight: 900;
  letter-spacing: 2px;
  padding: 8px 22px;
  border: 1px solid rgba(30,50,80,.8);
  border-radius: 3px;
  cursor: pointer;
  transition: all .2s;
  user-select: none;
  flex-shrink: 0;
}
.line-tab:hover { filter: brightness(1.2); }
.line-tab.active { color: #fff !important; box-shadow: 0 0 16px currentColor; }

/* ── Main grid ──────────────────────────── */
#main {
  display: grid;
  grid-template-columns: 1fr 380px;
  grid-template-rows: 1fr auto;
  flex: 1;
  gap: 0;
  overflow: hidden;
}

/* ── Map panel ──────────────────────────── */
#map-panel {
  position: relative;
  background: rgba(6,14,26,.92);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
#map-label {
  padding: 10px 16px 6px;
  font-size: 12px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
  flex-shrink: 0;
}
#map-canvas {
  flex: 1;
  display: block;
  width: 100%;
}

/* ── Metrics bar ────────────────────────── */
#metrics-bar {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-top: 1px solid var(--border);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.metric {
  padding: 12px 10px;
  text-align: center;
  border-right: 1px solid var(--border);
  border-top: 2px solid var(--border);
  background: rgba(6,14,26,.92);
  transition: border-color .3s;
}
.metric:last-child { border-right: none; }
.metric-label {
  font-size: 11px; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--muted); margin-bottom: 4px;
}
.metric-value {
  font-size: 34px; font-weight: 900;
  line-height: 1;
}
.metric-unit { font-size: 12px; color: var(--muted); margin-left: 2px; }

/* ── Right panel ────────────────────────── */
#right-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
}

/* Shared panel section */
.panel-section {
  background: rgba(6,14,26,.92);
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.panel-section:last-child { border-bottom: none; flex: 1; }

.panel-title {
  padding: 10px 16px 8px;
  font-size: 14px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.panel-body {
  padding: 10px 12px;
  overflow-y: auto;
  flex: 1;
}

/* ── Train list ─────────────────────────── */
.train-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: rgba(13,22,37,.8);
  border: 1px solid rgba(30,48,80,.6);
  border-left: 3px solid transparent;
  margin-bottom: 6px;
  cursor: pointer;
  transition: all .2s;
  border-radius: 2px;
}
.train-card:hover { border-color: var(--orange); background: rgba(249,115,22,.06); }
.train-card.selected { border-left-color: var(--orange); background: rgba(249,115,22,.08); }
.train-badge {
  width: 40px; height: 40px;
  border-radius: 5px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; font-weight: 900; color: #fff;
  flex-shrink: 0;
}
.train-info { flex: 1; min-width: 0; }
.train-station {
  font-size: 15px; font-weight: 700;
  color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  margin-bottom: 4px;
}
.train-speed-row { display: flex; align-items: center; gap: 8px; }
.train-speed {
  font-size: 22px; font-weight: 900;
  font-family: var(--font-head);
}
.speed-bar {
  flex: 1; height: 5px;
  background: rgba(30,48,80,.8);
  border-radius: 3px; overflow: hidden;
}
.speed-fill { height: 100%; border-radius: 3px; transition: width .6s; }
.train-dir { font-size: 14px; color: var(--muted); flex-shrink: 0; }

/* ── Env sensors ────────────────────────── */
.env-card {
  background: rgba(13,22,37,.8);
  border: 1px solid rgba(30,48,80,.6);
  border-left: 3px solid var(--accent);
  padding: 10px 12px;
  margin-bottom: 6px;
  border-radius: 2px;
}
.env-name {
  font-size: 11px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase;
  color: var(--muted); margin-bottom: 6px;
}
.env-values { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.env-chip {
  font-size: 20px; font-weight: 700;
  font-family: var(--font-head);
}
.env-chip span { font-size: 11px; color: var(--muted); margin-left: 2px; }
.env-bar { height: 4px; background: rgba(30,48,80,.8); border-radius: 2px; overflow: hidden; margin-top: 6px; }
.env-bar-fill { height: 100%; border-radius: 2px; transition: width 1s, background 1s; }

/* ── Event log ──────────────────────────── */
.event-row {
  font-size: 13px;
  padding: 5px 8px;
  border-left: 2px solid;
  margin-bottom: 4px;
  line-height: 1.4;
  border-radius: 0 2px 2px 0;
  animation: fadeIn .3s ease;
}
@keyframes fadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:none; } }
.event-type { font-weight: 700; margin-right: 4px; }
.event-time { color: rgba(200,220,255,.45); margin-right: 4px; font-size: 11px; }
.event-msg { color: rgba(240,244,250,.88); }

/* ═══════════════════════════════════════════
   MOBILE — full responsive redesign
═══════════════════════════════════════════ */
@media (max-width: 860px) {
  html, body { overflow-y: auto; overflow-x: hidden; height: auto; }

  #app {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  /* Topbar compact */
  #topbar { padding: 10px 14px; }
  .tb-name { font-size: 15px; }
  #clock { font-size: 22px; min-width: 70px; }
  .tb-status { font-size: 12px; }

  /* Line tabs scroll */
  #line-tabs { padding: 8px 12px; gap: 6px; }
  .line-tab { font-size: 18px; padding: 6px 14px; }

  /* Main: single column, natural height */
  #main {
    display: flex;
    flex-direction: column;
    height: auto;
    overflow: visible;
  }

  /* MAP — hidden by default, shown via button */
  #map-panel { display: none; }
  #map-panel.mob-visible {
    display: flex;
    height: 60vw;
    min-height: 200px;
    max-height: 320px;
    border-right: none;
  }

  /* Show map button */
  #mob-map-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: rgba(77,170,255,.08);
    border: 1px solid rgba(77,170,255,.3);
    border-left: 3px solid var(--accent);
    color: var(--accent);
    font-family: var(--font-head);
    font-size: 15px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }
  #mob-map-btn:active { background: rgba(77,170,255,.15); }

  /* Metrics: 3 cols */
  #metrics-bar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-right: none;
  }
  .metric { padding: 10px 6px; }
  .metric-value { font-size: 26px; }
  .metric-label { font-size: 9px; }

  /* Right panel: natural flow */
  #right-panel {
    overflow: visible;
    border-bottom: none;
  }
  .panel-section { overflow: visible; }
  .panel-body { overflow: visible; max-height: none; }
  .panel-title { font-size: 14px; }

  /* Trains: horizontal scroll */
  #trains-body {
    display: flex !important;
    flex-direction: row !important;
    overflow-x: auto;
    gap: 8px;
    padding: 10px 10px 14px;
  }
  #trains-body .train-card {
    flex-direction: column;
    align-items: center;
    min-width: 100px;
    flex-shrink: 0;
    padding: 10px 8px;
    border-left: none;
    border-top: 3px solid transparent;
    margin-bottom: 0;
  }
  .train-info { width: 100%; text-align: center; }
  .train-station { font-size: 12px; text-align: center; }
  .speed-bar { width: 60px; }

  /* Env: readable */
  .env-chip { font-size: 18px; }
  .env-name { font-size: 11px; }

  /* Events: readable */
  .event-row { font-size: 12px; }
}

@media (max-width: 520px) {
  #clock { font-size: 18px; }
  .line-tab { font-size: 16px; padding: 5px 10px; }
  #metrics-bar { grid-template-columns: repeat(2, 1fr); }
  .metric-value { font-size: 24px; }
}
