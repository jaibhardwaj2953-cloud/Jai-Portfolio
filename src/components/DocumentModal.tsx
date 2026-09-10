import React, { useEffect } from 'react';
import { X, FileText, Download, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ResearchPaper } from '../types';
import { formatFileSize } from '../utils/storage';

interface DocumentModalProps {
  paper: ResearchPaper | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ paper, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!paper) return null;

  const handleDownload = () => {
    if (paper.uploadedFile?.dataUrl) {
      const link = document.createElement('a');
      link.href = paper.uploadedFile.dataUrl;
      link.download = paper.uploadedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const blob = new Blob([`${paper.title}\n${paper.subtitle}\n\n${paper.initialExcerpt}`], {
        type: 'text/plain;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${paper.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const isPdf = paper.uploadedFile?.type === 'application/pdf' || paper.uploadedFile?.name.endsWith('.pdf');

  return (
    <AnimatePresence>
      <motion.div
        id="document-reader-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 dark:bg-black/80 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-[#FAF9F6] dark:bg-slate-950 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {paper.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {paper.readTime}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {paper.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-emerald-800 dark:text-emerald-400 mt-0.5">
                {paper.subtitle}
              </p>
            </div>

            <motion.button
              id="document-modal-close-btn"
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close document reader"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            
            {/* Uploaded File Status Badge */}
            {paper.uploadedFile ? (
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {paper.uploadedFile.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Size: {formatFileSize(paper.uploadedFile.size)} • Uploaded: {paper.uploadedFile.uploadedAt}
                    </div>
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-800 dark:bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-900 dark:hover:bg-emerald-600 transition-colors shrink-0 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Attached Document</span>
                </motion.button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span>Displaying original research executive briefing.</span>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="text-emerald-800 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Save brief</span>
                </motion.button>
              </div>
            )}

            {/* Research Abstract */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Research Abstract
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
                {paper.abstract}
              </p>
            </div>

            {/* Key Strategic Points */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Strategic Vectors &amp; Key Findings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {paper.keyPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#FAF9F6] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Paper Content / Excerpt */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Primary Excerpt &amp; Notes
              </h4>
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                {paper.initialExcerpt}
              </pre>
            </div>

            {/* If PDF preview is available via dataUrl */}
            {isPdf && paper.uploadedFile?.dataUrl && (
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  PDF Preview
                </h4>
                <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700">
                  <iframe
                    src={paper.uploadedFile.dataUrl}
                    title="PDF Preview"
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-[#FAF9F6] dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
              Author: <span className="font-semibold text-slate-700 dark:text-slate-200">Jai Bhardwaj</span> • Geopolitics &amp; Defence Strategy
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

