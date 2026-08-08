import { useState } from 'react'
import { useResumeStore } from '../store/resumeStore'
import { ResumePage } from './ResumePage'
import { AtsResumeTemplate } from './AtsResumeTemplate'
import { ModernResumeTemplate } from './ModernResumeTemplate'
import { ExecutiveResumeTemplate } from './ExecutiveResumeTemplate'
import { MinimalResumeTemplate } from './MinimalResumeTemplate'
import { TemplateSelector } from './TemplateSelector'

export type ResumeTemplate = 'classic' | 'modern' | 'executive' | 'minimal'

export function ResumePreview() {
  const resume = useResumeStore((state) => state.resume)
  const [template, setTemplate] = useState<ResumeTemplate>('classic')

  const renderedTemplate = {
    classic: <AtsResumeTemplate resume={resume} />,
    modern: <ModernResumeTemplate resume={resume} />,
    executive: <ExecutiveResumeTemplate resume={resume} />,
    minimal: <MinimalResumeTemplate resume={resume} />,
  }[template]

  return (
    <>
      <TemplateSelector value={template} onChange={setTemplate} />
      <ResumePage>{renderedTemplate}</ResumePage>
    </>
  )
}
