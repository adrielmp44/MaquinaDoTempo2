import { useEffect, useRef, useState } from 'react';
import 'aframe';
import { ArrowLeft, Rotate3d, Camera, Image as ImageIcon } from 'lucide-react';
import styles from './Tour360.module.css';

export default function Tour360({ fotoAtual, totalFotos, onNavegar, onVoltarMenu, giroscopioAtivo, setGiroscopioAtivo }) {
  const videoRef = useRef(null);
  const [opacidade, setOpacidade] = useState(0.6);
  const [cameraAtiva, setCameraAtiva] = useState(false);

  useEffect(() => {
    let streamAtual = null;

    async function iniciarCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: 'environment' } },
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

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState !== 'granted') {
            console.warn("Permissão de giroscópio negada pelo usuário.");
          }
        })
        .catch(console.error);
    }

    return () => {
      if (streamAtual) {
        streamAtual.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const caminhoFoto = `${import.meta.env.BASE_URL}fotos360/foto${fotoAtual}.webp`;

  return (
    <div className={styles.tourContainer}>
      
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className={styles.videoBackground}
      />

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

        {/* @ts-ignore */}
        <a-entity 
          camera 
          look-controls={`enabled: ${giroscopioAtivo}; magicWindowTrackingEnabled: ${giroscopioAtivo}`}
        ></a-entity>
      {/* @ts-ignore */}
      </a-scene>

      <div className={styles.topControls}>
        <button onClick={onVoltarMenu} className={styles.glassButton}>
          <ArrowLeft size={18} />
          Menu
        </button>

        <button 
          onClick={() => setGiroscopioAtivo(!giroscopioAtivo)} 
          className={`${styles.glassButton} ${giroscopioAtivo ? styles.active : ''}`}
        >
          <Rotate3d size={18} />
        </button>
      </div>

      <div className={styles.bottomPanel}>
        
        <div className={styles.sliderContainer}>
          <Camera size={16} color="#a1a1a1" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={opacidade} 
            onChange={(e) => setOpacidade(parseFloat(e.target.value))}
            className={styles.slider}
          />
          <ImageIcon size={16} color="#a1a1a1" />
        </div>

        <div className={styles.uiOverlay}>
          <button 
            onClick={() => onNavegar('anterior')} 
            disabled={fotoAtual === 1}
            className={styles.navButton}
          >
            Voltar
          </button>

          <span className={styles.counter}>
            Ponto {fotoAtual} / {totalFotos}
          </span>

          <button 
            onClick={() => onNavegar('proxima')} 
            disabled={fotoAtual === totalFotos}
            className={styles.navButton}
          >
            Avançar
          </button>
        </div>
      </div>

      {!cameraAtiva && (
        <div className={styles.cameraAviso}>
          Iniciando câmera...
        </div>
      )}

    </div>
  );
}