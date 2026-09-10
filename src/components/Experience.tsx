import React from 'react';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { EXPERIENCES } from '../data/initialData';
import { ScrollReveal } from './ScrollReveal';

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-16 sm:py-24 border-b border-slate-200/70 dark:border-slate-800/80 transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-slate-200/70 dark:border-slate-700/70">
              <Briefcase className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Career &amp; Appointments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Professional Experience
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              A sustained record of academic leadership, defence curriculum design, and strategic pedagogy across premier educational institutions.
            </p>
          </div>
        </ScrollReveal>

        {/* Experience Timeline Grid */}
        <div className="space-y-6 sm:space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={index * 0.1}>
              <motion.div
                id={`experience-card-${exp.id}`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6">
                  
                  {/* Left: Role & Organization */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/70">
                        {exp.nature}
                      </span>
                      <span className="text-xs font-medium text-slate-400 dark:text-slate-500 font-mono">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    
                    <div className="text-base sm:text-lg font-medium text-emerald-800 dark:text-emerald-400 mt-1">
                      {exp.organization}
                    </div>

                    <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                      {exp.description}
                    </p>

                    {/* Bulleted Key Contributions */}
                    <div className="mt-5 space-y-2">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-[#FAF9F6] dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Period & Status */}
                  <div className="shrink-0 lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 dark:border-slate-800 flex lg:flex-col items-center lg:items-end justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span>{exp.period}</span>
                    </div>
                    {index === 0 && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Active Role
                      </span>
                    )}
                  </div>

                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

