import { cn } from "@/utils/utils";
import { ComponentProps, ReactNode } from "react";
import { useRouter } from "next/router";

type SectionProps = ComponentProps<"section"> & {
  children: ReactNode;
};

export default function Section({ children, ...props }: SectionProps) {
  const { className: classname, ...rest } = props;
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className={`${currentRoute==="/links" ? "px-0 md:px-3" :"px-3"}`}>
      <section {...rest} className={cn("relative mx-auto w-full max-w-5xl xl:max-w-7xl", `${classname}`)}>
        {children}
      </section>
    </div>
  );
}
