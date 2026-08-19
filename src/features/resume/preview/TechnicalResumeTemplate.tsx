import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'
import { ResumeAdditionalSections } from './ResumeAdditionalSections'
import { ResumeContactLine } from './ResumeContactLine'
import { FormattedText } from './FormattedText'

interface TechnicalResumeTemplateProps {
  resume: Resume
}

export function TechnicalResumeTemplate({ resume }: TechnicalResumeTemplateProps) {
  const { personal, summary, experience, skills } = resume

  return (
    <div className="space-y-4 text-slate-900">
      <header className="border-b border-slate-900 pb-3">
        <h1 className="text-3xl font-bold tracking-tight">{personal.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-sm font-semibold text-slate-700">{personal.headline || 'Your Headline'}</p>
        <ResumeContactLine personal={personal} className="mt-2 text-xs leading-5 text-slate-600" />
      </header>

      {summary && (
        <section>
          <SectionTitle>Summary</SectionTitle>
          <p className="text-xs leading-relaxed text-slate-800"><FormattedText>{summary}</FormattedText></p>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="space-y-1 text-xs leading-relaxed">
            {skills.map((group) => (
              <p key={group.id}>
                {group.category && <strong className="text-slate-950">{group.category}: </strong>}
                <span>{group.skills.filter(Boolean).join(', ')}</span>
              </p>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <SectionTitle>Work Experience</SectionTitle>
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <article key={exp.id} className="text-xs">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-950">{exp.position}</h3>
                    <p className="text-slate-700">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <time className="whitespace-nowrap text-right text-slate-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
                  </time>
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="mt-1.5 list-disc space-y-0.5 pl-5 leading-relaxed">
                    {exp.bullets.map((bullet) => <li key={bullet.id}><FormattedText>{bullet.text}</FormattedText></li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <ResumeAdditionalSections resume={resume} variant="technical" showSkills={false} />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-[0.15em] text-slate-950">{children}</h2>
}