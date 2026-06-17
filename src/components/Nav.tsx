import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useTheme } from '../hooks/useTheme'
import { useSavedJobs } from '../hooks/useSavedJobs'
import { BookmarkIcon, MenuIcon, MoonIcon, SunIcon, XIcon } from './Icons'

const LINKS = [
  { to: '/jobs', label: 'Find Jobs' },
  { to: '/life', label: 'Life at Ray’s' },
  { to: '/benefits', label: 'Benefits' },
]

export default function Nav() {
  const { theme, toggle } = useTheme()
  const { saved } = useSavedJobs()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/70 bg-white/85 backdrop-blur-lg dark:border-ink-800/70 dark:bg-ink-950/85">
      <nav className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                    : 'text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/jobs?saved=1"
            className="relative hidden rounded-full p-2.5 text-ink-600 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white sm:inline-flex"
            aria-label="Saved jobs"
          >
            <BookmarkIcon className="text-xl" />
            {saved.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-brand-500 text-[11px] font-bold text-white">
                {saved.length}
              </span>
            )}
          </Link>

          <button
            onClick={toggle}
            className="rounded-full p-2.5 text-ink-600 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <SunIcon className="text-xl" /> : <MoonIcon className="text-xl" />}
          </button>

          <Link to="/jobs" className="btn-primary btn-md hidden sm:inline-flex">
            Apply Now
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full p-2.5 text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800 md:hidden"
            aria-label="Menu"
          >
            {open ? <XIcon className="text-xl" /> : <MenuIcon className="text-xl" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink-200 bg-white px-5 pb-5 pt-2 dark:border-ink-800 dark:bg-ink-950 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                pathname === l.to ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300' : 'text-ink-700 dark:text-ink-200'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/jobs" onClick={() => setOpen(false)} className="btn-primary btn-lg mt-3 w-full">
            Apply Now
          </Link>
        </div>
      )}
    </header>
  )
}
