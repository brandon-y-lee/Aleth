import React from 'react';
import {
  FooterContainer,
  FooterContent,
  LogoContainer,
  NavLink,
  NavLinksContainer,
  SMLink,
  SMLinkList,
  SectionDetails,
  SocialMediaSection,
} from './Footer.styles';
import { FooterLogo } from '../../../Icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { SelectedNavLinkEnum } from '../../../types/state/footerType';
import SocialIcon from '../SocialIcon/SocialIcon.component';
import { SocialMediaType } from '../SocialIcon/SocialIcon.types';
import { RoutesEnum } from '../../../types/Global.types';

export default function Footer() {
  const footerInfo = useSelector((state: RootState) => state.footerInfo);
  return (
    <>
      <FooterContainer>
        <FooterContent>
          <LogoContainer>
            <FooterLogo height={41} width={180} />
          </LogoContainer>
          <NavLinksContainer>
            <NavLink
              href={RoutesEnum.HOME}
              selected={footerInfo.selectedNavLink === SelectedNavLinkEnum.Home}
            >
              Home
            </NavLink>
            <NavLink
              href=""
              selected={
                footerInfo.selectedNavLink === SelectedNavLinkEnum.Features
              }
            >
              Features
            </NavLink>
            <NavLink
              href={RoutesEnum.PRODUCT_PASSPORT}
              selected={
                footerInfo.selectedNavLink ===
                SelectedNavLinkEnum.ProductPassport
              }
            >
              Product Passport
            </NavLink>
            <NavLink
              href={RoutesEnum.ALETH_PLATFORM}
              selected={
                footerInfo.selectedNavLink === SelectedNavLinkEnum.AlethPlatform
              }
            >
              ALETH Platform
            </NavLink>
            <NavLink
              href=""
              selected={footerInfo.selectedNavLink === SelectedNavLinkEnum.Blog}
            >
              Blog
            </NavLink>
            <NavLink
              href={RoutesEnum.CONTACT_US}
              selected={
                footerInfo.selectedNavLink === SelectedNavLinkEnum.ContactUs
              }
            >
              Contact Us
            </NavLink>
          </NavLinksContainer>
        </FooterContent>
        <SocialMediaSection>
          <SectionDetails>© All rights reserved.</SectionDetails>
          <SMLinkList>
            <SMLink>
              <SocialIcon
                link="https://m.facebook.com/profile.php?id=100092316057070"
                type={SocialMediaType.FACEBOOK}
              />
            </SMLink>
            <SMLink>
              <SocialIcon
                link="https://twitter.com/Aleth_Inc"
                type={SocialMediaType.TWITTER}
              />
            </SMLink>
            <SMLink>
              <SocialIcon
                link="https://www.instagram.com/aleth_inc/ "
                type={SocialMediaType.INSTAGRAM}
              />
            </SMLink>
            <SMLink>
              <SocialIcon link="" type={SocialMediaType.GITHUB} />
            </SMLink>
            <SMLink>
              <SocialIcon
                link="https://www.linkedin.com/company/aleth-inc/"
                type={SocialMediaType.LINKEDIN}
              />
            </SMLink>
          </SMLinkList>
        </SocialMediaSection>
      </FooterContainer>
    </>
  );
}
