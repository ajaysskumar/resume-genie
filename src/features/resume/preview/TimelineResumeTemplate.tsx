import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'

interface TimelineResumeTemplateProps {
  resume: Resume
}

export function TimelineResumeTemplate({ resume }: TimelineResumeTemplateProps) {
  const { personal, summary, experience } = resume

  return (
    <div className="text-slate-800">
      <header className="border-l-4 border-violet-500 pl-5">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">Career Profile</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">{personal.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-base text-slate-600">{personal.headline || 'Your Headline'}</p>
        <p className="mt-3 text-xs text-slate-500">{[personal.location, personal.email, personal.phone].filter(Boolean).join(' · ')}</p>
      </header>

      <div className="mt-8 space-y-8">
        {summary && <section><SectionTitle>Profile</SectionTitle><p className="text-sm leading-7 text-slate-600">{summary}</p></section>}

        {experience.length > 0 && (
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-6">
              {experience.map((exp) => (
                <article key={exp.id} className="grid grid-cols-[92px_1fr] gap-4">
                  <time className="border-r border-violet-200 pr-4 text-right text-xs font-semibold leading-5 text-violet-700">{formatDate(exp.startDate)}<br />{exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}</time>
                  <div><h3 className="text-sm font-bold text-slate-950">{exp.position}</h3><p className="mt-1 text-sm font-semibold text-slate-600">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p><ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">{exp.bullets.map((bullet) => <li key={bullet.id}>• {bullet.text}</li>)}</ul></div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-950">{children}</h2>
}