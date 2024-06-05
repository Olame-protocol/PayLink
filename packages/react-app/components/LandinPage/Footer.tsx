import React from "react";
import Section from "../Section";
import { FaXTwitter } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  //current year
  const currentYear = new Date().getFullYear();

  return (
    <Section>
      <div className="mt-[9rem] flex items-center justify-between rounded-t-[20px] bg-forest px-4 py-6 text-green-petrolium lg:px-10 lg:py-10">
        <div>
          <p className="flex items-center gap-x-1 text-[10px] lg:gap-x-2 lg:text-base">
            © 2023 - {currentYear} Paylink, for the{" "}
            <span>
              <svg className="h-2 w-2 lg:h-[12px] lg:w-[12px]" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.5588 1.37565C11.8682 2.13877 12.7894 3.68815 12.7488 5.49565C12.6625 9.31252 7.43754 12.125 6.50004 12.125C5.56254 12.125 0.336917 9.31252 0.251292 5.49565C0.210667 3.68815 1.13192 2.1394 2.44129 1.37565C3.66629 0.662521 5.20504 0.658146 6.50004 1.71127C7.79504 0.658146 9.33379 0.661896 10.5588 1.37565Z"
                  fill="#FF0000"
                />
              </svg>
            </span>{" "}
            of money sharing
          </p>
        </div>
        <div className="flex items-center gap-x-2 lg:gap-x-7">
          <div>
            <FaXTwitter className="lg:h-6 lg:w-6" />
          </div>
          <div>
            <BsGithub className="lg:h-6 lg:w-6" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
