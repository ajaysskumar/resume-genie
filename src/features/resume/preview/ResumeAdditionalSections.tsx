import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'

type AdditionalSectionsVariant = 'classic' | 'modern' | 'executive' | 'minimal' | 'basic' | 'timeline' | 'engineering' | 'technical' | 'compact'

interface ResumeAdditionalSectionsProps {
  resume: Resume
  variant: AdditionalSectionsVariant
  showSkills?: boolean
}

const styles = {
  classic: { heading: 'border-b border-slate-900 pb-2', title: 'font-bold uppercase tracking-wide', text: 'text-xs text-slate-800', accent: 'text-slate-700' },
  modern: { heading: 'text-slate-950', title: 'font-black uppercase tracking-[0.22em]', text: 'text-sm text-slate-600', accent: 'text-cyan-700' },
  executive: { heading: 'border-b-2 border-amber-400 pb-2 text-slate-950', title: 'font-black uppercase tracking-[0.25em]', text: 'font-serif text-sm text-stone-600', accent: 'text-amber-700' },
  minimal: { heading: 'text-slate-950', title: 'font-bold uppercase tracking-[0.25em]', text: 'text-sm text-slate-700', accent: 'text-rose-600' },
  basic: { heading: 'border-b border-slate-300 pb-2 text-slate-950', title: 'font-bold uppercase tracking-[0.2em]', text: 'text-sm text-slate-700', accent: 'text-slate-600' },
  timeline: { heading: 'text-slate-950', title: 'font-bold uppercase tracking-[0.25em]', text: 'text-sm text-slate-600', accent: 'text-violet-700' },
  engineering: { heading: 'border-b border-teal-200 pb-1.5 text-teal-900', title: 'font-bold uppercase tracking-[0.18em]', text: 'text-xs text-slate-700', accent: 'text-teal-800' },
  technical: { heading: 'border-b border-slate-300 pb-1 text-slate-950', title: 'font-bold uppercase tracking-[0.15em]', text: 'text-xs text-slate-700', accent: 'text-slate-700' },
  compact: { heading: 'border-b border-slate-900 pb-1 text-slate-950', title: 'font-bold uppercase tracking-[0.14em]', text: 'text-xs text-slate-700', accent: 'text-slate-600' },
} as const

export function ResumeAdditionalSections({ resume, variant, showSkills = true }: ResumeAdditionalSectionsProps) {
  const style = styles[variant]
  const hasContent = (showSkills && resume.skills.length > 0) || resume.education.length > 0 || resume.projects.length > 0 || resume.certifications.length > 0
  if (!hasContent) return null

  return (
    <div className="space-y-6">
      {showSkills && resume.skills.length > 0 && (
        <section>
          <SectionTitle className={style.heading}><span className={style.title}>Skills</span></SectionTitle>
          <SkillsContent resume={resume} style={style} />
        </section>
      )}
      {resume.education.length > 0 && (
        <section>
          <SectionTitle className={style.heading}><span className={style.title}>Education</span></SectionTitle>
          <div className="space-y-3">
            {resume.education.map((item) => <article key={item.id} className={style.text}>
              <div className="flex items-start justify-between gap-4"><div><h3 className="font-bold text-slate-950">{item.degree}</h3><p className={style.accent}>{item.institution}{item.location ? ` · ${item.location}` : ''}</p>{item.grade && <p className="mt-0.5 text-xs">Grade: {item.grade}</p>}</div><time className="whitespace-nowrap text-right">{item.startDate && formatDate(item.startDate)}{item.startDate && item.endDate ? ' – ' : ''}{item.endDate && formatDate(item.endDate)}</time></div>
            </article>)}
          </div>
        </section>
      )}
      {resume.projects.length > 0 && (
        <section>
          <SectionTitle className={style.heading}><span className={style.title}>Projects</span></SectionTitle>
          <div className="space-y-3">
            {resume.projects.map((project) => <article key={project.id} className={style.text}>
              <div className="flex items-baseline justify-between gap-3"><h3 className="font-bold text-slate-950">{project.name}</h3>{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className={`${style.accent} underline`}>View project</a>}</div>
              <p className="mt-1 leading-6">{project.description}</p>
              {project.technologies.length > 0 && <p className={`mt-1 text-xs ${style.accent}`}>{project.technologies.join(' · ')}</p>}
            </article>)}
          </div>
        </section>
      )}
      {resume.certifications.length > 0 && (
        <section>
          <SectionTitle className={style.heading}><span className={style.title}>Certifications</span></SectionTitle>
          <div className="space-y-2">
            {resume.certifications.map((certification) => <article key={certification.id} className={style.text}>
              <div className="flex items-baseline justify-between gap-3">
                <div><h3 className="font-bold text-slate-950">{certification.name}</h3><p className={style.accent}>{certification.issuer}</p></div>
                <time className="whitespace-nowrap text-right">{certification.issueDate && formatDate(certification.issueDate)}</time>
              </div>
              {certification.url && <a href={certification.url} target="_blank" rel="noopener noreferrer" className={`${style.accent} text-xs underline`}>Verify credential</a>}
            </article>)}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`mb-3 text-xs ${className ?? ''}`}>{children}</h2>
}

function SkillsContent({ resume, style }: { resume: Resume; style: (typeof styles)[AdditionalSectionsVariant] }) {
  const namedSkills = resume.skills.filter((group) => group.category.trim())
  const additionalSkills = resume.skills.flatMap((group) => group.category.trim() ? [] : group.skills).filter(Boolean)

  if (namedSkills.length === 0) {
    return <div className="flex flex-wrap gap-x-3 gap-y-2">{additionalSkills.map((skill, index) => <span key={`${skill}-${index}`} className={`${style.text} ${style.accent}`}>{skill}{index < additionalSkills.length - 1 ? ' ·' : ''}</span>)}</div>
  }

  return <div className="space-y-2">
    {namedSkills.map((group) => <div key={group.id} className={`grid grid-cols-[minmax(5rem,0.7fr)_minmax(0,2fr)] gap-3 ${style.text}`}><strong className="text-slate-950">{group.category}</strong><span>{group.skills.filter(Boolean).join(', ')}</span></div>)}
    {additionalSkills.length > 0 && <div className={`grid grid-cols-[minmax(5rem,0.7fr)_minmax(0,2fr)] gap-3 ${style.text}`}><strong className="text-slate-950">Additional Skills</strong><span>{additionalSkills.join(', ')}</span></div>}
  </div>
}
