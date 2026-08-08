import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'

interface MinimalResumeTemplateProps { resume: Resume }

export function MinimalResumeTemplate({ resume }: MinimalResumeTemplateProps) {
  const { personal, summary, experience } = resume
  return (
    <div className="text-slate-700">
      <header className="flex items-end justify-between gap-6 border-b border-slate-300 pb-5">
        <div><h1 className="text-3xl font-light tracking-[0.08em] text-slate-950">{personal.fullName || 'Your Name'}</h1><p className="mt-2 text-sm text-rose-600">{personal.headline || 'Your Headline'}</p></div>
        <ContactLine resume={resume} />
      </header>
      <div className="mt-7 space-y-6">
        {summary && <section><SectionTitle>Summary</SectionTitle><p className="text-sm leading-6">{summary}</p></section>}
        {experience.length > 0 && <section><SectionTitle>Experience</SectionTitle><div className="space-y-5">{experience.map((exp) => <article key={exp.id}><div className="flex justify-between gap-4"><div><h3 className="text-sm font-bold text-slate-950">{exp.position}</h3><p className="text-sm text-rose-600">{exp.company}</p></div><time className="text-xs text-slate-500">{formatDate(exp.startDate)} – {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}</time></div><ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-5">{exp.bullets.map((bullet) => <li key={bullet.id}>{bullet.text}</li>)}</ul></article>)}</div></section>}
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) { return <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-950">{children}</h2> }
function ContactLine({ resume }: { resume: Resume }) { const { personal } = resume; return <div className="max-w-[180px] text-right text-[10px] leading-5 text-slate-500">{[personal.location, personal.email, personal.phone, personal.linkedin && 'LinkedIn', personal.website && 'Website'].filter(Boolean).join(' · ')}</div> }