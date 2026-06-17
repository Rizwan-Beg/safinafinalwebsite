"use client";
import React from "react";
import { Card, CardContent } from "../../ui/card";
import { useEffect } from 'react';
export const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const companyInfoLinks = [
    "Shop",
    "Custom Orders",
    "Manufacturing Process",
    "About Us",
    "Blog",
    "Services",
  ];

  const supportPoliciesLinks = [
    "Shipping Policy",
    "Return & Refund Policy",
    "Terms & Conditions",
    "FAQs",
    "Privacy Policy",
    "Guide",
    "Track My Order",
  ];

  const businessWholesaleLinks = [
    "Bulk Orders",
    "Wholesale Inquiry Form",
    "Corporate & Hospitality Projects",
    "SAFINA CARPETS Reseller",
    "Export & International Trade Partnerships",
  ];

  const socialIcons = [
    {
      src: "https://c.animaapp.com/gH0bez6V/img/component-1.svg",
      alt: "Facebook",
    },
    {
      src: "https://c.animaapp.com/gH0bez6V/img/component-1-1.svg",
      alt: "Twitter",
    },
    {
      src: "https://c.animaapp.com/gH0bez6V/img/component-1-2.svg",
      alt: "Instagram",
    },
    {
      src: "https://c.animaapp.com/gH0bez6V/img/component-1-3.svg",
      alt: "LinkedIn",
    },
    {
      src: "https://c.animaapp.com/gH0bez6V/img/component-1-4.svg",
      alt: "YouTube",
    },
  ];

  const paymentIcons = [
    {
      src: "https://c.animaapp.com/gH0bez6V/img/component-1-5.svg",
      alt: "Payment method",
    },
    {
      src: "https://c.animaapp.com/gH0bez6V/img/component-1-6.svg",
      alt: "Payment method",
    },
    {
      src: "https://c.animaapp.com/gH0bez6V/img/component-1-7.svg",
      alt: "Payment method",
    },
    {
      src: "https://c.animaapp.com/gH0bez6V/img/component-1-8.svg",
      alt: "Payment method",
    },
    {
      src: "https://c.animaapp.com/gH0bez6V/img/component-1-9.svg",
      alt: "Payment method",
    },
  ];

  const teamMembers = [
    {
      name: "Shahid Beg",
      image: "https://c.animaapp.com/gH0bez6V/img/rectangle-39.svg",
    },
    {
      name: "Shahid Beg",
      image: "https://c.animaapp.com/gH0bez6V/img/rectangle-40.svg",
    },
    {
      name: "Shahid Beg",
      image: "https://c.animaapp.com/gH0bez6V/img/rectangle-41.svg",
    },
    {
      name: "Shahid Beg",
      image: "https://c.animaapp.com/gH0bez6V/img/rectangle-42.svg",
    },
  ];

  const navItems = Array(9).fill("Shop By Area");

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="60317:17050"
    >
      <div className="bg-white w-full max-w-[1440px] relative">
        {/* <HeaderSection /> */}

        {/* Hero Section */}
        <div className="w-full relative pt-0 pb-16 md:pb-24">
          <img
            className="w-full h-[250px] sm:h-[350px] md:h-[423px] object-cover"
            alt="Hero background"
            src="https://c.animaapp.com/gH0bez6V/img/rectangle-25.svg"
          />
          <div className="w-full h-[100px] sm:h-[150px] md:h-[173px] absolute bottom-0 bg-[linear-gradient(180deg,rgba(102,102,102,0.05)_17%,rgba(0,0,0,0.59)_74%)]"></div>
          <div className="absolute left-4 sm:left-8 md:left-[73px] bottom-8 sm:bottom-12 md:bottom-16">
            <h1 className="text-white text-2xl sm:text-3xl md:text-[length:var(--m3-headline-large-font-size)] font-m3-headline-large tracking-[var(--m3-headline-large-letter-spacing)] leading-[var(--m3-headline-large-line-height)]">
              About us
            </h1>
            <p className="w-full sm:w-[80%] md:w-[579px] mt-2 sm:mt-4 font-['Inter',Helvetica] font-normal text-white text-xs sm:text-sm">
              Welcome to Safina Carpets, a name synonymous with timeless
              artistry and Mughal heritage.
            </p>
            <p className="w-full sm:w-[90%] md:w-[80%] lg:w-[889px] mt-2 sm:mt-3 font-['Inter',Helvetica] font-normal text-white text-xs sm:text-sm leading-normal">
              As manufacturers and wholesalers of premium handmade carpets, we
              bring the beauty of centuries-old craftsmanship to the modern
              world.
            </p>
          </div>
        </div>

        {/* Our Legacy */}
        <div className="text-center mt-8 mb-8">
          <h2 className="font-['Playfair_Display',serif] font-normal text-black text-3xl sm:text-4xl leading-tight sm:leading-[44px]">
            OUR LEGACY
          </h2>
        </div>

        {/* Section: A Story Spanning Generations */}
        <div className="w-full py-8 sm:py-12 md:py-16 bg-white">
          <div className="px-4 sm:px-8 md:px-[73px] flex flex-col md:flex-row gap-8 md:justify-between items-center w-full">
            <div className="w-full md:max-w-[60%] lg:max-w-[745px]">
              <h3 className="font-['Playfair_Display',serif] font-normal text-[#860A0C] text-2xl sm:text-3xl md:text-4xl leading-tight md:leading-[44px] mb-4 sm:mb-6 md:mb-8">
                A Story Spanning Generations
              </h3>
              <p className="font-['Jost',Helvetica] font-normal text-black text-sm sm:text-base leading-6 sm:leading-7">
                Established in 1970, Safina Carpets has its roots in the Mughal
                era, where carpets adorned royal courts and symbolised luxury
                and refinement.
                <br />
                <br />
                Founded by my grandfather, Sayeed Beg, who handcrafted intricate
                carpets, the tradition grew through the efforts of my father,
                Sayeed Beg, and father, Shahid Beg.
                <br />
                <br />
                Today, as the fourth generation, I, Rizwan Beg, continue this
                legacy by blending tradition with innovation and bringing it to
                a global audience.
              </p>
            </div>
            <Card className="w-full sm:w-[80%] md:w-[40%] lg:w-[435px] relative">
              <CardContent className="p-0">
                <img
                  className="w-full h-auto object-cover"
                  alt="Carpet craftsmanship"
                  src="https://c.animaapp.com/gH0bez6V/img/rectangle-29.svg"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* The Founder Section 1 */}
        <div className="w-full py-8 sm:py-12 md:py-16 bg-white">
          <div className="px-4 sm:px-8 md:px-[63px] flex flex-col-reverse md:flex-row gap-8 md:justify-between items-center w-full">
            <Card className="w-full sm:w-[80%] md:w-[40%] lg:w-[435px] relative">
              <CardContent className="p-0">
                <img
                  className="w-full h-auto object-cover"
                  alt="Founder"
                  src="https://c.animaapp.com/gH0bez6V/img/rectangle-33.svg"
                />
              </CardContent>
            </Card>
            <div className="w-full md:max-w-[60%] lg:max-w-[718px] md:ml-8 lg:ml-[100px]">
              <h3 className="font-['Playfair_Display',serif] font-normal text-[#860A0C] text-2xl sm:text-3xl md:text-4xl leading-tight md:leading-[44px] mb-4 sm:mb-6 md:mb-8">
                The Founder
              </h3>
              <div className="font-['Jost',Helvetica] font-normal text-black text-sm sm:text-base leading-6 sm:leading-7">
                <p className="mb-6 sm:mb-8 md:mb-12 lg:mb-[113px]">
                  Established in 1970, Safina Carpets has its roots in the
                  Mughal era, where carpets adorned royal courts and symbolised
                  luxury and refinement.
                </p>
                <p>
                  Established in 1970, Safina Carpets has its roots in the
                  Mughal era, where carpets adorned royal courts and symbolised
                  luxury and refinement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Founder Section 2 */}
        <div className="w-full py-8 sm:py-12 md:py-16 bg-white">
          <div className="px-4 sm:px-8 md:px-[73px] flex flex-col md:flex-row gap-8 md:justify-between items-center w-full">
            <div className="w-full md:max-w-[60%] lg:max-w-[718px]">
              <h3 className="font-['Playfair_Display',serif] font-normal text-[#860A0C] text-2xl sm:text-3xl md:text-4xl leading-tight md:leading-[44px] mb-4 sm:mb-6 md:mb-8">
                The Founder
              </h3>
              <p className="font-['Jost',Helvetica] font-normal text-black text-sm sm:text-base leading-6 sm:leading-7">
                Established in 1970, Safina Carpets has its roots in the Mughal
                era, where carpets adorned royal courts and symbolised luxury
                and refinement.
              </p>
            </div>
            <Card className="w-full sm:w-[80%] md:w-[40%] lg:w-[435px] relative">
              <CardContent className="p-0">
                <img
                  className="w-full h-auto object-cover"
                  alt="Founder"
                  src="https://c.animaapp.com/gH0bez6V/img/rectangle-33-1.svg"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Story Section with Background */}
        <div className="w-full">
          <div className="w-full py-8 sm:py-12 md:py-16 bg-white">
            <div className="flex flex-col items-center px-4 sm:px-8">
              <h3 className="font-['Caveat',Helvetica] font-normal text-[#860A0C] text-2xl sm:text-3xl md:text-4xl leading-tight md:leading-[44px] mb-4 sm:mb-6 md:mb-8">
                A Story Spanning Generations
              </h3>
              <p className="w-full md:w-[90%] lg:w-[1075px] text-center font-['Jost',Helvetica] font-normal text-black text-sm sm:text-base leading-6 sm:leading-7">
                Established in 1970, Safina Carpets has its roots in the Mughal
                era, where carpets adorned royal courts and symbolised luxury
                and refinement.
                <br />
                <br />
                Founded by my grandfather, Sayeed Beg, who handcrafted intricate
                carpets, the tradition grew through the efforts of my father,
                Sayeed Beg, and father, Shahid Beg.
                <br />
                <br />
                Today, as the fourth generation, I, Rizwan Beg, continue this
                legacy by blending tradition with innovation and bringing it to
                a global audience.
              </p>
            </div>
          </div>
          <div className="w-full h-[200px] sm:h-[300px] md:h-[399px] bg-[#c8c8c8]"></div>
        </div>

        {/* Team Members */}
        <div className="w-full bg-white py-10">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-[73px]">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-[140px] sm:w-[200px] md:w-[250px] lg:w-[305px] mb-6"
              >
                <img
                  className="w-full aspect-square object-cover"
                  alt={member.name}
                  src={member.image}
                />
                <h4 className="font-['Playfair_Display',serif] font-normal text-black text-lg sm:text-xl md:text-2xl text-center leading-tight md:leading-[44px] mt-4">
                  {member.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* <FooterSection /> */}
      </div>
    </div>
  );
};

export default AboutUs;
