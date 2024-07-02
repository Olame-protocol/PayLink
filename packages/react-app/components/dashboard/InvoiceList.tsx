import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { DetailedInvoice } from "@/utils/types";
import { retrieveInvoicesByWalletAddress } from "@/utils/supabase";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import InvoiceStatus from "../ui/payLink/InvoiceStatus";

function InvoiceList() {
  const [invoices, setInvoices] = useState<Array<DetailedInvoice & { id: string }>>([]);
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!address) return;
    const fetchInvoicesByWalletAddress = async () => {
      const { data, error } = await retrieveInvoicesByWalletAddress(address);
      if (data) setInvoices(data);
      if (error) console.log({ error });
    };
    fetchInvoicesByWalletAddress();
  }, [address]);

  return (
    <Table className="bg-white/[6%]">
      <TableHeader className="text-base">
        <TableRow className="border-none bg-green-petrolium hover:bg-green-petrolium">
          <TableHead className="w-64 font-semibold text-forest">Name</TableHead>
          <TableHead className="w-96 font-semibold text-forest">Price</TableHead>
          <TableHead className="w-64 font-semibold text-forest">Quantity</TableHead>
          <TableHead className="w-64 font-semibold text-forest">Amount (cUSD)</TableHead>
          <TableHead className="text-right font-semibold text-forest">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.id}
            onClick={() => router.push(`invoices/${invoice.id}`)}
            className="cursor-pointer border-b border-white/30 text-green-petrolium hover:bg-white/[8%]"
          >
            <TableCell className="font-medium">{invoice.product.name}</TableCell>
            <TableCell>{invoice.product.price}</TableCell>
            <TableCell className="line-clamp-1">{invoice.quantity}</TableCell>
            <TableCell>{invoice.amount}</TableCell>
            <TableCell className="flex items-center justify-center">
              <InvoiceStatus sent={invoice.sent} paid={invoice.paid} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default InvoiceList;
