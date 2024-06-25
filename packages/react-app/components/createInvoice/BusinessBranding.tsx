import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import { FaCirclePlus } from "react-icons/fa6";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Branding, Client } from "@/utils/types";
import { useAccount } from "wagmi";
import { retreiveBrandings, retreiveClients } from "@/utils/supabase";

type BusinessBrandingProps = {
  onBrandingChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDropFIle: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void;
  brandingPreview: string;
  onSelectBranding: (branding: Branding & { id: string }) => void;
};

export default function BusinessBranding({ onBrandingChange, onDropFIle, brandingPreview, onSelectBranding }: BusinessBrandingProps) {
  const [brandingUnwrapped, setBrandingUnwrapped] = useState(false);
  const [brandings, setBrandings] = useState<Array<Branding & { id: string }>>([]);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) return;
    const fetchBrandings = async () => {
      const { data, error } = await retreiveBrandings(address);
      if (data) setBrandings(data);
      if (error) console.log({ error });
    };
    fetchBrandings();
  }, [address]);

  return (
    <div className="rounded-lg bg-white/[8%] px-5 py-5 font-thin">
      <div className="flex w-full items-center gap-3 rounded-lg bg-white/[6%] px-3">
        <Select onValueChange={(value) => onSelectBranding(brandings.filter(({ name }) => name.toLowerCase() === value.toLowerCase())[0])}>
          <SelectTrigger className="palceholder:text-[#62a6a1] w-full border-none bg-transparent px-0 py-6 text-sm font-thin text-white outline-none ring-transparent focus:border-none focus:outline-none focus:ring-transparent">
            <SelectValue className="border-none text-sm text-white/[6%] outline-none" placeholder="Search for brandings" />
          </SelectTrigger>

          <SelectContent className="w-full border-none bg-forest text-green-petrolium ring-transparent focus:outline-none focus:ring-transparent">
            {brandings.length > 0 ? (
              brandings.map((branding) => (
                <SelectItem value={branding.name} key={branding.id}>
                  {branding.name}
                </SelectItem>
              ))
            ) : (
              <div className="text-center text-sm">There is not branding found, please create branding for your business</div>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-thin text-white">Create business branding</p>
        <button onClick={() => setBrandingUnwrapped((prev) => !prev)}>
          <ChevronDownIcon className={`h-4 w-5 cursor-pointer text-green-petrolium transition-all ${brandingUnwrapped ? "rotate-180" : "rotate-0"}`} />
        </button>
      </div>
      {brandingUnwrapped && (
        <div className="mt-5 flex gap-2 max-md:flex-col">
          <div className="relative flex w-[15%] items-center justify-center overflow-hidden rounded-lg max-md:h-56 max-md:w-full">
            <Image src={brandingPreview || "/brand-logo-placeholder.png"} alt="" fill className="scale-10 w-full object-contain" />
            <Dropzone onDrop={onDropFIle}>
              {({ getRootProps, getInputProps }) => (
                <section className="z-10">
                  <div {...getRootProps()} className="flex flex-col items-center gap-3">
                    <input {...getInputProps()} />
                    {!brandingPreview && (
                      <>
                        <FaCirclePlus className="text-white" />
                        <p className="text-sm text-white">Add Logo</p>
                      </>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="w-full">
            <div className="flex w-full gap-2 max-md:flex-col">
              <div className="flex w-full flex-col gap-2">
                <input
                  name="name"
                  onChange={onBrandingChange}
                  type="text"
                  required
                  placeholder="Enter your business name"
                  className="w-full rounded-sm bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
                />
                <input
                  name="address"
                  onChange={onBrandingChange}
                  type="text"
                  placeholder="Business address"
                  className="w-full rounded-sm bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <input
                  name="description"
                  onChange={onBrandingChange}
                  type="text"
                  required
                  placeholder="Business description"
                  className="w-full rounded-sm bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
                />
                <input
                  name="contact"
                  required
                  onChange={onBrandingChange}
                  type="text"
                  placeholder="Contact number"
                  className="w-full rounded-sm bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-xs placeholder:text-[#4E837F] md:py-8 md:placeholder:text-base"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
