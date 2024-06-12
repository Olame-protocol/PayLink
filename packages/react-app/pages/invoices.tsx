import LinkCard from "@/components/ui/payLink/cards/LinkCard";
import Section from "../components/Section";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddClientForm from "@/components/AddClientForm";
import AddProductFrom from "@/components/AddProductFrom";

export type Tab = "fixed" | "global";

const tabList = ["Add client", "Add product", "Create invoice"];

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

export default function Invoices() {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("fixed");
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

  return (
    <Layout className="bg-green-petrolium">
      <Section className="mt-20 rounded-2xl bg-forest">
        <div className="flex justify-between gap-8 px-5 py-5 lg:px-36 lg:py-16">
          <div className="mx-auto w-full text-left">
            <div className="flex flex-col">
              <div className="mb-14 flex flex-col gap-5 max-md:mb-5 max-md:gap-2">
                <h2 className="text-xl font-black text-green-petrolium lg:text-[2.5rem]">Add a client</h2>
                <p className="font-normal text-white">Manage and track all your clients</p>
              </div>

              <div>
                <Tabs defaultValue={tabList[0].toLowerCase()}>
                  <TabsList className="mb-5 flex h-fit justify-start rounded-lg bg-white/[8%] p-3 text-lg max-md:overflow-x-auto lg:text-xl">
                    {tabList.map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab.toLowerCase()}
                        className="mr-4 rounded-lg px-4 py-2 text-base text-white data-[state=active]:bg-green-petrolium data-[state=active]:text-forest lg:px-12 lg:py-5"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value={tabList[0].toLowerCase()}>
                    <AddClientForm />
                  </TabsContent>
                  <TabsContent value={tabList[1].toLowerCase()}>
                    <AddProductFrom />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
