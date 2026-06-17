import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getJobBySlug } from '../data/jobs'
import { formatLocation, formatPay } from '../lib/format'
import NotFound from './NotFound'
import { ArrowRightIcon, CheckIcon } from '../components/Icons'

// Set VITE_FORMSPREE_ENDPOINT at build time (e.g. https://formspree.io/f/xxxxxx)
// to capture real submissions. When unset, the form runs in demo mode.
const ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) || ''

type Form = {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  years: string
  currentTitle: string
  resumeUrl: string
  linkedin: string
  authorized: string
  availability: string
  why: string
}

const EMPTY: Form = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  years: '',
  currentTitle: '',
  resumeUrl: '',
  linkedin: '',
  authorized: '',
  availability: '',
  why: '',
}

const STEPS = ['Your info', 'Experience', 'A few questions', 'Review']

export default function Apply() {
  const { slug } = useParams()
  const job = slug ? getJobBySlug(slug) : undefined
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  if (!job) return <NotFound />

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validateStep = (s: number): boolean => {
    const e: Partial<Record<keyof Form, string>> = {}
    if (s === 0) {
      if (!form.firstName.trim()) e.firstName = 'Required'
      if (!form.lastName.trim()) e.lastName = 'Required'
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email'
      if (!form.phone.trim()) e.phone = 'Required'
      if (!form.location.trim()) e.location = 'Required'
    }
    if (s === 1) {
      if (!form.years) e.years = 'Select one'
      if (form.resumeUrl && !/^https?:\/\//i.test(form.resumeUrl))
        e.resumeUrl = 'Use a full URL (https://…)'
    }
    if (s === 2) {
      if (!form.authorized) e.authorized = 'Required'
      if (!form.availability.trim()) e.availability = 'Required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    setStatus('submitting')
    const payload = {
      ...form,
      _subject: `New application: ${job.title} (RR-${job.id})`,
      jobTitle: job.title,
      jobId: `RR-${job.id}`,
      jobLocation: formatLocation(job),
    }
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('submit failed')
      } else {
        // Demo mode — simulate a network round-trip
        await new Promise((r) => setTimeout(r, 900))
      }
      setStatus('done')
      window.scrollTo({ top: 0 })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="container-x py-20">
        <div className="card mx-auto max-w-xl p-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf-500/15 text-3xl text-leaf-600">
            <CheckIcon />
          </div>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight">
            Application submitted!
          </h1>
          <p className="mt-3 text-ink-500 dark:text-ink-400">
            Thanks, {form.firstName}. Your application for <strong>{job.title}</strong> is in. Our
            recruiting team typically responds within 3 business days{ENDPOINT ? '' : ' (demo)'}.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/jobs" className="btn-primary btn-lg">
              Browse more jobs
            </Link>
            <Link to="/" className="btn-ghost btn-lg">
              Back home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-x py-10">
      <Link to={`/jobs/${job.slug}`} className="text-sm font-semibold text-brand-600 hover:underline">
        ← Back to job
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">Apply</h1>
          <p className="mt-2 text-ink-500 dark:text-ink-400">
            {job.title} · {formatLocation(job)}
          </p>

          {/* Stepper */}
          <ol className="mt-8 flex items-center gap-2">
            {STEPS.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-2">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold transition ${
                    i < step
                      ? 'bg-leaf-500 text-white'
                      : i === step
                        ? 'bg-brand-500 text-white'
                        : 'bg-ink-100 text-ink-400 dark:bg-ink-800'
                  }`}
                >
                  {i < step ? <CheckIcon className="text-base" /> : i + 1}
                </span>
                <span
                  className={`hidden text-sm font-semibold sm:block ${
                    i <= step ? 'text-ink-800 dark:text-ink-200' : 'text-ink-400'
                  }`}
                >
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="mx-1 hidden h-px flex-1 bg-ink-200 dark:bg-ink-700 sm:block" />
                )}
              </li>
            ))}
          </ol>

          <div className="card mt-8 p-7">
            {step === 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First name" error={errors.firstName}>
                  <input className="field" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input className="field" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" className="field" value={form.email} onChange={(e) => set('email', e.target.value)} />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input type="tel" className="field" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                </Field>
                <Field label="Your location (city, state)" error={errors.location} full>
                  <input className="field" placeholder="e.g. Charlotte, NC" value={form.location} onChange={(e) => set('location', e.target.value)} />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Years of relevant experience" error={errors.years}>
                  <select className="field" value={form.years} onChange={(e) => set('years', e.target.value)}>
                    <option value="">Select…</option>
                    <option>Less than 1 year</option>
                    <option>1–2 years</option>
                    <option>3–5 years</option>
                    <option>6–10 years</option>
                    <option>10+ years</option>
                  </select>
                </Field>
                <Field label="Current / most recent title">
                  <input className="field" value={form.currentTitle} onChange={(e) => set('currentTitle', e.target.value)} />
                </Field>
                <Field label="Resume link (LinkedIn, Drive, Dropbox)" error={errors.resumeUrl} full>
                  <input className="field" placeholder="https://…" value={form.resumeUrl} onChange={(e) => set('resumeUrl', e.target.value)} />
                </Field>
                <Field label="LinkedIn profile (optional)" full>
                  <input className="field" placeholder="https://linkedin.com/in/…" value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
                </Field>
                <p className="text-xs text-ink-400 sm:col-span-2">
                  Tip: paste a public link to your resume or portfolio. We’ll request a file later if needed.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5">
                <Field label="Are you legally authorized to work in the US?" error={errors.authorized}>
                  <div className="flex gap-3">
                    {['Yes', 'No'].map((opt) => (
                      <label
                        key={opt}
                        className={`flex-1 cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-semibold transition ${
                          form.authorized === opt
                            ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                            : 'border-ink-200 dark:border-ink-700'
                        }`}
                      >
                        <input type="radio" name="auth" className="sr-only" checked={form.authorized === opt} onChange={() => set('authorized', opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="When can you start?" error={errors.availability}>
                  <input className="field" placeholder="e.g. Immediately, or 2 weeks’ notice" value={form.availability} onChange={(e) => set('availability', e.target.value)} />
                </Field>
                <Field label="Why Ray’s? (optional)">
                  <textarea rows={4} className="field resize-none" placeholder="Tell us what excites you about this role." value={form.why} onChange={(e) => set('why', e.target.value)} />
                </Field>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-lg font-bold">Review your application</h2>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                  Make sure everything looks right before you submit.
                </p>
                <dl className="mt-5 divide-y divide-ink-100 dark:divide-ink-800">
                  <Row label="Name" value={`${form.firstName} ${form.lastName}`} />
                  <Row label="Email" value={form.email} />
                  <Row label="Phone" value={form.phone} />
                  <Row label="Location" value={form.location} />
                  <Row label="Experience" value={form.years} />
                  <Row label="Current title" value={form.currentTitle || '—'} />
                  <Row label="Resume link" value={form.resumeUrl || '—'} />
                  <Row label="Work authorized" value={form.authorized} />
                  <Row label="Availability" value={form.availability} />
                </dl>
                {status === 'error' && (
                  <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">
                    Something went wrong submitting your application. Please try again.
                  </p>
                )}
              </div>
            )}

            {/* Nav buttons */}
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 0 ? (
                <button onClick={back} className="btn-ghost btn-md" disabled={status === 'submitting'}>
                  Back
                </button>
              ) : (
                <span />
              )}
              {step < STEPS.length - 1 ? (
                <button onClick={next} className="btn-primary btn-md">
                  Continue <ArrowRightIcon />
                </button>
              ) : (
                <button onClick={submit} className="btn-primary btn-md" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Submitting…' : 'Submit application'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Summary aside */}
        <aside>
          <div className="card sticky top-24 p-6">
            <p className="text-sm font-semibold text-ink-500 dark:text-ink-400">You’re applying for</p>
            <h2 className="mt-1 font-display text-lg font-bold">{job.title}</h2>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{formatLocation(job)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="chip bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300">{job.type}</span>
              <span className="chip bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300">{job.mode}</span>
            </div>
            <p className="mt-4 border-t border-ink-100 pt-4 text-sm dark:border-ink-800">
              <span className="text-ink-500 dark:text-ink-400">Estimated pay</span>
              <br />
              <span className="font-display text-lg font-extrabold">{formatPay(job)}</span>
            </p>
            {!ENDPOINT && (
              <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                Demo mode: submissions aren’t stored until a form endpoint is connected.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string
  error?: string
  full?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="label">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm">
      <dt className="text-ink-500 dark:text-ink-400">{label}</dt>
      <dd className="max-w-[60%] truncate text-right font-semibold">{value}</dd>
    </div>
  )
}
