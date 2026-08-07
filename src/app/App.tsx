import { useEffect } from 'react'
import { useResumeStore } from '@/features/resume/store/resumeStore'
import { ResumeEditor } from '@/features/resume/components/ResumeEditor'
import { ResumePreview } from '@/features/resume/preview/ResumePreview'

export function App() {
  const { loadDemoResume } = useResumeStore()

  // Load demo resume on mount
  useEffect(() => {
    loadDemoResume()
  }, [])

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-900">Resume Builder</h1>
        <p className="text-sm text-slate-600">
          Create your resume and see the preview update in real-time
        </p>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <div className="w-full lg:w-[450px] border-r border-slate-200 overflow-y-auto bg-white p-6">
          <ResumeEditor />
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:flex flex-1 overflow-y-auto bg-slate-50">
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}
