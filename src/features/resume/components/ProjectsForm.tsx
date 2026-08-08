import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ProjectsForm() {
  const { resume, addProject, updateProject, deleteProject } = useResumeStore()

  return (
    <div className="space-y-4">
      {resume.projects.map((project) => (
        <div key={project.id} className="space-y-3 rounded-lg border border-rose-100 bg-white/70 p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input aria-label="Project name" value={project.name} onChange={(event) => updateProject(project.id, 'name', event.target.value)} placeholder="Project name" />
            <Input aria-label="Project URL" value={project.url ?? ''} onChange={(event) => updateProject(project.id, 'url', event.target.value)} placeholder="Project URL" type="url" />
          </div>
          <Textarea aria-label="Project description" value={project.description} onChange={(event) => updateProject(project.id, 'description', event.target.value)} placeholder="Describe the project and your impact" />
          <Input aria-label="Project technologies" value={project.technologies.join(', ')} onChange={(event) => updateProject(project.id, 'technologies', event.target.value.split(',').map((technology) => technology.trim()).filter(Boolean))} placeholder="Technologies, separated by commas" />
          <Button type="button" variant="ghost" onClick={() => deleteProject(project.id)} aria-label={`Delete ${project.name || 'project'}`}>Remove project</Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addProject} className="w-full">+ Add Project</Button>
    </div>
  )
}
