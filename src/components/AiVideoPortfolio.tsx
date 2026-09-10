import React, { useState, useRef } from 'react';
import {
  HardDrive,
  ExternalLink,
  Sparkles,
  Edit3,
  Check,
  Link as LinkIcon,
  UploadCloud,
  Film,
  Play,
  Trash2,
  Video,
  Shield,
  Megaphone,
  RefreshCw,
  Instagram,
  Flame,
  Smartphone,
  CheckCircle2,
  Info,
  X,
  Copy,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoProject, ShowcaseVideoSlot } from '../types';
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

  // 5. Bare alphanumeric Google Drive file ID (usually 25-45 characters)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(target)) {
    return `https://drive.google.com/file/d/${target}/preview`;
  }

  return null;
}

interface AiVideoPortfolioProps {
  driveUrl: string;
  onUpdateDriveUrl: (newUrl: string) => void;
  videos?: VideoProject[];
  instagramUrl?: string;
  onUpdateInstagramUrl?: (newUrl: string) => void;
  viralReelUrl?: string;
  onUpdateViralReelUrl?: (newUrl: string) => void;
}

export const AiVideoPortfolio: React.FC<AiVideoPortfolioProps> = ({
  driveUrl,
  onUpdateDriveUrl,
  instagramUrl = 'https://www.instagram.com/defence.rev/',
  onUpdateInstagramUrl,
  viralReelUrl = 'https://www.instagram.com/defence.rev/',
  onUpdateViralReelUrl,
}) => {
  const [isEditingDriveLink, setIsEditingDriveLink] = useState(false);
  const [tempDriveUrl, setTempDriveUrl] = useState(driveUrl);

  // Helper to persist Drive URL per slot
  const getSlotStorageKey = (slotId: string): string => {
    if (slotId === 'ai-cinematic') return 'jai_cinematic_gdrive_url';
    if (slotId === 'defense-geopolitics') return 'jai_defense_gdrive_url';
    return 'jai_ad_gdrive_url';
  };

  // Google Drive Iframe Embed Dedicated Modal
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [driveModalInput, setDriveModalInput] = useState('');
  const [driveModalTargetSlotId, setDriveModalTargetSlotId] = useState<string>('ai-cinematic');
  const [embedNotification, setEmbedNotification] = useState<string | null>(null);

  // 3 Featured Video Showcase Slots:
  // 1. AI Cinematic (16:9 Landscape) - features Google Drive iframe embedded playback
  // 2. Defense & Geopolitics (9:16 Vertical Reel) - features Google Drive iframe embedded playback
  // 3. Commercial & AI Ad Video (9:16 Vertical Reel) - features Google Drive iframe embedded playback
  const [slots, setSlots] = useState<ShowcaseVideoSlot[]>(() => {
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

  const [editingUrlSlotId, setEditingUrlSlotId] = useState<string | null>(null);
  const [urlInputMode, setUrlInputMode] = useState<'gdrive' | 'video'>('gdrive');
  const [urlInputText, setUrlInputText] = useState('');
  const [dragOverSlotId, setDragOverSlotId] = useState<string | null>(null);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const showNotification = (msg: string) => {
    setEmbedNotification(msg);
    setTimeout(() => {
      setEmbedNotification(null);
    }, 3500);
  };

  const handleSaveDriveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempDriveUrl.trim()) {
      onUpdateDriveUrl(tempDriveUrl.trim());
      setIsEditingDriveLink(false);
    }
  };

  const handleFileChange = (slotId: string, file: File) => {
    if (!file) return;

    // Revoke previous object URL if any
    const existing = slots.find((s) => s.id === slotId)?.uploadedVideo;
    if (existing?.url && existing.url.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(existing.url);
      } catch (err) {
        console.error('Error revoking URL:', err);
      }
    }

    const objectUrl = URL.createObjectURL(file);
    const now = new Date();
    const timeStr = `${now.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at ${now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;

    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            uploadedVideo: {
              name: file.name,
              size: file.size,
              type: file.type || 'video/mp4',
              url: objectUrl,
              uploadedAt: timeStr,
            },
          };
        }
        return slot;
      })
    );
    showNotification('Video file uploaded successfully');
  };

  const handleDragOver = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlotId(slotId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlotId(null);
  };

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlotId(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileChange(slotId, file);
    }
  };

  const handleRemoveVideo = (slotId: string) => {
    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          if (slot.uploadedVideo?.url && slot.uploadedVideo.url.startsWith('blob:')) {
            try {
              URL.revokeObjectURL(slot.uploadedVideo.url);
            } catch (err) {
              console.error(err);
            }
          }
          const key = getSlotStorageKey(slot.id);
          localStorage.removeItem(key);
          return {
            ...slot,
            uploadedVideo: undefined,
            customUrl: undefined,
            googleDriveUrl: undefined,
          };
        }
        return slot;
      })
    );
    showNotification('Video cleared from showcase');
  };

  const handleSaveSlotUrl = (slotId: string) => {
    if (!urlInputText.trim()) return;

    if (urlInputMode === 'gdrive') {
      const embedUrl = parseGoogleDriveEmbedUrl(urlInputText.trim());
      if (embedUrl) {
        setSlots((prev) =>
          prev.map((slot) => {
            if (slot.id === slotId) {
              return {
                ...slot,
                googleDriveUrl: embedUrl,
                customUrl: undefined,
              };
            }
            return slot;
          })
        );
        const key = getSlotStorageKey(slotId);
        localStorage.setItem(key, embedUrl);
        setEditingUrlSlotId(null);
        setUrlInputText('');
        showNotification('Google Drive embedded player configured successfully');
        return;
      }
    }

    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            customUrl: urlInputText.trim(),
            uploadedVideo: undefined,
          };
        }
        return slot;
      })
    );
    setEditingUrlSlotId(null);
    setUrlInputText('');
    showNotification('Showcase link updated');
  };

  const handleSaveModalDriveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveModalInput.trim()) return;

    const embedUrl = parseGoogleDriveEmbedUrl(driveModalInput.trim());
    if (embedUrl) {
      setSlots((prev) =>
        prev.map((slot) => {
          if (slot.id === driveModalTargetSlotId) {
            return {
              ...slot,
              googleDriveUrl: embedUrl,
              customUrl: undefined,
            };
          }
          return slot;
        })
      );
      const key = getSlotStorageKey(driveModalTargetSlotId);
      localStorage.setItem(key, embedUrl);
      setIsDriveModalOpen(false);
      const targetSlot = slots.find((s) => s.id === driveModalTargetSlotId);
      showNotification(`Google Drive video embedded for ${targetSlot?.categoryTitle || 'showcase'}!`);
    } else {
      alert(
        'Please enter a valid Google Drive video link or File ID.\nExample: https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing'
      );
    }
  };

  const openDriveEmbedModal = (slotId: string = 'ai-cinematic') => {
    setDriveModalTargetSlotId(slotId);
    const existing = slots.find((s) => s.id === slotId)?.googleDriveUrl || '';
    setDriveModalInput(existing);
    setIsDriveModalOpen(true);
  };

  const getSlotIcon = (id: string) => {
    switch (id) {
      case 'ai-cinematic':
        return <Film className="w-4 h-4 text-emerald-700" />;
      case 'defense-geopolitics':
        return <Shield className="w-4 h-4 text-slate-800" />;
      case 'ad-video':
        return <Megaphone className="w-4 h-4 text-amber-700" />;
      default:
        return <Video className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <section id="ai-portfolio" className="py-16 sm:py-24 border-b border-slate-200/70 bg-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wider uppercase mb-3 border border-emerald-200/70">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Flagship Works · Video Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Top Work Video Showcases
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              High-definition video showcases with responsive Google Drive embedded players for direct on-screen playback across all formats: <strong>AI Cinematic (16:9 Landscape)</strong>, <strong>Defense &amp; Geopolitics (9:16 Vertical Reel)</strong>, and <strong>Commercial &amp; AI Ad Video (9:16 Vertical Reel)</strong>.
            </p>
          </div>

          {/* Master Action Links: Complete Google Drive Vault & Direct Screen Indicator */}
          <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>3 Google Drive Direct Screen Players</span>
            </div>

            <a
              id="ai-portfolio-main-drive-btn"
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900 text-white font-medium text-xs sm:text-sm hover:bg-slate-800 transition-all shadow-2xs hover:shadow active:scale-[0.99] group"
            >
              <HardDrive className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Complete Google Drive Vault</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* 
          THREE DIRECT VIDEO SECTIONS:
          1. AI Cinematic (16:9 Landscape) - Google Drive Iframe Direct Screen Embed
          2. Defense & Geopolitics (9:16 Vertical Reel)
          3. Commercial & AI Ad Video (9:16 Vertical Reel)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
          {slots.map((slot) => {
            const gdriveEmbedUrl = parseGoogleDriveEmbedUrl(
              slot.googleDriveUrl || (slot.customUrl?.includes('drive.google.com') ? slot.customUrl : '')
            );
            const activeVideoSrc = slot.uploadedVideo?.url || slot.customUrl;
            const hasActiveVideo = !!activeVideoSrc;
            const isDragging = dragOverSlotId === slot.id;
            const isEditingUrl = editingUrlSlotId === slot.id;
            const isVertical916 = slot.aspectRatio === '9:16';

            return (
              <div
                key={slot.id}
                id={`showcase-slot-${slot.id}`}
                className={`flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 shadow-2xs hover:shadow-md overflow-hidden ${
                  isDragging
                    ? 'border-emerald-500 ring-2 ring-emerald-100 bg-emerald-50/20'
                    : 'border-slate-200/90 dark:border-slate-800'
                }`}
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

                    {/* Aspect Ratio Badge & Embed Type */}
                    <div className="flex items-center gap-1.5">
                      {gdriveEmbedUrl && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          <span>Drive Active</span>
                        </span>
                      )}
                      {isVertical916 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                          <Smartphone className="w-3 h-3 text-purple-600" />
                          <span>9:16 Reel</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                          <Film className="w-3 h-3 text-slate-500" />
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

                {/* Video Player & Upload Zone (Responsive 9:16 vs 16:9) */}
                <div className="px-5 sm:px-6 pb-5 flex-1 flex flex-col justify-between">
                  {gdriveEmbedUrl ? (
                    /* 1. GOOGLE DRIVE IFRAME EMBEDDED PLAYER (Direct Screen Playback) */
                    <div className="space-y-3">
                      <div
                        className={`relative rounded-xl overflow-hidden bg-black shadow-md border border-slate-900/20 group/video flex items-center justify-center ${
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

                      {/* Google Drive Video Info & Control Bar */}
                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FAF9F6] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                        <div className="truncate flex-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-100 truncate block">
                            {slot.tagline || slot.categoryTitle}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                              Google Drive Direct Player
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {isVertical916 ? '9:16 HD' : '16:9 HD'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => openDriveEmbedModal(slot.id)}
                            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-emerald-800 hover:border-emerald-300 transition-colors shadow-2xs"
                            title="Change Google Drive video"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={slot.googleDriveUrl || gdriveEmbedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-emerald-800 hover:border-emerald-300 transition-colors shadow-2xs"
                            title="Open in Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleRemoveVideo(slot.id)}
                            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 hover:text-rose-600 hover:border-rose-300 transition-colors shadow-2xs"
                            title="Remove video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : hasActiveVideo ? (
                    /* 2. HTML5 NATIVE VIDEO PLAYER FALLBACK */
                    <div className="space-y-3">
                      <div
                        className={`relative rounded-xl overflow-hidden bg-black shadow-inner border border-slate-900/10 group/video flex items-center justify-center ${
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

                      {/* Video Info Bar */}
                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#FAF9F6] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                        <div className="truncate flex-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-100 truncate block">
                            {slot.uploadedVideo?.name || (isVertical916 ? '9:16 Vertical Video' : '16:9 Cinematic Video')}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {slot.uploadedVideo
                              ? `${formatFileSize(slot.uploadedVideo.size)} • ${slot.uploadedVideo.uploadedAt}`
                              : isVertical916
                              ? '9:16 Video Stream'
                              : '16:9 Widescreen Stream'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => openDriveEmbedModal(slot.id)}
                            className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold text-[11px] hover:bg-emerald-100 transition-colors inline-flex items-center gap-1"
                            title="Switch to Google Drive embedded player"
                          >
                            <HardDrive className="w-3 h-3" />
                            <span>Embed Drive</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[slot.id]?.click()}
                            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-emerald-800 hover:border-emerald-300 transition-colors shadow-2xs"
                            title="Replace video file"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveVideo(slot.id)}
                            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 hover:text-rose-600 hover:border-rose-300 transition-colors shadow-2xs"
                            title="Remove video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* 3. DEDICATED GOOGLE DRIVE EMBED PROMPT (FOR ALL 3 SLOTS) */
                    <div
                      className={`relative rounded-xl border-2 border-dashed border-emerald-300 dark:border-emerald-700/70 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-slate-900 p-6 flex flex-col items-center justify-center text-center transition-all ${
                        isVertical916
                          ? 'aspect-[9/16] max-h-[500px] w-full max-w-[280px] mx-auto'
                          : 'aspect-video w-full'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center mb-3 shadow-md">
                        <HardDrive className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                        Embed Google Drive Video
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs mb-4">
                        {isVertical916
                          ? 'Plays directly on screen with responsive 9:16 vertical player.'
                          : 'Plays directly on screen with responsive 16:9 widescreen player.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => openDriveEmbedModal(slot.id)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                      >
                        <HardDrive className="w-3.5 h-3.5" />
                        <span>Embed Drive Video</span>
                      </button>
                    </div>
                  )}

                  {/* Hidden Native File Input */}
                  <input
                    ref={(el) => {
                      fileInputRefs.current[slot.id] = el;
                    }}
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(slot.id, e.target.files[0]);
                      }
                    }}
                  />

                  {/* Direct Action Link Controls: Primary Google Drive Embed button & Drive link */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => openDriveEmbedModal(slot.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold transition-colors"
                      title="Embed Google Drive video to play directly on screen"
                    >
                      <HardDrive className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span>{gdriveEmbedUrl ? 'Change Drive Video' : 'Embed Drive Video'}</span>
                    </button>

                    {gdriveEmbedUrl ? (
                      <a
                        href={slot.googleDriveUrl || gdriveEmbedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium transition-colors"
                      >
                        <span>Open in Drive</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingUrlSlotId(slot.id);
                          setUrlInputMode('gdrive');
                          setUrlInputText(slot.googleDriveUrl || slot.customUrl || '');
                        }}
                        className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors inline-flex items-center gap-1"
                      >
                        <LinkIcon className="w-3 h-3 text-slate-400" />
                        <span>Direct Link</span>
                      </button>
                    )}
                  </div>

                  {/* Inline URL Input Box if toggled */}
                  {isEditingUrl && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-slate-700 dark:text-slate-200">
                          {urlInputMode === 'gdrive'
                            ? 'Google Drive Video Link:'
                            : 'Direct Video Stream URL:'}
                        </div>
                        <div className="flex gap-1 text-[10px]">
                          <button
                            type="button"
                            onClick={() => {
                              setUrlInputMode('gdrive');
                              setUrlInputText(slot.googleDriveUrl || '');
                            }}
                            className={`px-2 py-0.5 rounded ${
                              urlInputMode === 'gdrive'
                                ? 'bg-emerald-800 text-white font-semibold'
                                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                            }`}
                          >
                            Drive Link
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setUrlInputMode('video');
                              setUrlInputText(slot.customUrl || '');
                            }}
                            className={`px-2 py-0.5 rounded ${
                              urlInputMode === 'video'
                                ? 'bg-slate-900 text-white'
                                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                            }`}
                          >
                            MP4 URL
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={
                            urlInputMode === 'gdrive'
                              ? 'https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing'
                              : 'https://... (MP4 or video link)'
                          }
                          value={urlInputText}
                          onChange={(e) => setUrlInputText(e.target.value)}
                          className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveSlotUrl(slot.id)}
                          className="px-3 py-1.5 bg-emerald-800 text-white rounded-lg font-medium hover:bg-emerald-900"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingUrlSlotId(null)}
                          className="px-2 py-1.5 text-slate-500 hover:text-slate-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Secondary File Upload / Direct Link footer */}
                  {!isEditingUrl && (
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[slot.id]?.click()}
                        className="font-medium text-emerald-800 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                      >
                        <UploadCloud className="w-3 h-3" />
                        <span>{hasActiveVideo ? 'Replace local file' : 'Upload local video'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openDriveEmbedModal(slot.id)}
                        className="hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
                      >
                        <HardDrive className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                        <span>Configure Embed</span>
                      </button>
                    </div>
                  )}

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
        <div className="p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-white to-[#F8F9FA] border border-slate-200/90 shadow-2xs mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/70">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
                <HardDrive className="w-7 h-7 text-emerald-800" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Central Cloud Media Repository</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Google Drive Master Video Archive
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1 truncate max-w-md sm:max-w-xl">
                  {driveUrl}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                id="ai-portfolio-banner-redirect-btn"
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all shadow-2xs shrink-0 active:scale-[0.99]"
              >
                <span>Launch Google Drive Vault</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsEditingDriveLink(!isEditingDriveLink)}
                className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingDriveLink ? 'Close Editor' : 'Edit Drive URL'}</span>
              </button>
            </div>
          </div>

          {/* Drive URL Inline Editor if toggled */}
          {isEditingDriveLink && (
            <form
              onSubmit={handleSaveDriveUrl}
              className="mt-5 p-4 rounded-xl bg-white border border-emerald-300 shadow-xs flex flex-col sm:flex-row items-center gap-3"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 shrink-0">
                <LinkIcon className="w-4 h-4 text-emerald-600" />
                <span>Drive URL:</span>
              </div>
              <input
                type="url"
                value={tempDriveUrl}
                onChange={(e) => setTempDriveUrl(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
                className="flex-1 w-full text-xs font-mono px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-[#FAF9F6]"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800 transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Link</span>
              </button>
            </form>
          )}

          {/* Highlights */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80">
              <div className="font-semibold text-slate-900">4.7M+ Impressions</div>
              <div className="text-slate-500 text-[11px] mt-0.5">Performance Tested</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80">
              <div className="font-semibold text-slate-900">4K Master Files</div>
              <div className="text-slate-500 text-[11px] mt-0.5">High-Definition Vault</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80">
              <div className="font-semibold text-slate-900">3D Geospatial Maps</div>
              <div className="text-slate-500 text-[11px] mt-0.5">Tactical Overlays</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80">
              <div className="font-semibold text-slate-900">Single Central Vault</div>
              <div className="text-slate-500 text-[11px] mt-0.5">Always Synchronized</div>
            </div>
          </div>
        </div>

        {/* AI Content Creation Workflow */}
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>AI Content Creation Workflow</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80">
              <strong className="block font-semibold text-slate-800 mb-1">1. Intelligence Extraction</strong>
              Structured prompt pipelines parse 50+ page defence whitepapers and multilateral pacts into concise narrative outlines.
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80">
              <strong className="block font-semibold text-slate-800 mb-1">2. Visual &amp; Spatial Animation</strong>
              Generative visual toolchains produce custom 3D geopolitical maps, radar vector graphics, and tactical battle orders.
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80">
              <strong className="block font-semibold text-slate-800 mb-1">3. Virality &amp; Retention Engineering</strong>
              Dynamic 9:16 vertical pacing optimized for Instagram reels, generating over 4.7 million cumulative impressions.
            </div>
          </div>
        </div>

      </div>

      {/* 
        GOOGLE DRIVE EMBED MODAL (Direct Screen Playback)
      */}
      <AnimatePresence>
        {isDriveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-7 text-left"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
                    <HardDrive className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Embed Google Drive Video
                      </h3>
                      {driveModalTargetSlotId && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                          {slots.find((s) => s.id === driveModalTargetSlotId)?.aspectRatio}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {driveModalTargetSlotId ? (
                        <>Target: <strong>{slots.find((s) => s.id === driveModalTargetSlotId)?.categoryTitle}</strong> · Plays directly on screen</>
                      ) : (
                        'Plays directly on screen using responsive Google Drive iframe embedding'
                      )}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDriveModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveModalDriveUrl} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Google Drive Video Link, File ID, or Embed Code:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={driveModalInput}
                      onChange={(e) => setDriveModalInput(e.target.value)}
                      placeholder="https://drive.google.com/file/d/1A2b3C.../view?usp=sharing"
                      className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      autoFocus
                      required
                    />
                  </div>
                </div>

                {/* Real-time Link Detection Preview */}
                {driveModalInput.trim() && (
                  <div>
                    {parseGoogleDriveEmbedUrl(driveModalInput) ? (
                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Valid Google Drive Video detected!</span>
                          <p className="text-[11px] font-mono mt-0.5 opacity-90 truncate">
                            Preview embed URL: {parseGoogleDriveEmbedUrl(driveModalInput)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
                        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Paste a Google Drive share link (e.g. drive.google.com/file/d/...)</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Instructions Guide */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>How to embed any Google Drive video:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] pl-1 text-slate-600 dark:text-slate-400">
                    <li>Open your video in Google Drive</li>
                    <li>
                      Click <strong>Share</strong> and set General access to{' '}
                      <strong>"Anyone with the link can view"</strong>
                    </li>
                    <li>Copy the link and paste it into the box above</li>
                  </ol>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsDriveModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save &amp; Embed Video</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {embedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{embedNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
