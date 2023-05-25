import styled from 'styled-components';

export const ManagementContainer = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 0 160px 0;

  @media screen and (max-width: 700px) {
    padding: 70px 14px;
  }
`;

export const ManagementCardContainer = styled.div`
  display: flex;
  gap: 32px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
  align-items: center;

  @media screen and (max-width: 700px) {
    text-align: center;
  }
`;

export const CardHeader = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-48);
  line-height: 54px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-32);
    line-height: 54px;
  }
`;

export const CardDetails = styled.div`
  box-shadow: 4px 4px 100px rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 554px;
  height: 100%;
  min-height: 465px;

  @media screen and (max-width: 700px) {
    min-height: auto;
    max-width: 325px;
  }
`;

export const CardImgContainer = styled.div`
  @media screen and (max-width: 700px) {
    img {
      max-width: 325px;
      height: auto;
    }
  }
`;

export const CardDescription = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 400;
  font-size: var(--fs-16);
  line-height: 22px;
  color: #ffffff;
  padding: 37px 21px;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-16);
    line-height: 22px;
    padding: 13px 12px;
  }
`;
