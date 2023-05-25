import styled from 'styled-components';
interface cardProps {
  cardId: Number;
}

export const SolutionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SolutionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 98px 144px 76px 144px;
  margin-top: -6px;

  @media screen and (max-width: 700px) {
    padding: 50px 25px 30px 25px;
  }
`;

export const SolutionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
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
    font-size: var(--fs-30);
    line-height: 32px;
  }
`;

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 107px;
  margin: 0 auto;

  @media screen and (max-width: 700px) {
    gap: 50px;
  }
`;

export const CardContainer = styled.div<cardProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 96px;
  flex-direction: ${(p) => (p.cardId === 1 ? 'row-reverse' : 'row')};

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export const ImageContainer = styled.div`
  @media screen and (max-width: 700px) {
    margin-bottom: -129px;

    img {
      max-width: 114px;
      height: auto;
      position: relative;
      z-index: 9999;
    }
  }
`;

export const SolutionDetails = styled.div`
  background: #182039;
  box-shadow: 4px 4px 100px rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 556px;
  padding: 55px 118px 60px 55px;
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media screen and (max-width: 700px) {
    padding: 37px 17px 35px 17px;
    position: static;
    overflow: visible;
    gap: 15px;
  }
`;

export const SolutionTitle = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-36);
  line-height: 30px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-24);
    text-align: center;
  }
`;

export const SolutionDescription = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-24);
  line-height: 32px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-16);
    line-height: 23px;
    text-align: center;
  }
`;
