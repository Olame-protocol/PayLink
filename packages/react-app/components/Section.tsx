import { cn } from "@/utils/utils";
import { ComponentProps, ReactNode } from "react";

type SectionProps = ComponentProps<"section"> & {
  children: ReactNode;
};

export default function Section({ children, ...props }: SectionProps) {
  const { className: classname, ...rest } = props;

  return (
    <div className="px-5">
      <section {...rest} className={cn("relative mx-auto w-full max-w-5xl xl:max-w-7xl", `${classname}`)}>
        {children}
      </section>
    </div>
  );
}
