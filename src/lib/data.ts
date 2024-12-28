import { BrandDTO } from "@/types/brand-dto";

// This function simulates fetching data from an API or database
export async function fetchBrandData(id: string): Promise<BrandDTO> {
  // In a real application, this would be an API call or database query
  return {
    name: "Blinx",
    description: "AI-powered marketing platform that helps businesses create personalized content faster and more efficiently.",
    brandStyle: {
      colorPalettes: [
        {
          id: "1",
          name: "Primary Palette",
          isDefault: true,
          colors: ["#fd243e", "#1F2937", "#EC4899", "#FFFFFF"]
        }
      ],
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
      isDefault: true,
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