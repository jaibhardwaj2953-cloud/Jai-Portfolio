export interface ResearchPaper {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  abstract: string;
  keyPoints: string[];
  initialExcerpt: string;
  uploadedFile?: {
    name: string;
    size: number;
    type: string;
    uploadedAt: string;
    dataUrl?: string;
  };
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  nature: string;
  period: string;
  description: string;
  responsibilities: string[];
  tags: string[];
}

export interface CredentialItem {
  id: string;
  exam: string;
  fullName: string;
  clearanceCount: string;
  organization: string;
  badgeColor: string;
  description: string;
  isAiCertified?: boolean;
  url?: string;
  linkText?: string;
}

export interface VideoProject {
  id: string;
  title: string;
  topic: string;
  viewsEstimate: string;
  drivePath?: string;
  duration: string;
  description: string;
  tags: string[];
}

export interface ShowcaseVideoSlot {
  id: 'ai-cinematic' | 'defense-geopolitics' | 'ad-video';
  categoryNumber: string;
  categoryTitle: string;
  badgeLabel: string;
  badgeColor: string;
  tagline: string;
  description: string;
  tags: string[];
  aspectRatio: '16:9' | '9:16';
  uploadedVideo?: {
    name: string;
    size: number;
    type: string;
    url: string;
    uploadedAt: string;
  };
  customUrl?: string;
  googleDriveUrl?: string;
  instagramReelUrl?: string;
  isViralReel?: boolean;
}
