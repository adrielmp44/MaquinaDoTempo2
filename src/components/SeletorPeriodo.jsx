// SeletorPeriodo: alterna entre chuva e seca sem sair do ponto (RF05).
// O período inicial pelo mês é definido em App.jsx (periodoInicial).
import { SeasonToggle } from '../design-system/components/mt-components';

export default function SeletorPeriodo({ periodo, onMudar }) {
  return <SeasonToggle value={periodo} onChange={onMudar} ariaLabel="Período da fotografia" />;
}
