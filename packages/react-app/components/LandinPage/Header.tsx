import React from "react";
import Section from "../Section";
import Image from "next/image";
import LoveSvg from "../ui/payLink/icons/LoveSvg";
import PinSvg from "../ui/payLink/icons/PinSvg";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex min-h-[85vh] w-full flex-col bg-forest pb-[6rem]">
      <Section>
        <div className="mt-[62px] flex flex-col space-y-8 text-center md:mt-[126px] md:space-y-14">
          <div>
            <h1 className="font-fontsprint text-[26px] font-bold uppercase text-white lg:text-[80px]">Linking the love of money transfer</h1>
          </div>
          <div>
            <p className="text-xs text-green-petrolium md:text-2xl">Simplifying digital payments, one click at a time</p>
          </div>
          <div>
            <Link href="/payments" className="rounded-lg bg-white px-10 py-4 text-sm font-semibold text-forest md:text-xl">Generate a link</Link>
          </div>
          <div className="relative">
            <div className="absolute -right-4 -top-5 md:-right-10 md:-top-20">
              <LoveSvg className="h-[44px] w-[44px] md:h-[120px] md:w-[120px]" />
            </div>
            <div className="h-full max-h-[200px] w-full overflow-hidden rounded-[20px] md:max-h-[496px]">
              <Image
                src="https://res.cloudinary.com/dbhdpelno/image/upload/v1716997494/2e1367c63752fbedbb8fdadecee393b2_1_oo2pum.jpg"
                width={1200}
                height={496}
                alt="Image of a person holding a phone"
                className="w-full bg-no-repeat object-cover object-bottom md:object-center lg:h-[496px]"
              />
            </div>
            <div className="absolute -bottom-2 -left-4 md:-bottom-8 md:-left-8">
              <PinSvg className="h-[38px] w-[38px] md:h-[73px] md:w-[73px]" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Header;
