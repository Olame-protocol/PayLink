import { retreivePaymentLinksById } from "@/utils/supabase";
import { GetServerSidePropsContext } from "next";
import React, { useState, MouseEvent } from "react";
import { SupabaseLinksRecord } from ".";
import Section from "@/components/Section";
import { useApproveERC20Transaction } from "@/hooks/useErc20";
import toast from "react-hot-toast";
import { useSendPayment } from "@/hooks/useGlobalPayment";

const PaymentIdPage = ({
  link,
  type,
}: {
  link: SupabaseLinksRecord;
  type: "fixed" | "global";
}) => {
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
      await transfer(
        amountToSend,
        link.owner as `0x${string}`,
        type,
        link.payment_link_id
      );
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
    <Section>
      <form className="flex flex-col gap-2 py-2">
        <div className="flex flex-col gap-2 w-full lg:w-1/2 mx-auto px-5">
          <input
            type="number"
            name="amount"
            readOnly={type === "fixed"}
            value={type === "fixed" ? link?.amount : amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0cUSD"
            className="w-5/5 outline-none py-3 px-4 rounded-lg border-2 boder-gray-400  "
          />
          <button
            onClick={(e) => onSendERC20(e)}
            className="bg-prosperity text-gray-900 py-3 px-4 rounded-lg font-medium text-lg"
          >
            {buttonTitle()}
          </button>
        </div>
      </form>
    </Section>
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
