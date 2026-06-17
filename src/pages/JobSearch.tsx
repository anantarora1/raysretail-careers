import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import JobCard from '../components/JobCard'
import Filters, { type FilterState } from '../components/Filters'
import { JOBS, type Job, type JobType, type WorkMode } from '../data/jobs'
import { useSavedJobs } from '../hooks/useSavedJobs'
import { SearchIcon, PinIcon, XIcon } from '../components/Icons'

type SortKey = 'newest' | 'pay-high' | 'pay-low'

function annualize(job: Job) {
  const mid = (job.payMin + job.payMax) / 2
  return job.payUnit === 'hour' ? mid * 2080 : mid
}

const PAGE = 9

export default function JobSearch() {
  const [params, setParams] = useSearchParams()
  const { saved } = useSavedJobs()
  const [sort, setSort] = useState<SortKey>('newest')
  const [visible, setVisible] = useState(PAGE)
  const [mobileFilters, setMobileFilters] = useState(false)

  const q = params.get('q') ?? ''
  const loc = params.get('loc') ?? ''
  const onlySaved = params.get('saved') === '1'

  const filters: FilterState = {
    category: params.get('category') ?? '',
    state: params.get('state') ?? '',
    types: (params.getAll('type') as JobType[]) ?? [],
    modes: (params.getAll('mode') as WorkMode[]) ?? [],
  }

  const update = (next: Partial<Record<string, string | string[] | null>>) => {
    const sp = new URLSearchParams(params)
    for (const [k, v] of Object.entries(next)) {
      sp.delete(k)
      if (Array.isArray(v)) v.forEach((item) => sp.append(k, item))
      else if (v) sp.set(k, v)
    }
    setParams(sp, { replace: true })
    setVisible(PAGE)
  }

  const onFilterChange = (next: FilterState) =>
    update({
      category: next.category || null,
      state: next.state || null,
      type: next.types,
      mode: next.modes,
    })

  const clearAll = () => {
    setParams(new URLSearchParams(), { replace: true })
    setVisible(PAGE)
  }

  const results = useMemo(() => {
    const ql = q.toLowerCase().trim()
    const locl = loc.toLowerCase().trim()

    const filtered = JOBS.filter((job) => {
      if (onlySaved && !saved.includes(job.id)) return false
      if (filters.category && job.category !== filters.category) return false
      if (filters.state && job.state !== filters.state) return false
      if (filters.types.length && !filters.types.includes(job.type)) return false
      if (filters.modes.length && !filters.modes.includes(job.mode)) return false

      if (ql) {
        const hay = `${job.title} ${job.category} ${job.department} ${job.summary}`.toLowerCase()
        if (!hay.includes(ql)) return false
      }
      if (locl) {
        const hay = `${job.city} ${job.state} ${job.mode}`.toLowerCase()
        const remoteMatch = locl.includes('remote') && job.mode === 'Remote'
        if (!hay.includes(locl) && !remoteMatch) return false
      }
      return true
    })

    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'newest') return a.postedDaysAgo - b.postedDaysAgo
      if (sort === 'pay-high') return annualize(b) - annualize(a)
      return annualize(a) - annualize(b)
    })
    return sorted
  }, [q, loc, onlySaved, saved, filters.category, filters.state, filters.types, filters.modes, sort])

  return (
    <div className="container-x py-10">
      {/* Top search */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {onlySaved ? 'Your saved jobs' : 'Find your role'}
        </h1>
        <p className="mt-2 text-ink-500 dark:text-ink-400">
          {onlySaved
            ? 'Roles you’ve bookmarked. Saved on this device.'
            : 'Search thousands of openings across stores, distribution centers, and the home office.'}
        </p>

        {!onlySaved && (
          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <div className="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 dark:border-ink-700 dark:bg-ink-900">
              <SearchIcon className="text-lg text-brand-500" />
              <input
                value={q}
                onChange={(e) => update({ q: e.target.value || null })}
                placeholder="Title, keyword, category"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder-ink-400"
              />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 dark:border-ink-700 dark:bg-ink-900">
              <PinIcon className="text-lg text-brand-500" />
              <input
                value={loc}
                onChange={(e) => update({ loc: e.target.value || null })}
                placeholder="City, state, or remote"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder-ink-400"
              />
            </div>
            <button
              onClick={() => setMobileFilters(true)}
              className="btn-ghost btn-md lg:hidden"
            >
              Filters
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar (desktop) */}
        {!onlySaved && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Filters value={filters} onChange={onFilterChange} onClear={clearAll} />
            </div>
          </aside>
        )}

        {/* Results */}
        <div className={onlySaved ? 'lg:col-span-2' : ''}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-ink-600 dark:text-ink-300">
              {results.length} {results.length === 1 ? 'job' : 'jobs'} found
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-ink-500 dark:text-ink-400">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium outline-none dark:border-ink-700 dark:bg-ink-900"
              >
                <option value="newest">Newest</option>
                <option value="pay-high">Pay: high to low</option>
                <option value="pay-low">Pay: low to high</option>
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="card grid place-items-center p-16 text-center">
              <p className="font-display text-xl font-bold">No jobs match your search</p>
              <p className="mt-2 max-w-sm text-sm text-ink-500 dark:text-ink-400">
                {onlySaved
                  ? 'You haven’t saved any jobs yet. Tap the bookmark on any role to save it here.'
                  : 'Try removing a filter or broadening your search terms.'}
              </p>
              {!onlySaved && (
                <button onClick={clearAll} className="btn-primary btn-md mt-6">
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.slice(0, visible).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              {visible < results.length && (
                <div className="mt-10 text-center">
                  <button onClick={() => setVisible((v) => v + PAGE)} className="btn-ghost btn-lg">
                    Load more jobs
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilters && !onlySaved && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilters(false)} />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto bg-white p-4 dark:bg-ink-950">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Filters</h2>
              <button onClick={() => setMobileFilters(false)} className="rounded-full p-2 hover:bg-ink-100 dark:hover:bg-ink-800">
                <XIcon className="text-xl" />
              </button>
            </div>
            <Filters value={filters} onChange={onFilterChange} onClear={clearAll} />
            <button onClick={() => setMobileFilters(false)} className="btn-primary btn-lg mt-4 w-full">
              Show {results.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
