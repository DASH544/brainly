import { z } from "zod";
export const contentSchema = z.object({
  link: z.url(),
  type: z.enum(["image", "video", "article", "audio"]),
  title: z.string().min(3).max(256),
  tags: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
});

export type Content = z.infer<typeof contentSchema>;
