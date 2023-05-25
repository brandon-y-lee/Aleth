import styled from 'styled-components';

export const BlogContainer = styled.div`
  padding: 100px 150px 141px 150px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 700px) {
    padding: 80px 25px 30px 25px;
  }
`;

export const BlogWrapper = styled.div`
  width: 100%;
  max-width: 1145px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 44px;
  margin: 0 auto;

  @media screen and (max-width: 700px) {
    padding: 0;
  }
`;

export const BlogHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const BlogContent = styled.div``;

export const Heading = styled.div`
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

export const BlogCardSection = styled.div`
  display: flex;
  gap: 33px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardContainer = styled.div`
  background: #182039;
  box-shadow: 4px 4px 60px rgba(255, 255, 255, 0.25);
  width: 100%;
  max-width: 358px;
  display: flex;
  flex-direction: column;
  border-radius: 6px 6px 0 0;

  @media screen and (max-width: 700px) {
    max-width: 285px;
  }
`;

export const ImgContainer = styled.div`
  @media screen and (max-width: 700px) {
    img {
      max-width: 285px;
      height: auto;
    }
  }
`;

export const CardDetails = styled.div`
  padding: 24px 17px 18px 17px;
`;

export const NameandDateContainer = styled.div`
  display: flex;
`;

export const NameDetails = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 300;
  font-size: var(--fs-16);
  line-height: 24px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-12);
  }
`;

export const DateDetails = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 300;
  font-size: var(--fs-16);
  line-height: 24px;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-12);
  }
`;

export const DescriptionContainer = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-24);
  line-height: 32px;
  color: #ffffff;
  margin-top: 8px;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-16);
    line-height: 25px;
  }
`;

export const Tagcontainer = styled.div`
  background: rgba(0, 255, 133, 0.5);
  box-shadow: 0px 1px 2px rgba(105, 81, 255, 0.05);
  border-radius: 36px;
  text-align: center;
  margin-top: 16px;
  width: 105px;
  padding: 4px 12px;
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-12);
  line-height: 18px;
  text-align: center;
  color: #ffffff;
`;

export const ButtonSection = styled.div`
  width: 100%;
  max-width: 1145px;
  margin: 0 auto;
  text-align: center;
`;

export const MoreButton = styled.button`
  background: transparent;
  box-shadow: 0px 1px 2px rgba(105, 81, 255, 0.05);
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #ffffff;
  padding: 14px 28px;
  cursor: pointer;
  outline: none;
  border: 2px solid white;

  &:hover {
    box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.5);
  }
`;
