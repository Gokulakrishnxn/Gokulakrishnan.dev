export const PETER_OPEN_EVENT = "peter:open";
export const PETER_CLOSE_EVENT = "peter:close";

export function openPeter() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PETER_OPEN_EVENT));
}

export function closePeter() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PETER_CLOSE_EVENT));
}
