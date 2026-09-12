import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Hash,
  BookOpen,
  Users,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Download,
  RotateCcw,
  Award,
  Loader2
} from 'lucide-react'
import { downloadResultPdf } from '../api'

/** Small circular percentage gauge, pure SVG (no chart lib needed). */
function PercentageRing({ percentage, isPass }) {
  const size = 132
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, percentage))
  const offset = circumference - (clamped / 100) * circumference
  const ringColor = isPass ? '#16a34a' : '#dc2626'

  return (
    <div className="relative flex h-[132px] w-[132px] shrink-0 items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-extrabold text-slate-900">{clamped.toFixed(1)}%</span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Overall</span>
      </div>
    </div>
  )
}

function SubjectRow({ subject }) {
  const pct = subject.maxMarks > 0 ? (subject.obtainedMarks / subject.maxMarks) * 100 : 0
  const isWeak = pct < 33

  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="py-3 pr-3 text-sm font-medium text-slate-800">{subject.name}</td>
      <td className="hidden py-3 pr-3 text-center text-sm text-slate-500 sm:table-cell">{subject.maxMarks}</td>
      <td className="py-3 pr-3 text-center text-sm font-semibold text-slate-800">
        {subject.obtainedMarks}
        <span className="text-slate-400 sm:hidden"> / {subject.maxMarks}</span>
      </td>
      <td className="w-1/3 py-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${isWeak ? 'bg-red-400' : 'bg-brand-500'}`}
          />
        </div>
      </td>
    </tr>
  )
}

/**
 * Step 5 — Result. Animated marksheet-style card.
 */
export default function ResultCard({ result, selectedClass, rollNo, onReset }) {
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState(false)

  const isPass = result.resultStatus === 'PASS'

  const handleDownload = async () => {
    setDownloading(true)
    setDownloadError(false)
    const ok = await downloadResultPdf(selectedClass, rollNo)
    if (!ok) setDownloadError(true)
    setDownloading(false)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto max-w-2xl px-4 py-8 sm:py-12 lg:max-w-4xl"
    >
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft"
      >
        {/* PASS / FAIL banner */}
        <div
          className={[
            'flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white sm:text-base',
            isPass ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-rose-600'
          ].join(' ')}
        >
          {isPass ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          {isPass ? 'Passed' : 'Not Cleared'}
        </div>

        <div className="p-5 sm:p-8">
          {/* Header: exam name + date */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-slate-200 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{result.examName}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">Result declared on {result.resultDate}</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-700">
              <Award size={14} />
              Grade {result.grade}
            </div>
          </div>

          {/* Student info + ring */}
          <div className="mb-8 flex flex-col-reverse items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <InfoItem icon={User} label="Student Name" value={result.studentName} />
              <InfoItem icon={Hash} label="Roll No." value={result.rollNo} />
              <InfoItem icon={BookOpen} label="Class" value={result.className} />
              <InfoItem icon={Users} label="Father's Name" value={result.fatherName} />
            </div>
            <PercentageRing percentage={result.percentage} isPass={isPass} />
          </div>

          {/* Subject table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full min-w-[320px] border-collapse px-2">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <th className="py-2.5 pl-3">Subject</th>
                  <th className="hidden py-2.5 text-center sm:table-cell">Max</th>
                  <th className="py-2.5 text-center">Obtained</th>
                  <th className="py-2.5 pr-3">Progress</th>
                </tr>
              </thead>
              <tbody className="px-3">
                {result.subjects.map((s, i) => (
                  <SubjectRow key={i} subject={s} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3.5">
            <span className="text-sm font-semibold text-slate-600">Total Marks</span>
            <span className="text-base font-extrabold text-slate-900">
              {result.totalObtained} <span className="font-medium text-slate-400">/ {result.totalMax}</span>
            </span>
          </div>

          <p className="mt-4 text-center text-[11px] text-slate-400">
            This is a computer-generated result and does not require a signature.
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition disabled:opacity-70 sm:text-base"
            >
              {downloading ? <Loader2 size={19} className="animate-spin" /> : <Download size={19} />}
              {downloading ? 'Preparing PDF…' : 'Download PDF'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onReset}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-card transition hover:bg-slate-50 sm:text-base"
            >
              <RotateCcw size={18} />
              Check Another Result
            </motion.button>
          </div>

          {downloadError && (
            <p className="mt-3 text-center text-xs font-medium text-red-600">
              Couldn't download the PDF right now. Please try again in a moment.
            </p>
          )}
        </div>
      </motion.div>
    </motion.section>
  )
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-slate-50/70 px-3 py-2.5">
      <Icon size={16} className="mt-0.5 shrink-0 text-brand-500" />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-800">{value || '—'}</p>
      </div>
    </div>
  )
}
