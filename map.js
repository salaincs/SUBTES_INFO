/* ═══════════════════════════════════════════
   SalaIncs · IoT Ferroviario
   variables.css — Design tokens & resets
═══════════════════════════════════════════ */

:root {
  --orange:  #F97316;
  --orange2: #EA6A0C;
  --orange-light: #FFB060;
  --blue:    #1A4A8A;
  --accent:  #4DAAFF;
  --accent2: #6ECCFF;
  --green:   #00CC66;
  --red:     #FF4444;
  --bg:      #050C18;
  --bg2:     #060E1A;
  --bg3:     #0D1625;
  --card:    #0A1420;
  --border:  rgba(30,48,80,.8);
  --text:    #FFFFFF;
  --muted:   rgba(200,220,255,0.65);
  --font-head: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  --font-body: 'Barlow', 'Arial', sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  width: 100%;
  height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-head);
  -webkit-font-smoothing: antialiased;
}

/* ── Typography ─────────────────────────── */
h1, h2, h3 {
  font-family: var(--font-head);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  color: var(--text);
  text-shadow: 0 2px 8px rgba(0,0,0,.7);
}

p, .body-text {
  font-family: var(--font-body);
  color: rgba(220,235,255,.92);
  line-height: 1.75;
  text-shadow: 0 1px 4px rgba(0,0,0,.6);
}

/* ── Utility ─────────────────────────────── */
.orange  { color: var(--orange-light); }
.accent  { color: var(--accent); }
.muted   { color: var(--muted); }
.green   { color: var(--green); }
.red     { color: var(--red); }
