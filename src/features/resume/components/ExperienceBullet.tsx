import { useResumeStore } from '../store/resumeStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { ExperienceBullet as ExperienceBulletType } from '../types/resume'
import { X } from 'lucide-react'

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
    <div className="flex gap-2 items-center bg-slate-50 p-2.5 rounded-lg hover:bg-slate-100 transition-colors group">
      <span className="text-emerald-600 flex-shrink-0 font-semibold text-sm">•</span>
      <Input
        value={bullet.text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBullet(experienceId, bullet.id, e.target.value)}
        placeholder="e.g. Launched a redesign that improved activation by 28%"
        className="flex-grow bg-white border-slate-200/50 text-sm"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        type="button"
        aria-label="Delete achievement"
        title="Delete achievement"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
