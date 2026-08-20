import { groupWritingByYear, writingItems } from "@/data/writing";
import { AriaAppIcon } from "./AriaAppIcon";
import { LiveDot } from "./LiveDot";
import { NewBadge } from "./NewBadge";

export function WritingList() {
  const groups = groupWritingByYear(writingItems);

  return (
    <section className="post-list" data-variant="primary">
      <h3>Writing</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.year}>
            <ul>
              {group.items.map((item, index) => (
                <li key={item.title}>
                  <a
                    className={`post-item${index === 0 ? " is-first" : ""}`}
                    href={item.href}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : undefined)}
                  >
                    <h2>
                      {item.title === "ARIA" ? (
                        <AriaAppIcon className="app-icon--inline" />
                      ) : item.icon ? (
                        <img
                          src={item.icon}
                          alt=""
                          width={18}
                          height={18}
                          className="app-icon app-icon--inline"
                        />
                      ) : null}
                      {item.title}
                      {item.isLive ? <LiveDot /> : null}
                      {item.isNew ? <NewBadge /> : null}
                    </h2>
                    <time dateTime={item.datetime}>
                      <span className="day">{item.date}</span>
                      <span className="slash">/</span>
                      <span className="year">{item.year}</span>
                    </time>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
