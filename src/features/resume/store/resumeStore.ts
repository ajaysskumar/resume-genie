import { create } from 'zustand'
import type { Resume, Experience } from '../types/resume'
import { generateId } from '@/lib/utils'

interface ResumeStore {
  resume: Resume
  updatePersonal: (field: keyof Resume['personal'], value: string) => void
  updateSummary: (text: string) => void
  addExperience: () => void
  updateExperience: (id: string, field: keyof Experience, value: any) => void
  deleteExperience: (id: string) => void
  addBullet: (experienceId: string) => void
  updateBullet: (experienceId: string, bulletId: string, text: string) => void
  deleteBullet: (experienceId: string, bulletId: string) => void
  setResume: (resume: Resume) => void
  loadDemoResume: () => void
}

const demoResume: Resume = {
  personal: {
    fullName: 'Maya Sharma',
    headline: 'Senior Product Designer',
    email: 'maya.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    profileImage: '',
    linkedin: 'https://linkedin.com/in/mayasharma',
    website: 'https://mayasharma.dev',
  },
  summary:
    'Senior product designer with 7+ years of experience turning complex workflows into simple, accessible products. Skilled at connecting customer insight, visual systems, and business goals to ship thoughtful experiences that people enjoy using.',
  experience: [
    {
      id: generateId(),
      company: 'Northstar Labs',
      position: 'Senior Product Designer',
      location: 'Bengaluru, India',
      startDate: '2023-04',
      endDate: '',
      current: true,
      bullets: [
        {
          id: generateId(),
          text: 'Led the redesign of the customer dashboard, improving task completion by 28% across three key workflows',
        },
        {
          id: generateId(),
          text: 'Built a shared design system used by four product teams, reducing duplicate UI work and speeding up delivery',
        },
        {
          id: generateId(),
          text: 'Partnered with research and engineering to turn customer interviews into a clearer onboarding experience',
        },
      ],
    },
    {
      id: generateId(),
      company: 'Brightside Technologies',
      position: 'Product Designer',
      location: 'Pune, India',
      startDate: '2020-07',
      endDate: '2023-03',
      current: false,
      bullets: [
        {
          id: generateId(),
          text: 'Created end-to-end flows for a B2B analytics platform used by more than 20,000 monthly users',
        },
        {
          id: generateId(),
          text: 'Introduced usability testing into the product cycle and helped resolve the top five customer pain points',
        },
      ],
    },
  ],
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: demoResume,

  updatePersonal: (field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personal: {
          ...state.resume.personal,
          [field]: value,
        },
      },
    })),

  updateSummary: (text) =>
    set((state) => ({
      resume: {
        ...state.resume,
        summary: text,
      },
    })),

  addExperience: () =>
    set((state) => {
      const newExperience: Experience = {
        id: generateId(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        bullets: [],
      }
      return {
        resume: {
          ...state.resume,
          experience: [...state.resume.experience, newExperience],
        },
      }
    }),

  updateExperience: (id, field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        ),
      },
    })),

  deleteExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((exp) => exp.id !== id),
      },
    })),

  addBullet: (experienceId) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((exp) =>
          exp.id === experienceId
            ? {
                ...exp,
                bullets: [...exp.bullets, { id: generateId(), text: '' }],
              }
            : exp
        ),
      },
    })),

  updateBullet: (experienceId, bulletId, text) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((exp) =>
          exp.id === experienceId
            ? {
                ...exp,
                bullets: exp.bullets.map((bullet) =>
                  bullet.id === bulletId ? { ...bullet, text } : bullet
                ),
              }
            : exp
        ),
      },
    })),

  deleteBullet: (experienceId, bulletId) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((exp) =>
          exp.id === experienceId
            ? {
                ...exp,
                bullets: exp.bullets.filter((bullet) => bullet.id !== bulletId),
              }
            : exp
        ),
      },
    })),

  setResume: (resume) =>
    set(() => ({
      resume,
    })),

  loadDemoResume: () =>
    set(() => ({
      resume: demoResume,
    })),
}))
