import React, { useState } from 'react';
import {
  HardDrive,
  ExternalLink,
  Sparkles,
  Film,
  Video,
  Shield,
  Megaphone,
  Smartphone,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ShowcaseVideoSlot } from '../types';
import { INITIAL_SHOWCASE_SLOTS } from '../data/initialData';

/**
 * Extracts the embeddable Google Drive preview URL from any Google Drive link, file ID, or iframe tag
 */
export function parseGoogleDriveEmbedUrl(urlOrInput: string): string | null {
  if (!urlOrInput) return null;
  const trimmed = urlOrInput.trim();
  if (!trimmed) return null;

  // 1. If user pasted an iframe snippet like <iframe src="..." ...>
  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
  const target = iframeMatch ? iframeMatch[1] : trimmed;

  // 2. /file/d/FILE_ID/...
  const matchFileD = target.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    return `https://drive.google.com/file/d/${matchFileD[1]}/preview`;
  }

  // 3. /open?id=FILE_ID or /uc?id=FILE_ID or ?id=FILE_ID or &id=FILE_ID
  const matchIdParam = target.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam && matchIdParam[1]) {
    return `https://drive.google.com/file/d/${matchIdParam[1]}/preview`;
  }

  // 4. drive.google.com/.../preview
  if (target.includes('drive.google.com') && target.includes('/preview')) {
    return target;
  }

  // 5. Bare alphanumeric Google Drive file ID (usually 20+ characters)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(target)) {
    return `https://drive.google.com/file/d/${target}/preview`;
  }

  return null;
}

interface AiVideoPortfolioProps {
  driveUrl: string;
}

export const AiVideoPortfolio: React.FC<AiVideoPortfolioProps> = ({ driveUrl }) => {
  // Helper to persist Drive URL per slot if user saved one
  const getSlotStorageKey = (slotId: string): string => {
    if (slotId === 'ai-cinematic') return 'jai_cinematic_gdrive_url';
    if (slotId === 'defense-geopolitics') return 'jai_defense_gdrive_url';
    return 'jai_ad_gdrive_url';
  };

  // 3 Featured Video Showcase Slots:
  // 1. AI Cinematic (16:9 Landscape) - features locked-in Google Drive embed player
  // 2. Defense & Geopolitics (9:16 Vertical Reel) - features locked-in Google Drive embed player
  // 3. Commercial & AI Ad Video (9:16 Vertical Reel) - features locked-in Google Drive embed player
  const [slots] = useState<ShowcaseVideoSlot[]>(() => {
    return INITIAL_SHOWCASE_SLOTS.map((slot) => {
      const savedDriveUrl = localStorage.getItem(getSlotStorageKey(slot.id));
      if (savedDriveUrl) {
        return {
          ...slot,
          googleDriveUrl: savedDriveUrl,
        };
      }
      return slot;
    });
  });

  const getSlotIcon = (id: string) => {
    switch (id) {
      case 'ai-cinematic':
        return <Film className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
      case 'defense-geopolitics':
        return <Shield className="w-4 h-4 text-slate-800 dark:text-slate-300" />;
      case 'ad-video':
        return <Megaphone className="w-4 h-4 text-amber-700 dark:text-amber-400" />;
      default:
        return <Video className="w-4 h-4 text-slate-600 dark:text-slate-400" />;
    }
  };

  return (
    <section id="ai-portfolio" className="py-16 sm:py-24 border-b border-slate-200/70 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-emerald-200/70 dark:border-emerald-800/70">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Flagship Works · Video Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Top Work Video Showcases
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Curated high-definition cinematic productions and strategic defense video analyses. Featuring locked-in on-screen video presentations across widescreen <strong>AI Cinematic (16:9)</strong> and mobile-optimized <strong>Defense &amp; Commercial Reels (9:16)</strong>.
            </p>
          </div>

          {/* Master Action Link: Complete Google Drive Vault */}
          <div className="shrink-0 flex items-center gap-3">
            <motion.a
              id="ai-portfolio-main-drive-btn"
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-medium text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-2xs hover:shadow group"
            >
              <HardDrive className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Complete Google Drive Vault</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </motion.a>
          </div>
        </div>

        {/* 
          THREE DIRECT EMBEDDED VIDEO SHOWCASE CARDS:
          1. AI Cinematic (16:9 Landscape)
          2. Defense & Geopolitics (9:16 Vertical Reel)
          3. Commercial & AI Ad Video (9:16 Vertical Reel)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
          {slots.map((slot) => {
            const gdriveEmbedUrl = parseGoogleDriveEmbedUrl(
              slot.googleDriveUrl || (slot.customUrl?.includes('drive.google.com') ? slot.customUrl : '')
            );
            const activeVideoSrc = slot.customUrl;
            const isVertical916 = slot.aspectRatio === '9:16';
            const driveTargetUrl = slot.googleDriveUrl || driveUrl;

            return (
              <div
                key={slot.id}
                id={`showcase-slot-${slot.id}`}
                className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all duration-200 shadow-2xs hover:shadow-md overflow-hidden"
              >
                {/* Slot Header */}
                <div className="p-5 sm:p-6 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${slot.badgeColor}`}
                    >
                      {getSlotIcon(slot.id)}
                      <span>{slot.badgeLabel}</span>
                    </span>

                    {/* Aspect Ratio Badge */}
                    <div className="flex items-center gap-1.5">
                      {isVertical916 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                          <Smartphone className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          <span>9:16 Reel</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          <Film className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                          <span>16:9 Cinema</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {slot.categoryTitle}
                    </h3>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {slot.categoryNumber}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide mt-1 mb-2.5">
                    {slot.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {slot.description}
                  </p>
                </div>

                {/* Video Player Display */}
                <div className="px-5 sm:px-6 pb-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {gdriveEmbedUrl ? (
                      /* GOOGLE DRIVE EMBEDDED IFRAME PLAYER */
                      <div
                        className={`relative rounded-xl overflow-hidden bg-black shadow-md border border-slate-900/20 flex items-center justify-center ${
                          isVertical916
                            ? 'aspect-[9/16] max-h-[500px] w-full max-w-[280px] mx-auto'
                            : 'aspect-video w-full'
                        }`}
                      >
                        <iframe
                          id={`gdrive-iframe-${slot.id}`}
                          src={gdriveEmbedUrl}
                          title={`${slot.categoryTitle} - Direct Playback`}
                          className="w-full h-full border-0"
                          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      /* STREAM PLAYER */
                      <div
                        className={`relative rounded-xl overflow-hidden bg-black shadow-inner border border-slate-900/10 flex items-center justify-center ${
                          isVertical916
                            ? 'aspect-[9/16] max-h-[500px] w-full max-w-[280px] mx-auto'
                            : 'aspect-video w-full'
                        }`}
                      >
                        <video
                          id={`video-player-${slot.id}`}
                          src={activeVideoSrc}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Video Info Bar with direct Google Drive link */}
                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FAF9F6] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="truncate flex-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-100 truncate block">
                          {slot.tagline || slot.categoryTitle}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            {isVertical916 ? '9:16 Vertical HD' : '16:9 Widescreen HD'}
                          </span>
                        </div>
                      </div>

                      <a
                        href={driveTargetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors shadow-2xs font-medium text-[11px] shrink-0"
                        title="View high-resolution master file in Google Drive"
                      >
                        <span>Open in Drive</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-300" />
                      </a>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {slot.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-[#FAF9F6] dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 
          CENTRAL GOOGLE DRIVE AI VIDEO REPOSITORY VAULT 
        */}
        <div className="p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-white to-[#F8F9FA] dark:from-slate-900 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-2xs mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/70 dark:border-slate-800">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0 shadow-2xs">
                <HardDrive className="w-7 h-7 text-emerald-800 dark:text-emerald-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Central Cloud Media Repository</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Google Drive Master Video Archive
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono mt-1 truncate max-w-md sm:max-w-xl">
                  {driveUrl}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <motion.a
                id="ai-portfolio-banner-redirect-btn"
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-2xs shrink-0"
              >
                <span>Launch Google Drive Vault</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Highlights */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <div className="font-semibold text-slate-900 dark:text-white">4.7M+ Impressions</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Performance Tested</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <div className="font-semibold text-slate-900 dark:text-white">4K Master Files</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">High-Definition Vault</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <div className="font-semibold text-slate-900 dark:text-white">3D Geospatial Maps</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Tactical Overlays</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <div className="font-semibold text-slate-900 dark:text-white">Single Central Vault</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Always Synchronized</div>
            </div>
          </div>
        </div>

        {/* AI Content Creation Workflow */}
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>AI Content Creation Workflow</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <strong className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">1. Intelligence Extraction</strong>
              Structured prompt pipelines parse 50+ page defence whitepapers and multilateral pacts into concise narrative outlines.
            </div>
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <strong className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">2. Visual &amp; Spatial Animation</strong>
              Generative visual toolchains produce custom 3D geopolitical maps, radar vector graphics, and tactical battle orders.
            </div>
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <strong className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">3. Virality &amp; Retention Engineering</strong>
              Dynamic 9:16 vertical pacing optimized for Instagram reels, generating over 4.7 million cumulative impressions.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
