import { ERC20_ABI } from "@/abi/ERC20";
import { PAYLINK_ABI } from "@/abi/paylink";
import { useBalanceStore } from "@/store/balanceState";
import { ERC20_CONTRACT_ADDRESS, PAYLINK_CONTRACT_ADDRESS } from "@/utils/const";
import { saveFixedPaymentLinks, saveGlobalPaymentLinks, savePaymentRecord, updateInvoicePaidStatus, updateInvoiceSentStatus } from "@/utils/supabase";
import Web3 from "@/utils/web3";
import { ContractTransactionReceipt, formatUnits, parseUnits } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

type PaymentLinkType = "global" | "fixed";

export type GlobalPaymentData = {
  paymentLinkId: string;
  description: string;
};

type PaymentLinkData<T extends PaymentLinkType> = T extends "global" ? GlobalPaymentData : GlobalPaymentData & { amount: string };

export const useCreatePaymentLink = () => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();

  const createPaymentLink = useCallback(
    async (type: PaymentLinkType, data: PaymentLinkData<typeof type>) => {
      if (!address || !window) return;
      try {
        setIsPending(true);
        const contract = await new Web3().contract(PAYLINK_CONTRACT_ADDRESS, PAYLINK_ABI, address);

        let tx: any;
        if (type === "global") {
          tx = await contract.createGlobalPaymentLink(data.paymentLinkId);
        } else {
          tx = await contract.createFixedPaymentLink(data.paymentLinkId, parseUnits((data as PaymentLinkData<"fixed">).amount));
        }
        const txhash = (await tx.wait()) as ContractTransactionReceipt;

        type === "global"
          ? await saveGlobalPaymentLinks({
              description: data.description,
              paymentLinkId: data.paymentLinkId,
              transactionHash: txhash.hash,
              walletAddress: address,
            })
          : await saveFixedPaymentLinks({
              amount: (data as PaymentLinkData<"fixed">).amount,
              description: data.description,
              paymentLinkId: data.paymentLinkId,
              transactionHash: txhash.hash,
              walletAddress: address,
            });
        setData(txhash.hash);
        setError(null);
        setIsSuccess(true);
      } catch (e: any) {
        console.log(e);
        setData(null);
        setIsSuccess(false);
        setError({ message: e.shortMessage ?? e });
        throw e;
      } finally {
        setIsPending(false);
      }
    },
    [address],
  );

  const reset = useCallback(() => {
    setData(null);
    setIsSuccess(false);
    setError(null);
    setIsPending(false);
  }, []);

  return {
    isPending,
    isSuccess,
    reset,
    createPaymentLink,
    error,
    txhash: data,
  };
};

export const useSendPayment = () => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();

  const transfer = useCallback(
    async (amount: string, creatorWalletAddress: `0x${string}`, type: "global" | "fixed", paymentLinkId: string) => {
      if (!address || !window) return;
      try {
        setIsPending(true);
        const contract = await new Web3().contract(PAYLINK_CONTRACT_ADDRESS, PAYLINK_ABI, address);
        let tx: any;
        if (type === "fixed") {
          tx = await contract.payFixedPaymentLink(paymentLinkId);
        } else {
          tx = await contract.contributeToGlobalPaymentLink(paymentLinkId, parseUnits(amount));
        }

        const txhash = await tx.wait();
        await savePaymentRecord(type, {
          amount: amount,
          from: address,
          to: creatorWalletAddress,
          paymentLinkId,
          transactionHash: txhash.hash,
        });
        setData(txhash.hash);
        setError(null);
        setIsSuccess(true);
      } catch (e: any) {
        console.log(e);
        setData(null);
        setIsSuccess(false);
        setError({ message: e.shortMessage ?? e });
        throw e;
      } finally {
        setIsPending(false);
      }
    },
    [address],
  );

  const reset = useCallback(() => {
    setData(null);
    setIsSuccess(false);
    setError(null);
    setIsPending(false);
  }, []);

  return {
    isPending,
    isSuccess,
    reset,
    transfer,
    error,
    txhash: data,
  };
};

export const useCreateInvoice = () => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();

  const createInvoice = useCallback(
    async (invoiceId: string, productId: string, amount: string) => {
      if (!address || !window) return;
      try {
        setIsPending(true);
        const contract = await new Web3().contract(PAYLINK_CONTRACT_ADDRESS, PAYLINK_ABI, address);
        const tx = await contract.createInvoice(invoiceId, productId, parseUnits(amount));

        const txhash = await tx.wait();
        // TODO: Should send the invoice email

        setData(txhash.hash);
        setError(null);
        setIsSuccess(true);
      } catch (e: any) {
        console.log(e);
        setData(null);
        setIsSuccess(false);
        setError({ message: e.shortMessage ?? e });
        throw e;
      } finally {
        setIsPending(false);
      }
    },
    [address],
  );

  const reset = useCallback(() => {
    setData(null);
    setIsSuccess(false);
    setError(null);
    setIsPending(false);
  }, []);

  return {
    isPending,
    isSuccess,
    reset,
    createInvoice,
    error,
    txhash: data,
  };
};

export const usePayInvoice = () => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();

  const payInvoice = useCallback(
    async (invoiceId: string) => {
      if (!address || !window) return;
      try {
        setIsPending(true);
        const contract = await new Web3().contract(PAYLINK_CONTRACT_ADDRESS, PAYLINK_ABI, address);
        const tx = await contract.payInvoice(invoiceId);

        const txhash = await tx.wait();
        await updateInvoicePaidStatus(invoiceId);
        setData(txhash.hash);
        setError(null);
        setIsSuccess(true);
      } catch (e: any) {
        console.log(e);
        setData(null);
        setIsSuccess(false);
        setError({ message: e.shortMessage ?? e });
        throw e;
      } finally {
        setIsPending(false);
      }
    },
    [address],
  );

  const reset = useCallback(() => {
    setData(null);
    setIsSuccess(false);
    setError(null);
    setIsPending(false);
  }, []);

  return {
    isPending,
    isSuccess,
    reset,
    payInvoice,
    error,
    txhash: data,
  };
};
export const usecUSDBalance = () => {
   const { setcUSDBalance } = useBalanceStore();
  const { address } = useAccount();

  const getBalances = useCallback(async () => {
    if (!address || !window) return;
    try {
      const contract = await new Web3().contract(ERC20_CONTRACT_ADDRESS, ERC20_ABI, address);
      const balance = await Promise.all([contract.balanceOf(address)]);
      setcUSDBalance(formatUnits(balance.toString()));
    } catch (err) {
      console.log(err);
    }
  }, [address, setcUSDBalance]);

  useEffect(() => {
    if (address) getBalances();
  }, [address, getBalances, setcUSDBalance]);

  return { getBalances };
};
