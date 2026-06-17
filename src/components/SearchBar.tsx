import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PinIcon, SearchIcon } from './Icons'

export default function SearchBar({ size = 'lg' }: { size?: 'lg' | 'md' }) {
  const [q, setQ] = useState('')
  const [loc, setLoc] = useState('')
  const navigate = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set('q', q.trim())
    if (loc.trim()) params.set('loc', loc.trim())
    navigate(`/jobs?${params.toString()}`)
  }

  const pad = size === 'lg' ? 'py-4' : 'py-3'

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 rounded-2xl border border-ink-200 bg-white p-2 shadow-soft dark:border-ink-700 dark:bg-ink-900 sm:flex-row sm:items-center sm:rounded-full"
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <SearchIcon className="shrink-0 text-xl text-brand-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Job title, keyword, or category"
          className={`w-full bg-transparent ${pad} text-sm outline-none placeholder-ink-400`}
        />
      </div>
      <div className="hidden w-px self-stretch bg-ink-200 dark:bg-ink-700 sm:block" />
      <div className="flex flex-1 items-center gap-2 px-3">
        <PinIcon className="shrink-0 text-xl text-brand-500" />
        <input
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          placeholder="City, state, or “remote”"
          className={`w-full bg-transparent ${pad} text-sm outline-none placeholder-ink-400`}
        />
      </div>
      <button type="submit" className="btn-primary btn-lg sm:px-8">
        Search
      </button>
    </form>
  )
}
