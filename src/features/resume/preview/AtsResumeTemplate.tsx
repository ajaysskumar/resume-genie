import type { Resume } from '../types/resume'
import { formatDate } from '@/lib/utils'

interface AtsResumeTemplateProps {
  resume: Resume
}

export function AtsResumeTemplate({ resume }: AtsResumeTemplateProps) {
  const { personal, summary, experience } = resume

  return (
    <div className="space-y-4 text-slate-900">
      {/* Header */}
      <div className="text-center border-b border-slate-300 pb-3">
        <h1 className="text-3xl font-bold">{personal.fullName || 'Your Name'}</h1>
        <p className="text-lg text-slate-600">{personal.headline || 'Your Headline'}</p>
        <div className="flex justify-center gap-2 text-sm text-slate-600 mt-2 flex-wrap">
          {personal.location && <span>{personal.location}</span>}
          {personal.email && (
            <>
              {personal.location && <span>•</span>}
              <span>{personal.email}</span>
            </>
          )}
          {personal.phone && (
            <>
              <span>•</span>
              <span>{personal.phone}</span>
            </>
          )}
          {personal.linkedin && (
            <>
              <span>•</span>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                LinkedIn
              </a>
            </>
          )}
          {personal.website && (
            <>
              <span>•</span>
              <a
                href={personal.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Website
              </a>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 className="text-xl font-bold border-b border-slate-300 pb-2 mb-2">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 className="text-xl font-bold border-b border-slate-300 pb-2 mb-3">
            EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <p className="text-sm text-slate-700">{exp.company}</p>
                  </div>
                  <div className="text-sm text-slate-600 text-right">
                    {formatDate(exp.startDate)}{' '}
                    {exp.current ? '– Present' : exp.endDate && `– ${formatDate(exp.endDate)}`}
                  </div>
                </div>
                {exp.location && (
                  <p className="text-sm text-slate-600">{exp.location}</p>
                )}
                {exp.bullets.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet.id} className="text-sm leading-relaxed ml-4">
                        <span className="mr-2">•</span>
                        {bullet.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
