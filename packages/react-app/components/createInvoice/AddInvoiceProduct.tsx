import React from "react";

import { FiUserPlus } from "react-icons/fi";
import { MdOutlineSearch } from "react-icons/md";
import { Button } from "../ui/button";
import { FaCirclePlus } from "react-icons/fa6";

function AddInvoiceProduct() {
  return (
    <>
      <div className="flex h-full gap-2 rounded-lg bg-white/[8%] px-5 py-5 max-md:flex-col max-md:px-5">
        <Button className="flex h-auto w-[15%] flex-row items-center gap-2 bg-green-petrolium text-forest hover:bg-green-petrolium max-md:w-full">
          <FaCirclePlus />
          Add product
        </Button>
        <div className="flex w-full items-center gap-3 rounded-lg bg-white/[6%] px-3">
          <MdOutlineSearch className="text-white" />
          <input type="text" placeholder="Search for products" className="w-full bg-transparent py-5 text-white outline-none" />
        </div>
      </div>
    </>
  );
}

export default AddInvoiceProduct;
