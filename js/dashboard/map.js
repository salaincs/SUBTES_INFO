/* ═══════════════════════════════════════════
   SalaIncs · IoT Ferroviario
   dashboard/map.js — Canvas map renderer
═══════════════════════════════════════════ */

let mapCanvas, mapCtx;

function initMap() {
  mapCanvas = document.getElementById('map-canvas');
  mapCtx    = mapCanvas.getContext('2d');
  resizeMap();
}

function resizeMap() {
  if (!mapCanvas) return;
  const box = mapCanvas.parentElement.getBoundingClientRect();
  mapCanvas.width  = box.width;
  mapCanvas.height = box.height - 40; // minus label
}

function drawMap(lineKey, fleet) {
  if (!mapCtx || !mapCanvas) return;
  const W = mapCanvas.width, H = mapCanvas.height;
  const L = LINES[lineKey];
  const ests = L.ests;
  const n = ests.length;
  const col = L.color;
  const PAD_L = 30, PAD_R = 30;
  const trackY = H * 0.50;
  const x0 = PAD_L, x1 = W - PAD_R;
  const stGap = (x1 - x0) / (n - 1);

  mapCtx.clearRect(0, 0, W, H);

  // ── Sleepers ────────────────────────────
  for (let i = 0; i < n - 1; i++) {
    const step = Math.max(24, stGap / 3);
    const sx = x0 + i * stGap, ex = x0 + (i + 1) * stGap;
    for (let xx = sx + step / 2; xx < ex; xx += step) {
      mapCtx.fillStyle = col + '1A';
      mapCtx.fillRect(xx - 2, trackY - 10, 4, 20);
    }
  }

  // ── Double rail ──────────────────────────
  [-4, 4].forEach(dy => {
    mapCtx.beginPath();
    const g = mapCtx.createLinearGradient(x0, 0, x1, 0);
    g.addColorStop(0,   col + '22');
    g.addColorStop(0.5, col + 'CC');
    g.addColorStop(1,   col + '22');
    mapCtx.strokeStyle = g;
    mapCtx.lineWidth = 3;
    mapCtx.moveTo(x0, trackY + dy);
    mapCtx.lineTo(x1, trackY + dy);
    mapCtx.stroke();
  });

  // ── Stations ─────────────────────────────
  const FT  = Math.max(12, Math.round(H * 0.048));
  const FTT = Math.max(14, Math.round(H * 0.058));
  const labelGap = Math.max(30, H * 0.10);

  ests.forEach((name, i) => {
    const sx  = x0 + i * stGap;
    const isTerm = i === 0 || i === n - 1;
    const above  = i % 2 === 0;
    const R = isTerm ? 10 : 6;

    // Glow for terminals
    if (isTerm) {
      mapCtx.beginPath();
      mapCtx.arc(sx, trackY, 18, 0, Math.PI * 2);
      mapCtx.fillStyle = col + '18';
      mapCtx.fill();
    }

    // Dot
    mapCtx.beginPath();
    mapCtx.arc(sx, trackY, R, 0, Math.PI * 2);
    mapCtx.fillStyle   = isTerm ? col : '#0D1827';
    mapCtx.strokeStyle = col;
    mapCtx.lineWidth   = isTerm ? 0 : 2.5;
    mapCtx.fill();
    if (!isTerm) mapCtx.stroke();

    // Tick
    const tickEnd = above
      ? trackY - labelGap + FT
      : trackY + labelGap - FT * 0.3;
    mapCtx.strokeStyle = col + '55';
    mapCtx.lineWidth = 1.5;
    mapCtx.beginPath();
    mapCtx.moveTo(sx, trackY + (above ? -R : R));
    mapCtx.lineTo(sx, tickEnd);
    mapCtx.stroke();

    // Label
    const labelY = above
      ? trackY - labelGap
      : trackY + labelGap + FT * 0.5;

    mapCtx.save();
    mapCtx.translate(sx, labelY);
    mapCtx.font = `${isTerm ? 'bold ' : ''}${isTerm ? FTT : FT}px 'Barlow Condensed', Arial Narrow, sans-serif`;
    mapCtx.fillStyle  = isTerm ? col : 'rgba(210,230,255,.75)';
    mapCtx.textAlign  = 'center';
    mapCtx.fillText(name, 0, 0);
    mapCtx.restore();
  });

  // ── Trains ───────────────────────────────
  const TW = Math.max(36, Math.round(W * 0.038));
  const TH = Math.max(20, Math.round(H * 0.08));
  const FTR = Math.max(13, Math.round(H * 0.050));

  (fleet || []).forEach(f => {
    const tx = x0 + f.pos * (x1 - x0);

    // Speed label
    const spdY = trackY + TH * 0.5 + FTR + 10;
    mapCtx.font = `bold ${FTR * 0.9}px 'Barlow Condensed', sans-serif`;
    mapCtx.fillStyle  = col + 'CC';
    mapCtx.textAlign  = 'center';
    mapCtx.fillText(Math.round(f.speed) + ' km/h', tx, spdY);

    // Selected ring
    if (f.selected) {
      const pulse = (Date.now() % 1800) / 1800;
      mapCtx.beginPath();
      mapCtx.arc(tx, trackY, TW * 0.7 + pulse * 12, 0, Math.PI * 2);
      mapCtx.strokeStyle = col + Math.round((1 - pulse) * 100).toString(16).padStart(2, '0');
      mapCtx.lineWidth = 2;
      mapCtx.stroke();
    }

    // Train body
    mapCtx.fillStyle = col;
    mapCtx.beginPath();
    mapCtx.roundRect(tx - TW / 2, trackY - TH / 2, TW, TH, 4);
    mapCtx.fill();

    // Nose
    const noseW = TW * 0.28;
    if (f.dir > 0) {
      mapCtx.beginPath();
      mapCtx.moveTo(tx + TW / 2,        trackY - TH / 2);
      mapCtx.lineTo(tx + TW / 2 + noseW, trackY);
      mapCtx.lineTo(tx + TW / 2,        trackY + TH / 2);
      mapCtx.fillStyle = col; mapCtx.fill();
    } else {
      mapCtx.beginPath();
      mapCtx.moveTo(tx - TW / 2,        trackY - TH / 2);
      mapCtx.lineTo(tx - TW / 2 - noseW, trackY);
      mapCtx.lineTo(tx - TW / 2,        trackY + TH / 2);
      mapCtx.fillStyle = col; mapCtx.fill();
    }

    // Headlight
    const hlX = f.dir > 0 ? tx + TW / 2 + noseW - 4 : tx - TW / 2 - noseW + 4;
    mapCtx.beginPath();
    mapCtx.arc(hlX, trackY, 4, 0, Math.PI * 2);
    mapCtx.fillStyle = '#FFE066';
    mapCtx.fill();

    // ID label
    mapCtx.font     = `bold ${FTR}px 'Barlow Condensed', sans-serif`;
    mapCtx.fillStyle = '#fff';
    mapCtx.textAlign = 'center';
    mapCtx.fillText(f.id, tx, trackY + FTR * 0.36);

    // Dwell indicator
    if (f.dwell > 0) {
      mapCtx.font     = `bold ${FTR * 0.85}px 'Barlow Condensed', sans-serif`;
      mapCtx.fillStyle = '#FFE066';
      mapCtx.fillText('⏱', tx, trackY - TH * 0.5 - 8);
    }
    mapCtx.textAlign = 'left';
  });
}
