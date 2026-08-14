export async function exportResumeToPdf(
  elementId = 'resume-page',
  filename = 'resume.pdf'
): Promise<void> {
  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error('Resume preview is not available for export.')
  }

  void filename
  window.print()
}
