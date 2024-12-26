import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  department: z.string().min(1, 'Department is required'),
  role: z.string().min(1, 'Role is required'),
})

export const companySchema = z.object({
  size: z.string().min(1, 'Company size is required'),
  industry: z.string().min(1, 'Industry is required'),
})

export const contentSchema = z.object({
  contentTypes: z.array(z.string()).min(1, 'At least one content type must be selected'),
})

export const onboardingSchema = z.object({
  profile: profileSchema,
  company: companySchema,
  content: contentSchema,
})

export type ProfileFormData = z.infer<typeof profileSchema>
export type CompanyFormData = z.infer<typeof companySchema>
export type ContentFormData = z.infer<typeof contentSchema>

export type OnboardingData = z.infer<typeof onboardingSchema>

