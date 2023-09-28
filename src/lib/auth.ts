import type { Account, NextAuthOptions, Profile, Session, User } from 'next-auth';
// import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

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
        // if (!credentials?.username || !credentials.password) {
        //   console.log('premier null');

        //   return null;
        // }

        // const name = credentials.username;
        // const password = credentials.password;

        // const user = await prisma.user.findUnique({
        //   where: {
        //     name,
        //   },
        // });

        // if (!user) {
        //   console.log('deuxieme null');

        //   return null;
        // }

        // const userPassword = user.password;

        // const isValidPassword = bcrypt.compareSync(password, userPassword);

        // if (!isValidPassword) {
        //   console.log('troisieme null');
        //   return null;
        // }
        // console.log('log ok : ', user);

        // return {
        //   id: user.id,
        //   name: user.name,
        // };
        const user = { id: '1234', email: '1234@gmail.com', password: 'nextauth', role: 'admin' };

        function timeout(delay: number) {
          return new Promise((res) => setTimeout(res, delay));
        }
        await timeout(1000); // wait 1 second

        if (credentials?.email === user.email && credentials.password === user.password) {
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
    signIn: '/signin',
    signOut: '/signout',
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
        params.session.user.role = params.token.role as 'client' | 'producer' | 'admin';
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
