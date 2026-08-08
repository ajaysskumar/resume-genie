import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297

export async function exportResumeToPdf(
  elementId = 'resume-page',
  filename = 'resume.pdf'
): Promise<void> {
  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error('Resume preview is not available for export.')
  }

  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: Math.min(window.devicePixelRatio || 1, 2),
    useCORS: true,
    logging: false,
    onclone: (clonedDocument) => {
      const clonedElement = clonedDocument.getElementById(elementId)
      if (clonedElement) {
        clonedElement.style.borderRadius = '0'
        clonedElement.style.boxShadow = 'none'
      }
    },
  })

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  })
  const imageHeight = (canvas.height * A4_WIDTH_MM) / canvas.width
  const pageCanvasHeight = Math.floor((A4_HEIGHT_MM * canvas.width) / A4_WIDTH_MM)
  let sourceY = 0
  let page = 0

  while (sourceY < canvas.height) {
    const pageCanvas = document.createElement('canvas')
    pageCanvas.width = canvas.width
    pageCanvas.height = Math.min(pageCanvasHeight, canvas.height - sourceY)
    const context = pageCanvas.getContext('2d')

    if (!context) {
      throw new Error('Unable to prepare the resume for PDF export.')
    }

    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
    context.drawImage(
      canvas,
      0,
      sourceY,
      canvas.width,
      pageCanvas.height,
      0,
      0,
      pageCanvas.width,
      pageCanvas.height
    )

    if (page > 0) {
      pdf.addPage()
    }

    pdf.addImage(
      pageCanvas.toDataURL('image/jpeg', 0.95),
      'JPEG',
      0,
      0,
      A4_WIDTH_MM,
      Math.min(A4_HEIGHT_MM, imageHeight - page * A4_HEIGHT_MM),
      undefined,
      'FAST'
    )

    sourceY += pageCanvas.height
    page += 1
  }

  pdf.save(filename)
}
