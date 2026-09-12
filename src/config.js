// Hardcoded temporarily (pointing at an ngrok tunnel to the local backend) so
// deployment doesn't depend on setting a Vercel env var. VITE_API_BASE_URL
// still overrides this when set (e.g. for local dev against a different
// backend), but the fallback itself is now the real, currently-live URL.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://unpolished-inexpressible-julius.ngrok-free.dev/api/educare'
export const WA_NUMBER = import.meta.env.VITE_WA_NUMBER || ''

/**
 * Context passed by the WhatsApp bot's CTA deep link:
 *   ?m=<mobile>&n=<name>
 */
export function getStudentContext() {
  const q = new URLSearchParams(window.location.search)
  return {
    mobile: q.get('m') || '',
    name: q.get('n') || ''
  }
}
