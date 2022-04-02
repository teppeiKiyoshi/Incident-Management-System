import { React, useState } from 'react'
import Sidebar from '../../components/landing-page/Sidebar/index'
import Navbar from '../../components/landing-page/Navbar/index'
import HeroSection from '../../components/landing-page/HeroSection/index';
import InfoSection from '../../components/landing-page/InfoSection/index';
import { homeObjOne, homeObjTwo, homeObjThree } from '../../components/landing-page/InfoSection/Data';
import Services from '../../components/landing-page/Services/index';
import Footer from '../../components/landing-page/Footer/index';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggleSidebar}/>
      <Navbar toggle={toggleSidebar}/>
      <HeroSection />
      <InfoSection {...homeObjOne}/>
      <InfoSection {...homeObjTwo}/>
      <Services/>
      <InfoSection {...homeObjThree}/>
      <Footer/>
    </>
  )
}

export default MainPage