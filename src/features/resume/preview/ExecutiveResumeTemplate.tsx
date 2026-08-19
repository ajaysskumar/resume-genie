import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'
import { ResumeAdditionalSections } from './ResumeAdditionalSections'
import { ResumeContactLine } from './ResumeContactLine'
import { FormattedText } from './FormattedText'

interface ExecutiveResumeTemplateProps { resume: Resume }

export function ExecutiveResumeTemplate({ resume }: ExecutiveResumeTemplateProps) {
  const { personal, summary, experience } = resume
  return (
    <div className="text-stone-800">
      <header className="-mx-10 -mt-10 bg-slate-950 px-10 py-9 text-white">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">Executive Resume</p>
        <div className="flex items-start justify-between gap-5">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight"><FormattedText>{personal.fullName || 'Your Name'}</FormattedText></h1>
            <p className="mt-2 text-base text-slate-300"><FormattedText>{personal.headline || 'Your Headline'}</FormattedText></p>
          </div>
          {personal.profileImage ? (
            <img src={personal.profileImage} alt={`${personal.fullName || 'Profile'} photo`} className="h-24 w-24 shrink-0 rounded-full object-cover ring-4 ring-amber-400/30" />
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-slate-800 text-2xl font-serif font-bold text-amber-300 ring-4 ring-amber-400/30" aria-label="Profile photo placeholder">
              {(personal.fullName || 'YN').split(' ').map((name) => name[0]).slice(0, 2).join('')}
            </div>
          )}
        </div>
        <ResumeContactLine personal={personal} separator=" · " className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400" />
      </header>
      <div className="mt-9 space-y-8">
        {summary && <section><SectionTitle>About</SectionTitle><p className="font-serif text-sm leading-7 text-stone-600"><FormattedText>{summary}</FormattedText></p></section>}
        {experience.length > 0 && <section><SectionTitle>Career History</SectionTitle><div className="space-y-6">{experience.map((exp) => <article key={exp.id} className="grid grid-cols-[1fr_auto] gap-5 border-t border-stone-200 pt-4"><div><h3 className="font-serif text-lg font-bold text-slate-950"><FormattedText>{exp.position}</FormattedText></h3><p className="mt-1 text-sm font-semibold text-amber-700"><FormattedText>{exp.company}</FormattedText>{exp.location ? ` · ${exp.location}` : ''}</p><ul className="mt-3 space-y-1 text-sm leading-6 text-stone-600">{exp.bullets.map((bullet) => <li key={bullet.id}>• <FormattedText>{bullet.text}</FormattedText></li>)}</ul></div><time className="text-right text-xs font-semibold uppercase tracking-wide text-stone-500">{formatDate(exp.startDate)}<br />{exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}</time></article>)}</div></section>}
        <ResumeAdditionalSections resume={resume} variant="executive" />
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) { return <h2 className="mb-4 border-b-2 border-amber-400 pb-2 text-xs font-black uppercase tracking-[0.25em] text-slate-950">{children}</h2> }