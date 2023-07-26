import React, { useEffect, useState } from 'react';
import VideoBackground from '../VideoBackground/VideoBackground.component';
import videoSrc from '../../../assets/hero-section-bg.mp4';
import {
  Content,
  AboutButton,
  Heading,
  HeroButtonComponent,
  HeroContainer,
  DemoButton,
  ModalContainer,
  ModalWrapper,
  ConnectWithUsForm,
  FormContainer,
  InputFieldContainer,
  InputField,
  TextArea,
  ModalDemoButton,
  ButtonContainer,
} from './Hero.styles';

const Overlay = ({ onClick }) => (
  <div
    style={{
      position: 'fixed',
      overflow: 'hidden',
      inset: '0',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',

      zIndex: '0',
      background: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black background
    }}
    onClick={onClick}
  />
);

export default function Hero() {
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  return (
    <>
      <div>
        <VideoBackground videoSource={videoSrc}>
          <HeroContainer>
            <Heading>
              Introducing ALETHX,<br></br>
              The future of supply chain traceability
            </Heading>
            <Content>
              Building transparent supply chains for a sustainable tomorrow
            </Content>
            <HeroButtonComponent>
              <AboutButton>LEARN ABOUT ALETHX</AboutButton>
              <DemoButton onClick={toggleModal}>BOOK A DEMO</DemoButton>
            </HeroButtonComponent>
            {show && (
              <ModalWrapper>
                <Overlay onClick={toggleModal} />
                <ModalContainer>
                  <ConnectWithUsForm>
                    <FormContainer>
                      <form>
                        <InputFieldContainer>
                          <InputField
                            type="text"
                            placeholder="Name"
                            name="Name"
                            required
                          />
                          <InputField
                            type="email"
                            placeholder="Email Address"
                            name="Email"
                            required
                          />
                          <InputField
                            type="text"
                            placeholder="Phone Number"
                            name="Phone"
                            required
                          />
                          <InputField
                            type="text"
                            placeholder="Company Name"
                            name="Company"
                            required
                          />
                          <InputField
                            type="text"
                            placeholder="Job Title"
                            name="Job"
                            required
                          />
                          <TextArea
                            placeholder="Write your message here"
                            name="Message"
                            required
                          />
                        </InputFieldContainer>
                      </form>
                    </FormContainer>
                    <ButtonContainer>
                      <ModalDemoButton>REQUEST A DEMO</ModalDemoButton>
                    </ButtonContainer>
                  </ConnectWithUsForm>
                </ModalContainer>
              </ModalWrapper>
            )}
          </HeroContainer>
        </VideoBackground>
      </div>
    </>
  );
}
