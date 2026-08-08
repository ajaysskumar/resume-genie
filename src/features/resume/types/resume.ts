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
  website?: string
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
  description: string
  url?: string
  technologies: string[]
}

export interface Resume {
  personal: PersonalInformation
  summary: string
  experience: Experience[]
  skills: Skill[]
  education: Education[]
  projects: Project[]
}

export interface ValidationError {
  field: string
  message: string
}
