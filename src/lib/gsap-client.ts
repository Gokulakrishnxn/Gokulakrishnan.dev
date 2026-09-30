"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

if (typeof window !== "undefined") {
  gsap.ticker.lagSmoothing(1000, 16);
}

export { gsap, useGSAP };
