import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Client } from "@/utils/types";
import { retreiveClients } from "@/utils/supabase";
import { useAccount } from "wagmi";

function  ClientList() {
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
    <Table className="bg-white/[6%]">
      <TableHeader className="text-base">
        <TableRow className="border-none bg-green-petrolium hover:bg-green-petrolium">
          <TableHead className="w-64 text-xs font-normal text-forest md:text-base">Client's name</TableHead>
          <TableHead className="w-96 text-xs font-normal text-forest md:text-base">Email</TableHead>
          <TableHead className="w-64 text-xs font-normal text-forest md:text-base">Phone number</TableHead>
          <TableHead className="text-right text-xs font-normal text-forest md:text-base">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id} className="cursor-pointer border-b border-white/30 text-green-petrolium hover:bg-white/[8%]">
            <TableCell >{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone.length > 4 ? client.phone : "--"}</TableCell>
            <TableCell className="flex items-center justify-center">
              <BsThreeDotsVertical />
            </TableCell>
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
