export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9082/api/educare'
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
