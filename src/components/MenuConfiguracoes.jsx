// components/MenuConfiguracoes.jsx
import { X, RotateCcw, Volume2, Home, Maximize2, Map as MapIcon } from 'lucide-react';
import styles from './MenuConfiguracoes.module.css';

export default function MenuConfiguracoes({ 
  onFechar,
  giroscopioAtivo, setGiroscopioAtivo,
  somAmbienteAtivo, setSomAmbienteAtivo,
  volume, setVolume,
  onMudarTela,
  telaAtual
}) {
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className={styles.settingsCard}>
      <div className={styles.settingsHeader}>
        <span>Configurações</span>
        <X size={16} color="#a1a1a1" style={{cursor: 'pointer'}} onClick={onFechar} />
      </div>

      <div className={styles.settingsGroup}>
        <div className={styles.settingsRow} onClick={() => setGiroscopioAtivo(!giroscopioAtivo)}>
          <div className={styles.settingsLabel}>
            <RotateCcw size={18} color="#fff" />
            <div className={styles.settingsText}>
              <span className={styles.settingsTitle}>Giroscópio</span>
              <span className={styles.settingsSubtitle}>Controles de movimento</span>
            </div>
          </div>
          <div style={{width: 40, height: 24, background: giroscopioAtivo ? '#fff' : 'rgba(255,255,255,0.2)', borderRadius: 12, position: 'relative', transition: 'all 0.3s'}}>
            <div style={{width: 20, height: 20, background: giroscopioAtivo ? '#000' : '#111', borderRadius: '50%', position: 'absolute', right: giroscopioAtivo ? 2 : 18, top: 2, transition: 'all 0.3s'}}></div>
          </div>
        </div>
      </div>

      <div className={styles.settingsGroup}>
        <div className={styles.settingsRow} onClick={() => setSomAmbienteAtivo(!somAmbienteAtivo)}>
          <div className={styles.settingsLabel}>
            <Volume2 size={18} color="#fff" />
            <div className={styles.settingsText}>
              <span className={styles.settingsTitle}>Som Ambiente</span>
              <span className={styles.settingsSubtitle}>Música de fundo</span>
            </div>
          </div>
          <div style={{width: 40, height: 24, background: somAmbienteAtivo ? '#fff' : 'rgba(255,255,255,0.2)', borderRadius: 12, position: 'relative', transition: 'all 0.3s'}}>
            <div style={{width: 20, height: 20, background: somAmbienteAtivo ? '#000' : '#111', borderRadius: '50%', position: 'absolute', right: somAmbienteAtivo ? 2 : 18, top: 2, transition: 'all 0.3s'}}></div>
          </div>
        </div>
        
        {somAmbienteAtivo && (
          <div style={{ marginTop: '12px' }}>
            <div className={styles.volumeLabels}>
              <span>Volume</span>
              <span>{volume}%</span>
            </div>
            <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className={styles.slider} />
          </div>
        )}
      </div>

      <div className={styles.settingsButtons}>
        <button 
          className={`${styles.btnAction} ${telaAtual === 'menu' ? styles.btnDisabled : ''}`} 
          onClick={() => { if(telaAtual !== 'menu') { onMudarTela('menu'); onFechar(); } }}
          disabled={telaAtual === 'menu'}
        >
          <Home size={16} /> Início
        </button>
        
        <button className={styles.btnAction} onClick={() => { toggleFullScreen(); onFechar(); }}>
          <Maximize2 size={16} /> Tela Cheia
        </button>

        <button 
          className={`${styles.btnAction} ${telaAtual === 'mapa' ? styles.btnDisabled : ''}`} 
          onClick={() => { if(telaAtual !== 'mapa') { onMudarTela('mapa'); onFechar(); } }}
          disabled={telaAtual === 'mapa'}
        >
          <MapIcon size={16} /> Mapa
        </button>
      </div>
    </div>
  );
}