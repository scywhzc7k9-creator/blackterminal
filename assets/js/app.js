/* ===================== MODAL ===================== */
document.getElementById('enterBtn').addEventListener('click', function(){
  document.getElementById('welcomeModal').classList.add('hidden');
});

/* ===================== HERO BOOT TYPE EFFECT ===================== */
(function(){
  const el = document.getElementById('heroBoot');
  const lines = [
    "root@ubam:~$ conectando nodo académico...",
    "cargando módulos: generales · redes · servidores · vulnerabilidades",
    "entorno recomendado: Kali Linux",
    "escribe en cualquier terminal de abajo: help"
  ];
  let out = "";
  let li = 0, ci = 0;
  function type(){
    if(li >= lines.length){ out += "\n<span class='cmt'>listo</span> <span class='cursor-blink'></span>"; el.innerHTML = out; return; }
    if(ci === 0) out += (li>0?"\n":"");
    out += lines[li][ci];
    el.innerHTML = out + "<span class='cursor-blink'></span>";
    ci++;
    if(ci >= lines[li].length){ li++; ci = 0; setTimeout(type, 220); }
    else { setTimeout(type, 16); }
  }
  type();
})();

/* ===================== SCROLLSPY RAIL ===================== */
(function(){
  const sections = ['generales','redes','servidores','vulnerabilidades'];
  const steps = document.querySelectorAll('.rail-step');
  function onScroll(){
    let current = sections[0];
    sections.forEach(id=>{
      const el = document.getElementById(id);
      if(el && window.scrollY + 140 >= el.offsetTop) current = id;
    });
    steps.forEach(s=> s.classList.toggle('active', s.dataset.section === current));
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
})();

/* ===================== TERMINAL SIMULATOR ===================== */
const missions = {
  generales: { done:false, trigger:'whoami', successMsg:'Misión completa: ahora sabes que actúas como usuario autorizado dentro de las reglas de compromiso.' },
  redes:     { done:false, trigger:'scan 192.168.1.0/24', successMsg:'Misión completa: identificaste los hosts activos de la subred simulada.' },
  servidores:{ done:false, trigger:'harden ftp', successMsg:'Misión completa: cerraste el servicio FTP inseguro del servidor simulado.' },
  vulnerabilidades:{ done:false, trigger:'audit 10.0.0.5', successMsg:'Misión completa: generaste un reporte preliminar de hallazgos.' }
};

const responses = {
  generales: {
    help: ["Comandos disponibles:", "  whoami        - muestra tu rol en el laboratorio", "  reglas        - muestra las reglas de compromiso", "  mision        - describe el objetivo de este módulo", "  clear         - limpia la pantalla"],
    whoami: ["usuario: estudiante-ubam", "rol: pentester en entrenamiento", "alcance: solo entornos autorizados de laboratorio"],
    reglas: ["1. Nunca pruebes técnicas fuera de un entorno autorizado.", "2. Documenta cada paso como si fuera un reporte real.", "3. El objetivo es aprender a defender, no a dañar."],
    mision: ["Objetivo: identifica tu rol dentro del laboratorio.", "Pista: usa el comando 'whoami'."]
  },
  redes: {
    help: ["Comandos disponibles:", "  scan <red>       - simula un escaneo de subred", "  ping <host>      - simula una prueba de conectividad", "  mision           - describe el objetivo de este módulo", "  clear            - limpia la pantalla"],
    "scan 192.168.1.0/24": ["Escaneando 192.168.1.0/24 ...", "Host activo: 192.168.1.10  (servidor-web)", "Host activo: 192.168.1.15  (servidor-bd)", "Host activo: 192.168.1.22  (estacion-admin)", "3 hosts encontrados."],
    mision: ["Objetivo: descubre los hosts activos de la subred simulada.", "Pista: usa 'scan 192.168.1.0/24'."]
  },
  servidores: {
    help: ["Comandos disponibles:", "  services       - lista servicios activos del servidor simulado", "  harden <serv>  - cierra un servicio inseguro", "  mision         - describe el objetivo de este módulo", "  clear          - limpia la pantalla"],
    services: ["Servicios activos:", "  ssh    (22)   - configurado correctamente", "  http   (80)   - configurado correctamente", "  ftp    (21)   - ⚠ credenciales por defecto detectadas", "Recomendación: revisar el servicio FTP."],
    "harden ftp": ["Cerrando servicio ftp ...", "Servicio ftp deshabilitado.", "Superficie de ataque reducida."],
    mision: ["Objetivo: elimina el riesgo detectado en el servidor.", "Pista: primero ejecuta 'services', luego 'harden ftp'."]
  },
  vulnerabilidades: {
    help: ["Comandos disponibles:", "  audit <host>   - simula un análisis de vulnerabilidades", "  cve            - muestra CVEs de referencia", "  mision         - describe el objetivo de este módulo", "  clear          - limpia la pantalla"],
    "audit 10.0.0.5": ["Auditando 10.0.0.5 ...", "Hallazgo: versión de servidor desactualizada", "Hallazgo: formulario de login vulnerable a inyección SQL", "Severidad: alta. Reporte preliminar generado."],
    cve: ["CVE-2021-44228  Log4Shell — ejecución remota de código", "CVE-2017-0144    EternalBlue — SMB remoto", "CVE-2014-0160    Heartbleed — fuga de memoria en TLS"],
    mision: ["Objetivo: audita el host 10.0.0.5 y genera un hallazgo.", "Pista: usa 'audit 10.0.0.5'."]
  }
};

function printLine(mod, text, cls){
  const screen = document.getElementById('screen-'+mod);
  const div = document.createElement('div');
  div.className = 'line ' + (cls||'sys');
  div.textContent = text;
  screen.appendChild(div);
  screen.scrollTop = screen.scrollHeight;
}

function fillCmd(mod, cmd){
  document.getElementById('input-'+mod).value = cmd;
  document.getElementById('input-'+mod).focus();
}

function runCmd(mod){
  const input = document.getElementById('input-'+mod);
  const cmd = input.value.trim();
  if(!cmd) return;
  printLine(mod, cmd, 'user');

  if(cmd === 'clear'){
    document.getElementById('screen-'+mod).innerHTML = '';
    input.value = '';
    return;
  }

  const dict = responses[mod];
  const key = Object.keys(dict).find(k => k.toLowerCase() === cmd.toLowerCase());

  if(key){
    dict[key].forEach(line => printLine(mod, line, key==='help' ? 'info' : 'sys'));
    if(missions[mod].trigger.toLowerCase() === cmd.toLowerCase() && !missions[mod].done){
      missions[mod].done = true;
      printLine(mod, missions[mod].successMsg, 'info');
      const status = document.getElementById('status-'+mod);
      status.classList.add('done');
      status.innerHTML = '<span class="pip"></span> ' + missions[mod].successMsg;
    }
  } else {
    printLine(mod, "comando no reconocido: '" + cmd + "' — escribe 'help'", 'err');
  }
  input.value = '';
}

['generales','redes','servidores','vulnerabilidades'].forEach(mod=>{
  printLine(mod, '-- terminal simulada del módulo ' + mod + ' --', 'info');
  printLine(mod, "escribe 'help' para ver los comandos disponibles", 'info');
  document.getElementById('input-'+mod).addEventListener('keydown', function(e){
    if(e.key === 'Enter') runCmd(mod);
  });
});
