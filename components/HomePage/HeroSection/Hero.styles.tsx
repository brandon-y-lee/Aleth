import styled from 'styled-components';

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1025px;
  margin: 0 auto;
  padding-top: 350px;
  position: relative;

  @media screen and (max-width: 700px) {
    padding: 285px 25px 25px 25px;
  }
`;

export const Heading = styled.div`
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

export const Content = styled.div`
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

export const HeroButtonComponent = styled.div`
  display: flex;
  gap: 25px;
  padding-top: 27px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export const AboutButton = styled.button`
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(105, 81, 255, 0.05);
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 700;
  font-size: var(--fs-20);
  line-height: 28px;
  padding: 14px 28px;
  cursor: pointer;
  outline: none;
  border: none;

  &:hover {
    box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.5);
  }
`;

export const DemoButton = styled.button`
  background-color: transparent;
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 700;
  font-size: var(--fs-20);
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

export const ModalWrapper = styled.div`
  background-color: black;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  .modal-open {
    overflow: hidden;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ConnectWithUsForm = styled.div`
  background: #182039;
  box-shadow: 4px 4px 60px rgba(255, 255, 255, 0.25);
  padding: 61px 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 700px) {
    padding: 34px 14px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 53px;
`;

export const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 9px 23px;
  background: rgba(71, 87, 137, 0.5);
  outline: none;
  border: none;
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 300;
  font-size: var(--fs-16);
  line-height: 30px;
  color: #b5b4b4;

  &:hover {
    border-bottom: 3px solid #3cfb43;
  }

  &::placeholder {
    color: #b5b4b4;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 9px 23px;
  background: rgba(71, 87, 137, 0.5);
  outline: none;
  border: none;
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 300;
  font-size: var(--fs-16);
  line-height: 30px;
  color: #b5b4b4;
  resize: none;

  &:hover {
    border-bottom: 3px solid #3cfb43;
  }

  &::placeholder {
    color: #b5b4b4;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 5px;
  text-align: center;
`;

export const ModalDemoButton = styled.button`
  background-color: transparent;
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 700;
  font-size: var(--fs-20);
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
