import styled from 'styled-components';

export const VideoBackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 698px;
  /* overflow: hidden; */
`;

export const StyledVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 36%;
  /* width: auto;
  height: auto; */
  transform: translate(-50%, -50%);

  @media screen and (max-width: 1024px) {
    object-position: 46%;
  }
`;

export const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(14, 19, 48, 0.6),
    rgba(14, 19, 48, 0.6)
  );
`;
