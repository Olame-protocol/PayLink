import { Button } from "./ui/button";

function AddClientForm() {
  return (
    <div className="w-full rounded-lg bg-white/[8%] p-5">
      <div className="flex w-full gap-5 max-md:flex-col">
        <div className="flex w-full flex-col gap-5">
          <input name="clientName" type="text" placeholder="Client’s name" className="rounded-lg bg-white/[10%] p-5 text-white outline-none" />
          <input name="clientEmail" type="email" placeholder="johndoe@gmail.com" className="rounded-lg bg-white/[10%] p-5 text-white outline-none" />
        </div>
        <div className="flex w-full flex-col gap-5">
          <input name="clientPhone" type="number" placeholder="Phone number" max={10} className="rounded-lg bg-white/[10%] p-5 text-white outline-none" />
          <input name="clientService" type="text" placeholder="Service" className="rounded-lg bg-white/[10%] p-5 text-white outline-none" />
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

export default AddClientForm;
