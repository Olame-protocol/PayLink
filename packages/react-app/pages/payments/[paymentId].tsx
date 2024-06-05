import { retreivePaymentLinksById } from "@/utils/supabase";
import { GetServerSidePropsContext } from "next";
import React, { useState, MouseEvent } from "react";
import { SupabaseLinksRecord } from ".";
import Section from "@/components/Section";
import { useApproveERC20Transaction } from "@/hooks/useErc20";
import toast from "react-hot-toast";
import { useSendPayment } from "@/hooks/useGlobalPayment";
import Layout from "@/components/Layout";

const PaymentIdPage = ({ link, type }: { link: SupabaseLinksRecord; type: "fixed" | "global" }) => {
  const [amount, setAmount] = useState("");
  const { approveER20, isPending } = useApproveERC20Transaction();
  const { transfer, isPending: transferPending } = useSendPayment();

  const onSendERC20 = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (type === "fixed" && !link?.amount) return;
    if (type === "global" && !amount) return;

    try {
      const amountToSend = type === "fixed" ? link.amount ?? "" : amount;
      await approveER20(amountToSend);
      await transfer(amountToSend, link.owner as `0x${string}`, type, link.payment_link_id);
      toast.success(`${amountToSend} cUSD transferred successfully`);
    } catch {
      toast.error("Transaction failed");
    } finally {
      setAmount("");
    }
  };

  const buttonTitle = () => {
    if (isPending) return "Pending Approval...";
    if (transferPending) return "Transfer in process...";
    return "Transfer";
  };

  return (
    <Layout>
      <Section>
        <form className="flex flex-col gap-2 py-2">
          <div className="mx-auto flex w-full flex-col gap-2 px-5 lg:w-1/2">
            <input
              type="number"
              name="amount"
              readOnly={type === "fixed"}
              value={type === "fixed" ? link?.amount : amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0cUSD"
              className="w-5/5 boder-gray-400 rounded-lg border-2 px-4 py-3 outline-none"
            />
            <button onClick={(e) => onSendERC20(e)} className="rounded-lg bg-prosperity px-4 py-3 text-lg font-medium text-gray-900">
              {buttonTitle()}
            </button>
          </div>
        </form>
      </Section>
    </Layout>
  );
};

export default PaymentIdPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const params = ctx.params;
  const queryParams = ctx.query;
  const paymentId = params?.["paymentId"] as string;
  const type = queryParams?.["type"] as string;

  if (!paymentId || !type) {
    return {
      redirect: {
        destination: "/payments",
      },
    };
  }

  if (type !== "global" && type !== "fixed") {
    return {
      redirect: {
        destination: "/payments",
      },
    };
  }

  const result = await retreivePaymentLinksById(paymentId, type);

  if (result.error) {
    return {
      redirect: {
        destination: "/payments",
      },
    };
  }

  if (!result.data[0]) {
    return {
      redirect: {
        destination: "/payments",
      },
    };
  }

  return {
    props: {
      link: result.data[0],
      type,
    },
  };
};
