export function WebAppIcon({ className }: { className?: string }) {
  return (
    <img
      src="/web.png"
      alt=""
      width={40}
      height={40}
      aria-hidden="true"
      className={`app-icon app-icon--web${className ? ` ${className}` : ""}`}
    />
  );
}
