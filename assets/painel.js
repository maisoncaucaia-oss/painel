/* =====================================================================
   PAINEL DO DIRETOR · Menu e comportamentos comuns (todas as escolas)
   Lê a configuração da escola em  <pasta-da-escola>/escola.js
   e monta: menu lateral, barra do celular, atalhos "Nesta página",
   abas e rodapé. Nenhum conteúdo de dados fica aqui.
   ===================================================================== */
(function () {
  var E = window.ESCOLA || {};

  /* Lista oficial de páginas, na mesma ordem para todas as escolas */
  var PAGINAS = [
    { id: 'painel',           ic: '🏠', nome: 'Visão Geral' },
    { id: 'resumo_executivo', ic: '🧭', nome: 'Resumo e Plano' },
    { id: 'busca_ativa',      ic: '🔍', nome: 'Busca Ativa' },
    { id: 'adsec',            ic: '📖', nome: 'ADSEC · Leitura' },
    { id: 'avalie_ce',        ic: '📊', nome: 'Avalie.CE' },
    { id: 'pulso',            ic: '🩺', nome: 'Avaliação de Pulso' },
    { id: 'bimestrais',       ic: '📝', nome: 'Bimestrais' },
    { id: 'cnca',             ic: '📚', nome: 'CNCA' },
    { id: 'qedu',             ic: '🎓', nome: 'QEdu / Censo' },
    { id: 'recomposicao',     ic: '🎒', nome: 'Recomposição' },
    { id: 'saeb',             ic: '📋', nome: 'SAEB' },
    { id: 'spaece',           ic: '📈', nome: 'SPAECE' }
  ];
  var ROTULO = { 's-red': 'Crítico', 's-yellow': 'Atenção', 's-green': 'Positivo', 's-blue': 'Informativo', 's-gray': 'Sem dados' };

  var atual = document.body.getAttribute('data-page');
  var cfg = E.paginas || {};
  function existe(id) { return !E.paginas || cfg[id]; }

  /* ---------- Menu lateral ---------- */
  var h = '';
  h += '<div class="side-head"><div class="side-tag">Painel do Diretor</div>';
  h += '<div class="side-name">' + (E.nome || 'Escola') + '</div>';
  h += '<div class="side-sub">' + [E.tipo, E.municipio, E.regional].filter(Boolean).join(' · ');
  if (E.inep) h += '<br>INEP ' + E.inep;
  h += '</div></div>';
  h += '<div class="side-sec">Indicadores</div>';
  PAGINAS.forEach(function (p) {
    if (!existe(p.id)) return;
    var c = cfg[p.id] || {};
    var nome = c.nome || p.nome;
    h += '<a class="nav' + (p.id === atual ? ' on' : '') + '" href="' + p.id + '.html">';
    h += '<span class="ic">' + p.ic + '</span>' + nome;
    if (c.status) h += '<span class="dot ' + c.status + '" title="' + (ROTULO[c.status] || '') + '"></span>';
    h += '</a>';
    if (p.id === atual) {
      document.querySelectorAll('section.sec[id] > h2').forEach(function (t) {
        var txt = t.getAttribute('data-nav') || t.childNodes[0].textContent.trim();
        h += '<a class="nav sub" href="#' + t.parentNode.id + '">' + txt + '</a>';
      });
    }
  });
  h += '<div class="side-sec">Semáforo</div><div class="side-legend">';
  h += '<div><i style="background:var(--red)"></i>Crítico: agir já</div>';
  h += '<div><i style="background:#e0a020"></i>Atenção: acompanhar</div>';
  h += '<div><i style="background:#2ea36a"></i>Positivo: manter</div>';
  h += '<div><i style="background:#9fb1c4"></i>Sem dados / a conferir</div></div>';
  h += '<div class="side-sec">Sistema</div>';
  h += '<a class="nav" href="../index.html"><span class="ic">🏫</span>Trocar escola</a>';
  h += '<div class="side-foot">' + (E.endereco || '') + (E.atualizado ? '<br>Atualizado: ' + E.atualizado : '');
  h += '<a href="../index.html">Sair do painel</a></div>';

  var side = document.createElement('nav');
  side.className = 'side';
  side.setAttribute('aria-label', 'Menu do painel');
  side.innerHTML = h;
  document.body.insertBefore(side, document.body.firstChild);

  /* ---------- Barra do celular ---------- */
  var bar = document.createElement('div');
  bar.className = 'mbar';
  var pag = PAGINAS.filter(function (p) { return p.id === atual; })[0];
  bar.innerHTML = '<button type="button" aria-label="Abrir menu">☰</button><div><b>' +
    ((cfg[atual] && cfg[atual].nome) || (pag ? pag.nome : '')) + '</b><span>' + (E.nome || '') + '</span></div>';
  document.body.insertBefore(bar, side.nextSibling);
  var scrim = document.createElement('div');
  scrim.className = 'scrim';
  document.body.appendChild(scrim);
  function fecha() { document.body.classList.remove('menu-open'); }
  bar.querySelector('button').onclick = function () { document.body.classList.toggle('menu-open'); };
  scrim.onclick = fecha;
  side.addEventListener('click', function (e) { if (e.target.closest('a')) fecha(); });

  /* ---------- Preencher campos da escola ({{nome}} etc.) ---------- */
  document.querySelectorAll('[data-escola]').forEach(function (el) {
    var k = el.getAttribute('data-escola');
    if (E[k] != null) el.textContent = E[k];
  });

  /* ---------- Abas ---------- */
  document.querySelectorAll('.tabs').forEach(function (tabs) {
    var bts = tabs.querySelectorAll('button[data-tab]');
    bts.forEach(function (b) {
      b.addEventListener('click', function () {
        bts.forEach(function (x) {
          x.classList.remove('on');
          var p = document.getElementById(x.getAttribute('data-tab'));
          if (p) p.classList.remove('on');
        });
        b.classList.add('on');
        var alvo = document.getElementById(b.getAttribute('data-tab'));
        if (alvo) alvo.classList.add('on');
      });
    });
  });

  /* ---------- Destaque do item "Nesta página" ao rolar ---------- */
  var subs = side.querySelectorAll('a.nav.sub');
  if (subs.length) {
    window.addEventListener('scroll', function () {
      var cur = '';
      document.querySelectorAll('section.sec[id]').forEach(function (s) {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      subs.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + cur); });
    }, { passive: true });
  }
})();
