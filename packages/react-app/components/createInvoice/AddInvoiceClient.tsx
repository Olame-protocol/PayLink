import React from "react";
import { Button } from "../ui/button";
import { FiUserPlus } from "react-icons/fi";
import { DatePicker } from "../ui/DatePicker";

function AddInvoiceClient() {
  return (
    <div className="flex h-full gap-2 rounded-lg bg-white/[8%] px-5 py-5 max-md:flex-col max-md:px-5">
      <Button className="flex h-auto w-[15%] flex-col items-center gap-2 bg-green-petrolium text-forest hover:bg-green-petrolium max-md:w-full max-md:flex-row">
        <FiUserPlus />
        Add client
      </Button>
      <div className="flex w-full flex-col gap-2">
        <DatePicker placeholder="Invoice date" />
        <DatePicker placeholder="Payment due date" />
      </div>
    </div>
  );
}

export default AddInvoiceClient;
