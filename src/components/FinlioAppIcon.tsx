export function FinlioAppIcon({ className }: { className?: string }) {
  return (
    <img
      src="/Finlio.png"
      alt=""
      width={40}
      height={40}
      className={`app-icon${className ? ` ${className}` : ""}`}
    />
  );
}
