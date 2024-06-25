import { Button } from "./ui/button";
import { useState } from "react";
import { Client } from "@/utils/types";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { saveClient } from "@/utils/supabase";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

function AddClientForm() {
  const [clientData, setClientData] = useState<Client>({
    phone: "",
    name: "",
    email: "",
    service: "",
    owner: "0x000",
  });
  const { address } = useAccount();
  const [saving, setSaving] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSaveClient = async () => {
    if (!address) return;
    if (!clientData.name || !clientData.email || !clientData.service) return;
    setSaving(true);
    const { error } = await saveClient({
      ...clientData,
      owner: address,
    });
    if (error) {
      toast.error("Could not save the client");
      console.log({ error });
      setSaving(false);
      return;
    }
    setClientData({
      phone: "",
      name: "",
      email: "",
      service: "",
      owner: "0x000",
    });
    setSaving(false);
    toast.success("Client saved");
  };

  return (
    <div className="w-full rounded-sm bg-white/[8%] p-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex w-full gap-2 max-md:flex-col">
          <div className="flex w-full flex-col gap-2">
            <input
              name="name"
              type="text"
              required
              placeholder="Client’s name"
              value={clientData.name}
              onChange={onChange}
              className="w-full rounded-sm bg-white/5 px-5 py-4 text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="johndoe@gmail.com"
              value={clientData.email}
              onChange={onChange}
              className="w-full rounded-sm bg-white/5 px-5 py-4 text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <PhoneInput
              international={true}
              placeholder="Phone number (optional)"
              value={clientData.phone}
              name="phone"
              defaultCountry="UG"
              onChange={(value) => setClientData((prev) => ({ ...prev, phone: value as string }))}
              className="w-full rounded-sm bg-white/5 px-5 py-4 text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
            />

            <input
              name="service"
              type="text"
              value={clientData.service}
              required
              placeholder="Service"
              onChange={onChange}
              className="w-full rounded-sm bg-white/5 px-5 py-4 text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
            />
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <Button
            disabled={saving}
            onClick={onSaveClient}
            className="hover:bg-tranparent w-full rounded-sm bg-white px-5 py-4 text-xs font-normal text-forest lg:py-7 lg:text-lg lg:font-medium"
          >
            Save
          </Button>
          <Button
            disabled={saving}
            className="w-full rounded-sm bg-transparent px-5 py-4 text-xs font-normal text-white hover:bg-transparent hover:text-white disabled:!cursor-not-allowed disabled:opacity-50 lg:py-7 lg:text-lg lg:font-medium"
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddClientForm;
