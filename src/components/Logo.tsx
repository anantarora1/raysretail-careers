type Props = { className?: string }

export default function Logo({ className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19V10l8-6 8 6v9h-5v-7h-6v7z" />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">
        Ray’s<span className="text-brand-500">Retail</span>
      </span>
    </span>
  )
}
