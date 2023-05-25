// components/VideoBackground.tsx
import React from 'react';
import {
  Content,
  StyledVideo,
  VideoBackgroundContainer,
} from './VideoBackground.styles';
import { VideoBackgroundProps } from './VideoBackground.types';

export default function VideoBackground({
  videoSource,
  children,
}: VideoBackgroundProps) {
  return (
    <VideoBackgroundContainer>
      <StyledVideo autoPlay loop muted playsInline>
        <source src={videoSource} type="video/mp4" />
      </StyledVideo>
      <Content>{children}</Content>
    </VideoBackgroundContainer>
  );
}
