import React, { useRef, useState } from 'react';
import {
  ButtonComponent,
  ButtonComponentMobile,
  DesktopContainer,
  DropdownContainer,
  DropdownElement,
  HeaderWrapper,
  LogInButton,
  LogoContainer,
  MsiteNavBar,
  MsiteNavContainer,
  NavLink,
  NavLinks,
  PageLink,
  SignUpButton,
  TopDesign,
  TopDesignContainer,
} from './Header.styles';
import Link from 'next/link';
import { RoutesEnum } from '../../../types/Global.types';
import { Logo, MsiteNavBtn } from '../../../Icons';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { SelectedNavLinkEnum } from '../../../types/state/headerType';
import useActiveLink from '../../../hooks/useActiveLink/useActiveLink';
import BottomSheet from '../../BottomSheet/BottomSheet.component';
import styled from 'styled-components';

const NavLinksComponent = ({ onClick }: { onClick?: () => void }) => {
  const headerInfo = useSelector((state: RootState) => state.headerInfo);
  const [selected, setSelected] = useState(null);

  const [show, setShow] = useState(false);

  const toggleDropdown = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <NavLinks>
        <NavLink
          onClick={onClick}
          href="/"
          selected={headerInfo.selectedNavLink === SelectedNavLinkEnum.FEATURES}
        >
          Features
        </NavLink>
        <NavLink
          // onClick={onClick}
          href=""
          selected={
            headerInfo.selectedNavLink === SelectedNavLinkEnum.SOLUTIONS
          }
          onClick={toggleDropdown}
        >
          Solutions
        </NavLink>
        <NavLink
          onClick={onClick}
          href="/#blog"
          selected={headerInfo.selectedNavLink === SelectedNavLinkEnum.BLOG}
        >
          Blog
        </NavLink>
        <NavLink
          onClick={onClick}
          href={RoutesEnum.CONTACT_US}
          selected={headerInfo.selectedNavLink === SelectedNavLinkEnum.CONTACT}
        >
          Contact Us
        </NavLink>
        {show && (
          <>
            <TopDesignContainer>
              <TopDesign />
            </TopDesignContainer>
            <DropdownContainer>
              <DropdownElement onClick={() => setSelected(1)}>
                <PageLink href={RoutesEnum.ALETH_PLATFORM}>
                  ALETH Platform
                </PageLink>
              </DropdownElement>
              <DropdownElement onClick={() => setSelected(2)}>
                <PageLink href={RoutesEnum.PRODUCT_PASSPORT}>
                  Product Passport
                </PageLink>
              </DropdownElement>
            </DropdownContainer>
          </>
        )}
      </NavLinks>
    </>
  );
};

export default function Header() {
  const [showMsiteNav, setShowMsiteNav] = useState(false);
  const {} = useActiveLink();
  const toggleMsiteNav = () => {
    setShowMsiteNav(() => !showMsiteNav);
  };
  return (
    <>
      <HeaderWrapper>
        <DesktopContainer>
          <LogoContainer>
            <Link href="/">
              <Logo />
            </Link>
          </LogoContainer>
          <NavLinksComponent />
          <ButtonComponent>
            {/* <LogInButton>Log In</LogInButton>
            <SignUpButton>Sign Up</SignUpButton> */}
          </ButtonComponent>
        </DesktopContainer>
        <MsiteNavBar>
          <LogoContainer>
            <Link href={RoutesEnum.FEATURES}>
              <Logo />
            </Link>
          </LogoContainer>
          <MsiteNavBtn width={26} height={24} onClick={toggleMsiteNav} />
          <BottomSheet
            show={showMsiteNav}
            onClose={toggleMsiteNav}
            onBackdropClick={toggleMsiteNav}
            fullScreen
          >
            <MsiteNavContainer>
              <NavLinksComponent />
              <ButtonComponentMobile>
                {/* <LogInButton>Log In</LogInButton>
                <SignUpButton>Sign Up</SignUpButton> */}
              </ButtonComponentMobile>
            </MsiteNavContainer>
          </BottomSheet>
        </MsiteNavBar>
      </HeaderWrapper>
    </>
  );
}
