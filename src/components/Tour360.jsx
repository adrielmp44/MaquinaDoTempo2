import { useEffect, useRef, useState } from 'react';
import 'aframe';
import styles from './Tour360.module.css';

export default function Tour360({ fotoAtual, totalFotos, onNavegar, onVoltarMenu }) {
  const videoRef = useRef(null);
  const [opacidade, setOpacidade] = useState(0.6); // Começa com 60% de opacidade na foto 360
  const [giroscopioAtivo, setGiroscopioAtivo] = useState(true);
  const [cameraAtiva, setCameraAtiva] = useState(false);

  // Inicializa a câmera traseira do celular
  useEffect(() => {
    let streamAtual = null;

    async function iniciarCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: 'environment' } }, // Força câmera traseira
          audio: false
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamAtual = stream;
          setCameraAtiva(true);
        }
      } catch (err) {
        console.warn("Câmera traseira específica não encontrada, tentando câmera padrão...", err);
        try {
          // Fallback caso esteja testando no PC ou notebook (pega a webcam padrão)
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            streamAtual = fallbackStream;
            setCameraAtiva(true);
          }
        } catch (fallbackErr) {
          console.error("Erro ao acessar qualquer câmera:", fallbackErr);
        }
      }
    }

    iniciarCamera();

    // Solicita permissão explícita para o giroscópio em dispositivos iOS modernos
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState !== 'granted') {
            console.warn("Permissão de giroscópio negada pelo usuário.");
          }
        })
        .catch(console.error);
    }

    // Desliga a câmera quando o usuário sai do tour de volta para o menu
    return () => {
      if (streamAtual) {
        streamAtual.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // 👇 O PULO DO GATO ESTÁ AQUI: O Vite resolve o caminho certinho para o PC e para o GitHub
  const caminhoFoto = `${import.meta.env.BASE_URL}fotos360/foto${fotoAtual}.webp`;

  return (
    <div className={styles.tourContainer}>
      
      {/* Elemento de vídeo invisível capturando o feed da câmera traseira */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className={styles.videoBackground}
      />

      {/* Cenário do A-Frame configurado para transparência */}
      {/* @ts-ignore */}
      <a-scene 
        embedded 
        renderer="alpha: true; colorManagement: true;" 
        vr-mode-ui="enabled: false"
        className={styles.scene3d}
      >
        {/* @ts-ignore */}
        <a-sky 
          src={caminhoFoto} 
          rotation="0 -90 0"
          material={`opacity: ${opacidade}; transparent: true`}
        ></a-sky>

        {/* Câmera da cena com controle dinâmico do giroscópio */}
        {/* @ts-ignore */}
        <a-entity 
          camera 
          look-controls={`enabled: ${giroscopioAtivo}; magicWindowTrackingEnabled: ${giroscopioAtivo}`}
        ></a-entity>
      {/* @ts-ignore */}
      </a-scene>

      {/* Controles Flutuantes Superiores */}
      <div className={styles.topControls}>
        <button onClick={onVoltarMenu} className={styles.homeButton}>
          <span>🌵</span> MENU
        </button>

        {/* Botão de alternar o Giroscópio */}
        <button 
          onClick={() => setGiroscopioAtivo(!giroscopioAtivo)} 
          className={`${styles.utilityButton} ${giroscopioAtivo ? styles.activeButton : ''}`}
        >
          {giroscopioAtivo ? '🔄 Giroscópio: ON' : '📴 Giroscópio: OFF'}
        </button>
      </div>

      {/* Painel Inferior de Controle de Opacidade e Navegação */}
      <div className={styles.bottomPanel}>
        
        {/* Controle deslizante de transparência para sobrepor a câmera */}
        <div className={styles.sliderContainer}>
          <span className={styles.sliderLabel}>📷 Câmera</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={opacidade} 
            onChange={(e) => setOpacidade(parseFloat(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.sliderLabel}>🌅 Foto 360</span>
        </div>

        <div className={styles.uiOverlay}>
          <button 
            onClick={() => onNavegar('anterior')} 
            disabled={fotoAtual === 1}
            className={styles.navButton}
          >
            VOLTAR
          </button>

          <span className={styles.counter}>
            PONTO {fotoAtual} / {totalFotos}
          </span>

          <button 
            onClick={() => onNavegar('proxima')} 
            disabled={fotoAtual === totalFotos}
            className={styles.navButton}
          >
            AVANÇAR
          </button>
        </div>
      </div>

      {!cameraAtiva && (
        <div className={styles.cameraAviso}>
          Carregando câmera traseira...
        </div>
      )}

    </div>
  );
}