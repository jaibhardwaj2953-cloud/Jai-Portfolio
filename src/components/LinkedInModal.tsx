import React, { useState, useEffect } from 'react';
import { Linkedin, ExternalLink, Check, X, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LinkedInModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  onSave: (url: string) => void;
}

export const LinkedInModal: React.FC<LinkedInModalProps> = ({
  isOpen,
  onClose,
  currentUrl,
  onSave,
}) => {
  const [url, setUrl] = useState(currentUrl);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUrl(currentUrl);
    setError(null);
  }, [currentUrl, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please provide a valid LinkedIn profile URL.');
      return;
    }
    
    // Basic formatting helper if they just type linkedin.com/...
    let finalUrl = trimmed;
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    onSave(finalUrl);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-11 h-11 rounded-xl bg-[#0A66C2]/10 dark:bg-[#0A66C2]/20 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] dark:text-sky-400 shrink-0">
              <Linkedin className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Set LinkedIn Profile Link
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Provide or update your official LinkedIn profile link for visitors and recruiters.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="linkedin-url-input"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
              >
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <input
                  id="linkedin-url-input"
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="https://www.linkedin.com/in/jai-bhardwaj"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all font-mono"
                  required
                />
              </div>
              {error && (
                <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">
                  {error}
                </p>
              )}
            </div>

            {/* Quick Preview Link */}
            {url && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400 truncate font-mono">
                  {url}
                </span>
                <a
                  href={url.startsWith('http') ? url : `https://${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#0A66C2] dark:text-sky-400 hover:underline shrink-0"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-semibold text-sm shadow-sm transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Save LinkedIn Link</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
