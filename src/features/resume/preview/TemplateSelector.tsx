import { useEffect, useRef, type UIEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ResumeTemplate } from './ResumePreview'

interface TemplateSelectorProps {
  value: ResumeTemplate
  onChange: (value: ResumeTemplate) => void
}

const templates: Array<{ id: ResumeTemplate; name: string; description: string; accent: string }> = [
  { id: 'classic', name: 'Classic', description: 'ATS-friendly', accent: 'bg-slate-900' },
  { id: 'modern', name: 'Modern', description: 'Color rail', accent: 'bg-cyan-500' },
  { id: 'executive', name: 'Executive', description: 'Editorial', accent: 'bg-amber-500' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and compact', accent: 'bg-rose-500' },
  { id: 'basic', name: 'Basic', description: 'Simple and clear', accent: 'bg-blue-500' },
  { id: 'timeline', name: 'Timeline', description: 'Career focused', accent: 'bg-violet-500' },
]

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  const pickerRef = useRef<HTMLDivElement>(null)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const selectedIndex = templates.findIndex((template) => template.id === value)

  useEffect(() => () => {
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
  }, [])

  useEffect(() => {
    const selected = pickerRef.current?.querySelector<HTMLButtonElement>(`[data-template="${value}"]`)
    const picker = pickerRef.current
    if (!selected || !picker) return

    picker.scrollTo({
      left: selected.offsetLeft - (picker.clientWidth - selected.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [value])

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const picker = event.currentTarget
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    scrollTimerRef.current = setTimeout(() => {
      const pickerCenter = picker.scrollLeft + picker.clientWidth / 2
      const buttons = Array.from(picker.querySelectorAll<HTMLButtonElement>('[data-template]'))
      const closestButton = buttons.reduce((current, button) => {
        const distance = Math.abs(button.offsetLeft + button.offsetWidth / 2 - pickerCenter)
        const currentDistance = Math.abs(current.offsetLeft + current.offsetWidth / 2 - pickerCenter)
        return distance < currentDistance ? button : current
      }, buttons[0])

      const closestTemplate = templates.find((template) => template.id === closestButton?.dataset.template)
      if (closestTemplate && closestTemplate.id !== value) onChange(closestTemplate.id)
    }, 120)
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const picker = event.currentTarget
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return

    event.preventDefault()
    picker.scrollLeft += event.deltaY
  }

  const selectRelativeTemplate = (offset: number) => {
    const nextIndex = (selectedIndex + offset + templates.length) % templates.length
    onChange(templates[nextIndex].id)
  }

  return (
    <div className="flex h-10 shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-1.5 shadow-sm">
      <span className="px-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">Template</span>
      <button
        type="button"
        onClick={() => selectRelativeTemplate(-1)}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:border-slate-400 hover:text-slate-900 active:scale-95"
        aria-label="Previous template"
        title="Previous template"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div
        ref={pickerRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        className="relative flex h-8 w-40 snap-x snap-mandatory overflow-x-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Choose resume template"
      >
        <div className="w-8 shrink-0" aria-hidden="true" />
        <div className="pointer-events-none sticky left-0 z-10 h-full w-4 shrink-0 bg-gradient-to-r from-slate-100 to-transparent" />
        {templates.map((template) => (
          <button
            key={template.id}
            data-template={template.id}
            type="button"
            aria-pressed={value === template.id}
            onClick={() => onChange(template.id)}
            className={`flex h-8 w-24 shrink-0 snap-center items-center justify-center gap-1.5 border-x text-xs transition-all ${
              value === template.id
                ? 'border-slate-300 bg-white font-bold text-slate-900 shadow-sm'
                : 'border-transparent font-medium text-slate-400 hover:text-slate-700'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${template.accent}`} aria-hidden="true" />
            <span>{template.name}</span>
          </button>
        ))}
        <div className="pointer-events-none sticky right-0 z-10 h-full w-4 shrink-0 bg-gradient-to-l from-slate-100 to-transparent" />
        <div className="w-8 shrink-0" aria-hidden="true" />
      </div>
      <button
        type="button"
        onClick={() => selectRelativeTemplate(1)}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:border-slate-400 hover:text-slate-900 active:scale-95"
        aria-label="Next template"
        title="Next template"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}