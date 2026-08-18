export const resumeHeader = {
  name: "Gokulakrishnan",
  location: "Chennai, India",
  email: "Gokulakrishnxn@gmail.com",
  phone: "+91 7418232796",
  links: [
    { label: "github.com/Gokulakrishnxn", href: "https://github.com/Gokulakrishnxn" },
    { label: "Gokulakrishnan.dev", href: "https://www.gokulakrishnan.dev" },
    { label: "linkedin.com/in/gokulakrishnxn", href: "https://linkedin.com/in/gokulakrishnxn/" },
  ],
};

export const education = {
  school: "Hindustan Institute of Technology and Science, Chennai, India",
  period: "Sep 2022 – May 2026",
  degree: "B.Tech. in Computer Science (Specialization: AI & Data Science)",
  cgpa: "CGPA: 8.26/10",
};

export const skills: { label: string; value: string }[] = [
  {
    label: "Languages & Frameworks",
    value:
      "Python, R, JavaScript, Node.js, TensorFlow, PyTorch, Scikit-learn, NumPy, Pandas",
  },
  {
    label: "AI/ML",
    value:
      "Hugging Face, NLP, Federated Learning, Regression, Classification, Clustering",
  },
  {
    label: "Cloud & DevOps",
    value: "Google Cloud Platform (GCP), Vercel, Docker, Git, CI/CD",
  },
  {
    label: "Databases",
    value: "Supabase (PostgreSQL, Auth, Storage, Realtime APIs)",
  },
];

export const freelanceExperience = {
  org: "Eye Hospital, Chennai — Myopia Prediction Platform",
  role: "Freelance AI Developer",
  bullets: [
    "Developed an AI-powered clinical decision support platform for predicting therapeutic lens (Stellest Lens) uptake in myopia progression management, assisting ophthalmologists in treatment planning.",
    "Built and trained machine learning models on 251+ patient clinical records, implementing predictive algorithms for risk assessment and treatment outcome forecasting.",
    "Designed interactive visual analytics dashboard with real-time charts and graphs for clinical risk stratification, enabling doctors to interpret patient data efficiently.",
    "Automated generation of comprehensive PDF clinical reports with personalized treatment recommendations based on patient history and predictive model outputs.",
  ],
};

export type AcademicProject = {
  title: string;
  period: string;
  meta: string;
  githubHref: string;
  bullets: string[];
};

export const academicProjects: AcademicProject[] = [
  {
    title: "Intelligent Query Routing Framework for LLM Orchestration",
    period: "Sep 2025 – Jan 2026",
    meta: "IEEE Conference Presentation, March 2026",
    githubHref: "https://github.com/Gokulakrishnxn",
    bullets: [
      "Designed and implemented a web-based intelligent routing system that dynamically classifies user queries and routes them to optimal language models (GPT-4, Claude 3.5, Llama 3) based on task complexity, achieving 93.7% routing accuracy.",
      "Developed a lightweight intent classification algorithm using heuristic-based keyword matching and complexity scoring, completing query categorization in under 20ms with minimal computational overhead.",
      "Built a production-ready serverless architecture using Next.js 14 and Vercel Edge Functions, demonstrating 42% cost reduction and 39% latency improvement over monolithic single-model approaches across 100 diverse test queries.",
      "Implemented real-time streaming responses via Server-Sent Events, security measures including PII redaction and prompt injection mitigation, achieving scalability up to 10,000 concurrent requests.",
    ],
  },
  {
    title: "REX Healthify — AI Health Assistant",
    period: "Oct 2025 – Nov 2025",
    meta: "4th Place, OpenAI × NxtWave Buildathon",
    githubHref: "https://github.com/Gokulakrishnxn",
    bullets: [
      "Developed an AI-driven health assistant using Gemini AI for personalized medical guidance with features for medical record management and emergency doctor discovery.",
      "Built medication reminders, voice interaction capabilities, and NFC-based emergency access to critical health data for rapid response scenarios.",
      "Competed against 1,000+ teams and secured 4th place for building a high-impact technical solution.",
    ],
  },
  {
    title: "Privacy-Preserving Federated Learning for Drone Swarm",
    period: "Sep 2025 – Nov 2025",
    meta: "IEEE International Conference, Singapore (2025) — Best Paper Award",
    githubHref: "https://github.com/Gokulakrishnxn",
    bullets: [
      "Proposed a privacy-preserving federated learning framework enabling decentralized exploration in autonomous drone swarms without centralized control.",
      "Designed a 3D voxel-based environment with room-like obstacles and implemented LiDAR sensor simulation using 3D spherical ray marching with 8m sensing range.",
      "Developed frontier-based exploration strategies and applied Federated Averaging (FedAvg) to aggregate drone models while preserving local data privacy.",
      "Built real-time 3D visualization tools to monitor drone trajectories, environment coverage, and swarm coordination.",
    ],
  },
];

export const publications: string[] = [
  "Gokulakrishnan S, A Web-Based Intelligent Query Routing Framework for Heterogeneous Large Language Model Orchestration, IEEE International Conference, March 2026 (To be presented).",
  "Gokulakrishnan, Privacy-Preserving Federated Learning Framework for Decentralized Drone Swarm Exploration, IEEE International Conference, Singapore, Nov 2025 — Best Paper Award.",
];

export const honors: string[] = [
  "Best Paper Award, IEEE International Conference, Singapore 2025 for research in privacy-preserving federated learning.",
  "4th Place Winner, OpenAI Academy × NxtWave Buildathon among 1,000+ participants.",
  "Technical Lead, Blue Screen Programming Club: Led Innothon 2025 CodeArena hackathon with 1,000+ participants.",
  "Organized multiple technical events and hands-on workshops, driving student engagement and programming skill development.",
];
