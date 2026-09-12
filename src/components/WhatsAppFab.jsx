import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { WA_NUMBER } from '../config'

/**
 * Floating "Chat with us on WhatsApp" affordance. Renders nothing when
 * VITE_WA_NUMBER is blank, so we never show a broken/dead link.
 */
export default function WhatsAppFab() {
  if (!WA_NUMBER) return null

  const href = `https://wa.me/${WA_NUMBER}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', bounce: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3.5 text-white shadow-soft sm:bottom-6 sm:right-6"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={22} className="text-white" />
      <span className="hidden text-sm font-semibold sm:inline">Chat with us</span>
    </motion.a>
  )
}
