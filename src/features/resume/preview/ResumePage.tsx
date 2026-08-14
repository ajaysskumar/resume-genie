import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface ResumePageProps {
  children: ReactNode
}

const pageContentClassName = 'resume-page-content bg-white shadow-2xl rounded-lg p-10 font-[Arial,sans-serif] text-[11pt] leading-relaxed'
const pageContentStyle = { boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }
const pageTopGap = 24
const pageBottomGap = 16

interface ResumePageRange {
  start: number
  end: number
  viewportHeight: number
}

export function ResumePage({ children }: ResumePageProps) {
  const pageFrameRef = useRef<HTMLDivElement>(null)
  const sourceRef = useRef<HTMLDivElement>(null)
  const [pageRanges, setPageRanges] = useState<ResumePageRange[]>([{ start: 0, end: 0, viewportHeight: 0 }])
  const [pageIndex, setPageIndex] = useState(0)

  useLayoutEffect(() => {
    let animationFrame = 0

    const updatePagination = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        const pageFrame = pageFrameRef.current
        const source = sourceRef.current
        if (!pageFrame || !source) return

        const nextPageHeight = Math.max(1, pageFrame.clientHeight - pageBottomGap)
        const contentHeight = source.getBoundingClientRect().height
        const contentBottom = getContentBottom(source, contentHeight)
        if (nextPageHeight <= 0 || contentBottom <= 0) return

        const nextPageRanges: ResumePageRange[] = []
        let pageStart = 0
        while (pageStart < contentBottom) {
          const pageOffset = pageStart === 0 ? 0 : pageStart - pageTopGap
          const maxPageEnd = Math.min(contentBottom, pageOffset + nextPageHeight)
          if (contentBottom <= maxPageEnd) {
            nextPageRanges.push({ start: pageStart, end: contentBottom, viewportHeight: Math.max(1, contentBottom - pageOffset) })
            break
          }

          const nextPageEnd = findBreakPoint(source, pageStart, maxPageEnd)
          if (nextPageEnd <= pageStart) {
            nextPageRanges.push({ start: pageStart, end: maxPageEnd, viewportHeight: Math.max(1, maxPageEnd - pageOffset) })
            pageStart = maxPageEnd
            continue
          }

          nextPageRanges.push({ start: pageStart, end: nextPageEnd, viewportHeight: Math.max(1, nextPageEnd - pageOffset) })
          pageStart = nextPageEnd
        }

        const normalizedPageRanges = nextPageRanges.length > 0 ? nextPageRanges : [{ start: 0, end: contentBottom, viewportHeight: Math.min(nextPageHeight, contentBottom) }]
        setPageRanges(normalizedPageRanges)
        setPageIndex((currentIndex) => Math.min(currentIndex, normalizedPageRanges.length - 1))
      })
    }

    const observer = new ResizeObserver(updatePagination)
    if (pageFrameRef.current) observer.observe(pageFrameRef.current)
    if (sourceRef.current) observer.observe(sourceRef.current)

    updatePagination()
    window.addEventListener('resize', updatePagination)
    const fontsReady = document.fonts?.ready
    if (fontsReady) void fontsReady.then(updatePagination)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
      window.removeEventListener('resize', updatePagination)
    }
  }, [children])

  const currentPage = pageRanges[pageIndex] ?? pageRanges[0]
  const pageOffset = currentPage.start

  return (
    <>
      <div className="resume-paginator print:hidden">
        <div className="flex items-center justify-center gap-2 pb-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0"
            onClick={() => setPageIndex((currentIndex) => Math.max(0, currentIndex - 1))}
            disabled={pageIndex === 0}
            aria-label="Show previous resume page"
            title="Show previous resume page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-24 text-center text-xs font-semibold text-slate-600" aria-live="polite">
            Page {pageIndex + 1} of {pageRanges.length}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0"
            onClick={() => setPageIndex((currentIndex) => Math.min(pageRanges.length - 1, currentIndex + 1))}
            disabled={pageIndex >= pageRanges.length - 1}
            aria-label="Show next resume page"
            title="Show next resume page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex min-w-max justify-center py-5">
          <div ref={pageFrameRef} className="resume-page-frame">
            <div className="resume-page-viewport" style={{ height: `${currentPage.viewportHeight}px` }}>
              {currentPage.start > 0 ? (
                <div className="resume-continuation-window">
                  <div className={pageContentClassName} style={{ ...pageContentStyle, transform: `translate3d(0, -${pageOffset}px, 0)` }}>
                    {children}
                  </div>
                </div>
              ) : (
                <div className={pageContentClassName} style={{ ...pageContentStyle, transform: `translate3d(0, -${pageOffset}px, 0)` }}>
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div id="resume-page" className="resume-print-pages" aria-hidden="true">
        {pageRanges.map((page, printPageIndex) => (
          <div key={printPageIndex} className="resume-print-page">
            <div className="resume-page-viewport" style={{ height: `${page.viewportHeight}px` }}>
              {page.start > 0 ? (
                <div className="resume-continuation-window">
                  <div className={pageContentClassName} style={{ ...pageContentStyle, transform: `translate3d(0, -${page.start}px, 0)` }}>
                    {children}
                  </div>
                </div>
              ) : (
                <div className={pageContentClassName} style={{ ...pageContentStyle, transform: 'translate3d(0, 0, 0)' }}>
                  {children}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="resume-measurement" aria-hidden="true">
        <div ref={sourceRef} id="resume-source" className={pageContentClassName} style={pageContentStyle}>
          {children}
        </div>
      </div>
    </>
  )
}

function getContentBottom(source: HTMLDivElement, fallback: number) {
  const textElements = [...source.querySelectorAll('*')].filter((element) => element.textContent?.trim())
  return textElements.reduce((bottom, element) => Math.max(bottom, element.getBoundingClientRect().bottom), 0) || fallback
}

function findBreakPoint(source: HTMLDivElement, pageStart: number, maxPageEnd: number) {
  const candidates = [...source.querySelectorAll('header, h1, h2, h3, h4, h5, p, li, time')]
  const breakPoints = candidates
    .map((element) => element.getBoundingClientRect().bottom)
    .filter((bottom) => bottom > pageStart + 1 && bottom <= maxPageEnd)

  return breakPoints.length > 0 ? Math.max(...breakPoints) : maxPageEnd
}
