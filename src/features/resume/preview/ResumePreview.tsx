import { useResumeStore } from '../store/resumeStore'
import { ResumePage } from './ResumePage'
import { AtsResumeTemplate } from './AtsResumeTemplate'

export function ResumePreview() {
  const resume = useResumeStore((state) => state.resume)

  return (
    <ResumePage>
      <AtsResumeTemplate resume={resume} />
    </ResumePage>
  )
}
