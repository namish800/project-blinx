import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { UserProfileStatus } from '@prisma/client';

declare module "next-auth" {
  interface User extends DefaultUser {
    profileStatus?: UserProfileStatus; // Add custom field
  }

  interface Session extends DefaultSession {
    user?: User;
  }

}

declare module "next-auth/jwt" {
    interface JWT {
      profileStatus?: UserProfileStatus; // Add custom field
    }
  }