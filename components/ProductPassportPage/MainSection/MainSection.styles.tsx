import styled from 'styled-components';
interface cardProps {
  cardId: Number;
}

export const MainContainer = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
`;

export const MainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 160px;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 700px) {
    gap: 20px;
    padding: 0 14px;
  }
`;

export const CardContainer = styled.div<cardProps>`
  display: flex;
  align-items: center;
  gap: 40px;
  flex-direction: ${(p) => (p.cardId === 1 ? 'row-reverse' : 'row')};

  @media screen and (max-width: 700px) {
    flex-direction: column-reverse;
  }
`;

export const CardImageContainer = styled.div`
  box-shadow: inset 10px 10px 8px rgba(255, 255, 255, 0.25);
  filter: drop-shadow(10px 10px 40px rgba(255, 255, 255, 0.25));

  @media screen and (max-width: 700px) {
    img {
      max-width: 325px;
      height: auto;
    }
  }
`;

export const MainCardDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;

  @media screen and (max-width: 700px) {
    gap: 6px;
    text-align: center;
  }
`;

export const MainHeading = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-48);
  line-height: 60px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-32);
    line-height: 32px;
  }
`;

export const MainDescription = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-16);
  line-height: 22px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-12);
    line-height: 14px;
  }
`;
