import React, { useEffect, useState } from "react";

import { FiUserPlus } from "react-icons/fi";
import { MdOutlineSearch } from "react-icons/md";
import { Button } from "../ui/button";
import { FaCirclePlus } from "react-icons/fa6";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Client, Product } from "@/utils/types";
import { useAccount } from "wagmi";
import { retreiveClients, retreiveProducts } from "@/utils/supabase";

type AddInvoiceProductProps = {
  onSelectProduct: (product: Product & { id: string }) => void;
};

function AddInvoiceProduct({ onSelectProduct }: AddInvoiceProductProps) {
  const [products, setProducts] = useState<Array<Product & { id: string }>>([]);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) return;
    const fetchProducts = async () => {
      const { data, error } = await retreiveProducts(address);
      if (data) setProducts(data);
      if (error) console.log({ error });
    };
    fetchProducts();
  }, [address]);

  return (
    <>
      <div className="flex h-full gap-2 rounded-lg bg-white/[8%] px-5 py-5 max-md:flex-col max-md:px-5">
        <Button className="flex py-5 mg:py-0 h-auto w-[15%] flex-row items-center gap-2 bg-green-petrolium text-forest hover:bg-green-petrolium max-md:w-full">
          <FaCirclePlus />
          Add product
        </Button>
        <div className="flex w-full items-center gap-3 rounded-lg bg-white/[6%] px-3">
          <Select onValueChange={(value) => onSelectProduct(products.filter(({ name }) => name.toLowerCase() === value.toLowerCase())[0])}>
            <SelectTrigger className="w-full border-none bg-transparent px-0 py-8 text-white outline-none ring-transparent focus:border-none focus:outline-none focus:ring-transparent">
              <SelectValue className="text-white/[6%]" placeholder="Search for products" />
            </SelectTrigger>

            <SelectContent className="w-full border-none bg-forest text-green-petrolium ring-transparent focus:outline-none focus:ring-transparent">
              {products.length > 0 ? (
                products.map((product) => (
                  <SelectItem value={product.name} key={product.id}>
                    {product.name}
                  </SelectItem>
                ))
              ) : (
                <div className="text-center text-sm">There is not product found, please add product</div>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}

export default AddInvoiceProduct;
