import styled from 'styled-components';

export const PlatformAdvantageContainer = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 0 160px 0;
  display: flex;
  flex-direction: column;
  gap: 66px;

  @media screen and (max-width: 700px) {
    padding: 40px 14px;
    align-items: center;
  }
`;

export const Header = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-48);
  line-height: 60px;
  text-align: center;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-32);
    line-height: 42px;
  }
`;

export const AdvantageCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const CardContainer = styled.div`
  background: #182039;
  box-shadow: 4px 4px 100px rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 554px;
  height: 100%;
  min-height: 327px;
  padding: 51px 20px;
  display: flex;
  gap: 24px;
  align-items: center;

  @media screen and (max-width: 700px) {
    min-height: auto;
    padding: 20px 11px;
  }
`;

export const CardImgContainer = styled.div``;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PlatformAdvantageHeader = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-36);
  line-height: 43px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-24);
    line-height: 29px;
  }
`;

export const PlatformAdvantageDescription = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-24);
  line-height: 32px;
  letter-spacing: 0.06em;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-16);
    line-height: 22px;
  }
`;
