import { PersonalInformationForm } from './PersonalInformationForm'
import { SummaryForm } from './SummaryForm'
import { ExperienceForm } from './ExperienceForm'

export function ResumeEditor() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-transparent p-4 rounded-lg border border-blue-100/50 mb-4">
          <PersonalInformationForm />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-slate-900">Professional Summary</h2>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-transparent p-4 rounded-lg border border-purple-100/50 mb-4">
          <SummaryForm />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-slate-900">Experience</h2>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-transparent p-4 rounded-lg border border-emerald-100/50 mb-4">
          <ExperienceForm />
        </div>
      </div>
    </div>
  )
}
