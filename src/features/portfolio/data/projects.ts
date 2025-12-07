import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "federated-learning-drones",
    title: "Privacy-Preserving Federated Learning Framework for Decentralized Drone Swarm Exploration",
    period: {
      start: "10.2025",
      end: "11.2025",
    },
    link: "https://github.com/Gokulakrishnxn/Decentralized-FL-Drones",
    skills: [
      "Python",
      "Federated Learning",
      "Machine Learning",
      "FedAvg",
      "3D Simulation",
      "LiDAR",
      "Multi-Agent Systems",
      "Research",
    ],
    description: `Published research paper and awarded **Best Paper Award** at IEEE International Conference, Singapore 2025.

- **3D Voxel Environment** - Simulated 3D grid environment with room-like obstacles and coverage metrics
- **LiDAR Simulation** - 3D spherical scans with ray marching (8m range) for realistic sensor data
- **Frontier-Based Exploration** - Intelligent target selection for informative exploration paths
- **Federated Learning (FedAvg)** - Privacy-preserving model aggregation across drone swarm
- **Local MLP Learning** - Each drone trains local exploration policies using MLPRegressor
- **Real-Time Visualization** - Interactive 3D visualization of world, drones, and coverage metrics
- **Multi-Drone Coordination** - Collaborative exploration with decentralized decision-making`,
    isExpanded: true,
  },
  {
    id: "stellest-ai",
    title: "Stellest AI - Myopia Prediction Platform",
    period: {
      start: "06.2024",
      end: "08.2024",
    },
    link: "https://github.com/Gokulakrishnxn/Myopia-Prediction-model",
    skills: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "Machine Learning",
      "scikit-learn",
      "Data Visualization",
      "Tailwind CSS",
      "shadcn/ui",
      "Recharts",
    ],
    description: `3-month internship project with Chennai Eye Hospital and Hindustan University.

- **AI-Powered Predictions** - Machine learning models trained on 251+ patient records
- **Visual Analytics** - Interactive charts and graphs for risk assessment
- **PDF Reports** - Comprehensive clinical reports with recommendations
- **Treatment Efficacy** - Estimate Stellest lens effectiveness
- **Real-time Analysis** - Instant predictions based on clinical data
- **Dark Mode** - Beautiful light/dark theme support`,
    isExpanded: false,
  },
  {
    id: "rex-healthify",
    title: "REX Healthify – Your Personal AI-Powered Health Management Assistant",
    period: {
      start: "11.2025",
      end: "11.2025",
    },
    link: "https://github.com/Gokulakrishnxn/rexhealthify",
    skills: [
      "Flutter",
      "Dart",
      "Google Gemini AI",
      "Supabase",
      "Google Maps",
      "Speech Recognition",
      "NFC",
      "State Management",
    ],
    description: `Hackathon project - 4th place overall (1000 teams) in OpenAI X NxtWave Buildathon.

- **AI-Powered Health Assistant** - Get personalized health advice powered by Google Gemini AI
- **Medical Records Management** - Organize and analyze all your medical records in one place
- **Emergency Doctor Finder** - Locate nearby doctors instantly with interactive maps
- **Medication Tracking** - Never miss a dose with smart reminders and adherence monitoring
- **Voice Chat Interface** - Interact with your health assistant using natural voice commands
- **NFC Emergency Card** - Quick access to critical health information in emergencies`,
    logo: "/rex-logo.png",
    isExpanded: false,
  },
  {
    id: "ai-portfolio",
    title: "Gokulakrishnan.dev Portfolio",
    period: {
      start: "10.2025",
    },
    link: "https://gokulakrishnan.dev",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "React", "LLM Integrations"],
    description:
      "Personal portfolio and blog showcasing AI, LLM, and full‑stack projects, built with Next.js App Router, TypeScript, and a component registry for rapid UI reuse.",
    logo: "/favicon.svg",
    isExpanded: true,
  },
  {
    id: "penguin-jokebot",
    title: "Penguin JokeBot Custom Voice",
    period: {
      start: "11.2023",
      end: "12.2023",
    },
    link: "https://github.com/Gokulakrishnxn/Penguin-AI-using-NLP",
    skills: [
      "Natural Language Processing (NLP)",
      "Python (Programming Language)",
      "Database Design",
    ],
    description: `- Built using Python and NLP libraries
- Focused on joke-based interactions with dynamic responses
- Features a penguin persona for extra charm
- Uses custom-recorded voice for replies (yes, it talks!)
- Great blend of AI, humor, and creativity

**Collaboration:** **[Priyadarsni JK](https://www.linkedin.com/in/priyadarsni-jk-745a0025b/)**`,
    logo: "/penguin.svg",
    isExpanded: false,
  },
  {
    id: "profitfolio",
    title: "ProfitFolio.in – Stock Portfolio Tracker",
    period: {
      start: "06.2023",
      end: "08.2023",
    },
    link: "https://github.com/Gokulakrishnxn/Profitfolio.in",
    skills: [
      "Data Visualization",
      "R",
      "Python",
      "React",
    ],
    description: `I handled data collection and website development for ProfitFolio.in, a platform that tracks a sample stock portfolio with an initial capital of Rs. 10 Lakhs. The website presents quarterly stock selections, profit/loss analysis, and cumulative portfolio performance, offering valuable insights for investors.

- Collected and structured financial data
- Developed an interactive and user-friendly website
- Ensured seamless data visualization for easy tracking`,
    isExpanded: false,
  },
];
