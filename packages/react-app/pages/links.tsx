import { useCallback, useEffect, useState } from "react";
import { SupabaseLinksRecord, Tab } from "./payments";
import { truncateString } from "@/utils/utils";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Copy from "@/components/ui/payLink/icons/Copy";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { retreivePaymentLinks } from "@/utils/supabase";
import { useAccount } from "wagmi";

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
    <div className="lg:w-1/2 mx-auto px-5">
      <div className="flex justify-start mb-4">
        <button
          className={`px-4 py-2 mr-4 text-base font-semibold rounded ${
            activeTab === "fixed"
              ? "bg-blue-500 text-gray-50 "
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onSetActiveTab("fixed")}
        >
          Fixed
        </button>
        <button
          className={`px-4 py-2 mr-4 text-base font-semibold rounded  ${
            activeTab === "global"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onSetActiveTab("global")}
        >
          Global
        </button>
      </div>

      <div className="flex flex-col gap-2 w-full mt-10">
        <p className="text-2xl mb-7">Generated links</p>
        {links.map((link) => {
          return (
            <div
              key={link.id}
              className="flex gap-3 py-3 px-4 rounded-lg border-2 boder-gray-400 justify-between"
            >
              <p className="text-velix-primary dark:text-velix-dark-white text-blue-500 text-base underline">
                {truncateString(
                  `${origin}/payments/${link.payment_link_id}?type=${activeTab}`
                )}
              </p>
              <div className="flex gap-2">
                {copied &&
                `${origin}/payments/${link.payment_link_id}?type=${activeTab}`.toLowerCase() ===
                  copiedLink.toLowerCase() ? (
                  <IoCheckmarkDoneSharp className="text-velix-primary w-5 h-5 dark:text-velix-icon-dark" />
                ) : (
                  <Copy
                    role="button"
                    onClick={() =>
                      onCopyToClickboard(
                        `${origin}/payments/${link.payment_link_id}?type=${activeTab}`
                      )
                    }
                    className="text-velix-primary w-5 h-5 cursor-pointer dark:text-velix-icon-dark"
                  />
                )}
                <FaArrowUpRightFromSquare
                  onClick={() =>
                    onViewLink(
                      `${origin}/payments/${link.payment_link_id}?type=${activeTab}`
                    )
                  }
                  role="button"
                  className="text-velix-primary w-5 h-5 cursor-pointer dark:text-velix-icon-dark"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
