import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Experience } from './components/Experience';
import { ResearchSection } from './components/ResearchSection';
import { AiVideoPortfolio } from './components/AiVideoPortfolio';
import { Credentials } from './components/Credentials';
import { DocumentModal } from './components/DocumentModal';
import { LinkedInModal } from './components/LinkedInModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { INITIAL_RESEARCH_PAPERS, INITIAL_AI_VIDEOS } from './data/initialData';
import { ResearchPaper } from './types';
import { saveDocument, getDocument, deleteDocument } from './utils/storage';

const DEFAULT_DRIVE_URL = 'https://drive.google.com/drive/folders/1JaiBhardwajAIVideoPortfolio';
const DEFAULT_INSTAGRAM_URL = 'https://www.instagram.com/defence.rev/';
const DEFAULT_VIRAL_REEL_URL = 'https://www.instagram.com/defence.rev/';
const DEFAULT_LINKEDIN_URL = 'https://www.linkedin.com/in/jai-bhardwaj/';

export default function App() {
  const [driveUrl, setDriveUrl] = useState<string>(() => {
    return localStorage.getItem('jai_drive_url') || DEFAULT_DRIVE_URL;
  });

  const [instagramUrl, setInstagramUrl] = useState<string>(() => {
    return localStorage.getItem('jai_insta_url') || DEFAULT_INSTAGRAM_URL;
  });

  const [viralReelUrl, setViralReelUrl] = useState<string>(() => {
    return localStorage.getItem('jai_viral_reel_url') || DEFAULT_VIRAL_REEL_URL;
  });

  const [linkedinUrl, setLinkedinUrl] = useState<string>(() => {
    return localStorage.getItem('jai_linkedin_url') || DEFAULT_LINKEDIN_URL;
  });

  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('jai_portfolio_theme') as 'light' | 'dark') || 'light';
  });

  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
    return localStorage.getItem('jai_avatar_url') || null;
  });

  const [papers, setPapers] = useState<ResearchPaper[]>(INITIAL_RESEARCH_PAPERS);
  const [selectedPaperForReader, setSelectedPaperForReader] = useState<ResearchPaper | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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

  // Load any previously saved research documents from IndexedDB on startup
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

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleUpdateDriveUrl = (newUrl: string) => {
    setDriveUrl(newUrl);
    localStorage.setItem('jai_drive_url', newUrl);
    showNotification('Google Drive workable link updated successfully');
  };

  const handleUpdateInstagramUrl = (newUrl: string) => {
    setInstagramUrl(newUrl);
    localStorage.setItem('jai_insta_url', newUrl);
    showNotification('Instagram link updated successfully');
  };

  const handleUpdateViralReelUrl = (newUrl: string) => {
    setViralReelUrl(newUrl);
    localStorage.setItem('jai_viral_reel_url', newUrl);
    showNotification('Viral reel link updated successfully');
  };

  const handleUpdateLinkedinUrl = (newUrl: string) => {
    setLinkedinUrl(newUrl);
    localStorage.setItem('jai_linkedin_url', newUrl);
    showNotification('LinkedIn profile URL saved successfully');
  };

  const handleAvatarUpload = (url: string) => {
    setAvatarUrl(url);
    try {
      localStorage.setItem('jai_avatar_url', url);
    } catch {
      console.warn('Avatar image exceeded localStorage limit, held in memory');
    }
    showNotification('Display Picture updated');
  };

  const handleUploadDocument = async (paperId: string, file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const dataUrl = event.target?.result as string;
          const now = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          const docData = {
            paperId,
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream',
            uploadedAt: now,
            dataUrl,
          };

          await saveDocument(docData);

          setPapers((prev) =>
            prev.map((p) =>
              p.id === paperId
                ? {
                    ...p,
                    uploadedFile: {
                      name: file.name,
                      size: file.size,
                      type: file.type,
                      uploadedAt: now,
                      dataUrl,
                    },
                  }
                : p
            )
          );

          showNotification(`Document "${file.name}" uploaded successfully!`);
          resolve();
        } catch (err) {
          console.error(err);
          showNotification('Error saving document to local storage.');
          reject(err);
        }
      };

      reader.onerror = (err) => {
        console.error('File reading failed:', err);
        showNotification('Failed to read selected file.');
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleRemoveDocument = async (paperId: string) => {
    try {
      await deleteDocument(paperId);
      setPapers((prev) =>
        prev.map((p) => (p.id === paperId ? { ...p, uploadedFile: undefined } : p))
      );
      showNotification('Uploaded document removed.');
    } catch (err) {
      console.error('Failed to remove document:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-100 dark:selection:bg-emerald-950 selection:text-slate-900 dark:selection:text-emerald-300 transition-colors duration-200">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div
          id="app-toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 dark:border-slate-300 animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        driveUrl={driveUrl}
        instagramUrl={instagramUrl}
        linkedinUrl={linkedinUrl}
        onOpenLinkedInModal={() => setIsLinkedInModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Intro & Hero Header */}
        <Hero
          avatarUrl={avatarUrl}
          onAvatarUpload={handleAvatarUpload}
          driveUrl={driveUrl}
          instagramUrl={instagramUrl}
          linkedinUrl={linkedinUrl}
          onOpenLinkedInModal={() => setIsLinkedInModalOpen(true)}
        />

        {/* 1. Profile & Focus (including Skills & Expertise with Generative AI stack) */}
        <Profile />

        {/* 2. Top Work Video Showcases (Highlighted on top right after Profile) */}
        <AiVideoPortfolio
          driveUrl={driveUrl}
          onUpdateDriveUrl={handleUpdateDriveUrl}
          videos={INITIAL_AI_VIDEOS}
          instagramUrl={instagramUrl}
          onUpdateInstagramUrl={handleUpdateInstagramUrl}
          viralReelUrl={viralReelUrl}
          onUpdateViralReelUrl={handleUpdateViralReelUrl}
        />

        {/* 3. Research Work */}
        <ResearchSection
          papers={papers}
          onUploadDocument={handleUploadDocument}
          onRemoveDocument={handleRemoveDocument}
          onOpenDocumentReader={(paper) => setSelectedPaperForReader(paper)}
        />

        {/* 4. Credentials, Clearances & Milestones */}
        <Credentials />

        {/* 5. Professional Experience (Dropped down to the bottom) */}
        <Experience />
      </main>

      {/* Document Reader / Modal */}
      <DocumentModal
        paper={selectedPaperForReader}
        onClose={() => setSelectedPaperForReader(null)}
      />

      {/* LinkedIn Link Editor Modal */}
      <LinkedInModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
        currentUrl={linkedinUrl}
        onSave={handleUpdateLinkedinUrl}
      />

      {/* Footer */}
      <Footer
        driveUrl={driveUrl}
        instagramUrl={instagramUrl}
        linkedinUrl={linkedinUrl}
        onOpenLinkedInModal={() => setIsLinkedInModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Floating Direct Contact Button */}
      <FloatingWhatsApp />
    </div>
  );
}
