import styled from 'styled-components';

export const ContactContainer = styled.div`
  margin: 169px auto 215px auto;

  @media screen and (max-width: 700px) {
    padding: 15px 25px;
    margin: 80px auto;
  }
`;

export const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1145px;
  background: #182039;
  box-shadow: 4px 4px 100px rgba(1, 255, 133, 0.2),
    inset 0px 2px 50px rgba(255, 255, 255, 0.1);
  gap: 54px;
  margin: 0 auto;
  padding: 58px 148px;

  @media screen and (max-width: 700px) {
    padding: 25px;
  }
`;

export const ContactDescription = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-48);
  line-height: 60px;
  text-align: center;
  color: #ffffff;

  @media screen and (max-width: 700px) {
    font-size: var(--fs-32);
    line-height: 36px;
  }
`;

export const ButtonContainer = styled.div``;

export const ContactButton = styled.button`
  background: transparent;
  box-shadow: 0px 1px 2px rgba(105, 81, 255, 0.05);
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-18);
  line-height: 28px;
  color: #ffffff;
  padding: 14px 28px;
  cursor: pointer;
  outline: none;
  border: 2px solid white;

  &:hover {
    box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 700px) {
    padding: 10px 9px;
  }
`;
