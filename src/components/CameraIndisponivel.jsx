// Câmera indisponível: a permissão foi negada ou o aparelho não tem câmera.
// A aplicação segue no modo remoto, que não usa a câmera (fluxograma, Figura 9).
import { CameraOff, Globe, RotateCcw } from 'lucide-react';
import { Button } from '../design-system/components/mt-components';
import styles from './Telas.module.css';

export default function CameraIndisponivel({ onModoRemoto, onTentarDeNovo }) {
  return (
    <main className={styles.tela}>
      <div className={styles.conteudo}>
        <div className={styles.centro} role="alert">
          <div className={`${styles.icone} ${styles.iconeErro}`} aria-hidden="true"><CameraOff /></div>
          <h1 className={styles.tituloTela}>Não foi possível usar a câmera</h1>
          <p className={styles.texto}>Você ainda pode ver os dois períodos de cada ponto no modo remoto, girando a foto com o dedo.</p>
          <p className={styles.legenda}>Se você negou o acesso sem querer, libere a câmera nas configurações do navegador e tente de novo.</p>
        </div>
        <div className={styles.acoes}>
          <Button size="lg" block icon={<Globe />} onClick={onModoRemoto}>Explorar no modo remoto</Button>
          <Button variant="ghost" block icon={<RotateCcw />} onClick={onTentarDeNovo}>Tentar de novo</Button>
        </div>
      </div>
    </main>
  );
}
