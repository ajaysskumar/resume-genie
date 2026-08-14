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
import { Download, FileJson, FileText, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { exportResumeToPdf } from '../export/resumePdf'
import { exportResumeToDocx } from '../export/resumeDocx'
import { exportResumeToHtml } from '../export/resumeHtml'
import { exportResumeToJson } from '../export/resumeJson'

export type ResumeTemplate = 'classic' | 'modern' | 'executive' | 'minimal' | 'basic' | 'timeline' | 'engineering' | 'technical' | 'compact' | 'integrated' | 'structured' | 'kyoto'

export function ResumePreview() {
  const resume = useResumeStore((state) => state.resume)
  const [template, setTemplate] = useState<ResumeTemplate>('classic')
  const [isExporting, setIsExporting] = useState(false)
  const isAdvancedMode = new URLSearchParams(window.location.search).get('mode') === 'adv'

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

  const handleExportHtml = async () => {
    setIsExporting(true)
    try {
      await exportResumeToHtml('resume-page', `${resume.personal.fullName || 'resume'}-template.html`)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportJson = async () => {
    setIsExporting(true)
    try {
      exportResumeToJson(resume, `${resume.personal.fullName || 'resume'}.json`)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-3 print:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <TemplateSelector value={template} onChange={setTemplate} />
        <Button type="button" variant="outline" size="sm" className="h-10 w-10 shrink-0 rounded-lg border-slate-200 bg-white p-0 shadow-sm hover:border-slate-400" onClick={handleExport} disabled={isExporting} aria-label="Print or save resume as PDF" title="Print or save resume as PDF">
          <Printer className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="sm" className="h-10 w-10 shrink-0 rounded-lg border-slate-200 bg-white p-0 shadow-sm hover:border-slate-400" onClick={handleExportDocx} disabled={isExporting} aria-label="Download resume as DOCX" title="Download resume as DOCX">
          <FileText className="h-4 w-4" />
        </Button>
        {isAdvancedMode && (
          <>
            <Button type="button" variant="outline" size="sm" className="h-10 w-10 shrink-0 rounded-lg border-emerald-200 bg-white p-0 text-emerald-700 shadow-sm hover:border-emerald-400 hover:bg-emerald-50" onClick={handleExportHtml} disabled={isExporting} aria-label="Download resume template as HTML" title="Download resume template as HTML">
              <Download className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="sm" className="h-10 w-10 shrink-0 rounded-lg border-emerald-200 bg-white p-0 text-emerald-700 shadow-sm hover:border-emerald-400 hover:bg-emerald-50" onClick={handleExportJson} disabled={isExporting} aria-label="Download resume profile as JSON" title="Download resume profile as JSON">
              <FileJson className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      <ResumePage>{renderedTemplate}</ResumePage>
    </>
  )
}
