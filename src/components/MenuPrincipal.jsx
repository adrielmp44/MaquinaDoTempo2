import { useState } from 'react';
import { Compass, Menu, X, Rotate3d, Volume2, Move, MapPin, Play, Map as MapIcon, Info } from 'lucide-react';
import 'aframe';
import styles from './MenuPrincipal.module.css';

export default function MenuPrincipal({ 
  onMudarTela, onIniciarTour, 
  giroscopioAtivo, setGiroscopioAtivo, 
  somAmbienteAtivo, setSomAmbienteAtivo 
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
        <div className={styles.settingsCard}>
          <div className={styles.settingsHeader}>
            <span>Settings</span>
            <X size={16} color="#a1a1a1" style={{cursor: 'pointer'}} onClick={() => setMenuAberto(false)} />
          </div>
          
          {/* 👇 Toggle Giroscópio Dinâmico 👇 */}
          <div className={styles.settingsItem} style={{cursor: 'pointer'}} onClick={() => setGiroscopioAtivo(!giroscopioAtivo)}>
            <div className={styles.settingsLabel}>
              <Rotate3d size={18} color={giroscopioAtivo ? '#fff' : '#a1a1a1'} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: giroscopioAtivo ? '#fff' : '#a1a1a1' }}>Gyroscope</span>
                <span style={{ fontSize: '0.7rem', color: '#a1a1a1' }}>Controles</span>
              </div>
            </div>
            <div style={{width: 40, height: 24, background: giroscopioAtivo ? '#fff' : 'rgba(255,255,255,0.2)', borderRadius: 12, position: 'relative', transition: 'all 0.3s'}}>
              <div style={{width: 20, height: 20, background: giroscopioAtivo ? '#000' : '#111', borderRadius: '50%', position: 'absolute', right: giroscopioAtivo ? 2 : 18, top: 2, transition: 'all 0.3s'}}></div>
            </div>
          </div>

          {/* 👇 Toggle Som Ambiente Dinâmico 👇 */}
          <div className={styles.settingsItem} style={{cursor: 'pointer'}} onClick={() => setSomAmbienteAtivo(!somAmbienteAtivo)}>
            <div className={styles.settingsLabel}>
              <Volume2 size={18} color={somAmbienteAtivo ? '#fff' : '#a1a1a1'} />
              <span style={{ color: somAmbienteAtivo ? '#fff' : '#a1a1a1' }}>Som Ambiente</span>
            </div>
            <div style={{width: 40, height: 24, background: somAmbienteAtivo ? '#fff' : 'rgba(255,255,255,0.2)', borderRadius: 12, position: 'relative', transition: 'all 0.3s'}}>
              <div style={{width: 20, height: 20, background: somAmbienteAtivo ? '#000' : '#111', borderRadius: '50%', position: 'absolute', right: somAmbienteAtivo ? 2 : 18, top: 2, transition: 'all 0.3s'}}></div>
            </div>
          </div>
        </div>
      )}

      {/* Resto continua o mesmo... */}
      <div className={styles.centerPulse}>
        <div className={styles.pulseRing}><div className={styles.pulseCore}><Move size={32} /></div></div>
      </div>

      <div className={styles.bottomContent}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span className={styles.locationBadge}><MapPin size={12} /> Quixadá, Ceará</span>
          <h1 className={styles.title}>Explorar em 360°</h1>
          <p className={styles.subtitle}>Mergulhe em uma jornada virtual de tirar o fôlego por monólitos e montanhas.</p>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.btnPrimary} onClick={onIniciarTour}><Play size={18} fill="currentColor" /> Começar</button>
          <div className={styles.btnRow}>
            <button className={styles.btnSecondary} onClick={() => onMudarTela('mapa')}><MapIcon size={18} /> Mapa</button>
            <button className={styles.btnSecondary} onClick={() => onMudarTela('sobre')}><Info size={18} /> Sobre</button>
          </div>
        </div>
      </div>

      <div className={styles.bottomNav}>
        <button className={`${styles.navItem} ${styles.active}`} onClick={onIniciarTour}><Play size={20} /><span>Começar</span></button>
        <button className={styles.navItem} onClick={() => onMudarTela('mapa')}><MapIcon size={20} /><span>Mapa</span></button>
        <button className={styles.navItem} onClick={() => onMudarTela('sobre')}><Info size={20} /><span>Sobre</span></button>
      </div>
    </div>
  );
}