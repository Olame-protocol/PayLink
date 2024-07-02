import Layout from "@/components/Layout";
import Section from "@/components/Section";
import InvoiceList from "@/components/dashboard/InvoiceList";
import PaymentLinkList from "@/components/dashboard/PaymentLinks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { retrieveInvoicesByWalletAddress } from "@/utils/supabase";
import { DetailedInvoice } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const tabList = ["Invoice", "Payment link"];

export default function Dashboard() {
  const { address } = useAccount();
  const [invoiceOverallStatus, setInvoiceOverallStatus] = useState([
    {
      amount: 0,
      name: "Paid",
    },
    {
      amount: 0,
      name: "Pending",
    },
    {
      amount: 0,
      name: "Unpaid",
    },
  ]);

  const calculateOverallAmount = useCallback((accumulator: number, invoice: DetailedInvoice) => {
    return (accumulator + Number(invoice.amount)) * Number(invoice?.quantity ?? 1);
  }, []);

  useEffect(() => {
    if (!address) return;
    const fetchInvoices = async () => {
      const { data, error } = await retrieveInvoicesByWalletAddress(address);
      if (error) console.log({ error });
      const paidAmount = data?.filter((invoice) => invoice.paid === true).reduce(calculateOverallAmount, 0);
      const unpaidAmount = data?.filter((invoice) => invoice.paid === false && invoice.sent === true).reduce(calculateOverallAmount, 0);
      const pendingAmount = data?.filter((invoice) => invoice.paid === false && invoice.sent === false).reduce(calculateOverallAmount, 0);

      setInvoiceOverallStatus([
        {
          amount: paidAmount,
          name: "Paid",
        },
        {
          amount: pendingAmount,
          name: "Pending",
        },
        {
          amount: unpaidAmount,
          name: "Unpaid",
        },
      ]);
    };

    fetchInvoices();
  }, []);

  return (
    <Layout className="bg-green-petrolium">
      <Section className="mt-32 rounded-lg bg-forest px-36 py-16 max-md:px-5">
        <div className="mb-5 flex w-full items-center gap-2 overflow-x-auto rounded-lg bg-white/[8%] p-3">
          {invoiceOverallStatus.map((status, index) => (
            <div key={`status-${index}`} className="flex min-w-52 flex-col justify-start gap-2 rounded-lg bg-white/[2%] px-5 py-3 text-white">
              <p>{status.name}</p>
              <p className="text-2xl font-bold text-green-petrolium">
                {status.amount} <span className="text-base font-normal">cUSD</span>
              </p>
            </div>
          ))}
        </div>
        <Tabs defaultValue={tabList[0].toLowerCase()}>
          <TabsList className="mb-5 flex h-fit justify-start rounded-lg bg-white/[8%] p-3 text-lg max-md:overflow-x-auto lg:text-xl">
            {tabList.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="rounded-sm px-3 py-2 text-xs font-normal text-white data-[state=active]:bg-green-petrolium data-[state=active]:text-forest md:mr-4 md:rounded-lg md:text-base lg:px-12 lg:py-5"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={tabList[0].toLowerCase()}>
            <InvoiceList />
          </TabsContent>
          <TabsContent value={tabList[1].toLowerCase()}>
            <PaymentLinkList />
          </TabsContent>
        </Tabs>
      </Section>
    </Layout>
  );
}
