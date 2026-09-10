import React, { useState } from 'react';
import { MessageCircle, Phone, Copy, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '8219927881',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formattedNumber = '+91 82199 27881';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    'Hello Jai, I came across your portfolio and would like to connect.'
  )}`;
  const telUrl = `tel:+91${phoneNumber}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2 select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-w-xs w-72 text-slate-800 dark:text-slate-100"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Direct Contact Line
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>WhatsApp &amp; Calls Available</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close contact popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 mb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                  Mobile / WhatsApp
                </span>
                <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                  {formattedNumber}
                </span>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 transition-all text-xs flex items-center gap-1"
                title="Copy phone number"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span className="text-[10px] font-medium">{copied ? 'Copied' : 'Copy'}</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                href={telUrl}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-semibold text-xs transition-all border border-slate-700 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Now</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Pill / Button */}
      <motion.button
        id="floating-whatsapp-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        className="relative group inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-700/95 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer border border-emerald-500/30 backdrop-blur-xs"
        aria-label="Direct WhatsApp and Mobile Contact"
      >
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          {/* Slower, smoother fade-out pulse effect (sophisticated and non-distracting) */}
          <span className="animate-smooth-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 pointer-events-none" />
          <span className="animate-smooth-ping-delayed absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-30 pointer-events-none" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-xs" />
        </span>
        <MessageCircle className="w-4 h-4 text-emerald-100" />
        <span className="hidden sm:inline text-emerald-50 font-normal">WhatsApp / Call:</span>
        <span className="font-mono tracking-tight font-semibold text-white">{phoneNumber}</span>
      </motion.button>
    </div>
  );
};
