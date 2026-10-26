// TelaInicial: apresenta o projeto e os botões de escolha de modo (RF01).
import { Camera, Globe, Map as MapIcon, Info, CloudRain, Sun } from 'lucide-react';
import { Button, GlassPanel, Logo, Tag } from '../design-system/components/mt-components';
import { caminhoPublico, MODO_CALIBRACAO } from '../lib/util';
import styles from './TelaInicial.module.css';

export default function TelaInicial({ onEscolherModo, onIrPara }) {
  const chuva = `url(${caminhoPublico('capa/capa-chuva.webp')})`;
  const seca = `url(${caminhoPublico('capa/capa-seca.webp')})`;

  return (
    <main className={styles.tela}>
      <div className={styles.capa} aria-hidden="true">
        <div className={styles.camada} style={{ backgroundImage: chuva }} />
        <div className={`${styles.camada} ${styles.camadaSeca}`} style={{ backgroundImage: seca }} />
        <div className={styles.divisoria} />
        <div className={styles.etiquetas}>
          <Tag tone="chuva" icon={<CloudRain />}>Chuva</Tag>
          <Tag tone="seca" icon={<Sun />}>Seca</Tag>
        </div>
      </div>

      <header className={styles.topo}>
        <GlassPanel className={styles.logoPill}>
          <Logo size={32} tagline={false} />
        </GlassPanel>
      </header>

      <GlassPanel as="section" className={styles.folha} aria-labelledby="titulo-inicio">
        <span className={`mt-label ${styles.rotulo}`}>Açude Cedro · Quixadá</span>
        <h1 id="titulo-inicio" className={styles.titulo}>A chuva e a seca</h1>
        <p className={styles.texto}>Veja como a paisagem do açude muda entre os dois períodos do ano.</p>
        <div className={styles.acoes}>
          <Button size="lg" block icon={<Camera />} onClick={() => onEscolherModo('presencial')}>
            Estou no Cedro
          </Button>
          <Button size="lg" variant="secondary" block icon={<Globe />} onClick={() => onEscolherModo('remoto')}>
            Explorar de onde estou
          </Button>
          <div className={styles.linha}>
            <Button variant="ghost" icon={<MapIcon />} onClick={() => onIrPara('mapa')}>Mapa</Button>
            <Button variant="ghost" icon={<Info />} onClick={() => onIrPara('sobre')}>Sobre</Button>
          </div>
        </div>
        {MODO_CALIBRACAO && <span className={`mt-label ${styles.calibrar}`}>Modo de calibração ligado</span>}
      </GlassPanel>
    </main>
  );
}
