import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import { FaCirclePlus } from "react-icons/fa6";

type BusinessBrandingProps = {
  onBrandingChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDropFIle: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void;
  brandingPreview: string;
};
export default function BusinessBranding({ onBrandingChange, onDropFIle, brandingPreview }: BusinessBrandingProps) {
  const [brandingUnwrapped, setBrandingUnwrapped] = useState(false);

  return (
    <div className="rounded-lg bg-white/[8%] px-5 py-5">
      <div className="flex items-center justify-between">
        <p className="text-base text-white">Your business branding</p>
        <button onClick={() => setBrandingUnwrapped((prev) => !prev)}>
          <ChevronDownIcon className={`h-6 w-5 cursor-pointer text-green-petrolium transition-all ${brandingUnwrapped ? "rotate-180" : "rotate-0"}`} />
        </button>
      </div>
      {brandingUnwrapped && (
        <div className="mt-5 flex gap-2 max-md:flex-col">
          <div className="relative flex w-[15%] items-center justify-center overflow-hidden rounded-lg max-md:h-56 max-md:w-full">
            <Image src={brandingPreview || "/brand-logo-placeholder.png"} alt="" fill className="scale-110 object-contain" />
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
                  className="rounded-lg bg-white/[6%] p-5 text-white outline-none"
                />
                <input name="address" onChange={onBrandingChange} type="text" placeholder="Business address" className="rounded-lg bg-white/[6%] p-5 text-white outline-none" />
              </div>
              <div className="flex w-full flex-col gap-2">
                <input
                  name="description"
                  onChange={onBrandingChange}
                  type="text"
                  required
                  placeholder="Invoice description"
                  className="rounded-lg bg-white/[6%] p-5 text-white outline-none"
                />
                <input
                  name="contact"
                  required
                  onChange={onBrandingChange}
                  type="text"
                  placeholder="Contact number"
                  className="rounded-lg bg-white/[6%] p-5 text-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
