import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  Eye,
  Download,
  Trash2,
  Clock,
  FileCheck,
  Layers,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ResearchPaper } from '../types';
import { formatFileSize } from '../utils/storage';
import { ScrollReveal } from './ScrollReveal';

interface ResearchSectionProps {
  papers: ResearchPaper[];
  onUploadDocument: (paperId: string, file: File) => Promise<void>;
  onRemoveDocument: (paperId: string) => Promise<void>;
  onOpenDocumentReader: (paper: ResearchPaper) => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  papers,
  onUploadDocument,
  onRemoveDocument,
  onOpenDocumentReader,
}) => {
  const [uploadingPaperId, setUploadingPaperId] = useState<string | null>(null);
  const [dragOverPaperId, setDragOverPaperId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileSelect = async (paperId: string, file: File) => {
    try {
      setUploadingPaperId(paperId);
      await onUploadDocument(paperId, file);
    } catch (error) {
      console.error('Failed to upload document:', error);
    } finally {
      setUploadingPaperId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, paperId: string) => {
    e.preventDefault();
    setDragOverPaperId(null);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(paperId, file);
    }
  };

  const handleDragOver = (e: React.DragEvent, paperId: string) => {
    e.preventDefault();
    setDragOverPaperId(paperId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverPaperId(null);
  };

  const handleDownload = (paper: ResearchPaper) => {
    if (paper.uploadedFile?.dataUrl) {
      const link = document.createElement('a');
      link.href = paper.uploadedFile.dataUrl;
      link.download = paper.uploadedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Create text file from the initial excerpt
      const blob = new Blob([`${paper.title}\n${paper.subtitle}\n\n${paper.initialExcerpt}`], {
        type: 'text/plain;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${paper.title.replace(/\s+/g, '_')}_Executive_Summary.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <section
      id="research"
      className="py-16 sm:py-24 bg-[#F8F9FA]/80 dark:bg-slate-950/60 border-b border-slate-200/70 dark:border-slate-800/80 transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Description */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-slate-200/70 dark:border-slate-700/70">
                <Layers className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>Monographs &amp; Treatises</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Selected Research
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                In-depth investigations across defence alliances, multipolar geopolitics, and military leadership. Each card includes a dedicated space for uploading and reading the primary research documents.
              </p>
            </div>

            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Dedicated Upload Slots Available</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {papers.map((paper, index) => {
            const hasUpload = !!paper.uploadedFile;
            const isUploading = uploadingPaperId === paper.id;
            const isDragging = dragOverPaperId === paper.id;

            return (
              <ScrollReveal key={paper.id} delay={index * 0.1}>
                <div
                  id={`research-card-${paper.id}`}
                  className={`flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 shadow-2xs hover:shadow-md overflow-hidden ${
                    isDragging
                      ? 'border-emerald-500 ring-2 ring-emerald-100 dark:ring-emerald-950 bg-emerald-50/20'
                      : 'border-slate-200/90 dark:border-slate-800/90'
                  }`}
                >
                  {/* Card Header & Content */}
                  <div className="p-6 sm:p-7 flex-1">
                    
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/70 dark:border-slate-700/70">
                        {paper.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 font-medium">
                        <Clock className="w-3 h-3" />
                        {paper.readTime}
                      </span>
                    </div>

                    {/* Paper Title */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight mb-2">
                      {paper.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide mb-4">
                      {paper.subtitle}
                    </p>

                    {/* Abstract */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                      {paper.abstract}
                    </p>

                    {/* Key Takeaways */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mb-6">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                        Key Strategic Vectors
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {paper.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer: Dedicated Document Upload & Reader Area */}
                  <div className="p-5 sm:p-6 bg-[#FAF9F6] dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                        <span>Document Attachment</span>
                      </span>
                      {hasUpload && (
                        <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          Document Uploaded
                        </span>
                      )}
                    </div>

                    {/* Document Upload / Status Area */}
                    {hasUpload ? (
                      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 shadow-2xs space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5 overflow-hidden">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="overflow-hidden">
                              <div
                                className="text-xs font-semibold text-slate-900 dark:text-white truncate"
                                title={paper.uploadedFile?.name}
                              >
                                {paper.uploadedFile?.name}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                {paper.uploadedFile && formatFileSize(paper.uploadedFile.size)} • Uploaded{' '}
                                {paper.uploadedFile?.uploadedAt}
                              </div>
                            </div>
                          </div>

                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onRemoveDocument(paper.id)}
                            className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 rounded-md transition-colors"
                            title="Remove uploaded document"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>

                        {/* Document Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onOpenDocumentReader(paper)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Read</span>
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDownload(paper)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      /* Upload Dropzone / Button */
                      <div
                        onDrop={(e) => handleDrop(e, paper.id)}
                        onDragOver={(e) => handleDragOver(e, paper.id)}
                        onDragLeave={handleDragLeave}
                        className={`p-4 rounded-xl border border-dashed text-center transition-all ${
                          isDragging
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50/70 dark:hover:bg-slate-850'
                        }`}
                      >
                        <Upload className="w-5 h-5 text-slate-400 dark:text-slate-500 mx-auto mb-1.5" />
                        <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          Upload {paper.title} Document
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                          Drop PDF, DOCX, or TXT file here
                        </div>

                        <div className="mt-3 flex items-center justify-center gap-2">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isUploading}
                            onClick={() => fileInputRefs.current[paper.id]?.click()}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50 min-h-[36px]"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploading ? 'Uploading...' : 'Choose File'}</span>
                          </motion.button>

                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onOpenDocumentReader(paper)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1 min-h-[36px]"
                            title="Read executive research brief"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Brief</span>
                          </motion.button>
                        </div>

                        {/* Hidden input for this paper */}
                        <input
                          ref={(el) => (fileInputRefs.current[paper.id] = el)}
                          type="file"
                          accept=".pdf,.doc,.docx,.txt,.md"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(paper.id, file);
                          }}
                          className="hidden"
                        />
                      </div>
                    )}

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                      <span>Max size: 25MB</span>
                      <button
                        type="button"
                        onClick={() => onOpenDocumentReader(paper)}
                        className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium cursor-pointer"
                      >
                        Read full abstract &rarr;
                      </button>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

