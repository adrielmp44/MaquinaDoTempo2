import { ArrowLeft, ExternalLink } from 'lucide-react';
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
          <p className={styles.label}>Desenvolvedor e Artista Técnico</p>
          <h2 className={styles.username}>@adriel.3d</h2>
          
          <p className={styles.description}>
            Trabalho de Conclusão de Curso em Design Digital<br/>
            Universidade Federal do Ceará (UFC) - Campus Quixadá
          </p>

          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSeLPbu9HbHHHKpuEGlKmKNkmlSnIB6grvz2pKd-c_apcfdQmQ/viewform?usp=publish-editor" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.formButton}
          >
            Avaliar Projeto <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}