import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function EducationForm() {
  const { resume, addEducation, updateEducation, deleteEducation } = useResumeStore()

  return (
    <div className="space-y-4">
      {resume.education.map((item) => (
        <div key={item.id} className="space-y-3 rounded-lg border border-indigo-100 bg-white/70 p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input aria-label="Institution" value={item.institution} onChange={(event) => updateEducation(item.id, 'institution', event.target.value)} placeholder="Institution" />
            <Input aria-label="Degree" value={item.degree} onChange={(event) => updateEducation(item.id, 'degree', event.target.value)} placeholder="Degree or certificate" />
            <Input aria-label="Education location" value={item.location ?? ''} onChange={(event) => updateEducation(item.id, 'location', event.target.value)} placeholder="Location" />
            <div className="grid grid-cols-2 gap-3">
              <Input aria-label="Education start date" type="month" value={item.startDate ?? ''} onChange={(event) => updateEducation(item.id, 'startDate', event.target.value)} />
              <Input aria-label="Education end date" type="month" value={item.endDate ?? ''} onChange={(event) => updateEducation(item.id, 'endDate', event.target.value)} />
            </div>
          </div>
          <Button type="button" variant="ghost" onClick={() => deleteEducation(item.id)} aria-label={`Delete ${item.degree || 'education'}`}>Remove education</Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addEducation} className="w-full">+ Add Education</Button>
    </div>
  )
}
