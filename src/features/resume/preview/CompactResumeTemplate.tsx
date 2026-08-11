import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'
import { ResumeAdditionalSections } from './ResumeAdditionalSections'
import { ResumeContactLine } from './ResumeContactLine'

interface CompactResumeTemplateProps {
  resume: Resume
}

export function CompactResumeTemplate({ resume }: CompactResumeTemplateProps) {
  const { personal, summary, experience } = resume

  return (
    <div className="space-y-4 text-slate-900">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{personal.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-sm font-semibold text-slate-700">{personal.headline || 'Your Headline'}</p>
        <ResumeContactLine personal={personal} className="mt-2 text-[11px] leading-5 text-slate-600" />
      </header>

      {summary && (
        <section>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-xs leading-5 text-slate-800">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-3">
            {experience.map((exp) => (
              <article key={exp.id} className="text-xs">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-bold text-slate-950">{exp.position} | {exp.company}</h3>
                  <time className="whitespace-nowrap text-slate-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
                  </time>
                </div>
                {exp.location && <p className="text-slate-600">{exp.location}</p>}
                {exp.bullets.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 leading-5">
                    {exp.bullets.map((bullet) => <li key={bullet.id}>{bullet.text}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <ResumeAdditionalSections resume={resume} variant="compact" />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 border-b border-slate-900 pb-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-950">{children}</h2>
}