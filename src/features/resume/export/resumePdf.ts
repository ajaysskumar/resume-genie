import { createHtmlDocument } from './resumeHtml'

export async function exportResumeToPdf(
  elementId = 'resume-page',
  _filename = 'resume.pdf'
): Promise<void> {
  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error('Resume preview is not available for export.')
  }

  const html = createHtmlDocument(element)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const printWindow = window.open(url, '_blank')
  if (!printWindow) {
    throw new Error('Failed to open print window. Please check your browser settings.')
  }

  printWindow.addEventListener('load', () => {
    printWindow.print()
  })

  // Clean up after print dialog closes
  printWindow.addEventListener('afterprint', () => {
    printWindow.close()
    URL.revokeObjectURL(url)
  })

  // Fallback cleanup in case afterprint doesn't fire
  setTimeout(() => {
    if (!printWindow.closed) {
      printWindow.close()
    }
    URL.revokeObjectURL(url)
  }, 5000)
}
