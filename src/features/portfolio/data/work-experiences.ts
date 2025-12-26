import type { ExperienceItemType } from "@/registry/work-experience/work-experience";

function formatEmploymentPeriod(start: string, end?: string): string {
  if (!end) {
    return `${start} — present`;
  }
  return `${start} — ${end}`;
}

export const WORK_EXPERIENCES: ExperienceItemType[] = [
  {
    id: "thebinaryholdings",
    companyName: "The Binary Holdings",
    companyLogo: "https://www.thebinaryholdings.com/favicon.ico",
    isCurrentEmployer: true,
    positions: [
      {
        id: "tbh-ai-engineer-intern",
        title: "AI Engineer Intern",
        employmentPeriod: formatEmploymentPeriod("11.2024"),
        employmentType: "Internship",
        icon: "code",
        description: `**Project Name:** Buddy.ai – 3D Animated Emotional Assistance Chatbot

**High-Level Objective:** Developing a sentiment-aware 3D avatar designed to provide real-time emotional support through empathetic natural language processing for mental health assistance.

- **3D Avatar & Lip-Sync** - Integrated a 3D animated character (using Three.js or Unity) with automated lip-syncing and micro-expressions that dynamically react to detected user sentiments.
- **System Architecture** - Designed a low-latency full-stack architecture with Python backend and React frontend, enabling seamless communication between LLMs and the 3D rendering engine.
- **Ethical AI Design** - Implemented ethical AI guardrails to ensure safe mental-health-related interactions, achieving 100% compliance with university safety standards.`,
        skills: [
          "Python",
          "React",
          "Three.js",
          "Unity",
          "Large Language Models",
          "Sentiment Analysis",
          "Natural Language Processing",
          "3D Animation",
          "Ethical AI",
          "Full-Stack Development",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "freelance",
    companyName: "Freelance",
    positions: [
      {
        id: "f0becfba-057d-40db-b252-739e1654faa1",
        title: "Full-stack Developer",
        employmentPeriod: formatEmploymentPeriod("2023", "2025"),
        employmentType: "Part-time",
        icon: "code",
        description: `- Built an order management website with real-time delivery tracking.
- Developed an e-commerce site for bird's nest products.
- Created a map to display monitoring station data.
- Designed a customizable WordPress landing page.`,
        skills: [
          "Laravel",
          "React",
          "Express.js",
          "Socket.IO",
          "MongoDB",
          "Firebase",
          "WordPress",
          "Docker",
          "NGINX",
        ],
      },
      {
        id: "0eecdfcb-028d-41f4-93e9-1269ba7eff7e",
        title: "Graphic & UI/UX Designer",
        employmentPeriod: formatEmploymentPeriod("2021", "2024"),
        employmentType: "Part-time",
        icon: "design",
        description: "Designed logos, posters, ads, and UI.",
        skills: [
          "Creativity",
          "UI/UX Design",
          "Graphic Design",
          "Sketch",
          "Adobe Photoshop",
          "Adobe Illustrator",
        ],
      },
    ],
  },
  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "c47f5903-88ae-4512-8a50-0b91b0cf99b6",
        title: "Hindustan Institute of Technology and Science, Chennai",
        employmentPeriod: formatEmploymentPeriod("09.2022", "05.2026"),
        icon: "education",
        description: `- B.Tech. in Computer Science (Specialization: AI & Data Science)
- CGPA: 8.26/10
- Language Proficiency: English
- Technical Lead of Blue Screen Programming Club (2024-2025)
  - Hosted [Innothon 2025 CodeArena](https://innothon-2025.vercel.app/events/code-arena) with 1,000+ participants
  - Organized multiple technical events and hands-on workshops for the club
  - Drove student engagement and programming skill development`,
        skills: [
          "C++",
          "Java",
          "Python",
          "Data Structures",
          "Algorithms",
          "Advanced Databases",
          "Systems Design",
          "Distributed Systems",
          "Software Engineering",
          "Artificial Intelligence",
          "Data Science",
          "Machine Learning",
          "Event Management",
          "Workshop Organization",
          "Leadership",
          "Team Coordination",
          "Self-learning",
          "Teamwork",
          "Presentation",
        ],
      },
      {
        id: "36c4c6fb-02d0-48c0-8947-fda6e9a24af7",
        title: "John dewey Higer secondary School",
        employmentPeriod: formatEmploymentPeriod("09.2017", "06.2022"),
        icon: "education",
        description: `- Recognized as the most outstanding student of the district by [Spell Bee](https://spellbeeinternational.com/).
- Achieved numerous awards at district and national levels:
  - 1st prize — Gold Medalist, State Level Throwball Championship, cuddalore,Tamil Nadu
  - 1st prize — Under 19 district level Basket Ball Championship, Cuddalore, Tamil Nadu 
  - Awarded 'Best Handwriting' recognition at NATIONAL HANDWRITING COMPETITION 2018
`,
        skills: [],
      },
    ],
  },
];
