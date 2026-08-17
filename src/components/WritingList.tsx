import { groupWritingByYear, writingItems } from "@/data/writing";
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
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h2>
                      {item.title}
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
