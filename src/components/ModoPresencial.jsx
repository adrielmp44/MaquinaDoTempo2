// ModoPresencial: exibe a câmera traseira ao fundo e a foto do outro período
// por cima, com o controle de transparência (RF04).
import { useEffect, useRef } from 'react';
import VisualizacaoPonto from './VisualizacaoPonto';
import styles from './Ponto.module.css';

export default function ModoPresencial(props) {
  const videoRef = useRef(null);
  const { onIrPara } = props;

  useEffect(() => {
    let stream = null;
    let cancelado = false;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
        if (cancelado) { stream.getTracks().forEach((t) => t.stop()); return; }
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (e) {
        console.error('Câmera indisponível:', e);
        if (!cancelado) onIrPara('semCamera');
      }
    })();
    return () => {
      cancelado = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [onIrPara]);

  const video = <video ref={videoRef} className={styles.video} autoPlay playsInline muted aria-hidden="true" />;
  return <VisualizacaoPonto {...props} modo="presencial" transparente fundo={video} />;
}
