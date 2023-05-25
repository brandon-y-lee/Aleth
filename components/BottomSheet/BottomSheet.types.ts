import { ReactNode } from 'react';
import { TypographyEnum } from '../../styles/GlobalTheme';

export interface BottomSheetTypes {
  heading?: string;
  show: boolean;
  onClose: () => void;
  onBackdropClick?: () => void;
  fullScreen?: boolean;
  background?: string;
  font?: TypographyEnum;
  children: ReactNode;
}
