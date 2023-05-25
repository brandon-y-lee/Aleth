import React from 'react';
import Connect from '../../components/ConnectWithUs/Connect.component';
import Footer from '../../components/Common/Footer/Footer.component';
import { ConnectWithUsContainer } from '../../styles/ConnectWithUs.styles';

export default function index() {
  return (
    <>
      <ConnectWithUsContainer>
        <Connect />
        <Footer />
      </ConnectWithUsContainer>
    </>
  );
}
