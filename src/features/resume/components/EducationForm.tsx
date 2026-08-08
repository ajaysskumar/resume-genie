import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'

export function EducationForm() {
  const { resume, addEducation, updateEducation, deleteEducation } = useResumeStore()

  return (
    <div className="space-y-4">
      {resume.education.map((item) => (
        <div key={item.id} className="space-y-3 rounded-lg border border-indigo-100 bg-white/70 p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input aria-label="Institution" value={item.institution} onChange={(event) => updateEducation(item.id, 'institution', event.target.value)} placeholder="Institution" />
            <Input aria-label="Degree" value={item.degree} onChange={(event) => updateEducation(item.id, 'degree', event.target.value)} placeholder="Degree or certificate" />
            <Input aria-label="Grade or percentage" value={item.grade ?? ''} onChange={(event) => updateEducation(item.id, 'grade', event.target.value)} placeholder="Grade or percentage (optional)" />
            <Input aria-label="Education location" value={item.location ?? ''} onChange={(event) => updateEducation(item.id, 'location', event.target.value)} placeholder="Location" />
            <div className="grid grid-cols-2 gap-3">
              <Input aria-label="Education start date" type="month" value={item.startDate ?? ''} onChange={(event) => updateEducation(item.id, 'startDate', event.target.value)} />
              <Input aria-label="Education end date" type="month" value={item.endDate ?? ''} onChange={(event) => updateEducation(item.id, 'endDate', event.target.value)} />
            </div>
          </div>
          <Button type="button" variant="ghost" size="sm" className="h-10 w-10 p-0 text-slate-500 hover:text-red-600" onClick={() => deleteEducation(item.id)} aria-label={`Delete ${item.degree || 'education'}`} title={`Delete ${item.degree || 'education'}`}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <div className="flex justify-end"><Button type="button" variant="outline" size="sm" className="h-10 w-10 p-0" onClick={addEducation} aria-label="Add education" title="Add education"><Plus className="h-4 w-4" /></Button></div>
    </div>
  )
}
