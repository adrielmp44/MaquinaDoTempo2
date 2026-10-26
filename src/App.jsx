// App.jsx: guarda o estado compartilhado e decide qual tela exibir (RF01, RF09).
import { lazy, Suspense, useCallback, useState } from 'react';
import TelaInicial from './components/TelaInicial';
import TelaPermissoes from './components/TelaPermissoes';
import CameraIndisponivel from './components/CameraIndisponivel';
import Mapa from './components/Mapa';
import Sobre from './components/Sobre';
import { ENTRADA_QR, periodoInicial } from './lib/util';
import { PONTOS } from './data/pontos';

// A cena 360° (A-Frame) é o maior pedaço do código: só é baixada ao abrir um ponto,
// para a tela inicial abrir rápido pelo código QR.
const ModoPresencial = lazy(() => import('./components/ModoPresencial'));
const ModoRemoto = lazy(() => import('./components/ModoRemoto'));

const Carregando = () => (
  <div style={{ height: '100dvh', display: 'grid', placeItems: 'center', background: '#141210', color: '#f6f1ea' }} role="status">
    Abrindo o ponto…
  </div>
);

export default function App() {
  // Pelo código QR do banner, o visitante entra direto no pedido de permissões.
  const [tela, setTela] = useState(ENTRADA_QR ? 'permissoes' : 'inicio');
  const [modo, setModo] = useState(ENTRADA_QR ? 'presencial' : 'remoto');
  const [pontoId, setPontoId] = useState(PONTOS[0].id);
  const [periodo, setPeriodo] = useState('chuva');
  const [giroscopio, setGiroscopio] = useState(true);
  const [mostrarCuriosidades, setMostrarCuriosidades] = useState(true);
  // Se o mapa foi aberto de dentro de um ponto, "voltar" leva de volta a ele.
  const [mapaVeioDoPonto, setMapaVeioDoPonto] = useState(false);

  const escolherModo = useCallback((novoModo) => {
    setModo(novoModo);
    setTela(novoModo === 'presencial' ? 'permissoes' : 'mapa');
  }, []);

  const abrirPonto = useCallback((id) => {
    // Reabrir o mesmo ponto pelo mapa mantém o período que estava na tela.
    if (id !== pontoId || !mapaVeioDoPonto) setPeriodo(periodoInicial(modo));
    setPontoId(id);
    setTela('ponto');
  }, [modo, pontoId, mapaVeioDoPonto]);

  const irPara = useCallback((destino) => {
    // A tela de mapa vinda do início, sem escolha de modo, abre no modo remoto.
    if (destino === 'mapa' && tela === 'inicio') setModo('remoto');
    if (destino === 'mapa') setMapaVeioDoPonto(tela === 'ponto');
    setTela(destino);
  }, [tela]);

  const propsPonto = {
    pontoId,
    periodo,
    setPeriodo,
    giroscopio,
    setGiroscopio,
    mostrarCuriosidades,
    setMostrarCuriosidades,
    onTrocarPonto: setPontoId,
    onIrPara: irPara,
  };

  switch (tela) {
    case 'permissoes':
      return (
        <TelaPermissoes
          onPermitido={() => { setModo('presencial'); setTela('mapa'); }}
          onNegado={() => setTela('semCamera')}
          onSemCamera={() => { setModo('remoto'); setTela('mapa'); }}
          onVoltar={() => setTela('inicio')}
        />
      );
    case 'semCamera':
      return (
        <CameraIndisponivel
          onModoRemoto={() => { setModo('remoto'); setTela('mapa'); }}
          onTentarDeNovo={() => setTela('permissoes')}
        />
      );
    case 'mapa':
      return (
        <Mapa
          modo={modo}
          pontoAtual={pontoId}
          voltarAoPonto={mapaVeioDoPonto}
          onSelecionarPonto={abrirPonto}
          onVoltar={() => setTela(mapaVeioDoPonto ? 'ponto' : 'inicio')}
        />
      );
    case 'ponto':
      return (
        <Suspense fallback={<Carregando />}>
          {modo === 'presencial' ? <ModoPresencial {...propsPonto} /> : <ModoRemoto {...propsPonto} />}
        </Suspense>
      );
    case 'sobre':
      return <Sobre onVoltar={() => setTela('inicio')} />;
    default:
      return <TelaInicial onEscolherModo={escolherModo} onIrPara={irPara} />;
  }
}
