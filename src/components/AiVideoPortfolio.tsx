import React, { useState, useEffect, useRef } from 'react';
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
  RotateCcw,
  X,
  Volume2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
}

export const AiVideoPortfolio: React.FC<AiVideoPortfolioProps> = ({ driveUrl }) => {
  const slots: ShowcaseVideoSlot[] = INITIAL_SHOWCASE_SLOTS;

  // Active in-card player slot ID
  const [activeInlineSlot, setActiveInlineSlot] = useState<string | null>(null);

  // Active theater modal slot for full distraction-free playback
  const [theaterSlot, setTheaterSlot] = useState<ShowcaseVideoSlot | null>(null);

  // Fallback to Google Drive iframe for a slot if native stream encounters an error
  const [useIframeFallback, setUseIframeFallback] = useState<Record<string, boolean>>({});

  // Ref to active inline video elements
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Close theater modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTheaterSlot(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleStartInlinePlay = (slotId: string) => {
    setActiveInlineSlot(slotId);
    // Auto-trigger video play when activated
    setTimeout(() => {
      const vid = videoRefs.current[slotId];
      if (vid) {
        vid.play().catch(() => {
          // If browser policy requires user gesture on muted video
        });
      }
    }, 50);
  };

  const handleStopInlinePlay = (slotId: string) => {
    const vid = videoRefs.current[slotId];
    if (vid) {
      vid.pause();
    }
    setActiveInlineSlot(null);
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
            const gdriveEmbedUrl = parseGoogleDriveEmbedUrl(slot.googleDriveUrl || slot.customUrl);
            const isVertical916 = slot.aspectRatio === '9:16';
            const driveTargetUrl = slot.googleDriveUrl || slot.customUrl || driveUrl;
            const isPlayingInline = activeInlineSlot === slot.id;
            const posterUrls = fileId ? getDrivePosterUrl(fileId) : null;
            const effectivePoster = posterUrls?.primary || slot.posterUrl;
            const isUsingIframe = useIframeFallback[slot.id];

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

                {/* Video Player Display Container */}
                <div className="px-5 sm:px-6 pb-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* VIDEO SURFACE */}
                    <div
                      className={`relative rounded-xl overflow-hidden bg-slate-950 shadow-md border border-slate-800/80 transition-all ${
                        isVertical916
                          ? 'aspect-[9/16] max-h-[500px] w-full max-w-[280px] sm:max-w-[300px] mx-auto'
                          : 'aspect-video w-full'
                      }`}
                    >
                      {isPlayingInline ? (
                        /* ACTIVE PLAYER (WITHOUT REDUNDANT POSTER ATTRIBUTE TO PREVENT MOBILE BROKEN IMAGE OVERLAY) */
                        <div className="relative w-full h-full flex items-center justify-center bg-black">
                          {isUsingIframe && gdriveEmbedUrl ? (
                            /* IFRAME FALLBACK PLAYER */
                            <iframe
                              id={`gdrive-iframe-${slot.id}`}
                              src={gdriveEmbedUrl}
                              title={`${slot.categoryTitle} - Direct Playback`}
                              className="w-full h-full border-0"
                              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                              allowFullScreen
                            />
                          ) : fileId ? (
                            /* HIGH-PERFORMANCE NATIVE HTML5 VIDEO STREAM */
                            <video
                              ref={(el) => {
                                videoRefs.current[slot.id] = el;
                              }}
                              id={`native-video-${slot.id}`}
                              controls
                              playsInline
                              autoPlay
                              preload="auto"
                              className="w-full h-full object-contain bg-black"
                              onError={() => {
                                // Fallback to Google Drive embed if native stream is restricted
                                setUseIframeFallback((prev) => ({ ...prev, [slot.id]: true }));
                              }}
                            >
                              <source src={`/api/video/${fileId}`} type="video/mp4" />
                              <source
                                src={`https://drive.usercontent.google.com/download?id=${fileId}&export=download`}
                                type="video/mp4"
                              />
                              Your browser does not support HTML5 video streaming.
                            </video>
                          ) : (
                            <div className="text-center p-4 text-xs text-slate-400">
                              No video source available
                            </div>
                          )}

                          {/* Quick In-Player Overlay Controls */}
                          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => setTheaterSlot(slot)}
                              title="Expand to Theater View"
                              className="p-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs backdrop-blur-xs border border-white/20 shadow-xs cursor-pointer transition-all"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStopInlinePlay(slot.id)}
                              title="Close Player & Return to Poster"
                              className="p-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs backdrop-blur-xs border border-white/20 shadow-xs cursor-pointer transition-all"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* CRISP PREVIEW POSTER WITH TACTILE PLAY BUTTON */
                        <div
                          id={`preview-screen-${slot.id}`}
                          onClick={() => handleStartInlinePlay(slot.id)}
                          className="relative w-full h-full group cursor-pointer overflow-hidden flex flex-col justify-between select-none"
                        >
                          {/* Poster Image */}
                          {effectivePoster ? (
                            <img
                              src={effectivePoster}
                              alt={slot.tagline || slot.categoryTitle}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (posterUrls) {
                                  if (!target.src.includes('thumbnail')) {
                                    target.src = posterUrls.direct;
                                  }
                                }
                              }}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
                          )}

                          {/* Cinematic Gradient Vignette Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 group-hover:via-black/20 transition-all duration-300" />

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

                            {/* Theater Quick Launch Icon */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setTheaterSlot(slot);
                              }}
                              title="Launch Theater Mode"
                              className="p-1.5 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-xs text-white/90 hover:text-white border border-white/15 transition-all shadow-xs cursor-pointer"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Center Tactile Play Button Interface */}
                          <div className="relative z-10 flex flex-col items-center justify-center p-4">
                            <motion.div
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.94 }}
                              className="relative flex items-center justify-center"
                            >
                              {/* Glowing pulse ring */}
                              <div className="absolute w-16 h-16 rounded-full bg-emerald-500/30 dark:bg-emerald-400/25 animate-ping opacity-60 pointer-events-none" />

                              {/* Main Button Surface */}
                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-700/95 dark:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/40 group-hover:bg-emerald-600 transition-colors">
                                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white translate-x-0.5" />
                              </div>
                            </motion.div>

                            {/* Label */}
                            <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-xs font-semibold border border-white/20 shadow-xs">
                              <span>Click to Play Video</span>
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
                      )}
                    </div>

                    {/* INTERACTIVE VIDEO CONTROL BAR */}
                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FAF9F6] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                      {/* Left Toggle: Play / Stop Button */}
                      {isPlayingInline ? (
                        <button
                          type="button"
                          onClick={() => handleStopInlinePlay(slot.id)}
                          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold transition-colors cursor-pointer text-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Close Player</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartInlinePlay(slot.id)}
                          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold transition-colors shadow-2xs cursor-pointer text-xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play Video</span>
                        </button>
                      )}

                      {/* Right Actions: Theater View & Direct Drive Vault */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setTheaterSlot(slot)}
                          className="inline-flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-2xs font-medium text-[11px] cursor-pointer"
                          title="Open full theater lightbox"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-300" />
                          <span>Theater</span>
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

      {/* 
        CINEMA THEATER / LIGHTBOX MODAL:
        Provides an expansive, clutter-free viewing experience optimized for each aspect ratio
      */}
      <AnimatePresence>
        {theaterSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTheaterSlot(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative z-10 w-full flex flex-col bg-slate-950 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-auto ${
                theaterSlot.aspectRatio === '9:16' ? 'max-w-md' : 'max-w-5xl'
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 text-white">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="p-1.5 rounded-md bg-slate-800 border border-slate-700">
                    {getSlotIcon(theaterSlot.id, true)}
                  </span>
                  <div className="truncate">
                    <h3 className="text-sm font-bold text-white truncate">
                      {theaterSlot.tagline || theaterSlot.categoryTitle}
                    </h3>
                    <span className="text-[11px] text-emerald-400 font-medium">
                      {theaterSlot.badgeLabel} •{' '}
                      {theaterSlot.aspectRatio === '9:16'
                        ? '9:16 Vertical Reel'
                        : '16:9 Cinema 4K'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={theaterSlot.googleDriveUrl || driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                  >
                    <span>Open in Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setTheaterSlot(null)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Close Theater (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Video Player Container - NO POSTER ATTRIBUTE to avoid Android Chrome broken image overlay */}
              <div
                className={`w-full bg-black relative flex items-center justify-center ${
                  theaterSlot.aspectRatio === '9:16'
                    ? 'h-[75vh] max-h-[680px] aspect-[9/16] mx-auto'
                    : 'w-full aspect-video'
                }`}
              >
                {extractDriveFileId(theaterSlot.googleDriveUrl || theaterSlot.customUrl) ? (
                  <video
                    controls
                    playsInline
                    autoPlay
                    preload="auto"
                    className="w-full h-full object-contain bg-black"
                  >
                    <source
                      src={`/api/video/${extractDriveFileId(
                        theaterSlot.googleDriveUrl || theaterSlot.customUrl
                      )}`}
                      type="video/mp4"
                    />
                    <source
                      src={`https://drive.usercontent.google.com/download?id=${extractDriveFileId(
                        theaterSlot.googleDriveUrl || theaterSlot.customUrl
                      )}&export=download`}
                      type="video/mp4"
                    />
                    Your browser does not support HTML5 video streaming.
                  </video>
                ) : parseGoogleDriveEmbedUrl(
                    theaterSlot.googleDriveUrl || theaterSlot.customUrl
                  ) ? (
                  <iframe
                    src={parseGoogleDriveEmbedUrl(
                      theaterSlot.googleDriveUrl || theaterSlot.customUrl
                    )!}
                    title={theaterSlot.categoryTitle}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    Video stream currently unavailable.
                  </div>
                )}
              </div>

              {/* Modal Footer Description */}
              <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/60 text-slate-300 text-xs sm:text-sm space-y-2">
                <p className="leading-relaxed">{theaterSlot.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {theaterSlot.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
