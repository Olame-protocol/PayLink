import React from "react";
import Section from "../Section";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="mt-28 flex min-h-[85vh] w-full flex-col bg-forest max-md:mt-20 md:pb-[6rem]">
      <Section>
        <div className="mt-[62px] flex flex-col space-y-8 text-center md:space-y-14">
          <div>
            <h1 className="font-fontsprint text-[28px] font-bold uppercase text-white lg:text-[80px]">Linking the love of money transfer</h1>
          </div>
          <div>
            <p className="text-xs text-green-petrolium md:text-xl">Simplifying digital payments, one click at a time</p>
          </div>
          <div>
            <Link href="/payments" className="rounded-lg bg-white px-10 py-4 text-sm font-semibold text-forest md:text-xl">
              Generate a link
            </Link>
          </div>
          <img
            src="./TokenShare.svg"
            alt="Image of a person holding a phone"
            className="mx-auto w-full bg-no-repeat object-cover object-bottom pt-[50px] md:mt-0 md:w-2/4 md:object-center"
          />
        </div>
      </Section>
    </div>
  );
};

export default Header;
