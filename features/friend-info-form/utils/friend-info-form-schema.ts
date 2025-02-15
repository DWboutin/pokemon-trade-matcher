import { z } from "zod";

export const friendInfoFormSchema = z.object({
  friendId: z.string().regex(/^[0-9]{16}$/, {
    message: "Friend ID must be 16 numbers",
  }),
  username: z.string().min(1, { message: "Username is required" }).max(16, {
    message: "Username must be less than 16 characters",
  }),
  icon: z.string().min(1, { message: "Icon is required" }),
  emailNotifications: z.boolean().optional(),
});
