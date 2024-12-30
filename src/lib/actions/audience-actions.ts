"use server"

import { auth } from "@/auth";
import { PersonaDTO } from "@/types/persona-dto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPersona, fetchMockPersona } from "@/lib/data";

// export async function createPersona(personaData: { name: string; archetype: string }) {
//     // Mock implementation
//     console.log('Creating persona:', personaData)
//     revalidatePath('/audience')
//   }
  
export async function createPersonaFromUrl(state: void | undefined, data: FormData): Promise<void | undefined> {
  const brandUrl = (data.get("brandUrl") as string) ?? ""

  const session = await auth();
  const userId = session?.user?.id
  if(!userId){
    redirect("/login")
  }

  // TODO: call AI server to generate Persona
  const personaData = await fetchMockPersona()
  if(!personaData) {
    redirect(`/dashboard/audience?error=Persona-Not-Found`)
  }
  let createdPersona;
  try {
    if (brandUrl.trim()) {
      // Attempt to create from URL
      createdPersona = await createPersona(userId, personaData)
    } else {
      // If neither approach is valid, throw an error
      throw new Error("Please enter a URL.")
    }
  } catch (error) {
      // In a real scenario, you might pass the error as a query param or something else
      console.log(error)
      revalidatePath("/dashboard/audience")
      redirect(`/dashboard/audience?error=${encodeURIComponent((error as Error).message)}`)
  }
  const id = createdPersona.id;
  revalidatePath('/dashboard/audience')
  redirect(`/dashboard/audience/${id}`)
}


  // /**
  //  * Server Action for creating a Brand.
  //  * @param data - The FormData passed from the client component's onSubmit
  //  */
  // export async function handlePersonaSubmitAction(state: void | undefined, data: FormData): Promise<void | undefined> {
  //   // Extract fields from form data
  //   const brandUrl = (data.get("brandUrl") as string) ?? ""
  
  //   const session = await auth();
  //   const userId = session?.user?.id
  //   if(!userId){
  //     redirect("/login")
  //   }
  
  //   let createdPersona:
  //   try {
  //     if (brandUrl.trim()) {
  //       // Attempt to create from URL
  //       createdBrand = await createBrandFromUrl(brandUrl, userId)
  //     } else if (brandName.trim() && brandDescription.trim()) {
  //       // Or create from name and description
  //       createdBrand = await createBrand({ name: brandName, description: brandDescription, userId: userId})
  //     } else {
  //       // If neither approach is valid, throw an error
  //       throw new Error("Please enter a URL or fill in both name and description.")
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     // In a real scenario, you might pass the error as a query param or something else
  //     revalidatePath("/dashboard/brand-kit")
  //     redirect(`/dashboard/brand-kit?error=${encodeURIComponent((error as Error).message)}`)
  //   }
  
  //   const id = createdBrand.id
  
  //       // If successful, you can redirect or revalidate
  //     // For example, redirect to a success page:
  
  //   const redirectTo = `/dashboard/brand-kit/${id}`;
  //   revalidatePath("/dashboard/brand-kit")
  //   redirect(redirectTo)
  
  // }