import { useResumeStore } from '../store/resumeStore'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function SummaryForm() {
  const { resume, updateSummary } = useResumeStore()
  const { summary } = resume

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Professional Summary</h2>
      <div>
        <Label htmlFor="summary" className="block mb-1">
          Summary
        </Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Enter your professional summary..."
          rows={5}
        />
        <p className="text-xs text-slate-500 mt-2">
          {summary.length} characters
        </p>
      </div>
    </div>
  )
}
