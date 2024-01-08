import { z } from 'zod';

export const OrderSchema = z.object({
  numero: z.string(),
  statut: z.string(),
  date: z.string(),
  montant: z.string(),
  client: z.string(),
  payement: z.string(),
  id_product: z.string(),
  name_product: z.string(),
  desc_product: z.string(),
  type_product: z.string(),
  price_product: z.string(),
  unit_product: z.string(),
  stock_product: z.string(),
  image_product: z.string(),
  id_producer: z.string(),
  id_user: z.string(),
  email_user: z.string(),
  phoneNumber_user: z.string(),
});

export type InfoOrder = z.infer<typeof OrderSchema>;