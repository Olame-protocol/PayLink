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
import ConnectWalletButton from "@/components/ui/payLink/ConnectWalletButton";

export default function Navbar() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();
  const { asPath, pathname } = useRouter();
  const isHome = pathname === "/";
  const menuItems = [
    { name: 'Payments', path: '/payments', icon: <WalletIcon /> },
    { name: 'Links', path: '/links', icon: <LinkIcon /> },
    { name: 'Invoices', path: '/invoices', icon: <PaperLineIcon /> },
    { name: 'Dashboard', path: '/#', icon: <ChartIcon /> },
  ];
  

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, [connect]);

  return (
    <Disclosure className={clsx(isHome ? "bg-forest" : "bg-green-petrolium", "fixed top-0 z-50 w-full !px-0")} as="nav">
      {({ open }) => (
        <>
              <Section>
      <div className="relative flex justify-between">
        <div className="flex justify-center gap-20 py-5 sm:items-stretch sm:justify-start lg:py-10">
          <Link href="/">
            <PayLinkLogo className={clsx(isHome ? 'text-green-petrolium' : 'text-forest', 'h-[45px] w-[171px] max-lg:w-[100px]')} />
          </Link>
          <div
            className={clsx(
              isHome
                ? 'hidden text-green-petrolium'
                : 'bottom-0 left-0 right-0 z-10 w-full bg-green-petrolium text-forest max-lg:justify-between max-lg:px-5 max-lg:py-4 max-md:fixed max-md:bg-[#C9F27E]',
              'flex items-center gap-10'
            )}
          >
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path} passHref>
                <p
                  className={clsx(
                    'inline-flex items-center gap-2 font-normal max-lg:flex max-lg:flex-col pb-2',
                    asPath === item.path ? 'font-extrabold border-b-8 rounded-lg border-[#0E3A36] ' : 'font-normal'
                  )}
                >
                  {item.icon}
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {isHome ? (
            <Link href="/payments" className="rounded-lg bg-white px-6 py-4 font-semibold text-forest">
              Launch app
            </Link>
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      </div>
    </Section>

          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col gap-3 space-y-1 pb-4 pt-2">
              <Disclosure.Button
                as="a"
                href="/payments"
                className={`inline-flex items-center border-l-4 py-2 pl-3 pr-4 text-base font-medium text-black ${
                  asPath.includes("/payments") ? "border-black" : "border-transparent"
                }`}
              >
                <BsFillSendFill className="mr-1" />
                Payments
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className={`inline-flex items-center border-l-4 py-2 pl-3 pr-4 text-base font-medium text-black ${
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
