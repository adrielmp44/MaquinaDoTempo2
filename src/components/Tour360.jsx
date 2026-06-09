// components/Tour360.jsx
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import 'aframe';
import { Compass, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import MenuConfiguracoes from './MenuConfiguracoes';
import styles from './Tour360.module.css';

export default function Tour360({ 
  fotoAtual, totalFotos, onNavegar, onVoltarMenu, onMudarTela,
  giroscopioAtivo, setGiroscopioAtivo,
  somAmbienteAtivo, setSomAmbienteAtivo,
  volume, setVolume 
}) {
  const videoRef = useRef(null);
  const [opacidade, setOpacidade] = useState(0.70);
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

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
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            streamAtual = fallbackStream;
            setCameraAtiva(true);
          }
        } catch (fallbackErr) {
          console.error("Erro na câmera:", fallbackErr);
        }
      }
    }

    iniciarCamera();

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().catch(console.error);
    }

    return () => {
      if (streamAtual) streamAtual.getTracks().forEach(track => track.stop());
    };
  }, []);

  const caminhoFoto = `${import.meta.env.BASE_URL}fotos360/foto${fotoAtual}.webp`;

  return (
    <div className={styles.tourContainer}>
      
      {/* Container invisível do Player para não travar os controles no navegador */}
      <div style={{ position: 'absolute', width: '0px', height: '0px', overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
        <ReactPlayer 
          url="https://www.youtube.com/watch?v=MwlKHLDXqoE" 
          playing={somAmbienteAtivo}
          loop={true}
          volume={volume / 100} 
          config={{
            youtube: {
              playerVars: { 
                autoplay: 1, 
                controls: 0,
                origin: window.location.origin 
              }
            }
          }}
        />
      </div>
      
      <video ref={videoRef} autoPlay playsInline muted className={styles.videoBackground} />

      {/* @ts-ignore */}
      <a-scene embedded renderer="alpha: true; colorManagement: true;" vr-mode-ui="enabled: false" className={styles.scene3d}>
        {/* @ts-ignore */}
        <a-sky src={caminhoFoto} rotation="0 -90 0" material={`opacity: ${opacidade}; transparent: true`}></a-sky>
        {/* @ts-ignore */}
        <a-entity camera look-controls={`enabled: ${giroscopioAtivo}; magicWindowTrackingEnabled: ${giroscopioAtivo}`}></a-entity>
      {/* @ts-ignore */}
      </a-scene>

      <div className={styles.topBar}>
        <div className={styles.glassBadge}>
          <Compass size={16} />
          <span>Máquina do Tempo</span>
        </div>
        <button className={styles.iconButton} onClick={() => setMenuAberto(!menuAberto)}>
          <Menu size={20} />
        </button>
      </div>

      {menuAberto && (
        <MenuConfiguracoes 
          onFechar={() => setMenuAberto(false)}
          giroscopioAtivo={giroscopioAtivo}
          setGiroscopioAtivo={setGiroscopioAtivo}
          somAmbienteAtivo={somAmbienteAtivo}
          setSomAmbienteAtivo={setSomAmbienteAtivo}
          volume={volume}
          setVolume={setVolume}
          onMudarTela={onMudarTela}
          telaAtual="tour"
        />
      )}

      <button 
        onClick={() => onNavegar('anterior')} 
        disabled={fotoAtual === 1}
        className={`${styles.navButton} ${styles.leftButton}`}
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={() => onNavegar('proxima')} 
        disabled={fotoAtual === totalFotos}
        className={`${styles.navButton} ${styles.rightButton}`}
      >
        <ChevronRight size={24} />
      </button>

      <div className={styles.bottomContainer}>
        <div className={styles.transparencyCard}>
          <div className={styles.transpHeader}>
            <span className={styles.transpTitle}>Transparência</span>
            <span className={styles.transpSubtitle}>Foto sobreposta</span>
          </div>
          <input 
            type="range" 
            min="0" max="1" step="0.01" 
            value={opacidade} 
            onChange={(e) => setOpacidade(parseFloat(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.transpLabels}>
            <span>0%</span>
            <span>{Math.round(opacidade * 100)}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {!cameraAtiva && (
        <div className={styles.cameraAviso}>Iniciando câmera...</div>
      )}
    </div>
  );
}