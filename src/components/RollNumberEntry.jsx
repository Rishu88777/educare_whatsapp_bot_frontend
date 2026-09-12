import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Hash, Search, AlertCircle } from 'lucide-react'

/**
 * Step 3 — Enter Roll Number. Shows selected class as a breadcrumb,
 * validates non-empty / numeric-ish input, "View Result" disabled until valid.
 */
export default function RollNumberEntry({ selectedClass, rollNo, setRollNo, onChangeClass, onSubmit }) {
  const isValid = useMemo(() => /^[a-zA-Z0-9-]{1,20}$/.test(rollNo.trim()), [rollNo])
  const showHint = rollNo.trim().length > 0 && !isValid

  return (
    <motion.section
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mx-auto flex max-w-2xl flex-col px-4 py-8 sm:py-12 lg:max-w-3xl"
    >
      <button
        type="button"
        onClick={onChangeClass}
        className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-100 sm:text-sm"
      >
        {selectedClass}
        <span className="text-brand-400">&middot;</span>
        <span className="underline decoration-brand-300 underline-offset-2">Change</span>
      </button>

      <div className="mb-6 flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
          <Hash size={20} />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Enter your roll number</h2>
          <p className="text-xs text-slate-500 sm:text-sm">As printed on your admit card / school ID</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (isValid) onSubmit()
        }}
        className="flex flex-col gap-3 sm:flex-row sm:items-start"
      >
        <div className="flex-1">
          <input
            type="text"
            inputMode="numeric"
            autoFocus
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="e.g. 1023"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 shadow-card outline-none ring-brand-500/40 transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4"
          />
          {showHint && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-accent-600">
              <AlertCircle size={14} />
              Please enter a valid roll number.
            </p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: isValid ? 1.02 : 1 }}
          whileTap={{ scale: isValid ? 0.98 : 1 }}
          type="submit"
          disabled={!isValid}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3.5 text-base font-semibold text-white shadow-soft transition disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:shadow-none"
        >
          <Search size={19} />
          View Result
        </motion.button>
      </form>
    </motion.section>
  )
}
