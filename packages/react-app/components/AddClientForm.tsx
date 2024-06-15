import { Button } from "./ui/button";
import { useState } from "react";
import { Client } from "@/utils/types";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { saveClient } from "@/utils/supabase";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

function AddClientForm() {
  const [clientData, setClientData] = useState<Partial<Client>>({
    phone: "",
    name: "",
    email: "",
    service: "",
  });
  const { address } = useAccount();
  const [saving, setSaving] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSaveClient = async () => {
    if (!address) return;
    if (!clientData.name || !clientData.email || !clientData.service) return;
    console.log({ clientData });
    setSaving(true);
    const { error } = await saveClient({
      phone: clientData?.phone ?? "",
      name: clientData.name,
      service: clientData.service,
      email: clientData.email,
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
              placeholder="Client’s name"
              value={clientData.name}
              onChange={onChange}
              className="rounded-lg bg-white/[6%] p-5 text-white outline-none"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="johndoe@gmail.com"
              value={clientData.email}
              onChange={onChange}
              className="rounded-lg bg-white/[6%] p-5 text-white outline-none"
            />
          </div>
          <div className="flex w-full flex-col gap-5">
            <PhoneInput
              international={true}
              placeholder="Phone number (optional)"
              value={clientData.phone}
              name="phone"
              defaultCountry="UG"
              onChange={(value) => setClientData((prev) => ({ ...prev, phone: value }))}
              className="rounded-lg bg-white/[6%] p-5 text-white outline-none"
            />

            <input
              name="service"
              type="text"
              value={clientData.service}
              required
              placeholder="Service"
              onChange={onChange}
              className="rounded-lg bg-white/[6%] p-5 text-white outline-none"
            />
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <Button
            disabled={saving}
            onClick={onSaveClient}
            className="w-full bg-white py-6 text-base text-forest hover:bg-white hover:text-forest disabled:!cursor-not-allowed disabled:opacity-50"
          >
            Save
          </Button>
          <Button
            disabled={saving}
            className="w-full bg-transparent py-6 text-base text-white hover:bg-transparent hover:text-white disabled:!cursor-not-allowed disabled:opacity-50"
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
