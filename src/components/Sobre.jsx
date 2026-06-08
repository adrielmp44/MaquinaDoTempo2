import { ArrowLeft } from 'lucide-react';
import styles from './Sobre.module.css';

export default function Sobre({ onVoltar }) {
  const caminhoFundo = `${import.meta.env.BASE_URL}fotos360/foto1.webp`;

  return (
    <div className={styles.wrapper}>
      <img src={caminhoFundo} alt="" className={styles.bgImage} />

      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onVoltar} className={styles.iconButton}>
            <ArrowLeft size={22} />
          </button>
          <div style={{width: 44}}></div>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>Desenvolvido por</p>
          <h2 className={styles.username}>@adriel.3d</h2>
        </div>
      </div>
    </div>
  );
}