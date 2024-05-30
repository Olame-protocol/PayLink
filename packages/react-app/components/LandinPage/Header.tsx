import React from "react";
import Section from "../Section";
import Image from "next/image";
import LoveSvg from "../ui/payLink/icons/LoveSvg";
import PinSvg from "../ui/payLink/icons/PinSvg";

const Header = () => {
  return (
    <div className="w-full  min-h-[85vh] pb-[6rem] bg-forest flex flex-col">
      <Section>
        <div className="mt-[126px] text-center flex flex-col space-y-14">
          <div>
            <h1 className="text-[80px] text-white font-fontsprint font-bold uppercase">Linking the love of money transfer</h1>
          </div>
          <div>
            <p className="text-2xl text-green-petrolium">Simplifying digital payments, one click at a time</p>
          </div>
          <div>
            <button className="px-10  py-4 bg-white text-forest text-xl font-semibold rounded-lg">Generate a link</button>
          </div>
          <div className="relative">
            <div className="absolute -right-10 -top-20">
              <LoveSvg className="w-[120px] h-[120px]" />
            </div>
            <div className="rounded-[20px] w-full h-full max-h-[496px] overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dbhdpelno/image/upload/v1716997494/2e1367c63752fbedbb8fdadecee393b2_1_oo2pum.jpg"
                width={1200}
                height={496}
                alt="Image of a person holding a phone"
                className="w-full  h-[496px] object-center  object-cover bg-no-repeat"
              />
            </div>
            <div className="absolute -bottom-8 -left-8">
              <PinSvg className="w-[73px] h-[73px]" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Header;
