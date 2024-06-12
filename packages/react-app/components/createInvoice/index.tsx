import React from "react";
import BusinessBranding from "./BusinessBranding";
import AddInvoiceClient from "./AddInvoiceClient";
import AddInvoiceProduct from "./AddInvoiceProduct";
import { Button } from "../ui/button";

function CreateInvoiceForm() {
  return (
    <div className="flex flex-col gap-5">
      <BusinessBranding />
      <AddInvoiceClient />
      <AddInvoiceProduct />
      <div className="flex gap-5">
        <Button className="w-full bg-white py-6 text-base text-forest hover:bg-white hover:text-forest">Save and continue</Button>
        <Button className="w-full bg-transparent py-6 text-base text-white hover:bg-transparent hover:text-white" variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default CreateInvoiceForm;
