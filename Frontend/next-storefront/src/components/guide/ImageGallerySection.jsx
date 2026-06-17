"use client";
import React from "react";

const roomSections = [
  {
    title: "Living Room",
    heroImage: "https://c.animaapp.com/jwLiGKJa/img/rectangle-52.svg",
    cards: [
      {
        id: "living-room-a",
        title: "Living Room A",
        image: "https://c.animaapp.com/jwLiGKJa/img/living-room@2x.png",
        description:
          "When selecting a rug, ensure that the front legs of your couch and chairs can rest on it comfortably. A standard 8x10 rug generally works well, but depending on the dimensions and layout of your room, a custom 8.5 x 11 rug might be the ideal choice.",
        borderColor: "#660002",
        imageSize: {
          width: "w-[314px]",
          height: "h-[271px]",
          top: "top-[60px]",
          left: "left-[37px]",
        },
      },
      {
        id: "living-room-b",
        title: "Living Room B",
        image: "https://c.animaapp.com/jwLiGKJa/img/living-room-1@2x.png",
        description:
          "We recommend leaving approximately 18 inches of flooring visible around the rug to create a natural border. An oversized rug unifies a larger space and allows for sectional configurations to fit on it.",
        borderColor: "m-3refprimaryprimary-20",
        imageSize: {
          width: "w-[306px]",
          height: "h-[246px]",
          top: "top-[72px]",
          left: "left-[41px]",
        },
      },
      {
        id: "living-room-c",
        title: "Living Room C",
        image: "https://c.animaapp.com/jwLiGKJa/img/living-room-2@2x.png",
        description:
          "A large custom area rug not only covers more floor space, but also allows you to position all furniture legs on the rug, unifying elements in your room. This is great for large open spaces.",
        borderColor: "m-3refprimaryprimary-20",
        imageSize: {
          width: "w-80",
          height: "h-[245px]",
          top: "top-[72px]",
          left: "left-[34px]",
        },
      },
    ],
  },
  {
    title: "Bedroom",
    heroImage: "https://c.animaapp.com/jwLiGKJa/img/rectangle-52-1.svg",
    cards: [
      {
        id: "bedroom-a",
        title: "Bedroom A",
        image: "https://c.animaapp.com/jwLiGKJa/img/bedroom@2x.png",
        description:
          "To effectively cover the bed and nightstand with a rug, you'll need at least an 8' x 10' rug. Make sure to leave at least two feet of rug space on each side for a clear walkway. For a balanced and stable foundation, place two-thirds of the rug beneath the bed.",
        borderColor: "m-3refprimaryprimary-20",
        imageSize: {
          width: "w-[310px]",
          height: "h-[263px]",
          top: "top-16",
          left: "left-[39px]",
        },
      },
      {
        id: "bedroom-b",
        title: "Bedroom B",
        image: "https://c.animaapp.com/jwLiGKJa/img/bedroom-1@2x.png",
        description:
          "Placing a small rug on one or both sides of the bed introduces a soft texture underfoot and creates balance in the room. This solution is great for small spaces.",
        borderColor: "m-3refprimaryprimary-20",
        imageSize: {
          width: "w-[302px]",
          height: "h-[264px]",
          top: "top-[63px]",
          left: "left-[43px]",
        },
      },
      {
        id: "bedroom-c",
        title: "Bedroom C",
        image: "https://c.animaapp.com/jwLiGKJa/img/bedroom-2@2x.png",
        description:
          "On the other hand, runners on either side of the bed provide a warm and inviting atmosphere underfoot. Generally, they measure at least 2 feet in width and can extend up to 8 feet in length.",
        borderColor: "m-3refprimaryprimary-20",
        imageSize: {
          width: "w-[319px]",
          height: "h-[216px]",
          top: "top-[87px]",
          left: "left-[34px]",
        },
      },
    ],
  },
  {
    title: "Dining Room",
    heroImage: "https://c.animaapp.com/jwLiGKJa/img/rectangle-52-2.svg",
    cards: [
      {
        id: "dining-room-a",
        title: "Dining Room A",
        image: "https://c.animaapp.com/jwLiGKJa/img/dining-room@2x.png",
        description:
          "We recommend leaving at least 24 inches of space on all sides so that chairs can stay completely on the rug when moved away from the table. A larger rug, such as a 9x12 size, is best for accommodating a fully extended table, making it ideal for entertaining guests with 8 chairs.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[297px]",
          height: "h-[194px]",
          top: "top-[98px]",
          left: "left-[46px]",
        },
      },
      {
        id: "dining-room-b",
        title: "Dining Room B",
        image: "https://c.animaapp.com/jwLiGKJa/img/dining-room-1@2x.png",
        description:
          "This rug is well-proportioned to the table, allowing chairs to slide out easily on all sides while still remaining on the rug. Tip: For a six chair layout the minimum size is traditionally an 8x10.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[298px]",
          height: "h-[217px]",
          top: "top-[86px]",
          left: "left-[45px]",
        },
      },
      {
        id: "dining-room-c",
        title: "Dining Room C",
        image: "https://c.animaapp.com/jwLiGKJa/img/dining-room-2@2x.png",
        description:
          "When placing a large round area rug under a round table, it creates a cohesive feel in your space. For a 48\" dining table, it's best to choose a rug that is at least 8' in diameter. For a 60\" dining table, opt for a rug that is at least 9' in diameter.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[246px]",
          height: "h-[246px]",
          top: "top-[72px]",
          left: "left-[71px]",
        },
      },
    ],
  },
  {
    title: "Kitchen",
    heroImage: "https://c.animaapp.com/jwLiGKJa/img/rectangle-52-4.svg",
    cards: [
      {
        id: "kitchen-a",
        title: "Kitchen A",
        image: "https://c.animaapp.com/jwLiGKJa/img/kitchen@2x.png",
        description:
          "Elevate the look of your kitchen with a beautifully crafted custom L-shaped rug, designed to offer additional comfort and support as you prepare meals or gather around the island for socializing.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[296px]",
          height: "h-[246px]",
          top: "top-[72px]",
          left: "left-[46px]",
        },
      },
      {
        id: "kitchen-b",
        title: "Kitchen B",
        image: "https://c.animaapp.com/jwLiGKJa/img/kitchen-1@2x.png",
        description:
          "If your kitchen has an open floor plan, consider placing a rug in the center. This will enhance the area in front of your counters and protect the entire space. Remember to leave a minimum of 6 inches of floor visible around the edges of the rug for a balanced look.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[289px]",
          height: "h-[237px]",
          top: "top-[76px]",
          left: "left-[50px]",
        },
      },
      {
        id: "kitchen-c",
        title: "Kitchen C",
        image: "https://c.animaapp.com/jwLiGKJa/img/kitchen-2@2x.png",
        description:
          "Long and narrow kitchens deserve attention as well. Galley designs benefit from a single runner rug placed in the center. This not only insulates and safeguards the floor, but also avoids a cramped feel. Just remember to maintain at least 6 inches of space on each side.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[263px]",
          height: "h-[248px]",
          top: "top-[71px]",
          left: "left-[62px]",
        },
      },
    ],
  },
  {
    title: "Office",
    heroImage: "https://c.animaapp.com/jwLiGKJa/img/rectangle-52-5.svg",
    cards: [
      {
        id: "office-a",
        title: "Office A",
        image: "https://c.animaapp.com/jwLiGKJa/img/office@2x.png",
        description:
          "Just have enough space for a desk? Opt for a small to medium-sized rug so that your desk and chair sit on the rug with enough room to scoot your chair out.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[298px]",
          height: "h-[222px]",
          top: "top-[84px]",
          left: "left-[45px]",
        },
      },
      {
        id: "office-b",
        title: "Office B",
        image: "https://c.animaapp.com/jwLiGKJa/img/office-1@2x.png",
        description:
          "In a square-shaped office, you can enhance the space by using a custom square rug that accommodates both a desk and a seating area.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[297px]",
          height: "h-[287px]",
          top: "top-[52px]",
          left: "left-[46px]",
        },
      },
      {
        id: "office-c",
        title: "Office C",
        image: "https://c.animaapp.com/jwLiGKJa/img/office-2@2x.png",
        description:
          "In an office space with two desks, adding a decorative runner can enhance the visual appeal of the area. It's important to ensure that there is enough space around the desks for the chairs to move in and out comfortably.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[315px]",
          height: "h-[228px]",
          top: "top-[81px]",
          left: "left-9",
        },
      },
    ],
  },
  {
    title: "Outdoor",
    heroImage: "https://c.animaapp.com/jwLiGKJa/img/rectangle-52-6.svg",
    cards: [
      {
        id: "outdoor-a",
        title: "Outdoor A",
        image: "https://c.animaapp.com/jwLiGKJa/img/outdoor@2x.png",
        description:
          "Make sure to consider the size of your patio when choosing the dimensions of your five-piece patio furniture set. The rug should be proportionate to both the furniture and the available space so that everything looks balanced.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[297px]",
          height: "h-[297px]",
          top: "top-[46px]",
          left: "left-[46px]",
        },
      },
      {
        id: "outdoor-b",
        title: "Outdoor B",
        image: "https://c.animaapp.com/jwLiGKJa/img/outdoor-1@2x.png",
        description:
          "If your outdoor space is smaller, choose a medium-sized rug that allows the front legs of your smaller outdoor furniture to rest on it.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[312px]",
          height: "h-[235px]",
          top: "top-[78px]",
          left: "left-[38px]",
        },
      },
      {
        id: "outdoor-c",
        title: "Outdoor C",
        image: "https://c.animaapp.com/jwLiGKJa/img/outdoor-2@2x.png",
        description:
          "In a generously sized area, you have the option to either use a single large rug to cover the entire space or to create separate seating areas within the room, with each area being defined by a smaller rug.",
        background:
          "bg-[linear-gradient(270deg,rgba(255,255,255,1)_0%,rgba(243,243,242,1)_100%)]",
        imageSize: {
          width: "w-[297px]",
          height: "h-[268px]",
          top: "top-[61px]",
          left: "left-[46px]",
        },
      },
    ],
  },
];

const hallwaySection = {
  title: "Hallway",
  heroImage: "https://c.animaapp.com/jwLiGKJa/img/rectangle-52-3.svg",
  content: {
    image: "https://c.animaapp.com/jwLiGKJa/img/hallway.png",
    title: "Hallway Rug Styling Tips",
    description1:
      "There are no standard-sized hallways, so most need a custom-designed runner. You'll want to ensure the rug is long enough to cover the length of the hall or entryway without overwhelming the space, and wide enough to still leave visible floor between the rug and side walls. PRO TIP: Add a non-slip pad to keep the runner in place.",
    description2:
      "Make sure there is a minimum of 12 to 24 inches of floor space between the wall and the edge of the rug. By subtracting 24 inches from the dimensions of your entryway, you will create a 12-inch gap between the walls and the edges of your rug.",
    linkText: "Shop Hallway Rugs",
    linkImage: "https://c.animaapp.com/jwLiGKJa/img/link@2x.png",
  },
};

const RoomCard = ({ card, isFirstCard = false }) => (
  <article className="flex flex-col w-[390px] h-[753px] items-start gap-[30px] p-px relative border border-solid border-[#cecece]">
    <div
      className={`${
        card.background || "bg-m-3refprimaryprimary-95"
      } ${
        isFirstCard
          ? "border-b-2 [border-bottom-style:solid] border-[#660002]"
          : `border-b-2 [border-bottom-style:solid] border-${card.borderColor || "m-3refprimaryprimary-20"}`
      } shadow-[0px_4px_4px_#00000040] relative w-[388px] h-[390px] z-[1]`}
    >
      <img
        src={card.image}
        alt={card.title}
        className={`absolute ${card.imageSize.width} ${card.imageSize.height} ${card.imageSize.top} ${card.imageSize.left} object-cover`}
      />
    </div>
    <div className="flex-col px-[35px] py-0 self-stretch w-full flex-[0_0_auto] z-0 flex items-start relative">
      <header className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <h3 className="relative self-stretch mt-[-1.00px] font-www-theperfectrug-com-semantic-heading-4 font-[number:var(--www-theperfectrug-com-semantic-heading-4-font-weight)] text-[#212121] text-[length:var(--www-theperfectrug-com-semantic-heading-4-font-size)] tracking-[var(--www-theperfectrug-com-semantic-heading-4-letter-spacing)] leading-[var(--www-theperfectrug-com-semantic-heading-4-line-height)] [font-style:var(--www-theperfectrug-com-semantic-heading-4-font-style)]">
          {card.title}
        </h3>
      </header>
      <div className="flex-col self-stretch w-full flex-[0_0_auto] flex items-start relative">
        <p className="relative self-stretch mt-[-1.00px] font-www-theperfectrug-com-montserrat-regular font-[number:var(--www-theperfectrug-com-montserrat-regular-font-weight)] text-[#212121] text-[length:var(--www-theperfectrug-com-montserrat-regular-font-size)] tracking-[var(--www-theperfectrug-com-montserrat-regular-letter-spacing)] leading-[var(--www-theperfectrug-com-montserrat-regular-line-height)] [font-style:var(--www-theperfectrug-com-montserrat-regular-font-style)]">
          {card.description.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < card.description.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  </article>
);

const RoomSection = ({ section }) => (
  <section className="relative w-[1294px] h-[1553px] mr-[-1.00px]">
    <header className="absolute h-6 top-0 left-[546px] [font-family:'Jost',Helvetica] font-medium text-black text-4xl text-center tracking-[0] leading-6 whitespace-nowrap">
      <h2>{section.title}</h2>
    </header>
    <img
      className="w-[1292px] h-[646px] top-[76px] object-cover absolute left-0"
      alt={`${section.title} hero image`}
      src={section.heroImage}
    />
    <div className="inline-flex items-center gap-[61px] absolute top-[800px] left-0">
      {section.cards.map((card, index) => (
        <RoomCard
          key={card.id}
          card={card}
          isFirstCard={index === 0 && section.title === "Living Room"}
        />
      ))}
    </div>
  </section>
);


const HallwaySection = () => (
  <section className="relative w-[1294px] h-[1365.18px] mr-[-1.00px]">
    <header className="absolute h-6 top-0 left-[582px] [font-family:'Jost',Helvetica] font-medium text-black text-4xl text-center tracking-[0] leading-6 whitespace-nowrap">
      <h2>{hallwaySection.title}</h2>
    </header>
    <img
      className="w-[1292px] h-[646px] top-[76px] object-cover absolute left-0"
      alt="Hallway hero image"
      src={hallwaySection.heroImage}
    />
    <div className="inline-flex items-center gap-[61px] absolute top-[800px] left-0 bg-m-3refprimaryprimary-95">
      <article className="flex flex-col w-[1282.26px] items-center pt-[70px] pb-[60.77px] px-0 relative">
        <div className="max-w-[834.81px] w-[834.81px] gap-20 flex-[0_0_auto] bg-m-3refprimaryprimary-95 flex items-start relative">
          <div className="flex-col w-[545.96px] pt-0 pb-0.5 px-0 flex items-start relative">
            <div className="flex max-w-[544.29px] w-[544.29px] items-start justify-center pt-0 pb-[2.67px] px-0 relative flex-[0_0_auto]">
              <img
                src={hallwaySection.content.image}
                alt="Hallway rug styling"
                className="relative flex-1 max-w-[544.29px] grow h-[308.65px] object-cover"
              />
            </div>
          </div>
          <div className="flex-col w-[208.7px] gap-[8.01px] pt-0 pb-[2.67px] px-0 flex items-start relative">
            <header className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <h3 className="relative self-stretch mt-[-0.67px] [font-family:'Montserrat',Helvetica] font-light text-[#212121] text-xl tracking-[0] leading-[25.4px]">
                {hallwaySection.content.title}
              </h3>
            </header>
            <div className="flex-col self-stretch w-full flex-[0_0_auto] flex items-start relative">
              <p className="relative self-stretch mt-[-0.67px] [font-family:'Montserrat',Helvetica] font-normal text-[#212121] text-[10.7px] tracking-[0] leading-[20.0px]">
                {hallwaySection.content.description1}
              </p>
            </div>
            <div className="flex-col pt-0 pb-0.5 px-0 self-stretch w-full flex-[0_0_auto] flex items-start relative">
              <p className="relative self-stretch mt-[-0.67px] [font-family:'Montserrat',Helvetica] font-normal text-[#212121] text-[10.7px] tracking-[0] leading-[20.0px]">
                {hallwaySection.content.description2}
              </p>
            </div>
            <div className="relative w-[138.78px] h-[12.69px]">
              <img
                src={hallwaySection.content.linkImage}
                alt="Link arrow"
                className="absolute w-[138.78px] h-[12.69px] object-cover"
              />
              <a
                href="#"
                className="absolute w-[104px] h-4 -top-0.5 left-0 [font-family:'Montserrat',Helvetica] font-medium text-[#90101c] text-[10.7px] tracking-[0] leading-[16.0px] whitespace-nowrap"
              >
                {hallwaySection.content.linkText}
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
);

export const ImageGallerySection = () => {
  return (
    <main className="flex flex-col w-[1293px] items-start gap-12 relative top-[49px] left-[76px]">
      {roomSections.map((section, index) => {
        if (index === 3) {
          return (
            <React.Fragment key={`hallway-${index}`}>
              <HallwaySection />
              <RoomSection section={section} />
            </React.Fragment>
          );
        }
        return <RoomSection key={section.title} section={section} />;
      })}
    </main>
  );
};
