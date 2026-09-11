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
  Play,
  Maximize2,
  Volume2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ShowcaseVideoSlot } from '../types';
import { INITIAL_SHOWCASE_SLOTS } from '../data/initialData';
import { VideoModal } from './VideoModal';

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
 * Extracts the embeddable Google Drive preview URL
 */
export function parseGoogleDriveEmbedUrl(urlOrInput?: string): string | null {
  if (!urlOrInput) return null;
  const fileId = extractDriveFileId(urlOrInput);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  if (urlOrInput.includes('drive.google.com') && urlOrInput.includes('/preview')) {
    return urlOrInput;
  }
  return null;
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
  onOpenVideoPlayer?: (slot: ShowcaseVideoSlot) => void;
}

export const AiVideoPortfolio: React.FC<AiVideoPortfolioProps> = ({ driveUrl, onOpenVideoPlayer }) => {
  const slots: ShowcaseVideoSlot[] = INITIAL_SHOWCASE_SLOTS;

  // Local state for modal popup if parent doesn't provide onOpenVideoPlayer
  const [internalModalSlot, setInternalModalSlot] = useState<ShowcaseVideoSlot | null>(null);

  const handleOpenPlayer = (slot: ShowcaseVideoSlot) => {
    if (onOpenVideoPlayer) {
      onOpenVideoPlayer(slot);
    } else {
      setInternalModalSlot(slot);
    }
  };

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
              Curated high-definition cinematic productions and strategic defense video analyses. Featuring smooth, immediate video playback across widescreen <strong>AI Cinematic (16:9)</strong> and vertical <strong>Defense &amp; Commercial Reels (9:16)</strong>.
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
          THREE FEATURED VIDEO SHOWCASE CARDS:
          1. AI Cinematic (16:9 Landscape)
          2. Defense & Geopolitics (9:16 Vertical Reel)
          3. Commercial & AI Ad Video (9:16 Vertical Reel)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
          {slots.map((slot) => {
            const fileId = extractDriveFileId(slot.googleDriveUrl || slot.customUrl);
            const isVertical916 = slot.aspectRatio === '9:16';
            const driveTargetUrl = slot.googleDriveUrl || slot.customUrl || driveUrl;
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

                {/* Video Player Display Container */}
                <div className="px-5 sm:px-6 pb-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* VIDEO SURFACE - CLICKING OPENS FULL-SCREEN / CENTERED MODAL */}
                    <div
                      className={`relative rounded-xl overflow-hidden bg-slate-950 shadow-md border border-slate-800/80 transition-all ${
                        isVertical916
                          ? 'aspect-[9/16] max-h-[500px] w-full max-w-[280px] sm:max-w-[300px] mx-auto'
                          : 'aspect-video w-full'
                      }`}
                    >
                      <div
                        id={`preview-screen-${slot.id}`}
                        onClick={() => handleOpenPlayer(slot)}
                        className="relative w-full h-full cursor-pointer overflow-hidden flex flex-col justify-between select-none group/poster"
                        title="Click to watch video in full player"
                      >
                        {/* Poster Image */}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 group-hover/poster:via-black/20 transition-all duration-300" />

                        {/* Top Poster Badges */}
                        <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-[11px] font-semibold border border-white/15 shadow-xs">
                            {isVertical916 ? (
                              <>
                                <Smartphone className="w-3 h-3 text-purple-400" />
                                <span>9:16 Vertical Reel</span>
                              </>
                            ) : (
                              <>
                                <Film className="w-3 h-3 text-emerald-400" />
                                <span>16:9 Widescreen 4K</span>
                              </>
                            )}
                          </span>

                          {/* Quick Launch Icon */}
                          <span
                            title="Watch in popup player"
                            className="p-1.5 rounded-full bg-black/65 group-hover/poster:bg-black/90 backdrop-blur-xs text-white/90 group-hover/poster:text-white border border-white/15 transition-all shadow-xs"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </span>
                        </div>

                        {/* Center Tactile Play Button Interface */}
                        <div className="relative z-10 flex flex-col items-center justify-center p-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.94 }}
                            className="relative flex items-center justify-center"
                          >
                            {/* Glowing pulse ring */}
                            <div className="absolute w-16 h-16 rounded-full bg-emerald-500/30 dark:bg-emerald-400/25 animate-ping opacity-60 pointer-events-none" />

                            {/* Main Button Surface */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-700/95 dark:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/40 group-hover/poster:bg-emerald-600 transition-colors">
                              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white translate-x-0.5" />
                            </div>
                          </motion.div>

                          {/* Label */}
                          <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-xs font-semibold border border-white/20 shadow-xs group-hover/poster:bg-emerald-950/80 group-hover/poster:border-emerald-400/30 transition-all">
                            <span>Click to Watch Video</span>
                          </div>
                        </div>

                        {/* Bottom Info Strip */}
                        <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between text-white/90 text-xs">
                          <div className="truncate max-w-[70%]">
                            <span className="font-semibold block truncate drop-shadow-xs">
                              {slot.tagline}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300 shrink-0 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-2xs border border-white/10">
                            <Volume2 className="w-3 h-3 text-emerald-400" />
                            <span>{slot.duration || 'HD Master'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* INTERACTIVE VIDEO ACTION BAR */}
                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FAF9F6] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                      {/* Left: Play Video Button (Opens Modal) */}
                      <button
                        id={`play-video-btn-${slot.id}`}
                        type="button"
                        onClick={() => handleOpenPlayer(slot)}
                        className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold transition-colors shadow-2xs cursor-pointer text-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Play Video</span>
                      </button>

                      {/* Right Actions: Popup Player & Direct Drive HD Vault */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenPlayer(slot)}
                          className="inline-flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-2xs font-medium text-[11px] cursor-pointer"
                          title="Open full video player popup"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-300" />
                          <span>Popup</span>
                        </button>

                        <a
                          href={driveTargetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors shadow-2xs font-medium text-[11px]"
                          title="Open master high-resolution file in Google Drive"
                        >
                          <span>Drive HD</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-300" />
                        </a>
                      </div>
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

      {/* Fallback Video Player Modal (if triggered internally) */}
      <VideoModal
        slot={internalModalSlot}
        onClose={() => setInternalModalSlot(null)}
      />
    </section>
  );
};
