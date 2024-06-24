import { useCallback, useEffect, useState } from "react";
import { SupabaseLinksRecord, Tab } from "./payments";
import { truncateString } from "@/utils/utils";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BsCopy } from "react-icons/bs";
import { BsArrowUpRightSquare } from "react-icons/bs";
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
          <div className="mb-12 flex flex-col gap-5">
            <p className="text-xl font-black text-green-petrolium lg:text-[2.5rem]">Generated links</p>
            <p className="font-normal text-white">Generate payment links effortlessly and simplify transactions.</p>
          </div>

          <div className="mb-5 flex justify-start rounded-lg bg-white/[8%] p-4 text-base font-semibold">
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

          {links.map((link) => {
            return (
              <div key={link.id} className="flex justify-between gap-3 rounded-lg bg-white/5 px-4 py-6">
                <p className="text-velix-primary dark:text-velix-dark-white text-base text-green-petrolium underline">
                  {truncateString(`${origin}/payments/${link.payment_link_id}?type=${activeTab}`)}
                </p>
                <div className="flex gap-3 text-[#4E837F]">
                  {copied && `${origin}/payments/${link.payment_link_id}?type=${activeTab}`.toLowerCase() === copiedLink?.toLowerCase() ? (
                    <IoCheckmarkDoneSharp className="text-velix-primary dark:text-velix-icon-dark" size={24} />
                  ) : (
                    <BsCopy
                      role="button"
                      onClick={() => onCopyToClickboard(`${origin}/payments/${link.payment_link_id}?type=${activeTab}`)}
                      className="text-velix-primary dark:text-velix-icon-dark cursor-pointer"
                      size={22}
                    />
                  )}
                  <BsArrowUpRightSquare
                    onClick={() => onViewLink(`${origin}/payments/${link.payment_link_id}?type=${activeTab}`)}
                    role="button"
                    className="text-velix-primary dark:text-velix-icon-dark cursor-pointer"
                    size={22}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </Layout>
  );
}
