import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "thebinaryholdings",
    companyName: "The Binary Holdings",
    isCurrentEmployer: true,
    positions: [
      {
        id: "tbh-ai-engineer-intern",
        title: "AI Engineer Intern",
        employmentPeriod: {
          start: "12.2024",
        },
        employmentType: "Internship",
        description: `**Project Name:** Buddy.ai – 3D Animated Emotional Assistance Chatbot

**High-Level Objective:** Developing a sentiment-aware 3D avatar designed to provide real-time emotional support through empathetic natural language processing.

- **3D Avatar & Lip-Sync** - Integrated a 3D animated character (using Three.js or Unity) with automated lip-syncing and micro-expressions that dynamically react to detected user sentiments.
- **System Architecture** - Implemented a full-stack solution using Python for the backend and React for the frontend, ensuring low-latency communication between the LLM and 3D rendering engine.
- **Ethical AI Design** - Applied ethical guardrails to ensure safe interactions, maintaining 100% compliance with university safety standards for mental health-related assistance.`,
        icon: "code",
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
        employmentPeriod: {
          start: "2023",
          end: "2025",
        },
        employmentType: "Part-time",
        description: `- Built an order management website with real-time delivery tracking.
- Developed an e-commerce site for bird's nest products.
- Created a map to display monitoring station data.
- Designed a customizable WordPress landing page.`,
        icon: "code",
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
        employmentPeriod: {
          start: "2021",
          end: "2024",
        },
        employmentType: "Part-time",
        description: "Designed logos, posters, ads, and UI.",
        icon: "design",
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
        title: "Hindustan University Chennai",
        employmentPeriod: {
          start: "2022",
          end: "2026",
        },
        icon: "education",
        description: `- Final Year Student studying for a Bachelor's of Technology degree in Computer Science and Engineering specialized in artificial intelligence and data science.
- Language Proficiency: English.
- Technical Lead of Blue Screen Programming Club (2024-2025)
  - Hosted [Innothon 2025 Codearena](https://innothon-2025.vercel.app/events/code-arena) with 1000+ participants.
  - Organized multiple events and workshops for the club.`,
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
        employmentPeriod: {
          start: "09.2017",
          end: "06.2022",
        },
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
