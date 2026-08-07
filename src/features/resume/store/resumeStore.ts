import { create } from 'zustand'
import { Resume, Experience, ExperienceBullet } from '../types/resume'
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

const initialResume: Resume = {
  personal: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  experience: [],
}

const demoResume: Resume = {
  personal: {
    fullName: 'Ajay Kumar',
    headline: 'Lead Software Consultant',
    email: 'ajay@example.com',
    phone: '+91 9876543210',
    location: 'India',
    linkedin: 'https://linkedin.com/in/ajaykumar',
    website: 'https://ajaykumar.dev',
  },
  summary:
    'Experienced lead software consultant with 10+ years of expertise in building scalable systems, leading high-performance teams, and delivering transformative digital solutions. Specialized in cloud architecture, microservices, and full-stack development.',
  experience: [
    {
      id: generateId(),
      company: 'THOUT',
      position: 'Lead Consultant',
      location: 'Remote',
      startDate: '2025-08-01',
      endDate: '',
      current: true,
      bullets: [
        {
          id: generateId(),
          text: 'Designed and architected scalable microservices platform serving 1M+ requests daily',
        },
        {
          id: generateId(),
          text: 'Led cross-functional team of 8 engineers, mentoring junior developers and establishing best practices',
        },
        {
          id: generateId(),
          text: 'Reduced infrastructure costs by 40% through optimization and migration to cloud-native solutions',
        },
      ],
    },
    {
      id: generateId(),
      company: 'TechCorp',
      position: 'Senior Software Engineer',
      location: 'Remote',
      startDate: '2021-06-01',
      endDate: '2025-07-31',
      current: false,
      bullets: [
        {
          id: generateId(),
          text: 'Implemented comprehensive testing strategy increasing code coverage from 45% to 89%',
        },
        {
          id: generateId(),
          text: 'Delivered 15+ production features across React and Node.js stack',
        },
      ],
    },
  ],
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,

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
