import { libraryItems, type LibraryItem } from "@/data/library";

function ShadcnLogo() {
  return (
    <svg viewBox="0 0 256 256" fill="none" aria-hidden="true">
      <path
        d="M208 128 128 208"
        stroke="currentColor"
        strokeWidth="32"
        strokeLinecap="round"
      />
      <path
        d="M192 40 40 192"
        stroke="currentColor"
        strokeWidth="32"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LibraryIcon({ icon }: { icon?: LibraryItem["icon"] }) {
  if (icon === "shadcn") return <ShadcnLogo />;
  return null;
}

function LibrarySlot({ item }: { item: LibraryItem }) {
  const inner = (
    <>
      <span className="library-item-icon">
        <LibraryIcon icon={item.icon} />
        {item.isNew ? (
          <span className="library-item-dot" aria-hidden="true" />
        ) : null}
      </span>
      <span className="library-item-title">{item.title}</span>
    </>
  );

  if (!item.href) {
    return <div className="library-item">{inner}</div>;
  }

  return (
    <a
      className="library-item"
      href={item.href}
      {...(item.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {inner}
    </a>
  );
}

export function LibraryCatalog() {
  const few = libraryItems.length < 3;

  return (
    <div
      className={`library-catalog${few ? " library-catalog--few" : ""}`}
      aria-label="Library"
    >
      {libraryItems.map((item) => (
        <LibrarySlot key={item.title} item={item} />
      ))}
    </div>
  );
}
