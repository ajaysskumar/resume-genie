import { PersonalInformationForm } from './PersonalInformationForm'
import { SummaryForm } from './SummaryForm'
import { ExperienceForm } from './ExperienceForm'
import { Separator } from '@/components/ui/index'

export function ResumeEditor() {
  return (
    <div className="space-y-6 overflow-y-auto">
      <PersonalInformationForm />
      <Separator />
      <SummaryForm />
      <Separator />
      <ExperienceForm />
    </div>
  )
}
