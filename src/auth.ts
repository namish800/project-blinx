import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { verifyPassword } from '@/utils/password';
import { authConfig } from './auth.config';
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials:any) {
        // // 1) Find user by email (not hashing yet)
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // 2) If user not found or password missing, fail
        if (!user || !user.password) {
          console.log('User not found');
          throw new AuthError('Invalid credentials');
        }

        // 3) Compare plaintext with the stored hashed password
        const passwordMatches = verifyPassword(credentials.password, user.password);
        if (!passwordMatches) {
          console.log('Password does not match');
          throw new AuthError('Invalid credentials');
        }

        console.log('User found and password matches', user);
        // 4) Return user data to be stored in the session
        return user;
      },
    }),
  ],
});
