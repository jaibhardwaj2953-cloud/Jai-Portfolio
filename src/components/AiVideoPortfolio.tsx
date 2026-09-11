import React from 'react';
import {
  HardDrive,
  ExternalLink,
  Sparkles,
  Film,
  Video,
  Shield,
  Megaphone,
  Smartphone,
  Play,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ShowcaseVideoSlot } from '../types';
import { INITIAL_SHOWCASE_SLOTS } from '../data/initialData';

/**
 * Extracts the Google Drive file ID from a URL, link, or ID string
 */
export function extractDriveFileId(urlOrInput?: string): string | null {
  if (!urlOrInput) return null;
  const trimmed = urlOrInput.trim();
  if (!trimmed) return null;

  const matchFileD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) return matchFileD[1];

  const matchIdParam = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam && matchIdParam[1]) return matchIdParam[1];

  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Returns direct Google Drive video viewing link (opens in new tab)
 */
export function getDriveDirectViewUrl(slot: ShowcaseVideoSlot, fallbackDriveUrl: string): string {
  const url = slot.googleDriveUrl || slot.customUrl;
  if (!url) return fallbackDriveUrl;
  const fileId = extractDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/view`;
  }
  return url;
}

/**
 * Generates reliable poster URLs with same-origin API proxy as primary
 * and public Google Drive thumbnail endpoints as fallback
 */
export function getDrivePosterUrl(fileId: string): { primary: string; fallback: string; direct: string } {
  return {
    primary: `/api/poster/${fileId}`,
    fallback: `https://lh3.googleusercontent.com/d/${fileId}=w1000`,
    direct: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
  };
}

interface AiVideoPortfolioProps {
  driveUrl: string;
}

export const AiVideoPortfolio: React.FC<AiVideoPortfolioProps> = ({ driveUrl }) => {
  const slots: ShowcaseVideoSlot[] = INITIAL_SHOWCASE_SLOTS;

  const getSlotIcon = (id: string, inDarkContext = false) => {
    switch (id) {
      case 'ai-cinematic':
        return <Film className={`w-4 h-4 ${inDarkContext ? 'text-emerald-400' : 'text-emerald-700 dark:text-emerald-400'}`} />;
      case 'defense-geopolitics':
        return <Shield className={`w-4 h-4 ${inDarkContext ? 'text-sky-400' : 'text-sky-700 dark:text-sky-400'}`} />;
      case 'ad-video':
        return <Megaphone className={`w-4 h-4 ${inDarkContext ? 'text-amber-400' : 'text-amber-700 dark:text-amber-400'}`} />;
      default:
        return <Video className={`w-4 h-4 ${inDarkContext ? 'text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`} />;
    }
  };

  return (
    <section
      id="ai-portfolio"
      className="py-16 sm:py-24 border-b border-slate-200/70 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40"
    >
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
              Curated high-definition cinematic productions and strategic defense video analyses. Featuring widescreen <strong>AI Cinematic (16:9)</strong> and vertical <strong>Defense &amp; Commercial Reels (9:16)</strong> with direct high-definition access in Google Drive.
            </p>
          </div>

          {/* Master Action Link: Complete Google Drive Vault */}
          <div className="w-full lg:w-auto shrink-0 flex items-center">
            <motion.a
              id="ai-portfolio-main-drive-btn"
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-medium text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-2xs hover:shadow group"
            >
              <HardDrive className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Complete Google Drive Vault</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </motion.a>
          </div>
        </div>

        {/* 
          THREE FEATURED VIDEO SHOWCASE CARDS:
          1. AI Cinematic (16:9 Landscape)
          2. Defense & Geopolitics (9:16 Vertical Reel)
          3. Commercial & AI Ad Video (9:16 Vertical Reel)
          All cards display clean static preview thumbnails and direct links to Google Drive
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
          {slots.map((slot) => {
            const fileId = extractDriveFileId(slot.googleDriveUrl || slot.customUrl);
            const isVertical916 = slot.aspectRatio === '9:16';
            const driveTargetUrl = getDriveDirectViewUrl(slot, driveUrl);
            const posterUrls = fileId ? getDrivePosterUrl(fileId) : null;
            const effectivePoster = posterUrls?.primary || slot.posterUrl;

            return (
              <div
                key={slot.id}
                id={`showcase-slot-${slot.id}`}
                className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all duration-200 shadow-2xs hover:shadow-md overflow-hidden group"
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

                {/* Video Static Preview Display Container */}
                <div className="px-5 sm:px-6 pb-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* STATIC PREVIEW THUMBNAIL - CLICKING REDIRECTS DIRECTLY TO GOOGLE DRIVE IN NEW TAB */}
                    <div
                      className={`relative rounded-xl overflow-hidden bg-slate-950 shadow-md border border-slate-800/80 transition-all ${
                        isVertical916
                          ? 'aspect-[9/16] max-h-[500px] w-full max-w-[280px] sm:max-w-[300px] mx-auto'
                          : 'aspect-video w-full'
                      }`}
                    >
                      <a
                        id={`preview-screen-${slot.id}`}
                        href={driveTargetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full h-full flex flex-col justify-between p-3 sm:p-3.5 overflow-hidden select-none group/poster cursor-pointer"
                        title={`Watch "${slot.categoryTitle}" (opens in a new tab)`}
                      >
                        {/* Static Preview Image (Thumbnail) */}
                        {effectivePoster ? (
                          <img
                            src={effectivePoster}
                            alt={slot.tagline || slot.categoryTitle}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/poster:scale-105"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (posterUrls && !target.src.includes('thumbnail')) {
                                target.src = posterUrls.direct;
                              }
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
                        )}

                        {/* Cinematic Gradient Vignette Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/60 group-hover/poster:via-black/15 transition-all duration-300" />

                        {/* Top Poster Badges */}
                        <div className="relative z-10 flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-[11px] font-semibold border border-white/15 shadow-xs">
                            {isVertical916 ? (
                              <>
                                <Smartphone className="w-3 h-3 text-purple-400" />
                                <span>9:16 Vertical Reel</span>
                              </>
                            ) : (
                              <>
                                <Film className="w-3 h-3 text-emerald-400" />
                                <span>16:9 Widescreen</span>
                              </>
                            )}
                          </span>

                          <span className="inline-flex items-center justify-center p-1.5 rounded-full bg-black/65 text-white/80 group-hover/poster:text-white border border-white/15 transition-all shadow-xs">
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>

                        {/* Center Tactile Play Button Interface - Perfectly Centered in Thumbnail */}
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none p-4">
                          <div className="relative flex items-center justify-center">
                            {/* Glowing pulse ring */}
                            <div className="absolute w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-emerald-500/30 dark:bg-emerald-400/25 animate-ping opacity-60 pointer-events-none" />

                            {/* Main Play Button Surface */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600/95 text-white flex items-center justify-center shadow-xl shadow-black/60 border border-white/30 group-hover/poster:bg-emerald-500 group-hover/poster:scale-105 transition-all">
                              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white translate-x-0.5" />
                            </div>
                          </div>

                          {/* Play Label: Clean "Play" */}
                          <div className="mt-3 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-xs font-semibold border border-white/20 shadow-md group-hover/poster:bg-emerald-900/90 group-hover/poster:border-emerald-400/40 transition-all">
                            <Play className="w-3 h-3 fill-current text-emerald-400" />
                            <span>Play</span>
                          </div>
                        </div>

                        {/* Bottom Info Strip - Tagline only (No timer/duration) */}
                        <div className="relative z-10 flex items-center text-white/95 text-xs mt-auto">
                          <span className="font-semibold block truncate drop-shadow-sm text-xs text-white/90">
                            {slot.tagline}
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* ACTION BAR: DIRECT REDIRECT BUTTONS */}
                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FAF9F6] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                      {/* Play Button: Directly opens video in new tab */}
                      <a
                        id={`play-video-btn-${slot.id}`}
                        href={driveTargetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold transition-colors shadow-2xs text-xs group/btn cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Play</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-80 group-hover/btn:opacity-100 transition-opacity" />
                      </a>

                      {/* Direct Google Drive File Link */}
                      <a
                        href={driveTargetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 py-2 px-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors shadow-2xs font-medium text-xs"
                        title="Open full master file in Google Drive in a new tab"
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
        <div className="p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-[#F8F9FA] dark:from-slate-900 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-2xs mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-slate-200/70 dark:border-slate-800">
            <div className="flex items-start gap-3.5 sm:gap-4 min-w-0 flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0 shadow-2xs mt-0.5 sm:mt-0">
                <HardDrive className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-800 dark:text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                  <span>Central Cloud Media Repository</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Google Drive Master Video Archive
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  Direct cloud archive hosting 4K cinematic renders, high-bitrate video master exports, and complete production assets.
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 flex sm:justify-end">
              <motion.a
                id="ai-portfolio-banner-redirect-btn"
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-2xs cursor-pointer text-center"
              >
                <span>Launch Google Drive Vault</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </motion.a>
            </div>
          </div>

          {/* Highlights */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 text-left">
              <div className="font-semibold text-slate-900 dark:text-white">4.7M+ Impressions</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Performance Tested</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 text-left">
              <div className="font-semibold text-slate-900 dark:text-white">4K Master Files</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">High-Definition Vault</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 text-left">
              <div className="font-semibold text-slate-900 dark:text-white">3D Geospatial Maps</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Tactical Overlays</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 text-left">
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
