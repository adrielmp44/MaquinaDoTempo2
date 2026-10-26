// TelaPermissoes: explica o uso da câmera e dos sensores e só pede as
// permissões depois do toque no botão (RF06). No iOS, o pedido dos sensores
// precisa partir de um toque, por isso ele vem antes do pedido da câmera.
import { useState } from 'react';
import { ArrowLeft, Camera, Compass, ShieldCheck, Wifi } from 'lucide-react';
import { Button, IconButton } from '../design-system/components/mt-components';
import styles from './Telas.module.css';

async function pedirSensores() {
  const D = window.DeviceOrientationEvent;
  if (D && typeof D.requestPermission === 'function') {
    try { return (await D.requestPermission()) === 'granted'; } catch { return false; }
  }
  return true; // Android e navegadores sem pedido explícito
}

async function pedirCamera() {
  if (!navigator.mediaDevices?.getUserMedia) return false;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    stream.getTracks().forEach((t) => t.stop()); // a câmera é aberta de novo no ponto
    return true;
  } catch {
    return false;
  }
}

export default function TelaPermissoes({ onPermitido, onNegado, onSemCamera, onVoltar }) {
  const [pedindo, setPedindo] = useState(false);

  async function permitir() {
    setPedindo(true);
    await pedirSensores(); // sem sensores ainda dá para usar arrastando o dedo
    const camera = await pedirCamera();
    setPedindo(false);
    if (camera) onPermitido();
    else onNegado();
  }

  return (
    <main className={styles.tela}>
      <div className={styles.conteudo}>
        <div className={styles.cabecalho}>
          <IconButton variant="solid" label="Voltar ao início" onClick={onVoltar}><ArrowLeft /></IconButton>
        </div>
        <div className={styles.centro}>
          <div className={styles.icone} aria-hidden="true"><Camera /></div>
          <h1 className={styles.tituloTela}>Antes de começar</h1>
          <p className={styles.texto}>
            Para mostrar a foto do outro período sobre a paisagem, a Máquina do Tempo usa a câmera e os sensores de movimento do celular.
          </p>
          <ul className={styles.lista}>
            <li><Compass aria-hidden="true" /><span>Os sensores fazem a foto acompanhar o celular quando você vira.</span></li>
            <li><ShieldCheck aria-hidden="true" /><span>Nada é gravado nem enviado. A imagem da câmera fica só na sua tela.</span></li>
            <li><Wifi aria-hidden="true" /><span>As fotos são baixadas pela internet, cerca de 3 MB por ponto.</span></li>
          </ul>
        </div>
        <div className={styles.acoes}>
          <Button size="lg" block icon={<Camera />} onClick={permitir} disabled={pedindo}>
            {pedindo ? 'Aguardando permissão…' : 'Permitir câmera e sensores'}
          </Button>
          <Button variant="ghost" block onClick={onSemCamera}>Continuar sem câmera</Button>
        </div>
      </div>
    </main>
  );
}
