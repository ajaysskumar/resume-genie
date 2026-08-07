import { z } from 'zod'

// Email validation
const emailSchema = z.string().email('Invalid email address').or(z.literal(''))

// URL validation (optional)
const urlSchema = z.string().url('Invalid URL').or(z.literal('')).optional()

// Date string validation
const dateStringSchema = z.string().refine((date) => {
  if (!date) return true
  try {
    const d = new Date(date)
    return !isNaN(d.getTime())
  } catch {
    return false
  }
}, 'Invalid date')

export const experienceBulletSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Bullet text is required'),
})

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  location: z.string().optional(),
  startDate: dateStringSchema,
  endDate: dateStringSchema.optional(),
  current: z.boolean(),
  bullets: z.array(experienceBulletSchema),
}).refine(
  (data) => {
    if (!data.current && data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate)
    }
    return true
  },
  {
    message: 'End date must be after start date',
    path: ['endDate'],
  }
).refine(
  (data) => {
    if (data.current && data.endDate) {
      return !data.endDate
    }
    return true
  },
  {
    message: 'End date should be empty for current position',
    path: ['endDate'],
  }
)

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  headline: z.string().min(1, 'Headline is required'),
  email: emailSchema,
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: urlSchema,
  website: urlSchema,
})

export const resumeSchema = z.object({
  personal: personalInfoSchema,
  summary: z.string(),
  experience: z.array(experienceSchema),
})

export type Resume = z.infer<typeof resumeSchema>
export type Experience = z.infer<typeof experienceSchema>
export type PersonalInformation = z.infer<typeof personalInfoSchema>
export type ExperienceBullet = z.infer<typeof experienceBulletSchema>
