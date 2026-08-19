import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'
import { ResumeAdditionalSections } from './ResumeAdditionalSections'
import { ResumeContactLine } from './ResumeContactLine'
import { FormattedText } from './FormattedText'

interface AtsResumeTemplateProps {
  resume: Resume
}

export function AtsResumeTemplate({ resume }: AtsResumeTemplateProps) {
  const { personal, summary, experience } = resume

  return (
    <div className="space-y-5 text-slate-900">
      {/* Header */}
      <div className="text-center border-b-2 border-slate-900 pb-4">
        <h1 className="text-4xl font-bold tracking-tight mb-1"><FormattedText>{personal.fullName || 'Your Name'}</FormattedText></h1>
        <p className="text-base font-semibold text-slate-700 mb-3"><FormattedText>{personal.headline || 'Your Headline'}</FormattedText></p>
        <ResumeContactLine personal={personal} separator=" • " className="flex flex-wrap justify-center gap-x-2 text-xs text-slate-600" />
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-900 pb-2 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed whitespace-pre-wrap text-slate-800"><FormattedText>{summary}</FormattedText></p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-900 pb-2 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold"><FormattedText>{exp.position}</FormattedText></h3>
                    <p className="font-semibold text-slate-700"><FormattedText>{exp.company}</FormattedText></p>
                  </div>
                  <div className="text-slate-600 text-right whitespace-nowrap ml-2">
                    {formatDate(exp.startDate)}{' '}
                    {exp.current ? '– Present' : exp.endDate && `– ${formatDate(exp.endDate)}`}
                  </div>
                </div>
                {exp.location && (
                  <p className="text-slate-600 mt-0.5">{exp.location}</p>
                )}
                {exp.bullets.length > 0 && (
                  <ul className="mt-1.5 space-y-1">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet.id} className="leading-relaxed">
                        <span className="mr-2">•</span>
                        <FormattedText>{bullet.text}</FormattedText>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <ResumeAdditionalSections resume={resume} variant="classic" />
    </div>
  )
}
