import type { NextAuthOptions, Session, User } from 'next-auth';
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
          return null;
        }

        var formdata = new FormData();
        formdata.append('email', credentials.email);
        formdata.append('password', credentials.password);

        // const res = await fetch(config.API_URL + '/login', {
        //   method: 'POST',
        //   redirect: 'follow',
        //   body: formdata,
        // });

        // const { data: user, error } = await res.json();

        const error = false;
        const user = {
          id: credentials.email,
          role: 'admin',
          accessToken: '123',
        };

        if (!error) {
          return {
            id: user.id,
            role: user.role,
            accessToken: user.accessToken,
          };
        } else {
          return error;
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
    async jwt({ token, user }: { token: JWT; user: User }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as rolesType;
        session.user.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
};
