// ModoRemoto: exibe a foto sem a câmera, com os indicadores de navegação
// entre pontos vizinhos (RF03, RF07).
import VisualizacaoPonto from './VisualizacaoPonto';

export default function ModoRemoto(props) {
  return <VisualizacaoPonto {...props} modo="remoto" />;
}
