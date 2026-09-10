import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Sparkles, Star, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { CREDENTIALS } from '../data/initialData';
import { ScrollReveal } from './ScrollReveal';

export const Credentials: React.FC = () => {
  return (
    <section
      id="credentials"
      className="relative py-16 sm:py-24 bg-white/70 dark:bg-slate-950/40 border-b border-slate-200/70 dark:border-slate-800/80 transition-colors duration-200"
    >
      {/* Anchor for #achievements navigation */}
      <div id="achievements" className="absolute -top-24" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-slate-200/70 dark:border-slate-700/70">
              <Award className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Achievements &amp; Competitive Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Achievements, Clearances &amp; Certifications
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Certified IndiaFutureAI trained creator alongside proven aptitude across multiple premier national defence and intelligence officer selection examinations.
            </p>
          </div>
        </ScrollReveal>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREDENTIALS.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <motion.div
                id={`credential-card-${item.id}`}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-[#FAF9F6] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 shadow-2xs">
                      {item.isAiCertified ? (
                        <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                      )}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${item.badgeColor} dark:bg-opacity-20`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.clearanceCount}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                    {item.exam}
                  </h3>
                  
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                    {item.fullName}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Direct External Link if available (e.g. IndiaFutureAI) */}
                  {item.url && (
                    <div className="mt-4 pt-1">
                      <motion.a
                        id={`credential-action-link-${item.id}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 dark:bg-emerald-700 hover:bg-emerald-900 dark:hover:bg-emerald-600 text-white text-xs font-semibold shadow-2xs hover:shadow transition-all group/link"
                      >
                        <span>{item.linkText || 'Visit ' + item.organization}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-200 group-hover/link:translate-x-0.5 transition-transform" />
                      </motion.a>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-emerald-800 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{item.organization}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  ) : (
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {item.organization}
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    Verified
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Banner on Defence & AI Credentials Rigor */}
        <ScrollReveal delay={0.25}>
          <div className="mt-12 p-6 rounded-2xl bg-[#FAF9F6] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0">
                <Star className="w-4 h-4 fill-emerald-800 dark:fill-emerald-400" />
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">Demonstrated Multi-Tier Excellence:</strong> As an <strong className="text-slate-900 dark:text-white">IndiaFutureAI trained creator</strong> combined with consistently clearing CDS, AFCAT, CGCAT, and IB ACIO, Jai brings deep strategic insight and modern generative technology to defence aspirants.
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.indiafutureai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-xs font-medium text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors shadow-2xs inline-flex items-center gap-1.5"
              >
                <span>indiafutureai.com</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
              <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 shadow-2xs">
                10+ Clearances
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

