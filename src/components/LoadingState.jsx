import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

/**
 * Step 4 — Loading. Skeleton + spinner while GET /result is in flight.
 */
export default function LoadingState() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center lg:max-w-3xl"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-700"
      >
        <Loader2 size={30} />
      </motion.div>
      <p className="text-base font-semibold text-slate-800 sm:text-lg">Fetching your result…</p>
      <p className="mt-1 text-sm text-slate-500">This usually takes just a second.</p>

      <div className="mt-8 w-full max-w-md space-y-3">
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-40 w-full animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </motion.section>
  )
}
