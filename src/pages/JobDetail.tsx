import { Link, useParams } from 'react-router-dom'
import { BENEFITS_NOTE, JOBS, getJobBySlug } from '../data/jobs'
import { formatLocation, formatPay, formatPosted } from '../lib/format'
import { useSavedJobs } from '../hooks/useSavedJobs'
import JobCard from '../components/JobCard'
import NotFound from './NotFound'
import {
  ArrowRightIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  BriefcaseIcon,
  CheckIcon,
  ClockIcon,
  PinIcon,
} from '../components/Icons'

export default function JobDetail() {
  const { slug } = useParams()
  const job = slug ? getJobBySlug(slug) : undefined
  const { isSaved, toggle } = useSavedJobs()

  if (!job) return <NotFound />
  const saved = isSaved(job.id)

  const related = JOBS.filter((j) => j.category === job.category && j.id !== job.id).slice(0, 3)

  const meta = [
    { icon: PinIcon, label: formatLocation(job) },
    { icon: BriefcaseIcon, label: `${job.type} · ${job.mode}` },
    { icon: ClockIcon, label: `Posted ${formatPosted(job.postedDaysAgo).toLowerCase()}` },
  ]

  return (
    <div className="container-x py-10">
      <Link to="/jobs" className="text-sm font-semibold text-brand-600 hover:underline">
        ← Back to all jobs
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main */}
        <div>
          <span className="chip bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            {job.category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {job.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-500 dark:text-ink-400">
            {meta.map((m) => (
              <span key={m.label} className="inline-flex items-center gap-1.5">
                <m.icon className="text-base text-brand-500" />
                {m.label}
              </span>
            ))}
          </div>

          <div className="card mt-8 p-7">
            <h2 className="font-display text-xl font-bold">About the role</h2>
            <p className="mt-3 leading-relaxed text-ink-600 dark:text-ink-300">{job.summary}</p>

            <h3 className="mt-7 font-display text-lg font-bold">What you’ll do</h3>
            <ul className="mt-3 space-y-2.5">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-ink-600 dark:text-ink-300">
                  <CheckIcon className="mt-1 shrink-0 text-brand-500" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-7 font-display text-lg font-bold">What you’ll bring</h3>
            <ul className="mt-3 space-y-2.5">
              {job.qualifications.map((qf) => (
                <li key={qf} className="flex gap-3 text-ink-600 dark:text-ink-300">
                  <CheckIcon className="mt-1 shrink-0 text-leaf-500" />
                  <span>{qf}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-xl bg-brand-50 p-5 dark:bg-brand-500/10">
              <h3 className="font-display text-base font-bold text-brand-800 dark:text-brand-300">
                Benefits & perks
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                {BENEFITS_NOTE}{' '}
                <Link to="/benefits" className="font-semibold text-brand-600 hover:underline">
                  See all benefits →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Sticky apply card */}
        <aside>
          <div className="sticky top-24 space-y-4">
            <div className="card p-6">
              <p className="text-sm text-ink-500 dark:text-ink-400">Estimated pay</p>
              <p className="font-display text-2xl font-extrabold text-ink-900 dark:text-white">
                {formatPay(job)}
              </p>
              <p className="mt-1 text-xs text-ink-400">
                Actual pay varies by experience and location.
              </p>

              <Link to={`/jobs/${job.slug}/apply`} className="btn-primary btn-lg mt-5 w-full">
                Apply now <ArrowRightIcon />
              </Link>
              <button
                onClick={() => toggle(job.id)}
                className="btn-ghost btn-md mt-3 w-full"
              >
                {saved ? <BookmarkFilledIcon className="text-brand-500" /> : <BookmarkIcon />}
                {saved ? 'Saved' : 'Save job'}
              </button>

              <dl className="mt-6 space-y-3 border-t border-ink-100 pt-5 text-sm dark:border-ink-800">
                <div className="flex justify-between">
                  <dt className="text-ink-500 dark:text-ink-400">Department</dt>
                  <dd className="font-semibold">{job.department}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500 dark:text-ink-400">Job ID</dt>
                  <dd className="font-semibold">RR-{job.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500 dark:text-ink-400">Work type</dt>
                  <dd className="font-semibold">{job.type}</dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Similar roles</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <JobCard key={r.id} job={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
