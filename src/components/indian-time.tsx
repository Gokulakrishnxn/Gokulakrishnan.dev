"use client";

import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export function IndianTime() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const indianTime = TZDate.tz("Asia/Kolkata");
      const formattedTime = format(indianTime, "HH:mm:ss");
      setTimeString(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeString) {
    return (
      <span className="font-mono text-xs text-muted-foreground">
        00:00:00 IST
      </span>
    );
  }

  return (
    <span
      className="font-mono text-xs text-muted-foreground"
      aria-label={`Current Indian Standard Time: ${timeString}`}
    >
      {timeString} IST
    </span>
  );
}
