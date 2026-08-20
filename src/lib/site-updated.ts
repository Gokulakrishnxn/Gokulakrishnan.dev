import { execSync } from "node:child_process";

const TIME_ZONE = "Asia/Kolkata";

function gitOutput(command: string) {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function gitLastCommitDate() {
  const iso = gitOutput("git log -1 --format=%cI");
  const date = iso ? new Date(iso) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
}

function workingTreeHasChanges() {
  return gitOutput("git status --porcelain") !== "";
}

export function getSiteUpdatedAt() {
  const committed = gitLastCommitDate();
  if (workingTreeHasChanges() || !committed) {
    return new Date();
  }
  return committed;
}

export function getSiteUpdatedLabel(date = getSiteUpdatedAt()) {
  const label = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);

  const datetime = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
  }).format(date);

  return {
    label: `Updated ${label}`,
    datetime,
  };
}
