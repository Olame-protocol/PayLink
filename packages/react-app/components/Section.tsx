import { cn } from "@/utils/utils";
import { ComponentProps, ReactNode } from "react";

type SectionProps = ComponentProps<"section"> & {
  children: ReactNode;
};

export default function Section({ children, ...props }: SectionProps) {
  const { className: classname, ...rest } = props;

  return (
    <div className="px-5">
      <section
        {...rest}
        className={cn(
          "mx-auto max-w-5xl w-full xl:max-w-7xl relative",
          `${classname}`
        )}
      >
        {children}
      </section>
    </div>
  );
}
