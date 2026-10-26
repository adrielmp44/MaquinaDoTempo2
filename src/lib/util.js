// Funções de apoio usadas por várias telas.

const BASE = import.meta.env.BASE_URL;

export const caminhoFoto = (arquivo) => `${BASE}fotos360/${arquivo}`;
export const caminhoPublico = (arquivo) => `${BASE}${arquivo}`;

const params = new URLSearchParams(window.location.search);

/** ?calibrar no endereço liga as ferramentas de ajuste (só para o autor). */
export const MODO_CALIBRACAO = params.has('calibrar');

/** O código QR do banner aponta para ?modo=presencial (RF09). */
export const ENTRADA_QR = params.get('modo') === 'presencial' || params.has('qr');

/**
 * RF05: no modo presencial, o seletor começa no período oposto ao do mês atual.
 * De fevereiro a maio (chuva), mostra a seca; nos demais meses, a chuva.
 */
export function periodoInicial(modo, data = new Date()) {
  if (modo !== 'presencial') return 'chuva';
  const mes = data.getMonth() + 1;
  return mes >= 2 && mes <= 5 ? 'seca' : 'chuva';
}

const MESES = ['jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];

/** '2026-05-10' -> '10 maio 2026' (abreviação de mês da ABNT). */
export function formatarData(iso) {
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} ${MESES[m - 1]} ${a}`;
}

export const temTelaCheia = () =>
  typeof document !== 'undefined' && !!document.documentElement.requestFullscreen;

// ------------------------------------------------------------------ Fotos
// As fotos são baixadas sob demanda (RNF02), com progresso, e guardadas na
// memória durante a visita para não baixar de novo ao trocar de período.

const cache = new Map(); // url -> Promise<'#id' do <img>>

function depositoDeImagens() {
  let el = document.getElementById('mt-fotos');
  if (!el) {
    el = document.createElement('div');
    el.id = 'mt-fotos';
    el.hidden = true;
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
  }
  return el;
}
export const temposDeCarregamento = []; // RNF04: anotado para o teste

export function carregarFoto(url, onProgresso) {
  if (cache.has(url)) return cache.get(url);
  const inicio = performance.now();
  const promessa = (async () => {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const total = Number(resp.headers.get('content-length')) || 0;
    let blob;
    if (resp.body && total && onProgresso) {
      const leitor = resp.body.getReader();
      const partes = [];
      let recebido = 0;
      for (;;) {
        const { done, value } = await leitor.read();
        if (done) break;
        partes.push(value);
        recebido += value.length;
        onProgresso(recebido / total);
      }
      blob = new Blob(partes, { type: 'image/webp' });
    } else {
      blob = await resp.blob();
    }
    const segundos = (performance.now() - inicio) / 1000;
    temposDeCarregamento.push({ url, segundos: Number(segundos.toFixed(2)), kb: Math.round(blob.size / 1024) });
    console.info(`[Máquina do Tempo] ${url.split('/').pop()} em ${segundos.toFixed(1)} s`);
    // O A-Frame recebe um <img> já decodificado, referenciado por id ("#foto-…"),
    // para não baixar a foto de novo nem travar a tela ao decodificar.
    const id = `foto-${url.split('/').pop().replace(/\W/g, '-')}`;
    const img = new Image();
    img.id = id;
    img.alt = '';
    img.crossOrigin = 'anonymous';
    img.src = URL.createObjectURL(blob);
    await img.decode().catch(() => {});
    depositoDeImagens().appendChild(img);
    return `#${id}`;
  })();
  cache.set(url, promessa);
  promessa.catch(() => cache.delete(url)); // permite tentar de novo
  return promessa;
}

if (typeof window !== 'undefined') window.__mtTempos = temposDeCarregamento;
