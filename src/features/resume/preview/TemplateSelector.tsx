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
]

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div className="sticky top-0 z-10 mb-2 grid w-full min-w-0 max-w-full grid-cols-2 gap-2 border-b border-slate-200 bg-slate-100/95 px-1 py-3 backdrop-blur sm:flex sm:items-center">
      <span className="col-span-2 text-xs font-bold uppercase tracking-wider text-slate-500 sm:mr-2">Template</span>
      {templates.map((template) => (
        <button
          key={template.id}
          type="button"
          aria-pressed={value === template.id}
          onClick={() => onChange(template.id)}
          className={`group flex min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-all sm:w-auto sm:shrink-0 sm:px-3 ${
            value === template.id
              ? 'border-slate-900 bg-slate-900 text-white shadow-md'
              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:shadow-sm'
          }`}
        >
          <span className={`h-2.5 w-2.5 rounded-full ${template.accent}`} aria-hidden="true" />
          <span>
            <span className="block text-xs font-bold leading-none">{template.name}</span>
            <span className={`mt-1 block text-[10px] leading-none ${value === template.id ? 'text-slate-300' : 'text-slate-400'}`}>
              {template.description}
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}