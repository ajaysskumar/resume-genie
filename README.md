# Resume Builder — Milestone 1

A client-side React application for creating and previewing resumes in real-time. Built with Vite, TypeScript, Zustand, and Tailwind CSS.

## Features

### Completed ✅

- **Create Resumes**: Enter personal information, professional summary, and work experience
- **Personal Information**: Full name, headline, email, phone, location, LinkedIn, website
- **Professional Summary**: Rich text area with character count
- **Experience Management**: Add/edit/delete multiple work experiences
- **Experience Bullets**: Add/edit/delete achievements for each role
- **Live Preview**: A4-sized resume updates instantly as you type
- **ATS-Friendly Template**: Clean, single-column design optimized for parsing
- **Demo Resume**: Pre-filled data for immediate testing
- **Responsive Layout**: Two-panel editor/preview on desktop, stacked on mobile
- **Form Validation**: Basic validation with Zod (email format, date consistency)
- **Client-Side Only**: No backend, no database, no API calls — everything happens in the browser

### Out of Scope (Future Milestones)

- PDF/DOCX export
- Multiple templates
- Database persistence
- Authentication
- AI assistance

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Validation**: Zod
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Installation

```bash
git clone <repo-url>
cd resume-builder
npm install
npm run dev
```

The app opens at `http://localhost:5173/`

### Build

```bash
npm run build
```

### Tests

```bash
npm run test              # Run all tests
npm run test:ui          # Interactive dashboard
```

## Project Structure

```
src/
├── app/
│   └── App.tsx                          # Main app layout
├── features/resume/
│   ├── components/
│   │   ├── ResumeEditor.tsx
│   │   ├── PersonalInformationForm.tsx
│   │   ├── SummaryForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── ExperienceItem.tsx
│   │   └── ExperienceBullet.tsx
│   ├── preview/
│   │   ├── ResumePreview.tsx
│   │   ├── ResumePage.tsx               # A4 container
│   │   └── AtsResumeTemplate.tsx
│   ├── store/
│   │   └── resumeStore.ts               # Zustand state
│   ├── types/
│   │   └── resume.ts
│   └── validation/
│       └── resumeSchema.ts              # Zod schemas
├── components/ui/                       # Reusable components
├── lib/
│   └── utils.ts                         # Helpers
└── main.tsx
```

## Data Model

```typescript
interface Resume {
  personal: PersonalInformation
  summary: string
  experience: Experience[]
}

interface PersonalInformation {
  fullName: string
  headline: string
  email: string
  phone: string
  location: string
  linkedin?: string
  website?: string
}

interface Experience {
  id: string
  company: string
  position: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  bullets: ExperienceBullet[]
}

interface ExperienceBullet {
  id: string
  text: string
}
```

## State Management

Zustand store (`resumeStore`) holds the resume as the single source of truth.

### Actions

- `updatePersonal(field, value)` — Update personal info
- `updateSummary(text)` — Update summary
- `addExperience()` — Add new experience
- `updateExperience(id, field, value)` — Update experience
- `deleteExperience(id)` — Delete experience
- `addBullet(experienceId)` — Add bullet
- `updateBullet(experienceId, bulletId, text)` — Update bullet
- `deleteBullet(experienceId, bulletId)` — Delete bullet
- `loadDemoResume()` — Load demo data

## Validation

Zod schemas enforce:
- Required fields: fullName, headline, email, company, position, startDate
- Email format
- URL validation for LinkedIn/website
- Date consistency: endDate ≥ startDate
- Current employment: current=true implies endDate=null

## Layout

### Desktop (≥1200px)
Two-panel: Editor (left, 450px) | Preview (right, flex)

### Tablet (768px-1199px)
Reduced panel width

### Mobile (<768px)
Single panel, stacked

## Live Preview

Changes instantly propagate from editor → Zustand store → preview via React subscriptions.

## Architecture After M1

```
                    React Application
                           |
             +--------------+--------------+
             |                             |
             v                             v
       ResumeEditor                 ResumePreview
             |                             |
             v                             v
       Zustand Store                ATS Template
             |                             |
             +--------------+--------------+
                            |
                      Resume Model
                      (Types + Zod)
```

## Known Issues / Future Work

1. **Date input format**: Shows YYYY-MM but stores full date — use date picker in M2
2. **Accessibility**: Needs ARIA labels and focus management improvements
3. **Empty states**: Could be more visually polished
4. **Export**: PDF/DOCX planned for Milestone 3
5. **Auto-save**: Local persistence planned for Milestone 2

## Next Milestone (M2)

- Skills, education, certifications sections
- Section reordering (drag/drop)
- Template system abstraction
- Improved pagination for multi-page resumes
- Local storage persistence

## Milestone 3+

- Backend API (.NET)
- Database
- Authentication
- PDF/DOCX export
- AI assistance
- Job matching

---

**Status**: Milestone 1 Complete ✅  
**Dev Server**: http://localhost:5173/  
**Build Output**: dist/  
**Git Branch**: milestone/1  

