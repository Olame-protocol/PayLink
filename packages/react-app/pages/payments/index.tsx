import Section from "../../components/Section";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useCreatePaymentLink, usecUSDBalance } from "@/hooks/usePaylink";
import { ulid } from "ulid";
import { MouseEvent } from "react";
import { useApproveERC20Transaction } from "@/hooks/useErc20";
import { retreivePaymentLinks } from "@/utils/supabase";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import Layout from "@/components/Layout";
import { useBalanceStore } from "@/store/balanceState";
import { parseUnits } from "ethers";
import { Ambulance } from "lucide-react";

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
  const { approveER20, isPending: ERC20ApprovalPending, isSuccess: ERC20ApprovalSuccess, error } = useApproveERC20Transaction();
  const { address } = useAccount();
  const [origin, setOrigin] = useState("");
  const [linkCharge, setLinkCharge] = useState("");
  const { getBalances } = usecUSDBalance();
  const { cUSDBalance } = useBalanceStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const onFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "amount") {
      const charge = ((Number(value) * 5) / 100).toFixed(1);
      setLinkCharge(charge);

      if (Number(charge) > Number(cUSDBalance)) {
        setErrorMessage(`The link fee (${charge}) exceeds your balance`);
      } else {
        setErrorMessage(null);
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const cleanUpFormData = () => {
    setFormData({ description: "", amount: "" });
    setErrorMessage(null);
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
    try {
      if (type === "global" && !formData.description) return setErrorMessage("Enter purpose");
      else if ((type === "fixed" && formData.amount.length === 0) || formData.description.length === 0) return setErrorMessage("All inputs are required");
      else {
        await approveER20(type === "global" ? "2" : linkCharge);
        await createPaymentLink(type, {
          amount: formData.amount,
          description: formData.description,
          paymentLinkId: ulid(),
        });
        await retreiveGeneratedLinks();
        toast.success("Link generated successfully");
        cleanUpFormData();
      }
    } catch (err) {
      toast.error("Failed to generate a link");
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
      <Section className="mb-24 mt-24 rounded-lg bg-forest lg:mt-32">
        <div className="flex justify-between gap-8 px-5 py-5 lg:px-36 lg:py-16">
          <div className="mx-auto w-full text-left">
            <div className="flex flex-col">
              <div className="mb-14 flex flex-col gap-5">
                <h2 className="text-xl font-semibold text-green-petrolium md:font-black lg:text-[2.5rem]">Create a payment link</h2>
                <p className="-mt-3 text-sm font-thin text-white md:-mt-0 md:text-base md:font-normal">Generate payment links effortlessly and simplify transactions.</p>
              </div>

              <div className="-mt-7 mb-4 flex justify-start rounded-md bg-white/[8%] p-2 py-3 text-base font-semibold md:-mt-0 md:p-4 lg:mb-5">
                <button
                  className={`mr-4 rounded-sm px-3 py-2 text-xs font-normal md:text-base lg:px-12 lg:py-5 ${activeTab === "fixed" ? "bg-green-petrolium text-forest" : "text-white"}`}
                  onClick={() => onSetActiveTab("fixed")}
                >
                  Fixed
                </button>
                <button
                  className={`mr-4 rounded-sm px-4 py-2 text-xs font-normal md:text-base lg:px-12 lg:py-5 ${activeTab === "global" ? "bg-green-petrolium text-forest" : "text-white"}`}
                  onClick={() => onSetActiveTab("global")}
                >
                  Global
                </button>
              </div>
              {activeTab === "fixed" && (
                <>
                  <form className="flex flex-col gap-5 py-2">
                    <div className="-mb-1.5 flex w-full flex-row gap-3 max-md:flex-col md:mb-2 md:gap-6">
                      <input
                        required={true}
                        type="text"
                        value={formData.description}
                        name="description"
                        onChange={onFormInputChange}
                        placeholder="What's your service"
                        className="w-full rounded-md bg-white/5 px-5 py-4 text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
                      />
                      <input
                        required
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={onFormInputChange}
                        placeholder="0.0cUSD"
                        min={1}
                        className={`w-5/5 rounded-md bg-white/5 px-5 py-4 text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base ${!errorMessage?.startsWith("All") ? "" : "border-2 border-red-600"}`}
                      />
                    </div>
                    {errorMessage && <div className="font-space-grotesk -mt-3 w-fit rounded-md bg-red-600 px-2 py-1 text-sm text-white">{errorMessage}</div>}
                    <button
                      disabled={Number(linkCharge) > Number(cUSDBalance)}
                      onClick={(e) => onGeneratePaymentLink(e, "fixed")}
                      className="w-full rounded-md bg-white px-5 py-4 text-xs text-forest lg:py-7 lg:text-lg lg:font-medium"
                    >
                      {buttonTitle()}
                    </button>
                  </form>
                </>
              )}
              {activeTab === "global" && (
                <>
                  <form className="md:mb- flex flex-col gap-3 py-2 md:mb-2 md:gap-6">
                    <input
                      required
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={onFormInputChange}
                      placeholder="Purpose"
                      className="w-full rounded-md bg-white/5 px-5 py-4 text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
                    />
                    <button
                      onClick={(e) => onGeneratePaymentLink(e, "global")}
                      className="w-full rounded-md bg-white px-5 py-4 text-xs text-forest lg:py-7 lg:text-lg lg:font-medium"
                    >
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
