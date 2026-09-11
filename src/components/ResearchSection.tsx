import React from 'react';
import {
  FileText,
  Eye,
  Download,
  Clock,
  FileCheck,
  Layers,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ResearchPaper } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface ResearchSectionProps {
  papers: ResearchPaper[];
  onOpenDocumentReader: (paper: ResearchPaper) => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  papers,
  onOpenDocumentReader,
}) => {
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
                In-depth investigations across defence alliances, multipolar geopolitics, and military leadership. Published monographs and strategic policy briefings.
              </p>
            </div>

            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Peer-Reviewed &amp; Published Treatises</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {papers.map((paper, index) => {
            return (
              <ScrollReveal key={paper.id} delay={index * 0.1}>
                <div
                  id={`research-card-${paper.id}`}
                  className="flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 transition-all duration-200 shadow-2xs hover:shadow-md overflow-hidden"
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

                    {/* Key Strategic Vectors */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mb-2">
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

                  {/* Card Footer: Read & Download Actions */}
                  <div className="p-5 sm:p-6 bg-[#FAF9F6] dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5 font-medium">
                        <FileText className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                        <span>Official Monograph</span>
                      </span>
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                        Full Text Available
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onOpenDocumentReader(paper)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Read Analysis</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(paper)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Brief</span>
                      </motion.button>
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
