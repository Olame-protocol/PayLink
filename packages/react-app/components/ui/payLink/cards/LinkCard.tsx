import { ReactElement } from "react";

export default function LinkCard({
  icon,
  description,
  value
}: {
  icon: ReactElement;
  description: string;
  value: string;
}) {
  return (
    <div className="flex py-5 px-7 rounded-xl font-space-grotesk justify-between items-center bg-velix-slate-blue dark:bg-velix-form-input-dark">
      <div className="flex items-center gap-3 lg:text-base text-xs">
        {icon}
        <p className="text-velix-gray">{description}</p>
      </div>
      <span className="text-velix-primary dark:text-velix-dark-white font-medium">
        {value}
      </span>
    </div>
  );
}