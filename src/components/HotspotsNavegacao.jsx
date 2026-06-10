import { useEffect, useRef } from 'react';
const rotasTour = {
  1: [
    { id: '1_para_2', destino: 2, position: '0 -2 -5' }, // Spot à frente
    { id: '1_para_3', destino: 3, position: '6 -2 0' }  // Spot à direita
  ],
  2: [
    { id: '2_para_1', destino: 1, position: '0 -2 5' }  // Spot para voltar
  ],
  // Você adicionará o resto das 50+ fotos aqui seguindo essa estrutura de position...
};

export default function HotspotsNavegacao({ fotoAtual, onClicarPonto }) {
  const pontos = rotasTour[fotoAtual] || [];
  const containerRef = useRef(null);

  useEffect(() => {
    const elementos = containerRef.current?.querySelectorAll('.clicavel');
    
    const handleCaminhar = (e) => {
      const destino = e.target.getAttribute('data-alvo');
      if (destino) onClicarPonto(Number(destino));
    };

    elementos?.forEach(el => el.addEventListener('click', handleCaminhar));
    return () => elementos?.forEach(el => el.removeEventListener('click', handleCaminhar));
  }, [fotoAtual, onClicarPonto]);

  return (
    <a-entity ref={containerRef}>
      {pontos.map((ponto) => (
        <a-circle
          key={ponto.id}
          radius="1" 
          color="#FFF" 
          material="opacity: 0.3; transparent: true; side: double; shader: flat" 
          position={ponto.position}
          rotation="-90 0 0" 
          class="clicavel"
          data-alvo={ponto.destino}
          
          animation__pulse="property: scale; to: 1.2 1.2 1.2; dir: alternate; dur: 1500; loop: true; easing: easeInOutQuad"
          
          animation__hover="property: material.opacity; to: 0.7; start-events: mouseenter; dur: 200"
          animation__leave="property: material.opacity; to: 0.3; start-events: mouseleave; dur: 200"
        ></a-circle>
      ))}
    </a-entity>
  );
}