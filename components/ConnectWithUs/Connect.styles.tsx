import styled from 'styled-components';

export const ConnectWrapper = styled.div`
  padding: 172px 0px 172px 0px;

  @media screen and (max-width: 700px) {
    padding: 82px 14px 52px 14px;
  }
`;

export const ConnectContainer = styled.div`
  display: flex;
  gap: 120px;
  width: 100%;
  max-width: 982px;
  margin: 0 auto;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 0px;
  }
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

export const ConnectAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 61px 0;
  gap: 70px;
`;

export const AddressDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconContainer = styled.div`
  height: 58px;
  width: 58px;
`;

export const IconHeader = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 700;
  font-size: var(--fs-24);
  line-height: 38px;
  text-align: center;
  color: #ffffff;
`;

export const IconDescription = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-20);
  line-height: 30px;
  text-align: center;
  color: #ffffff;
`;

export const EmailDescription = styled.a`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-20);
  line-height: 30px;
  text-align: center;
  color: #ffffff;
`;

export const PhoneDescription = styled.a`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-20);
  line-height: 30px;
  text-align: center;
  color: #ffffff;
`;

export const SocialIconDescription = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 12px;
`;

export const SocialMedia = styled.a`
  &:hover {
    color: var(--electric-green);
    scale: 1.2;
    transition: 0.2s ease-in-out;
  }
`;
