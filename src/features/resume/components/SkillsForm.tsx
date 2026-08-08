import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SkillsForm() {
  const { resume, addSkill, updateSkill, deleteSkill } = useResumeStore()

  return (
    <div className="space-y-3">
      {resume.skills.map((skill) => (
        <div key={skill.id} className="grid gap-3 sm:grid-cols-[1fr_10rem_auto]">
          <Input aria-label="Skill name" value={skill.name} onChange={(event) => updateSkill(skill.id, 'name', event.target.value)} placeholder="Skill name" />
          <Input aria-label="Skill level" value={skill.level ?? ''} onChange={(event) => updateSkill(skill.id, 'level', event.target.value)} placeholder="Level" />
          <Button type="button" variant="ghost" onClick={() => deleteSkill(skill.id)} aria-label={`Delete ${skill.name || 'skill'}`}>Remove</Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addSkill} className="w-full">+ Add Skill</Button>
    </div>
  )
}
