import { Footer } from "@/components/sections/footer";
import { Header } from "@/features/header/header";
import { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col pb-12">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
