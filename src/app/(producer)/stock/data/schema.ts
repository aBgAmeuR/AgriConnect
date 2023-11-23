import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  role: z.string(),
  phone: z.number(),
  email: z.string().email(),
  createdAt: z.string(),
});

export type Account = z.infer<typeof AccountSchema>;
