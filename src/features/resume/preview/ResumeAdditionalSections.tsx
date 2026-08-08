import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'

type AdditionalSectionsVariant = 'classic' | 'modern' | 'executive' | 'minimal' | 'basic' | 'timeline'

interface ResumeAdditionalSectionsProps {
  resume: Resume
  variant: AdditionalSectionsVariant
}

const styles = {
  classic: { heading: 'border-b border-slate-900 pb-2', title: 'font-bold uppercase tracking-wide', text: 'text-xs text-slate-800', accent: 'text-slate-700' },
  modern: { heading: 'text-slate-950', title: 'font-black uppercase tracking-[0.22em]', text: 'text-sm text-slate-600', accent: 'text-cyan-700' },
  executive: { heading: 'border-b-2 border-amber-400 pb-2 text-slate-950', title: 'font-black uppercase tracking-[0.25em]', text: 'font-serif text-sm text-stone-600', accent: 'text-amber-700' },
  minimal: { heading: 'text-slate-950', title: 'font-bold uppercase tracking-[0.25em]', text: 'text-sm text-slate-700', accent: 'text-rose-600' },
  basic: { heading: 'border-b border-slate-300 pb-2 text-slate-950', title: 'font-bold uppercase tracking-[0.2em]', text: 'text-sm text-slate-700', accent: 'text-slate-600' },
  timeline: { heading: 'text-slate-950', title: 'font-bold uppercase tracking-[0.25em]', text: 'text-sm text-slate-600', accent: 'text-violet-700' },
} as const

export function ResumeAdditionalSections({ resume, variant }: ResumeAdditionalSectionsProps) {
  const style = styles[variant]
  const hasContent = resume.skills.length > 0 || resume.education.length > 0 || resume.projects.length > 0
  if (!hasContent) return null

  return (
    <div className="space-y-6">
      {resume.skills.length > 0 && (
        <section>
          <SectionTitle className={style.heading}><span className={style.title}>Skills</span></SectionTitle>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {resume.skills.map((skill) => <span key={skill.id} className={`${style.text} ${style.accent}`}>{skill.name}{skill.level ? ` · ${skill.level}` : ''}</span>)}
          </div>
        </section>
      )}
      {resume.education.length > 0 && (
        <section>
          <SectionTitle className={style.heading}><span className={style.title}>Education</span></SectionTitle>
          <div className="space-y-3">
            {resume.education.map((item) => <article key={item.id} className={style.text}>
              <div className="flex items-start justify-between gap-4"><div><h3 className={`font-bold text-slate-950`}>{item.degree}</h3><p className={style.accent}>{item.institution}{item.location ? ` · ${item.location}` : ''}</p></div><time className="whitespace-nowrap text-right">{item.startDate && formatDate(item.startDate)}{item.startDate && item.endDate ? ' – ' : ''}{item.endDate && formatDate(item.endDate)}</time></div>
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
    </div>
  )
}

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`mb-3 text-xs ${className ?? ''}`}>{children}</h2>
}
