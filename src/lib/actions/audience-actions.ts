import { revalidatePath } from "next/cache";

export async function createPersona(personaData: { name: string; archetype: string }) {
    // Mock implementation
    console.log('Creating persona:', personaData)
    revalidatePath('/audience')
  }
  
  export async function createPersonaFromUrl(url: string) {
    // Mock implementation
    console.log('Creating persona from URL:', url)
    revalidatePath('/audience')
  }