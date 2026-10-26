import type { ReactNode, ButtonHTMLAttributes, HTMLAttributes, ElementType } from 'react';

export type Season = 'chuva' | 'seca';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ênfase. Padrão: 'primary' (uma por tela). */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** 'lg' = 56 px (tela inicial); 'md' = 48 px. */
  size?: 'md' | 'lg';
  /** Ícone antes do texto (ex.: <Camera />). */
  icon?: ReactNode;
  /** Ícone depois do texto. */
  iconEnd?: ReactNode;
  /** Ocupa a largura toda. */
  block?: boolean;
  children?: ReactNode;
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Obrigatório: vira aria-label e dica. */
  label: string;
  /** 'glass' sobre a foto (padrão), 'solid' sobre o fundo, 'accent' ação principal. */
  variant?: 'glass' | 'solid' | 'accent';
  /** O ícone. */
  children: ReactNode;
}

export interface SeasonToggleProps {
  /** Período selecionado (modo controlado). */
  value?: Season;
  /** Período inicial (modo não controlado). Padrão: 'chuva'. */
  defaultValue?: Season;
  onChange?: (value: Season) => void;
  /** Troca os textos. Padrão: { chuva: 'Chuva', seca: 'Seca' }. */
  labels?: Partial<Record<Season, string>>;
  /** Nome do grupo para leitor de tela. Padrão: 'Período'. */
  ariaLabel?: string;
  className?: string;
}

export interface OpacitySliderProps {
  /** 0 a 100 (modo controlado). */
  value?: number;
  /** Padrão: 70. */
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Padrão: 'Transparência'. */
  label?: string;
  id?: string;
  className?: string;
}

export interface SwitchProps {
  label: string;
  icon?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  className?: string;
}

export interface TagProps {
  tone?: 'outline' | 'glass' | 'chuva' | 'seca' | 'inverse';
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export interface HudFrameProps {
  /** Etiqueta em mono e caixa alta (ex.: 'Ponto 3 · Seca'). */
  label?: string;
  /** Título em Unbounded; também nomeia a seção para leitor de tela. */
  title?: string;
  icon?: ReactNode;
  tone?: 'glass' | 'solid' | 'inverse';
  children?: ReactNode;
  className?: string;
}

export interface GlassPanelProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: ReactNode;
}

export interface PointMarkerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 1 a 9. */
  number: number;
  /** Nome lido pelo leitor de tela. Padrão: 'Ponto N'. */
  label?: string;
  /** Ponto atual. */
  active?: boolean;
}

export interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'mark';
  /** Altura do símbolo em px. Padrão: 40. */
  size?: number;
  /** Texto de apoio; false esconde. Padrão: 'Açude Cedro · chuva e seca'. */
  tagline?: string | false;
  /** Símbolo numa cor só (currentColor). */
  mono?: boolean;
  className?: string;
}

export declare function Button(props: ButtonProps): JSX.Element;
export declare function IconButton(props: IconButtonProps): JSX.Element;
export declare function SeasonToggle(props: SeasonToggleProps): JSX.Element;
export declare function OpacitySlider(props: OpacitySliderProps): JSX.Element;
export declare function Switch(props: SwitchProps): JSX.Element;
export declare function Tag(props: TagProps): JSX.Element;
export declare function HudFrame(props: HudFrameProps): JSX.Element;
export declare function GlassPanel(props: GlassPanelProps): JSX.Element;
export declare function PointMarker(props: PointMarkerProps): JSX.Element;
export declare function Logo(props: LogoProps): JSX.Element;
