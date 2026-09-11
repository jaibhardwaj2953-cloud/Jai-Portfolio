import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Film, Smartphone, Shield, Megaphone, Video, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShowcaseVideoSlot } from '../types';

interface VideoModalProps {
  slot: ShowcaseVideoSlot | null;
  onClose: () => void;
}

/**
 * Extracts the Google Drive file ID from a URL, link, or ID string
 */
function extractDriveFileId(urlOrInput?: string): string | null {
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
 * Resolves the Google Drive iframe link ending in /preview
 */
function getPreviewIframeUrl(slot: ShowcaseVideoSlot): string {
  if (slot.googleDriveUrl && slot.googleDriveUrl.includes('/preview')) {
    return slot.googleDriveUrl;
  }
  if (slot.customUrl && slot.customUrl.includes('/preview')) {
    return slot.customUrl;
  }
  const fileId = extractDriveFileId(slot.googleDriveUrl || slot.customUrl);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return slot.googleDriveUrl || slot.customUrl || '';
}

export const VideoModal: React.FC<VideoModalProps> = ({ slot, onClose }) => {
  const [playerMode, setPlayerMode] = useState<'embed' | 'drive'>('embed');

  // Reset to default embed player whenever slot changes
  useEffect(() => {
    if (slot) {
      setPlayerMode('embed');
    }
  }, [slot?.id]);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!slot) return null;

  const fileId = extractDriveFileId(slot.googleDriveUrl || slot.customUrl);
  const drivePreviewUrl = getPreviewIframeUrl(slot);
  const activeIframeSrc = playerMode === 'embed' && fileId ? `/embed/${fileId}` : drivePreviewUrl;
  const isVertical = slot.aspectRatio === '9:16';

  const getSlotIcon = (id: string) => {
    switch (id) {
      case 'ai-cinematic':
        return <Film className="w-4 h-4 text-emerald-400" />;
      case 'defense-geopolitics':
        return <Shield className="w-4 h-4 text-sky-400" />;
      case 'ad-video':
        return <Megaphone className="w-4 h-4 text-amber-400" />;
      default:
        return <Video className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div
        id="video-player-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="video-player-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative z-10 w-full flex flex-col bg-slate-950 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-auto ${
            isVertical ? 'max-w-md' : 'max-w-5xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-900/95 text-white">
            <div className="flex items-center gap-2.5 truncate">
              <span className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 shrink-0">
                {getSlotIcon(slot.id)}
              </span>
              <div className="truncate">
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {slot.tagline || slot.categoryTitle}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                  <span>{slot.badgeLabel}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    {isVertical ? (
                      <>
                        <Smartphone className="w-3 h-3 text-purple-400" />
                        <span>9:16 Reel</span>
                      </>
                    ) : (
                      <>
                        <Film className="w-3 h-3 text-emerald-400" />
                        <span>16:9 Cinema</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Controls & Mode Switcher */}
            <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
              {/* Optional Mode Toggle inside the Iframe */}
              {fileId && (
                <div className="flex items-center bg-slate-950/90 p-0.5 rounded-lg border border-slate-700/80 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setPlayerMode('embed')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                      playerMode === 'embed'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Direct Stream: instant playback, no buffer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Instant Player</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlayerMode('drive')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                      playerMode === 'drive'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Official Google Drive /preview embed"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Drive /preview</span>
                  </button>
                </div>
              )}

              <a
                href={slot.googleDriveUrl || slot.customUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                title="Open directly in Google Drive in a new tab"
              >
                <span>Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                id="close-video-modal-btn"
                type="button"
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
                title="Close Video Player (Esc)"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Video Player Display: Pure <iframe> player */}
          <div
            className={`w-full bg-black relative flex items-center justify-center ${
              isVertical
                ? 'h-[72vh] sm:h-[76vh] max-h-[720px] aspect-[9/16] mx-auto'
                : 'w-full aspect-video'
            }`}
          >
            {activeIframeSrc ? (
              <iframe
                key={`${slot.id}-${playerMode}`}
                id={`modal-video-iframe-${slot.id}`}
                src={activeIframeSrc}
                title={`${slot.categoryTitle} - Video Player`}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                Video player currently unavailable.
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/80 text-slate-300 text-xs sm:text-sm space-y-2.5">
            <p className="leading-relaxed text-slate-300">{slot.description}</p>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex flex-wrap gap-1.5">
                {slot.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={slot.googleDriveUrl || slot.customUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold"
              >
                <span>Open in Drive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
