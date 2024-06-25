import React, { ReactNode, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { deleteInvoice, retreiveInvoiceByInvoiceId, updateInvoiceSentStatus } from "@/utils/supabase";
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
import { useRouter } from "next/router";

function InvoiceSectionWrapper({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("border-b border-white/[6%] px-10 py-10 max-md:px-5", className)}>{children}</div>;
}

function Invoice({ invoice }: { invoice: DetailedInvoice }) {
  const { address } = useAccount();
  const { createInvoice, isPending } = useCreateInvoice();
  const { approveER20, isPending: approveErc20Pending } = useApproveERC20Transaction();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const router = useRouter();

  const onSendInvoice = async () => {
    try {
      const charge = ((Number(invoice.amount) * 5) / 100).toFixed(1);
      await approveER20(charge);
      await createInvoice(invoice.id, invoice.product.id, invoice.amount);
      setIsSendingEmail(true);
      await fetch("/api/sendMail", {
        method: "POST",
        body: JSON.stringify({ invoice: { ...invoice, invoicePaymentLink: `${origin}/invoices/${invoice.id}/payment` } }),
      });
      await updateInvoiceSentStatus(invoice.id);
      router.reload();
      toast.success("Invoice created successfully");
    } catch (err: any) {
      if (err.message.includes("_invoiceId already exists")) {
        toast.error("Invoice ID already exists.");
      } else {
        toast.error("Error while processing the transaction");
      }
      console.log(err);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const buttonTitle = () => {
    if (approveErc20Pending) return "Pending Approval...";
    if (isPending) return "Creating invoice...";
    if (isSendingEmail) return "Sending Email...";
    return "Send Invoice";
  };

  const oncancelInvoice = async () => {
    setIsCanceling(true);
    await deleteInvoice(invoice.id);
    setIsCanceling(false);
    router.replace("/invoices");
  };

  return (
    <Layout className="bg-green-petrolium">
      <Section className="my-32 min-h-96 rounded-2xl bg-forest px-5 py-5 lg:px-36 lg:py-16">
        <div className="rounded-lg bg-white/[8%]">
          <InvoiceSectionWrapper className="flex items-center justify-between max-md:flex-col max-md:items-start">
            <Image src={invoice.branding.image} alt={invoice.branding.name} width={100} height={100} className="rounded-md" />
            <div className="flex flex-col gap-2 max-md:mt-4">
              <h1 className="md: font-seminbold text-lg font-medium text-white max-md:text-2xl">{invoice.branding.name}</h1>
              <p className="text-xs text-green-petrolium md:text-base">{invoice.branding.contact}</p>
              <p className="text-xs text-green-petrolium md:text-base">{invoice.branding.address}</p>
            </div>
          </InvoiceSectionWrapper>
          <InvoiceSectionWrapper className="flex flex-col gap-7">
            <div className="flex flex-col gap-1 leading-4">
              <p className="mb-4 text-sm text-white">Bill to:</p>
              <p className="text-sm font-medium text-green-petrolium md:font-semibold">{invoice.client.name}</p>
              {invoice.client.phone.length > 4 && <p className="text-sm text-green-petrolium">{invoice.client.phone}</p>}
              <p className="text-sm text-green-petrolium">
                {invoice.client.email}, {invoice.client.service}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-sm leading-4 text-green-petrolium">
              <p className="text-sm">
                <span className="font-medium md:font-semibold">Invoice date:</span> {invoice.created_at.split("T")[0]}
              </p>
              <p className="text-sm">
                <span className="font-medium md:font-semibold">Payment due:</span> {invoice.due_date.split("T")[0]}
              </p>
              <p className="text-xs md:text-base">
                <span className="font-medium md:font-semibold">Invoice description:</span> {invoice.product.description}
              </p>
            </div>
          </InvoiceSectionWrapper>
          <InvoiceSectionWrapper className="flex flex-col gap-1 leading-4 text-green-petrolium">
            <p className="text-xs md:text-base">
              <span className="font-medium md:font-semibold">Item:</span> {invoice.product.name}
            </p>
            <p className="text-xs md:text-base">
              <span className="font-medium md:font-semibold">Price:</span> {invoice.product.price}
            </p>
            <p className="text-xs md:text-base">
              <span className="font-medium md:font-semibold">Quantity:</span> {invoice.quantity}
            </p>
          </InvoiceSectionWrapper>
          <InvoiceSectionWrapper className="flex flex-col justify-between border-none bg-green-petrolium text-forest">
            <a className="text-xs font-thin md:text-base" href={`${typeof origin !== "undefined" ? origin : ""}/invoices/${invoice.id}/payment`}>
              <span className="font-medium md:font-semibold">Payment link:</span> {invoice.id}
            </a>
            <p className="md:text-basefont-thin text-xs">
              <span className="font-medium md:font-semibold">Wallet address:</span> {address}
            </p>
          </InvoiceSectionWrapper>
          <InvoiceSectionWrapper className="flex items-center justify-between rounded-b-lg border-none bg-[#C2FD83] text-forest">
            <p>{invoice.paid ? "Amount paid" : "Amount to be paid"}</p>
            <p className="text-4xl font-bold">
              {invoice.amount} <small className="text-sm font-normal">cUSD</small>
            </p>
          </InvoiceSectionWrapper>
        </div>
        {!invoice.paid ? (
          <div className="mt-10 flex gap-5">
            <Button
              onClick={onSendInvoice}
              disabled={invoice.sent || approveErc20Pending || isPending || isSendingEmail}
              className="w-full bg-white py-6 text-base text-forest hover:bg-white hover:text-forest"
            >
              {buttonTitle()}
            </Button>
            <Button
              onClick={oncancelInvoice}
              disabled={isPending || approveErc20Pending || isSendingEmail || invoice.sent}
              className="w-full bg-transparent py-6 text-base text-white hover:bg-transparent hover:text-white"
              variant="outline"
            >
              {isCanceling ? "Canceling..." : "Cancel"}
            </Button>
          </div>
        ) : (
          <div className="mt-2 w-full rounded-md bg-green-600 py-6 text-center text-base text-white">Invoice paid</div>
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
