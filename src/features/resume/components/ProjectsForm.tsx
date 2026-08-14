import { useState } from 'react'
import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'
import { formatDate, parseCommaSeparatedValues } from '@/lib/utils'

export function ProjectsForm() {
  const { resume, addProject, updateProject, deleteProject } = useResumeStore()
  const [technologyInputs, setTechnologyInputs] = useState<Record<string, string>>({})
  const matchingExperienceCount = (organization: string) => resume.experience.filter((experience) => normalize(experience.company) === normalize(organization)).length

  return (
    <div className="space-y-4">
      {resume.projects.map((project) => {
        const legacyExperience = resume.experience.find((experience) => normalize(experience.company) === normalize(project.organization ?? ''))
        const selectedOrganization = project.experienceId ? `experience:${project.experienceId}` : legacyExperience && matchingExperienceCount(project.organization ?? '') === 1 ? `experience:${legacyExperience.id}` : project.organization ? `legacy:${project.organization}` : ''

        return (
          <div key={project.id} className="space-y-3 rounded-lg border border-rose-100 bg-white/70 p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input aria-label="Project name" value={project.name} onChange={(event) => updateProject(project.id, 'name', event.target.value)} placeholder="Project name" />
            <Input aria-label="Project URL" value={project.url ?? ''} onChange={(event) => updateProject(project.id, 'url', event.target.value)} placeholder="Project URL" type="url" />
          </div>
          <select
            aria-label="Project organization"
            value={selectedOrganization}
            onChange={(event) => {
              const value = event.target.value
              if (value.startsWith('experience:')) {
                const experienceId = value.slice('experience:'.length)
                const selectedExperience = resume.experience.find((experience) => experience.id === experienceId)
                updateProject(project.id, 'experienceId', experienceId)
                updateProject(project.id, 'organization', selectedExperience?.company ?? '')
              } else if (value.startsWith('education:')) {
                const educationId = value.slice('education:'.length)
                const selectedEducation = resume.education.find((education) => education.id === educationId)
                updateProject(project.id, 'experienceId', '')
                updateProject(project.id, 'organization', selectedEducation?.institution ?? '')
              } else {
                updateProject(project.id, 'experienceId', '')
                updateProject(project.id, 'organization', '')
              }
            }}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">No organization (personal project)</option>
            {project.organization && selectedOrganization.startsWith('legacy:') && <option value={selectedOrganization}>{project.organization} (select a role)</option>}
            {resume.experience.length > 0 && <optgroup label="Work experience">
              {resume.experience.map((experience) => <option key={experience.id} value={`experience:${experience.id}`}>
                {experience.company || 'Unnamed company'} ({formatDate(experience.startDate)}{experience.startDate && (experience.current || experience.endDate) ? ' - ' : ''}{experience.current ? 'Present' : formatDate(experience.endDate ?? '')})
              </option>)}
            </optgroup>}
            {resume.education.length > 0 && <optgroup label="Education">
              {resume.education.map((education) => <option key={education.id} value={`education:${education.id}`}>
                {education.institution || 'Unnamed institution'}{education.startDate || education.endDate ? ` (${formatDate(education.startDate ?? '')}${education.startDate && education.endDate ? ' - ' : ''}${formatDate(education.endDate ?? '')})` : ''}
              </option>)}
            </optgroup>}
          </select>
          <Textarea aria-label="Project description" value={project.description} onChange={(event) => updateProject(project.id, 'description', event.target.value)} placeholder="Describe the project and your impact" />
          <Input
            aria-label="Project technologies"
            value={technologyInputs[project.id] ?? project.technologies.join(', ')}
            onChange={(event) => {
              const value = event.target.value
              setTechnologyInputs((current) => ({ ...current, [project.id]: value }))
              updateProject(project.id, 'technologies', parseCommaSeparatedValues(value))
            }}
            onBlur={() => {
              const value = technologyInputs[project.id] ?? project.technologies.join(', ')
              updateProject(project.id, 'technologies', parseCommaSeparatedValues(value))
              setTechnologyInputs((current) => {
                const next = { ...current }
                delete next[project.id]
                return next
              })
            }}
            placeholder="Technologies, separated by commas"
          />
          <Button type="button" variant="ghost" size="sm" className="h-10 w-10 p-0 text-slate-500 hover:text-red-600" onClick={() => deleteProject(project.id)} aria-label={`Delete ${project.name || 'project'}`} title={`Delete ${project.name || 'project'}`}><Trash2 className="h-4 w-4" /></Button>
          </div>
        )
      })}
      <div className="flex justify-end"><Button type="button" variant="outline" size="sm" className="h-10 w-10 p-0" onClick={addProject} aria-label="Add project" title="Add project"><Plus className="h-4 w-4" /></Button></div>
    </div>
  )
}

function normalize(value: string) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ')
}
