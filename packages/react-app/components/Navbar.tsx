import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { BsFillSendFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";
import { useRouter } from "next/router";
import Link from "next/link";
import PayLinkLogo from "./ui/payLink/icons/PayLinkLogo";
import WalletIcon from "./ui/payLink/icons/WalletIcon";
import PaperLineIcon from "./ui/payLink/icons/PaperLineIcon";
import LinkIcon from "./ui/payLink/icons/LinkIcon";
import ChartIcon from "./ui/payLink/icons/ChartIcon";
import Section from "./Section";
import clsx from "clsx";

export default function Navbar() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();
  const { asPath, pathname } = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, [connect]);

  return (
    <Disclosure className={clsx(isHome ? "bg-forest" : "bg-green-petrolium", "!px-0 top-0 w-full")} as="nav">
      {({ open }) => (
        <>
          <Section>
            <div className="relative flex justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              <div className="flex justify-center py-10 gap-20 sm:items-stretch sm:justify-start">
                <Link href="/">
                  <PayLinkLogo className={clsx(isHome ? "text-green-petrolium" : "text-forest")} />
                </Link>

                <div className={clsx(isHome ? "text-green-petrolium" : "text-forest", "flex items-center gap-10")}>
                  <Link href="/payments" className="inline-flex items-center gap-2 font-normal">
                    <WalletIcon />
                    Payments
                  </Link>
                  <Link href="/links" className="inline-flex items-center gap-2 font-normal">
                    <LinkIcon />
                    Links
                  </Link>

                  <Link href="/links" className="inline-flex items-center gap-2 font-normal">
                    <PaperLineIcon />
                    Invoices
                  </Link>

                  <Link href="/links" className="inline-flex items-center gap-2 font-normal">
                    <ChartIcon />
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isHome ? (
                  <button className="px-6 py-4 bg-white text-forest font-semibold rounded-lg">Connect Wallet</button>
                ) : (
                  <button className="p-4 bg-forest text-green-petrolium font-semibold rounded-lg">Connect Wallet</button>
                )}
              </div>
            </div>
          </Section>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4 flex flex-col gap-3">
              <Disclosure.Button
                as="a"
                href="/payments"
                className={`border-l-4 inline-flex items-center  py-2 pl-3 pr-4 text-base font-medium text-black ${
                  asPath.includes("/payments") ? "border-black" : "border-transparent"
                }`}
              >
                <BsFillSendFill className="mr-1" />
                Payments
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/links"
                className={`border-l-4 inline-flex items-center  py-2 pl-3 pr-4 text-base font-medium text-black ${
                  asPath.includes("/links") ? "border-black" : "border-transparent"
                }`}
              >
                <FaLink className="mr-1" />
                Links
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
