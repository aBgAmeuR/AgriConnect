import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export type rolesType = 'visitor' | 'client' | 'producer' | 'admin';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: rolesType;
  }
}

declare module 'next-auth' {
  interface User {
    id: string;
    role: rolesType;
    accessToken: string;
  }

  interface Session {
    user: User;
  }
}
