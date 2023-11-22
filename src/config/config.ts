import { env } from 'process';

export const config = {
  API_URL: env.API_URL?.toString(),
};
