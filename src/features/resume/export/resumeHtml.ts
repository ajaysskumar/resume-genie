function getComputedStyleText(computedStyle: CSSStyleDeclaration): string {
  const declarations: string[] = []

  for (let index = 0; index < computedStyle.length; index += 1) {
    const property = computedStyle.item(index)
    const value = computedStyle.getPropertyValue(property)
    if (value) declarations.push(`${property}:${value}${computedStyle.getPropertyPriority(property) ? ' !important' : ''};`)
  }

  return declarations.join('')
}

function addPseudoElementStyles(source: HTMLElement, clone: HTMLElement): string {
  const pseudoElements = ['::before', '::after'] as const
  const rules: string[] = []
  let pseudoIndex = 0

  const sourceElements = [source, ...Array.from(source.querySelectorAll<HTMLElement>('*'))]
  const cloneElements = [clone, ...Array.from(clone.querySelectorAll<HTMLElement>('*'))]

  sourceElements.forEach((element, elementIndex) => {
    pseudoElements.forEach((pseudoElement) => {
      const computedStyle = window.getComputedStyle(element, pseudoElement)
      const content = computedStyle.getPropertyValue('content')
      if (content === 'none' || content === 'normal') return

      const attribute = `resume-pseudo-${pseudoIndex}`
      cloneElements[elementIndex].setAttribute('data-export-pseudo', attribute)
      rules.push(`[data-export-pseudo="${attribute}"]${pseudoElement}{${getComputedStyleText(computedStyle)}}`)
      pseudoIndex += 1
    })
  })

  return rules.join('')
}

function createHtmlDocument(source: HTMLElement): string {
  const clone = source.cloneNode(true) as HTMLElement
  const sourceElements = [source, ...Array.from(source.querySelectorAll<HTMLElement>('*'))]
  const cloneElements = [clone, ...Array.from(clone.querySelectorAll<HTMLElement>('*'))]

  sourceElements.forEach((element, index) => {
    cloneElements[index].setAttribute('style', getComputedStyleText(window.getComputedStyle(element)))
  })

  const pseudoStyles = addPseudoElementStyles(source, clone)
  clone.style.removeProperty('position')
  clone.style.removeProperty('top')
  clone.style.removeProperty('left')
  clone.style.removeProperty('opacity')
  clone.style.removeProperty('pointer-events')
  clone.removeAttribute('aria-hidden')
  clone.removeAttribute('id')
  clone.setAttribute('id', 'resume-page')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume template</title>
    <style>
      @page { size: A4; margin: 0; }
      html, body { margin: 0; padding: 0; background: #ffffff; }
      @media print {
        .resume-print-pages {
          position: static !important;
          top: auto !important;
          left: auto !important;
          width: 210mm !important;
          opacity: 1 !important;
          pointer-events: auto !important;
        }

        .resume-print-page {
          width: 210mm !important;
          height: 297mm !important;
          overflow: hidden !important;
          break-after: page;
          page-break-after: always;
        }

        .resume-print-page:last-child {
          break-after: auto;
          page-break-after: auto;
        }

        .resume-page-viewport {
          height: calc(297mm - 16px) !important;
          overflow: hidden !important;
        }

        .resume-page-content {
          border-radius: 0 !important;
          box-shadow: none !important;
        }
      }
      ${pseudoStyles}
    </style>
  </head>
  <body>${clone.outerHTML}</body>
</html>`
}

export async function exportResumeToHtml(
  elementId = 'resume-page',
  filename = 'resume-template.html'
): Promise<void> {
  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error('Resume preview is not available for HTML export.')
  }

  const html = createHtmlDocument(element)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
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