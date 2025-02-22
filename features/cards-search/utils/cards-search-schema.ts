import { z } from "zod";

export const cardsSearchSchema = z.object({
  cardName: z.string().optional(),
  rarity: z.string().optional(),
  exclusivePackName: z.string().optional(),
  exclusivePackSeries: z.string().optional(),
  type: z.string().optional(),
  move: z.string().optional(),
  hp: z
    .any()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  stage: z.string().optional(),
});
