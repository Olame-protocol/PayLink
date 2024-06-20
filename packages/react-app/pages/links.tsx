import { useCallback, useEffect, useState } from "react";
import { SupabaseLinksRecord, Tab } from "./payments";
import { truncateString } from "@/utils/utils";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { MdContentCopy, MdLaunch } from "react-icons/md";
import { retreivePaymentLinks } from "@/utils/supabase";
import { useAccount } from "wagmi";
import Layout from "@/components/Layout";
import Section from "@/components/Section";

export default function Links() {
  const [activeTab, setActiveTab] = useState<Tab>("fixed");
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState("");
  const { address } = useAccount();
  const [links, setLinks] = useState<SupabaseLinksRecord[]>([]);

  const retreiveGeneratedLinks = useCallback(async () => {
    if (!address) return;
    const { data } = await retreivePaymentLinks(activeTab, address);
    setLinks([...(data ? data.reverse() : [])]);
  }, [activeTab, address]);

  useEffect(() => {
    void retreiveGeneratedLinks();
  }, [retreiveGeneratedLinks]);

  const onSetActiveTab = (tabName: Tab) => {
    setActiveTab(tabName);
  };

  const onCopyToClickboard = async (link: string) => {
    setCopied(true);
    setCopiedLink(link);
    await navigator.clipboard.writeText(link);
    setTimeout(() => {
      setCopied(false);
      setCopiedLink("");
    }, 1500);
  };

  const onViewLink = (endPoint: string) => {
    window.open(`${endPoint}`);
  };

  return (
    <Layout className="bg-green-petrolium">
      <Section className="mt-32 min-h-96 rounded-2xl bg-forest px-5 py-5 lg:px-36 lg:py-16">
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-5">
            <p className="text-xl font-black text-green-petrolium lg:text-[2.5rem]">Generated links</p>
            <p className="font-normal text-white">Generate payment links effortlessly and simplify transactions.</p>
          </div>

          <div className="mt-10 flex justify-start rounded-lg bg-white/[8%] p-4 text-base font-semibold">
            <button
              className={`mr-4 rounded-lg px-4 py-2 lg:px-12 lg:py-5 ${activeTab === "fixed" ? "bg-green-petrolium text-forest" : "text-white"}`}
              onClick={() => onSetActiveTab("fixed")}
            >
              Fixed
            </button>
            <button
              className={`mr-4 rounded-lg px-4 py-2 lg:px-12 lg:py-5 ${activeTab === "global" ? "bg-green-petrolium text-forest" : "text-white"}`}
              onClick={() => onSetActiveTab("global")}
            >
              Global
            </button>
          </div>
          <div className="mt-10 flex flex-col gap-2">
            {links.map((link) => {
              return (
                <div key={link.id} className="boder-gray-400 flex justify-between gap-3 rounded-lg bg-white/[6%] px-4 py-5">
                  <p className="dark:text-velix-dark-white text-base text-blue-500 text-green-petrolium underline">
                    {truncateString(`${origin}/payments/${link.payment_link_id}?type=${activeTab}`)}
                  </p>
                  <div className="flex gap-2">
                    {copied && `${origin}/payments/${link.payment_link_id}?type=${activeTab}`.toLowerCase() === copiedLink?.toLowerCase() ? (
                      <IoCheckmarkDoneSharp className="dark:text-velix-icon-dark h-5 w-5 text-[#4E837F]" />
                    ) : (
                      <MdContentCopy
                        role="button"
                        onClick={() => onCopyToClickboard(`${origin}/payments/${link.payment_link_id}?type=${activeTab}`)}
                        className="dark:text-velix-icon-dark h-5 w-5 cursor-pointer text-[#4E837F]"
                      />
                    )}
                    <MdLaunch
                      onClick={() => onViewLink(`${origin}/payments/${link.payment_link_id}?type=${activeTab}`)}
                      role="button"
                      className="dark:text-velix-icon-dark h-5 w-5 cursor-pointer text-[#4E837F]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </Layout>
  );
}
