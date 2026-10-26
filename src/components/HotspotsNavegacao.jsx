// HotspotsNavegacao: dois indicadores no chão de cada foto, um para avançar
// e outro para voltar (RF07). As posições ficam em src/data/pontos.js.
// Os dois indicadores têm o mesmo desenho (neutro, sem cor de destaque).
import { useEffect, useRef, useState } from 'react';

const TAMANHO = 512; // resolução da textura (potência de 2 para gerar mipmaps)
let textura = null;

function depositoDeImagens() {
  let el = document.getElementById('mt-fotos');
  if (!el) {
    el = document.createElement('div');
    el.id = 'mt-fotos';
    el.hidden = true;
    document.body.appendChild(el);
  }
  return el;
}

// Desenha o indicador num canvas e devolve o seletor de um <img> com ele.
// Anel branco, miolo escuro translúcido e seta branca. Igual para todos.
function texturaIndicador() {
  if (textura) return textura;
  textura = (async () => {
    const c = document.createElement('canvas');
    c.width = TAMANHO;
    c.height = TAMANHO;
    const g = c.getContext('2d');
    const k = TAMANHO / 256; // desenho pensado em 256 e ampliado
    g.scale(k, k);

    // sombra suave para destacar do chão claro
    g.save();
    g.shadowColor = 'rgba(0, 0, 0, 0.35)';
    g.shadowBlur = 8;
    g.beginPath();
    g.arc(128, 128, 112, 0, Math.PI * 2);
    g.fillStyle = 'rgba(255, 255, 255, 0.95)';
    g.fill();
    g.restore();

    g.beginPath();
    g.arc(128, 128, 92, 0, Math.PI * 2);
    g.fillStyle = 'rgba(26, 23, 20, 0.6)';
    g.fill();

    g.beginPath();
    g.moveTo(86, 148);
    g.lineTo(128, 106);
    g.lineTo(170, 148);
    g.lineWidth = 20;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.strokeStyle = '#FFFFFF';
    g.stroke();

    const img = new Image();
    img.id = 'indicador-navegacao';
    img.src = c.toDataURL('image/png');
    await img.decode().catch(() => {});
    depositoDeImagens().appendChild(img);
    return `#${img.id}`;
  })();
  return textura;
}

function Indicador({ destino, posicao, onClicar }) {
  const alvoRef = useRef(null);
  const imagemRef = useRef(null);
  const [textura, setTextura] = useState(null);

  useEffect(() => {
    let ativo = true;
    texturaIndicador().then((t) => ativo && setTextura(t));
    return () => { ativo = false; };
  }, []);

  useEffect(() => {
    const el = alvoRef.current;
    if (!el) return undefined;
    const aoClicar = () => onClicar?.(destino);
    el.addEventListener('click', aoClicar);
    return () => el.removeEventListener('click', aoClicar);
  }, [destino, onClicar, textura]);

  // As fotos 360 também são transparentes e ficam no centro da cena, então o
  // A-Frame pode desenhá-las por cima do indicador. Para isso nunca acontecer,
  // o indicador é desenhado por último (renderOrder) e sem teste de profundidade.
  useEffect(() => {
    const el = imagemRef.current;
    if (!el) return undefined;
    const porCima = () => {
      const malha = el.getObject3D('mesh');
      if (!malha) return;
      malha.renderOrder = 999;
      malha.material.depthTest = false;
      malha.material.depthWrite = false;
      malha.material.needsUpdate = true;
    };
    porCima();
    el.addEventListener('object3dset', porCima);
    el.addEventListener('materialtextureloaded', porCima);
    return () => {
      el.removeEventListener('object3dset', porCima);
      el.removeEventListener('materialtextureloaded', porCima);
    };
  }, [textura]);

  // Gira o indicador para a seta apontar para longe de quem está no centro.
  const [x, , z] = posicao.split(' ').map(Number);
  const giro = (Math.atan2(-x, -z) * 180) / Math.PI;

  if (!textura) return null;
  return (
    <a-entity position={posicao} rotation={`0 ${giro} 0`}>
      <a-entity rotation="-90 0 0" animation="property: scale; from: 1 1 1; to: 1.08 1.08 1.08; dir: alternate; dur: 1100; loop: true; easing: easeInOutQuad">
        <a-image
          ref={imagemRef}
          src={textura}
          width="1.4"
          height="1.4"
          position="0 0 0.01"
          material="shader: flat; transparent: true; depthTest: false; depthWrite: false; anisotropy: 16; side: double"
        />
      </a-entity>
      {/* área de toque maior que o desenho, invisível */}
      <a-circle
        ref={alvoRef}
        class="clicavel"
        radius="1.1"
        rotation="-90 0 0"
        material="shader: flat; visible: false; side: double"
      />
    </a-entity>
  );
}

export default function HotspotsNavegacao({ vizinhos, onClicarPonto }) {
  return (
    <a-entity>
      {vizinhos.map((v) => (
        <Indicador
          key={`${v.tipo}-${v.destino}-${v.posicao}`}
          destino={v.destino}
          posicao={v.posicao}
          onClicar={onClicarPonto}
        />
      ))}
    </a-entity>
  );
}
