import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'
import { ResumeAdditionalSections } from './ResumeAdditionalSections'
import { ResumeContactLine } from './ResumeContactLine'

interface ModernResumeTemplateProps { resume: Resume }

export function ModernResumeTemplate({ resume }: ModernResumeTemplateProps) {
  const { personal, summary, experience } = resume
  return (
    <div className="border-l-8 border-cyan-500 pl-6 text-slate-800">
      <header className="border-b-2 border-cyan-100 pb-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-600">Professional Profile</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">{personal.fullName || 'Your Name'}</h1>
            <p className="mt-1 text-lg font-medium text-cyan-700">{personal.headline || 'Your Headline'}</p>
          </div>
          {personal.profileImage ? (
            <img src={personal.profileImage} alt={`${personal.fullName || 'Profile'} photo`} className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-4 ring-cyan-50" />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-2xl font-black text-cyan-700 ring-4 ring-cyan-50" aria-label="Profile photo placeholder">
              {(personal.fullName || 'YN').split(' ').map((name) => name[0]).slice(0, 2).join('')}
            </div>
          )}
        </div>
        <ResumeContactLine personal={personal} className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500" />
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
        <ResumeAdditionalSections resume={resume} variant="modern" />
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) { return <h2 className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-slate-950">{children}</h2> }