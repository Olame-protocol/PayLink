import React from "react";
import Section from "../Section";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  //current year
  const currentYear = new Date().getFullYear();

  return (
    <Section>
      <div className="mt-[9rem] flex items-center justify-between rounded-t-[20px] bg-forest px-4 py-6 text-green-petrolium lg:px-10 lg:py-10">
        <div>
          <p className="flex items-center gap-x-1 text-[10px] lg:gap-x-2 lg:text-base">© 2023 - {currentYear} Paylink</p>
        </div>
        <div className="flex items-center gap-x-2 lg:gap-x-7">
          <a className="cursor-pointer" href="https://t.me/+cGsrC65Rkqo5OWI0" target="_blank">
            <FaTelegram className="lg:h-6 lg:w-6" />
          </a>
          <a className="cursor-pointer" href="https://x.com/paylinkme" target="_blank">
            <FaXTwitter className="lg:h-6 lg:w-6" />
          </a>
          <a className="cursor-pointer" href="/">
            <BsGithub className="lg:h-6 lg:w-6" />
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
