import type { Job } from '../data/jobs'

export function formatPay(job: Job): string {
  if (job.payUnit === 'hour') {
    return `$${job.payMin.toFixed(2)}–$${job.payMax.toFixed(2)}/hr`
  }
  const fmt = (n: number) => `$${Math.round(n / 1000)}k`
  return `${fmt(job.payMin)}–${fmt(job.payMax)}/yr`
}

export function formatLocation(job: Job): string {
  if (job.mode === 'Remote') return 'Remote — US'
  return `${job.city}, ${job.state}`
}

export function formatPosted(daysAgo: number): string {
  if (daysAgo <= 0) return 'Today'
  if (daysAgo === 1) return 'Yesterday'
  if (daysAgo < 7) return `${daysAgo} days ago`
  const weeks = Math.floor(daysAgo / 7)
  return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
}
