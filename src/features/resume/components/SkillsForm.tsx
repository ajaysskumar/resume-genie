import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SkillsForm() {
  const { resume, addSkill, updateSkill, deleteSkill } = useResumeStore()

  return (
    <div className="space-y-3">
      {resume.skills.map((skill) => (
        <div key={skill.id} className="grid gap-3 sm:grid-cols-[minmax(10rem,0.7fr)_minmax(0,2fr)_auto]">
          <Input aria-label="Skill category" value={skill.category} onChange={(event) => updateSkill(skill.id, 'category', event.target.value)} placeholder="Category (optional)" />
          <Input aria-label="Skills" value={skill.skills.join(', ')} onChange={(event) => updateSkill(skill.id, 'skills', event.target.value.split(',').map((value) => value.trim()).filter(Boolean))} placeholder="Skills separated by commas" />
          <Button type="button" variant="ghost" onClick={() => deleteSkill(skill.id)} aria-label={`Delete ${skill.category || 'skill group'}`}>Remove</Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addSkill} className="w-full">+ Add Skill</Button>
    </div>
  )
}
