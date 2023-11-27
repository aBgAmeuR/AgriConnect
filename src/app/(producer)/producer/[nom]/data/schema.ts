import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  price: z.number(),
  unit: z.string(),
  stock: z.string(),
  image: z.string(),
  id_producter: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
