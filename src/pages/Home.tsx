import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import JobCard from '../components/JobCard'
import { JOBS, CATEGORIES } from '../data/jobs'
import {
  ArrowRightIcon,
  GrowthIcon,
  HeartIcon,
  ShieldIcon,
  SparkIcon,
} from '../components/Icons'

const STATS = [
  { value: '180k+', label: 'Associates nationwide' },
  { value: '2,100+', label: 'Stores & DCs' },
  { value: '46', label: 'States hiring now' },
  { value: '70%', label: 'Leaders promoted from within' },
]

const VALUES = [
  {
    icon: GrowthIcon,
    title: 'Grow without limits',
    body: 'Most of our store and DC leaders started on the floor. Clear paths, real mentorship, and tuition support move you forward.',
  },
  {
    icon: HeartIcon,
    title: 'Care that shows up',
    body: 'Day-one benefits, mental health support, and paid parental leave — because building a career shouldn’t cost your wellbeing.',
  },
  {
    icon: ShieldIcon,
    title: 'Safety first, always',
    body: 'A culture where everyone goes home safe. We invest in training, equipment, and the time to do things right.',
  },
  {
    icon: SparkIcon,
    title: 'Work that matters',
    body: 'From a first apartment to a forever home, you help millions of people build the places they live their lives.',
  },
]

const CATEGORY_BLURB: Record<string, string> = {
  'Stores & Retail': 'Sales floor, cashier, and store leadership roles in your community.',
  'Pro & Sales': 'Win and grow accounts with contractors and trade pros.',
  'Distribution & Supply Chain': 'Warehouse, driver, and operations roles that move the network.',
  Merchandising: 'Buying, planning, and visual roles that shape the assortment.',
  Technology: 'Engineering, data, product, and design building our digital future.',
  Corporate: 'Finance, HR, marketing, and strategy at the home office.',
  'Customer Care': 'Remote roles helping customers across every channel.',
}

const TESTIMONIALS = [
  {
    quote:
      'I started as a seasonal cashier in college. Six years later I run a $40M store. Ray’s actually means it when they say grow from within.',
    name: 'Marcus T.',
    role: 'Store Manager · Houston, TX',
  },
  {
    quote:
      'The benefits started on my first day and the schedule flexibility lets me be there for my kids. It’s the first job that felt built for real life.',
    name: 'Priya N.',
    role: 'Pro Sales Specialist · Dallas, TX',
  },
  {
    quote:
      'I moved from the DC floor into supply chain analytics with the tuition program. They invested in me before I could pay it back.',
    name: 'Devon R.',
    role: 'Supply Chain Analyst · Raleigh, NC',
  },
]

export default function Home() {
  const featured = JOBS.slice(0, 6)
  const counts = CATEGORIES.map((c) => ({
    name: c,
    count: JOBS.filter((j) => j.category === c).length,
  }))

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl dark:bg-brand-600/20" />
          <div className="absolute -left-24 top-40 h-80 w-80 rounded-full bg-leaf-400/20 blur-3xl" />
        </div>

        <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="animate-fade-up">
            <span className="chip bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              <SparkIcon /> Now hiring across the US
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Build what’s next.
              <span className="block bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                Build it at Ray’s.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500 dark:text-ink-400">
              From the sales floor to the cloud, find a career with room to grow at America’s home
              improvement destination. One application. Thousands of openings.
            </p>

            <div className="mt-8 max-w-2xl">
              <SearchBar />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-ink-500 dark:text-ink-400">
              <span className="font-semibold text-ink-700 dark:text-ink-300">Popular:</span>
              {['Warehouse', 'Cashier', 'Store Manager', 'Remote', 'Driver'].map((t) => (
                <Link
                  key={t}
                  to={`/jobs?q=${encodeURIComponent(t)}`}
                  className="rounded-full border border-ink-200 px-3 py-1 transition hover:border-brand-400 hover:text-brand-600 dark:border-ink-700"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="card overflow-hidden p-0">
              <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-white">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">
                  This week at Ray’s
                </p>
                <p className="mt-2 font-display text-3xl font-extrabold">{JOBS.length} open roles</p>
                <p className="mt-1 text-brand-100">across stores, DCs, and the home office</p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-ink-100 dark:divide-ink-800">
                {STATS.map((s) => (
                  <div key={s.label} className="p-6">
                    <p className="font-display text-2xl font-extrabold text-ink-900 dark:text-white">
                      {s.value}
                    </p>
                    <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden animate-float rounded-2xl bg-white p-4 shadow-soft dark:bg-ink-800 sm:block">
              <p className="text-xs font-semibold text-ink-400">Avg. response time</p>
              <p className="font-display text-xl font-extrabold text-leaf-600">3 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">Explore by team</h2>
            <p className="mt-2 text-ink-500 dark:text-ink-400">
              Wherever you are in your career, there’s a place for you here.
            </p>
          </div>
          <Link to="/jobs" className="btn-ghost btn-md">
            View all jobs <ArrowRightIcon />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {counts.map(({ name, count }) => (
            <Link
              key={name}
              to={`/jobs?category=${encodeURIComponent(name)}`}
              className="card group flex items-center justify-between p-6 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-glow dark:hover:border-brand-500/60"
            >
              <div>
                <h3 className="font-display text-lg font-bold transition group-hover:text-brand-600">
                  {name}
                </h3>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{CATEGORY_BLURB[name]}</p>
              </div>
              <div className="ml-4 shrink-0 text-right">
                <span className="font-display text-2xl font-extrabold text-brand-500">{count}</span>
                <p className="text-xs text-ink-400">open</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink-50/70 py-16 dark:bg-ink-900/40">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              More than a job. A place to belong.
            </h2>
            <p className="mt-3 text-ink-500 dark:text-ink-400">
              We invest in people first — because great careers build great stores.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  <v.icon />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">Featured openings</h2>
            <p className="mt-2 text-ink-500 dark:text-ink-400">Fresh roles our teams are hiring for right now.</p>
          </div>
          <Link to="/jobs" className="btn-ghost btn-md">
            See all {JOBS.length} jobs <ArrowRightIcon />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ink-50/70 py-16 dark:bg-ink-900/40">
        <div className="container-x">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">Real stories from our teams</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card flex flex-col p-7">
                <blockquote className="flex-1 text-lg font-medium leading-relaxed text-ink-700 dark:text-ink-200">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-bold text-ink-900 dark:text-white">{t.name}</span>
                    <span className="block text-sm text-ink-500 dark:text-ink-400">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 px-8 py-14 text-center text-white shadow-glow sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your next chapter starts here
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Browse thousands of openings and apply in minutes. We’ll help you find the role that fits.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/jobs" className="btn bg-white px-8 py-3.5 text-base font-semibold text-brand-700 hover:bg-brand-50">
              Search all jobs
            </Link>
            <Link to="/benefits" className="btn border border-white/40 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10">
              Explore benefits
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
