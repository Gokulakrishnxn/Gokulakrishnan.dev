import { writingItems } from "@/data/writing";
import { AriaAppIcon } from "./AriaAppIcon";
import { LiveDot } from "./LiveDot";
import { NewBadge } from "./NewBadge";

export function BlogIndex() {
  return (
    <section className="blog-list" aria-label="Blog posts">
      {writingItems.map((item) => (
        <a
          key={item.href}
          className="blog-card"
          href={item.href}
          {...(item.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined)}
        >
          <div className="blog-card-kicker">
            {item.title === "ARIA" ? (
              <AriaAppIcon className="aria-app-icon--inline" />
            ) : item.icon ? (
              <img
                src={item.icon}
                alt=""
                width={18}
                height={18}
                className={`app-icon app-icon--inline${item.icon === "/web.png" ? " app-icon--web" : ""}`}
              />
            ) : null}
            <h2>
              {item.title}
              {item.isLive ? <LiveDot /> : null}
              {item.isNew ? <NewBadge /> : null}
            </h2>
          </div>
          <p>{item.excerpt}</p>
          <time dateTime={item.datetime}>{item.published}</time>
        </a>
      ))}
    </section>
  );
}
