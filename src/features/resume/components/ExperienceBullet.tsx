import { useResumeStore } from '../store/resumeStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { ExperienceBullet as ExperienceBulletType } from '../types/resume'

interface ExperienceBulletProps {
  experienceId: string
  bullet: ExperienceBulletType
}

export function ExperienceBullet({ experienceId, bullet }: ExperienceBulletProps) {
  const { updateBullet, deleteBullet } = useResumeStore()

  const handleDelete = () => {
    if (confirm('Delete this bullet point?')) {
      deleteBullet(experienceId, bullet.id)
    }
  }

  return (
    <div className="flex gap-2 items-end">
      <span className="text-slate-500 flex-shrink-0">•</span>
      <Input
        value={bullet.text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBullet(experienceId, bullet.id, e.target.value)}
        placeholder="Add achievement or responsibility..."
        className="flex-grow"
      />
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        type="button"
      >
        Delete
      </Button>
    </div>
  )
}
