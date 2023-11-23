import { z } from 'zod';

export const StockSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  quantity: z.number(),
  available: z.number(),
  reserved: z.number(),
  price: z.string(),
  unit: z.string(),
});

export type Stock = z.infer<typeof StockSchema>;
