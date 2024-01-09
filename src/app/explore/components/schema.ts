import { z } from 'zod';

export const ProduceurSchema = z.object({
  address: z.string(),
  category: z.string(),
  description: z.string(),
  id: z.string(),
  image: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  paymentMethod: z.string(),
  phoneNumber: z.number(),
  name: z.string(),
});

export const ProduceursSchema = z.array(ProduceurSchema);