import styled from 'styled-components';
import Link from 'next/link';

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 25px 89px 25px 81px;
  background: rgba(22, 22, 23, 0.7);
  box-shadow: rgba(0, 0, 0, 0.25) 4px 4px 4px;
  z-index: 10;
  z-index: 11;

  @media screen and (max-width: 700px) {
    padding: 20px 20px;
  }
`;

export const DesktopContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  @media screen and (max-width: 1020px) {
    display: none;
  }
`;

export const LogoContainer = styled.figure`
  width: 113px;
  height: 25px;

  svg {
    width: 113px;
    height: 25px;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 48px;
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-16);
  line-height: 24px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const NavLink = styled(Link)<{ selected: boolean }>`
  color: white;
  text-decoration: none;
  ${({ selected }) =>
    selected &&
    `
    color: var(--electric-green);
  `};

  @media screen and (max-width: 700px) {
    color: white;
  }
`;

export const ButtonComponent = styled.div`
  display: flex;
  gap: 23px;
`;

export const LogInButton = styled.button`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 700;
  font-size: var(--fs-20);
  line-height: 20px;
  color: #fbfbfb;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 14px 28px;

  &:hover {
    box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 700px) {
    color: #ffffff;
    padding: 14px 28px;
  }
`;

export const SignUpButton = styled.button`
  background: transparent;
  box-shadow: 0px 1px 2px rgba(105, 81, 255, 0.05);
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 700;
  font-size: var(--fs-20);
  line-height: 20px;
  color: #fbfbfb;
  padding: 14px 28px;
  border: 1px solid white;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.5);
  }
`;

export const MsiteNavBar = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  max-height: 100px;
  align-items: center;
  justify-content: space-between;
  gap: 23px;
  @media screen and (max-width: 1020px) {
    display: flex;
  }
`;

export const MsiteNavContainer = styled.div`
  padding-top: 33px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 70px;
  gap: 50px;
`;

export const ButtonComponentMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

export const DropdownContainer = styled.div`
  background-color: var(--electric-green);
  position: fixed;
  top: 76px;
  right: 45%;

  @media screen and (max-width: 700px) {
    top: 200px;
    right: 31%;
  }
`;

export const TopDesignContainer = styled.div`
  position: absolute;
  top: 69px;
  right: -7px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 700px) {
    top: 193px;
  }
`;

export const TopDesign = styled.div`
  background: var(--electric-green);
  width: 15px;
  height: 15px;
  clip-path: polygon(50% 0%, 0 50%, 100% 50%);
`;

export const DropdownElement = styled.div`
  padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease all;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const PageLink = styled.a`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 600;
  font-size: var(--fs-16);
  line-height: 24px;
  /* identical to box height, or 150% */

  text-align: center;

  color: #000000;

  &:hover {
    color: white;
  }
`;
