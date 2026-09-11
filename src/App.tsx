import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Experience } from './components/Experience';
import { ResearchSection } from './components/ResearchSection';
import { AiVideoPortfolio } from './components/AiVideoPortfolio';
import { Credentials } from './components/Credentials';
import { DocumentModal } from './components/DocumentModal';
import { VideoModal } from './components/VideoModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { INITIAL_RESEARCH_PAPERS } from './data/initialData';
import { ResearchPaper, ShowcaseVideoSlot } from './types';

const DRIVE_URL = 'https://drive.google.com/drive/folders/131fmioulZcwEphjt21zaJiTPZ5vcoawi';
const INSTAGRAM_URL = 'https://www.instagram.com/defence.rev/';
const LINKEDIN_URL = 'https://www.linkedin.com/in/jai-bhardwaj-470919108?utm_source=share_via&utm_content=profile&utm_medium=member_android';
const AI_AVATAR_IMAGE_URL = 'https://lh3.googleusercontent.com/d/1HI-ciN7HbTqUG24JX1qyt2e0MF4rk7v9';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('jai_portfolio_theme') as 'light' | 'dark') || 'light';
  });

  const [selectedPaperForReader, setSelectedPaperForReader] = useState<ResearchPaper | null>(null);
  const [selectedVideoForPlayer, setSelectedVideoForPlayer] = useState<ShowcaseVideoSlot | null>(null);

  // Sync dark class on document root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('jai_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-100 dark:selection:bg-emerald-950 selection:text-slate-900 dark:selection:text-emerald-300 transition-colors duration-200">
      
      {/* Navigation */}
      <Navbar
        driveUrl={DRIVE_URL}
        instagramUrl={INSTAGRAM_URL}
        linkedinUrl={LINKEDIN_URL}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Intro & Hero Header */}
        <Hero
          avatarUrl={AI_AVATAR_IMAGE_URL}
          driveUrl={DRIVE_URL}
          instagramUrl={INSTAGRAM_URL}
          linkedinUrl={LINKEDIN_URL}
        />

        {/* 1. Profile & Focus (including Skills & Expertise with Generative AI stack) */}
        <Profile />

        {/* 2. Top Work Video Showcases (Highlighted on top right after Profile) */}
        <AiVideoPortfolio
          driveUrl={DRIVE_URL}
          onOpenVideoPlayer={(slot) => setSelectedVideoForPlayer(slot)}
        />

        {/* 3. Selected Research */}
        <ResearchSection
          papers={INITIAL_RESEARCH_PAPERS}
          onOpenDocumentReader={(paper) => setSelectedPaperForReader(paper)}
        />

        {/* 4. Credentials, Clearances & Milestones */}
        <Credentials />

        {/* 5. Professional Experience */}
        <Experience />
      </main>

      {/* Video Player Modal (Full-Screen / Centered Google Drive /preview Player) */}
      <VideoModal
        slot={selectedVideoForPlayer}
        onClose={() => setSelectedVideoForPlayer(null)}
      />

      {/* Document Reader / Modal */}
      <DocumentModal
        paper={selectedPaperForReader}
        onClose={() => setSelectedPaperForReader(null)}
      />

      {/* Footer */}
      <Footer
        driveUrl={DRIVE_URL}
        instagramUrl={INSTAGRAM_URL}
        linkedinUrl={LINKEDIN_URL}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Floating Direct Contact Button */}
      <FloatingWhatsApp />
    </div>
  );
}
