import { z } from "zod";
export const userSchema = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(8).max(32),
}).strict();

export type User = z.infer<typeof userSchema>;
