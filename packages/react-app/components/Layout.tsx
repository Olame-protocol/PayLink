import { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import { cn } from "@/utils/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

const Layout: FC<Props> = ({ children, className = "" }) => {
  return (
    <>
      <div className={cn("flex min-h-screen flex-col", className)}>
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
