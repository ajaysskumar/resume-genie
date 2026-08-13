import { AlignmentType, BorderStyle, Document, ExternalHyperlink, HeadingLevel, LineRuleType, Packer, Paragraph, TextRun, convertMillimetersToTwip } from 'docx'

const DOCX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
const CSS_PX_TO_TWIPS = 15

type InlineRun = {
  text: string
  href?: string
  bold?: boolean
  italics?: boolean
  underline?: object
  color?: string
  font?: string
  size?: number
  characterSpacing?: number
}

type HeadingValue = typeof HeadingLevel[keyof typeof HeadingLevel]

function toTwips(value: string): number | undefined {
  const pixels = Number.parseFloat(value)
  return Number.isFinite(pixels) ? Math.max(0, Math.round(pixels * CSS_PX_TO_TWIPS)) : undefined
}

function toHalfPoints(fontSize: string): number | undefined {
  const pixels = Number.parseFloat(fontSize)
  return Number.isFinite(pixels) ? Math.max(1, Math.round(pixels * 1.5)) : undefined
}

function cssColorToHex(color: string): string | undefined {
  if (!color || color === 'transparent') return undefined

  if (color.startsWith('#')) {
    const value = color.slice(1)
    if (value.length === 3) return value.split('').map((channel) => `${channel}${channel}`).join('').toUpperCase()
    if (value.length === 6) return value.toUpperCase()
  }

  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match || (match[4] !== undefined && Number(match[4]) === 0)) return undefined

  return [match[1], match[2], match[3]]
    .map((channel) => Number(channel).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

function getFontFamily(fontFamily: string): string | undefined {
  const family = fontFamily.split(',')[0]?.trim().replace(/^['"]|['"]$/g, '')
  return family || undefined
}

function isHidden(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element)
  return style.display === 'none' || style.visibility === 'hidden'
}

function getTextStyle(element: HTMLElement): Omit<InlineRun, 'text' | 'href'> & { textTransform?: string } {
  const style = window.getComputedStyle(element)
  const fontWeight = Number.parseInt(style.fontWeight, 10)

  return {
    bold: Number.isFinite(fontWeight) ? fontWeight >= 600 : style.fontWeight === 'bold',
    italics: style.fontStyle === 'italic',
    underline: style.textDecorationLine.includes('underline') ? {} : undefined,
    color: cssColorToHex(style.color),
    font: getFontFamily(style.fontFamily),
    size: toHalfPoints(style.fontSize),
    characterSpacing: toTwips(style.letterSpacing),
    textTransform: style.textTransform,
  }
}

function mergeTextStyle(
  parent: Omit<InlineRun, 'text' | 'href'> & { textTransform?: string },
  element: HTMLElement
): Omit<InlineRun, 'text' | 'href'> & { textTransform?: string } {
  const current = getTextStyle(element)
  return {
    bold: current.bold || parent.bold,
    italics: current.italics || parent.italics,
    underline: current.underline || parent.underline,
    color: current.color || parent.color,
    font: current.font || parent.font,
    size: current.size || parent.size,
    characterSpacing: current.characterSpacing || parent.characterSpacing,
    textTransform: current.textTransform && current.textTransform !== 'none' ? current.textTransform : parent.textTransform,
  }
}

function transformText(text: string, textTransform?: string): string {
  if (textTransform === 'uppercase') return text.toUpperCase()
  if (textTransform === 'lowercase') return text.toLowerCase()
  return text
}

function createInlineRuns(
  element: HTMLElement,
  inheritedStyle: Omit<InlineRun, 'text' | 'href'> & { textTransform?: string } = {},
  inheritedHref?: string
): InlineRun[] {
  const style = mergeTextStyle(inheritedStyle, element)
  const href = element.tagName.toLowerCase() === 'a' ? element.getAttribute('href') ?? inheritedHref : inheritedHref
  const runs: InlineRun[] = []

  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.replace(/\s+/g, ' ')
      if (text?.trim()) runs.push({ text: transformText(text, style.textTransform), href, ...style })
      return
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      runs.push(...createInlineRuns(node as HTMLElement, style, href))
    }
  })

  return runs
}

function hasBlockChild(element: HTMLElement): boolean {
  return Array.from(element.children).some((child) => {
    const tagName = child.tagName.toLowerCase()
    return ['article', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'p', 'section', 'time'].includes(tagName)
  })
}

function isHeading(tagName: string): boolean {
  return /^h[1-6]$/.test(tagName)
}

function headingLevel(tagName: string): HeadingValue {
  const levels: Record<string, HeadingValue> = {
    h1: HeadingLevel.TITLE,
    h2: HeadingLevel.HEADING_1,
    h3: HeadingLevel.HEADING_2,
    h4: HeadingLevel.HEADING_3,
    h5: HeadingLevel.HEADING_4,
    h6: HeadingLevel.HEADING_5,
  }
  return levels[tagName] ?? HeadingLevel.HEADING_1
}

function getBackgroundColor(element: HTMLElement): string | undefined {
  let current: HTMLElement | null = element
  while (current) {
    const color = cssColorToHex(window.getComputedStyle(current).backgroundColor)
    if (color && color !== 'FFFFFF') return color
    current = current.parentElement
  }
  return undefined
}

function getBorder(element: HTMLElement, side: 'Top' | 'Right' | 'Bottom' | 'Left') {
  const style = window.getComputedStyle(element)
  const width = toTwips(style[`border${side}Width` as keyof CSSStyleDeclaration] as string)
  const borderStyle = style[`border${side}Style` as keyof CSSStyleDeclaration] as string
  const color = cssColorToHex(style[`border${side}Color` as keyof CSSStyleDeclaration] as string)

  if (!width || borderStyle === 'none' || borderStyle === 'hidden' || !color) return undefined

  const borderType = borderStyle === 'double'
    ? BorderStyle.DOUBLE
    : borderStyle === 'dashed'
    ? BorderStyle.DASHED
    : borderStyle === 'dotted'
    ? BorderStyle.DOTTED
    : BorderStyle.SINGLE

  return { color, size: Math.max(1, Math.round(width / 15)), space: 1, style: borderType }
}

function getInheritedBorder(element: HTMLElement, side: 'Top' | 'Right' | 'Bottom' | 'Left') {
  let current: HTMLElement | null = element
  while (current) {
    const border = getBorder(current, side)
    if (border) return border
    current = current.parentElement
  }
  return undefined
}

function toTextRun(run: InlineRun): TextRun {
  return new TextRun({
    text: run.text,
    bold: run.bold,
    italics: run.italics,
    underline: run.underline,
    color: run.color,
    font: run.font,
    size: run.size,
    characterSpacing: run.characterSpacing,
  })
}

function toParagraphChildren(runs: InlineRun[]): (TextRun | ExternalHyperlink)[] {
  return runs.map((run) => run.href
    ? new ExternalHyperlink({ link: run.href, children: [toTextRun(run)] })
    : toTextRun(run))
}

function createParagraph(element: HTMLElement, options: { bullet?: boolean; heading?: HeadingValue } = {}): Paragraph | null {
  const runs = createInlineRuns(element)
  if (runs.length === 0) return null

  const computedStyle = window.getComputedStyle(element)
  const lineHeight = Number.parseFloat(computedStyle.lineHeight)
  const fontSize = Number.parseFloat(computedStyle.fontSize)
  const line = Number.isFinite(lineHeight) && Number.isFinite(fontSize)
    ? Math.max(240, Math.round((lineHeight / fontSize) * 240))
    : undefined
  const alignment = computedStyle.textAlign === 'center'
    ? AlignmentType.CENTER
    : computedStyle.textAlign === 'right'
    ? AlignmentType.RIGHT
    : AlignmentType.LEFT
  const leftIndent = toTwips(computedStyle.paddingLeft) ?? toTwips(computedStyle.marginLeft)
  const rightIndent = toTwips(computedStyle.paddingRight) ?? toTwips(computedStyle.marginRight)
  const border = {
    top: getBorder(element, 'Top'),
    right: getBorder(element, 'Right'),
    bottom: getBorder(element, 'Bottom'),
    left: getInheritedBorder(element, 'Left'),
  }
  const background = getBackgroundColor(element)

  return new Paragraph({
    children: toParagraphChildren(runs),
    heading: options.heading,
    alignment,
    bullet: options.bullet ? { level: 0 } : undefined,
    indent: { left: leftIndent, right: rightIndent },
    spacing: {
      before: toTwips(computedStyle.marginTop),
      after: toTwips(computedStyle.marginBottom),
      line,
      lineRule: line ? LineRuleType.AUTO : undefined,
    },
    shading: background ? { fill: background } : undefined,
    border: Object.values(border).some(Boolean) ? border : undefined,
  })
}

function collectParagraphs(root: HTMLElement): Paragraph[] {
  const paragraphs: Paragraph[] = []

  const visit = (element: HTMLElement) => {
    if (isHidden(element)) return

    const tagName = element.tagName.toLowerCase()
    if (isHeading(tagName)) {
      const paragraph = createParagraph(element, { heading: headingLevel(tagName) })
      if (paragraph) paragraphs.push(paragraph)
      return
    }

    if (tagName === 'p' || tagName === 'time') {
      const paragraph = createParagraph(element)
      if (paragraph) paragraphs.push(paragraph)
      return
    }

    if (tagName === 'li') {
      const paragraph = createParagraph(element, { bullet: true })
      if (paragraph) paragraphs.push(paragraph)
      return
    }

    if (tagName === 'div' && !hasBlockChild(element)) {
      const paragraph = createParagraph(element)
      if (paragraph) paragraphs.push(paragraph)
      return
    }

    Array.from(element.children).forEach((child) => visit(child as HTMLElement))
  }

  visit(root)
  return paragraphs
}

function createDocument(element: HTMLElement): Document {
  const paragraphs = collectParagraphs(element)
  if (paragraphs.length === 0) throw new Error('The selected resume template has no content to export.')

  const rootStyle = window.getComputedStyle(element)
  const rootFont = getTextStyle(element)
  const pageBackground = cssColorToHex(rootStyle.backgroundColor)

  return new Document({
    background: pageBackground && pageBackground !== 'FFFFFF' ? { color: pageBackground } : undefined,
    styles: {
      default: {
        document: {
          run: {
            font: rootFont.font,
            size: rootFont.size,
            color: rootFont.color,
          },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          size: { width: convertMillimetersToTwip(210), height: convertMillimetersToTwip(297) },
          margin: {
            top: toTwips(rootStyle.paddingTop) ?? 720,
            right: toTwips(rootStyle.paddingRight) ?? 720,
            bottom: toTwips(rootStyle.paddingBottom) ?? 720,
            left: toTwips(rootStyle.paddingLeft) ?? 720,
          },
        },
      },
      children: paragraphs,
    }],
  })
}

export async function exportResumeToDocx(
  elementId = 'resume-page',
  filename = 'resume.docx'
): Promise<void> {
  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error('Resume preview is not available for export.')
  }

  const blob = await Packer.toBlob(createDocument(element))
  if (blob.size === 0) throw new Error('The DOCX exporter returned an empty file.')

  const downloadBlob = blob.type === DOCX_MIME_TYPE ? blob : new Blob([blob], { type: DOCX_MIME_TYPE })
  const url = URL.createObjectURL(downloadBlob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
