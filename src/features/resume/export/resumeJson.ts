import type { Resume } from '../types/resume'

export function exportResumeToJson(
  resume: Resume,
  filename = 'resume.json'
): void {
  const blob = new Blob([JSON.stringify(resume, null, 2)], {
    type: 'application/json;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}