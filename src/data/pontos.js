// Dados dos pontos da Máquina do Tempo (Quadro "Dados que descrevem cada ponto" do TCC).
// Para corrigir uma posição, uma data ou um alinhamento, altere só este arquivo.
//
// Campos:
//   id, nome          número e nome exibido
//   posicaoMapa       posição do marcador sobre a imagem do mapa, em porcentagem
//   fotoChuva/Seca    arquivos em public/fotos360/
//   dataChuva/Seca    datas das capturas (AAAA-MM-DD)
//   rotacao           correção, em graus, para alinhar a foto da chuva ao Norte
//   ajusteSeca        quantos graus girar a foto da seca para coincidir com a da chuva
//   vizinhos          indicadores no chão (dois por foto): destino, tipo
//                     ('avancar' ou 'voltar') e posição "x y z" na cena.
//                     x: direita (+) / esquerda (−); z: atrás (+) / à frente (−);
//                     y fica em -2 (o chão). Distância boa: entre 4 e 8.
//   curiosidades      texto do painel "Você sabia?" para cada período
//                     (em src/data/curiosidades.js)
//
// Use o modo de calibração (abra o app com ?calibrar no fim do endereço) para
// achar ajusteSeca, as posições dos vizinhos e as posições no mapa.

import { CURIOSIDADES } from './curiosidades';

export const PONTOS = [
  {
    id: 1,
    nome: 'Ponto 1',
    posicaoMapa: { top: '41.5%', left: '77%' },
    fotoChuva: 'ponto-01-chuva.webp',
    fotoSeca: 'ponto-01-seca.webp',
    dataChuva: '2026-05-10',
    dataSeca: '2026-10-02',
    rotacao: 0,
    ajusteSeca: 0, // conferir na calibração
    vizinhos: [
      { destino: 2, tipo: 'avancar', posicao: '0 -2 6' },
      { destino: 8, tipo: 'voltar', posicao: '0 -2 -6' },
    ],
    curiosidades: CURIOSIDADES[1],
  },
  {
    id: 2,
    nome: 'Ponto 2',
    posicaoMapa: { top: '41%', left: '67%' },
    fotoChuva: 'ponto-02-chuva.webp',
    fotoSeca: 'ponto-02-seca.webp',
    dataChuva: '2026-05-10',
    dataSeca: '2026-10-02',
    rotacao: 0,
    ajusteSeca: 10,
    vizinhos: [
      { destino: 3, tipo: 'avancar', posicao: '0.6 -2 6' },
      { destino: 1, tipo: 'voltar', posicao: '0 -2 -6' },
    ],
    curiosidades: CURIOSIDADES[2],
  },
  {
    id: 3,
    nome: 'Ponto 3',
    posicaoMapa: { top: '40%', left: '61%' },
    fotoChuva: 'ponto-03-chuva.webp',
    fotoSeca: 'ponto-03-seca.webp',
    dataChuva: '2026-05-10',
    dataSeca: '2026-10-02',
    rotacao: 0,
    ajusteSeca: 42,
    vizinhos: [
      { destino: 2, tipo: 'avancar', posicao: '0 -2 -6' },
      { destino: 4, tipo: 'voltar', posicao: '-2.9 -2 5.3' },
    ],
    curiosidades: CURIOSIDADES[3],
  },
  {
    id: 4,
    nome: 'Ponto 4',
    posicaoMapa: { top: '33%', left: '57%' },
    fotoChuva: 'ponto-04-chuva.webp',
    fotoSeca: 'ponto-04-seca.webp',
    dataChuva: '2026-05-10',
    dataSeca: '2026-10-02',
    rotacao: 0,
    ajusteSeca: 12,
    vizinhos: [
      { destino: 3, tipo: 'avancar', posicao: '0 -2 -6' },
      { destino: 5, tipo: 'voltar', posicao: '0 -2 6' },
    ],
    curiosidades: CURIOSIDADES[4],
  },
  {
    id: 5,
    nome: 'Ponto 5',
    posicaoMapa: { top: '25%', left: '55%' },
    fotoChuva: 'ponto-05-chuva.webp',
    fotoSeca: 'ponto-05-seca.webp',
    dataChuva: '2026-05-10',
    dataSeca: '2026-10-02',
    rotacao: 0,
    ajusteSeca: 18,
    vizinhos: [
      { destino: 4, tipo: 'avancar', posicao: '0 -2 -6' },
      { destino: 6, tipo: 'voltar', posicao: '0 -2 6' },
    ],
    curiosidades: CURIOSIDADES[5],
  },
  {
    id: 6,
    nome: 'Ponto 6',
    posicaoMapa: { top: '16%', left: '55%' },
    fotoChuva: 'ponto-06-chuva.webp',
    fotoSeca: 'ponto-06-seca.webp',
    dataChuva: '2026-05-10',
    dataSeca: '2026-10-02',
    rotacao: 0,
    ajusteSeca: 27, // conferir na calibração
    vizinhos: [
      { destino: 5, tipo: 'avancar', posicao: '0 -2 -6' },
      { destino: 7, tipo: 'voltar', posicao: '0 -2 6' },
    ],
    curiosidades: CURIOSIDADES[6],
  },
  {
    id: 7,
    nome: 'Ponto 7',
    posicaoMapa: { top: '13%', left: '60%' },
    fotoChuva: 'ponto-07-chuva.webp',
    fotoSeca: 'ponto-07-seca.webp',
    dataChuva: '2026-05-10',
    dataSeca: '2026-10-02',
    rotacao: 0,
    ajusteSeca: 0, // conferir na calibração
    vizinhos: [
      { destino: 6, tipo: 'avancar', posicao: '6 -2 0.8' },
      { destino: 8, tipo: 'voltar', posicao: '-4 -2 0.1' },
    ],
    curiosidades: CURIOSIDADES[7],
  },
  {
    id: 8,
    nome: 'Ponto 8',
    posicaoMapa: { top: '10%', left: '68%' },
    fotoChuva: 'ponto-08-chuva.webp',
    fotoSeca: 'pon-to-08-seca.webp',
    dataChuva: '2026-05-10',
    dataSeca: '2026-10-02',
    rotacao: 0,
    ajusteSeca: 75,
    vizinhos: [
      { destino: 7, tipo: 'avancar', posicao: '6 -2 0.8' },
      { destino: 1, tipo: 'voltar', posicao: '-4 -2 0.4' },
    ],
    curiosidades: CURIOSIDADES[8],
  },
];

export const TOTAL_PONTOS = PONTOS.length;

// Giro aplicado a TODOS os indicadores do chão, em graus. Com 90, o indicador
// escrito como "à frente" ('0 -2 -6') aparece à esquerda de quem abre a foto.
// Se tiver ido para o lado errado, troque por -90. As posições de cada ponto
// (em "vizinhos") continuam valendo dentro desse giro, e o modo de calibração
// já mostra os valores nesse mesmo sistema.
export const GIRO_INDICADORES = 90;

// Setas "anterior" e "próximo": a rota é circular (do 8 volta ao 1).
export const proximoPonto = (id) => (id % TOTAL_PONTOS) + 1;
export const pontoAnterior = (id) => ((id - 2 + TOTAL_PONTOS) % TOTAL_PONTOS) + 1;

export function buscarPonto(id) {
  return PONTOS.find((p) => p.id === id) || PONTOS[0];
}
