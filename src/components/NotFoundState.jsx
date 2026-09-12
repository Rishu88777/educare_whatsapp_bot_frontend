import { motion } from 'framer-motion'
import { SearchX, RotateCcw, Layers } from 'lucide-react'

/**
 * Step 6 — Not found / error. Friendly empty-state (never a raw error
 * message), with "Try Again" (back to roll entry) and "Change Class" links.
 */
export default function NotFoundState({ message, onTryAgain, onChangeClass }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mx-auto flex max-w-2xl flex-col items-center px-4 py-14 text-center sm:py-20 lg:max-w-3xl"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500">
        <SearchX size={36} />
      </div>
      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">We couldn't find that result</h2>
      <p className="mt-2 max-w-sm text-sm text-slate-500 sm:text-base">
        {message || 'Please double-check the class and roll number and try again.'}
      </p>

      <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onTryAgain}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition sm:text-base"
        >
          <RotateCcw size={18} />
          Try Again
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onChangeClass}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-card transition hover:bg-slate-50 sm:text-base"
        >
          <Layers size={18} />
          Change Class
        </motion.button>
      </div>
    </motion.section>
  )
}
