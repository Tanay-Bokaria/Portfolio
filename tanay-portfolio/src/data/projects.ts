// ─────────────────────────────────────────────────────────
//  Centralized project data — used by Work.tsx & ProjectDetailPage.tsx
// ─────────────────────────────────────────────────────────

export type Project = {
  id: number;
  title: string;
  category: string;
  tools: string;
  tagList: string[];
  image: string;
  accent: string;
  description: string;
  impact: string;
  fullDesc: string;
  features: string[];
  challenges: string[];
  resumeLine: string;
  liveUrl?: string;
  sourceUrl?: string;
  status: "live" | "in-progress" | "concept";
  logo?: string;
  screenshots?: string[];
  isConfidential?: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "SnapByte",
    category: "AI Nutrition Tracker",
    tools: "Gemini AI · Android · Kotlin",
    tagList: ["Gemini AI", "Android", "Kotlin", "Computer Vision", "Health-Tech"],
    image: "/images/snapbyte-logo-fork.png",
    accent: "#a78bfa",

    description:
      "An AI-powered nutrition tracking app that analyzes calories and macros by photographing food, focused on Indian cuisine.",

    impact:
      "Simplifies calorie tracking and makes nutrition insights more accessible for Indian users.",

    fullDesc:
      "Most calorie tracking apps are optimized for Western diets and lack accurate data for Indian meals such as dosa, dal, or roti. SnapByte addresses this by using the Google Gemini API to analyze food images and provide nutritional estimates, offering a faster and more relevant experience for Indian users without manual input.",

    features: [
      "Capture food images for instant analysis",
      "AI-based recognition of Indian dishes",
      "Calorie and macro breakdown (protein, carbs, fats)",
      "Daily intake tracking dashboard",
      "Minimal UI for fast and simple usage",
    ],

    challenges: [
      "Handling ambiguity in mixed-dish recognition and portion estimation",
      "Lack of structured datasets for Indian meals",
      "Designing a simple UX for a complex AI workflow",
      "Building an MVP using third-party AI APIs",
    ],

    resumeLine:
      "Building SnapByte, an AI-powered calorie tracking app for Indian meals using image recognition and a minimal mobile-first interface.",

    status: "in-progress",
    liveUrl: "#",
    sourceUrl: "#",
    logo: "/images/snapbyte-icon.png",
    screenshots: ["/images/logo2.png", "/images/snapbyte-logo-fork.png"],
  },

  {
    id: 2,
    title: "FlagArena",
    category: "Cybersecurity Platform",
    tools: "Next.js · Node.js · VM Infrastructure",
    tagList: ["Next.js", "Node.js", "CTF", "Security", "VM Labs", "RBAC"],
    image: "/FlagArena/FlagArena-home.jpeg",
    accent: "#5eead4",

    description:
      "A cybersecurity training platform with isolated environments, hands-on challenges, and an attack–patch workflow.",

    impact:
      "Encourages practical learning by combining offensive and defensive cybersecurity skills.",

    fullDesc:
      "Traditional CTF platforms focus only on final flag submission, which often leads to shallow learning. FlagArena introduces isolated environments where users exploit vulnerabilities and then patch them. The system verifies fixes by replaying the exploit, ensuring deeper understanding and real skill development.",

    features: [
      "Isolated VM environments for each challenge",
      "Attack–Patch workflow: exploit → fix → verify",
      "Hands-on labs across Web, Crypto, Forensics, and more",
      "Performance dashboard with activity tracking",
      "Admin panel for managing users and challenges",
    ],

    challenges: [
      "Designing secure environments for each user",
      "Building automated validation for patches",
      "Preventing solution sharing",
      "Managing infrastructure for multiple users",
    ],

    resumeLine:
      "Built FlagArena, a cybersecurity training platform with isolated labs and an attack–patch workflow for practical learning.",

    status: "in-progress",
    liveUrl: "#",
    sourceUrl: "#",
  },

 {
  id: 3,
  title: "E-Trace",
  category: "Startup Concept · E-Waste Platform",
  tools: "System Design · Product Thinking",
  tagList: ["Startup", "SaaS", "Security", "Product"],
  image: "/images/radix.png", // ✅ keep existing image
  accent: "#34d399",

  description:
    "A startup concept for secure e-waste tracking focused on data destruction, transparency, and trust.",

  impact:
    "Addresses real-world concerns around data security in e-waste disposal and proposes a scalable solution.",

  fullDesc:
    "E-Trace is a startup idea I developed to solve the problem of insecure e-waste disposal. Many users hesitate to recycle devices due to fear of data theft. The platform is designed to provide secure data destruction, doorstep pickup, real-time tracking, and verifiable certificates. This idea was explored further through an academic project and is currently on hold until better resources and a team are available.",

  features: [
    "Doorstep pickup for electronic devices",
    "Secure data destruction workflow",
    "Certificate of data destruction",
    "Real-time tracking of device lifecycle",
    "Trust-focused transparent process",
  ],

  challenges: [
    "Designing a scalable system without implementation resources",
    "Building trust in data destruction processes",
    "Understanding logistics and operational challenges",
    "Translating a startup idea into a structured system design",
  ],

  resumeLine:
    "Designed E-Trace, a startup concept for secure e-waste tracking with data destruction verification and lifecycle tracking.",

  status: "concept",
},
  {
    id: 4,
    title: "Rainbow Creations",
    category: "Business Digitization",
    tools: "Vercel · AI Tools · Web Design",
    tagList: ["Vercel", "AI Tools", "Branding", "Web Design"],
    image: "/RainbowCreations/Rc.png",
    accent: "#f472b6",

    description:
      "A website built to digitize my family business, showcasing products and establishing an online presence.",

    impact:
      "Helped bring a traditional family business online and created a foundation for future digital marketing and automation.",

    fullDesc:
      "Rainbow Creations is my family business, and I worked on digitizing it by building and deploying a website to showcase real products and improve its online presence. I used AI tools to enhance product visuals and took inspiration from modern websites. The goal was to start growing the business digitally through better branding, future Instagram marketing, and eventually automating operations like orders and tracking.",

    features: [
      "Live website deployed using Vercel",
      "Product showcase for real business products",
      "AI-assisted enhancement of product visuals",
      "Design inspired by modern websites",
      "Future roadmap for digital marketing and automation",
    ],

    challenges: [
      "Converting a traditional business into a digital experience",
      "Learning design and presentation principles",
      "Using AI tools effectively",
      "Understanding business needs beyond development",
    ],

    resumeLine:
      "Built and deployed a website to digitize my family business and support future digital marketing and automation.",

    status: "live",
    liveUrl: "https://rainbow-creations-mistine.vercel.app/",
    sourceUrl: "#",
  },

  {
    id: 5,
    title: "Password Manager",
    category: "Security Utility",
    tools: "Java · Core Java",
    tagList: ["Java", "OOP", "Security"],
    image: "/images/bond.png",
    accent: "#fb923c",

    description:
      "A Java-based password manager with strength analysis and password generation.",

    impact:
      "Demonstrates understanding of password security and validation logic.",

    fullDesc:
      "This project focuses on improving password security through a strength analyzer and a password generator. The analyzer evaluates passwords based on length, case, numbers, and special characters, while the generator ensures strong passwords by enforcing required constraints. Encryption was explored as a future improvement.",

    features: [
      "Password strength analyzer (Weak → Strong → Very Strong)",
      "Rule-based scoring system",
      "Random password generator with constraints",
      "Ensures use of all character types",
      "Explored encryption for future implementation",
    ],

    challenges: [
      "Translating security rules into logic",
      "Handling randomness with constraints",
      "Understanding basics of encryption",
    ],

    resumeLine:
      "Developed a Java password manager with strength analysis and constrained password generation.",

    status: "live",
    liveUrl: "#",
    sourceUrl: "#",
  },

  {
  id: 6,
  title: "Expense Tracker",
  category: "Finance Utility",
  tools: "Java · Swing · CSV · MVC",
  tagList: ["Java", "Swing", "MVC", "File Handling"],
  image: "/", // ✅ keep existing image (or replace later)
  accent: "#60a5fa",

  description:
    "A Java desktop application for tracking income and expenses using a GUI and local storage.",

  impact:
    "Demonstrates practical use of MVC architecture, OOP, and file handling in a real-world application.",

  fullDesc:
    "This project is a Java Swing-based desktop application that allows users to record and manage income and expenses. It follows the MVC architecture for better structure and maintainability. Data is stored locally using CSV files, ensuring simplicity and privacy without requiring a database. The application includes transaction management, summaries, and a user-friendly interface.",

  features: [
    "Add income and expense transactions",
    "View transaction history",
    "Monthly summary (income, expense, balance)",
    "Delete transactions",
    "CSV-based local storage",
    "Java Swing GUI",
  ],

  challenges: [
    "Implementing MVC architecture properly",
    "Handling file I/O operations with CSV",
    "Designing a user-friendly GUI using Swing",
  ],

  resumeLine:
    "Developed a Java Swing expense tracker using MVC architecture and CSV storage.",

    status: "live",
  },
];

// Helpers
export const getProject = (id: number) => projects.find((p) => p.id === id);

export const statusConfig = {
  live: { label: "Live", color: "#34d399" },
  "in-progress": { label: "In Progress", color: "#fbbf24" },
  concept: { label: "Concept", color: "#94a3b8" },
};