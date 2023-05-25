import styled from 'styled-components';
import { TypographyEnum } from '../../styles/GlobalTheme';

export const BottomSheetWrapper = styled.div`
  position: fixed;
  inset: 0;
  height: 100vh;
  overflow: auto;
  width: 100vw;
  z-index: 1000;
`;

export const InternalBSWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const BottomSheetContent = styled.div<{
  fullScreen?: boolean;
  background?: string;
}>`
  position: absolute;
  z-index: 1002;
  bottom: 0;
  ${({ fullScreen }) => (fullScreen ? 'inset: 0;' : '')}
  /* background: #ffffff; */
  background-image: url('/assets/nav-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: space-between;
  padding-top: 27px;
  padding-right: 22px;
  padding: 27px 22px;
  flex-direction: row-reverse;
`;

export const Heading = styled.div<{ font: TypographyEnum }>`
  font-family: ${({ font }) => font};
  font-size: var(--fs-24);
  font-weight: 700;
`;

export const Backdrop = styled.div`
  /* height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4); */
`;
