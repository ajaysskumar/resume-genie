import type { ReactNode } from 'react'

interface FormattedTextProps {
  children: string
}

export function FormattedText({ children }: FormattedTextProps): ReactNode {
  const parts = children.split(/(<\/?b>)/gi)
  let isBold = false

  return parts.map((part, index) => {
    if (part.toLowerCase() === '<b>') {
      isBold = true
      return null
    }

    if (part.toLowerCase() === '</b>') {
      isBold = false
      return null
    }

    return isBold ? <strong key={index}>{part}</strong> : part
  })
}