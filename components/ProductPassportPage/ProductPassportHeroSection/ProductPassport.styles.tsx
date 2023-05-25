import styled from 'styled-components';

export const ProductPassportContainer = styled.div`
  padding-top: 127px;
  padding-left: 150px;

  @media screen and (max-width: 700px) {
    padding: 66px 14px 0 14px;
  }
`;

export const ProductPassportCard = styled.div``;

export const CardContainer = styled.div`
  display: flex;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CardDetails = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 31px;

  @media screen and (max-width: 700px) {
    align-items: center;
  }
`;

export const HeadingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: 700px) {
    align-items: center;
    text-align: center;
  }
`;

export const ImageContainer = styled.div`
  img {
    @media screen and (max-width: 700px) {
      width: 251px;
      height: 161px;
      margin-left: -42px;
    }
  }
`;

export const PaasportHeading = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-48);
  line-height: 60px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-32);
    line-height: 36px;
  }
`;

export const PassportDescription = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-32);
  line-height: 40px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-16);
    line-height: 24px;
  }
`;

export const ButtonContainer = styled.div`
  width: 220px;
`;

export const PassportButton = styled.div`
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(105, 81, 255, 0.05);
  padding: 14px 20px;
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 700;
  font-size: var(--fs-20);
  line-height: 28px;
  color: #000000;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.5);
  }
`;
