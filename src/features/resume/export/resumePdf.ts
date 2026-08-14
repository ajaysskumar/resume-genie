import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
const PDF_MARGIN_MM = 10
const PDF_CONTENT_WIDTH_MM = A4_WIDTH_MM - PDF_MARGIN_MM * 2
const PDF_CONTENT_HEIGHT_MM = A4_HEIGHT_MM - PDF_MARGIN_MM * 2

function getRenderedContentBottom(canvas: HTMLCanvasElement): number {
  const context = canvas.getContext('2d')
  if (!context) return canvas.height

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data
  for (let y = canvas.height - 1; y >= 0; y -= 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const pixelIndex = (y * canvas.width + x) * 4
      if (
        imageData[pixelIndex] < 248 ||
        imageData[pixelIndex + 1] < 248 ||
        imageData[pixelIndex + 2] < 248
      ) {
        return y + 1
      }
    }
  }

  return 0
}

function getSafePageBreak(element: HTMLElement, pageStartCss: number, desiredEndCss: number): number {
  const elementTop = element.getBoundingClientRect().top
  const range = document.createRange()
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  let safeBreak = pageStartCss
  let textNode = walker.nextNode()

  while (textNode) {
    range.selectNodeContents(textNode)

    for (const rect of range.getClientRects()) {
      const lineBottom = rect.bottom - elementTop
      if (lineBottom > safeBreak + 1 && lineBottom <= desiredEndCss + 1) {
        safeBreak = Math.max(safeBreak, lineBottom)
      }
    }

    textNode = walker.nextNode()
  }

  range.detach()
  return safeBreak > pageStartCss ? safeBreak : desiredEndCss
}

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
  const pageCanvasHeight = Math.floor((PDF_CONTENT_HEIGHT_MM * canvas.width) / PDF_CONTENT_WIDTH_MM)
  const canvasScale = canvas.width / element.getBoundingClientRect().width
  const contentBottom = getRenderedContentBottom(canvas)
  let sourceY = 0
  let page = 0

  while (sourceY < contentBottom) {
    const desiredSourceEnd = Math.min(pageCanvasHeight + sourceY, contentBottom)
    const desiredEndCss = desiredSourceEnd / canvasScale
    const pageStartCss = sourceY / canvasScale
    const safeEndCss = getSafePageBreak(element, pageStartCss, desiredEndCss)
    const safeSourceEnd = Math.min(
      contentBottom,
      Math.max(sourceY + 1, Math.round(safeEndCss * canvasScale))
    )

    const pageCanvas = document.createElement('canvas')
    pageCanvas.width = canvas.width
    pageCanvas.height = safeSourceEnd - sourceY
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
      PDF_MARGIN_MM,
      PDF_MARGIN_MM,
      PDF_CONTENT_WIDTH_MM,
      Math.min(PDF_CONTENT_HEIGHT_MM, (pageCanvas.height * PDF_CONTENT_WIDTH_MM) / canvas.width),
      undefined,
      'FAST'
    )

    sourceY = safeSourceEnd
    page += 1
  }

  pdf.save(filename)
}
