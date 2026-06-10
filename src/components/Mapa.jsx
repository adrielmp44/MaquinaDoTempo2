import { ArrowLeft } from 'lucide-react';
import styles from './Mapa.module.css';

// Coordenadas aproximadas baseadas no seu desenho (em porcentagem)
// Para adicionar mais fotos depois, basta criar uma nova linha seguindo a ordem
const coordenadasMapa = [
  { id: 9, top: '4%', left: '69%' },
  { id: 8, top: '10%', left: '68%' },
  { id: 7, top: '13%', left: '60%' },
  { id: 6, top: '16%', left: '55%' },
  { id: 5, top: '25%', left: '55%' },
  { id: 4, top: '33%', left: '57%' },
  { id: 3, top: '40%', left: '61%' },
  { id: 2, top: '41%', left: '67%' },
  { id: 1, top: '41.5%', left: '77%' },
];

export default function Mapa({ totalFotos, onSelecionarPonto, onVoltar }) {
  // Mantemos o fundo borrado escuro para a UI em volta
  const caminhoFundo = `${import.meta.env.BASE_URL}fotos360/foto1.webp`;
  // Caminho da nova imagem do mapa
  const caminhoMapa = `${import.meta.env.BASE_URL}mapa/imagemdomapa.png`;

  return (
    <div className={styles.wrapper}>
      <img src={caminhoFundo} alt="" className={styles.bgImage} />

      <div className={styles.container} style={{ overflowY: 'auto', paddingBottom: '2rem' }}>
        <div className={styles.header}>
          <button onClick={onVoltar} className={styles.iconButton}>
            <ArrowLeft size={22} />
          </button>
          <h2 className={styles.title}>Mapa</h2>
          <div style={{width: 44}}></div> {/* Espaçador para centralizar o título */}
        </div>
        
        {/* Container Relativo do Mapa */}
        <div style={{
          position: 'relative', 
          width: '100%', 
          maxWidth: '900px', 
          margin: '0 auto',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          backgroundColor: '#e8f0e0' // Fundo de fallback
        }}>
          
          {/* Imagem Base do Mapa */}
          <img 
            src={caminhoMapa} 
            alt="Mapa Interativo" 
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} 
          />

          {/* Renderização dos Pontos Clicáveis */}
          {coordenadasMapa.map((ponto) => (
            <button
              key={ponto.id}
              onClick={() => onSelecionarPonto(ponto.id)}
              style={{
                position: 'absolute',
                top: ponto.top,
                left: ponto.left,
                transform: 'translate(-50%, -50%)', // Faz o centro do botão ficar exatamente na coordenada
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#dc2626', // Vermelho para destacar como no seu desenho
                color: '#fff',
                border: '2px solid #fff',
                fontWeight: 'bold',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                transition: 'transform 0.2s ease',
                zIndex: 10
              }}
              // Efeito de hover diretamente no estilo (cresce levemente ao passar o mouse)
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.15)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
              title={`Ir para o ponto ${ponto.id}`}
            >
              {ponto.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}