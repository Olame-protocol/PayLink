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
      <div className="mt-16 flex flex-col items-center justify-between md:min-h-[600px] lg:flex-row">
        <div className="hidden items-center justify-center md:flex md:h-[400px] md:w-[400px]">
          <div className="z-50 hidden md:flex">
            <Image
              width={400}
              height={400}
              alt="Lock icon"
              className="rotate-[45deg]"
              src="https://res.cloudinary.com/dbhdpelno/image/upload/q_17/v1717006899/975513ac502a005ffb73ae06ff3b6b6a_gyfduv.png"
            />
          </div>
          <div className="absolute z-10 h-10 w-10 rounded-full bg-green-petrolium/30 blur-xl md:h-[300px] md:w-[400px]">1</div>
        </div>
        <div className="flex flex-col gap-y-4 text-center lg:gap-y-8 lg:text-start">
          <p className="relative font-sans text-[24px] font-black lg:text-[64px] lg:leading-[70px]">
            The fastest secured <br />
            way to share love{" "}
            <span className="absolute bottom-1 -rotate-[20deg] md:bottom-0 lg:right-6">
              <PinSvg className="h-4 w-4 lg:h-10 lg:w-10" />
            </span>
          </p>
          <p className="text-sm font-thin lg:text-2xl">
            The best way to move world’s money max ease
            <br /> Full speed, just one click, <span className="font-bold">generate the link.</span>
          </p>
        </div>
      </div>
      <div className="mt-[40px] lg:mt-0">
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
    icon: <IoIosLock className="h-4 w-4 lg:h-28 lg:w-28" />,
  },
  {
    title: "Ease of Use",
    description: "Simplifying the payment process.",
    icon: <FaFaceSmileBeam className="h-4 w-4 lg:h-28 lg:w-28" />,
  },
  {
    title: "Rapid transaction",
    description: "Paylink enables instant settlements",
    icon: <IoRocket className="h-4 w-4 lg:h-28 lg:w-28" />,
  },
];

const CardsComponent = ({ card }: { card: (typeof whyPayLinkDataset)[0] }) => {
  return (
    <div className="flex items-stretch gap-x-4 lg:gap-x-10">
      <div className="flex w-[40px] items-center justify-center rounded-md bg-forest/10 lg:h-[80px] lg:w-[80px] lg:rounded-[15px] lg:p-4">{card.icon}</div>
      <div className="flex flex-col justify-between lg:gap-y-2">
        <p className="font-bold lg:text-[32px]">{card.title}</p>
        <p className="text-xs font-thin lg:text-2xl">{card.description}</p>
      </div>
    </div>
  );
};

const WhyPayLink = () => {
  return (
    <div className="flex flex-col">
      <div className="relative z-0 flex overflow-hidden rounded-t-3xl lg:hidden">
        <Image
          src="https://res.cloudinary.com/dbhdpelno/image/upload/v1717006885/f2f3b012bbb05e5a391b76d42f12e64a_qbfjul.jpg"
          width={400}
          height={900}
          className="h-full scale-125 object-cover object-center"
          alt="Image of a person holding a phone"
        />
      </div>
      <div className="relative z-50 -mt-[30px] flex flex-col justify-evenly gap-x-10 rounded-[20px] bg-green-petrolium px-6 py-10 text-forest lg:min-h-[666px] lg:flex-row lg:px-10">
        <div className="flex flex-col justify-evenly gap-y-5 lg:gap-y-9">
          <h1 className="text-[24px] font-bold lg:text-[64px]">Why PayLink</h1>
          <div>
            <div className="space-y-4 lg:space-y-8">
              {whyPayLinkDataset.map((card, index) => (
                <CardsComponent key={index} card={card} />
              ))}
            </div>
          </div>
        </div>
        <div className="hidden overflow-hidden rounded-3xl lg:flex">
          <Image
            src="https://res.cloudinary.com/dbhdpelno/image/upload/v1717006885/f2f3b012bbb05e5a391b76d42f12e64a_qbfjul.jpg"
            width={400}
            height={900}
            className="h-full object-cover object-center"
            alt="Image of a person holding a phone"
          />
        </div>
      </div>
    </div>
  );
};
