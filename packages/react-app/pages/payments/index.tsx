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
    <Layout className="bg-green-petrolium">
      <Section className="mb-24 mt-32 rounded-2xl bg-forest">
        <div className="flex justify-between gap-8 px-5 py-5 lg:px-36 lg:py-16">
          <div className="mx-auto w-full text-left">
            <div className="flex flex-col">
              <div className="mb-14 flex flex-col gap-5">
                <h2 className="text-xl font-black text-green-petrolium lg:text-[2.5rem]">Create a payment link</h2>
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
              {activeTab === "fixed" && (
                <>
                  <form className="flex flex-col gap-5 py-2">
                    <div className="flex w-full flex-row gap-5 max-md:flex-col">
                      <input
                        type="text"
                        value={formData.description}
                        name="description"
                        onChange={onFormtInputChange}
                        placeholder="Service"
                        className="w-full rounded-lg bg-white/30 px-5 py-8 text-white outline-none"
                      />
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={onFormtInputChange}
                        placeholder="0.0cUSD"
                        className="w-5/5 rounded-lg bg-white/30 px-4 py-3 text-white outline-none"
                      />
                    </div>
                    <button onClick={(e) => onGeneratePaymentLink(e, "fixed")} className="w-full rounded-lg bg-white px-5 py-5 text-lg font-medium text-forest lg:py-8">
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
                      className="rounded-lg bg-white/30 px-5 py-8 text-white outline-none"
                    />
                    <button onClick={(e) => onGeneratePaymentLink(e, "global")} className="w-full rounded-lg bg-white px-5 py-5 text-lg font-medium text-forest lg:py-8">
                      {buttonTitle()}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
