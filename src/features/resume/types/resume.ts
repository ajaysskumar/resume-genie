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

export interface Resume {
  personal: PersonalInformation
  summary: string
  experience: Experience[]
}

export interface ValidationError {
  field: string
  message: string
}
