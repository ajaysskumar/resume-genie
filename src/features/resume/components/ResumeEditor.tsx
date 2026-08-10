import { PersonalInformationForm } from './PersonalInformationForm'
import { SummaryForm } from './SummaryForm'
import { ExperienceForm } from './ExperienceForm'
import { SkillsForm } from './SkillsForm'
import { EducationForm } from './EducationForm'
import { ProjectsForm } from './ProjectsForm'
import { CertificationsForm } from './CertificationsForm'

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

      <div>
        <div className="mb-4 flex items-center gap-3"><div className="h-6 w-1 rounded-full bg-amber-600" /><h2 className="text-xl font-bold text-slate-900">Skills</h2></div>
        <div className="mb-4 rounded-lg border border-amber-100/50 bg-gradient-to-br from-amber-50 to-transparent p-4"><SkillsForm /></div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-3"><div className="h-6 w-1 rounded-full bg-indigo-600" /><h2 className="text-xl font-bold text-slate-900">Education</h2></div>
        <div className="mb-4 rounded-lg border border-indigo-100/50 bg-gradient-to-br from-indigo-50 to-transparent p-4"><EducationForm /></div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-3"><div className="h-6 w-1 rounded-full bg-rose-600" /><h2 className="text-xl font-bold text-slate-900">Projects</h2></div>
        <div className="mb-4 rounded-lg border border-rose-100/50 bg-gradient-to-br from-rose-50 to-transparent p-4"><ProjectsForm /></div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-3"><div className="h-6 w-1 rounded-full bg-cyan-600" /><h2 className="text-xl font-bold text-slate-900">Certifications</h2></div>
        <div className="mb-4 rounded-lg border border-cyan-100/50 bg-gradient-to-br from-cyan-50 to-transparent p-4"><CertificationsForm /></div>
      </div>
    </div>
  )
}
