import { useResumeStore } from '../store/resumeStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/index'
import { Card } from '@/components/ui/card'
import { ExperienceBullet } from './ExperienceBullet'
import type { Experience } from '../types/resume'

interface ExperienceItemProps {
  experience: Experience
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const { updateExperience, deleteExperience, addBullet } = useResumeStore()

  const handleDelete = () => {
    if (confirm('Delete this experience entry?')) {
      deleteExperience(experience.id)
    }
  }

  return (
    <Card className="p-5 bg-white border border-slate-200/50 hover:border-slate-300 transition-colors">
      <div className="space-y-4">
        {/* Company and Position */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor={`company-${experience.id}`} className="block mb-2 text-sm font-medium text-slate-700">
              Company
            </Label>
            <Input
              id={`company-${experience.id}`}
              value={experience.company}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateExperience(experience.id, 'company', e.target.value)
              }
              placeholder="Company name"
            />
          </div>
          <div>
            <Label htmlFor={`position-${experience.id}`} className="block mb-2 text-sm font-medium text-slate-700">
              Position
            </Label>
            <Input
              id={`position-${experience.id}`}
              value={experience.position}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateExperience(experience.id, 'position', e.target.value)
              }
              placeholder="Job title"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor={`location-${experience.id}`} className="block mb-2 text-sm font-medium text-slate-700">
            Location
          </Label>
          <Input
            id={`location-${experience.id}`}
            value={experience.location || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateExperience(experience.id, 'location', e.target.value)
            }
            placeholder="City, State"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label
              htmlFor={`startDate-${experience.id}`}
              className="block mb-2 text-sm font-medium text-slate-700"
            >
              Start Date
            </Label>
            <Input
              id={`startDate-${experience.id}`}
              type="month"
              value={experience.startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateExperience(experience.id, 'startDate', e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor={`endDate-${experience.id}`} className="block mb-2 text-sm font-medium text-slate-700">
              End Date
            </Label>
            <Input
              id={`endDate-${experience.id}`}
              type="month"
              value={experience.endDate || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateExperience(experience.id, 'endDate', e.target.value)
              }
              disabled={experience.current}
            />
          </div>
        </div>

        {/* Current Position Checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox
            id={`current-${experience.id}`}
            checked={experience.current}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateExperience(experience.id, 'current', e.target.checked)
            }
          />
          <Label
            htmlFor={`current-${experience.id}`}
            className="cursor-pointer text-sm font-medium text-slate-700"
          >
            Currently working here
          </Label>
        </div>

        {/* Bullets */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h4 className="text-sm font-semibold text-slate-800">Achievements</h4>
          {experience.bullets.length === 0 ? (
            <p className="text-xs text-slate-500">No achievements added yet</p>
          ) : (
            <div className="space-y-2">
              {experience.bullets.map((bullet) => (
                <ExperienceBullet
                  key={bullet.id}
                  experienceId={experience.id}
                  bullet={bullet}
                />
              ))}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addBullet(experience.id)}
            type="button"
          >
            + Add Bullet
          </Button>
        </div>

        {/* Delete Button */}
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          type="button"
        >
          Delete Experience
        </Button>
      </div>
    </Card>
  )
}
