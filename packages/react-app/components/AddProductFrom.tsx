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
      quantity: 1,
      price: 0,
      owner: "0x00",
    });
    setSaving(false);
    toast.success("Client saved");
  };

  return (
    <div className="w-full rounded-lg bg-white/[8%] p-5">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex w-full flex-col gap-2 max-md:flex-col">
          <input
            name="name"
            type="text"
            required
            placeholder="Product name"
            onChange={onChange}
            className="w-full rounded-sm bg-white/5 px-5 py-4 text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
          />
          <div className="flex w-full flex-col gap-2 lg:flex-row">
            <input
              name="price"
              type="number"
              min={1}
              required
              placeholder="Price"
              onChange={onChange}
              className="w-full rounded-sm bg-white/5 px-5 py-4 text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
            />
            <input
              name="description"
              type="text"
              required
              placeholder="Description"
              onChange={onChange}
              className="w-full rounded-sm bg-white/5 px-5 py-4 text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
            />
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <Button
            onClick={onSaveProduct}
            disabled={saving}
            className="hover:bg-tranparent w-full cursor-pointer rounded-sm bg-white px-5 py-4 text-xs font-normal text-forest lg:py-7 lg:text-lg lg:font-medium"
          >
            Save
          </Button>
          <Button
            disabled={saving}
            variant="outline"
            className="w-full cursor-pointer rounded-sm bg-transparent px-5 py-4 text-xs font-normal text-white hover:bg-transparent hover:text-white disabled:!cursor-not-allowed disabled:opacity-50 lg:py-7 lg:text-lg lg:font-medium"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProductFrom;
