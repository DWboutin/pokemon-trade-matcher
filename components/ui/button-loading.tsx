import { FC, PropsWithChildren } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const ButtonLoading: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AiOutlineLoading3Quarters className="animate-spin" />
      {children}
    </>
  );
};
