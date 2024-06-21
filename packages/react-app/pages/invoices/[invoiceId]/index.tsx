import React, { ReactNode } from "react";
import { GetServerSidePropsContext } from "next";
import { retreiveInvoiceByInvoiceId } from "@/utils/supabase";
import { DetailedInvoice } from "@/utils/types";
import Section from "@/components/Section";
import Layout from "@/components/Layout";
import Image from "next/image";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useCreateInvoice } from "@/hooks/usePaylink";
import { useApproveERC20Transaction } from "@/hooks/useErc20";
import toast from "react-hot-toast";
import { FRONTEND_URL } from "@/utils/const";

function InvoiceSectionWrapper({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("border-b border-white/[6%] px-10 py-10 max-md:px-5", className)}>{children}</div>;
}

function Invoice({ invoice }: { invoice: DetailedInvoice }) {
  const { address } = useAccount();
  const { createInvoice, isPending } = useCreateInvoice();
  const { approveER20, isPending: approveErc20Pending } = useApproveERC20Transaction();

  const onSendInvoice = async () => {
    try {
      const charge = ((Number(invoice.amount) * 5) / 100).toFixed(1);
      await approveER20(charge);
      await createInvoice(invoice.id, invoice.product.id, invoice.amount);
      toast.success("Invoice created successfully");
    } catch (err: any) {
      if (err.message.includes("_invoiceId already exists")) {
        toast.error("Invoice ID already exists.");
      } else {
        toast.error("Error while processing the transaction");
      }
      console.log(err);
    }
  };

  const buttonTitle = () => {
    if (approveErc20Pending) return "Pending Approval...";
    if (isPending) return " Creating invoice...";
    return "Send Invoice";
  };
  return (
    <Layout className="bg-green-petrolium">
      <Section className="my-32 min-h-96 rounded-2xl bg-forest px-5 py-5 lg:px-36 lg:py-16">
        <div className="rounded-lg bg-white/[8%]">
          <InvoiceSectionWrapper className="flex items-center justify-between max-md:flex-col max-md:items-start">
            <Image src={invoice.branding.image} alt={invoice.branding.name} width={100} height={100} className="rounded-md" />
            <div className="flex flex-col gap-2 max-md:mt-4">
              <h1 className="font-seminbold text-4xl text-white max-md:text-2xl">{invoice.branding.name}</h1>
              <p className="text-green-petrolium">{invoice.branding.contact}</p>
              <p className="text-green-petrolium">{invoice.branding.address}</p>
            </div>
          </InvoiceSectionWrapper>
          <InvoiceSectionWrapper className="flex flex-col gap-7">
            <div className="flex flex-col gap-1 leading-4">
              <p className="mb-4 text-white">Bill to:</p>
              <p className="font-semibold text-green-petrolium">{invoice.client.name}</p>
              {invoice.client.phone.length > 4 && <p className="text-green-petrolium">{invoice.client.phone}</p>}
              <p className="text-green-petrolium">
                {invoice.client.email}, {invoice.client.service}
              </p>
            </div>
            <div className="flex flex-col gap-1 leading-4 text-green-petrolium">
              <p>
                <span className="font-semibold">Invoice date:</span> {invoice.created_at.split("T")[0]}
              </p>
              <p>
                <span className="font-semibold">Payment due:</span> {invoice.due_date.split("T")[0]}
              </p>
              <p>
                <span className="font-semibold">Invoice description:</span> {invoice.product.description}
              </p>
            </div>
          </InvoiceSectionWrapper>
          <InvoiceSectionWrapper className="flex flex-col gap-1 leading-4 text-green-petrolium">
            <p>
              <span className="font-semibold">Item:</span> {invoice.product.name}
            </p>
            <p>
              <span className="font-semibold">Price:</span> {invoice.product.price}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {invoice.quantity}
            </p>
          </InvoiceSectionWrapper>
          <InvoiceSectionWrapper className="flex flex-col justify-between border-none bg-green-petrolium text-forest">
            <a href={`${FRONTEND_URL}invoices/${invoice.id}/payment`}>
              <span className="font-semibold">Payment link:</span> {`${invoice.id}`}
            </a>
            <p>
              <span className="font-semibold">Wallet address:</span> {address}
            </p>
          </InvoiceSectionWrapper>
          <InvoiceSectionWrapper className="flex items-center justify-between rounded-b-lg border-none bg-[#C2FD83] text-forest">
            <p>{invoice.paid ? "Amount paid" : "Amount to be paid"}</p>
            <p className="text-4xl font-bold">
              {invoice.amount} <small className="text-sm font-normal">cUSD</small>
            </p>
          </InvoiceSectionWrapper>
        </div>
        {!invoice.paid && (
          <div className="mt-10 flex gap-5">
            <Button
              onClick={onSendInvoice}
              disabled={invoice.sent || approveErc20Pending || isPending}
              className="w-full bg-white py-6 text-base text-forest hover:bg-white hover:text-forest"
            >
              {buttonTitle()}
            </Button>
            <Button disabled={isPending || approveErc20Pending} className="w-full bg-transparent py-6 text-base text-white hover:bg-transparent hover:text-white" variant="outline">
              Cancel
            </Button>
          </div>
        )}
      </Section>
    </Layout>
  );
}

export default Invoice;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const invoiceId = context.params?.["invoiceId"];
  if (!invoiceId) {
    return {
      redirect: {
        permanent: false,
        destination: "/invoices",
      },
    };
  }

  const { data } = await retreiveInvoiceByInvoiceId(invoiceId as string);
  if (!data) {
    // TODO: Should redirect to 404 page
    return {
      redirect: {
        permanent: false,
        destination: "/invoices",
      },
    };
  }

  return {
    props: {
      invoice: data[0],
    },
  };
};
