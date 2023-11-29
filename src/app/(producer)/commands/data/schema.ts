import { z } from 'zod';

export const OrderSchema = z.object({
  numero: z.string(),
  status: z.enum(['pending', 'confirmed', 'delivered']),
  date: z.date(),
  montant: z.number(),
  client: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;
