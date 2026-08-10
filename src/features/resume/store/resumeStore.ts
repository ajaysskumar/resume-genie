import { create } from 'zustand'
import type { Resume, Experience, Skill, Education, Project, Certification } from '../types/resume'
import sampleResumeTemplate from '../data/sample-resume-template-1.json'
import { generateId } from '@/lib/utils'

interface ResumeStore {
  resume: Resume
  updatePersonal: (field: keyof Resume['personal'], value: string) => void
  updateSummary: (text: string) => void
  addExperience: () => void
  updateExperience: (id: string, field: keyof Experience, value: Experience[keyof Experience]) => void
  deleteExperience: (id: string) => void
  addBullet: (experienceId: string) => void
  updateBullet: (experienceId: string, bulletId: string, text: string) => void
  deleteBullet: (experienceId: string, bulletId: string) => void
  addSkill: () => void
  updateSkill: (id: string, field: keyof Skill, value: string | string[]) => void
  deleteSkill: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, field: keyof Education, value: string) => void
  deleteEducation: (id: string) => void
  addProject: () => void
  updateProject: (id: string, field: keyof Project, value: string | string[]) => void
  deleteProject: (id: string) => void
  addCertification: () => void
  updateCertification: (id: string, field: keyof Certification, value: string) => void
  deleteCertification: (id: string) => void
  setResume: (resume: Resume) => void
  loadDemoResume: () => void
}

const demoResume: Resume = sampleResumeTemplate

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
      resume: { ...state.resume, skills: [...state.resume.skills, { id: generateId(), category: '', skills: [''] }] },
    })),

  updateSkill: (id, field, value) =>
    set((state) => ({
      resume: { ...state.resume, skills: state.resume.skills.map((skill) => skill.id === id ? { ...skill, [field]: value } : skill) },
    })),

  deleteSkill: (id) =>
    set((state) => ({ resume: { ...state.resume, skills: state.resume.skills.filter((skill) => skill.id !== id) } })),

  addEducation: () =>
    set((state) => ({
      resume: { ...state.resume, education: [...state.resume.education, { id: generateId(), institution: '', degree: '', grade: '', location: '', startDate: '', endDate: '' }] },
    })),

  updateEducation: (id, field, value) =>
    set((state) => ({
      resume: { ...state.resume, education: state.resume.education.map((item) => item.id === id ? { ...item, [field]: value } : item) },
    })),

  deleteEducation: (id) =>
    set((state) => ({ resume: { ...state.resume, education: state.resume.education.filter((item) => item.id !== id) } })),

  addProject: () =>
    set((state) => ({
      resume: { ...state.resume, projects: [...state.resume.projects, { id: generateId(), name: '', organization: '', description: '', url: '', technologies: [] }] },
    })),

  updateProject: (id, field, value) =>
    set((state) => ({
      resume: { ...state.resume, projects: state.resume.projects.map((project) => project.id === id ? { ...project, [field]: value } : project) },
    })),

  deleteProject: (id) =>
    set((state) => ({ resume: { ...state.resume, projects: state.resume.projects.filter((project) => project.id !== id) } })),

  addCertification: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: [...state.resume.certifications, { id: generateId(), name: '', issuer: '', issueDate: '', url: '' }],
      },
    })),

  updateCertification: (id, field, value) =>
    set((state) => ({
      resume: { ...state.resume, certifications: state.resume.certifications.map((item) => item.id === id ? { ...item, [field]: value } : item) },
    })),

  deleteCertification: (id) =>
    set((state) => ({ resume: { ...state.resume, certifications: state.resume.certifications.filter((item) => item.id !== id) } })),

  setResume: (resume) =>
    set(() => ({
      resume,
    })),

  loadDemoResume: () =>
    set(() => ({
      resume: demoResume,
    })),
}))
