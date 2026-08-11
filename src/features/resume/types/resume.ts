export interface ExperienceBullet {
  id: string
  text: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  bullets: ExperienceBullet[]
}

export interface PersonalInformation {
  fullName: string
  headline: string
  email: string
  phone: string
  location: string
  profileImage?: string
  linkedin?: string
  github?: string
  medium?: string
  website?: string
  websiteLabel?: string
}

export interface Skill {
  id: string
  category: string
  skills: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  grade?: string
  location?: string
  startDate?: string
  endDate?: string
}

export interface Project {
  id: string
  name: string
  organization?: string
  description: string
  url?: string
  technologies: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate?: string
  url?: string
}

export interface Resume {
  personal: PersonalInformation
  summary: string
  experience: Experience[]
  skills: Skill[]
  education: Education[]
  projects: Project[]
  certifications: Certification[]
}

export interface ValidationError {
  field: string
  message: string
}
