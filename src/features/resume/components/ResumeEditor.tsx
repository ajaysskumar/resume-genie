import { useState } from 'react'
import { Check, Save, ShieldCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RESUME_DRAFT_STORAGE_KEY, useResumeStore } from '../store/resumeStore'
import { PersonalInformationForm } from './PersonalInformationForm'
import { SummaryForm } from './SummaryForm'
import { ExperienceForm } from './ExperienceForm'
import { SkillsForm } from './SkillsForm'
import { EducationForm } from './EducationForm'
import { ProjectsForm } from './ProjectsForm'
import { CertificationsForm } from './CertificationsForm'

export function ResumeEditor() {
  const saveDraft = useResumeStore((state) => state.saveDraft)
  const [isConsentOpen, setIsConsentOpen] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSaveDraft = () => {
    try {
      const storedDraft = localStorage.getItem(RESUME_DRAFT_STORAGE_KEY)
      if (!storedDraft?.trim()) {
        setIsConsentOpen(true)
        return
      }

      saveDraft()
      setSaveMessage('Draft saved locally')
    } catch {
      setSaveMessage('Unable to access browser storage')
    }
  }

  const confirmSaveDraft = () => {
    try {
      saveDraft()
      setIsConsentOpen(false)
      setSaveMessage('Draft saved locally')
    } catch {
      setIsConsentOpen(false)
      setSaveMessage('Unable to access browser storage')
    }
  }

  return (
    <div className="space-y-8">
      <div className="sticky top-0 z-10 -mx-1 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-1 pb-3 backdrop-blur sm:static sm:bg-transparent sm:pb-0 sm:backdrop-blur-none">
        <div>
          <p className="text-sm font-semibold text-slate-900">Resume details</p>
          <p className="text-xs text-slate-500">Saved only in this browser</p>
        </div>
        <div className="flex items-center gap-2">
          {saveMessage && <span className="hidden items-center gap-1 text-xs text-emerald-700 sm:flex"><Check className="h-3.5 w-3.5" />{saveMessage}</span>}
          <Button type="button" variant="outline" size="sm" className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50" onClick={handleSaveDraft}>
            <Save className="h-4 w-4" />
            <span>Save as draft</span>
          </Button>
        </div>
      </div>

      {saveMessage && <p className="flex items-center gap-1 text-xs text-emerald-700 sm:hidden"><Check className="h-3.5 w-3.5" />{saveMessage}</p>}

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

      {isConsentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" role="presentation" onMouseDown={() => setIsConsentOpen(false)}>
          <section className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="draft-consent-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 text-blue-700"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <h2 id="draft-consent-title" className="text-lg font-bold text-slate-900">Save draft locally?</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Your resume details, including personal information, will be saved in this browser on this device. This app does not send your data to any server.</p>
                </div>
              </div>
              <button type="button" className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" onClick={() => setIsConsentOpen(false)} aria-label="Close save draft confirmation"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsConsentOpen(false)}>Cancel</Button>
              <Button type="button" onClick={confirmSaveDraft}>Save locally</Button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
