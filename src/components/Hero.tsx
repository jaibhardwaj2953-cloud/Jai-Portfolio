import React from 'react';
import {
  ExternalLink,
  Instagram,
  HardDrive,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  Phone,
  MessageCircle,
  Linkedin,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface HeroProps {
  avatarUrl?: string | null;
  driveUrl: string;
  instagramUrl: string;
  linkedinUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  avatarUrl = 'https://lh3.googleusercontent.com/d/1HI-ciN7HbTqUG24JX1qyt2e0MF4rk7v9',
  driveUrl,
  instagramUrl,
  linkedinUrl = 'https://www.linkedin.com/in/jai-bhardwaj-470919108?utm_source=share_via&utm_content=profile&utm_medium=member_android',
}) => {
  return (
    <section
      id="profile"
      className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden border-b border-slate-200/70 dark:border-slate-800/80 transition-colors duration-200"
    >
      {/* Subtle architectural background grid / aura */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-emerald-100/30 dark:bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-slate-200/40 dark:bg-slate-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 sm:gap-12 lg:gap-16">
          
          {/* Left Column: Text Information & Callouts */}
          <div className="flex-1 text-center lg:text-left max-w-2xl w-full">
            
            {/* Highlighted Badges */}
            <ScrollReveal delay={0.05}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 mb-6">
                <motion.a
                  id="hero-stat-badge"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:border-slate-400 dark:hover:border-slate-500 transition-all"
                >
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Spotlight:</span>
                  <span className="font-semibold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    Instagram (@defence.rev) · 4.7M+ Views
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
                </motion.a>

                <motion.a
                  id="hero-indiafutureai-badge"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.indiafutureai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-emerald-900 dark:text-emerald-300 bg-emerald-50/95 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 shadow-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>IndiaFutureAI Trained Creator</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-900 dark:group-hover:text-emerald-200 transition-colors" />
                </motion.a>

                {/* LinkedIn Profile Badge */}
                <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-sky-50/90 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/80 shadow-xs">
                  <motion.a
                    id="hero-linkedin-badge"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold text-[#0A66C2] dark:text-sky-300 hover:text-[#084e96] dark:hover:text-sky-200 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 fill-current" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </motion.a>
                </div>

                {/* Direct Line Badge */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/918219927881?text=Hello%20Jai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Direct WhatsApp: 8219927881</span>
                </motion.a>
              </div>
            </ScrollReveal>

            {/* Name Heading */}
            <ScrollReveal delay={0.1}>
              <h1
                id="hero-name-heading"
                className="text-4xl sm:text-6xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-4"
              >
                Jai Bhardwaj
              </h1>
            </ScrollReveal>

            {/* Roles */}
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg font-medium text-slate-600 dark:text-slate-300 mb-6">
                <span className="px-3 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/70 text-slate-800 dark:text-slate-200">
                  Researcher
                </span>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
                <span className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-300">
                  AI Content Creator
                </span>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
                <span className="px-3 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/70 text-slate-800 dark:text-slate-200">
                  Academic Strategist
                </span>
              </div>
            </ScrollReveal>

            {/* Profile Overview Sentence */}
            <ScrollReveal delay={0.2}>
              <p
                id="hero-profile-statement"
                className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-8 max-w-xl mx-auto lg:mx-0"
              >
                <a
                  href="https://www.indiafutureai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-900 dark:text-white underline decoration-emerald-500/60 decoration-2 underline-offset-4 hover:text-emerald-700 dark:hover:text-emerald-400 hover:decoration-emerald-600 transition-colors"
                  title="Visit IndiaFutureAI (indiafutureai.com)"
                >
                  IndiaFutureAI trained creator
                </a>{' '}
                with <strong className="font-semibold text-slate-900 dark:text-white">4+ years of experience</strong> blending AI-assisted research workflows, prompt engineering, and complex geopolitics/defence strategy to mentor future military officers and decode global strategic architectures.
              </p>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal delay={0.25}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <motion.a
                  id="hero-cta-video-work"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  href="#ai-portfolio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-[#FAF9F6] dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm hover:shadow active:scale-[0.99] min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                  <span>Top Video Work</span>
                  <ArrowDown className="w-4 h-4" />
                </motion.a>

                <motion.a
                  id="hero-cta-research"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  href="#research"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all shadow-2xs min-h-[44px]"
                >
                  <span>Selected Research</span>
                  <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
                </motion.a>

                <motion.a
                  id="hero-cta-whatsapp"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  href="https://wa.me/918219927881?text=Hello%20Jai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-xs min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>WhatsApp: 8219927881</span>
                </motion.a>
              </div>
            </ScrollReveal>

            {/* Quick Metrics Bar */}
            <ScrollReveal delay={0.3}>
              <div className="mt-10 grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">4.7M+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Reel Views</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">4+ Yrs</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Research &amp; Strategy</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">10+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Exam Clearances</div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: AI-Generated Display Picture Placeholder */}
          <div className="flex flex-col items-center shrink-0">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative group">
                {/* Outer soft ambient glow ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-slate-200 via-emerald-100 to-slate-300 dark:from-slate-800 dark:via-emerald-950/40 dark:to-slate-700 rounded-full blur-xs opacity-75 group-hover:opacity-100 transition-opacity" />
                
                {/* Circular Avatar Container */}
                <a
                  id="hero-circular-avatar-container"
                  href="https://drive.google.com/file/d/1HI-ciN7HbTqUG24JX1qyt2e0MF4rk7v9/preview"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View AI Portrait on Google Drive"
                  className="relative block w-52 h-52 sm:w-64 sm:h-64 rounded-full p-2 bg-white dark:bg-slate-900 shadow-md border border-slate-200/80 dark:border-slate-800 overflow-hidden cursor-pointer"
                >
                  <img
                    id="hero-display-picture"
                    src={avatarUrl || 'https://lh3.googleusercontent.com/d/1HI-ciN7HbTqUG24JX1qyt2e0MF4rk7v9'}
                    alt="Jai Bhardwaj - AI Display Picture"
                    className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback to high-res drive thumbnail if direct CDN url faces any restriction
                      const target = e.currentTarget;
                      if (!target.src.includes('thumbnail')) {
                        target.src = 'https://drive.google.com/thumbnail?id=1HI-ciN7HbTqUG24JX1qyt2e0MF4rk7v9&sz=w1000';
                      }
                    }}
                  />
                </a>

                {/* Status pill beneath avatar */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified Researcher</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

