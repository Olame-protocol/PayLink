import React, { useState } from "react";
import { Button } from "./ui/button";
import { Client, Product } from "@/utils/types";
import { useAccount } from "wagmi";
import { saveClient, saveProduct } from "@/utils/supabase";
import toast from "react-hot-toast";

function AddProductFrom() {
  const [productData, setProductData] = useState<Product>({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    owner: "0x00",
  });
  const { address } = useAccount();
  const [saving, setSaving] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSaveProduct = async () => {
    if (!address) return;
    if (!productData.description || !productData.price || !productData.quantity || !productData.name) return;
    setSaving(true);
    const { error } = await saveProduct({
      ...productData,
      owner: address,
    });
    if (error) {
      toast.error("Could not save the product");
      console.log({ error });
      setSaving(false);
      return;
    }
    setProductData({
      name: "",
      description: "",
      quantity: 0,
      price: 0,
      owner: "0x00",
    });
    setSaving(false);
    toast.success("Client saved");
  };

  return (
    <div className="w-full rounded-lg bg-white/[8%] p-5">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex w-full gap-5 max-md:flex-col">
          <div className="flex w-full flex-col gap-5">
            <input
              name="name"
              type="text"
              required
              placeholder="Product name"
              onChange={onChange}
              className="rounded-lg bg-white/[2%] p-5 text-white outline-none placeholder:text-[#4E837F]"
            />
            <input
              name="quantity"
              type="number"
              required
              placeholder="Quantity"
              onChange={onChange}
              className="rounded-lg bg-white/[2%] p-5 text-white outline-none placeholder:text-[#4E837F]"
            />
          </div>
          <div className="flex w-full flex-col gap-5">
            <input
              name="price"
              type="number"
              required
              placeholder="Price"
              onChange={onChange}
              className="rounded-lg bg-white/[2%] p-5 text-white outline-none placeholder:text-[#4E837F]"
            />
            <input
              name="description"
              type="text"
              required
              placeholder="Description"
              onChange={onChange}
              className="rounded-lg bg-white/[2%] p-5 text-white outline-none placeholder:text-[#4E837F]"
            />
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <Button onClick={onSaveProduct} disabled={saving} className="w-full bg-white py-6 text-base text-forest hover:bg-white hover:text-forest">
            Save
          </Button>
          <Button disabled={saving} className="w-full bg-transparent py-6 text-base text-white hover:bg-transparent hover:text-white" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProductFrom;
