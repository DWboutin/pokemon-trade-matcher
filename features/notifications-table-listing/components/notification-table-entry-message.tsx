import { Typography } from "@/components/typography";
import { NotificationType } from "@/types/app";
import { PopulatedNotification } from "@/utils/factories/populate-notification-with-card-data";
import { FC } from "react";

type NotificationTableEntryMessageProps = {
  notification: PopulatedNotification;
};

export const NotificationTableEntryMessage: FC<NotificationTableEntryMessageProps> = ({
  notification,
}) => {
  switch (notification.type) {
    case NotificationType.TradeOffer:
      return <Typography variant="p" text="Trade" />;
    case NotificationType.OfferAccepted:
      return (
        <Typography
          variant="p"
          text={`Your offer to trade ${notification.offeredCard?.cardName} for ${notification.wantedCard?.cardName} has been accepted`}
        />
      );
    case NotificationType.TradeClosed:
      return (
        <Typography variant="p" text={`A trade you participated in has been closed by the owner`} />
      );
    case NotificationType.ProfileReview:
      return <Typography variant="p" text="Profile" />;
    case NotificationType.TradeCompleted:
      return (
        <Typography variant="p" text={`A trade you participated in has been marked as completed`} />
      );

    default:
      return null;
  }
};
