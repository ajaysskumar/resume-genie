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
  profileImage: z.string().optional(),
  linkedin: urlSchema,
  github: urlSchema,
  medium: urlSchema,
  website: urlSchema,
  websiteLabel: z.string().optional(),
})

export const skillSchema = z.object({
  id: z.string(),
  category: z.string(),
  skills: z.array(z.string().min(1, 'Skill is required')).min(1, 'At least one skill is required'),
})

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  grade: z.string().optional(),
  location: z.string().optional(),
  startDate: dateStringSchema.optional(),
  endDate: dateStringSchema.optional(),
})

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  organization: z.string().optional(),
  description: z.string().min(1, 'Project description is required'),
  url: urlSchema,
  technologies: z.array(z.string()),
})

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuing organization is required'),
  issueDate: dateStringSchema.optional(),
  url: urlSchema,
})

export const resumeSchema = z.object({
  personal: personalInfoSchema,
  summary: z.string(),
  experience: z.array(experienceSchema),
  skills: z.array(skillSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
})

export type Resume = z.infer<typeof resumeSchema>
export type Experience = z.infer<typeof experienceSchema>
export type PersonalInformation = z.infer<typeof personalInfoSchema>
export type ExperienceBullet = z.infer<typeof experienceBulletSchema>
export type Skill = z.infer<typeof skillSchema>
export type Education = z.infer<typeof educationSchema>
export type Project = z.infer<typeof projectSchema>
export type Certification = z.infer<typeof certificationSchema>
