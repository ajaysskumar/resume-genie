import { useResumeStore } from '../store/resumeStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PersonalInformationForm() {
  const { resume, updatePersonal } = useResumeStore()
  const { personal } = resume

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updatePersonal('profileImage', reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const fields = [
    { key: 'fullName' as const, label: 'Full Name', placeholder: 'e.g. Maya Sharma', required: true },
    { key: 'headline' as const, label: 'Headline', placeholder: 'e.g. Product Designer', required: true },
    { key: 'email' as const, label: 'Email', placeholder: 'e.g. maya@example.com', type: 'email', required: true },
    { key: 'phone' as const, label: 'Phone', placeholder: 'e.g. +91 98765 43210', type: 'tel' },
    { key: 'location' as const, label: 'Location', placeholder: 'e.g. Bengaluru, India' },
    { key: 'linkedin' as const, label: 'LinkedIn URL', placeholder: 'e.g. linkedin.com/in/mayasharma', type: 'url' },
    { key: 'github' as const, label: 'GitHub URL', placeholder: 'e.g. github.com/mayasharma', type: 'url' },
    { key: 'website' as const, label: 'Website URL', placeholder: 'e.g. mayasharma.dev', type: 'url' },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {fields.slice(0, 2).map((field) => (
          <div key={field.key}>
            <Label htmlFor={field.key} className="block mb-2 text-sm font-medium text-slate-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.key}
              type={field.type || 'text'}
              value={personal[field.key] || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePersonal(field.key, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {fields.slice(2).map((field) => (
          <div key={field.key}>
            <Label htmlFor={field.key} className="block mb-2 text-sm font-medium text-slate-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.key}
              type={field.type || 'text'}
              value={personal[field.key] || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePersonal(field.key, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-blue-100 bg-white/70 p-3">
        <Label htmlFor="profileImage" className="mb-2 block text-sm font-medium text-slate-700">
          Profile photo <span className="font-normal text-slate-400">(optional)</span>
        </Label>
        <div className="flex items-center gap-3">
          {personal.profileImage ? (
            <img src={personal.profileImage} alt="Profile preview" className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-blue-100" />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">PHOTO</div>
          )}
          <Input id="profileImage" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleProfileImageChange} className="h-auto min-w-0 py-2 text-xs" />
        </div>
      </div>
    </div>
  )
}
