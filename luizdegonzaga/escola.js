/* =====================================================================
   CONFIGURAÇÃO DA ESCOLA · único arquivo que muda de uma escola para outra
   (além do conteúdo das páginas). Para uma nova escola: copie esta pasta,
   troque os dados abaixo e as páginas de indicadores.
   status: 's-red' Crítico · 's-yellow' Atenção · 's-green' Positivo · 's-gray' Sem dados
   Página que a escola não tem: apague a linha (some do menu).
   Nesta etapa só a página do Avalie.CE foi produzida; acrescente as demais
   linhas quando as páginas forem criadas.
   ===================================================================== */
window.ESCOLA = {
  nome: 'Luiz de Gonzaga Fonseca Mota',
  tipo: 'EEIEF',
  municipio: 'Caucaia-CE',
  regional: 'Região Metrópole',
  inep: '23062860',
  endereco: 'Contorno Oeste, s/n · Nova Metrópole',
  matriculas: 520,
  atualizado: 'out/2026',
  paginas: {
    painel:           { status: '' },
    resumo_executivo: { status: '' },
    busca_ativa:      { status: 's-red',    nome: 'Busca Ativa 2026' },
    adsec:            { status: 's-yellow', nome: 'ADSEC 2026 · Leitura e Escrita' },
    avalie_ce:        { status: 's-yellow', nome: 'Avalie.CE 2026' },
    bimestrais:       { status: 's-yellow', nome: 'Bimestrais 2026' },
    cnca:             { status: 's-red',    nome: 'CNCA 2025' },
    qedu:             { status: 's-green',  nome: 'QEdu / Censo' },
    saeb:             { status: 's-yellow', nome: 'SAEB 2025' },
    spaece:           { status: 's-red',    nome: 'SPAECE 2025' }
  }
};
