import { ComponentProps, ReactNode } from "react";

type SectionProps = ComponentProps<"section"> & {
  children: ReactNode;
};

export default function Section({ children, ...props }: SectionProps) {
  return (
    <section {...props}>
      <div className="max-w-5xl xl:max-w-5xl m-auto  relative">{children}</div>
    </section>
  );
}
