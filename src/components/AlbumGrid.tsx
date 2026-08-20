import { albumShots } from "@/data/album";

export function AlbumGrid() {
  if (albumShots.length === 0) {
    return <p className="album-empty">Nothing in the album yet.</p>;
  }

  return (
    <div className="album-grid">
      {albumShots.map((shot) => (
        <figure
          key={shot.src}
          className={`album-shot album-shot--${shot.aspect ?? "portrait"}`}
        >
          <div className="album-shot-frame">
            <img src={shot.src} alt={shot.alt} />
          </div>
          {shot.caption || shot.place ? (
            <figcaption>
              {shot.caption}
              {shot.caption && shot.place ? " · " : null}
              {shot.place}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
