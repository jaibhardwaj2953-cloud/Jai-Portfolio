import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ExternalLink,
  Instagram,
  HardDrive,
  FileText,
  Award,
  Briefcase,
  User,
  Sparkles,
  Mail,
  Phone,
  MessageCircle,
  Linkedin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  driveUrl: string;
  instagramUrl: string;
  linkedinUrl?: string;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  driveUrl,
  instagramUrl,
  linkedinUrl = 'https://www.linkedin.com/in/jai-bhardwaj-470919108?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  theme = 'light',
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Profile', href: '#profile', icon: User },
    { name: 'AI Portfolio', href: '#ai-portfolio', icon: Sparkles },
    { name: 'Research', href: '#research', icon: FileText },
    { name: 'Achievements', href: '#achievements', icon: Award },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF9F6]/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Monogram & Title */}
          <motion.a
            id="nav-brand-link"
            href="#profile"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 group text-slate-900 dark:text-white"
          >
            <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-800 text-[#FAF9F6] dark:text-white flex items-center justify-center font-serif text-lg font-semibold tracking-wide shadow-xs border border-slate-700/50">
              JB
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Jai Bhardwaj
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">
                Researcher &amp; Strategist
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors relative py-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-emerald-600 dark:after:bg-emerald-400 after:transition-all after:duration-200 active:scale-95"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2.5">
            {onToggleTheme && (
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            )}

            <motion.a
              id="nav-cta-linkedin"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#0A66C2] dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-colors border border-sky-200 dark:border-sky-800/80"
              title="View LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5 fill-current text-[#0A66C2] dark:text-sky-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </motion.a>

            <motion.a
              id="nav-cta-drive"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              title="Open Google Drive AI Video Portfolio"
            >
              <HardDrive className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              <span>Drive</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </motion.a>

            <motion.a
              id="nav-cta-instagram"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-xs border border-slate-800 dark:border-slate-700"
              title="Visit @defence.rev on Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-300" />
              <span>@defence.rev</span>
            </motion.a>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {onToggleTheme && (
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            )}

            <motion.button
              id="nav-mobile-toggle-btn"
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#FAF9F6] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl transition-colors"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 font-medium text-base transition-colors active:scale-98"
                  >
                    <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>{link.name}</span>
                  </a>
                );
              })}

              {/* Direct WhatsApp Call banner in mobile drawer */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
                <a
                  href="https://wa.me/918219927881?text=Hello%20Jai"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-emerald-600 text-white shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>WhatsApp Jai: 8219927881</span>
                </a>

                <div className="grid grid-cols-3 gap-2 mt-1">
                  <a
                    id="mobile-drawer-linkedin-btn"
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-[#0A66C2] dark:text-sky-300 border border-sky-200 dark:border-sky-800/80"
                  >
                    <Linkedin className="w-3.5 h-3.5 fill-current" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    id="mobile-drawer-drive-btn"
                    href={driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    <HardDrive className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                    <span>Drive</span>
                  </a>

                  <a
                    id="mobile-drawer-insta-btn"
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-medium bg-slate-900 dark:bg-slate-800 text-white shadow-xs border border-slate-800 dark:border-slate-700"
                  >
                    <Instagram className="w-3.5 h-3.5 text-rose-300" />
                    <span>Insta</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

