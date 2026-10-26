// Sobre: créditos do projeto e link para o formulário de avaliação.
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button, IconButton, Logo } from '../design-system/components/mt-components';
import styles from './Telas.module.css';

const FORMULARIO = 'https://docs.google.com/forms/d/e/1FAIpQLSfpzKd42Pg9V_GgURHFcrDZ9G-GCQdbIT7DEu9FUFf9JSubkQ/viewform';

export default function Sobre({ onVoltar }) {
  return (
    <main className={styles.tela}>
      <div className={styles.conteudo}>
        <div className={styles.cabecalho}>
          <IconButton variant="solid" label="Voltar ao início" onClick={onVoltar}><ArrowLeft /></IconButton>
          <h1 className={styles.tituloTela}>Sobre</h1>
        </div>

        <Logo variant="stacked" size={72} />

        <section className={styles.cartao}>
          <h2>O projeto</h2>
          <p className={styles.textoMenor}>
            A Máquina do Tempo mostra a paisagem do Açude Cedro, em Quixadá (CE), nos períodos chuvoso e seco.
            No local, a foto do outro período aparece sobre a imagem da câmera. De longe, dá para girar as fotos com o dedo.
          </p>
          <p className={styles.legenda}>
            Fotografias em 360° feitas com uma Ricoh Theta Z1 em maio e outubro de 2026, sempre na mesma posição.
          </p>
        </section>

        <section className={styles.cartao}>
          <h2>Autoria</h2>
          <p className={styles.textoMenor}>
            Trabalho de Conclusão de Curso de Adriel (@adriel.3d), Design Digital, Universidade Federal do Ceará, Campus Quixadá.
          </p>
          <p className={styles.legenda}>Orientação: Prof. Dr. João Vilnei de Oliveira Filho.</p>
        </section>

        <div className={styles.acoes}>
          <Button size="lg" block iconEnd={<ExternalLink />} onClick={() => window.open(FORMULARIO, '_blank', 'noopener')}>
            Avaliar o projeto
          </Button>
        </div>
      </div>
    </main>
  );
}
