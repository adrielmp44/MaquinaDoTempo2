// VisualizacaoPonto: interface comum aos dois modos sobre a CenaPanorama.
// Baixa só as fotos do ponto aberto (RNF02): primeiro a do período exibido,
// depois a do outro, para a troca de período ser imediata.
import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, ChevronLeft, ChevronRight, Compass, Info, Map as MapIcon, Menu, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button, GlassPanel, HudFrame, IconButton, OpacitySlider, Tag } from '../design-system/components/mt-components';
import CenaPanorama, { SINAL_AJUSTE } from './CenaPanorama';
import SeletorPeriodo from './SeletorPeriodo';
import PainelInformacoes from './PainelInformacoes';
import MenuConfiguracoes from './MenuConfiguracoes';
import { buscarPonto, GIRO_INDICADORES, pontoAnterior, proximoPonto, TOTAL_PONTOS } from '../data/pontos';
import { caminhoFoto, carregarFoto, MODO_CALIBRACAO } from '../lib/util';
import styles from './Ponto.module.css';

function lerBussola(tempoLimite = 1500) {
  // Direção para onde o celular aponta, em graus a partir do Norte (horário).
  return new Promise((resolve) => {
    let feito = false;
    const fim = (valor) => {
      if (feito) return;
      feito = true;
      window.removeEventListener('deviceorientationabsolute', aoLer, true);
      window.removeEventListener('deviceorientation', aoLer, true);
      resolve(valor);
    };
    function aoLer(e) {
      if (typeof e.webkitCompassHeading === 'number') return fim(e.webkitCompassHeading); // iOS
      if (e.absolute && typeof e.alpha === 'number') return fim((360 - e.alpha) % 360); // Android
      return undefined;
    }
    window.addEventListener('deviceorientationabsolute', aoLer, true);
    window.addEventListener('deviceorientation', aoLer, true);
    setTimeout(() => fim(null), tempoLimite);
  });
}

export default function VisualizacaoPonto({
  modo, pontoId, periodo, setPeriodo, giroscopio, setGiroscopio,
  onTrocarPonto, onIrPara, transparente = false, fundo = null,
  mostrarCuriosidades = true, setMostrarCuriosidades,
}) {
  const ponto = buscarPonto(pontoId);
  const presencial = modo === 'presencial';
  const cenaRef = useRef(null);

  const [fotos, setFotos] = useState({ pontoId: null, chuva: null, seca: null });
  // progresso e erro valem só para a carga atual (ponto, período e tentativa)
  const [carga, setCarga] = useState({ chave: '', progresso: 0, erro: null });
  const [tentativa, setTentativa] = useState(0);
  const [emTransicao, setEmTransicao] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [infoAberta, setInfoAberta] = useState(false);
  const [opacidade, setOpacidade] = useState(70);
  const [alinhamento, setAlinhamento] = useState(0);
  const [mostrarDica, setMostrarDica] = useState(presencial);
  // o cartão "Você sabia?" fechado vale só para a foto atual (ponto + período)
  const [curiosidadeFechada, setCuriosidadeFechada] = useState(null);

  // Calibração (guardada por ponto, só durante a sessão)
  const [ajustes, setAjustes] = useState({});
  const [sobrepor, setSobrepor] = useState(false);
  const [toques, setToques] = useState({});
  const ajusteSeca = ajustes[ponto.id] ?? ponto.ajusteSeca;
  const setAjusteSeca = (fn) => setAjustes((a) => ({ ...a, [ponto.id]: typeof fn === 'function' ? fn(a[ponto.id] ?? ponto.ajusteSeca) : fn }));
  const toque = toques[ponto.id] ?? null;
  const setToque = useCallback((v) => setToques((t) => ({ ...t, [ponto.id]: v })), [ponto.id]);

  // ------------------------------------------------------------ carregamento
  useEffect(() => {
    let cancelado = false;
    const urlAtual = caminhoFoto(periodo === 'chuva' ? ponto.fotoChuva : ponto.fotoSeca);
    const urlOutra = caminhoFoto(periodo === 'chuva' ? ponto.fotoSeca : ponto.fotoChuva);
    const outro = periodo === 'chuva' ? 'seca' : 'chuva';
    const chave = `${ponto.id}-${periodo}-${tentativa}`;

    (async () => {
      try {
        const atual = await carregarFoto(urlAtual, (p) => !cancelado && setCarga({ chave, progresso: p, erro: null }));
        if (cancelado) return;
        setFotos((f) => (f.pontoId === ponto.id
          ? { ...f, [periodo]: atual }
          : { pontoId: ponto.id, [periodo]: atual, [outro]: null }));
        setEmTransicao(false);
        const outra = await carregarFoto(urlOutra);
        if (!cancelado) setFotos((f) => (f.pontoId === ponto.id ? { ...f, [outro]: outra } : f));
      } catch (e) {
        if (!cancelado) setCarga({ chave, progresso: 0, erro: navigator.onLine === false ? 'offline' : 'falha' });
        console.error('Erro ao carregar foto:', e);
      }
    })();
    return () => { cancelado = true; };
  }, [ponto, periodo, tentativa]);

  const cargaAtual = carga.chave === `${ponto.id}-${periodo}-${tentativa}` ? carga : { progresso: 0, erro: null };
  const { progresso, erro } = cargaAtual;
  const carregando = !erro && (fotos.pontoId !== ponto.id || !fotos[periodo]);

  // ------------------------------------------------------------ navegação
  const irParaVizinho = useCallback((destino) => {
    if (emTransicao) return;
    setEmTransicao(true);
    setTimeout(() => onTrocarPonto(destino), 320);
  }, [emTransicao, onTrocarPonto]);

  // ------------------------------------------------------------ bússola (presencial)
  const alinharComBussola = useCallback(async () => {
    const direcao = await lerBussola();
    if (direcao == null || !cenaRef.current) return false;
    // O Norte da foto passa a ficar na direção em que o Norte real está.
    setAlinhamento(cenaRef.current.yawCameraGraus() + direcao);
    return true;
  }, []);

  useEffect(() => {
    if (!presencial || !fotos[periodo]) return undefined;
    const t = setTimeout(alinharComBussola, 600);
    return () => clearTimeout(t);
  }, [presencial, fotos.pontoId, alinharComBussola]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mostrarDica) return undefined;
    const t = setTimeout(() => setMostrarDica(false), 7000);
    return () => clearTimeout(t);
  }, [mostrarDica]);

  const numero = String(ponto.id).padStart(2, '0');
  const anterior = pontoAnterior(ponto.id);
  const proximo = proximoPonto(ponto.id);
  const curiosidade = ponto.curiosidades?.[periodo];
  const chaveFoto = `${ponto.id}-${periodo}`;
  const verCuriosidade = mostrarCuriosidades && curiosidade && !carregando && curiosidadeFechada !== chaveFoto;
  const mostrarFotos = fotos.pontoId === ponto.id || !fotos.pontoId;

  return (
    <main className={styles.tela}>
      {fundo}

      <div className={styles.cena}>
        <CenaPanorama
          ref={cenaRef}
          urlChuva={mostrarFotos ? fotos.chuva : null}
          urlSeca={mostrarFotos ? fotos.seca : null}
          periodo={periodo}
          opacidade={presencial ? opacidade / 100 : 1}
          transparente={transparente}
          rotacao={ponto.rotacao}
          ajusteSeca={MODO_CALIBRACAO ? ajusteSeca : ponto.ajusteSeca}
          alinhamento={presencial ? alinhamento : 0}
          giroscopio={giroscopio}
          vizinhos={presencial ? [] : ponto.vizinhos}
          giroIndicadores={GIRO_INDICADORES}
          onVizinho={irParaVizinho}
          escurecer={emTransicao}
          sobrepor={MODO_CALIBRACAO && sobrepor}
          onToqueCalibracao={MODO_CALIBRACAO && !presencial ? setToque : undefined}
        />
      </div>

      <div className={styles.hud}>
        <header className={styles.topo}>
          <GlassPanel className={styles.etiquetaPonto} role="status">
            <span>Ponto {ponto.id}</span>
            <span className={`mt-label ${styles.modoRotulo}`}>{presencial ? 'Com câmera' : '360°'}</span>
          </GlassPanel>
          <div className={styles.topoAcoes}>
            <IconButton label="Voltar ao mapa" onClick={() => onIrPara('mapa')}><MapIcon /></IconButton>
            <IconButton label="Abrir configurações" onClick={() => setMenuAberto(true)}><Menu /></IconButton>
          </div>
        </header>

        {verCuriosidade && (
          <div className={styles.curiosidade}>
            <button type="button" className={styles.curiosidadeAbrir} onClick={() => setInfoAberta(true)} aria-label={`Você sabia? ${curiosidade.titulo}. Ler mais`}>
              <HudFrame
                tone="glass"
                icon={<Sparkles />}
                label={`Você sabia? · ${curiosidade.tema}`}
                title={curiosidade.titulo}
              >
                <span className={styles.curiosidadeTexto}>{curiosidade.texto}</span>
              </HudFrame>
            </button>
            <IconButton className={styles.curiosidadeFechar} variant="solid" label="Fechar curiosidade" onClick={() => setCuriosidadeFechada(chaveFoto)}>
              <X />
            </IconButton>
          </div>
        )}

        <div className={styles.base}>
          {presencial && mostrarDica && !carregando && (
            <GlassPanel className={styles.dica} role="note">
              Aponte para a paisagem. Se a foto não coincidir, arraste para os lados.
            </GlassPanel>
          )}
          {presencial && (
            <GlassPanel className={styles.painelSlider}>
              <OpacitySlider value={opacidade} onChange={setOpacidade} label="Transparência da foto" />
            </GlassPanel>
          )}
          <nav className={styles.navegacao} aria-label="Andar entre os pontos">
            <Button variant="secondary" icon={<ChevronLeft />} onClick={() => irParaVizinho(anterior)} aria-label={`Voltar para o ponto ${anterior}`}>
              Ponto {anterior}
            </Button>
            <Tag tone="glass">{ponto.id} de {TOTAL_PONTOS}</Tag>
            <Button variant="secondary" iconEnd={<ChevronRight />} onClick={() => irParaVizinho(proximo)} aria-label={`Avançar para o ponto ${proximo}`}>
              Ponto {proximo}
            </Button>
          </nav>
          <div className={styles.linha}>
            <SeletorPeriodo periodo={periodo} onMudar={setPeriodo} />
            <div className={styles.topoAcoes}>
              {presencial && (
                <IconButton label="Realinhar com a bússola" onClick={alinharComBussola}><Compass /></IconButton>
              )}
              <IconButton label={`Informações do ponto ${ponto.id}`} variant="accent" onClick={() => setInfoAberta(true)}>
                <Info />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {carregando && (
        <GlassPanel className={styles.aviso} role="status" aria-live="polite">
          <div className={styles.carregando}>
            <span className="mt-label">Ponto {numero} · {periodo === 'chuva' ? 'Chuva' : 'Seca'}</span>
            <strong>Carregando a foto…</strong>
            <div className={styles.barra} aria-hidden="true"><span style={{ width: `${Math.round(progresso * 100)}%` }} /></div>
            <span className="mt-label" style={{ color: 'var(--ink-muted)' }}>{Math.round(progresso * 100)}%</span>
          </div>
        </GlassPanel>
      )}

      {erro && (
        <GlassPanel className={styles.aviso} role="alert">
          <span className={styles.erroTitulo}><AlertTriangle aria-hidden="true" /> Não foi possível carregar a foto</span>
          <p style={{ color: 'var(--ink-muted)' }}>
            {erro === 'offline'
              ? 'O celular está sem internet. As fotos precisam ser baixadas para aparecer.'
              : 'A conexão falhou no meio do caminho. Verifique o sinal e tente de novo.'}
          </p>
          <Button icon={<RotateCcw />} onClick={() => setTentativa((n) => n + 1)}>Tentar de novo</Button>
        </GlassPanel>
      )}

      {MODO_CALIBRACAO && !presencial && (
        <GlassPanel className={styles.calibracao}>
          <strong>Calibração · Ponto {ponto.id}</strong>
          <label className={styles.calibracaoLinha}>
            <input type="checkbox" checked={sobrepor} onChange={(e) => setSobrepor(e.target.checked)} />
            Seca por cima da chuva (50%)
          </label>
          <div className={styles.calibracaoLinha}>
            <button type="button" onClick={() => setAjusteSeca((a) => a - 1)}>−1</button>
            <input type="range" min="-180" max="180" step="1" value={ajusteSeca} onChange={(e) => setAjusteSeca(Number(e.target.value))} aria-label="Ajuste da seca" />
            <button type="button" onClick={() => setAjusteSeca((a) => a + 1)}>+1</button>
          </div>
          <code>ajusteSeca: {ajusteSeca},</code>
          <code>{toque ? `posicao: '${toque}'` : 'Toque no chão da foto para ver a posição de um indicador.'}</code>
          <span style={{ color: 'var(--ink-muted)' }}>Sinal do ajuste: {SINAL_AJUSTE}</span>
        </GlassPanel>
      )}

      {infoAberta && <PainelInformacoes ponto={ponto} periodo={periodo} onFechar={() => setInfoAberta(false)} />}
      {menuAberto && (
        <MenuConfiguracoes
          giroscopio={giroscopio}
          setGiroscopio={setGiroscopio}
          mostrarCuriosidades={mostrarCuriosidades}
          setMostrarCuriosidades={setMostrarCuriosidades}
          onIrPara={(t) => { setMenuAberto(false); onIrPara(t); }}
          onFechar={() => setMenuAberto(false)}
        />
      )}
    </main>
  );
}
