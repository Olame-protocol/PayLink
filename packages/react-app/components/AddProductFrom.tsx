import React from "react";
import { Button } from "./ui/button";

function AddProductFrom() {
  return (
    <div className="w-full rounded-lg bg-white/[8%] p-5">
      <div className="flex w-full gap-5 max-md:flex-col">
        <div className="flex w-full flex-col gap-5">
          <input name="productName" type="text" placeholder="Product name" className="rounded-lg bg-white/[10%] p-5 text-white outline-none" />
          <input name="productQuantity" type="email" placeholder="Quantity" className="rounded-lg bg-white/[10%] p-5 text-white outline-none" />
        </div>
        <div className="flex w-full flex-col gap-5">
          <input name="productPrice" type="number" placeholder="Price" className="rounded-lg bg-white/[10%] p-5 text-white outline-none" />
          <input name="clientDescription" type="text" placeholder="Description" className="rounded-lg bg-white/[10%] p-5 text-white outline-none" />
        </div>
      </div>
      <div className="mt-5 flex gap-5">
        <Button className="w-full bg-white py-6 text-base text-forest hover:bg-white hover:text-forest">Save</Button>
        <Button className="w-full bg-transparent py-6 text-base text-white hover:bg-transparent hover:text-white" variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default AddProductFrom;
