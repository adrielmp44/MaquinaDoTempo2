import styles from './Mapa.module.css';

export default function Mapa({ totalFotos, onSelecionarPonto, onVoltar }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Selecione um Ponto do Mapa</h2>
      
      <div className={styles.grid}>
        {Array.from({ length: totalFotos }, (_, i) => i + 1).map((num) => (
          <button key={num} onClick={() => onSelecionarPonto(num)} className={styles.pointButton}>
            📍 Ponto {num}
          </button>
        ))}
      </div>
      
      <button onClick={onVoltar} className={styles.backButton}>VOLTAR</button>
    </div>
  );
}