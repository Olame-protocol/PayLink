import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
  pageName?: string;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
