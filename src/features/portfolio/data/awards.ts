import type { Award } from "../types/awards";

export const AWARDS: Award[] = [
  {
    id: "ieee-best-paper",
    prize: "Best Paper Award",
    title: "IEEE International Conference, Singapore (2025)",
    date: "2025-11",
    grade: "Research",
    description: `Published research paper and awarded Best Paper Award for research in privacy-preserving federated learning.

**Paper:** Privacy-Preserving Federated Learning Framework for Decentralized Drone Swarm Exploration

This research proposed a privacy-preserving federated learning framework enabling decentralized exploration in autonomous drone swarms without centralized control, featuring 3D voxel-based environments, LiDAR sensor simulation, and real-time visualization tools.`,
    referenceLink: "https://www.ieee.org/publications-research",
  },
  {
    id: "openai-nxtwave-buildathon",
    prize: "4th Place",
    title: "OpenAI Academy × NxtWave Buildathon",
    date: "2024-11",
    grade: "Hackathon",
    description: `4th Place Winner among 1,000+ participants for building a high-impact technical solution.

**Project:** REX Healthify - AI Health Assistant

Developed an AI-driven health assistant using Gemini AI for personalized medical guidance with features for medical record management, emergency doctor discovery, medication reminders, voice interaction, and NFC-based emergency access.`,
    referenceLink:
      "https://drive.google.com/file/d/1Wb0IEt39fxXbxtr9-dQtL6UwFTDogB36/view?usp=sharing",
  },
];
