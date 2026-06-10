// components/Tour360.jsx
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import 'aframe';
import { Compass, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import MenuConfiguracoes from './MenuConfiguracoes';
import HotspotsNavegacao from './HotspotsNavegacao';
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
  
  // Estado para controlar o efeito visual de transição suave
  const [emTransicao, setEmTransicao] = useState(false);

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

  const irParaPontoComTransicao = (fotoDestino) => {
    if (emTransicao) return;
    
    // Inicia o efeito fade out (escurece a visão do usuário)
    setEmTransicao(true);
    
    setTimeout(() => {
      // Executa a navegação real mudando a imagem de fundo
      onNavegar('irPara', fotoDestino); 
      
      setTimeout(() => {
        // Finaliza com o efeito fade in (clareia a visão na nova foto)
        setEmTransicao(false);
      }, 300);
    }, 400);
  };

  const caminhoFoto = `${import.meta.env.BASE_URL}fotos360/foto${fotoAtual}.webp`;
  const caminhoSeta = `${import.meta.env.BASE_URL}assets/seta.png`;

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
      <a-scene 
        embedded 
        renderer="alpha: true; colorManagement: true;" 
        vr-mode-ui="enabled: false" 
        className={styles.scene3d}
        cursor="rayOrigin: mouse; fuse: false"
        raycaster="objects: .clicavel"
      >
        {/* @ts-ignore */}
        <a-assets>
          <img id="icone-seta" src={caminhoSeta} crossOrigin="anonymous" />
        {/* @ts-ignore */}
        </a-assets>

        {/* @ts-ignore */}
        <a-sky src={caminhoFoto} rotation="0 -90 0" material={`opacity: ${opacidade}; transparent: true`}></a-sky>
        
        {/* Renderização condicional dos Hotspots */}
        <HotspotsNavegacao fotoAtual={fotoAtual} onClicarPonto={irParaPontoComTransicao} />

        {/* @ts-ignore */}
        <a-entity camera look-controls={`enabled: ${giroscopioAtivo}; magicWindowTrackingEnabled: ${giroscopioAtivo}`}>
          {/* Esfera preta interna invertida para simular o piscar dos olhos na troca de ambiente */}
          {/* @ts-ignore */}
          <a-sphere 
            radius="0.5" 
            color="#000" 
            material={`transparent: true; opacity: ${emTransicao ? 1 : 0}; side: back`}
            animation={`property: material.opacity; to: ${emTransicao ? 1 : 0}; dur: 300; easing: easeInOutQuad`}
          ></a-sphere>
        {/* @ts-ignore */}
        </a-entity>
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