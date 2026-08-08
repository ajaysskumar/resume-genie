import { asBlob } from 'html-docx-js-typescript'

function collectStyles(): string {
  return Array.from(document.styleSheets).flatMap((styleSheet) => {
    try {
      return Array.from(styleSheet.cssRules, (rule) => rule.cssText)
    } catch {
      return []
    }
  }).join('\n')
}

function createDocumentHtml(element: HTMLElement): string {
  const clone = element.cloneNode(true) as HTMLElement
  clone.removeAttribute('id')
  clone.style.boxShadow = 'none'
  clone.style.borderRadius = '0'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Resume</title>
  <style>
    @page { size: A4; margin: 0; }
    html, body { margin: 0; padding: 0; background: #ffffff; }
    ${collectStyles()}
  </style>
</head>
<body>${clone.outerHTML}</body>
</html>`
}

export async function exportResumeToDocx(
  elementId = 'resume-page',
  filename = 'resume.docx'
): Promise<void> {
  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error('Resume preview is not available for export.')
  }

  const generatedFile = await asBlob(createDocumentHtml(element), {
    orientation: 'portrait',
    margins: { top: 0, right: 0, bottom: 0, left: 0 },
  })
  const blob = generatedFile instanceof Blob
    ? generatedFile
    : new Blob([new Uint8Array(generatedFile)], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })

  if (blob.size === 0) {
    throw new Error('The DOCX exporter returned an empty file.')
  }

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
