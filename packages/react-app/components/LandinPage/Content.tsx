import React from "react";
import Section from "../Section";
import PinSvg from "../ui/payLink/icons/PinSvg";
import Image from "next/image";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { IoRocket } from "react-icons/io5";
const ContentSection = () => {
  return (
    <Section>
      <div className="flex flex-col lg:flex-row min-h-[600px] justify-between items-center">
        <div className="w-[400px] flex items-center justify-center h-[400px]">
          <div className="z-50">
            <Image
              width={400}
              height={400}
              alt="Lock icon"
              className="rotate-[45deg]"
              src="https://res.cloudinary.com/dbhdpelno/image/upload/q_17/v1717006899/975513ac502a005ffb73ae06ff3b6b6a_gyfduv.png"
            />
          </div>
          <div className=" h-[300px] w-[400px] z-10 bg-green-petrolium/30 blur-xl rounded-full absolute ">1</div>
        </div>
        <div className="flex flex-col gap-y-4 lg:text-start text-center lg:gap-y-8">
          <p className="lg:leading-[70px]  relative font-sans font-black text-[24px] lg:text-[64px]">
            The fastest secured <br />
            way to share love{" "}
            <span className="absolute md:bottom-0 bottom-1 lg:right-6 -rotate-[20deg]">
              <PinSvg className="w-4 h-4 lg:w-10 lg:h-10" />
            </span>
          </p>
          <p className="lg:text-2xl text-sm font-thin">
            The best way to move world’s money max ease
            <br /> Full speed, just one click, <span className="font-bold">generate the link.</span>
          </p>
        </div>
      </div>
      <div>
        <WhyPayLink />
      </div>
    </Section>
  );
};

export default ContentSection;

const whyPayLinkDataset = [
  {
    title: "Security",
    description: "We ensure that transactions are secure",
    icon: <IoIosLock className="lg:w-36 lg:h-36 w-4 h-4" />,
  },
  {
    title: "Ease of Use",
    description: "Simplifying the payment process.",
    icon: <FaFaceSmileBeam className="lg:w-36 lg:h-36 w-4 h-4" />,
  },
  {
    title: "Rapid transaction",
    description: "Paylink enables instant settlements",
    icon: <IoRocket className="lg:w-36 lg:h-36 w-4 h-4" />,
  },
];

const CardsComponent = ({ card }: { card: (typeof whyPayLinkDataset)[0] }) => {
  return (
    <div className="flex items-stretch gap-x-4 lg:gap-x-10">
      <div className=" rounded-md md:rounded-[15px] flex items-center justify-center w-[40px] lg:h-[80px] lg:w-[80px] bg-forest/10">{card.icon}</div>
      <div className="flex flex-col justify-between lg:gap-y-2">
        <p className="lg:text-[32px] font-bold">{card.title}</p>
        <p className="font-thin text-xs lg:text-2xl">{card.description}</p>
      </div>
    </div>
  );
};

const WhyPayLink = () => {
  return (
    <div className="flex flex-col">
      <div className="border relative z-0 lg:hidden flex rounded-3xl overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dbhdpelno/image/upload/v1717006885/f2f3b012bbb05e5a391b76d42f12e64a_qbfjul.jpg"
          width={400}
          height={900}
          className="object-cover scale-125 h-full object-center"
          alt="Image of a person holding a phone"
        />
      </div>
      <div className="bg-green-petrolium relative z-50 -mt-[30px] lg:min-h-[666px] text-forest py-10 px-6 lg:px-10 flex flex-col lg:flex-row justify-evenly gap-x-10 rounded-[20px]">
        <div className="flex flex-col justify-evenly gap-y-5 lg:gap-y-9">
          <h1 className="lg:text-[64px] text-[24px] font-bold">Why PayLink</h1>
          <div>
            <div className=" space-y-4 lg:space-y-8">
              {whyPayLinkDataset.map((card, index) => (
                <CardsComponent key={index} card={card} />
              ))}
            </div>
          </div>
        </div>
        <div className="border hidden lg:flex rounded-3xl overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dbhdpelno/image/upload/v1717006885/f2f3b012bbb05e5a391b76d42f12e64a_qbfjul.jpg"
            width={400}
            height={900}
            className="object-cover h-full object-center"
            alt="Image of a person holding a phone"
          />
        </div>
      </div>
    </div>
  );
};
