import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, convertInchesToTwip, BorderStyle } from 'docx'
import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'

function createContactInfo(resume: Resume): Paragraph[] {
  const { personal } = resume
  const contactParts: string[] = []

  if (personal.email) contactParts.push(personal.email)
  if (personal.phone) contactParts.push(personal.phone)
  if (personal.location) contactParts.push(personal.location)

  const links: string[] = []
  if (personal.linkedin) links.push(personal.linkedin.replace(/^https?:\/\/(www\.)?/, ''))
  if (personal.github) links.push(personal.github.replace(/^https?:\/\/(www\.)?/, ''))
  if (personal.medium) links.push(personal.medium.replace(/^https?:\/\/(www\.)?/, ''))
  if (personal.website) links.push(personal.website.replace(/^https?:\/\/(www\.)?/, ''))

  return [
    new Paragraph({
      text: personal.fullName,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      text: personal.headline,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: contactParts.join(' | '),
      alignment: AlignmentType.CENTER,
      spacing: { after: links.length > 0 ? 100 : 300 },
    }),
    ...(links.length > 0
      ? [
          new Paragraph({
            text: links.join(' | '),
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
        ]
      : []),
  ]
}

function createSummarySection(resume: Resume): Paragraph[] {
  if (!resume.summary) return []
  return [
    new Paragraph({
      text: 'PROFESSIONAL SUMMARY',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 150 },
      border: { bottom: { color: '000000', space: 1, style: BorderStyle.SINGLE, size: 6 } },
    }),
    new Paragraph({
      text: resume.summary,
      spacing: { after: 300 },
    }),
  ]
}

function createExperienceSection(resume: Resume): Paragraph[] {
  if (resume.experience.length === 0) return []

  const paragraphs: Paragraph[] = [
    new Paragraph({
      text: 'PROFESSIONAL EXPERIENCE',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 150 },
      border: { bottom: { color: '000000', space: 1, style: BorderStyle.SINGLE, size: 6 } },
    }),
  ]

  resume.experience.forEach((exp, index) => {
    const dateRange = `${exp.startDate ? formatDate(exp.startDate) : ''} – ${exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}`

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: exp.position, bold: true }),
          new TextRun({ text: ` | ${exp.company}`, bold: true }),
        ],
        spacing: { before: index === 0 ? 0 : 250, after: 50 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: dateRange }),
          ...(exp.location ? [new TextRun({ text: ` | ${exp.location}` })] : []),
        ],
        spacing: { after: 150 },
      })
    )

    exp.bullets.forEach((bullet) => {
      paragraphs.push(
        new Paragraph({
          text: bullet.text,
          bullet: { level: 0 },
          spacing: { after: 100 },
        })
      )
    })
  })

  paragraphs.push(new Paragraph({ text: '', spacing: { after: 200 } }))
  return paragraphs
}

function createSkillsSection(resume: Resume): Paragraph[] {
  if (resume.skills.length === 0) return []

  const paragraphs: Paragraph[] = [
    new Paragraph({
      text: 'SKILLS',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 150 },
      border: { bottom: { color: '000000', space: 1, style: BorderStyle.SINGLE, size: 6 } },
    }),
  ]

  resume.skills.forEach((skillGroup) => {
    if (skillGroup.category && skillGroup.skills.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${skillGroup.category}: `, bold: true }),
            new TextRun({ text: skillGroup.skills.join(', ') }),
          ],
          spacing: { after: 100 },
        })
      )
    }
  })

  paragraphs.push(new Paragraph({ text: '', spacing: { after: 200 } }))
  return paragraphs
}

function createEducationSection(resume: Resume): Paragraph[] {
  if (resume.education.length === 0) return []

  const paragraphs: Paragraph[] = [
    new Paragraph({
      text: 'EDUCATION',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 150 },
      border: { bottom: { color: '000000', space: 1, style: BorderStyle.SINGLE, size: 6 } },
    }),
  ]

  resume.education.forEach((edu, index) => {
    const dateRange =
      edu.startDate && edu.endDate
        ? `${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`
        : edu.startDate
        ? formatDate(edu.startDate)
        : edu.endDate
        ? formatDate(edu.endDate)
        : ''

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: edu.degree, bold: true }),
          new TextRun({ text: ` | ${edu.institution}` }),
          ...(edu.location ? [new TextRun({ text: ` | ${edu.location}` })] : []),
        ],
        spacing: { before: index === 0 ? 0 : 200, after: 50 },
      })
    )

    if (dateRange || edu.grade) {
      const parts: string[] = []
      if (dateRange) parts.push(dateRange)
      if (edu.grade) parts.push(`Grade: ${edu.grade}`)

      paragraphs.push(
        new Paragraph({
          text: parts.join(' | '),
          spacing: { after: 150 },
        })
      )
    }
  })

  paragraphs.push(new Paragraph({ text: '', spacing: { after: 200 } }))
  return paragraphs
}

function createProjectsSection(resume: Resume): Paragraph[] {
  if (resume.projects.length === 0) return []

  const paragraphs: Paragraph[] = [
    new Paragraph({
      text: 'PROJECTS',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 150 },
      border: { bottom: { color: '000000', space: 1, style: BorderStyle.SINGLE, size: 6 } },
    }),
  ]

  resume.projects.forEach((project, index) => {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: project.name, bold: true }),
          ...(project.organization ? [new TextRun({ text: ` | ${project.organization}` })] : []),
        ],
        spacing: { before: index === 0 ? 0 : 250, after: 100 },
      }),
      new Paragraph({
        text: project.description,
        spacing: { after: 100 },
      })
    )

    if (project.technologies.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Technologies: ', italics: true }),
            new TextRun({ text: project.technologies.join(' · '), italics: true }),
          ],
          spacing: { after: 150 },
        })
      )
    }
  })

  paragraphs.push(new Paragraph({ text: '', spacing: { after: 200 } }))
  return paragraphs
}

function createCertificationsSection(resume: Resume): Paragraph[] {
  if (resume.certifications.length === 0) return []

  const paragraphs: Paragraph[] = [
    new Paragraph({
      text: 'CERTIFICATIONS',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 150 },
      border: { bottom: { color: '000000', space: 1, style: BorderStyle.SINGLE, size: 6 } },
    }),
  ]

  resume.certifications.forEach((cert, index) => {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: cert.name, bold: true }),
          new TextRun({ text: ` | ${cert.issuer}` }),
          ...(cert.issueDate ? [new TextRun({ text: ` | ${formatDate(cert.issueDate)}` })] : []),
        ],
        spacing: { before: index === 0 ? 0 : 100, after: 100 },
      })
    )
  })

  return paragraphs
}

export async function exportResumeToDocx(resume: Resume, filename = 'resume.docx'): Promise<void> {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.5),
              right: convertInchesToTwip(0.5),
              bottom: convertInchesToTwip(0.5),
              left: convertInchesToTwip(0.5),
            },
          },
        },
        children: [
          ...createContactInfo(resume),
          ...createSummarySection(resume),
          ...createExperienceSection(resume),
          ...createSkillsSection(resume),
          ...createEducationSection(resume),
          ...createProjectsSection(resume),
          ...createCertificationsSection(resume),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)

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
