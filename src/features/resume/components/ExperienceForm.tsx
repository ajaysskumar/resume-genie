import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { ExperienceItem } from './ExperienceItem'

export function ExperienceForm() {
  const { resume, addExperience } = useResumeStore()
  const { experience } = resume

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Experience</h2>

      {experience.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-lg">
          <p className="text-slate-500 mb-4">
            No experience added yet. Add your first entry!
          </p>
          <Button onClick={() => addExperience()} type="button">
            + Add Experience
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {experience.map((exp) => (
              <ExperienceItem key={exp.id} experience={exp} />
            ))}
          </div>
          <Button onClick={() => addExperience()} type="button" variant="outline">
            + Add Experience
          </Button>
        </>
      )}
    </div>
  )
}
