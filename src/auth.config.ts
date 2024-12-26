import type { NextAuthConfig }  from 'next-auth';
import { UserProfileStatus } from '@prisma/client';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, user, token }) {
      if (token?.profileStatus) {
        session.user.profileStatus = token.profileStatus as UserProfileStatus;
      }
      return session;
    },
    async jwt({ token, user, trigger, session}) {
      if (trigger === "update" && session) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        console.log("JWT update triggered", token, user, session);
        token = { ...token, ...session };
      }
      if (trigger=='signIn' && user) {
        token.profileStatus = user.profileStatus;
      }

      return token;
    },
    async authorized({ auth, request: { nextUrl } }) {

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      let isOnboarded = auth?.user?.profileStatus === UserProfileStatus.COMPLETE;

      const isOnOnboarding = nextUrl.pathname.startsWith('/onboarding');

      if (isOnDashboard) {
        if (!isLoggedIn) return false; // Redirect to login
        if (!isOnboarded) {
          return Response.redirect(new URL('/onboarding', nextUrl));
        }
        return true;
      } else if (isOnOnboarding) {
        if (!isLoggedIn) return false; // Redirect to login
        if (isOnboarded) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      } else if (isLoggedIn) {
        if (!isOnboarded) {
          return Response.redirect(new URL('/onboarding', nextUrl));
        }
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;