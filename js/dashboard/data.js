/* ═══════════════════════════════════════════
   SalaIncs · IoT Ferroviario
   dashboard/data.js — Lines, stations, fleet
═══════════════════════════════════════════ */

const LINES = {
  A: {
    color: '#00aedb', name: 'Línea A',
    from: 'Plaza de Mayo', to: 'San Pedrito',
    ests: ['Plaza de Mayo','Perú','Piedras','Lima','Sáenz Peña','Congreso',
           'Pasco','Alberti','Plaza Miserere','Castro Barros','Río de Janeiro',
           'Acoyte','Primera Junta','Carabobo','Puan','Flores','San Pedrito'],
    salidas: ['Av. Rivadavia','Av. de Mayo'],
    envStations: ['Plaza Miserere','Primera Junta','San Pedrito'],
  },
  B: {
    color: '#ed1c24', name: 'Línea B',
    from: 'L.N. Alem', to: 'J.M. de Rosas',
    ests: ['L.N. Alem','Florida','Uruguay','C. Pellegrini','Callao',
           'Pasteur/AMIA','Medrano','Ángel Gallardo','Malabia','Dorrego',
           'Federico Lacroze','Tronador','Los Incas','J.M. de Rosas'],
    salidas: ['Av. Corrientes'],
    envStations: ['L.N. Alem','Ángel Gallardo','J.M. de Rosas'],
  },
  C: {
    color: '#0072ce', name: 'Línea C',
    from: 'Retiro', to: 'Constitución',
    ests: ['Retiro','San Martín','Lavalle','Diagonal Norte',
           'Av. de Mayo','Moreno','Independencia','San Juan','Constitución'],
    salidas: ['Retiro','Constitución'],
    envStations: ['Retiro','Av. de Mayo','Constitución'],
  },
  D: {
    color: '#00884A', name: 'Línea D',
    from: 'Catedral', to: 'Cong. Tucumán',
    ests: ['Catedral','Tribunales','Callao','Pueyrredón','Agüero','Bulnes',
           'Scalabrini Ortiz','Plaza Italia','Palermo','M. Carranza',
           'Olleros','J. Hernández','Juramento','Cong. Tucumán'],
    salidas: ['Av. Córdoba','Av. Santa Fe'],
    envStations: ['Catedral','Plaza Italia','Cong. Tucumán'],
  },
  E: {
    color: '#662c91', name: 'Línea E',
    from: 'Bolívar', to: 'Plaza Virreyes',
    ests: ['Bolívar','Belgrano','San José','Entre Ríos','Pichincha','Jujuy',
           'Urquiza','Med. Milagrosa','J.M. Moreno','E. Mitre',
           'Bonorino','Varela','Rivadavia','Plaza Virreyes'],
    salidas: ['Av. Independencia'],
    envStations: ['Bolívar','Jujuy','Plaza Virreyes'],
  },
  H: {
    color: '#e8a800', name: 'Línea H',
    from: 'Fac. Derecho', to: 'Hospitales',
    ests: ['Fac. de Derecho','Las Heras','Santa Fe','Córdoba','Corrientes',
           'Venezuela','Humberto 1°','Caseros','Parque Patricios','Hospitales'],
    salidas: ['Av. Pueyrredón'],
    envStations: ['Fac. de Derecho','Corrientes','Hospitales'],
  },
};

const FLEET_INIT = {
  A: [{id:'A1',pos:.06,dir:1},{id:'A2',pos:.52,dir:-1},{id:'A3',pos:.78,dir:1}],
  B: [{id:'B1',pos:.14,dir:1},{id:'B2',pos:.60,dir:-1},{id:'B3',pos:.87,dir:1}],
  C: [{id:'C1',pos:.10,dir:1},{id:'C2',pos:.65,dir:-1}],
  D: [{id:'D1',pos:.05,dir:1},{id:'D2',pos:.42,dir:-1},{id:'D3',pos:.75,dir:1}],
  E: [{id:'E1',pos:.18,dir:1},{id:'E2',pos:.58,dir:-1},{id:'E3',pos:.83,dir:1}],
  H: [{id:'H1',pos:.08,dir:1},{id:'H2',pos:.70,dir:-1}],
};

const ALARMS = {
  A: ['Vibración bogie A1 · Flores','CO₂ alto · Primera Junta','PIS actualizado · Miserere'],
  B: ['Temp. túnel · Lacroze','Formación B2 · mantenimiento','Ocupación alta · C.Pellegrini'],
  C: ['Conectividad restaurada · Retiro','Vibración C1 · Constitución','IA detecta desgaste · San Martín'],
  D: ['Hombre en vía · Callao — RESUELTO','CO₂ elevado · Palermo','D3 llegando a Cong.Tucumán'],
  E: ['Fuelle P.elevada · E2 · Jujuy','HR alta · Urquiza','PIS offline · Urquiza — recuperado'],
  H: ['Anomalía rodamiento · H1','Ventilación activada · Hospitales','Sensor CO₂ · Corrientes OK'],
};
