import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'

interface ModernResumeTemplateProps { resume: Resume }

export function ModernResumeTemplate({ resume }: ModernResumeTemplateProps) {
  const { personal, summary, experience } = resume
  return (
    <div className="border-l-8 border-cyan-500 pl-6 text-slate-800">
      <header className="border-b-2 border-cyan-100 pb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-600">Professional Profile</p>
        <h1 className="text-4xl font-black tracking-tight text-slate-950">{personal.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-lg font-medium text-cyan-700">{personal.headline || 'Your Headline'}</p>
        <ContactLine resume={resume} />
      </header>
      <div className="mt-7 space-y-7">
        {summary && <section><SectionTitle>Profile</SectionTitle><p className="text-sm leading-7 text-slate-600">{summary}</p></section>}
        {experience.length > 0 && <section><SectionTitle>Experience</SectionTitle><div className="space-y-6">{experience.map((exp) => (
          <article key={exp.id}>
            <div className="flex items-start justify-between gap-4"><div><h3 className="text-base font-bold text-slate-950">{exp.position}</h3><p className="text-sm font-semibold text-cyan-700">{exp.company}</p></div><time className="whitespace-nowrap text-xs font-semibold text-slate-500">{formatDate(exp.startDate)} – {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}</time></div>
            {exp.location && <p className="mt-1 text-xs text-slate-500">{exp.location}</p>}
            <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">{exp.bullets.map((bullet) => <li key={bullet.id} className="flex gap-2"><span className="text-cyan-500">◆</span><span>{bullet.text}</span></li>)}</ul>
          </article>
        ))}</div></section>}
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) { return <h2 className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-slate-950">{children}</h2> }
function ContactLine({ resume }: { resume: Resume }) { const { personal } = resume; return <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">{[personal.location, personal.email, personal.phone, personal.linkedin && 'LinkedIn', personal.website && 'Website'].filter(Boolean).map((item) => <span key={item}>{item}</span>)}</div> }