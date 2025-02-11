"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";
import { CardsSearch } from "@/features/cards-search/cards-search";
import { useTradeCreator } from "@/features/trade-creator-form/hooks/useTradeCreator";
import { TradeCreatorCardModal } from "@/features/trade-creator-form/components/trade-creator-card-modal";
import { TradeCreatorPreview } from "@/features/trade-creator-form/components/trade-creator-preview";
import { CardsListing } from "@/components/cards-listing";
import { Typography } from "@/components/typography";
import { CardsSearchListing } from "@/features/cards-search-listing/cards-search-listing";

export const TradeCreatorForm: FC = () => {
  const {
    selectors: { isModalOpen, searchedCard, offeredCards, tradeIsValid, isLoading },
    actions: {
      handleCardClick,
      handleModalOpenChange,
      handleSearchedCardChange,
      handleOfferedCardsChange,
      handleTradeReset,
      handleTradeCreation,
      handleSearchSubmit,
    },
  } = useTradeCreator();

  return (
    <>
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
            <CardDescription>
              Search for cards and click on them to add them as your searched card or cards you want
              to offer for a trade.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CardsSearch isLoading={isLoading} handleSearchSubmit={handleSearchSubmit} />
            <CardsSearchListing handleCardClick={handleCardClick} />
            <TradeCreatorPreview searchedCard={searchedCard} offeredCards={offeredCards} />
          </CardContent>
          <CardFooter className="flex flex-row justify-end gap-2">
            <Button variant="outline" onClick={handleTradeReset}>
              Reset
            </Button>
            <Button disabled={!tradeIsValid} onClick={handleTradeCreation}>
              Create trade
            </Button>
          </CardFooter>
        </Card>
      </div>
      <TradeCreatorCardModal
        isOpen={isModalOpen}
        searchedCard={searchedCard}
        offeredCards={offeredCards}
        onOpenChange={handleModalOpenChange}
        handleSearchedCardChange={handleSearchedCardChange}
        handleOfferedCardsChange={handleOfferedCardsChange}
      />
    </>
  );
};
