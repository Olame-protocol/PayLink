import { retreivePaymentLinksById } from "@/utils/supabase";
import { GetServerSidePropsContext } from "next";
import React, { useState, MouseEvent } from "react";
import { SupabaseLinksRecord } from ".";
import Section from "@/components/Section";
import { useApproveERC20Transaction } from "@/hooks/useErc20";
import toast from "react-hot-toast";
import { useSendPayment } from "@/hooks/usePaylink";
import Layout from "@/components/Layout";
import { LoaderCircle, LoaderIcon } from "lucide-react";

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
    return "Pay now";
  };

  return (
    <Layout className="bg-green-petrolium">
      <Section className="mt-32 rounded-2xl bg-forest px-5 py-5 lg:px-36 lg:py-16">
        {isPending && (
          <div className="flex flex-col items-center justify-center p-10">
            <LoaderIcon className="h-20 w-20 animate-spin text-green-petrolium" />
          </div>
        )}
        {!isPending && (
          <>
            <div>
              <p className="text-xl font-black text-green-petrolium lg:text-[2.5rem]">You can kindly pay now</p>
            </div>
            <div className="mt-10 text-white">
              <p>
                <span className="font-semibold">Purpose:</span> {link.description}
              </p>
              <p>
                <span className="font-semibold">Created on:</span> {link.created_at.split("T")[0]}
              </p>
            </div>
            <form className="mt-10">
              <div className="flex w-full gap-2 rounded-lg bg-white/[6%] p-3 max-md:flex-col">
                {type !== "fixed" && (
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0cUSD"
                    className="boder-gray-400 w-full rounded-lg border-2 px-4 py-3 outline-none"
                  />
                )}
                <button onClick={(e) => onSendERC20(e)} className="w-full rounded-lg bg-white px-4 py-3 text-lg font-medium text-forest">
                  {buttonTitle()} <span>{link.amount} cUSD</span>
                </button>
              </div>
            </form>
          </>
        )}
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
