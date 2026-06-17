import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-x grid place-items-center py-28 text-center">
      <p className="font-display text-7xl font-extrabold text-brand-500">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">We couldn’t find that page</h1>
      <p className="mt-2 max-w-sm text-ink-500 dark:text-ink-400">
        The role may have been filled or the link moved. Let’s get you back to the openings.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/jobs" className="btn-primary btn-lg">
          Browse jobs
        </Link>
        <Link to="/" className="btn-ghost btn-lg">
          Go home
        </Link>
      </div>
    </div>
  )
}
