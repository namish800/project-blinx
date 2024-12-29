'use server'

import type { BrandDTO, ColorPalette, Logo, Font, TextStyleItem, Rules, Brand } from "@/types/brand-dto"
import prisma from "@/lib/prisma"
import { createBrand, createBrandFromUrl, updateBrandKit } from "@/lib/data"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { StyleItemType, TermTypeEnum } from "@prisma/client"


// This is a mock function to simulate database operations
async function updateDatabase(data: Partial<BrandDTO>): Promise<void> {
  console.log('Updating database:', data)
  // In a real application, you would update your database here
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
}

export async function updateColorPalette(brandKitId: string, colorPalette: ColorPalette) {
  const partialDto = {brandStyle: {colorPalette}}
  await updateBrandKit(brandKitId, partialDto as Partial<BrandDTO>)
}

export async function updateLogos(brandKitId:string, logos: Logo[]) {
  await updateBrandKit(brandKitId, { brandStyle: { logos } } as Partial<BrandDTO>)
}

export async function updateFonts(brandKitId:string, fonts: Font[]) {
  await updateBrandKit(brandKitId, { brandStyle: { fonts } } as Partial<BrandDTO>)
}

export async function updateTextStyleGuide(
  values: TextStyleItem[],
  tones: TextStyleItem[],
  rules: Rules
) {
  await updateDatabase({ textStyleGuide: { values, tones, rules } })
}

export async function updateLanguage(language: string) {
  await updateDatabase({ language })
}


// export async function createBrandKit(formData: FormData) {
//   await createBrand(brand)
// }

/**
 * Server Action for creating a Brand.
 * @param data - The FormData passed from the client component's onSubmit
 */
export async function handleBrandSubmitAction(state: void | undefined, data: FormData): Promise<void | undefined> {
  // Extract fields from form data
  const brandUrl = (data.get("brandUrl") as string) ?? ""
  const brandName = (data.get("brandName") as string) ?? ""
  const brandDescription = (data.get("brandDescription") as string) ?? ""

  const session = await auth();
  const userId = session?.user?.id
  if(!userId){
    redirect("/login")
  }

  let createdBrand: Brand;
  try {
    if (brandUrl.trim()) {
      // Attempt to create from URL
      createdBrand = await createBrandFromUrl(brandUrl, userId)
    } else if (brandName.trim() && brandDescription.trim()) {
      // Or create from name and description
      createdBrand = await createBrand({ name: brandName, description: brandDescription, userId: userId})
    } else {
      // If neither approach is valid, throw an error
      throw new Error("Please enter a URL or fill in both name and description.")
    }
  } catch (error) {
    console.log(error)
    // In a real scenario, you might pass the error as a query param or something else
    revalidatePath("/dashboard/brand-kit")
    redirect(`/dashboard/brand-kit?error=${encodeURIComponent((error as Error).message)}`)
  }

  const id = createdBrand.id

      // If successful, you can redirect or revalidate
    // For example, redirect to a success page:

  const redirectTo = `/dashboard/brand-kit/${id}`;
  revalidatePath("/dashboard/brand-kit")
  redirect(redirectTo)

}

