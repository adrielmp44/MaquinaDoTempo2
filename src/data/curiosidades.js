// Curiosidades exibidas em cada foto ("Você sabia?"), uma por período.
// Os textos resumem as fontes indicadas em cada item; para trocar um texto,
// edite aqui. A chave é o número do ponto.

const FONTES = {
  dnCedro: {
    nome: 'Diário do Nordeste',
    url: 'https://diariodonordeste.verdesmares.com.br/ceara/acude-cedro-da-imponente-construcao-ordenada-por-dom-pedro-ii-a-completa-ausencia-de-agua-ha-anos-1.3215698',
  },
  opovoGalpoes: {
    nome: 'O Povo',
    url: 'https://mais.opovo.com.br/reportagens-especiais/acude-cedro/2026/10/13/galpoes-historicos-do-acude-cedro-em-quixada-deverao-virar-complexo-cultural-da-ufc.html',
  },
  caatinga: {
    nome: 'Toda Matéria',
    url: 'https://www.todamateria.com.br/caatinga/',
  },
  profetas: {
    nome: 'Diário do Nordeste',
    url: 'https://diariodonordeste.verdesmares.com.br/regiao/profetas-da-chuva-reunidos-em-quixada-mantem-otimismo-para-quadra-chuvosa-do-ceara-em-2021-1.3037418',
  },
  moco: {
    nome: 'National Geographic Brasil',
    url: 'https://www.nationalgeographicbrasil.com/animais/mamiferos/moco',
  },
  asaBranca: {
    nome: 'UFMG, Ciência no Ar',
    url: 'https://www.ufmg.br/ciencianoar/conteudo/asa-branca/',
  },
  monolitos: {
    nome: 'Wikipédia',
    url: 'https://en.wikipedia.org/wiki/Quixad%C3%A1_Monoliths_Natural_Monument',
  },
  vooLivre: {
    nome: 'Cross Country Magazine',
    url: 'https://xcmag.com/?p=37974',
  },
  aventura: {
    nome: 'Diário do Nordeste',
    url: 'https://diariodonordeste.verdesmares.com.br/ceara/com-diversas-opcoes-quixada-se-destaca-como-polo-de-turismo-de-aventura-no-ceara-1.3623386',
  },
  ventos: {
    nome: 'O Povo',
    url: 'https://mais.opovo.com.br/jornal/farol/2024/08/13/saiba-o-que-e-a-temporada-de-ventos-periodo-que-atrai-turistas-ao-ceara.html',
  },
};

export const CURIOSIDADES = {
  1: {
    chuva: {
      tema: 'Clima',
      titulo: 'A quadra chuvosa',
      texto: 'No Ceará, quase toda a chuva do ano cai entre fevereiro e maio, período chamado de quadra chuvosa. É quando os açudes do sertão recebem água e a paisagem fica verde.',
      fonte: FONTES.profetas,
    },
    seca: {
      tema: 'Flora',
      titulo: 'Por que "mata branca"',
      texto: 'Caatinga vem do tupi e quer dizer "mata branca". O nome descreve a seca: quase todas as plantas perdem as folhas para gastar menos água, e os galhos ficam claros e pelados.',
      fonte: FONTES.caatinga,
    },
  },
  2: {
    chuva: {
      tema: 'Quixadá',
      titulo: 'Os profetas da chuva',
      texto: 'Todo começo de ano, Quixadá reúne os profetas da chuva, sertanejos que preveem o inverno pela natureza. A casa do joão-de-barro com a entrada virada para o poente, por exemplo, é lida como sinal de bom ano.',
      fonte: FONTES.profetas,
    },
    seca: {
      tema: 'Flora',
      titulo: 'O juazeiro não perde a cor',
      texto: 'Enquanto a caatinga fica cinza, o juazeiro continua verde. Suas raízes profundas alcançam a água guardada no solo, e por isso ele dá sombra o ano inteiro.',
      fonte: FONTES.caatinga,
    },
  },
  3: {
    chuva: {
      tema: 'Fauna',
      titulo: 'A asa-branca',
      texto: 'A asa-branca é uma ave da família dos pombos, com uma faixa branca nas asas que aparece no voo. Com a música de Luiz Gonzaga, virou símbolo do sertanejo que parte na seca e da esperança de voltar com a chuva.',
      fonte: FONTES.asaBranca,
    },
    seca: {
      tema: 'Vento',
      titulo: 'A temporada de ventos',
      texto: 'Com o fim das chuvas, os ventos ganham força no Ceará. Entre agosto e outubro, as rajadas costumam ficar entre 45 e 60 km/h, segundo a Funceme.',
      fonte: FONTES.ventos,
    },
  },
  4: {
    chuva: {
      tema: 'Açude Cedro',
      titulo: 'Quando o Cedro enche',
      texto: 'O Cedro guarda até 126 milhões de metros cúbicos de água. Encher por completo é raro: aconteceu em 1924 e 1925, 1974 e 1975 e entre 1986 e 1989.',
      fonte: FONTES.dnCedro,
    },
    seca: {
      tema: 'Açude Cedro',
      titulo: 'Nascido de uma seca',
      texto: 'O açude foi encomendado por Dom Pedro II depois da grande seca de 1877 a 1879. A obra passou por quatro engenheiros e só foi inaugurada em 1906, já na República.',
      fonte: FONTES.dnCedro,
    },
  },
  5: {
    chuva: {
      tema: 'Fauna',
      titulo: 'O mocó das pedras',
      texto: 'Nas fendas dos monólitos vive o mocó, roedor que só existe no Brasil. Ele come casca de árvores como o mofumbo e a faveleira e está ameaçado: sua população caiu 30% em 30 anos.',
      fonte: FONTES.moco,
    },
    seca: {
      tema: 'Flora',
      titulo: 'Comida que resiste à seca',
      texto: 'Na estiagem, cactos como o mandacaru e o xique-xique viram alimento para os animais da caatinga. Folhas com cera e espinhos ajudam essas plantas a perder menos água.',
      fonte: FONTES.caatinga,
    },
  },
  6: {
    chuva: {
      tema: 'Caatinga',
      titulo: 'Um bioma só do Brasil',
      texto: 'A caatinga ocupa cerca de 11% do território brasileiro, em nove estados do Nordeste e no norte de Minas Gerais, e não existe em nenhum outro país.',
      fonte: FONTES.caatinga,
    },
    seca: {
      tema: 'Quixadá',
      titulo: 'Voo livre na seca',
      texto: 'De setembro a dezembro, os ventos fortes e o calor tornam Quixadá um dos melhores lugares do mundo para voos de longa distância. Pilotos fazem rotas de 200 a 300 km saindo da região.',
      fonte: FONTES.vooLivre,
    },
  },
  7: {
    chuva: {
      tema: 'Quixadá',
      titulo: 'Terra dos Monólitos',
      texto: 'As formações de pedra que cercam o Cedro atraem trilhas, escalada e rapel. Desde os anos 1990, Quixadá também recebe campeonatos nacionais de voo livre e etapas do circuito mundial.',
      fonte: FONTES.aventura,
    },
    seca: {
      tema: 'Açude Cedro',
      titulo: 'O açude que já secou',
      texto: 'Antes de 2015, o Cedro tinha secado quatro vezes: em 1930, 1932, 1950 e 1999. Na seca que começou em 2012, ficou anos quase sem água.',
      fonte: FONTES.dnCedro,
    },
  },
  8: {
    chuva: {
      tema: 'Quixadá',
      titulo: 'Monólitos protegidos',
      texto: 'Desde 2002, os monólitos de Quixadá formam uma unidade de conservação de 16.635 hectares. A mais famosa das pedras é a Galinha Choca, ao pé da qual a barragem do Cedro foi construída.',
      fonte: FONTES.monolitos,
    },
    seca: {
      tema: 'Açude Cedro',
      titulo: '120 anos de história',
      texto: 'Em outubro de 2026, o Cedro completa 120 anos. Foi a primeira grande obra hidráulica do país, tombada pelo Iphan em 1984. Nos galpões ao lado, os operários cortavam o granito usado na barragem.',
      fonte: FONTES.opovoGalpoes,
    },
  },
};
