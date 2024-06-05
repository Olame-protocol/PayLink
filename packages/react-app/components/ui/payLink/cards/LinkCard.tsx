import { ReactElement } from "react";

export default function LinkCard({ icon, description, value }: { icon: ReactElement; description: string; value: string }) {
  return (
    <div className="font-space-grotesk bg-velix-slate-blue dark:bg-velix-form-input-dark flex items-center justify-between rounded-xl px-7 py-5">
      <div className="flex items-center gap-3 text-xs lg:text-base">
        {icon}
        <p className="text-velix-gray">{description}</p>
      </div>
      <span className="text-velix-primary dark:text-velix-dark-white font-medium">{value}</span>
    </div>
  );
}
