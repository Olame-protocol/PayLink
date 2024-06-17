import React, { ChangeEvent, useCallback, useState } from "react";
import BusinessBranding from "./BusinessBranding";
import AddInvoiceClient from "./AddInvoiceClient";
import AddInvoiceProduct from "./AddInvoiceProduct";
import { Button } from "../ui/button";
import { Branding, Client } from "@/utils/types";
import { saveBrandingImage } from "@/utils/supabase";
import toast from "react-hot-toast";

function CreateInvoiceForm() {
  const [brandingImageFile, setBrandingImageFile] = useState<File | null>(null);
  const [client, setClient] = useState<(Client & { id: string }) | null>(null);
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

  const onSaveBranding = async () => {
    if (!brandingImageFile) return;
    const { data, error } = await saveBrandingImage(brandingImageFile);
    if (error) {
      return toast.error("Could not save the branding image");
    }
    console.log({ data: (data as any)?.["fullPath"] });
    setBrandingData((prev) => ({ ...prev, image: (data as any)?.["fullPath"] ?? data?.path }));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
      <BusinessBranding brandingPreview={brandingData.preview} onBrandingChange={onBrandingInputChange} onDropFIle={onDrop} />
      <AddInvoiceClient onSelectClient={onSelectClient} onSelectInvoicePaymentDueDate={setInvoiceDueDate} />
      <AddInvoiceProduct />
      <div className="flex gap-5">
        <Button onClick={onSaveBranding} className="w-full bg-white py-6 text-base text-forest hover:bg-white hover:text-forest">
          Save and continue
        </Button>
        <Button onClick={onCancel} className="w-full bg-transparent py-6 text-base text-white hover:bg-transparent hover:text-white" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default CreateInvoiceForm;
