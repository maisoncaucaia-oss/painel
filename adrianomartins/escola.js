/* =====================================================================
   CONFIGURAÇÃO DA ESCOLA · único arquivo que muda de uma escola para outra
   (além do conteúdo das páginas). Para uma nova escola: copie esta pasta,
   troque os dados abaixo e as páginas de indicadores.
   status: 's-red' Crítico · 's-yellow' Atenção · 's-green' Positivo · 's-gray' Sem dados
   Página que a escola não tem: apague a linha (some do menu).
   A escola não oferta Anos Finais: não há página de Recomposição.
   ===================================================================== */
window.ESCOLA = {
  nome: 'Adriano Martins',
  tipo: 'EEIEF',
  municipio: 'Caucaia-CE',
  regional: 'Região Praia',
  inep: '23061944',
  endereco: '',   // inserir endereço (não consta das páginas enviadas)
  matriculas: 316,
  atualizado: 'out/2026',
  paginas: {
    painel:           { status: '' },
    resumo_executivo: { status: '' },
    busca_ativa:      { status: 's-yellow', nome: 'Busca Ativa 2026' },
    adsec:            { status: 's-yellow', nome: 'ADSEC 2025 · Leitura' },
    avalie_ce:        { status: 's-red',    nome: 'Avalie.CE 2025.1' },
    bimestrais:       { status: 's-yellow', nome: 'Bimestrais 2025' },
    cnca:             { status: 's-red',    nome: 'CNCA 2025' },
    qedu:             { status: 's-green',  nome: 'QEdu / Censo' },
    saeb:             { status: 's-yellow', nome: 'SAEB 2023' },
    spaece:           { status: 's-red',    nome: 'SPAECE 2025' }
  }
};
