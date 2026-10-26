// PainelInformacoes: número do ponto, texto curto e datas das capturas (RF08).
import { useEffect, useRef } from 'react';
import { CloudRain, ExternalLink, Sparkles, Sun, X } from 'lucide-react';
import { GlassPanel, HudFrame, IconButton, Tag } from '../design-system/components/mt-components';
import { formatarData } from '../lib/util';
import styles from './Ponto.module.css';

export default function PainelInformacoes({ ponto, periodo, onFechar }) {
  const fecharRef = useRef(null);
  useEffect(() => { fecharRef.current?.focus(); }, []);
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onFechar();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onFechar]);

  const numero = String(ponto.id).padStart(2, '0');
  const curiosidade = ponto.curiosidades?.[periodo];
  return (
    <div className={styles.scrim} onClick={onFechar}>
      <GlassPanel
        as="section"
        role="dialog"
        aria-modal="true"
        aria-label={`Informações do ${ponto.nome}`}
        className={styles.folha}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.folhaTopo}>
          <span className="mt-label">Sobre este ponto</span>
          <span ref={fecharRef} tabIndex={-1}>
            <IconButton variant="solid" label="Fechar" onClick={onFechar}><X /></IconButton>
          </span>
        </div>
        <HudFrame tone="solid" label={`Ponto ${numero} · ${periodo === 'chuva' ? 'Chuva' : 'Seca'}`} title={ponto.nome}>
          {ponto.descricao}
        </HudFrame>
        {curiosidade && (
          <section className={styles.curiosidadePainel} aria-labelledby="titulo-curiosidade">
            <span className="mt-label" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <Sparkles size={16} aria-hidden="true" /> Você sabia? · {curiosidade.tema}
            </span>
            <h3 id="titulo-curiosidade" className={styles.folhaTitulo}>{curiosidade.titulo}</h3>
            <p>{curiosidade.texto}</p>
            <span className={styles.fonte}>
              Fonte:{' '}
              <a href={curiosidade.fonte.url} target="_blank" rel="noopener noreferrer">
                {curiosidade.fonte.nome} <ExternalLink size={12} aria-hidden="true" />
              </a>
            </span>
          </section>
        )}
        <div className={styles.datas}>
          <Tag tone="chuva" icon={<CloudRain />}>Chuva · {formatarData(ponto.dataChuva)}</Tag>
          <Tag tone="seca" icon={<Sun />}>Seca · {formatarData(ponto.dataSeca)}</Tag>
        </div>
      </GlassPanel>
    </div>
  );
}
