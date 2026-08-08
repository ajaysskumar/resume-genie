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
      <header className="border-b border-slate-200/50 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 shadow-sm">
        <h1 className="text-3xl font-bold text-white mb-1">Resume Builder</h1>
        <p className="text-blue-100 text-sm font-medium">
          Craft your story. Watch it transform in real-time.
        </p>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <div className="w-[450px] border-r border-slate-200/50 overflow-y-auto bg-white p-8 shadow-sm">
          <ResumeEditor />
        </div>

        {/* Preview Panel */}
        <div className="min-w-0 flex flex-1 overflow-auto bg-gradient-to-br from-slate-100/50 via-slate-50 to-white p-8">
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}
