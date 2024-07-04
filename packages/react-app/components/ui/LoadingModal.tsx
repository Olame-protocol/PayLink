import React from "react";
import LoadingSpinner from "./payLink/icons/LoadingSpinner";
import { IoCloseCircleOutline } from "react-icons/io5";
import CheckIcon from "./payLink/icons/CheckIcon";

type LoadingModalProps = {
  title: string;
  onCLoseModal: () => void;
  disabled?: boolean;
  isSuccess: boolean;
};

const LoadingModal = ({ title, onCLoseModal, disabled, isSuccess }: LoadingModalProps) => {
  return (
    <div className="relative mx-auto flex h-full flex-col items-center justify-center gap-5 rounded-lg bg-white/[8%] p-32 max-md:m-0 max-md:h-full max-md:w-full">
      <button disabled={disabled} className="absolute right-0 top-0 mr-3 mt-3 disabled:opacity-30" onClick={onCLoseModal}>
        <IoCloseCircleOutline className="h-6 w-6 text-white/40" />
      </button>
      {isSuccess ? <CheckIcon className="max-md:h-8 max-md:w-8" /> : <LoadingSpinner className="animate-spin max-md:h-8 max-md:w-8" />}
      <p className="text-4xl font-bold text-green-petrolium max-md:text-2xl">{title}</p>
    </div>
  );
};

export default LoadingModal;
