"use client";
import React from 'react';
import './Home.css';
import Hero from '../../components/Hero/Hero';
import MeetManuf from '../../components/MeetManuf/MeetManuf';
import RugVisual from '../../components/RugVisual/RugVisual';
import ShopColor from '../../components/ShopColor/ShopColor';
import ShopSize from '../../components/ShopSize/ShopSize';
import ShopMaterial from '../../components/ShopMaterial/ShopMaterial';
import ShopRoom from '../../components/ShopRoom/ShopRoom';
import ShopDesign from '../../components/ShopDesign/ShopDesign';
import Story from '../../components/Story/Story';
// import Faq from '../Faqs/Faqs';

const Home = () => {
  return (
    <div className='home'>
     <Hero/>
     <MeetManuf/>
     <RugVisual/>
     <ShopColor/>
     <ShopSize/>
     <ShopMaterial/>
     <ShopRoom/>
     {/* <ShopDesign/> */}
     <Story/>
     {/* <Faq/> */}


    </div>
  )
}

export default Home
