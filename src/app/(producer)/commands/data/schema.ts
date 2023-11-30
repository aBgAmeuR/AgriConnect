import { z } from 'zod';

export const OrderSchema = z.object({
  numero: z.string(),
  statut: z.string(),
  date: z.string(),
  montant: z.string(),
  client: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;
