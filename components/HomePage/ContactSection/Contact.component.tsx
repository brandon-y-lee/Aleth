import React, { useState } from 'react';
import {
  ButtonContainer,
  ContactButton,
  ContactContainer,
  ContactContent,
  ContactDescription,
} from './Contact.styles';

export default function Contact() {
  // const [isButtonClicked, setIsButtonClicked] = useState(false);

  // const handleButtonClick = () => {
  //   setIsButtonClicked(true);
  // };

  // const buttonStyles = {
  //   boxShadow: isButtonClicked
  //     ? '0px 0px 50px rgba(255, 255, 255, 0.8)'
  //     : 'none',
  // };

  return (
    <>
      <ContactContainer>
        <ContactContent>
          <ContactDescription>
            Seize the future of traceability today with Aleth.
          </ContactDescription>
          <ButtonContainer>
            <ContactButton
            // onClick={handleButtonClick}
            // style={buttonStyles}
            >
              REQUEST AN ACCESSMENT
            </ContactButton>
          </ButtonContainer>
        </ContactContent>
      </ContactContainer>
    </>
  );
}
