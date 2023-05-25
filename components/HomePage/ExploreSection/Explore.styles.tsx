import styled from 'styled-components';
interface cardProps {
  cardId: Number;
}

export const ExploreContainer = styled.div`
  padding-top: 132px;
  padding-bottom: 132px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  @media screen and (max-width: 700px) {
    padding: 40px 25px 0 25px;
  }
`;

export const ExploreCardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 140px;
  align-items: center;

  @media screen and (max-width: 700px) {
    gap: 40px;
  }
`;

export const CardContainer = styled.div<cardProps>`
  display: flex;
  gap: 57px;
  height: 100%;
  min-height: 420px;
  flex-direction: ${(p) => (p.cardId === 1 ? 'row-reverse' : 'row')};

  @media screen and (max-width: 700px) {
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

export const ImgContainer = styled.div`
  filter: drop-shadow(10px 10px 40px rgba(255, 255, 255, 0.25));

  @media screen and (max-width: 700px) {
    img {
      max-width: 325px;
      height: auto;
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 16px;
`;

export const CardHeading = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-48);
  line-height: 47px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-32);
    line-height: 32px;
  }
`;

export const CardSubHeading = styled.div`
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

export const ButtonContainer = styled.div``;

export const Button = styled.button`
  box-shadow: 0px 1px 2px rgba(105, 81, 255, 0.05);
  background-color: transparent;
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-18);
  line-height: 28px;
  color: #ffffff;
  padding: 14px 28px;
  outline: none;
  border: 2px solid white;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 700px) {
    padding: 14px 12px;
  }
`;
