import styled from 'styled-components';

export const PassportAdvantageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  gap: 58px;
  padding: 160px 0;

  @media screen and (max-width: 700px) {
    padding: 40px 0;
  }
`;

export const Heading = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-48);
  line-height: 60px;
  text-align: center;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-32);
    line-height: 32px;
  }
`;

export const AdvantageCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #182039;
  box-shadow: 4px 4px 100px rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 554px;
  height: 100%;
  min-height: 648px;

  @media screen and (max-width: 700px) {
    min-height: auto;
    max-width: 327px;
  }
`;

export const CardImgContainer = styled.div`
  @media screen and (max-width: 700px) {
    img {
      max-width: 327px;
      height: auto;
    }
  }
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 21px 24px;
`;

export const PassportAdvHeading = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-36);
  line-height: 43px;
  text-align: center;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-24);
    line-height: 29px;
  }
`;

export const PassportAdvDescription = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-24);
  line-height: 32px;
  text-align: center;
  letter-spacing: 0.06em;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-16);
    line-height: 21px;
  }
`;
