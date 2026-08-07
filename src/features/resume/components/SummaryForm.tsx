import { useResumeStore } from '../store/resumeStore'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function SummaryForm() {
  const { resume, updateSummary } = useResumeStore()
  const { summary } = resume

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="summary" className="block mb-2 text-sm font-medium text-slate-700">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateSummary(e.target.value)}
          placeholder="Share your professional background and key achievements..."
          rows={4}
        />
        <p className="text-xs text-slate-500 mt-2">
          {summary.length} characters
        </p>
      </div>
    </div>
  )
}
