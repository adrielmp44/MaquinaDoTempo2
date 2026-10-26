// Mapa: exibe os pontos e abre o ponto escolhido no modo atual (RF02).
import { useState } from 'react';
import { ArrowLeft, Camera, Globe } from 'lucide-react';
import { Button, IconButton, PointMarker, Tag } from '../design-system/components/mt-components';
import { PONTOS, TOTAL_PONTOS } from '../data/pontos';
import { caminhoPublico, MODO_CALIBRACAO } from '../lib/util';
import styles from './Telas.module.css';

export default function Mapa({ modo, pontoAtual, voltarAoPonto, onSelecionarPonto, onVoltar }) {
  const [marca, setMarca] = useState(null);

  // Calibração: toque no mapa mostra a posição em porcentagem para o pontos.js
  function calibrar(e) {
    if (!MODO_CALIBRACAO || e.target.tagName === 'BUTTON') return;
    const r = e.currentTarget.getBoundingClientRect();
    const top = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
    const left = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
    setMarca({ top: `${top}%`, left: `${left}%` });
  }

  return (
    <main className={styles.tela}>
      <div className={styles.conteudo}>
        <div className={styles.cabecalho}>
          <IconButton variant="solid" label={voltarAoPonto ? `Voltar ao ponto ${pontoAtual}` : 'Voltar ao início'} onClick={onVoltar}><ArrowLeft /></IconButton>
          <h1 className={styles.tituloTela}>Mapa</h1>
          {modo === 'presencial'
            ? <Tag tone="seca" icon={<Camera />}>Com câmera</Tag>
            : <Tag tone="chuva" icon={<Globe />}>À distância</Tag>}
        </div>

        <p className={styles.textoMenor}>
          Toque em um dos {TOTAL_PONTOS} pontos para ver como o lugar fica na chuva e na seca.
        </p>

        <div className={styles.mapaQuadro} onClick={calibrar}>
          <img className={styles.mapaImagem} src={caminhoPublico('mapa/imagemdomapa.png')} alt="Mapa da área de visitação do Açude Cedro" />
          {PONTOS.map((p) => (
            <PointMarker
              key={p.id}
              number={p.id}
              active={p.id === pontoAtual}
              className={styles.marcador}
              style={{ top: p.posicaoMapa.top, left: p.posicaoMapa.left }}
              onClick={() => onSelecionarPonto(p.id)}
            />
          ))}
          {marca && <span className={styles.marcaCalibrar} style={marca} />}
        </div>

        {MODO_CALIBRACAO && (
          <div className={styles.calibracao}>
            {marca ? `posicaoMapa: { top: '${marca.top}', left: '${marca.left}' }` : 'Calibração: toque no mapa para ver a posição.'}
          </div>
        )}

        {voltarAoPonto && (
          <Button variant="secondary" block icon={<ArrowLeft />} onClick={onVoltar}>
            Voltar ao ponto {pontoAtual}
          </Button>
        )}

        <p className={styles.legenda}>Fotografias feitas com câmera 360° em maio (chuva) e outubro (seca) de 2026.</p>
      </div>
    </main>
  );
}
