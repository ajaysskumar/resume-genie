import { useResumeStore } from '../store/resumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'

export function CertificationsForm() {
  const { resume, addCertification, updateCertification, deleteCertification } = useResumeStore()

  return (
    <div className="space-y-4">
      {resume.certifications.map((certification) => (
        <div key={certification.id} className="space-y-3 rounded-lg border border-cyan-100 bg-white/70 p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input aria-label="Certification name" value={certification.name} onChange={(event) => updateCertification(certification.id, 'name', event.target.value)} placeholder="Certification name" />
            <Input aria-label="Issuing organization" value={certification.issuer} onChange={(event) => updateCertification(certification.id, 'issuer', event.target.value)} placeholder="Issuing organization" />
            <Input aria-label="Certification issue date" type="month" value={certification.issueDate ?? ''} onChange={(event) => updateCertification(certification.id, 'issueDate', event.target.value)} />
            <Input aria-label="Certification URL" type="url" value={certification.url ?? ''} onChange={(event) => updateCertification(certification.id, 'url', event.target.value)} placeholder="Verification URL (optional)" />
          </div>
          <Button type="button" variant="ghost" size="sm" className="h-10 w-10 p-0 text-slate-500 hover:text-red-600" onClick={() => deleteCertification(certification.id)} aria-label={`Delete ${certification.name || 'certification'}`} title={`Delete ${certification.name || 'certification'}`}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
      <div className="flex justify-end"><Button type="button" variant="outline" size="sm" className="h-10 w-10 p-0" onClick={addCertification} aria-label="Add certification" title="Add certification"><Plus className="h-4 w-4" /></Button></div>
    </div>
  )
}