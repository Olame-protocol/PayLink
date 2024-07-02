import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { PaymentLink } from "@/utils/types";
import { retreivePaymentLinks } from "@/utils/supabase";
import { useAccount } from "wagmi";

function PaymentLinkList() {
  const [paymentLinks, setPaymentLinks] = useState<Array<PaymentLink & { id: number; type: string }>>([]);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) return;
    const fetchInvoicesByWalletAddress = async () => {
      try {
        const [{ data: globalLinks, error: globalLinkError }, { data: fixedLinks, error: fixedLinkError }] = await Promise.all([
          retreivePaymentLinks("global", address),
          retreivePaymentLinks("fixed", address),
        ]);
        if (globalLinkError || fixedLinkError) throw globalLinkError || fixedLinkError;
        setPaymentLinks([...globalLinks.map((l) => ({ ...l, type: "global" })), ...fixedLinks.map((l) => ({ ...l, type: "fixed" }))]);
      } catch (err) {
        console.log({ err });
      }
    };
    fetchInvoicesByWalletAddress();
  }, [address]);

  return (
    <Table className="bg-white/[6%]">
      <TableHeader className="text-base">
        <TableRow className="border-none bg-green-petrolium hover:bg-green-petrolium">
          <TableHead className="w-96 font-semibold text-forest">Description</TableHead>
          <TableHead className="w-64 font-semibold text-forest">Amount</TableHead>
          <TableHead className="w-64 font-semibold text-forest">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paymentLinks.map((payment) => (
          <TableRow key={payment.description} className="cursor-pointer border-b border-white/30 text-green-petrolium hover:bg-white/[8%]">
            <TableCell className="font-medium">{payment.description}</TableCell>
            <TableCell>{payment?.amount ?? "--"}</TableCell>
            <TableCell className="line-clamp-1">{payment.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PaymentLinkList;
