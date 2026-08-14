import type { Resume, Project } from '../types/resume'
import { formatDate } from '@/lib/utils'
import { ResumeAdditionalSections } from './ResumeAdditionalSections'

interface IntegratedResumeTemplateProps {
  resume: Resume
}

export function IntegratedResumeTemplate({ resume }: IntegratedResumeTemplateProps) {
  const { personal, summary, experience } = resume
  const skillGroups = resume.skills
    .map((group) => ({
      category: group.category.trim() || 'Additional Skills',
      skills: group.skills.filter(Boolean),
    }))
    .filter((group) => group.skills.length > 0)

  const projectsForExperience = (experienceId: string, company: string): Project[] => {
    const organizationKey = normalize(company)
    const matchingRoles = experience.filter((item) => normalize(item.company) === organizationKey)
    return resume.projects.filter((project) => project.experienceId === experienceId || (
      !project.experienceId && matchingRoles.length === 1 && normalize(project.organization ?? '') === organizationKey
    ))
  }

  const unmatchedProjects = resume.projects.filter((project) => {
    if (project.experienceId) return !experience.some((item) => item.id === project.experienceId)
    const organizationKey = normalize(project.organization ?? '')
    return !organizationKey || experience.filter((item) => normalize(item.company) === organizationKey).length !== 1
  })

  return (
    <div className="space-y-6 text-slate-800">
      <header className="border-b-2 border-sky-700 pb-5">
        <h1 className="text-3xl font-bold text-slate-950">{personal.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-base font-semibold text-sky-800">{personal.headline || 'Your Headline'}</p>
        <p className="mt-3 text-xs text-slate-500">
          {[personal.location, personal.email, personal.phone].filter(Boolean).join(' | ')}
        </p>
      </header>

      {summary && (
        <section>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-sm leading-6">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <SectionTitle>Experience and Selected Projects</SectionTitle>
          <div className="space-y-6">
            {experience.map((item) => {
              const relatedProjects = projectsForExperience(item.id, item.company)

              return (
                <article key={item.id}>
                  <div className="flex items-start justify-between gap-4 border-l-2 border-sky-200 pl-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-950">{item.position}</h3>
                      <p className="text-sm font-medium text-sky-800">{item.company}{item.location ? `, ${item.location}` : ''}</p>
                    </div>
                    <time className="whitespace-nowrap text-right text-xs text-slate-500">
                      {formatDate(item.startDate)} - {item.current ? 'Present' : item.endDate ? formatDate(item.endDate) : ''}
                    </time>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-8 text-sm leading-5">
                    {item.bullets.map((bullet) => <li key={bullet.id}>{bullet.text}</li>)}
                  </ul>
                  {relatedProjects.length > 0 && (
                    <div className="mt-4 ml-3 border-l border-slate-200 pl-4">
                      <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Projects</h4>
                      <div className="mt-2 space-y-3">
                        {relatedProjects.map((project) => <ProjectEntry key={project.id} project={project} />)}
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>
      )}

      {unmatchedProjects.length > 0 && (
        <section>
          <SectionTitle>Additional Projects</SectionTitle>
          <div className="space-y-3">
            {unmatchedProjects.map((project) => <ProjectEntry key={project.id} project={project} />)}
          </div>
        </section>
      )}

      {skillGroups.length > 0 && (
        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="space-y-1.5 text-xs text-slate-700">
            {skillGroups.map((group) => (
              <div key={group.category} className="grid grid-cols-[minmax(6rem,0.8fr)_minmax(0,3fr)] items-baseline gap-x-4">
                <strong className="text-slate-950">{group.category}</strong>
                <span>{group.skills.join(' · ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <ResumeAdditionalSections resume={resume} variant="technical" showSkills={false} showProjects={false} />
    </div>
  )
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <div className="text-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h5 className="font-bold text-slate-950">{project.name}</h5>
        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs text-sky-700 underline">View project</a>}
      </div>
      <p className="mt-1 leading-5 text-slate-700">{project.description}</p>
      {project.technologies.length > 0 && <p className="mt-1 text-xs text-slate-500">{project.technologies.join(' · ')}</p>}
    </div>
  )
}

function normalize(value: string) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ')
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 border-b border-slate-300 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-950">{children}</h2>
}