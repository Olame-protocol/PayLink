import React, { ChangeEvent, useCallback, useEffect, useLayoutEffect, useState } from "react";
import BusinessBranding from "./BusinessBranding";
import AddInvoiceClient from "./AddInvoiceClient";
import AddInvoiceProduct from "./AddInvoiceProduct";
import { Button } from "../ui/button";
import { Branding, Client, Product } from "@/utils/types";
import { saveBranding, saveBrandingImage, saveInvoice } from "@/utils/supabase";
import toast from "react-hot-toast";
import { Input } from "postcss";
import { useRouter } from "next/router";
import { SUPABASE_STORAGE_BASE_URL } from "@/utils/const";
import { useAccount } from "wagmi";

function CreateInvoiceForm() {
  const [brandingImageFile, setBrandingImageFile] = useState<File | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [client, setClient] = useState<(Client & { id: string }) | null>(null);
  const [product, setProduct] = useState<(Product & { id: string }) | null>(null);
  const [branding, setBranding] = useState<(Branding & { id: string }) | null>(null);
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
  const router = useRouter();
  const { address } = useAccount();
  const [savingInvoice, setSavingInvoice] = useState(false);

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

  const onSelectBranding = (branding: Branding & { id: string }) => {
    console.log({ branding });
    setBranding(branding);
  };

  const onSaveBranding = async () => {
    let savedImageUrl = "";
    let savedBrandingId = "";
    if (!brandingImageFile && !branding) {
      toast.error("Please select an image for your branding", { duration: 3500 });
      return;
    }
    setSavingInvoice(true);
    if (!branding && brandingImageFile && brandingData.name && brandingData.description && brandingData.contact && brandingData.address) {
      const { data, error } = await saveBrandingImage(brandingImageFile);
      if (error) {
        toast.error("Could not save the branding image");
        return;
      }
      setBrandingData((prev) => ({ ...prev, image: (data as any)?.["fullPath"] ?? data?.path }));
      savedImageUrl = SUPABASE_STORAGE_BASE_URL + (data as any)?.["fullPath"] ?? data?.path;
      const { data: savedBranding, error: saveBrandingError } = await saveBranding({
        image: savedImageUrl,
        name: brandingData.name,
        description: brandingData.description,
        owner: address as string,
        contact: brandingData.contact,
        address: brandingData.address,
      });
      setSavingInvoice(false);
      if (saveBrandingError) {
        toast.error("Could not save the branding");
        return;
      }
      savedBrandingId = savedBranding[0].id;
      setBranding(savedBranding[0]);
    }

    if (branding && product && client && invoiceDueDate) {
      const { error: invoiceError, data: savedInvoice } = await saveInvoice({
        branding: branding.id || savedBrandingId,
        product: product.id,
        client: client.id,
        due_date: invoiceDueDate as unknown as any,
        amount: totalAmount.toString(),
        quantity: product.quantity.toString(),
        owner: address as string,
      });
      if (invoiceError) {
        toast.error("Could not save the branding");
        return;
      }
      router.push("/invoices/" + savedInvoice[0].id);
    }
  };

  const onContinueToInvoicePreview = async () => {
    await onSaveBranding();
  };

  const onProductQuantityChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct((prev: any) => ({ ...prev, quantity: e.target.value as string }));
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
      <BusinessBranding onSelectBranding={onSelectBranding} brandingPreview={brandingData.preview} onBrandingChange={onBrandingInputChange} onDropFIle={onDrop} />
      <AddInvoiceClient onSelectClient={onSelectClient} onSelectInvoicePaymentDueDate={setInvoiceDueDate} />
      <AddInvoiceProduct onSelectProduct={onSelectProduct} />
      {product && (
        <div className="flex w-full flex-col items-center justify-between rounded-lg bg-white/[8%] p-5 md:flex-row">
          <h2 className="w-full text-sm text-green-petrolium md:w-fit font-thin">{product.name}</h2>
          <div className="flex w-full flex-col items-center gap-3 md:gap-5 md:w-fit md:flex-row">
            <div className="flex w-full flex-col md:items-center gap-2 md:w-auto md:flex-row mt-3">
              <p className="text-left text-xs font-thin text-white/40 max-md:text-sm">Quantity:</p>
              <input
                type="number"
                min={1}
                className="w-full rounded-sm bg-white/[2%] p-3 text-sm md:text-base md:font-semibold text-green-petrolium outline-none placeholder:text-[#4E837F] md:w-32"
                onChange={onProductQuantityChanges}
                value={product.quantity}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-start md:items-center gap-2 w-full md:w-auto">
              <p className="text-white/40 max-md:text-sm ">Price</p>
              <div className="rounded-sm bg-white/[2%] p-3 text-sm md:font-semibold text-green-petrolium">{product.price}</div>
            </div>
            <div className="flex flex-col md:flex-row w-full md:w-auto md:items-center gap-2">
              <p className="text-white/40 max-md:text-sm">Amount</p>
              <p className="rounded-md bg-white/[2%] p-3 font-semibold text-green-petrolium">{totalAmount}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-5">
        <Button disabled={savingInvoice} onClick={onContinueToInvoicePreview} className="w-full rounded-md bg-white px-5 py-4 text-xs text-forest lg:py-7 lg:text-lg">
          {savingInvoice ? "Saving invoice..." : "Save and continue"}
        </Button>
        <Button
          disabled={savingInvoice}
          onClick={onCancel}
          className="w-full cursor-pointer rounded-sm bg-transparent px-5 py-4 text-xs font-normal text-white hover:bg-transparent hover:text-white disabled:!cursor-not-allowed disabled:opacity-50 lg:py-7 lg:text-lg lg:font-medium"
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default CreateInvoiceForm;
