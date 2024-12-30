import { BrandDTO } from "@/types/brand-dto";
import type { Brand, ColorPalette } from "@/types/brand-dto"
import prisma from "@/lib/prisma";
import { StyleItemType, TermTypeEnum, UserProfileStatus } from "@prisma/client";

import {
  TextStyleItem,
  Term,
} from "@/types/brand-dto" // Adjust import to where you keep these interfaces
import { BehavioralTraits, Demographics, PersonaDTO, SuggestedTargeting } from "@/types/persona-dto";

export async function fetchBrandData(id: string): Promise<BrandDTO> {
  // 1. Query the BrandKit by id, including related data
  const brandKit = await prisma.brandKit.findUnique({
    where: { id },
    include: {
      colorPalette: true,
      logos: true,
      fonts: true,
      textStyleGuide: {
        include: {
          styleItems: true,
          rules: {
            include: {
              terms: true,
            },
          },
        },
      },
    },
  })

  if (!brandKit) {
    throw new Error(`Brand kit not found for id: ${id}`)
  }

  // 2. Split style items into values vs. tones
  const values: TextStyleItem[] =
    brandKit.textStyleGuide?.styleItems
      .filter((item) => item.type === "VALUE")
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
      })) ?? []

  const tones: TextStyleItem[] =
    brandKit.textStyleGuide?.styleItems
      .filter((item) => item.type === "TONE")
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
      })) ?? []

  // 3. Split terms into preferred vs. avoided
  let preferredTerms: Term[] = []
  let termsToAvoid: Term[] = []

  const allTerms = brandKit.textStyleGuide?.rules?.terms
  if (allTerms) {
    preferredTerms = allTerms
      .filter((t) => t.termType===TermTypeEnum.PREFERRED)
      .map((t) => ({ id: t.id, text: t.text }))

    termsToAvoid = allTerms
      .filter((t) => t.termType===TermTypeEnum.AVOID)
      .map((t) => ({ id: t.id, text: t.text }))
  }

  // 4. Shape the data as a BrandDTO
  const dto: BrandDTO = {
    name: brandKit.name,
    description: brandKit.description,
    brandStyle: {
      colorPalette: {
        id: brandKit.colorPalette?.id,
        name: brandKit.colorPalette?.name ? brandKit.colorPalette?.name : "",
        colors: brandKit.colorPalette?.colors ? brandKit.colorPalette?.colors : []
      },
      logos: brandKit.logos.map((logo) => ({
        id: logo.id,
        url: logo.url,
      })),
      fonts: brandKit.fonts.map((font) => ({
        id: font.id,
        name: font.name,
        usage: font.usage,
      })),
    },
    textStyleGuide: {
      values,
      tones,
      rules: {
        preferredTerms,
        termsToAvoid,
      },
    },
    language: brandKit.language,
  }

  return dto
}


// This function simulates fetching data from an API or database
export async function fetchBrandDataMock(id: string): Promise<BrandDTO> {



  return {
    name: "Blinx",
    description: "AI-powered marketing platform that helps businesses create personalized content faster and more efficiently.",
    brandStyle: {
      colorPalette:
        {
          id: "1",
          name: "Primary Palette",
          colors: ["#fd243e", "#1F2937", "#EC4899", "#FFFFFF"]
        }
      ,
      logos: [
        {
          id: "1",
          url: "/placeholder.svg?height=100&width=100"
        }
      ],
      fonts: [
        {
          id: "1",
          name: "Inter",
          usage: "Primary"
        },
        {
          id: "2",
          name: "Roboto",
          usage: "Secondary"
        }
      ]
    },
    textStyleGuide: {
      values: [
        {
          id: "1",
          title: "Care",
          description: "We prioritize the well-being and happiness of our customers, ensuring they receive the best service and attention they deserve."
        },
        {
          id: "2",
          title: "Quality",
          description: "We are committed to providing high-quality solutions that meet the needs of both businesses and their customers."
        },
        {
          id: "3",
          title: "Innovation",
          description: "We continuously seek out new and exciting ways to improve our AI-powered marketing solutions."
        }
      ],
      tones: [
        {
          id: "1",
          title: "Professional",
          description: "Our communication is polished and competent, instilling confidence in our expertise."
        },
        {
          id: "2",
          title: "Friendly",
          description: "We maintain a warm and approachable tone, making our platform welcoming to all users."
        },
        {
          id: "3",
          title: "Innovative",
          description: "Our language reflects our cutting-edge technology and forward-thinking approach."
        }
      ],
      rules: {
        preferredTerms: [
          {
            id: "1",
            text: "Use \"create\" instead of \"make\""
          },
          {
            id: "2",
            text: "Use \"platform\" instead of \"tool\""
          },
          {
            id: "3",
            text: "Use \"AI-powered\" instead of \"automated\""
          },
          {
            id: "4",
            text: "Use \"personalized\" instead of \"custom\""
          }
        ],
        termsToAvoid: [
          {
            id: "1",
            text: "Don't use \"simple\" or \"easy\""
          },
          {
            id: "2",
            text: "Avoid \"revolutionary\" or \"groundbreaking\""
          },
          {
            id: "3",
            text: "Don't use technical abbreviations"
          },
          {
            id: "4",
            text: "Avoid negative language"
          }
        ]
      }
    },
    language: "en"
  };
}

export async function fetchBrands(): Promise<Brand[]> {
  // Keeping the existing function as is
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    { id: "1", name: "Acme Inc", description: "Technology solutions provider" },
    { id: "2", name: "GlobalTech", description: "Innovative software company" },
    { id: "3", name: "EcoSolutions", description: "Sustainable product manufacturer" },
  ]
}

export async function fetchBrandKitsByUserEmail(
  userEmail?: string
): Promise<Brand[]> {
  if (!userEmail) {
    throw new Error("No user email provided.")
  }

  console.log("Fetching brand kits for user:", userEmail)

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      usersToBrandKits: {
        include: {
          brandKit: true
        }
      }
    }
  })

  if (!user) {
    throw new Error("User not found.")
  }

  // Convert each joined BrandKit into your desired shape
  const brands: Brand[] = user.usersToBrandKits.map((ubk) => {
    const { id, name, description } = ubk.brandKit
    return { id, name, description }
  })

  return brands
}


/**
 * Create a new BrandKit, associate it with a user, and return
 * a simplified Brand object.
 *
 * @param brandData - an object with { name, description, userId }, excluding the "id" since it's generated by the DB.
 */
export async function createBrand(
  brandData: Omit<Brand, "id"> & { userId: string }
): Promise<Brand> {
  console.log("Creating brand:", brandData)

  const { name, description, userId } = brandData

  // Create the BrandKit and link it to the user via usersToBrandKits
  const created = await prisma.brandKit.create({
    data: {
      name,
      description,
      // Create the join record in `UsersToBrandKits`
      usersToBrandKits: {
        create: {
          userId, // references the "id" field in "User"
        },
      },
      // (optional) If you want to set additional fields (language, textStyleGuide, etc.), do it here.
    },
  })

  console.log("Created brand:", created)

  // Return a simplified object (Brand).
  return {
    id: created.id,
    name: created.name,
    description: created.description,
  }
}

export async function createBrandFromUrl(url: string, userId: string) {
  console.log('Creating brand from URL:', url)

  // TODO: Call AI workflow to create Brand Kit
  const newBrand = {
    name: `Brand from ${new URL(url).hostname}`,
    description: `Automatically generated brand from ${url}`,
    userId: userId
  }
  const created = await createBrand(newBrand)
  return created
}

/**
 * Partially updates a BrandKit (and nested records) by ID.
 * Only fields present in the `data` object will be modified.
 * @param id - The BrandKit's ID to update.
 * @param data - Partial brand data; anything undefined is left as-is.
 */
export async function updateBrandKit(
  id: string,
  data: Partial<BrandDTO>
): Promise<void> {

  console.log("Data", data)

  // Start building the object we’ll pass to Prisma’s `update`.
  // If a field in `data` is undefined, we won't set it, so it won't be updated.
  const brandKitUpdateData: any = {}

  // --- Top-level fields (BrandKit) ---
  if (data.name !== undefined) {
    brandKitUpdateData.name = data.name
  }
  if (data.description !== undefined) {
    brandKitUpdateData.description = data.description
  }
  if (data.language !== undefined) {
    brandKitUpdateData.language = data.language
  }

  // --- colorPalette (1:1) ---
  // In your schema, brandKit has `colorPalette ColorPalette?`
  // In BrandDTO, you have `brandStyle.colorPalettes` as an array,
  // but let's assume you only expect an array of length 1.
  if (data.brandStyle?.colorPalette) {
    const palette = data.brandStyle.colorPalette // take the first
    brandKitUpdateData.colorPalette = {
      upsert: {
        // There's exactly one palette per BrandKit, so match on `brandKitId`
        where: { brandKitId: id },
        create: {
          name: palette.name,
          colors: palette.colors,
        },
        update: {
          name: palette.name,
          colors: palette.colors,
        },
      },
    }
  }

  // --- logos (1:n) ---
  // If new logos are provided, we delete existing ones, then create new.
  // For a more sophisticated approach, you'd upsert each by ID.
  if (data.brandStyle?.logos) {
    brandKitUpdateData.logos = {
      deleteMany: {}, // remove all existing logos
      create: data.brandStyle.logos.map((logo) => ({
        url: logo.url,
      })),
    }
  }

  // --- fonts (1:n) ---
  // Same approach: remove all, then create new if provided.
  if (data.brandStyle?.fonts) {
    brandKitUpdateData.fonts = {
      deleteMany: {},
      create: data.brandStyle.fonts.map((font) => ({
        name: font.name,
        usage: font.usage,
      })),
    }
  }

  // --- textStyleGuide (1:1) ---
  // In BrandDTO, you have separate arrays for `values` & `tones`, plus `rules`.
  // Let's do an upsert for the textStyleGuide. For partial updates deeper
  // than this, you'd need more advanced logic (like upsert style items by ID, etc.).
  if (data.textStyleGuide) {
    const { values = [], tones = [], rules } = data.textStyleGuide

    // Combine values + tones into styleItems
    const newStyleItems = [
      ...values.map((v) => ({
        title: v.title,
        description: v.description,
        type: StyleItemType.VALUE,
      })),
      ...tones.map((t) => ({
        title: t.title,
        description: t.description,
        type: StyleItemType.TONE,
      })),
    ]

    // Combine preferredTerms + termsToAvoid
    const newTerms = [
      ...(rules?.preferredTerms ?? []).map((term) => ({
        text: term.text,
        termType: TermTypeEnum.PREFERRED,
      })),
      ...(rules?.termsToAvoid ?? []).map((term) => ({
        text: term.text,
        termType: TermTypeEnum.AVOID,
      })),
    ]

    brandKitUpdateData.textStyleGuide = {
      upsert: {
        where: { brandKitId: id },
        create: {
          styleItems: {
            create: newStyleItems,
          },
          rules: {
            create: {
              terms: {
                create: newTerms,
              },
            },
          },
        },
        update: {
          // For simplicity, we delete all styleItems/terms & re-create them
          styleItems: {
            deleteMany: {},
            create: newStyleItems,
          },
          rules: {
            upsert: {
              create: {
                terms: {
                  create: newTerms,
                },
              },
              update: {
                terms: {
                  deleteMany: {},
                  create: newTerms,
                },
              },
            },
          },
        },
      },
    }
  }

  // --- Perform the update ---
  await prisma.brandKit.update({
    where: { id },
    data: brandKitUpdateData,
  })
}





// Audience data

const mockPersonas: PersonaDTO[] = [
  {
    id: "1",
    name: "Eco Explorer Ellie",
    archetype: "Outdoor adventurer with an eco-conscious mindset",
    demographics: {
      ageRange: "25-40",
      gender: "Female",
      location: "Urban areas with access to outdoor trails",
      language: "English",
    },
    behavioralTraits: {
      shoppingHabits: "Prefers sustainable and affordable products",
      engagement: "Active on Instagram and Pinterest",
      purchaseFrequency: "Regular",
    },
    painPoints: ["Struggles to find durable yet sustainable options"],
    motivators: ["Values eco-friendly certifications", "Seeks sustainable impact"],
    suggestedTargeting: {
      platforms: ["Facebook", "Instagram"],
      keywords: ["eco-friendly", "sustainable hiking gear", "outdoor adventure"],
      interests: ["Sustainability", "Hiking", "Outdoor Adventures", "Eco-friendly Products"],
      behaviors: ["Engaged Shoppers", "Online Buyers", "Frequent Travelers"],
    },
    visualRepresentation: "https://example.com/avatar/eco-explorer-ellie.png",
  },
  {
    id: "2",
    name: "Tech Savvy Tom",
    archetype: "Early adopter and gadget enthusiast",
    demographics: {
      ageRange: "30-45",
      gender: "Male",
      location: "Metropolitan areas",
      language: "English",
    },
    behavioralTraits: {
      shoppingHabits: "Researches extensively before purchasing high-end products",
      engagement: "Active on Twitter and tech forums",
      purchaseFrequency: "Occasional, but high-value",
    },
    painPoints: ["Keeping up with rapid tech advancements", "Finding reliable product reviews"],
    motivators: ["Latest technology", "Performance and efficiency"],
    suggestedTargeting: {
      platforms: ["Twitter", "LinkedIn", "Google"],
      keywords: ["cutting-edge tech", "innovative gadgets", "smart home"],
      interests: ["Technology", "Artificial Intelligence", "Smart Home", "Gadgets"],
      behaviors: ["Early Adopters", "Tech Enthusiasts", "High-end Shoppers"],
    },
    visualRepresentation: "https://example.com/avatar/tech-savvy-tom.png",
  },
]


export async function fetchPersonas(): Promise<PersonaDTO[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockPersonas
}


/**
 * Create a new Persona record in the database for a specific user,
 * then revalidate the path.
 *
 * @param personaData - The persona object from the front-end
 */
export async function createPersona(userId: string, personaData: PersonaDTO) {
  console.log("Creating persona:", personaData)

  // Actually save to the DB using Prisma
  const created = await prisma.persona.create({
    data: {
      userId,
      name: personaData.name,
      archetype: personaData.archetype,

      // Store these sub-objects as JSON
      demographics: JSON.parse(JSON.stringify(personaData.demographics)),
      behavioralTraits: JSON.parse(JSON.stringify(personaData.behavioralTraits)),
      suggestedTargeting: JSON.parse(JSON.stringify(personaData.suggestedTargeting)),

      // Arrays of strings
      painPoints: personaData.painPoints,
      motivators: personaData.motivators,

      // optional
      visualRepresentation: personaData.visualRepresentation || null,
    },
  })

  return created;
}


/**
 * Fetches all PersonaDTOs for the user with the provided email.
 * @param userEmail - The email of the user whose personas we want.
 * @returns An array of PersonaDTOs.
 */
export async function fetchPersonasByUserEmail(
  userEmail: string
): Promise<PersonaDTO[]> {
  // 1) Find the user by email.
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  })

  if (!user) {
    throw new Error(`User with email ${userEmail} not found.`)
  }

  // 2) Fetch all personas linked to the user’s ID.
  const personas = await prisma.persona.findMany({
    where: { userId: user.id },
  })

  // 3) Convert the Prisma Persona records to your PersonaDTO shape.
  const personaDTOs: PersonaDTO[] = personas.map((p) => ({
    id: p.id,
    name: p.name,
    archetype: p.archetype,

    demographics: p.demographics as unknown as Demographics,
    behavioralTraits: p.behavioralTraits as unknown as BehavioralTraits,
    suggestedTargeting: p.suggestedTargeting as unknown as SuggestedTargeting,

    painPoints: p.painPoints,       // string[]
    motivators: p.motivators,       // string[]
    visualRepresentation: p.visualRepresentation || undefined,
  }))
  return personaDTOs
}

/**
 * Fetches a Persona record by its ID and returns a PersonaDTO.
 * @param id - The ID of the persona to retrieve.
 * @returns PersonaDTO or throws an error if not found.
 */
export async function fetchPersonaById(id: string): Promise<PersonaDTO | undefined> {
  const persona = await prisma.persona.findUnique({
    where: { id },
  })

  if (!persona) {
    return undefined;
  }

  // Cast or validate the JSON fields to the known interfaces
  return {
    id: persona.id,
    name: persona.name,
    archetype: persona.archetype,

    // Cast your JSON fields. If you want runtime validation, use a type-guard instead.
    demographics: persona.demographics as unknown as PersonaDTO["demographics"],
    behavioralTraits: persona.behavioralTraits as unknown as PersonaDTO["behavioralTraits"],
    suggestedTargeting: persona.suggestedTargeting as unknown as PersonaDTO["suggestedTargeting"],

    painPoints: persona.painPoints,
    motivators: persona.motivators,

    visualRepresentation: persona.visualRepresentation || undefined,
  }
}

export async function fetchMockPersona() {
  return mockPersonas[0];
}