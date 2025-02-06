import { Header } from "@/features/header/header";
import { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="container mx-auto">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
