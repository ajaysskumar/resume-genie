import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'
import { ResumeAdditionalSections } from './ResumeAdditionalSections'

interface EngineeringResumeTemplateProps {
  resume: Resume
}

export function EngineeringResumeTemplate({ resume }: EngineeringResumeTemplateProps) {
  const { personal, summary, experience } = resume

  return (
    <div className="space-y-5 text-slate-900">
      <header className="border-b-4 border-teal-700 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">{personal.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-base font-semibold text-teal-800">{personal.headline || 'Your Headline'}</p>
        <p className="mt-3 text-xs leading-5 text-slate-600">
          {[personal.location, personal.email, personal.phone, personal.linkedin, personal.github, personal.website].filter(Boolean).join(' | ')}
        </p>
      </header>

      {summary && (
        <section>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-xs leading-relaxed text-slate-800">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <SectionTitle>Professional Experience</SectionTitle>
          <div className="space-y-4">
            {experience.map((exp) => (
              <article key={exp.id} className="text-xs">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-950">{exp.position}</h3>
                    <p className="font-semibold text-teal-800">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
                  </div>
                  <time className="whitespace-nowrap text-right text-slate-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
                  </time>
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
                    {exp.bullets.map((bullet) => <li key={bullet.id}>{bullet.text}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <ResumeAdditionalSections resume={resume} variant="engineering" />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 border-b border-teal-200 pb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-900">{children}</h2>
}