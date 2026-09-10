import React, { useState } from 'react';
import {
  Mail,
  Instagram,
  HardDrive,
  ArrowUp,
  Sparkles,
  ExternalLink,
  Phone,
  MessageCircle,
  Copy,
  Check,
  ShieldCheck,
  Linkedin,
  Edit3,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  driveUrl: string;
  instagramUrl: string;
  linkedinUrl?: string;
  onOpenLinkedInModal?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  driveUrl,
  instagramUrl,
  linkedinUrl = 'https://www.linkedin.com/in/jai-bhardwaj/',
  onOpenLinkedInModal,
  theme = 'light',
  onToggleTheme,
}) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '8219927881';
  const formattedNumber = '+91 82199 27881';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    'Hello Jai, I came across your defence research & AI portfolio and would like to connect.'
  )}`;
  const telUrl = `tel:+91${phoneNumber}`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="bg-[#FAF9F6] dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 pt-16 pb-12 text-slate-600 dark:text-slate-400 transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Highlighted Direct Line / WhatsApp & Phone Contact Box */}
        <ScrollReveal delay={0.1}>
          <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-white border border-slate-700/80 shadow-lg relative overflow-hidden">
            {/* Subtle glow rings */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Direct Hotline &amp; Inquiry</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                  Get in Touch with Jai Bhardwaj
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Available for strategic research advisory, defence exam pedagogy, AI content collaborations, and geopolitical analysis.
                </p>
              </div>

              {/* Direct Phone & WhatsApp Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                {/* Number Display & Copy Button */}
                <div className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200">
                  <div className="flex items-center gap-2 text-xs">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono font-bold text-sm tracking-wide text-white">
                      {formattedNumber}
                    </span>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs flex items-center gap-1 transition-colors"
                    title="Copy Phone Number"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="text-[11px] font-medium">{copied ? 'Copied' : 'Copy'}</span>
                  </motion.button>
                </div>

                {/* WhatsApp Direct Chat Button */}
                <motion.a
                  id="footer-whatsapp-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>WhatsApp Chat</span>
                </motion.a>

                {/* Direct Call Button */}
                <motion.a
                  id="footer-call-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={telUrl}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call {phoneNumber}</span>
                </motion.a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer 4-Col Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-serif text-base font-semibold border border-slate-800 dark:border-slate-700">
                JB
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-base">
                  Jai Bhardwaj
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Researcher, AI Content Creator, Academic Strategist
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mb-6">
              Decoding global geopolitics, defence treaties, and officer examination strategies with modern AI-driven visual storytelling.
            </p>
            <div className="flex flex-wrap gap-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="https://www.indiafutureai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-medium border border-emerald-200/70 dark:border-emerald-800/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>IndiaFutureAI Trained Creator</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </motion.a>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-medium border border-rose-200/70 dark:border-rose-800/70">
                <span>Instagram (@defence.rev) – 4.7M+ Views</span>
              </div>
              <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-[#0A66C2] dark:text-sky-300 text-xs font-medium border border-sky-200/70 dark:border-sky-800/70">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 hover:underline"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </motion.a>
                {onOpenLinkedInModal && (
                  <button
                    type="button"
                    onClick={onOpenLinkedInModal}
                    className="p-1 rounded-full text-sky-700 dark:text-sky-400 hover:bg-sky-200/60 dark:hover:bg-sky-800/60 transition-colors"
                    title="Change LinkedIn Profile Link"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#profile"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors active:scale-95 inline-block"
                >
                  Profile &amp; Vision
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors active:scale-95 inline-block"
                >
                  Academic Experience
                </a>
              </li>
              <li>
                <a
                  href="#research"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors active:scale-95 inline-block"
                >
                  Selected Research Documents
                </a>
              </li>
              <li>
                <a
                  href="#ai-portfolio"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors active:scale-95 inline-block"
                >
                  Flagship Video Showcase
                </a>
              </li>
              <li>
                <a
                  href="#achievements"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors active:scale-95 inline-block"
                >
                  Achievements &amp; Clearances
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Direct Channels
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <motion.a
                  id="footer-whatsapp-link"
                  whileHover={{ x: 2 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">WhatsApp: {phoneNumber}</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  id="footer-phone-link"
                  whileHover={{ x: 2 }}
                  href={telUrl}
                  className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">Mobile: {formattedNumber}</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  id="footer-email-link"
                  whileHover={{ x: 2 }}
                  href="mailto:jai.bhardwaj2953@gmail.com"
                  className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">jai.bhardwaj2953@gmail.com</span>
                </motion.a>
              </li>
              <li>
                <div className="flex items-center justify-between gap-1 group">
                  <motion.a
                    id="footer-linkedin-link"
                    whileHover={{ x: 2 }}
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-[#0A66C2] dark:hover:text-sky-400 transition-colors truncate"
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2] dark:text-sky-400 shrink-0 fill-current" />
                    <span className="truncate">LinkedIn: Jai Bhardwaj</span>
                  </motion.a>
                  {onOpenLinkedInModal && (
                    <button
                      type="button"
                      onClick={onOpenLinkedInModal}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Update LinkedIn Profile URL"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </li>
              <li>
                <motion.a
                  id="footer-instagram-link"
                  whileHover={{ x: 2 }}
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Instagram: @defence.rev</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  id="footer-drive-link"
                  whileHover={{ x: 2 }}
                  href={driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
                >
                  <HardDrive className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>Google Drive Portfolio</span>
                </motion.a>
              </li>
            </ul>

            {onOpenLinkedInModal && (
              <div className="mt-4 p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/70 dark:border-sky-800/70">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] dark:text-sky-400 fill-current shrink-0" />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      LinkedIn Link
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenLinkedInModal}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0A66C2] dark:text-sky-400 hover:underline shrink-0"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Set Profile URL</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar with Theme Switch & Back to Top */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Jai Bhardwaj · All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            {onToggleTheme && (
              <ThemeToggle theme={theme} onToggle={onToggleTheme} showLabel />
            )}

            <motion.button
              id="back-to-top-btn"
              type="button"
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
};

