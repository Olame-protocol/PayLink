import React, { ReactNode } from "react";
import { GetServerSidePropsContext } from "next";
import { retreiveInvoiceByInvoiceId } from "@/utils/supabase";
import { DetailedInvoice } from "@/utils/types";
import Section from "@/components/Section";
import Layout from "@/components/Layout";
import Image from "next/image";
import { cn } from "@/utils/utils";

function InvoiceSectionWrapper({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("border-b border-white/[6%] px-10 py-10", className)}>{children}</div>;
}

function Invoice({ invoice }: { invoice: DetailedInvoice }) {
  console.log({ invoice });
  return (
    <Layout className="bg-green-petrolium">
      <Section className="mt-32 min-h-96 rounded-2xl bg-forest px-5 py-5 lg:px-36 lg:py-16">
        <div className="rounded-lg bg-white/[8%]">
          <InvoiceSectionWrapper className="flex items-center justify-between">
            <Image src={invoice.branding.image} alt={invoice.branding.name} width={100} height={100} className="rounded-md" />
            <div className="flex flex-col gap-2">
              <h1 className="font-seminbold text-4xl text-white">{invoice.branding.name}</h1>
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
                <span className="font-semibold">Invoice date:</span> {(invoice as any)?.["created_at"].split("T")[0]}
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
          <InvoiceSectionWrapper className="flex items-center justify-between rounded-b border-none bg-green-petrolium text-forest">
            <p>Amount to be paid</p>
            <p className="text-4xl font-bold">
              {invoice.amount} <small className="text-sm font-normal">cUSD</small>
            </p>
          </InvoiceSectionWrapper>
        </div>
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
