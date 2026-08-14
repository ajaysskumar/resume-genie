import type { Resume } from '../types/resume'
import { resumeSchema } from '../validation/resumeSchema'

export const RESUME_DRAFT_STORAGE_KEY = 'resume-builder-draft-v1'

const DATABASE_NAME = 'resume-builder-db'
const DATABASE_VERSION = 1
const OBJECT_STORE_NAME = 'key-value'

let databasePromise: Promise<IDBDatabase> | null = null

function openDatabase(): Promise<IDBDatabase> {
  if (databasePromise) return databasePromise

  databasePromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not available'))
      return
    }

    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)

    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        database.createObjectStore(OBJECT_STORE_NAME)
      }
    }

    request.onsuccess = () => {
      const database = request.result
      database.onversionchange = () => database.close()
      resolve(database)
    }

    request.onerror = () => reject(request.error ?? new Error('Unable to open IndexedDB'))
  })

  return databasePromise
}

function getStoredDraft(): Promise<unknown> {
  return openDatabase().then(
    (database) =>
      new Promise((resolve, reject) => {
        const transaction = database.transaction(OBJECT_STORE_NAME, 'readonly')
        const request = transaction.objectStore(OBJECT_STORE_NAME).get(RESUME_DRAFT_STORAGE_KEY)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error ?? new Error('Unable to read the resume draft'))
      })
  )
}

function parseStoredDraft(storedDraft: unknown): Resume | null {
  if (storedDraft === undefined || storedDraft === null) return null

  let draftValue = storedDraft
  if (typeof storedDraft === 'string') {
    if (!storedDraft.trim()) return null
    draftValue = JSON.parse(storedDraft)
  }

  const parsedDraft = resumeSchema.safeParse(draftValue)
  if (parsedDraft.success) return parsedDraft.data as Resume

  console.warn('Saved resume draft failed validation; loading the demo resume instead.', parsedDraft.error.issues)
  return null
}

function getLegacyDraft(): Resume | null {
  try {
    if (typeof localStorage === 'undefined') return null
    return parseStoredDraft(localStorage.getItem(RESUME_DRAFT_STORAGE_KEY))
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.warn('Saved resume draft is not valid JSON; loading the demo resume instead.')
    }
    return null
  }
}

async function migrateLegacyDraft(): Promise<Resume | null> {
  const legacyDraft = getLegacyDraft()
  if (!legacyDraft) return null

  await writeDraft(legacyDraft)
  localStorage.removeItem(RESUME_DRAFT_STORAGE_KEY)
  return legacyDraft
}

export async function readDraft(): Promise<Resume | null> {
  try {
    const storedDraft = await getStoredDraft()
    if (storedDraft !== undefined) return parseStoredDraft(storedDraft)
    return migrateLegacyDraft()
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.warn('Saved resume draft is not valid JSON; loading the demo resume instead.')
    } else {
      console.warn('Unable to read the saved resume draft from IndexedDB.', error)
    }
    return null
  }
}

export async function hasDraft(): Promise<boolean> {
  const storedDraft = await getStoredDraft()
  if (storedDraft !== undefined) return true
  return (await migrateLegacyDraft()) !== null
}

export async function writeDraft(resume: Resume): Promise<void> {
  const database = await openDatabase()

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(OBJECT_STORE_NAME, 'readwrite')
    const request = transaction.objectStore(OBJECT_STORE_NAME).put(resume, RESUME_DRAFT_STORAGE_KEY)

    transaction.oncomplete = () => resolve()
    transaction.onabort = () => reject(transaction.error ?? new Error('Unable to save the resume draft'))
    transaction.onerror = () => reject(transaction.error ?? new Error('Unable to save the resume draft'))
    request.onerror = () => reject(request.error ?? new Error('Unable to save the resume draft'))
  })
}