import { ERC20_ABI } from "@/abi/ERC20";
import { ERC20_CONTRACT_ADDRESS, PAYLINK_CONTRACT_ADDRESS } from "@/utils/const";
import Web3 from "@/utils/web3";
import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import { ContractTransactionReceipt, parseUnits } from "ethers";

export const useApproveERC20Transaction = () => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();

  const approveER20 = useCallback(
    async (amount: string) => {
      if (!address || !window) return;
      try {
        console.log({ address });
        setIsPending(true);
        const contract = await new Web3().contract(ERC20_CONTRACT_ADDRESS, ERC20_ABI, address);
        console.log({ contract });
        const tx = await contract.approve(PAYLINK_CONTRACT_ADDRESS, parseUnits(amount));
        const txhash = (await tx.wait()) as ContractTransactionReceipt;
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
    approveER20,
    error,
    data,
  };
};
