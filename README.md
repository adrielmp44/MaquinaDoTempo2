# Máquina do Tempo · Açude Cedro

Aplicação web (React + A-Frame) que mostra a paisagem do Açude Cedro, em Quixadá, na chuva e na seca.
Visual do design system em `src/design-system/` (tokens, estilos e componentes).

## Rodar

```bash
npm install
npm run dev          # http://localhost:5173/MaquinaDoTempo2/
npm run deploy       # build + GitHub Pages (HTTPS, necessário para a câmera)
```

Para testar a câmera no celular durante o desenvolvimento, use o endereço publicado no GitHub Pages
(a câmera só funciona em HTTPS).

## Endereços

- Início: `https://adrielmp44.github.io/MaquinaDoTempo2/`
- Código QR do banner (abre direto no modo presencial): `https://adrielmp44.github.io/MaquinaDoTempo2/?modo=presencial`
- Calibração (só para o autor): acrescente `?calibrar` ao endereço.

## Onde mudar o conteúdo

Tudo sobre os pontos fica em `src/data/pontos.js`: texto, posição no mapa, datas, alinhamento e vizinhos.
As fotos ficam em `public/fotos360/` com o nome `ponto-NN-chuva.webp` e `ponto-NN-seca.webp`.

## Calibração (`?calibrar`)

1. **Alinhar a seca com a chuva:** no modo "Explorar de onde estou", abra um ponto, marque
   "Seca por cima da chuva" e mova o controle até as duas fotos coincidirem. Copie o valor de
   `ajusteSeca` para o ponto em `pontos.js`.
2. **Indicadores no chão (vizinhos):** cada foto tem dois, um para avançar (laranja) e um para voltar
   (branco). Toque no chão da foto, onde o indicador deve ficar; o painel mostra a `posicao`.
   Copie para o item certo em `vizinhos` no `pontos.js`. Sem calibrar, o de avançar fica à frente
   (`'0 -2 -6'`) e o de voltar, atrás (`'0 -2 6'`).
3. **Mapa:** na tela do mapa, toque no lugar do ponto e copie o `posicaoMapa`.

## Curiosidades

O cartão "Você sabia?" de cada foto vem de `src/data/curiosidades.js`: um texto para a chuva e
outro para a seca em cada ponto, com a fonte. Para trocar, edite o texto ali.

## Tempos de carregamento (RNF04)

Cada foto baixada é anotada no console (`[Máquina do Tempo] ponto-03-seca.webp em 2.4 s`)
e fica em `window.__mtTempos`.
