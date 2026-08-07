import { useResumeStore } from '../store/resumeStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PersonalInformationForm() {
  const { resume, updatePersonal } = useResumeStore()
  const { personal } = resume

  const fields = [
    { key: 'fullName' as const, label: 'Full Name', required: true },
    { key: 'headline' as const, label: 'Headline', required: true },
    { key: 'email' as const, label: 'Email', type: 'email', required: true },
    { key: 'phone' as const, label: 'Phone', type: 'tel' },
    { key: 'location' as const, label: 'Location' },
    { key: 'linkedin' as const, label: 'LinkedIn URL', type: 'url' },
    { key: 'website' as const, label: 'Website URL', type: 'url' },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Personal Information</h2>
      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.key}>
            <Label htmlFor={field.key} className="block mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.key}
              type={field.type || 'text'}
              value={personal[field.key] || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePersonal(field.key, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
