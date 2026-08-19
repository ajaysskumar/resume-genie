import type { Resume } from '../types/resume'
import { FormattedText } from './FormattedText'

interface ResumeContactLineProps {
  personal: Resume['personal']
  className?: string
  separator?: string
}

export function ResumeContactLine({ personal, className, separator = ' | ' }: ResumeContactLineProps) {
  const items = [
    personal.location && { label: personal.location },
    personal.email && { label: personal.email, href: `mailto:${personal.email}` },
    personal.phone && { label: personal.phone, href: `tel:${personal.phone.replace(/[^\d+]/g, '')}` },
    personal.linkedin && { label: 'LinkedIn', href: personal.linkedin },
    personal.github && { label: 'GitHub', href: personal.github },
    personal.medium && { label: 'Medium', href: personal.medium },
    personal.website && { label: personal.websiteLabel?.trim() || 'Blog', href: personal.website },
  ].filter((item): item is { label: string; href?: string } => Boolean(item))

  return (
    <p className={className}>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 && separator}
          {item.href ? (
            <a href={item.href} target={item.href.startsWith('mailto:') || item.href.startsWith('tel:') ? undefined : '_blank'} rel={item.href.startsWith('mailto:') || item.href.startsWith('tel:') ? undefined : 'noopener noreferrer'} className="text-blue-700 underline hover:no-underline">
              <FormattedText>{item.label}</FormattedText>
            </a>
          ) : item.label}
        </span>
      ))}
    </p>
  )
}