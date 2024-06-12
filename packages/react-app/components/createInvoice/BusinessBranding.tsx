import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { FaCirclePlus } from "react-icons/fa6";

export default function BusinessBranding() {
  const [brandingUnwrapped, setBrandingUnwrapped] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log({ acceptedFiles });
  }, []);

  return (
    <div className="rounded-lg bg-white/[8%] px-16 py-5 max-md:px-5">
      <div className="flex items-center justify-between">
        <p className="text-base text-white">Your business branding</p>
        <button onClick={() => setBrandingUnwrapped((prev) => !prev)}>
          <ChevronDownIcon className={`h-6 w-5 cursor-pointer text-green-petrolium transition-all ${brandingUnwrapped ? "rotate-180" : "rotate-0"}`} />
        </button>
      </div>
      {brandingUnwrapped && (
        <div className="mt-5 flex gap-2 max-md:flex-col">
          <div className="relative flex w-[15%] items-center justify-center overflow-hidden rounded-lg max-md:h-56 max-md:w-full">
            <Image src="/brand-logo-placeholder.png" alt="" fill className="scale-110" />
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section className="z-10">
                  <div {...getRootProps()} className="flex flex-col items-center gap-3">
                    <input {...getInputProps()} />
                    <FaCirclePlus className="text-white" />
                    <p className="text-sm text-white">Add Logo</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="w-full">
            <div className="flex w-full gap-2 max-md:flex-col">
              <div className="flex w-full flex-col gap-2">
                <input name="businessName" type="text" placeholder="Enter your business name" className="rounded-lg bg-white/[6%] p-5 text-white outline-none" />
                <input name="businessAddress" type="text" placeholder="Business address" className="rounded-lg bg-white/[6%] p-5 text-white outline-none" />
              </div>
              <div className="flex w-full flex-col gap-2">
                <input name="invoiceDescription" type="text" placeholder="Invoice description" className="rounded-lg bg-white/[6%] p-5 text-white outline-none" />
                <input name="contactNumber" type="text" placeholder="Contact number" className="rounded-lg bg-white/[6%] p-5 text-white outline-none" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
