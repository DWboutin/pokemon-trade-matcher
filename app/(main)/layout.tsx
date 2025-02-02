import { Header } from "@/features/header/header";
import { Providers } from "@/providers/providers";
import { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
