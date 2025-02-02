import { z } from "zod";

export const cardsSearchSchema = z.object({
  cardName: z.string().min(1),
  rarity: z.string().min(1),
  exclusivePackName: z.string().min(1),
  exclusivePackSeries: z.string().min(1),
  type: z.string().min(1),
  hp: z.number().min(1),
  stage: z.string().min(1),
});
