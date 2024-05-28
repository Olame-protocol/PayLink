import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-green-petrolium overflow-hidden flex flex-col min-h-screen">
        <Header />
        {children}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
