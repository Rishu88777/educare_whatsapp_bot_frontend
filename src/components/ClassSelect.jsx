import { motion } from 'framer-motion'
import { Layers, CheckCircle2, ChevronRight, Frown } from 'lucide-react'

/**
 * Step 2 — Select Class. Responsive grid of selectable chip/cards (not a
 * plain <select>), fetched from GET /classes.
 */
export default function ClassSelect({ classes, loadingClasses, selected, onSelect, onContinue }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mx-auto flex max-w-2xl flex-col px-4 py-8 sm:py-12 lg:max-w-3xl"
    >
      <div className="mb-6 flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
          <Layers size={20} />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Select your class</h2>
          <p className="text-xs text-slate-500 sm:text-sm">Pick the class you appeared for the exam in</p>
        </div>
      </div>

      {loadingClasses && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-200/70" />
          ))}
        </div>
      )}

      {!loadingClasses && classes.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
          <Frown className="text-slate-400" size={32} />
          <p className="text-sm font-medium text-slate-600">
            We couldn't load the class list right now. Please check back in a moment.
          </p>
        </div>
      )}

      {!loadingClasses && classes.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {classes.map((cls) => {
            const isSelected = cls === selected
            return (
              <motion.button
                key={cls}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSelect(cls)}
                className={[
                  'relative flex min-h-[4.25rem] flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-3 text-center text-sm font-semibold shadow-card transition',
                  isSelected
                    ? 'border-brand-600 bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-soft'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50'
                ].join(' ')}
              >
                {isSelected && (
                  <CheckCircle2
                    size={16}
                    className="absolute right-1.5 top-1.5 text-white"
                    strokeWidth={2.5}
                  />
                )}
                <span className="leading-tight">{cls}</span>
              </motion.button>
            )
          })}
        </div>
      )}

      <motion.button
        whileHover={{ scale: selected ? 1.02 : 1 }}
        whileTap={{ scale: selected ? 0.98 : 1 }}
        type="button"
        disabled={!selected}
        onClick={onContinue}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3.5 text-base font-semibold text-white shadow-soft transition disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:shadow-none sm:w-auto sm:self-end"
      >
        Continue
        <ChevronRight size={20} />
      </motion.button>
    </motion.section>
  )
}
