import { motion } from 'framer-motion'
import { GraduationCap, Sparkles, FileCheck2, ChevronRight } from 'lucide-react'

/**
 * Step 1 — Hero. Big friendly illustration (icon-based, no image asset —
 * the real school hero image URL will be supplied later per CONTRACT.md;
 * until then this looks intentional on its own), personalised greeting,
 * and the "Check My Result" CTA.
 */
export default function Hero({ school, studentName, onCheckResult }) {
  const greetName = studentName?.trim() || 'Student'

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative overflow-hidden"
    >
      {/* ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent-300/30 blur-3xl animate-float-slower" />
      </div>

      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 pb-10 pt-10 text-center sm:pt-16 lg:max-w-3xl">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', bounce: 0.4 }}
          className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 shadow-soft sm:h-32 sm:w-32"
        >
          <GraduationCap className="h-14 w-14 text-white sm:h-16 sm:w-16" strokeWidth={1.75} />
          <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg ring-4 ring-white">
            <Sparkles size={16} />
          </span>
        </motion.div>

        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand-600">
          {school?.board ? `${school.board} Board` : 'Result Portal'}
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Hi {greetName} 👋
        </h1>
        <p className="mt-3 max-w-md text-balance text-sm text-slate-600 sm:text-base">
          Welcome to <span className="font-semibold text-slate-800">{school?.name || 'Educare Public School'}</span>'s
          Result Portal. Check your latest exam result instantly and download your marksheet — right here.
        </p>

        <div className="mt-8 grid w-full max-w-sm grid-cols-2 gap-3 text-left sm:max-w-md">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2.5 shadow-card">
            <FileCheck2 size={18} className="shrink-0 text-brand-600" />
            <span className="text-xs font-medium text-slate-600 sm:text-sm">Instant results</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2.5 shadow-card">
            <GraduationCap size={18} className="shrink-0 text-accent-600" />
            <span className="text-xs font-medium text-slate-600 sm:text-sm">Downloadable PDF</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onCheckResult}
          className="group mt-10 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-soft transition hover:from-brand-700 hover:to-brand-800 sm:px-8 sm:py-4"
        >
          Check My Result
          <ChevronRight size={20} className="transition group-hover:translate-x-1" />
        </motion.button>

        {school?.address && (
          <p className="mt-6 text-xs text-slate-400">{school.address}</p>
        )}
      </div>
    </motion.section>
  )
}
