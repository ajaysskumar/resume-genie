import { useState } from 'react'
import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { parseCommaSeparatedValues } from '@/lib/utils'

export function SkillsForm() {
  const { resume, addSkill, updateSkill, deleteSkill } = useResumeStore()
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({})

  return (
    <div className="space-y-3">
      {resume.skills.map((skill) => (
        <div key={skill.id} className="grid gap-3 sm:grid-cols-[minmax(10rem,0.7fr)_minmax(0,2fr)_auto]">
          <Input aria-label="Skill category" value={skill.category} onChange={(event) => updateSkill(skill.id, 'category', event.target.value)} placeholder="Category (optional)" />
          <Input
            aria-label="Skills"
            value={skillInputs[skill.id] ?? skill.skills.join(', ')}
            onChange={(event) => {
              const value = event.target.value
              setSkillInputs((current) => ({ ...current, [skill.id]: value }))
              updateSkill(skill.id, 'skills', parseCommaSeparatedValues(value))
            }}
            onBlur={() => {
              const value = skillInputs[skill.id] ?? skill.skills.join(', ')
              updateSkill(skill.id, 'skills', parseCommaSeparatedValues(value))
              setSkillInputs((current) => {
                const next = { ...current }
                delete next[skill.id]
                return next
              })
            }}
            placeholder="Skills separated by commas"
          />
          <Button type="button" variant="ghost" size="sm" className="h-10 w-10 p-0 text-slate-500 hover:text-red-600" onClick={() => deleteSkill(skill.id)} aria-label={`Delete ${skill.category || 'skill group'}`} title={`Delete ${skill.category || 'skill group'}`}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <div className="flex justify-end"><Button type="button" variant="outline" size="sm" className="h-10 w-10 p-0" onClick={addSkill} aria-label="Add skill category" title="Add skill category"><Plus className="h-4 w-4" /></Button></div>
    </div>
  )
}
