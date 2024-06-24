import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Client } from "@/utils/types";
import { retreiveClients } from "@/utils/supabase";
import { useAccount } from "wagmi";

function ClientList() {
  const [clients, setClients] = useState<Array<Client & { id: string }>>([]);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) return;
    const fetchClient = async () => {
      const { data, error } = await retreiveClients(address);
      if (data) setClients(data);
      if (error) console.log({ error });
    };
    fetchClient();
  }, [address]);

  return (
    <div>
      <div className="flex flex-col">
        <div className="mb-14 flex flex-col gap-5 max-md:mb-5 max-md:gap-2">
          <h2 className="text-xl font-black text-green-petrolium lg:text-[2.5rem]">Your clients list</h2>
          <p className="font-normal text-white">View all your clients list</p>
        </div>
      </div>
      <Table className="bg-white/[6%]">
        <TableHeader className="text-base">
          <TableRow className="border-none bg-green-petrolium hover:bg-green-petrolium">
            <TableHead className="w-64 font-semibold text-forest">Clients</TableHead>
            <TableHead className="w-96 font-semibold text-forest">Email</TableHead>
            <TableHead className="w-64 font-semibold text-forest">Service</TableHead>
            <TableHead className="w-64 font-semibold text-forest">Phone number</TableHead>
            <TableHead className="text-right font-semibold text-forest">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="cursor-pointer border-b border-white/30 text-green-petrolium hover:bg-white/[8%]">
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell className="line-clamp-1">{client.service}</TableCell>
              <TableCell>{client.phone.length > 4 ? client.phone : "--"}</TableCell>
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

export default ClientList;
