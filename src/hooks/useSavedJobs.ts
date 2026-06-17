import { useCallback, useEffect, useState } from 'react'

const KEY = 'rays-saved-jobs'

function read(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function useSavedJobs() {
  const [saved, setSaved] = useState<string[]>(read)

  useEffect(() => {
    const onStorage = () => setSaved(read())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const persist = useCallback((next: string[]) => {
    setSaved(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }, [])

  const toggle = useCallback(
    (id: string) => {
      const next = saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id]
      persist(next)
    },
    [saved, persist],
  )

  const isSaved = useCallback((id: string) => saved.includes(id), [saved])

  return { saved, toggle, isSaved }
}
