// components/MenuPrincipal.jsx
import { useState } from 'react';
import { Compass, Menu, Move, MapPin, Play, Map as MapIcon, Info } from 'lucide-react';
import 'aframe';
import MenuConfiguracoes from './MenuConfiguracoes';
import styles from './MenuPrincipal.module.css';

export default function MenuPrincipal({ 
  onMudarTela, onIniciarTour, 
  giroscopioAtivo, setGiroscopioAtivo, 
  somAmbienteAtivo, setSomAmbienteAtivo,
  volume, setVolume 
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const caminhoFundo = `${import.meta.env.BASE_URL}fotos360/foto1.webp`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.aframeBackgroundContainer}>
        {/* @ts-ignore */}
        <a-scene embedded vr-mode-ui="enabled: false" loading-screen="enabled: false" class={styles.scene3d}>
          {/* @ts-ignore */}
          <a-sky src={caminhoFundo} rotation="0 -90 0"></a-sky>
          {/* @ts-ignore */}
          <a-entity camera look-controls="enabled: false" wasd-controls="enabled: false" animation="property: rotation; from: 0 0 0; to: 0 360 0; dur: 80000; loop: true; easing: linear"></a-entity>
        {/* @ts-ignore */}
        </a-scene>
      </div>
      
      <div className={styles.gradientTop} />
      <div className={styles.gradientBottom} />

      <div className={styles.topBar}>
        <div className={styles.glassBadge}>
          <Compass size={18} />
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
          telaAtual="menu"
        />
      )}

      {/* Alterado: Adicionado onClick, cursor pointer e title para acessibilidade */}
      <div 
        className={styles.centerPulse} 
        onClick={onIniciarTour} 
        style={{ cursor: 'pointer' }}
        title="Começar o Tour"
      >
        <div className={styles.pulseRing}>
          <div className={styles.pulseCore}>
            <Move size={32} />
          </div>
        </div>
      </div>

      <div className={styles.bottomContent}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span className={styles.locationBadge}><MapPin size={12} /> UFC - Campus Quixadá</span>
          <h1 className={styles.title}>Explorar em 360°</h1>
          <p className={styles.subtitle}>Mergulhe em uma jornada virtual imersiva pelas estruturas do campus.</p>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.btnPrimary} onClick={onIniciarTour}>
            <Play size={18} fill="currentColor" /> Começar
          </button>
          <div className={styles.btnRow}>
            <button className={styles.btnSecondary} onClick={() => onMudarTela('mapa')}><MapIcon size={18} /> Mapa</button>
            <button className={styles.btnSecondary} onClick={() => onMudarTela('sobre')}><Info size={18} /> Sobre</button>
          </div>
        </div>
      </div>
    </div>
  );
}