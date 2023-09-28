import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'client' | 'producer' | 'admin';
  }
}

declare module 'next-auth' {
  interface User {
    id: string;
    role: 'client' | 'producer' | 'admin';
  }

  interface Session {
    user: User;
  }
}
