import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

type OfferCardBadgeProps = {
  status: string;
};

export const OfferCardBadge = ({ status }: OfferCardBadgeProps) => {
  const badgeVariant = useMemo(() => {
    if (status === "pending") {
      return "default";
    }

    if (status === "accepted") {
      return "success";
    }

    return "destructive";
  }, [status]);

  return <Badge variant={badgeVariant}>{status}</Badge>;
};
