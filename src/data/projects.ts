export interface CurriculumSession {
  title: string;
  desc: string;
}

export interface Project {
  id: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  mentorName: string;
  mentorAvatar?: string;
  mentorInitial?: string;
  imageUrl: string;
  description: string;
  favorites?: number;
  rating?: number;
  domain?: string;
  /** Override default summer-style tags (e.g. special programs). */
  customTags?: string[];
  /** Custom weekly session curriculum; uses DEFAULT_CURRICULUM when omitted. */
  curriculum?: CurriculumSession[];
  price?: string;
  priceSubtext?: string;
  mentorshipHours?: string;
  /** When set, Buy Now opens this URL instead of in-app checkout. */
  enrollUrl?: string;
}

export const BLUEROBINS_HOME = "https://my.bluerobins.com";
export const CHESS_PROGRAM_PROJECT_ID = 182;

export const SUMMER_PRICE = "$1599";
export const SUMMER_INSTALLMENTS = "or 2× $849";
export const SUMMER_MENTORSHIP_HOURS =
  "20 hours of private mentorship · 10 weeks";

export const CHESS_CURRICULUM: CurriculumSession[] = [
  { title: "Session 1", desc: "Phase 1: Foundations + Baseline\n\nSkill assessment & rating baseline" },
  { title: "Session 2", desc: "Core principles: openings, tactics, endgames" },
  { title: "Session 3", desc: "Weekly real games (live or online)" },
  { title: "Session 4", desc: "First annotated game (mentor-guided). Deliverable: Baseline game analysis + goal setting" },
  { title: "Session 5", desc: "Phase 2: Strategy Building\n\nBuild personal opening repertoire" },
  { title: "Session 6", desc: "Middlegame planning & positional play" },
  {
    title: "Session 7",
    desc: "Tactical Pattern Training\n\nSharpen your tactical vision through intensive pattern recognition training covering forks, pins, skewers, discovered attacks, and combination sequences. Solve increasingly difficult tactical puzzles and apply patterns in practice games.",
  },
  { title: "Session 8", desc: "Weekly analyzed games. Deliverable: Opening repertoire document + annotated wins/losses" },
  {
    title: "Session 9",
    desc: "Tournament-Style Games\n\nPlay tournament-style games with proper time controls and notation requirements. Experience the pressure and discipline of competitive chess while applying your opening repertoire and middlegame planning skills.",
  },
  { title: "Session 10", desc: "Time management & psychological prep" },
  {
    title: "Session 11",
    desc: "Advanced Endgames\n\nStudy advanced endgame techniques including rook endgames, minor piece endgames, pawn structures, and key theoretical positions. Learn the endgame principles that separate intermediate players from strong club players.",
  },
  { title: "Session 12", desc: "Opponent analysis. Deliverable: 3-5 fully annotated competitive games" },
  { title: "Session 13", desc: "Phase 4: Mastery & Showcase\n\nDeep analysis of best and worst games" },
  { title: "Session 14", desc: "Strategy Refinement\n\nRefinement of personal strategy" },
  {
    title: "Session 15",
    desc: "Final Competitive Performance\n\nPlay your final competitive games with everything you have learned, applying opening preparation, middlegame strategy, tactical awareness, and endgame technique. Focus on clean, well-calculated play under time pressure.",
  },
  { title: "Session 16", desc: "Reflection & growth narrative. Final Deliverable: Complete chess portfolio" },
];

export const DEFAULT_CURRICULUM: CurriculumSession[] = [
  {
    title: "Kickoff & Project Setup",
    desc: "Meet your mentor, set up tools, and define milestones for your summer build.",
  },
  {
    title: "Foundations & Research",
    desc: "Explore core concepts, gather references, and draft your first prototype plan.",
  },
  {
    title: "Build Sprint 1",
    desc: "Implement the first major feature or experiment with mentor feedback.",
  },
  {
    title: "Build Sprint 2",
    desc: "Iterate on your prototype, fix blockers, and refine your approach.",
  },
  {
    title: "Mid-Program Review",
    desc: "Present progress, incorporate mentor notes, and adjust the roadmap.",
  },
  {
    title: "Build Sprint 3",
    desc: "Add polish, testing, and documentation to your growing project.",
  },
  {
    title: "Workshop & Collaboration",
    desc: "Join a group workshop and share learnings with other builders.",
  },
  {
    title: "Build Sprint 4",
    desc: "Finalize features and prepare demo materials for showcase week.",
  },
  {
    title: "Demo Prep",
    desc: "Rehearse your presentation and tighten your portfolio story.",
  },
  {
    title: "Final Demo Day",
    desc: "Present your completed project to mentors and the BlueRobins community.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: 338,
    title: "AI Storyteller: Create Your Own Adventure Book",
    difficulty: "Intermediate",
    mentorName: "Raji",
    mentorAvatar:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/mentor-photos/rajikannan2.jpg",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/338-1779401610032.png",
    description:
      "AI Storyteller enhances reading by allowing users to create personalized adventure books using AI. By integrating natural language processing, it tailors stories based on user choices.",
    domain: "AI & Data Science",
  },
  {
    id: 334,
    title: "Train an AI Robot to Navigate a Maze",
    difficulty: "Advanced",
    mentorName: "Ashish",
    mentorInitial: "A",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/project-334/1779012879964.webp",
    description:
      "Train an AI-powered robot that learns how to navigate through obstacle-filled mazes using reinforcement learning.",
    domain: "AI & Data Science",
  },
  {
    id: 332,
    title: "Who's Singing? An AI-Based Birdsong Classifier",
    difficulty: "Advanced",
    mentorName: "Ashish",
    mentorInitial: "A",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/332-1778846273557.png",
    description:
      "Develop an AI system that recognizes bird species from their calls using real-world audio recordings.",
    domain: "AI & Data Science",
  },
  {
    id: 326,
    title: "Unlocking DNA: A New Way to Keep Our Data Safe",
    difficulty: "Advanced",
    mentorName: "anagha",
    mentorAvatar:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/mentor-photos/anagha.jpg",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/326-1778386491938.png",
    description:
      "This project explores encoding digital data into synthetic DNA sequences.",
    favorites: 2,
    domain: "Biotech & Health",
  },
  {
    id: 324,
    title: "Smart Trash: AI for Cleaner Cities",
    difficulty: "Advanced",
    mentorName: "Ashish",
    mentorInitial: "A",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/project-324/1778159076928.webp",
    description:
      "Develop an AI-powered waste sorting system that uses computer vision to identify recyclables.",
    domain: "Social Impact & Sports",
  },
  {
    id: 323,
    title: "Quantum Art Generator",
    difficulty: "Intermediate",
    mentorName: "Mentor",
    mentorInitial: "M",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/323-1778144760802.png",
    description:
      "Students fuse quantum computing with generative art, mapping qubit measurements onto colors, shapes, and patterns.",
    domain: "Quantum Computing",
  },
  {
    id: 322,
    title: "Quantum Music Lab",
    difficulty: "Intermediate",
    mentorName: "Mentor",
    mentorInitial: "M",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/322-1778144762552.png",
    description:
      "Students explore the intersection of quantum computing and creativity by building a music generator.",
    domain: "Quantum Computing",
  },
  {
    id: 289,
    title: "Cinematic Worlds: Design Your Own Story with AI",
    difficulty: "Intermediate",
    mentorName: "Raji",
    mentorAvatar:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/mentor-photos/rajikannan2.jpg",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/289-pexels-1776840268862.jpg",
    description:
      "Students build an AI-powered web app that generates scripts, characters, and cinematic visuals.",
    domain: "Design & Creative",
  },
  {
    id: 275,
    title:
      "AI Social Media Analyzer: Build a Dashboard That Analyzes Public Opinion",
    difficulty: "Intermediate",
    mentorName: "Ashwini",
    mentorAvatar:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/mentor-photos/ashwinibalasubramanian.jpg",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/275-pexels-1776840266576.jpg",
    description:
      "Students build an interactive Streamlit analytics dashboard that processes airline tweet datasets.",
    rating: 4.7,
    domain: "AI & Data Science",
  },
  {
    id: 274,
    title: "Build Your Personal Study Planner",
    difficulty: "Beginner",
    mentorName: "Ashwini",
    mentorAvatar:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/mentor-photos/ashwinibalasubramanian.jpg",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/274-pexels-1776838635093.jpg",
    description:
      "The Smart Study Planner is a web app built with Python and Streamlit that helps students organize their academic tasks.",
    rating: 5.0,
    domain: "Apps & Technology",
  },
  {
    id: 207,
    title: "Build a Robot from Scratch",
    difficulty: "Intermediate",
    mentorName: "Rosh",
    mentorAvatar:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/mentor-photos/roshho.jpg",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/207-pexels-1776838145648.jpg",
    description:
      "Learn to build a walking robot from the ground up, combining 3D printing and laser cutting.",
    rating: 5.0,
    domain: "Hardware & Engineering",
  },
  {
    id: 241,
    title: "3D Modelling & 3D Printing - 0 to 1",
    difficulty: "Beginner",
    mentorName: "Rosh",
    mentorAvatar:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/mentor-photos/roshho.jpg",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/241-pexels-1776838141109.jpg",
    description:
      "Learn how to 3D model and 3D print from scratch and build a basic lamp project with your new skills!",
    favorites: 2,
    rating: 5.0,
    domain: "Hardware & Engineering",
  },
  {
    id: CHESS_PROGRAM_PROJECT_ID,
    title: "Play Chess Like a Champion",
    difficulty: "Beginner",
    mentorName: "Sandhya",
    mentorInitial: "SA",
    imageUrl:
      "https://yvbeqrxgvcmkuouxpmjx.supabase.co/storage/v1/object/public/project_photos/182-pexels-1776838151982.jpg",
    description:
      "Learn chess by playing, analyzing, and improving real games. Guided by an internationally decorated chess champion (Woman Candidate Master, FIDE-Certified Instructor), students actively build strategies through tournament-style play, game analysis, opening preparation, and endgame execution. Build a personal opening repertoire, game analysis portfolio, and strategy playbook.",
    customTags: [
      "chess",
      "strategy",
      "critical thinking",
      "game analysis",
      "tournaments",
    ],
    curriculum: CHESS_CURRICULUM,
    price: "$249",
    priceSubtext: "/month",
    mentorshipHours: "45-min private sessions · 4 sessions/month · 16-week progression",
    enrollUrl: BLUEROBINS_HOME,
  },
];

export function getProjectById(id: number): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getCurriculumForProject(project: Project): CurriculumSession[] {
  return project.curriculum ?? DEFAULT_CURRICULUM;
}

export function getProjectTags(project: Project): string[] {
  if (project.customTags?.length) return project.customTags;
  const tags: string[] = ["Summer Intensive"];
  if (project.domain) tags.push(project.domain);
  tags.push(project.difficulty);
  return tags;
}

export function mentorImageUrl(project: Project): string | null {
  if (project.mentorAvatar) return project.mentorAvatar;
  return null;
}

export function checkoutParamsFromProject(project: Project) {
  return {
    projectId: String(project.id),
    title: project.title,
    mentorName: project.mentorName,
    imageUrl: project.imageUrl,
  };
}
