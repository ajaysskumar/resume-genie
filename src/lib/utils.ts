import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return crypto.randomUUID()
}

export function formatDate(dateString: string): string {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch {
    return dateString
  }
}

export function isFutureDate(dateString: string): boolean {
  if (!dateString) return false
  try {
    const date = new Date(dateString)
    return date > new Date()
  } catch {
    return false
  }
}

export function isDateValid(dateString: string): boolean {
  if (!dateString) return false
  try {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  } catch {
    return false
  }
}
