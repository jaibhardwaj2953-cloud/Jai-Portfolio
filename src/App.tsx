import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Experience } from './components/Experience';
import { ResearchSection } from './components/ResearchSection';
import { AiVideoPortfolio } from './components/AiVideoPortfolio';
import { Credentials } from './components/Credentials';
import { DocumentModal } from './components/DocumentModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { INITIAL_RESEARCH_PAPERS } from './data/initialData';
import { ResearchPaper } from './types';
import { getDocument } from './utils/storage';

const DRIVE_URL = 'https://drive.google.com/drive/folders/131fmioulZcwEphjt21zaJiTPZ5vcoawi';
const INSTAGRAM_URL = 'https://www.instagram.com/defence.rev/';
const LINKEDIN_URL = 'https://www.linkedin.com/in/jai-bhardwaj-470919108?utm_source=share_via&utm_content=profile&utm_medium=member_android';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('jai_portfolio_theme') as 'light' | 'dark') || 'light';
  });

  const [avatarUrl] = useState<string | null>(() => {
    return localStorage.getItem('jai_avatar_url') || null;
  });

  const [papers, setPapers] = useState<ResearchPaper[]>(INITIAL_RESEARCH_PAPERS);
  const [selectedPaperForReader, setSelectedPaperForReader] = useState<ResearchPaper | null>(null);

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

  // Load any previously archived research documents from IndexedDB on startup
  useEffect(() => {
    async function loadSavedDocuments() {
      try {
        const updatedPapers = await Promise.all(
          INITIAL_RESEARCH_PAPERS.map(async (paper) => {
            const saved = await getDocument(paper.id);
            if (saved) {
              return {
                ...paper,
                uploadedFile: {
                  name: saved.name,
                  size: saved.size,
                  type: saved.type,
                  uploadedAt: saved.uploadedAt,
                  dataUrl: saved.dataUrl,
                },
              };
            }
            return paper;
          })
        );
        setPapers(updatedPapers);
      } catch (err) {
        console.error('Failed to load documents from IndexedDB:', err);
      }
    }

    loadSavedDocuments();
  }, []);

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
          avatarUrl={avatarUrl}
          driveUrl={DRIVE_URL}
          instagramUrl={INSTAGRAM_URL}
          linkedinUrl={LINKEDIN_URL}
        />

        {/* 1. Profile & Focus (including Skills & Expertise with Generative AI stack) */}
        <Profile />

        {/* 2. Top Work Video Showcases (Highlighted on top right after Profile) */}
        <AiVideoPortfolio
          driveUrl={DRIVE_URL}
        />

        {/* 3. Selected Research */}
        <ResearchSection
          papers={papers}
          onOpenDocumentReader={(paper) => setSelectedPaperForReader(paper)}
        />

        {/* 4. Credentials, Clearances & Milestones */}
        <Credentials />

        {/* 5. Professional Experience */}
        <Experience />
      </main>

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
