"use client";
import React from 'react';
import Hero from '../Hero/Hero';
import SubHero from './SubHero';
import VideoSection from './VideoSection';
import Masterpieces from './Masterpieces';
import Features from './Features';
import Blog from './Blog';
import ShopColor from '../ShopColor/ShopColor';
import RugVisual from '../RugVisual/RugVisual';
import MeetManuf from '../MeetManuf/MeetManuf';
import ShopSize from '../ShopSize/ShopSize';
import ShopMaterial from '../ShopMaterial/ShopMaterial';
import Story from '../Story/Story';
import BeginJourney from './BeginJourney';

const HomeNew = () => {
  return (
    <div className="bg-white">
      <Hero />
      <div id="meet-manuf">
        <MeetManuf />
      </div>
      <SubHero />
      <VideoSection />
      <Masterpieces />
      <RugVisual />
      <Features />
      <Blog />
      <ShopColor />
      <ShopSize />
      <ShopMaterial />
      <Story />
      <BeginJourney />
    </div>
  );
};

export default HomeNew;
