import React from 'react'

interface ResumePageProps {
  children: React.ReactNode
}

export function ResumePage({ children }: ResumePageProps) {
  return (
    <div className="flex justify-center bg-slate-100 p-8 min-h-screen">
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg rounded-sm p-10 font-[Arial,sans-serif] text-[11pt] leading-normal">
        {children}
      </div>
    </div>
  )
}
