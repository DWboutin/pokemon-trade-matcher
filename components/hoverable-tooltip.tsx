import { TooltipProvider } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { FC, PropsWithChildren } from "react";

type HoverableTooltipProps = {
  content: string;
};

export const HoverableTooltip: FC<PropsWithChildren<HoverableTooltipProps>> = ({
  children,
  content,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
