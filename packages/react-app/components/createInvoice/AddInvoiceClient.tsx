import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FiUserPlus } from "react-icons/fi";
import { DatePicker } from "../ui/DatePicker";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Client } from "@/utils/types";
import { useAccount } from "wagmi";
import { retreiveClients } from "@/utils/supabase";

type AddInvoiceClientProps = {
  onSelectInvoicePaymentDueDate: (date?: Date) => void;
  onSelectClient: (client: Client & { id: string }) => void;
};

export default function AddInvoiceClient({ onSelectInvoicePaymentDueDate, onSelectClient }: AddInvoiceClientProps) {
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
    <div className="flex h-full gap-2 rounded-lg bg-white/[8%] px-5 py-5 max-md:flex-col max-md:px-5">
      <Button className="flex h-auto w-[15%] items-center gap-2 bg-green-petrolium py-5 text-forest hover:bg-green-petrolium max-md:w-full max-md:flex-row">
        <FiUserPlus />
        Add client
      </Button>
      <div className="flex w-full flex-col gap-2">
        <DatePicker onSelect={onSelectInvoicePaymentDueDate} placeholder="Payment due date " />
        <div className="flex w-full items-center gap-3 rounded-lg bg-white/[6%] px-3">
          <Select onValueChange={(value) => onSelectClient(clients.filter(({ name }) => name.toLowerCase() === value.toLowerCase())[0])}>
            <SelectTrigger className="w-full border-none bg-transparent px-0 py-7 text-[#ffff]  outline-none ring-transparent focus:border-none focus:outline-none focus:ring-transparent">
              <SelectValue className="text-[#ffff] " placeholder="Search for clients" />
            </SelectTrigger>
            {clients.length > 0 && (
              <SelectContent className="border-none bg-forest text-green-petrolium ring-transparent focus:outline-none focus:ring-transparent">
                {clients.map((client) => (
                  <SelectItem value={client.name} key={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
        </div>
      </div>
    </div>
  );
}
