import { Link } from 'react-router-dom'
import Logo from './Logo'

const COLS = [
  {
    title: 'Careers',
    links: [
      { to: '/jobs', label: 'Search all jobs' },
      { to: '/jobs?category=Stores+%26+Retail', label: 'Store & retail roles' },
      { to: '/jobs?category=Distribution+%26+Supply+Chain', label: 'Distribution centers' },
      { to: '/jobs?category=Technology', label: 'Technology & corporate' },
    ],
  },
  {
    title: 'About',
    links: [
      { to: '/life', label: 'Life at Ray’s' },
      { to: '/benefits', label: 'Pay & benefits' },
      { to: '/life#values', label: 'Our values' },
      { to: '/life#diversity', label: 'Belonging' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50/60 dark:border-ink-800 dark:bg-ink-900/40">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            America’s home improvement destination. Join 180,000+ associates building careers,
            communities, and the projects people love.
          </p>
          <p className="mt-4 text-xs text-ink-400">careers.raysretail.com</p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink-800 dark:text-ink-200">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-ink-500 transition hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-200 dark:border-ink-800">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Ray’s Retail, Inc. A fictional brand built for demonstration.</p>
          <p>Ray’s is an Equal Opportunity Employer.</p>
        </div>
      </div>
    </footer>
  )
}
