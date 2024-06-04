import LinkCard from "@/components/ui/payLink/cards/LinkCard";
import Section from "../../components/Section";
import Copy from "@/components/ui/payLink/icons/Copy";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { truncateString } from "@/utils/utils";
import { useCreatePaymentLink } from "@/hooks/useGlobalPayment";
import { ulid } from "ulid";
import { MouseEvent } from "react";
import { useApproveERC20Transaction } from "@/hooks/useErc20";
import { format } from "path";
import { retreivePaymentLinks } from "@/utils/supabase";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Layout from "@/components/Layout";

export type Tab = "fixed" | "global";
type Tab2 = "Paid" | "Unpaid";

export type SupabaseLinksRecord = {
  amount?: string;
  description: string;
  created_at: string;
  has_expired: boolean;
  id: number;
  owner: string;
  payment_link_id: string;
  transaction_hash: string;
};

export default function Payments() {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("fixed");
  const [activeLinkTab, setActiveLinkTab] = useState<Tab2>("Paid");
  const generatedLink = "https://react-icons.github.io/react-icons/search/#q=dash";
  const { createPaymentLink, isPending } = useCreatePaymentLink();
  const { approveER20, isPending: ERC20ApprovalPending, isSuccess: ERC20ApprovalSuccess } = useApproveERC20Transaction();
  const { address } = useAccount();
  const [origin, setOrigin] = useState("");

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
  });
  const [recentyGeneratedLinks, setRecentyGeneratedLinks] = useState<SupabaseLinksRecord[]>([]);

  const retreiveGeneratedLinks = useCallback(async () => {
    if (!address) return;
    const { data } = await retreivePaymentLinks(activeTab, address);
    setRecentyGeneratedLinks([...(data ? data.slice(0, 4).reverse() : [])]);
  }, [activeTab, address]);

  useEffect(() => {
    void retreiveGeneratedLinks();
  }, [retreiveGeneratedLinks]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const onFormtInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const cleanUpFormData = () => {
    setFormData({ description: "", amount: "" });
  };

  const onSetActiveTab = (tabName: Tab) => {
    setActiveTab(tabName);
    cleanUpFormData();
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

  const onGeneratePaymentLink = async (e: MouseEvent<HTMLButtonElement>, type: "global" | "fixed") => {
    e.preventDefault();
    if (type === "global" && !formData.description) return;
    if (type === "fixed" && !formData.amount && !formData.description) return;

    try {
      await approveER20(type === "global" ? "2" : ((Number(formData.amount) * 10) / 100).toFixed(1));
      await createPaymentLink(type, {
        amount: formData.amount,
        description: formData.description,
        paymentLinkId: ulid(),
      });
      await retreiveGeneratedLinks();
      toast.success("Link generated successfully");
    } catch (err) {
      toast.error("Failed to generate a link");
    } finally {
      cleanUpFormData();
    }
  };

  const buttonTitle = () => {
    if (ERC20ApprovalPending) return "Pending Approval...";
    if (isPending) return "Generating Link...";
    return "Generate Link";
  };

  return (
    <Layout>
      <Section className="bg-forest rounded-2xl mt-20">
        <div className="flex justify-between gap-8 lg:px-36 px-5 py-5 lg:py-16">
          <div className="text-left w-full mx-auto">
            <div className="flex flex-col">
              <div className="flex flex-col gap-5 mb-14">
                <h2 className="font-black text-green-petrolium text-xl lg:text-[2.5rem]">Create a payment link</h2>
                <p className="text-white font-normal">Generate payment links effortlessly and simplify transactions.</p>
              </div>

              <div className="flex justify-start bg-white/[8%] p-4 rounded-lg text-lg lg:text-xl mb-5">
                <button
                  className={`lg:py-5 py-2 px-4 lg:px-12 rounded-lg mr-4 ${activeTab === "fixed" ? "bg-green-petrolium text-forest" : "text-white"}`}
                  onClick={() => onSetActiveTab("fixed")}
                >
                  Fixed
                </button>
                <button
                  className={`lg:py-5 py-2 px-4 lg:px-12 rounded-lg mr-4  ${activeTab === "global" ? "bg-green-petrolium text-forest" : "text-white"}`}
                  onClick={() => onSetActiveTab("global")}
                >
                  Global
                </button>
              </div>
              {activeTab === "fixed" && (
                <>
                  <form className="flex flex-col gap-5 py-2">
                    <div className="flex flex-row max-md:flex-col gap-5 w-full">
                      <input
                        type="text"
                        value={formData.description}
                        name="description"
                        onChange={onFormtInputChange}
                        placeholder="Service"
                        className="outline-none px-5 rounded-lg w-full text-white py-8 bg-white/30"
                      />
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={onFormtInputChange}
                        placeholder="0.0cUSD"
                        className="w-5/5 outline-none py-3 px-4 rounded-lg text-white bg-white/30"
                      />
                    </div>
                    <button onClick={(e) => onGeneratePaymentLink(e, "fixed")} className="bg-white text-forest py-5 lg:py-8 w-full px-5 rounded-lg font-medium text-lg">
                      {buttonTitle()}
                    </button>
                  </form>
                </>
              )}
              {activeTab === "global" && (
                <>
                  <form className="flex flex-col gap-5 py-2">
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={onFormtInputChange}
                      placeholder="Purpose"
                      className="outline-none text-white py-8 bg-white/30 px-5 rounded-lg"
                    />
                    <button onClick={(e) => onGeneratePaymentLink(e, "global")} className="bg-white text-forest py-5 lg:py-8 w-full px-5 rounded-lg font-medium text-lg">
                      {buttonTitle()}
                    </button>
                  </form>
                </>
              )}
              {/* <p className="text-2xl mb-2">Recently generated links</p> */}
              {/* {recentyGeneratedLinks.map((link) => {
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
                      generatedLink?.toLowerCase() ===
                        copiedLink?.toLowerCase() ? (
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
              })} */}
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
