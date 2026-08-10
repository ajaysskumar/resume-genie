import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'

export function ProjectsForm() {
  const { resume, addProject, updateProject, deleteProject } = useResumeStore()
  const organizations = Array.from(new Set([
    ...resume.experience.map((experience) => experience.company.trim()),
    ...resume.education.map((education) => education.institution.trim()),
  ].filter(Boolean)))

  return (
    <div className="space-y-4">
      {resume.projects.map((project) => (
        <div key={project.id} className="space-y-3 rounded-lg border border-rose-100 bg-white/70 p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input aria-label="Project name" value={project.name} onChange={(event) => updateProject(project.id, 'name', event.target.value)} placeholder="Project name" />
            <Input aria-label="Project URL" value={project.url ?? ''} onChange={(event) => updateProject(project.id, 'url', event.target.value)} placeholder="Project URL" type="url" />
          </div>
          <select
            aria-label="Project organization"
            value={project.organization ?? ''}
            onChange={(event) => updateProject(project.id, 'organization', event.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">No organization (personal project)</option>
            {organizations.map((organization) => <option key={organization} value={organization}>{organization}</option>)}
          </select>
          <Textarea aria-label="Project description" value={project.description} onChange={(event) => updateProject(project.id, 'description', event.target.value)} placeholder="Describe the project and your impact" />
          <Input aria-label="Project technologies" value={project.technologies.join(', ')} onChange={(event) => updateProject(project.id, 'technologies', event.target.value.split(',').map((technology) => technology.trim()).filter(Boolean))} placeholder="Technologies, separated by commas" />
          <Button type="button" variant="ghost" size="sm" className="h-10 w-10 p-0 text-slate-500 hover:text-red-600" onClick={() => deleteProject(project.id)} aria-label={`Delete ${project.name || 'project'}`} title={`Delete ${project.name || 'project'}`}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <div className="flex justify-end"><Button type="button" variant="outline" size="sm" className="h-10 w-10 p-0" onClick={addProject} aria-label="Add project" title="Add project"><Plus className="h-4 w-4" /></Button></div>
    </div>
  )
}
