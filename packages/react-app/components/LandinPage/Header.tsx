import React from "react";
import Section from "../Section";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="mt-28 flex min-h-[85vh] w-full flex-col bg-forest pb-[6rem] max-md:mt-20">
      <Section>
        <div className="mt-[62px] flex flex-col space-y-8 text-center md:mt-[126px] md:space-y-14">
          <div>
            <h1 className="font-fontsprint text-[26px] font-bold uppercase text-white lg:text-[80px]">Linking the love of money transfer</h1>
          </div>
          <div>
            <p className="text-xs text-green-petrolium md:text-2xl">Simplifying digital payments, one click at a time</p>
          </div>
          <div>
            <Link href="/payments" className="rounded-lg bg-white px-10 py-4 text-sm font-semibold text-forest md:text-xl">
              Generate a link
            </Link>
          </div>
              <Image
                src="./TokenShare.svg"
                width={1200}
                height={600}
                alt="Image of a person holding a phone"
                className="w-full bg-no-repeat object-cover object-bottom md:object-center"
              />
        </div>
      </Section>
    </div>
  );
};

export default Header;
