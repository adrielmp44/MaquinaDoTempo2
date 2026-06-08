import styles from './Sobre.module.css';

export default function Sobre({ onVoltar }) {
  return (
    <div className={styles.container}>
      <p className={styles.label}>Desenvolvido por</p>
      <h2 className={styles.username}>@adriel.3d</h2>
      <button onClick={onVoltar} className={styles.backButton}>VOLTAR</button>
    </div>
  );
}