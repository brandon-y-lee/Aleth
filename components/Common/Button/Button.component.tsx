import React from 'react';
import { CustomButtonProps } from './Button.types';
import { StyledButton } from './Button.styles';

export default function Button({
  children,
  background,
  gradientBorder,
  borderRadius,
  textGradient,
  color,
  onClick,
  ...props
}: CustomButtonProps) {
  return (
    <StyledButton
      background={background}
      gradientBorder={gradientBorder}
      borderRadius={borderRadius}
      textGradient={textGradient}
      onClick={onClick}
      color={color}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
