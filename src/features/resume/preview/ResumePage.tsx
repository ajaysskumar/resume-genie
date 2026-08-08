import React from 'react'

interface ResumePageProps {
  children: React.ReactNode
}

export function ResumePage({ children }: ResumePageProps) {
  return (
    <div className="flex min-w-max justify-center py-8 mx-auto">
      <div id="resume-page" className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-lg p-10 font-[Arial,sans-serif] text-[11pt] leading-relaxed" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
        {children}
      </div>
    </div>
  )
}
