import React from 'react';
import {
  AddressDetails,
  ButtonContainer,
  ConnectAddressContainer,
  ConnectContainer,
  ConnectWithUsForm,
  ConnectWrapper,
  DemoButton,
  EmailDescription,
  FormContainer,
  Heading,
  IconContainer,
  IconDescription,
  IconHeader,
  InputField,
  InputFieldContainer,
  PhoneDescription,
  SocialIconDescription,
  SocialMedia,
  TextArea,
} from './Connect.styles';
import {
  EmailIcon,
  PhoneIcon,
  SocialIcon,
  WhiteFb,
  WhiteInstagram,
  WhiteLinkedin,
  WhiteTwitter,
} from '../../Icons';
import Link from 'next/link';

export default function Connect() {
  return (
    <ConnectWrapper>
      <ConnectContainer>
        <ConnectWithUsForm>
          <FormContainer>
            <Heading>Connect with us</Heading>
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
                  placeholder="Write your message"
                  name="Message"
                  required
                />
              </InputFieldContainer>
            </form>
          </FormContainer>
          <ButtonContainer>
            <DemoButton>BOOK A DEMO</DemoButton>
          </ButtonContainer>
        </ConnectWithUsForm>
        <ConnectAddressContainer>
          <AddressDetails>
            <IconContainer>
              <EmailIcon height={58} width={58} />
            </IconContainer>
            <IconHeader>Email</IconHeader>
            <EmailDescription href="mailto:chesterzelaya@alethx.com">
              chesterzelaya@alethx.com
            </EmailDescription>
            <EmailDescription href="mailto:brandon@alethx.com">
              brandon@alethx.com
            </EmailDescription>
          </AddressDetails>
          <AddressDetails>
            <IconContainer>
              <PhoneIcon height={58} width={58} />
            </IconContainer>
            <IconHeader>Phone</IconHeader>
            <PhoneDescription href="tel:+7-843-672-431">
              +7-843-672-431
            </PhoneDescription>
          </AddressDetails>
          <AddressDetails>
            <IconContainer>
              <SocialIcon height={58} width={58} />
            </IconContainer>
            <IconHeader>Social</IconHeader>
            <SocialIconDescription>
              <SocialMedia
                href="https://m.facebook.com/profile.php?id=100092316057070"
                target="_blank"
              >
                <WhiteFb height={24} width={24} />
              </SocialMedia>
              <SocialMedia href="https://twitter.com/Aleth_Inc" target="_blank">
                <WhiteTwitter height={24} width={24} />
              </SocialMedia>
              <SocialMedia
                href="https://www.instagram.com/aleth_inc/"
                target="_blank"
              >
                <WhiteInstagram height={24} width={24} />
              </SocialMedia>
              <SocialMedia
                href="https://www.linkedin.com/company/aleth-inc/"
                target="_blank"
              >
                <WhiteLinkedin height={24} width={24} />
              </SocialMedia>
            </SocialIconDescription>
          </AddressDetails>
        </ConnectAddressContainer>
      </ConnectContainer>
    </ConnectWrapper>
  );
}
