import { Link } from 'react-router-dom'
import { CheckIcon } from '../components/Icons'

const GROUPS = [
  {
    title: 'Health & wellbeing',
    items: [
      'Medical, dental & vision from day one',
      'Free 24/7 telehealth & mental health support',
      'Health savings & flexible spending accounts',
      'On-site & virtual fitness perks',
    ],
  },
  {
    title: 'Financial future',
    items: [
      '401(k) with company match',
      'Associate Stock Purchase Plan at a discount',
      'Life & disability insurance',
      'Financial coaching & emergency savings fund',
    ],
  },
  {
    title: 'Time & family',
    items: [
      'Paid time off that grows with tenure',
      'Paid parental & caregiver leave',
      'Adoption & surrogacy assistance',
      'Backup child & elder care',
    ],
  },
  {
    title: 'Growth & learning',
    items: [
      '$5,250/yr tuition assistance',
      'Free skilled-trades & leadership academies',
      'Mentorship & internal mobility',
      'LinkedIn Learning for every associate',
    ],
  },
  {
    title: 'Everyday perks',
    items: [
      'Associate merchandise discount',
      'Discounts on travel, phone & more',
      'Recognition & bonus programs',
      'Community volunteer paid time',
    ],
  },
  {
    title: 'For part-time too',
    items: [
      'Day-one health coverage options',
      '401(k) eligibility',
      'Tuition assistance access',
      'Associate discount & perks',
    ],
  },
]

export default function Benefits() {
  return (
    <>
      <section className="container-x py-16">
        <span className="chip bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          Pay & benefits
        </span>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Benefits that work as hard as you do.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-500 dark:text-ink-400">
          Full-time or part-time, in a store or at the home office — Ray’s invests in your health,
          your family, and your future from the very first day.
        </p>
      </section>

      <section className="container-x pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.title} className="card p-7">
              <h2 className="font-display text-lg font-bold">{g.title}</h2>
              <ul className="mt-4 space-y-3">
                {g.items.map((i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-600 dark:text-ink-300">
                    <CheckIcon className="mt-0.5 shrink-0 text-leaf-500" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-ink-900 to-ink-800 px-8 py-12 text-white sm:px-14">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                Pay you can count on
              </h2>
              <p className="mt-3 max-w-xl text-ink-300">
                We post pay ranges on every job — no guessing. Wages are reviewed regularly against
                local markets, and many roles include bonuses, commission, or shift premiums.
              </p>
              <Link to="/jobs" className="btn bg-brand-500 px-7 py-3.5 text-base font-semibold text-white shadow-glow hover:bg-brand-600 mt-6">
                See open roles & pay
              </Link>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              {[
                ['Day 1', 'Benefits eligibility'],
                ['100%', 'Pay transparency'],
                ['$5,250', 'Annual tuition support'],
                ['401(k)', 'With company match'],
              ].map(([stat, label]) => (
                <div key={label} className="rounded-2xl bg-white/5 p-5">
                  <dt className="font-display text-2xl font-extrabold text-brand-400">{stat}</dt>
                  <dd className="mt-1 text-sm text-ink-300">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-ink-400">
          Benefits vary by role, location, and hours worked. This page is illustrative for a demo brand.
        </p>
      </section>
    </>
  )
}
