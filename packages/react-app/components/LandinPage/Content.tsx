import React from "react";
import Section from "../Section";
import PinSvg from "../ui/payLink/icons/PinSvg";
import Image from "next/image";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { IoRocket } from "react-icons/io5";
const ContentSection = () => {
  return (
    <Section className="mb-[-80px]">
      <div className="mt-16 flex flex-col items-center justify-between md:min-h-[600px] lg:flex-row">
        <div className="hidden items-center justify-center md:flex md:h-[400px] md:w-[400px]">
          <div className="z-20 hidden md:flex">
            <Image width={400} height={400} alt="Lock icon" className="" src="./Pinklinkpadlock.svg" />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 text-center lg:gap-y-8 lg:text-start">
          <p className="font-sans text-[24px] font-black lg:text-[60px] lg:leading-[70px]">
            Secured way to <br />
            send money{" "}
          </p>
          <p className="text-sm font-thin lg:text-xl">
            The best way to move world’s money max ease
            <br /> Full speed, just one click, generate the link.
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
      <div className="flex flex-col justify-between lg:gap-y-1">
        <p className="font-bold lg:text-[28px]">{card.title}</p>
        <p className="text-xs font-thin lg:text-base">{card.description}</p>
      </div>
    </div>
  );
};

const WhyPayLink = () => {
  return (
    <div className="mt-44 flex flex-col lg:mt-0">
      <div className="relative z-20 -mt-[30px] flex flex-col justify-between gap-x-10 rounded-[20px] bg-[#EFF7FF] px-6 py-10 text-forest lg:min-h-[666px] lg:flex-row lg:px-10 xl:px-20">
        <div className="mt-[-60px] flex flex-col justify-evenly gap-y-5 lg:mt-0 lg:gap-y-9">
          <h1 className="text-[24px] font-bold lg:text-[64px]">Why PayLink</h1>
          <div>
            <div className="space-y-4 lg:space-y-8">
              {whyPayLinkDataset.map((card, index) => (
                <CardsComponent key={index} card={card} />
              ))}
            </div>
          </div>
        </div>
        <div className="relative order-first flex h-[400px] w-full rounded-r-xl md:order-last md:h-[722px] lg:h-[500px] lg:basis-2/5">
          <Image
            src="PaylinkPhone.svg"
            width={400}
            height={900}
            className="absolute bottom-2 block h-[600px] w-full scale-x-100 lg:hidden"
            alt="Image of a person holding a phone"
          />
          <img src="PaylinkPhone.svg" className="absolute left-[90px] mt-14 hidden h-full w-full lg:flex xl:left-[160px]" alt="Image of a person holding a phone" />
        </div>
      </div>
    </div>
  );
};
