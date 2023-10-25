import type { Account, NextAuthOptions, Profile, Session, User } from 'next-auth';
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import { rolesType } from '@/types/next-auth';
import { config } from '@/config/config';

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.log('premier null');

          return null;
        }

        var formdata = new FormData();
        formdata.append('email', credentials.email);
        formdata.append('password', credentials.password);

        const res = await fetch(config.API_URL + '/login', {
          method: 'POST',
          redirect: 'follow',
          body: formdata,
        });

        const data = await res.json();
        const user = data[0];

        if (user.id) {
          return {
            id: user.id,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    },
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    newUser: '/register',
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error('No token to encode');
      }

      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error('No token to decode');
      }
      const decodedToken = jwt.verify(token, secret);
      if (typeof decodedToken === 'string') {
        return JSON.parse(decodedToken);
      } else {
        return decodedToken as JWT;
      }
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async session(params: { session: Session; token: JWT; user: User }) {
      if (params.session.user) {
        params.session.user.id = params.token.id as string;
        params.session.user.role = params.token.role as rolesType;
      }

      return params.session;
    },
    async jwt(params: { token: JWT; user?: User | undefined; account?: Account | null | undefined; profile?: Profile | undefined; isNewUser?: boolean | undefined }) {
      if (params.user) {
        params.token.id = params.user.id;
        params.token.role = params.user.role;
      }

      return params.token;
    },
  },
};
