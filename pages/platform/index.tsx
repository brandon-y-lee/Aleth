import React from 'react';
import Footer from '../../components/Common/Footer/Footer.component';
import { PlatformBgContainer } from '../../styles/Platform.styles';
import Management from '../../components/PlatformPage/ManagementSection/Management.component';
import PlatformAdvantage from '../../components/PlatformPage/PlatformAdvantage/PlatformAdvantage.component';
import Platform from '../../components/PlatformPage/PlatformHeroSection/Platform.component';
import PlatformMainSection from '../../components/PlatformPage/PlatformMainSection/PlatformMainSection.component';

export default function index() {
  return (
    <>
      <PlatformBgContainer>
        <Platform />
        <PlatformMainSection />
        <Management />
        <PlatformAdvantage />
        <Footer />
      </PlatformBgContainer>
    </>
  );
}
