import Link from 'next/link';
import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 50px 90px 50px;
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 136px;
  padding-bottom: 39px;
  border-bottom: 1px solid #53d295;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    border-bottom: none;
  }
`;

export const LogoContainer = styled.div`
  width: 180px;
  height: 41px;

  svg {
    width: 180px;
    height: 41px;
  }
`;

export const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 829px;
  width: 100%;
  flex-wrap: wrap;
  gap: 46px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const NavLink = styled(Link)<{ selected: boolean }>`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-20);
  line-height: 30px;
  color: #ffffff;

  ${({ selected }) =>
    selected &&
    `
    color: var(--electric-green);
  `}
`;

export const SocialMediaSection = styled.div`
  padding-top: 38px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 700px) {
    flex-direction: column-reverse;
    gap: 50px;
    align-items: center;
  }
`;

export const SectionDetails = styled.div`
  font-family: var(--font-raleway);
  font-style: normal;
  font-weight: 500;
  font-size: var(--fs-16);
  line-height: 24px;
  letter-spacing: 0.2px;
  color: #8896ab;
`;

export const SMLinkList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;

  @media screen and (max-width: 700px) {
    gap: 19px;
  }
`;

export const SMLink = styled.div`
  max-height: 32px;
  max-width: 32px;
`;
