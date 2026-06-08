import { ArrowLeft, MapPin } from 'lucide-react';
import styles from './Mapa.module.css';

export default function Mapa({ totalFotos, onSelecionarPonto, onVoltar }) {
  // Mantemos o fundo borrado para consistência da UI
  const caminhoFundo = `${import.meta.env.BASE_URL}fotos360/foto1.webp`;

  return (
    <div className={styles.wrapper}>
      <img src={caminhoFundo} alt="" className={styles.bgImage} />

      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onVoltar} className={styles.iconButton}>
            <ArrowLeft size={22} />
          </button>
          <h2 className={styles.title}>Mapa dos Pontos</h2>
          <div style={{width: 44}}></div> {/* Espaçador fantasma para centralizar o título */}
        </div>
        
        <div className={styles.grid}>
          {Array.from({ length: totalFotos }, (_, i) => i + 1).map((num) => (
            <button key={num} onClick={() => onSelecionarPonto(num)} className={styles.pointButton}>
              <MapPin size={24} color="#a1a1a1" />
              <span>Ponto {num}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}