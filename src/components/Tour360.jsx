import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'; // O Player para o som ambiente
import 'aframe';
import { Compass, Menu, X, RotateCcw, Volume2, Home, Maximize2, Map as MapIcon, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Tour360.module.css';

export default function Tour360({ 
  fotoAtual, totalFotos, onNavegar, onVoltarMenu, onMudarTela,
  giroscopioAtivo, setGiroscopioAtivo,
  somAmbienteAtivo, setSomAmbienteAtivo 
}) {
  const videoRef = useRef(null);
  const [opacidade, setOpacidade] = useState(0.72); // Inicia em 72% como no print
  const [cameraAtiva, setCameraAtiva] = useState(false);
  
  // Novos estados para a UI
  const [menuAberto, setMenuAberto] = useState(false);
  const [volume, setVolume] = useState(68); // Volume inicial do som ambiente

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

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  const caminhoFoto = `${import.meta.env.BASE_URL}fotos360/foto${fotoAtual}.webp`;

  return (
    <div className={styles.tourContainer}>
      
      {/* Player do YouTube Invisível para o Som Ambiente */}
      <ReactPlayer
        url="https://www.youtube.com/watch?v=MwlKHLDXqoE"
        playing={somAmbienteAtivo}
        volume={volume / 100} // ReactPlayer usa volume de 0 a 1
        loop={true}
        width="0"
        height="0"
        style={{ display: 'none' }}
        config={{ youtube: { playerVars: { autoplay: 1 } } }}
      />

      <video ref={videoRef} autoPlay playsInline muted className={styles.videoBackground} />

      {/* @ts-ignore */}
      <a-scene embedded renderer="alpha: true; colorManagement: true;" vr-mode-ui="enabled: false" className={styles.scene3d}>
        {/* @ts-ignore */}
        <a-sky src={caminhoFoto} rotation="0 -90 0" material={`opacity: ${opacidade}; transparent: true`}></a-sky>
        {/* @ts-ignore */}
        <a-entity camera look-controls={`enabled: ${giroscopioAtivo}; magicWindowTrackingEnabled: ${giroscopioAtivo}`}></a-entity>
      {/* @ts-ignore */}
      </a-scene>

      {/* Top Bar - Header */}
      <div className={styles.topBar}>
        <div className={styles.glassBadge}>
          <Compass size={16} />
          <span>Máquina do Tempo</span>
        </div>
        <button className={styles.iconButton} onClick={() => setMenuAberto(!menuAberto)}>
          <Menu size={20} />
        </button>
      </div>

      {/* Menu Hamburger / Settings */}
      {menuAberto && (
        <div className={styles.settingsCard}>
          <div className={styles.settingsHeader}>
            <span>Settings</span>
            <X size={16} color="#a1a1a1" style={{cursor: 'pointer'}} onClick={() => setMenuAberto(false)} />
          </div>

          {/* Card 1: Giroscópio */}
          <div className={styles.settingsGroup}>
            <div className={styles.settingsRow} onClick={() => setGiroscopioAtivo(!giroscopioAtivo)}>
              <div className={styles.settingsLabel}>
                <RotateCcw size={18} color="#fff" />
                <div className={styles.settingsText}>
                  <span className={styles.settingsTitle}>Gyroscope</span>
                  <span className={styles.settingsSubtitle}>Motion controls</span>
                </div>
              </div>
              <div style={{width: 40, height: 24, background: giroscopioAtivo ? '#fff' : 'rgba(255,255,255,0.2)', borderRadius: 12, position: 'relative', transition: 'all 0.3s'}}>
                <div style={{width: 20, height: 20, background: giroscopioAtivo ? '#000' : '#111', borderRadius: '50%', position: 'absolute', right: giroscopioAtivo ? 2 : 18, top: 2, transition: 'all 0.3s'}}></div>
              </div>
            </div>
          </div>

          {/* Card 2: Som Ambiente + Volume */}
          <div className={styles.settingsGroup}>
            <div className={styles.settingsRow} onClick={() => setSomAmbienteAtivo(!somAmbienteAtivo)}>
              <div className={styles.settingsLabel}>
                <Volume2 size={18} color="#fff" />
                <div className={styles.settingsText}>
                  <span className={styles.settingsTitle}>Ambient Sound</span>
                  <span className={styles.settingsSubtitle}>Museum ambience</span>
                </div>
              </div>
              <div style={{width: 40, height: 24, background: somAmbienteAtivo ? '#fff' : 'rgba(255,255,255,0.2)', borderRadius: 12, position: 'relative', transition: 'all 0.3s'}}>
                <div style={{width: 20, height: 20, background: somAmbienteAtivo ? '#000' : '#111', borderRadius: '50%', position: 'absolute', right: somAmbienteAtivo ? 2 : 18, top: 2, transition: 'all 0.3s'}}></div>
              </div>
            </div>
            
            {somAmbienteAtivo && (
              <div style={{ marginTop: '8px' }}>
                <div className={styles.transpLabels} style={{ marginBottom: '8px' }}>
                  <span>Volume</span>
                  <span>{volume}%</span>
                </div>
                <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)} className={styles.slider} />
              </div>
            )}
          </div>

          <div className={styles.settingsButtons}>
            {/* Botão Home */}
            <button className={styles.btnSecondary} onClick={() => { onVoltarMenu(); setMenuAberto(false); }}>
              <Home size={16} /> Home
            </button>
            
            {/* Botão Tela Cheia */}
            <button className={styles.btnSecondary} onClick={() => { toggleFullScreen(); setMenuAberto(false); }}>
              <Maximize2 size={16} /> Full
            </button>

            {/* 👇 NOVOS BOTÕES ADICIONADOS 👇 */}
            {/* Botão Mapa */}
            <button className={styles.btnSecondary} onClick={() => { onMudarTela('mapa'); setMenuAberto(false); }}>
              <MapIcon size={16} /> Mapa
            </button>
            
            {/* Botão Sobre */}
            <button className={styles.btnSecondary} onClick={() => { onMudarTela('sobre'); setMenuAberto(false); }}>
              <Info size={16} /> Sobre
            </button>
          </div>
        </div>
      )}

      {/* 👇 NOVOS BOTÕES DE NAVEGAÇÃO LATERAL 👇 */}
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

      {/* Container Fixo na parte inferior - Apenas Transparência */}
      <div className={styles.bottomContainer}>
        {/* Card de Transparência */}
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
        {/* Removido o .bottomNav antigo */}
      </div>

      {!cameraAtiva && (
        <div className={styles.cameraAviso}>Iniciando câmera...</div>
      )}

    </div>
  );
}