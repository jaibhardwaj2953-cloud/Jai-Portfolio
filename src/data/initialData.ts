import { ExperienceItem, CredentialItem, ResearchPaper, VideoProject, ShowcaseVideoSlot } from '../types';

export const INITIAL_RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'makkah-defence-pact',
    title: 'Makkah Joint Defence Agreement',
    subtitle: 'Strategic Multilateralism & Gulf-South Asian Security Intersections',
    category: 'Geopolitics & Defence Treaties',
    readTime: '12 min read',
    abstract:
      'An exhaustive analysis of the Makkah Joint Defence Framework, exploring security pacts across the Arabian Peninsula, mutual assistance protocols, intelligence sharing, and the evolving maritime security architecture intersecting the Red Sea and the Indian Ocean.',
    keyPoints: [
      'Strategic doctrine and collective deterrence protocols across Gulf signatories.',
      'Maritime transit security covering Bab-el-Mandeb and Gulf of Aden chokepoints.',
      'Implications for Indian defence procurement, naval forward presence, and diaspora security.',
      'Comparative assessment with GCC unified military command mechanisms.',
    ],
    initialExcerpt: `EXECUTIVE SUMMARY:
The Makkah Joint Defence Agreement marks a critical turning point in regional collective deterrence. Rather than relying purely on external security guarantors, the signatory frameworks institutionalize joint air defence vector synchronizations, rapid response naval deployments, and cybersecurity early-warning grids. 

For South Asian strategists, the pact introduces key strategic dynamics:
1. Maritime choke points: Enhanced surveillance along western Indian Ocean sea lines of communication (SLOCs).
2. Defence diplomacy: Deepening bilateral technical interoperability between India and Gulf partners.
3. Intelligence de-escalation: Collaborative mechanisms for countering non-state maritime threats.`,
  },
  {
    id: 'brics-geopolitics',
    title: 'BRICS Geopolitics',
    subtitle: 'Expansion Dynamics, Multilateral Hedging & The Evolving Global South Calculus',
    category: 'Global Power Architecture',
    readTime: '15 min read',
    abstract:
      'A deep-dive investigation into the strategic recalibrations within the expanded BRICS+ bloc. Evaluates alternate financial messaging protocols, energy diplomacy corridors, and how India strategically balances its multipolar posture alongside Western defence partnerships.',
    keyPoints: [
      'Post-expansion structural divergence: Harmonizing divergent geopolitical interests.',
      'De-dollarization & local currency settlement mechanisms: Constraints and realistic vectors.',
      'India’s strategic autonomy: Balancing Quad maritime imperatives with BRICS continental dialogue.',
      'Critical minerals and global supply chain reconfigurations across the Global South.',
    ],
    initialExcerpt: `RESEARCH BRIEF:
The transition of BRICS into an expanded multilateral coalition represents a major evolution in 21st-century global governance. India’s strategic posture within BRICS serves as an anchor of non-bloc multilateralism.

Key Strategic Pillars Analyzed:
- Economic Pragmatism: Cross-border settlement trials without ideological weaponization.
- Geopolitical Independence: India’s position as a bridge between the developed North and the emerging Global South.
- Defence & Space Synergy: Bilateral intelligence exchanges and satellite constellation data-sharing agreements.`,
  },
  {
    id: 'major-rishabh-sambhyal',
    title: 'Major Rishabh Singh Sambhyal',
    subtitle: 'Valour Under Fire: Tactical Leadership & Counter-Terror Operational Monograph',
    category: 'Military History & Tactical Leadership',
    readTime: '10 min read',
    abstract:
      'A dedicated tactical and biographical monograph documenting the courage, combat leadership, and battlefield maneuvers of Major Rishabh Singh Sambhyal. Focuses on close-quarters combat doctrines, decision-making under intense enemy fire, and the enduring ethos of the Indian Armed Forces.',
    keyPoints: [
      'Tactical cordon-and-search doctrine in high-altitude counter-terror theaters.',
      'Sub-unit command ethics: Leading from the front under adverse tactical geometry.',
      'Psychological resilience and rapid casualty evacuation protocols.',
      'Lessons for junior officer leadership and combat training academies.',
    ],
    initialExcerpt: `TACTICAL CASE STUDY & BIOGRAPHICAL TRIBUTE:
Major Rishabh Singh Sambhyal represents the apex of combat grit and junior leadership in the Indian Army. Through documented battle reports and tactical retrospectives, this paper reconstructs key counter-insurgency operations.

Core Tactical Takeaways:
- Command Presence: Decisive initiative during room intervention and flanking counter-assaults.
- Sub-unit Cohesion: High-morale retention in prolonged high-altitude cordons.
- Operational Honour: Ethical conduct of operations balancing aggressive neutralisation with civil protection.`,
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'hitbullseye',
    organization: 'Hitbullseye Knowledge System Pvt. Ltd.',
    role: 'Academic Strategist & Faculty',
    nature: 'Permanent, Full-Time',
    period: '2023 – Present',
    description:
      'Spearheading pedagogical strategy, high-yield defence exam curriculum design, and general studies faculty leadership for nationwide aspirants.',
    responsibilities: [
      'Architected comprehensive analytical syllabi for UPSC CDS, AFCAT, and NDA aspirants.',
      'Authored in-depth geopolitical briefs and monthly defence current affairs masterclasses.',
      'Mentored thousands of defence candidates on SSB interview psychological assessments and analytical writing.',
      'Pioneered AI-assisted pedagogical tools to generate adaptive practice mocks and real-time concept explainers.',
    ],
    tags: ['Curriculum Design', 'Geopolitics Faculty', 'SSB Interview Mentorship', 'AI Pedagogy'],
  },
  {
    id: 'lakshyaveer',
    organization: 'Lakshyaveer Defence Preparatory Academy',
    role: 'Educator & Content Strategist',
    nature: 'Core Academic Leadership',
    period: '2022 – 2023',
    description:
      'Designed end-to-end content blueprints and training regimens tailored specifically for Indian Armed Forces competitive examinations.',
    responsibilities: [
      'Formulated high-conversion visual learning modules and strategic lecture decks on military history and modern warfare.',
      'Directed SSB candidate screening evaluations, group discussions, and personal interview simulations.',
      'Conducted specialized workshops on defence technology, missile defense systems, and border infrastructure.',
    ],
    tags: ['SSB Preparation', 'Content Strategy', 'Military Warfare Modules', 'Candidate Evaluation'],
  },
  {
    id: 'ssb-sureshot',
    organization: 'SSB Sure Shot Academy',
    role: 'Faculty & Academic Coordinator',
    nature: 'Academic Coordination',
    period: '2021 – 2022',
    description:
      'Managed candidate academic cohorts, delivered lectures on international affairs and national security, and coordinated testing schedules.',
    responsibilities: [
      'Orchestrated comprehensive academic scheduling for intensive 14-day SSB batches.',
      'Mentored candidates on current geopolitical flashpoints: Indo-Pacific, LAC, and West Asian dynamics.',
      'Facilitated group planning exercises (GPE) and lecturette mastery sessions.',
    ],
    tags: ['Academic Coordination', 'Group Planning Exercises', 'Lecturette Training', 'National Security'],
  },
  {
    id: 'shikshalaya',
    organization: 'Shikshalaya',
    role: 'Teacher',
    nature: 'Foundational Pedagogy',
    period: '2020 – 2021',
    description:
      'Instilled rigorous analytical foundations, general studies principles, and conceptual clarity for aspiring students.',
    responsibilities: [
      'Conducted foundational classes in modern history, constitutional frameworks, and spatial geography.',
      'Established personalized mentorship tracking to elevate individual candidate performance metrics.',
      'Refined assessment rubrics to ensure rapid feedback cycles on analytical answer writing.',
    ],
    tags: ['Foundational General Studies', 'Analytical Mentorship', 'Answer Writing', 'Concept Mastery'],
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: 'cds',
    exam: 'CDS',
    fullName: 'Combined Defence Services Examination',
    clearanceCount: 'Cleared 2x',
    organization: 'Union Public Service Commission (UPSC)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Cleared twice for permanent/short service commission entries across the Indian Armed Forces.',
  },
  {
    id: 'afcat',
    exam: 'AFCAT',
    fullName: 'Air Force Common Admission Test',
    clearanceCount: 'Cleared 3x',
    organization: 'Indian Air Force (IAF)',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    description: 'Cleared 3 times with high percentiles in general awareness, military aptitude, and verbal reasoning.',
  },
  {
    id: 'cgcat',
    exam: 'CGCAT',
    fullName: 'Coast Guard Common Admission Test',
    clearanceCount: 'Cleared 4x',
    organization: 'Indian Coast Guard (Ministry of Defence)',
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    description: 'Exceptional consistency with 4 clearances for General Duty Officer cadre selections.',
  },
  {
    id: 'ib-acio',
    exam: 'IB ACIO',
    fullName: 'Assistant Central Intelligence Officer (Grade-II/Exe)',
    clearanceCount: 'Cleared',
    organization: 'Intelligence Bureau (Ministry of Home Affairs)',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    description: 'Cleared premier national intelligence officer selection requiring advanced security & strategic aptitude.',
  },
  {
    id: 'indiafuture-ai',
    exam: 'IndiaFutureAI Trained Creator',
    fullName: 'IndiaFutureAI Creator Certification',
    clearanceCount: 'Trained Creator',
    organization: 'IndiaFutureAI',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'I am an IndiaFutureAI trained creator, specializing in generative AI media production, advanced prompt architecture, and high-impact visual knowledge storytelling.',
    isAiCertified: true,
    url: 'https://www.indiafutureai.com/',
    linkText: 'Visit IndiaFutureAI (indiafutureai.com)',
  },
  {
    id: 'yuva-ai',
    exam: 'Yuva AI for All',
    fullName: 'Yuva AI for All Certification',
    clearanceCount: 'Certified',
    organization: 'National AI Initiative / Digital India',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Formal credential recognizing proficiency in AI literacy, generative prompt engineering, and ethical AI integration.',
    isAiCertified: true,
  },
];

export const INITIAL_AI_VIDEOS: VideoProject[] = [
  {
    id: 'vid-1',
    title: 'Middle Eastern Geopolitics & The Makkah Pact Explained',
    topic: 'Middle East & Gulf Maritime Security',
    viewsEstimate: '850K+ Views',
    drivePath: 'https://drive.google.com/drive/folders/131fmioulZcwEphjt21zaJiTPZ5vcoawi',
    duration: '0:58 min',
    description: 'AI-synthesized tactical 3D map animations illustrating strait chokepoints, naval bases, and troop dispositions.',
    tags: ['AI Visuals', '3D Map Motion', 'Voice Synthesis', 'Geopolitics'],
  },
  {
    id: 'vid-2',
    title: 'BRICS Expansion: Financial Decoupling or Pragmatism?',
    topic: 'Global Economic Architecture',
    viewsEstimate: '1.2M+ Views',
    drivePath: 'https://drive.google.com/drive/folders/131fmioulZcwEphjt21zaJiTPZ5vcoawi',
    duration: '1:12 min',
    description: 'Fast-paced documentary style breakdown leveraging AI research summarization and cinematic typography.',
    tags: ['Prompt Engineering', 'Data Visuals', 'Editorial Pacing'],
  },
  {
    id: 'vid-3',
    title: 'Tactical Leadership: Major Rishabh Singh Sambhyal',
    topic: 'Military Valour & Combat Analysis',
    viewsEstimate: '920K+ Views',
    drivePath: 'https://drive.google.com/drive/folders/131fmioulZcwEphjt21zaJiTPZ5vcoawi',
    duration: '1:05 min',
    description: 'Tribute reel integrating authentic historical archives, AI visual enhancement, and tactical reenactments.',
    tags: ['Combat Tribute', 'Military History', 'Sound Design'],
  },
  {
    id: 'vid-4',
    title: 'SSB Psychology: Cracking the Thematic Apperception Test',
    topic: 'Defence Aspirant Strategy',
    viewsEstimate: '1.7M+ Views',
    drivePath: 'https://drive.google.com/drive/folders/131fmioulZcwEphjt21zaJiTPZ5vcoawi',
    duration: '0:50 min',
    description: 'Viral educational breakdown breaking down Officer Like Qualities (OLQs) and psychological assessment framing.',
    tags: ['Viral Reel', 'SSB Strategy', 'Aspirant Guidance'],
  },
];

export const INITIAL_SHOWCASE_SLOTS: ShowcaseVideoSlot[] = [
  {
    id: 'ai-cinematic',
    categoryNumber: '01',
    categoryTitle: 'AI Cinematic Showcase',
    badgeLabel: 'Category 01 · AI Cinematic',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    tagline: "Ramayana: Angad in Ravana's Court",
    description:
      "Epic generative cinematic recreation depicting Angad's unmovable stride and peace embassy in Ravana's golden Lanka court. Engineered with multi-model visual synthesis, photorealistic atmospheric lighting, and neural Hindi voice direction.",
    tags: ['Ramayana Epic', "Angad's Stride", 'Kling AI / Midjourney', 'ElevenLabs Hindi', 'Google Flow Pipeline'],
    aspectRatio: '16:9',
    googleDriveUrl: 'https://drive.google.com/file/d/1KfgM-izxUJl94PRk32spsUD7J3YfK9Ak/preview',
    customUrl: 'https://drive.google.com/file/d/1KfgM-izxUJl94PRk32spsUD7J3YfK9Ak/preview',
  },
  {
    id: 'defense-geopolitics',
    categoryNumber: '02',
    categoryTitle: 'Defense & Geopolitics Analysis',
    badgeLabel: 'Category 02 · Defense & Geopolitics',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    tagline: 'Tactical 3D Topography & War Theatre Kinetics',
    description:
      'In-depth strategic defence analysis integrating animated 3D geospatial map vectors, maritime chokepoints, radar tracking, and weapons capabilities.',
    tags: ['Geopolitics', '3D Terrain Kinetics', 'Radar Envelopes', 'Defence Strategy', '4.7M+ Viral Reach'],
    aspectRatio: '9:16',
    isViralReel: true,
    googleDriveUrl: 'https://drive.google.com/file/d/1Lj-FqIFfvgwvG2G40hpMB2atxT1YlMS3/preview',
    customUrl: 'https://drive.google.com/file/d/1Lj-FqIFfvgwvG2G40hpMB2atxT1YlMS3/preview',
  },
  {
    id: 'ad-video',
    categoryNumber: '03',
    categoryTitle: 'Commercial & AI Ad Video',
    badgeLabel: 'Category 03 · AI Ad Video',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    tagline: 'High-Retention Brand Storytelling & Commercial Promotion',
    description:
      'Fast-paced commercial video engineered with high-impact kinetic typography, product visualization, and multi-million impression retention hooks.',
    tags: ['Commercial Ad', 'Brand Marketing', 'Retention Pacing', 'Product AI Video'],
    aspectRatio: '9:16',
    googleDriveUrl: 'https://drive.google.com/file/d/1TzFqATO3KQ0enksCdOtC4JZ7AhuW2lir/preview',
    customUrl: 'https://drive.google.com/file/d/1TzFqATO3KQ0enksCdOtC4JZ7AhuW2lir/preview',
  },
];

