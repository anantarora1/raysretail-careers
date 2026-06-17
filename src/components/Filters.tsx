import { CATEGORIES, STATES, type JobType, type WorkMode } from '../data/jobs'

export type FilterState = {
  category: string
  state: string
  types: JobType[]
  modes: WorkMode[]
}

type Props = {
  value: FilterState
  onChange: (next: FilterState) => void
  onClear: () => void
}

const TYPES: JobType[] = ['Full-time', 'Part-time', 'Seasonal']
const MODES: WorkMode[] = ['On-site', 'Hybrid', 'Remote']

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-ink-100 py-5 last:border-0 dark:border-ink-800">
      <h3 className="mb-3 text-sm font-bold text-ink-800 dark:text-ink-200">{title}</h3>
      {children}
    </div>
  )
}

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? 'border-brand-500 bg-brand-500 text-white'
          : 'border-ink-200 text-ink-600 hover:border-brand-400 hover:text-brand-600 dark:border-ink-700 dark:text-ink-300'
      }`}
    >
      {children}
    </button>
  )
}

export default function Filters({ value, onChange, onClear }: Props) {
  const toggleArr = <T,>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((a) => a !== item) : [...arr, item]

  const active =
    value.category || value.state || value.types.length || value.modes.length

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold">Filters</h2>
        {active ? (
          <button onClick={onClear} className="text-sm font-semibold text-brand-600 hover:underline">
            Clear all
          </button>
        ) : null}
      </div>

      <Section title="Category">
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onChange({ ...value, category: '' })}
            className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
              !value.category
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                : 'text-ink-600 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800'
            }`}
          >
            All categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ ...value, category: c })}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                value.category === c
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                  : 'text-ink-600 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Work type">
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Toggle key={t} active={value.types.includes(t)} onClick={() => onChange({ ...value, types: toggleArr(value.types, t) })}>
              {t}
            </Toggle>
          ))}
        </div>
      </Section>

      <Section title="Location type">
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <Toggle key={m} active={value.modes.includes(m)} onClick={() => onChange({ ...value, modes: toggleArr(value.modes, m) })}>
              {m}
            </Toggle>
          ))}
        </div>
      </Section>

      <Section title="State">
        <select
          value={value.state}
          onChange={(e) => onChange({ ...value, state: e.target.value })}
          className="field"
        >
          <option value="">All states</option>
          {STATES.map((s) => (
            <option key={s} value={s}>
              {s === 'US' ? 'Remote (US)' : s}
            </option>
          ))}
        </select>
      </Section>
    </div>
  )
}
