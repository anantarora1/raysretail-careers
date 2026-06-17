import { Link } from 'react-router-dom'
import { GrowthIcon, HeartIcon, ShieldIcon, SparkIcon } from '../components/Icons'

const VALUES = [
  {
    icon: HeartIcon,
    title: 'People first',
    body: 'We hire for heart and train for skill. Every associate is treated like an owner, because here, many are.',
  },
  {
    icon: ShieldIcon,
    title: 'Safety always',
    body: 'No project, sale, or shipment is worth a shortcut. We protect each other so everyone goes home safe.',
  },
  {
    icon: GrowthIcon,
    title: 'Grow forward',
    body: 'We build careers, not just fill jobs. When you grow, the whole company grows with you.',
  },
  {
    icon: SparkIcon,
    title: 'Better every day',
    body: 'We sweat the details and celebrate the wins. Curiosity and craft are how we earn customers for life.',
  },
]

const PILLARS = [
  {
    stat: '70%',
    title: 'Promoted from within',
    body: 'Most store and DC leaders started on the floor. We post roles internally first and mean it.',
  },
  {
    stat: '$5,250',
    title: 'Tuition assistance / year',
    body: 'Earn a degree or certification on us — from skilled trades to an MBA.',
  },
  {
    stat: '180k+',
    title: 'Teammates nationwide',
    body: 'A community spanning 2,100+ locations and 46 states, all building toward the same goal.',
  },
]

export default function Life() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl dark:bg-brand-600/20" />
        </div>
        <div className="container-x py-16 lg:py-20">
          <span className="chip bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            Life at Ray’s
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            We build careers the same way we build homes — to last.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-500 dark:text-ink-400">
            Ray’s started as a single hardware store with a simple belief: take care of your people
            and they’ll take care of everything else. Hundreds of thousands of associates later, that
            belief still runs everything we do.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/jobs" className="btn-primary btn-lg">
              Find your role
            </Link>
            <Link to="/benefits" className="btn-ghost btn-lg">
              See benefits
            </Link>
          </div>
        </div>
      </section>

      <section id="values" className="container-x py-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">What we value</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      </section>

      <section className="bg-ink-50/70 py-16 dark:bg-ink-900/40">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="card p-7">
              <p className="font-display text-4xl font-extrabold text-brand-500">{p.stat}</p>
              <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="diversity" className="container-x py-16">
        <div className="grid items-center gap-10 rounded-3xl border border-ink-200 bg-white p-8 dark:border-ink-800 dark:bg-ink-900 lg:grid-cols-2 lg:p-12">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Everyone belongs at Ray’s
            </h2>
            <p className="mt-4 leading-relaxed text-ink-500 dark:text-ink-400">
              Our customers are every kind of person, so our teams are too. We’re committed to a
              workplace where people of all backgrounds, abilities, and experiences can do the best
              work of their lives — and be themselves while they do it.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-600 dark:text-ink-300">
              {[
                '10+ associate resource groups',
                'Veteran & military spouse hiring programs',
                'Accessible hiring and on-the-job accommodations',
                'Pay equity reviewed annually',
              ].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['Build', 'Belong', 'Grow', 'Lead'].map((word, i) => (
              <div
                key={word}
                className={`grid aspect-square place-items-center rounded-2xl font-display text-2xl font-extrabold text-white shadow-soft ${
                  ['bg-brand-500', 'bg-leaf-500', 'bg-ink-800', 'bg-brand-600'][i]
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
