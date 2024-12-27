"use server"

import { auth, signIn, signOut } from "@/auth"
import { AuthError } from 'next-auth';
import { z } from 'zod';
import prisma from "@/lib/prisma"
import { OnboardingData } from "@/types/onboarding";
import { redirect } from 'next/navigation';
import { UserProfileStatus } from "@prisma/client";


const getCallbackUrl = (url: string) => {
  try {
    console.log("URL:", url)
    const searchParams = new URLSearchParams(new URL(url).search);
    const encodedCallback = searchParams.get('callbackUrl');
    console.log("Encoded callback:", encodedCallback)
    return encodedCallback ? decodeURIComponent(encodedCallback) : '/dashboard';
  } catch (error) {
    console.error('Error parsing callback URL:', error);
    return '/dashboard';
  }
}

const isOnboardingComplete = async (email: string | null) => {
  // Check if the user's profile is complete
  if(email) {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: { profile: true, company: true, content: true },
    });
    console.log("User:", user)
    return user?.profileStatus === UserProfileStatus.COMPLETE;
  }
  return false;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log("GOing to sign in")
    const callbackUrl = await signIn('credentials', {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });

    const redirectToCallbackUrl = getCallbackUrl(callbackUrl || '');
    const email = formData.get("email") as string;
    console.log("Email:", email)
    const redirectTo = await isOnboardingComplete(email)? redirectToCallbackUrl : '/onboarding';
    console.log("Redirecting to:", redirectTo);
    redirect(redirectTo)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signout() {
    console.log("Signing out")
    await signOut({redirectTo: '/'});

}


const waitlistSchema = z.object({
  email: z.string().email("Invalid email format"),
})


// not having prev state because this function is used in server component
export async function joinWaitlist(prevState: any, formData: FormData) {
  // 2. Extract fields from FormData
  const email = formData.get("email")
  const name = formData.get("name")

  // 3. Parse and validate using Zod
  //    If invalid, this will throw a ZodError
  const validatedData = waitlistSchema.parse({
    email,
    name,
  })

  const existing = await prisma.waitlist.findUnique({
    where: { email: validatedData.email },
  })
  if (existing) {
    // Email already exists, return an error response
    console.log("Email already in waitlist")
    return {
      success: true,
      message: "Email already in waitlist",
      data: existing,
    }
  }

  console.log("Joining waitlist with data:", validatedData)

  try {
    const newEntry = await prisma.waitlist.create({
      data: {
        email: validatedData.email,
      },
    })

    return {
      success: true,
      message: "Successfully joined waitlist!",
      data: newEntry,
    }
  } catch (err: any) {
    // Log any DB errors, e.g., duplicate email
    console.error("[joinWaitlist DB Error]", err)
    return {
      success: false,
      message: err.message ?? "Something went wrong",
    }
  }
}

// Custom Error Classes for Better Error Handling
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

/**
 * Creates or updates the user's profile, company, and content information.
 * @param formData - The onboarding data collected from the user.
 * @throws {AuthenticationError} If the user is not authenticated.
 * @throws {DatabaseError} If there's an issue saving data to the database.
 */
export async function createProfile(formData: OnboardingData) {
  console.log("Creating profile with data:", formData)
  // Retrieve the authenticated user's session
  const session = await auth()

  // Validate the session
  if (!session || !session.user) {
    return { success: false, message: 'User is not authenticated.' }
  }

  const userEmail = session.user.email

  if (!userEmail) {
    return { success: false, message: 'User email not found in session.' }
  }

  // Retrieve the user from the database using their email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  })

  if (!user) {
    return { success: false, message: 'User not found in the database.' }
  }

  // Destructure the formData for easier access
  const { profile, company, content } = formData

  console.log('Creating profile for user:', formData)

  try {
    // Use a transaction to ensure all operations succeed or fail together
    await prisma.$transaction([
      // Upsert Profile
      prisma.profile.upsert({
        where: { userId: user.id },
        update: {
          name: profile.name,
          department: profile.department,
          role: profile.role,
        },
        create: {
          name: profile.name,
          department: profile.department,
          role: profile.role,
          userId: user.id,
        },
      }),

      // Upsert Company
      prisma.company.upsert({
        where: { userId: user.id },
        update: {
          size: company.size,
          industry: company.industry,
        },
        create: {
          size: company.size,
          industry: company.industry,
          userId: user.id,
        },
      }),

      // Upsert Content
      prisma.content.upsert({
        where: { userId: user.id },
        update: {
          contentTypes: content.contentTypes,
        },
        create: {
          contentTypes: content.contentTypes,
          userId: user.id,
        },
      }),

      // Update User's profileStatus to COMPLETE
      prisma.user.update({
        where: { id: user.id },
        data: {
          profileStatus: UserProfileStatus.COMPLETE,
          name: profile.name,
        },
      }),
    ])

    const updUser = await prisma.user.findUnique({
      where: { email: userEmail },
    })
    console.log('Onboarding data saved successfully!')
    

  } catch (error: any) {
    console.error('Error creating profile:', error)
    return { success: false, message: 'Failed to save onboarding data.' }
  }
  return { success: true , message: 'Profile created successfully'}
}  