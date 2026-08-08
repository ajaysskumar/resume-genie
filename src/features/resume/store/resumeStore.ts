import { create } from 'zustand'
import type { Resume, Experience, Skill, Education, Project } from '../types/resume'
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
  addSkill: () => void
  updateSkill: (id: string, field: keyof Skill, value: string) => void
  deleteSkill: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, field: keyof Education, value: string) => void
  deleteEducation: (id: string) => void
  addProject: () => void
  updateProject: (id: string, field: keyof Project, value: string | string[]) => void
  deleteProject: (id: string) => void
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
  skills: [
    { id: generateId(), name: 'Product Strategy', level: 'Expert' },
    { id: generateId(), name: 'Interaction Design', level: 'Expert' },
    { id: generateId(), name: 'Design Systems', level: 'Advanced' },
    { id: generateId(), name: 'User Research', level: 'Advanced' },
    { id: generateId(), name: 'Figma', level: 'Expert' },
    { id: generateId(), name: 'Prototyping', level: 'Advanced' },
  ],
  education: [
    {
      id: generateId(),
      institution: 'National Institute of Design',
      degree: 'Bachelor of Design, Communication Design',
      location: 'Ahmedabad, India',
      startDate: '2016-07',
      endDate: '2020-05',
    },
  ],
  projects: [
    {
      id: generateId(),
      name: 'Northstar Design System',
      description: 'A scalable component library and contribution model that helps product teams ship consistent, accessible workflows.',
      url: 'https://mayasharma.dev/northstar',
      technologies: ['Figma', 'Storybook', 'Accessibility'],
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

  addSkill: () =>
    set((state) => ({
      resume: { ...state.resume, skills: [...state.resume.skills, { id: generateId(), name: '', level: '' }] },
    })),

  updateSkill: (id, field, value) =>
    set((state) => ({
      resume: { ...state.resume, skills: state.resume.skills.map((skill) => skill.id === id ? { ...skill, [field]: value } : skill) },
    })),

  deleteSkill: (id) =>
    set((state) => ({ resume: { ...state.resume, skills: state.resume.skills.filter((skill) => skill.id !== id) } })),

  addEducation: () =>
    set((state) => ({
      resume: { ...state.resume, education: [...state.resume.education, { id: generateId(), institution: '', degree: '', location: '', startDate: '', endDate: '' }] },
    })),

  updateEducation: (id, field, value) =>
    set((state) => ({
      resume: { ...state.resume, education: state.resume.education.map((item) => item.id === id ? { ...item, [field]: value } : item) },
    })),

  deleteEducation: (id) =>
    set((state) => ({ resume: { ...state.resume, education: state.resume.education.filter((item) => item.id !== id) } })),

  addProject: () =>
    set((state) => ({
      resume: { ...state.resume, projects: [...state.resume.projects, { id: generateId(), name: '', description: '', url: '', technologies: [] }] },
    })),

  updateProject: (id, field, value) =>
    set((state) => ({
      resume: { ...state.resume, projects: state.resume.projects.map((project) => project.id === id ? { ...project, [field]: value } : project) },
    })),

  deleteProject: (id) =>
    set((state) => ({ resume: { ...state.resume, projects: state.resume.projects.filter((project) => project.id !== id) } })),

  setResume: (resume) =>
    set(() => ({
      resume,
    })),

  loadDemoResume: () =>
    set(() => ({
      resume: demoResume,
    })),
}))
