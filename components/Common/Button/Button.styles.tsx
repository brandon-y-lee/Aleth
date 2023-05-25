import styled from 'styled-components';
import { CustomButtonProps } from './Button.types';

export const StyledButton = styled.button<CustomButtonProps>`
  position: relative;
  background-color: ${({ background }) => background || 'transparent'};
  color: ${({ textGradient, color }) =>
    textGradient ? 'transparent' : color ?? '#000'};
  border: none;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  span {
    position: absolute;
    inset: 0;
    bottom: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    ${({ textGradient }) =>
      textGradient &&
      `
    background-image: ${textGradient};
    background-clip: text;
    -webkit-background-clip: text;
  `}
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    z-index: -1;
    border-radius: ${({ borderRadius }) => borderRadius || '4px'};
    background: ${({ gradientBorder }) =>
      gradientBorder ? gradientBorder : 'none'};
  }
`;
