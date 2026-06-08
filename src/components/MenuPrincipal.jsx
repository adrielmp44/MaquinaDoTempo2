import styles from './MenuPrincipal.module.css';

export default function MenuPrincipal({ onMudarTela, onIniciarTour }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Maquina do tempo</h1>
      <p className={styles.subtitle}>Transformações na Paisagens de Quixadá</p>
      
      <div className={styles.buttonContainer}>
        <button onClick={onIniciarTour} className={styles.primaryButton}>
          INICIAR TOUR
        </button>
        <button onClick={() => onMudarTela('mapa')} className={styles.button}>
          MAPA DOS PONTOS
        </button>
        <button onClick={() => onMudarTela('sobre')} className={styles.button}>
          SOBRE O PROJETO
        </button>
      </div>
    </div>
  );
}