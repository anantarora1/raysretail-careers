import { Link } from 'react-router-dom'
import type { Job } from '../data/jobs'
import { formatLocation, formatPay, formatPosted } from '../lib/format'
import { useSavedJobs } from '../hooks/useSavedJobs'
import { BookmarkFilledIcon, BookmarkIcon, ClockIcon, PinIcon } from './Icons'

const modeStyles: Record<Job['mode'], string> = {
  Remote: 'bg-leaf-500/10 text-leaf-700 dark:text-leaf-400',
  Hybrid: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  'On-site': 'bg-ink-500/10 text-ink-600 dark:text-ink-300',
}

export default function JobCard({ job }: { job: Job }) {
  const { isSaved, toggle } = useSavedJobs()
  const saved = isSaved(job.id)

  return (
    <div className="card group relative flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-glow dark:hover:border-brand-500/60">
      <button
        onClick={() => toggle(job.id)}
        className={`absolute right-4 top-4 rounded-full p-1.5 transition ${
          saved ? 'text-brand-500' : 'text-ink-300 hover:text-brand-500 dark:text-ink-600'
        }`}
        aria-label={saved ? 'Remove from saved' : 'Save job'}
      >
        {saved ? <BookmarkFilledIcon className="text-xl" /> : <BookmarkIcon className="text-xl" />}
      </button>

      <div className="flex items-center gap-2">
        <span className="chip bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          {job.category}
        </span>
      </div>

      <Link to={`/jobs/${job.slug}`} className="mt-3 pr-6">
        <h3 className="font-display text-lg font-bold leading-snug text-ink-900 transition group-hover:text-brand-600 dark:text-white">
          {job.title}
        </h3>
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-500 dark:text-ink-400">
        <span className="inline-flex items-center gap-1.5">
          <PinIcon className="text-base text-brand-500" />
          {formatLocation(job)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon className="text-base text-brand-500" />
          {formatPosted(job.postedDaysAgo)}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
        {job.summary}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4 dark:border-ink-800">
        <div className="flex items-center gap-2">
          <span className={`chip ${modeStyles[job.mode]}`}>{job.mode}</span>
          <span className="chip bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300">
            {job.type}
          </span>
        </div>
        <span className="text-sm font-bold text-ink-900 dark:text-white">{formatPay(job)}</span>
      </div>
    </div>
  )
}
