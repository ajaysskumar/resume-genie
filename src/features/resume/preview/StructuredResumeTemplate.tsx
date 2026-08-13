import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'
import { ResumeContactLine } from './ResumeContactLine'

interface StructuredResumeTemplateProps {
  resume: Resume
}

export function StructuredResumeTemplate({ resume }: StructuredResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications } = resume
  const skillGroups = skills
    .map((group) => ({
      category: group.category.trim() || 'Additional Skills',
      skills: group.skills.filter(Boolean),
    }))
    .filter((group) => group.skills.length > 0)

  return (
    <div className="space-y-5 text-[11pt] leading-[1.32] text-slate-800">
      <header className="border-b border-slate-300 pb-4 text-center">
        <h1 className="text-[29px] font-bold leading-none tracking-tight text-slate-950">{personal.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-[15px] font-semibold leading-tight text-slate-800">{personal.headline || 'Your Headline'}</p>
        <ResumeContactLine personal={personal} separator=" | " className="mt-3 flex flex-wrap justify-center gap-x-1 text-[11px] leading-5 text-slate-700" />
      </header>

      {summary && (
        <section>
          <SectionTitle>Summary</SectionTitle>
          <p className="px-3.5 text-justify text-[11px] leading-[1.42] whitespace-pre-wrap">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <SectionTitle>Work Experience</SectionTitle>
          <div className="space-y-4 px-3.5">
            {experience.map((item) => (
              <article key={item.id}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="min-w-0 text-[11px] font-bold leading-5 text-slate-900">
                    {item.position}, {item.company}
                  </h3>
                  <time className="shrink-0 text-right text-[11px] font-semibold leading-5 text-slate-800">
                    {formatDate(item.startDate)}{item.startDate && (item.current || item.endDate) ? ' – ' : ''}{item.current ? 'Present' : item.endDate ? formatDate(item.endDate) : ''}
                  </time>
                </div>
                {item.location && <p className="text-[10px] text-slate-600">{item.location}</p>}
                {item.bullets.length > 0 && (
                  <ul className="mt-0.5 list-disc space-y-0.5 pl-5 text-[11px] leading-[1.38]">
                    {item.bullets.map((bullet) => <li key={bullet.id}>{bullet.text}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-3 px-3.5">
            {education.map((item) => (
              <article key={item.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[11px] font-bold text-slate-900">{item.degree}</h3>
                    <p className="text-[11px]">{item.institution}{item.location ? `, ${item.location}` : ''}</p>
                  </div>
                  {(item.startDate || item.endDate) && <time className="shrink-0 text-[11px] font-semibold text-slate-800">{item.startDate && formatDate(item.startDate)}{item.startDate && item.endDate ? ' – ' : ''}{item.endDate && formatDate(item.endDate)}</time>}
                </div>
                {item.grade && <p className="text-[10px]">{item.grade}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {skillGroups.length > 0 && (
        <section>
          <SectionTitle>Key Skills</SectionTitle>
          <div className="space-y-1.5 px-3.5 text-[11px] leading-[1.35] text-slate-700">
            {skillGroups.map((group) => (
              <div key={group.category} className="grid grid-cols-[minmax(6rem,0.8fr)_minmax(0,3fr)] items-baseline gap-x-4">
                <strong className="text-slate-950">{group.category}</strong>
                <span>{group.skills.join(' · ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-3 px-3.5">
            {projects.map((project) => (
              <article key={project.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[11px] font-bold text-slate-900">{project.name}{project.organization ? `, ${project.organization}` : ''}</h3>
                  {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-700 underline">View project</a>}
                </div>
                <p className="text-[11px] leading-[1.38]">{project.description}</p>
                {project.technologies.length > 0 && <p className="text-[10px] text-slate-600">{project.technologies.join(' · ')}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <SectionTitle>Certifications</SectionTitle>
          <div className="space-y-2 px-3.5">
            {certifications.map((certification) => (
              <article key={certification.id} className="flex items-baseline justify-between gap-4 text-[11px]">
                <div><strong>{certification.name}</strong><span> · {certification.issuer}</span></div>
                {certification.issueDate && <time className="shrink-0">{formatDate(certification.issueDate)}</time>}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="bg-[#d8e2e8] px-3.5 py-1.5 text-[12px] font-bold uppercase leading-5 text-slate-950">{children}</h2>
}