import type { NextAuthConfig }  from 'next-auth';
import { UserProfileStatus } from '@prisma/client';
import { NextResponse } from 'next/server'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
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
    async authorized({ auth, request }) {

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');

      const isOnboarded = auth?.user?.profileStatus === UserProfileStatus.COMPLETE;

      const isOnOnboarding = request.nextUrl.pathname.startsWith('/onboarding');

      if (isOnDashboard) {
        if (!isLoggedIn) return false; // Redirect to login
        if (!isOnboarded) return NextResponse.redirect(new URL('/onboarding', request.url));
        return true;
      } else if (isOnOnboarding) {
        if (!isLoggedIn) return false; // Redirect to login
        // TODO: if already onboarded, redirect to dashboard
        if (isOnboarded) return NextResponse.redirect(new URL('/dashboard', request.url)); // Redirect to dashboard
        return true;
      }
      // } else if (isLoggedIn) {
      //   return NextResponse.redirect(new URL('/dashboard', request.url));
      // }
      return true;
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;