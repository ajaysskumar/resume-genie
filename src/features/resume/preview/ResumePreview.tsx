import { useState } from 'react'
import { useResumeStore } from '../store/resumeStore'
import { ResumePage } from './ResumePage'
import { AtsResumeTemplate } from './AtsResumeTemplate'
import { ModernResumeTemplate } from './ModernResumeTemplate'
import { ExecutiveResumeTemplate } from './ExecutiveResumeTemplate'
import { MinimalResumeTemplate } from './MinimalResumeTemplate'
import { BasicResumeTemplate } from './BasicResumeTemplate'
import { TimelineResumeTemplate } from './TimelineResumeTemplate'
import { TemplateSelector } from './TemplateSelector'
import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { exportResumeToPdf } from '../export/resumePdf'

export type ResumeTemplate = 'classic' | 'modern' | 'executive' | 'minimal' | 'basic' | 'timeline'

export function ResumePreview() {
  const resume = useResumeStore((state) => state.resume)
  const [template, setTemplate] = useState<ResumeTemplate>('classic')
  const [isExporting, setIsExporting] = useState(false)

  const renderedTemplate = {
    classic: <AtsResumeTemplate resume={resume} />,
    modern: <ModernResumeTemplate resume={resume} />,
    executive: <ExecutiveResumeTemplate resume={resume} />,
    minimal: <MinimalResumeTemplate resume={resume} />,
    basic: <BasicResumeTemplate resume={resume} />,
    timeline: <TimelineResumeTemplate resume={resume} />,
  }[template]

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await exportResumeToPdf('resume-page', `${resume.personal.fullName || 'resume'}.pdf`)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <div className="flex items-start gap-2 print:hidden">
        <div className="min-w-0 flex-1"><TemplateSelector value={template} onChange={setTemplate} /></div>
        <Button type="button" variant="outline" size="sm" className="mt-3 h-10 shrink-0 gap-2 px-3" onClick={handleExport} disabled={isExporting} aria-label="Download resume as PDF" title="Download resume as PDF">
          <Printer className="h-4 w-4" />
          <span className="hidden sm:inline">Download PDF</span>
        </Button>
      </div>
      <ResumePage>{renderedTemplate}</ResumePage>
    </>
  )
}
