import React from 'react';
import { useAppDispatch } from '../redux/store';
import Hero from '../components/HomePage/HeroSection/Hero.component';
import Explore from '../components/HomePage/ExploreSection/Explore.component';
import Solution from '../components/HomePage/SolutionSection/Solution.component';
import Blog from '../components/HomePage/BlogSection/Blog.component';
import Contact from '../components/HomePage/ContactSection/Contact.component';
import Footer from '../components/Common/Footer/Footer.component';
import { HomeBgContainer } from '../styles/HomePage.styles';
const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Hero />
      <HomeBgContainer>
        <Explore />
        <Blog />
      </HomeBgContainer>
      <HomeBgContainer>
        <Solution />
        <Contact />
        <Footer />
      </HomeBgContainer>
    </>
  );
};

export default Home;
