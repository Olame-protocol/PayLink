import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import BusinessBranding from "./BusinessBranding";
import AddInvoiceClient from "./AddInvoiceClient";
import AddInvoiceProduct from "./AddInvoiceProduct";
import { Button } from "../ui/button";
import { Branding, Client, Product } from "@/utils/types";
import { saveBrandingImage } from "@/utils/supabase";
import toast from "react-hot-toast";
import { Input } from "postcss";

function CreateInvoiceForm() {
  const [brandingImageFile, setBrandingImageFile] = useState<File | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [client, setClient] = useState<(Client & { id: string }) | null>(null);
  const [product, setProduct] = useState<(Product & { id: string }) | null>(null);
  const [invoiceDueDate, setInvoiceDueDate] = useState<Date>();
  const [brandingData, setBrandingData] = useState<Branding & { preview: string }>({
    address: "",
    contact: "",
    description: "",
    image: "",
    name: "",
    owner: "",
    preview: "",
  });

  useEffect(() => {
    const calculateTheTotalAmount = () => {
      if (!product) return;
      const total = Number(product?.quantity) * Number(product?.price);
      setTotalAmount(total);
    };
    calculateTheTotalAmount();
  }, [product?.quantity, product?.price]);

  const onBrandingInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrandingData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setBrandingImageFile(acceptedFiles[0]);
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onloadend = () => {
      setBrandingData((prev) => ({ ...prev, preview: reader.result as string }));
    };
  }, []);

  const onSelectClient = (client: Client & { id: string }) => {
    console.log({ client });
    setClient(client);
  };

  const onSelectProduct = (product: Product & { id: string }) => {
    console.log({ product });
    setProduct(product);
  };

  const onSaveBranding = async () => {
    if (!brandingImageFile) return;
    const { data, error } = await saveBrandingImage(brandingImageFile);
    if (error) {
      return toast.error("Could not save the branding image");
    }
    console.log({ data: (data as any)?.["fullPath"] });
    setBrandingData((prev) => ({ ...prev, image: (data as any)?.["fullPath"] ?? data?.path }));
  };

  const onProductQuantityChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct((prev) => ({ ...prev, quantity: e.target.value }));
  };

  const onCancel = () => {
    setBrandingImageFile(null);
    setBrandingData({
      address: "",
      contact: "",
      description: "",
      image: "",
      name: "",
      owner: "",
      preview: "",
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
      <BusinessBranding brandingPreview={brandingData.preview} onBrandingChange={onBrandingInputChange} onDropFIle={onDrop} />
      <AddInvoiceClient onSelectClient={onSelectClient} onSelectInvoicePaymentDueDate={setInvoiceDueDate} />
      <AddInvoiceProduct onSelectProduct={onSelectProduct} />
      {product && (
        <div className="flex w-full items-center justify-between rounded-lg bg-white/[8%] p-5">
          <h2 className="w-fit font-semibold text-green-petrolium">{product.name}</h2>
          <div className="flex w-fit items-center gap-5">
            <div className="flex items-center gap-2">
              <p className="text-white/40 max-md:text-sm">Quantity:</p>
              <input
                type="number"
                className="w-32 rounded-md bg-white/[6%] p-3 text-center font-semibold text-green-petrolium outline-none"
                onChange={onProductQuantityChanges}
                value={product.quantity}
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-white/40 max-md:text-sm">Price</p>
              <div className="rounded-md bg-white/[6%] p-3 font-semibold text-green-petrolium">{product.price}</div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-white/40 max-md:text-sm">Amount</p>
              <p className="rounded-md bg-white/[6%] p-3 font-semibold text-green-petrolium">{totalAmount}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-5">
        <Button onClick={onSaveBranding} className="w-full bg-white py-6 text-base text-forest hover:bg-white hover:text-forest">
          continue
        </Button>
        <Button onClick={onCancel} className="w-full bg-transparent py-6 text-base text-white hover:bg-transparent hover:text-white" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default CreateInvoiceForm;
