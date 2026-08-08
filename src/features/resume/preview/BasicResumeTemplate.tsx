import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'

interface BasicResumeTemplateProps {
  resume: Resume
}

export function BasicResumeTemplate({ resume }: BasicResumeTemplateProps) {
  const { personal, summary, experience } = resume

  return (
    <div className="space-y-6 text-slate-800">
      <header className="border-b-2 border-slate-800 pb-5">
        <h1 className="text-3xl font-bold text-slate-950">{personal.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-base text-slate-600">{personal.headline || 'Your Headline'}</p>
        <p className="mt-3 text-xs text-slate-500">
          {[personal.location, personal.email, personal.phone].filter(Boolean).join(' | ')}
        </p>
      </header>

      {summary && <section><SectionTitle>Summary</SectionTitle><p className="text-sm leading-6">{summary}</p></section>}

      {experience.length > 0 && (
        <section>
          <SectionTitle>Work Experience</SectionTitle>
          <div className="space-y-5">
            {experience.map((exp) => (
              <article key={exp.id}>
                <div className="flex items-start justify-between gap-4">
                  <div><h3 className="text-sm font-bold text-slate-950">{exp.position}</h3><p className="text-sm text-slate-600">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p></div>
                  <time className="whitespace-nowrap text-xs text-slate-500">{formatDate(exp.startDate)} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}</time>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-5">{exp.bullets.map((bullet) => <li key={bullet.id}>{bullet.text}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 border-b border-slate-300 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-950">{children}</h2>
}