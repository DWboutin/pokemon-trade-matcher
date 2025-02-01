import { Header } from "@/features/header/header";
import { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
