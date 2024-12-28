"use client"
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { OnboardingData } from "@/types/onboarding";
import { createProfile } from "@/lib/actions/actions";
import { useActionState, useEffect } from "react";
import { UserProfileStatus } from "@prisma/client";

export default function OnboardingForm({formData}: {formData: OnboardingData}) {
    const { update } = useSession();
    const router = useRouter();
    const createProfileWithFormData = createProfile.bind(null, formData)
    const initialState = {
      message: '',
      success: false,
      formData: formData 
    }
    const [state, formAction, isPending] = useActionState(createProfileWithFormData, initialState)
  
    useEffect(() => {
      const handleProfileUpdate = async () => {
      console.log("updating session")
      console.log("state", state)
      console.log("isPending", isPending) 
        if(!isPending) {
          if (state?.success) {
            await update({profileStatus: UserProfileStatus.COMPLETE, name: formData.profile.name})
            console.log("redirecting to dashboard")
            router.push('/dashboard')
          }
        }
      }
  
      handleProfileUpdate()
  
    }, [isPending])
  
    return (<form action={formAction}>
                <Button type='submit' disabled={isPending}>
                  {isPending ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
    );
  }