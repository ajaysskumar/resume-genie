import { useState } from 'react'
import { useResumeStore } from '../store/resumeStore'
import { ResumePage } from './ResumePage'
import { AtsResumeTemplate } from './AtsResumeTemplate'
import { ModernResumeTemplate } from './ModernResumeTemplate'
import { ExecutiveResumeTemplate } from './ExecutiveResumeTemplate'
import { MinimalResumeTemplate } from './MinimalResumeTemplate'
import { BasicResumeTemplate } from './BasicResumeTemplate'
import { TimelineResumeTemplate } from './TimelineResumeTemplate'
import { EngineeringResumeTemplate } from './EngineeringResumeTemplate'
import { TechnicalResumeTemplate } from './TechnicalResumeTemplate'
import { CompactResumeTemplate } from './CompactResumeTemplate'
import { IntegratedResumeTemplate } from './IntegratedResumeTemplate'
import { StructuredResumeTemplate } from './StructuredResumeTemplate'
import { KyotoResumeTemplate } from './KyotoResumeTemplate'
import { TemplateSelector } from './TemplateSelector'
import { Printer, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { exportResumeToPdf } from '../export/resumePdf'
import { exportResumeToDocx } from '../export/resumeDocx'

export type ResumeTemplate = 'classic' | 'modern' | 'executive' | 'minimal' | 'basic' | 'timeline' | 'engineering' | 'technical' | 'compact' | 'integrated' | 'structured' | 'kyoto'

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
    engineering: <EngineeringResumeTemplate resume={resume} />,
    technical: <TechnicalResumeTemplate resume={resume} />,
    compact: <CompactResumeTemplate resume={resume} />,
    integrated: <IntegratedResumeTemplate resume={resume} />,
    structured: <StructuredResumeTemplate resume={resume} />,
    kyoto: <KyotoResumeTemplate resume={resume} />,
  }[template]

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await exportResumeToPdf('resume-page', `${resume.personal.fullName || 'resume'}.pdf`)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportDocx = async () => {
    setIsExporting(true)
    try {
      await exportResumeToDocx('resume-page', `${resume.personal.fullName || 'resume'}.docx`)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-3 print:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <TemplateSelector value={template} onChange={setTemplate} />
        <Button type="button" variant="outline" size="sm" className="h-10 shrink-0 gap-2 rounded-lg border-slate-200 bg-white px-3 text-xs font-semibold shadow-sm hover:border-slate-400" onClick={handleExport} disabled={isExporting} aria-label="Download resume as PDF" title="Download resume as PDF">
          <Printer className="h-4 w-4" />
          <span>Download PDF</span>
        </Button>
        <Button type="button" variant="outline" size="sm" className="h-10 shrink-0 gap-2 rounded-lg border-slate-200 bg-white px-3 text-xs font-semibold shadow-sm hover:border-slate-400" onClick={handleExportDocx} disabled={isExporting} aria-label="Download resume as DOCX" title="Download resume as DOCX">
          <FileText className="h-4 w-4" />
          <span>Download DOCX</span>
        </Button>
      </div>
      <ResumePage>{renderedTemplate}</ResumePage>
    </>
  )
}
