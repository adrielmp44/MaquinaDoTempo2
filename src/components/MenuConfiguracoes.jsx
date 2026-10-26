// MenuConfiguracoes: giroscópio, tela cheia e atalhos para Início e Mapa (RF10, RF12).
import { useEffect } from 'react';
import { Home, Map as MapIcon, Maximize2, Minimize2, Rotate3d, Sparkles, X } from 'lucide-react';
import { Button, GlassPanel, IconButton, Switch } from '../design-system/components/mt-components';
import { temTelaCheia } from '../lib/util';
import styles from './Ponto.module.css';

async function ligarGiroscopio(setGiroscopio, ligar) {
  // No iOS, o giroscópio só funciona depois de uma permissão pedida num toque.
  const D = window.DeviceOrientationEvent;
  if (ligar && D && typeof D.requestPermission === 'function') {
    try { await D.requestPermission(); } catch { /* segue com o arrasto */ }
  }
  setGiroscopio(ligar);
}

export default function MenuConfiguracoes({
  giroscopio, setGiroscopio, mostrarCuriosidades, setMostrarCuriosidades, onIrPara, onFechar,
}) {
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onFechar();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onFechar]);

  const emTelaCheia = typeof document !== 'undefined' && !!document.fullscreenElement;
  const alternarTelaCheia = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
    onFechar();
  };

  return (
    <div className={`${styles.scrim} ${styles.scrimTopo}`} onClick={onFechar}>
      <GlassPanel
        as="section"
        role="dialog"
        aria-modal="true"
        aria-label="Configurações"
        className={styles.menu}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.folhaTopo}>
          <h2 className={styles.folhaTitulo}>Configurações</h2>
          <IconButton variant="solid" label="Fechar configurações" onClick={onFechar}><X /></IconButton>
        </div>
        <Switch
          label="Giroscópio"
          icon={<Rotate3d />}
          checked={giroscopio}
          onChange={(v) => ligarGiroscopio(setGiroscopio, v)}
        />
        <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--ink-muted)' }}>
          {giroscopio ? 'A foto acompanha o movimento do celular.' : 'Arraste o dedo na tela para olhar em volta.'}
        </p>
        {setMostrarCuriosidades && (
          <Switch
            label="Curiosidades"
            icon={<Sparkles />}
            checked={mostrarCuriosidades}
            onChange={setMostrarCuriosidades}
          />
        )}
        <hr className={styles.divisor} />
        <div className={styles.botoesMenu}>
          <Button variant="secondary" icon={<Home />} onClick={() => onIrPara('inicio')}>Início</Button>
          <Button variant="secondary" icon={<MapIcon />} onClick={() => onIrPara('mapa')}>Mapa</Button>
          {temTelaCheia() && (
            <Button variant="secondary" icon={emTelaCheia ? <Minimize2 /> : <Maximize2 />} onClick={alternarTelaCheia}>
              {emTelaCheia ? 'Sair da tela cheia' : 'Tela cheia'}
            </Button>
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
