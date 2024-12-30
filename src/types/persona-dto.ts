export interface Demographics {
    ageRange: string; // Age bracket of the persona
    gender: string; // Predominant gender
    location: string; // Geographic focus
    language: string; // Preferred language(s)
  }
  
  export interface BehavioralTraits {
    shoppingHabits: string; // Persona's shopping preferences
    engagement: string; // Engagement style (e.g., platforms used, activity level)
    purchaseFrequency: string; // How often they make purchases
  }
  
  export interface SuggestedTargeting {
    platforms: string[]; // Platforms for ad targeting (e.g., Facebook, Google)
    keywords: string[]; // Keywords for ad campaigns
    interests: string[]; // Interests for Facebook Ads (e.g., "Fitness", "Sustainability")
    behaviors: string[]; // Behaviors for Facebook Ads (e.g., "Engaged Shoppers", "Travel Enthusiasts")
  }
  
  export interface PersonaDTO {
    id: string; // Unique identifier for the persona
    name: string; // Persona name (e.g., "Eco Explorer Ellie")
    archetype: string; // Short description of persona type
    demographics: Demographics; // Demographic information
    behavioralTraits: BehavioralTraits; // Behavioral patterns
    painPoints: string[]; // List of pain points
    motivators: string[]; // List of motivators
    suggestedTargeting: SuggestedTargeting; // Targeting parameters
    visualRepresentation?: string; // URL or base64 for an avatar image (optional)
  }
  
  