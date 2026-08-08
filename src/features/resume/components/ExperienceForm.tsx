import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { ExperienceItem } from './ExperienceItem'
import { Plus } from 'lucide-react'

export function ExperienceForm() {
  const { resume, addExperience } = useResumeStore()
  const { experience } = resume

  return (
    <div className="space-y-4">
      {experience.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-emerald-200/50 bg-emerald-50/30 rounded-lg">
          <p className="text-slate-600 mb-4 text-center">
            No experience added yet. Start building your work history!
          </p>
          <Button onClick={() => addExperience()} type="button" className="h-10 w-10 p-0" aria-label="Add experience" title="Add experience">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {experience.map((exp) => (
              <ExperienceItem key={exp.id} experience={exp} />
            ))}
          </div>
          <Button onClick={() => addExperience()} type="button" variant="outline" className="h-10 w-10 p-0" aria-label="Add experience" title="Add experience">
            <Plus className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}
