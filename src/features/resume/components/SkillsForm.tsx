import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'

export function SkillsForm() {
  const { resume, addSkill, updateSkill, deleteSkill } = useResumeStore()

  return (
    <div className="space-y-3">
      {resume.skills.map((skill) => (
        <div key={skill.id} className="grid gap-3 sm:grid-cols-[minmax(10rem,0.7fr)_minmax(0,2fr)_auto]">
          <Input aria-label="Skill category" value={skill.category} onChange={(event) => updateSkill(skill.id, 'category', event.target.value)} placeholder="Category (optional)" />
          <Input aria-label="Skills" value={skill.skills.join(', ')} onChange={(event) => updateSkill(skill.id, 'skills', event.target.value.split(',').map((value) => value.trim()).filter(Boolean))} placeholder="Skills separated by commas" />
          <Button type="button" variant="ghost" size="sm" className="h-10 w-10 p-0 text-slate-500 hover:text-red-600" onClick={() => deleteSkill(skill.id)} aria-label={`Delete ${skill.category || 'skill group'}`} title={`Delete ${skill.category || 'skill group'}`}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <div className="flex justify-end"><Button type="button" variant="outline" size="sm" className="h-10 w-10 p-0" onClick={addSkill} aria-label="Add skill category" title="Add skill category"><Plus className="h-4 w-4" /></Button></div>
    </div>
  )
}
