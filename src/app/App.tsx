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
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 shadow-sm sm:px-8 sm:py-6">
        <h1 className="mb-1 text-2xl font-bold text-white sm:text-3xl">Resume Builder</h1>
        <p className="text-blue-100 text-sm font-medium">
          Craft your story. Watch it transform in real-time.
        </p>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Editor Panel */}
        <div className="max-h-[55vh] w-full shrink-0 overflow-y-auto border-b border-slate-200/50 bg-white p-4 shadow-sm sm:p-8 md:max-h-none md:w-[450px] md:border-b-0 md:border-r">
          <ResumeEditor />
        </div>

        {/* Preview Panel */}
        <div className="min-h-[45vh] min-w-0 flex-1 overflow-auto bg-gradient-to-br from-slate-100/50 via-slate-50 to-white p-3 sm:p-8">
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}
