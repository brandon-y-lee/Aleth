export interface CustomButtonProps {
  children?: React.ReactNode;
  background?: GradientEnum | string;
  gradientBorder?: GradientEnum;
  borderRadius?: string;
  textGradient?: GradientEnum;
  color?: string;
  onClick?: () => void;
}

export enum GradientEnum {
  green = 'var(--gradient-green)',
}
