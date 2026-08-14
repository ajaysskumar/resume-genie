import type { Project, Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'
import { ResumeContactLine } from './ResumeContactLine'

interface KyotoResumeTemplateProps {
  resume: Resume
}

export function KyotoResumeTemplate({ resume }: KyotoResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications } = resume
  const linkedProjects = projects.filter((project) => project.organization?.trim() || project.experienceId)
  const personalProjects = projects.filter((project) => !project.organization?.trim() && !project.experienceId)
  const projectBelongsToExperience = (project: Project, experienceId: string, company: string) => {
    if (project.experienceId) return project.experienceId === experienceId
    const matchingRoles = experience.filter((item) => normalize(item.company) === normalize(company))
    return matchingRoles.length === 1 && normalize(project.organization ?? '') === normalize(company)
  }
  const unmatchedLinkedProjects = linkedProjects.filter((project) => !experience.some((item) => projectBelongsToExperience(project, item.id, item.company)))
  const skillGroups = skills
    .map((group) => ({ category: group.category.trim() || 'Additional Skills', skills: group.skills.filter(Boolean) }))
    .filter((group) => group.skills.length > 0)

  return (
    <div className="space-y-5 text-[11pt] leading-[1.35] text-slate-800">
      <header className="relative border-b-2 border-emerald-700 pb-5 pl-5">
        <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-emerald-700" aria-hidden="true" />
        {/* <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-700">Professional portfolio</p> */}
        <h1 className="text-[30px] font-bold leading-none tracking-tight text-slate-950">{personal.fullName || 'Your Name'}</h1>
        <p className="mt-1 text-[15px] font-semibold text-slate-700">{personal.headline || 'Your Headline'}</p>
        <ResumeContactLine personal={personal} separator="  ·  " className="mt-3 flex flex-wrap gap-x-1 text-[10px] leading-5 text-slate-600" />
      </header>

      {summary && <section><SectionTitle>Profile</SectionTitle><p className="px-3.5 text-justify text-[11px] leading-[1.45] whitespace-pre-wrap">{summary}</p></section>}

      {(experience.length > 0 || unmatchedLinkedProjects.length > 0) && (
        <section>
          <SectionTitle>Work Experience</SectionTitle>
          <div className="space-y-4 px-3.5">
            {experience.map((item) => {
              const companyProjects = linkedProjects.filter((project) => projectBelongsToExperience(project, item.id, item.company))
              return (
                <article key={item.id}>
                  <ExperienceHeading company={item.company} position={item.position} startDate={item.startDate} endDate={item.endDate} current={item.current} location={item.location} />
                  {item.bullets.length > 0 && <BulletList bullets={item.bullets.map((bullet) => bullet.text)} />}
                  {companyProjects.length > 0 && <ProjectList projects={companyProjects} />}
                </article>
              )
            })}
            {unmatchedLinkedProjects.map((project) => <ProjectExperience key={project.id} project={project} />)}
          </div>
        </section>
      )}

      {education.length > 0 && <section><SectionTitle>Education</SectionTitle><div className="space-y-3 px-3.5">{education.map((item) => <article key={item.id} className="flex items-start justify-between gap-4"><div><h3 className="text-[11px] font-bold text-slate-900">{item.degree}</h3><p className="text-[11px]">{item.institution}{item.location ? `, ${item.location}` : ''}</p>{item.grade && <p className="text-[10px]">{item.grade}</p>}</div>{(item.startDate || item.endDate) && <time className="shrink-0 text-[11px] font-semibold text-slate-700">{item.startDate && formatDate(item.startDate)}{item.startDate && item.endDate ? ' – ' : ''}{item.endDate && formatDate(item.endDate)}</time>}</article>)}</div></section>}

      {skillGroups.length > 0 && <section><SectionTitle>Key Skills</SectionTitle><div className="space-y-1.5 px-3.5 text-[11px] text-slate-700">{skillGroups.map((group) => <div key={group.category} className="grid grid-cols-[minmax(6rem,0.8fr)_minmax(0,3fr)] items-baseline gap-x-4"><strong className="text-slate-950">{group.category}</strong><span>{group.skills.join(' · ')}</span></div>)}</div></section>}

      {personalProjects.length > 0 && <section><SectionTitle>Personal Projects</SectionTitle><div className="space-y-3 px-3.5">{personalProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></section>}

      {certifications.length > 0 && <section><SectionTitle>Certifications</SectionTitle><div className="space-y-2 px-3.5">{certifications.map((certification) => <article key={certification.id} className="flex items-baseline justify-between gap-4 text-[11px]"><div><strong>{certification.name}</strong><span> · {certification.issuer}</span></div>{certification.issueDate && <time className="shrink-0">{formatDate(certification.issueDate)}</time>}</article>)}</div></section>}
    </div>
  )
}

function ExperienceHeading({ company, position, startDate, endDate, current, location }: { company: string; position: string; startDate: string; endDate?: string; current: boolean; location?: string }) {
  return <><div className="flex items-start justify-between gap-4"><h3 className="min-w-0 text-[11px] font-bold leading-5 text-slate-900">{position}, {company}</h3><time className="shrink-0 text-right text-[11px] font-semibold text-slate-800">{formatDate(startDate)}{startDate && (current || endDate) ? ' – ' : ''}{current ? 'Present' : endDate ? formatDate(endDate) : ''}</time></div>{location && <p className="text-[10px] text-slate-600">{location}</p>}</>
}

function BulletList({ bullets }: { bullets: string[] }) {
  return <ul className="mt-0.5 list-disc space-y-0.5 pl-5 text-[11px] leading-[1.38]">{bullets.map((bullet, index) => <li key={`${bullet}-${index}`}>{bullet}</li>)}</ul>
}

function ProjectList({ projects }: { projects: Project[] }) {
  return <div className="mt-2 border-l-2 border-emerald-100 pl-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">Projects</p><div className="mt-1.5 space-y-2">{projects.map((project) => <ProjectCard key={project.id} project={project} compact />)}</div></div>
}

function ProjectExperience({ project }: { project: Project }) {
  return <article><div className="flex items-baseline justify-between gap-3"><h3 className="text-[11px] font-bold text-slate-900">{project.name}, {project.organization}</h3>{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-700 underline">View project</a>}</div><p className="text-[10px] text-slate-600">Project experience</p><p className="text-[11px] leading-[1.38]">{project.description}</p>{project.technologies.length > 0 && <p className="text-[10px] text-slate-600">{project.technologies.join(' · ')}</p>}</article>
}

function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return <div><div className="flex items-baseline justify-between gap-3"><h3 className="text-[11px] font-bold text-slate-900">{project.name}</h3>{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-700 underline">View project</a>}</div><p className={`${compact ? 'text-[10px]' : 'text-[11px]'} leading-[1.38]`}>{project.description}</p>{project.technologies.length > 0 && <p className="text-[10px] text-slate-600">{project.technologies.join(' · ')}</p>}</div>
}

function normalize(value: string) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ')
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="bg-emerald-50 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] leading-5 text-emerald-950">{children}</h2>
}