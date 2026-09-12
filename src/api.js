import axios from 'axios'
import { API_BASE_URL } from './config'

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
})

/**
 * GET /school -> { code, message, data: { name, logoUrl, board, address } }
 * Resolves to null on any failure so the Hero can render a graceful fallback
 * instead of crashing when the backend isn't reachable yet.
 */
export async function fetchSchool() {
  try {
    const res = await client.get('/school')
    if (res.data?.code === 200 && res.data?.data) return res.data.data
    return null
  } catch (err) {
    console.warn('fetchSchool failed', err)
    return null
  }
}

/**
 * GET /classes -> { code, message, data: string[] }
 * Resolves to [] on failure.
 */
export async function fetchClasses() {
  try {
    const res = await client.get('/classes')
    if (res.data?.code === 200 && Array.isArray(res.data?.data)) return res.data.data
    return []
  } catch (err) {
    console.warn('fetchClasses failed', err)
    return []
  }
}

/**
 * GET /result?className=..&rollNo=..
 * The backend returns HTTP 200 in both the found and not-found cases, using
 * the envelope's `code` field to signal outcome (code 200 = found, 404 =
 * not found). We defensively treat *any* non-200 `code`, a missing `data`,
 * or an actual HTTP-level error, all as "not found / failed" so the UI can
 * show the friendly empty state instead of breaking.
 *
 * Returns: { success: boolean, data: ResultResponse|null, message: string }
 */
export async function fetchResult(className, rollNo) {
  try {
    const res = await client.get('/result', { params: { className, rollNo } })
    const body = res.data
    if (body?.code === 200 && body?.data) {
      return { success: true, data: body.data, message: body.message || '' }
    }
    return { success: false, data: null, message: body?.message || 'Result not found.' }
  } catch (err) {
    const message = err?.response?.data?.message || 'We could not fetch your result. Please try again.'
    console.warn('fetchResult failed', err)
    return { success: false, data: null, message }
  }
}

/**
 * GET /result/pdf?className=..&rollNo=.. -> binary PDF.
 * Triggers a browser download named Result_<rollNo>.pdf from the blob.
 * Returns true on success, false on failure (caller can show a toast/error).
 */
export async function downloadResultPdf(className, rollNo) {
  try {
    const res = await client.get('/result/pdf', {
      params: { className, rollNo },
      responseType: 'blob'
    })
    const blob = new Blob([res.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Result_${rollNo}.pdf`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    return true
  } catch (err) {
    console.warn('downloadResultPdf failed', err)
    return false
  }
}
