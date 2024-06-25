import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { DetailedInvoice } from "@/utils/types";
import { retrieveInvoicesByWalletAddress } from "@/utils/supabase";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

function InvoiceList() {
  const [invoices, setInvoices] = useState<Array<DetailedInvoice & { id: string }>>([]);
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!address) return;
    const fetchClient = async () => {
      const { data, error } = await retrieveInvoicesByWalletAddress(address);
      if (data) setInvoices(data);
      if (error) console.log({ error });
    };
    fetchClient();
  }, [address]);

  return (
    <div>
      <div className="flex flex-col">
        <div className="mb-14 flex flex-col gap-5 max-md:mb-5 max-md:gap-2">
          <h2 className="text-xl font-black text-green-petrolium lg:text-[2.5rem]">Your Invoice list</h2>
          <p className="font-normal text-white">View all your invoice list</p>
        </div>
      </div>
      <Table className="bg-white/[6%]">
        <TableHeader className="text-base">
          <TableRow className="border-none bg-green-petrolium hover:bg-green-petrolium">
            <TableHead className="w-64 font-semibold text-forest">Product</TableHead>
            <TableHead className="w-96 font-semibold text-forest">Price</TableHead>
            <TableHead className="w-64 font-semibold text-forest">Quantity</TableHead>
            <TableHead className="w-64 font-semibold text-forest">Amount (cUSD)</TableHead>
            <TableHead className="text-right font-semibold text-forest">Action</TableHead>
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
                <BsThreeDotsVertical />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default InvoiceList;
