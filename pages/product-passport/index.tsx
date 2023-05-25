import React from 'react';
import Footer from '../../components/Common/Footer/Footer.component';
import { ProductPassportBgContainer } from '../../styles/ProductPassport.styles';
import ProductPassport from '../../components/ProductPassportPage/ProductPassportHeroSection/ProductPassport.component';
import PassportAdvantage from '../../components/ProductPassportPage/PassportAdvantage/PassportAdvantage.component';
import MainSection from '../../components/ProductPassportPage/MainSection/MainSection.component';

export default function index() {
  return (
    <>
      <ProductPassportBgContainer>
        <ProductPassport />
        <MainSection />
        <PassportAdvantage />
        <Footer />
      </ProductPassportBgContainer>
    </>
  );
}
