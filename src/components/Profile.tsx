import React from 'react';
import {
  Globe2,
  BookOpen,
  Compass,
  CheckCircle2,
  Sparkles,
  Workflow,
  Film,
  Mic,
  Bot,
  Layers,
  Wrench,
  Shield,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

export const Profile: React.FC = () => {
  const strategicPillars = [
    {
      icon: Globe2,
      title: 'Geopolitics & Defence Strategy',
      description:
        'In-depth specialization in West Asian defense alignments, BRICS multilateral dynamics, maritime choke-point security, and border dispute management across South Asia.',
      tag: 'Strategic Analysis',
      highlights: ['West Asian security architectures', 'Maritime choke-points & Indo-Pacific', 'Multilateral alliance dynamics'],
    },
    {
      icon: BookOpen,
      title: 'Academic Leadership & Mentorship',
      description:
        'Curriculum architect for premier national defence academies, delivering comprehensive masterclasses and mentoring thousands of candidates for CDS, AFCAT, and SSB officer selection.',
      tag: 'Officer Cadre Pedagogy',
      highlights: ['10+ Officer exam clearances', 'Comprehensive defence curricula', 'Interview & SSB strategic psychology'],
    },
  ];

  return (
    <section
      id="profile-section"
      className="py-16 sm:py-24 bg-white/70 dark:bg-slate-950/40 border-b border-slate-200/70 dark:border-slate-800/80 transition-colors duration-200"
    >
      {/* Anchor for #about and #skills */}
      <div id="about" className="absolute -top-20" />
      <div id="skills" className="absolute -top-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-slate-200/70 dark:border-slate-700/70">
              <Compass className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Profile &amp; Focus</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Strategic Research at the Intersection of Defence and Artificial Intelligence
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              With 4+ years of hands-on experience, my work addresses a critical gap: synthesizing complex geopolitical treaties and military tactics using modern AI-assisted workflows, while delivering uncompromising clarity to defence aspirants and strategic observers.
            </p>
          </div>
        </ScrollReveal>

        {/* Strategic Pillars Grid (AI Augmentation card removed as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {strategicPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <motion.div
                  id={`profile-pillar-${idx + 1}`}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F6] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 shadow-2xs mb-5">
                      <Icon className="w-6 h-6 text-emerald-800 dark:text-emerald-400" />
                    </div>
                    <div className="inline-block text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md mb-2.5 border border-emerald-200/60 dark:border-emerald-800/60">
                      {pillar.tag}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2.5">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {pillar.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      {pillar.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Strategic Discipline
                    </span>
                    <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                      Active Practice
                    </span>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* 
          =======================================================
          SKILLS & EXPERTISE: GENERATIVE AI & PROMPT ENGINEERING
          =======================================================
        */}
        <ScrollReveal delay={0.15}>
          <div
            id="skills-and-expertise-section"
            className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden"
          >
            {/* Header of Skills Sub-Section */}
            <div className="max-w-3xl mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-emerald-200/80 dark:border-emerald-800/80">
                <Wrench className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Skills &amp; Expertise</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Generative AI &amp; Prompt Engineering
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Production-tested tech stack and autonomous methodologies deployed for end-to-end intelligence synthesis, visual worldbuilding, neural audio direction, and multi-modal pipeline orchestration.
              </p>
            </div>

            {/* 4 Categorized Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              
              {/* 1. Workflow & Automation (HIGHLIGHTED IN DISTINCT COLOR with prominent GOOGLE FLOW) */}
              <motion.div
                id="skill-card-workflow-automation"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-600/70 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Ambient glow accent */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-200/50 dark:bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

                <div>
                  {/* Category Pill with Distinct Color */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold uppercase tracking-wider border border-amber-300/80 dark:border-amber-700/80">
                      <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Workflow &amp; Automation</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">
                      01
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 mb-4 font-medium">
                    Orchestration Engine &amp; AI Logic Pipelines
                  </div>

                  {/* PROMINENT STANDOUT: GOOGLE FLOW */}
                  <div className="my-2">
                    <div className="text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Primary Anchor Tool</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/90 dark:bg-amber-800/80 text-amber-950 dark:text-amber-100">
                        <Sparkles className="w-2.5 h-2.5 text-amber-700 dark:text-amber-300" /> Featured
                      </span>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-bold text-base shadow-sm ring-2 ring-amber-300 dark:ring-amber-500/60 flex items-center justify-between gap-2 transition-all cursor-default"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0 shadow-2xs">
                          <Workflow className="w-4 h-4 text-white" />
                        </div>
                        <span className="tracking-tight text-white font-bold text-base drop-shadow-xs">
                          Google Flow
                        </span>
                      </div>
                      <span className="text-[10px] font-bold tracking-wide uppercase bg-black/25 px-2 py-0.5 rounded text-amber-100 shrink-0">
                        Core Pipeline
                      </span>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-950/80 dark:text-amber-200/90 leading-relaxed font-medium">
                  Autonomous workflow automation, deterministic logic chains, and multi-tool routing.
                </div>
              </motion.div>

              {/* 2. Visual & Video AI: Midjourney, Kling AI */}
              <motion.div
                id="skill-card-visual-video-ai"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-[#FAF9F6] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-200/70 dark:border-slate-700">
                      <Film className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                      <span>Visual &amp; Video AI</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                      02
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 mb-4 font-medium">
                    Photorealistic &amp; Cinematic Generation
                  </div>

                  {/* Clean Visual Tags / Chips */}
                  <div className="flex flex-wrap gap-2 my-2">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Midjourney</span>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                    >
                      <Film className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Kling AI</span>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Ultra-realistic cinematic imagery, historical recreations, and fluid neural video synthesis.
                </div>
              </motion.div>

              {/* 3. Voice & Audio AI: ElevenLabs */}
              <motion.div
                id="skill-card-voice-audio-ai"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-[#FAF9F6] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-200/70 dark:border-slate-700">
                      <Mic className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                      <span>Voice &amp; Audio AI</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                      03
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 mb-4 font-medium">
                    Neural Voice Synthesis &amp; Acoustic Direction
                  </div>

                  {/* Clean Visual Tags / Chips */}
                  <div className="flex flex-wrap gap-2 my-2">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                    >
                      <Mic className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>ElevenLabs</span>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Voice cloning, multi-dialect cadence, narrative pacing, and emotional audio modulation.
                </div>
              </motion.div>

              {/* 4. Core AI Competencies: Advanced Prompt Engineering, Multi-modal AI Orchestration, and Content Pipeline Automation */}
              <motion.div
                id="skill-card-core-competencies"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-[#FAF9F6] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-200/70 dark:border-slate-700">
                      <Bot className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                      <span>Core AI Competencies</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                      04
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 mb-3 font-medium">
                    Architectural &amp; Prompt Disciplines
                  </div>

                  {/* Clean Visual Tags / Chips */}
                  <div className="flex flex-col gap-2 my-1">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-xs border border-slate-200 dark:border-slate-700 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Advanced Prompt Engineering</span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-xs border border-slate-200 dark:border-slate-700 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Multi-modal AI Orchestration</span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-xs border border-slate-200 dark:border-slate-700 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Content Pipeline Automation</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Cross-model verification, systematic prompt templating, and rapid asset pipeline compilation.
                </div>
              </motion.div>

            </div>

          </div>
        </ScrollReveal>

        {/* 
          =======================================================
          EDITORIAL QUOTE BOX: CORE PHILOSOPHY
          (4.7 million community reach removed as requested)
          =======================================================
        */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white shadow-xs border border-slate-800">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-2">
                Core Philosophy
              </div>
              <p className="text-base sm:text-lg font-light leading-relaxed text-slate-100">
                “Defence analysis should not be obscured by excessive jargon or inaccessible silos. By pairing structured prompt engineering with rigorous military history, we can produce high-conviction insights in minutes rather than days.”
              </p>
              <div className="mt-3 text-sm font-medium text-slate-300">
                — Jai Bhardwaj
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

