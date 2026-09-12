import { GraduationCap, School, ArrowLeft } from 'lucide-react'

/**
 * Slim top branding bar shown across every step: school logo/name/board,
 * plus an optional back button for inner steps.
 *
 * No placeholder image URL is ever hardcoded here — when `school.logoUrl`
 * is empty (as it will be until the real logo is supplied), we fall back to
 * a friendly icon mark instead of a broken <img>.
 */
export default function Header({ school, onBack, backLabel = 'Back' }) {
  const hasLogo = Boolean(school?.logoUrl)

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mr-1 inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-brand-700 active:scale-95"
            aria-label={backLabel}
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-soft sm:h-10 sm:w-10">
          {hasLogo ? (
            <img
              src={school.logoUrl}
              alt={school?.name ? `${school.name} logo` : 'School logo'}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <GraduationCap className="h-5 w-5 text-white sm:h-6 sm:w-6" strokeWidth={2.25} />
          )}
        </div>

        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
            {school?.name || 'Educare Public School'}
          </p>
          {school?.board && (
            <p className="flex items-center gap-1 truncate text-[11px] font-medium text-slate-500 sm:text-xs">
              <School size={12} className="shrink-0" />
              {school.board} Board
            </p>
          )}
        </div>

        <div className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 sm:flex">
          Result Portal
        </div>
      </div>
    </header>
  )
}
