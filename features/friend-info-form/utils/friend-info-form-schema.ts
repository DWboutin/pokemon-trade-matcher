import { z } from "zod";

export const friendInfoFormSchema = z.object({
  friendId: z.string().regex(/^[0-9-]{16,19}$/, {
    message: "Friend ID must be 16 numbers, optionally separated by dashes",
  }),
  username: z.string().min(1, { message: "Username is required" }),
  icon: z.string().min(1, { message: "Icon is required" }),
});
