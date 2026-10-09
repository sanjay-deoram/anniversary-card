import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import Clothesline from "./Clothesline";
import Lightbox from "./Lightbox";
import Petals from "./Petals";
import { insidePhoto, letter, photos, video } from "./content";
import { seigaiha } from "./patterns";

const FOOTER_PATTERN = seigaiha("#f5eee2", "rgba(200, 64, 47, 0.28)", 0.9);
const SAGS = [34, 42, 30, 38];

function useIsWide(query = "(min-width: 980px)") {
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setWide(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return wide;
}

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [viewing, setViewing] = useState(null);
  const wide = useIsWide();

  // Half the photos hang above the card, half below. Wide screens get one line
  // of four on each side; narrower screens get lines of two.
  const half = Math.ceil(photos.length / 2);
  const perLine = wide ? 4 : 2;
  const above = chunk(photos.slice(0, half), perLine);
  const below = chunk(photos.slice(half), perLine);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const openPhoto = useCallback((id) => setViewing(photos.findIndex((p) => p.id === id)), []);
  const nav = useCallback(
    (step) => setViewing((i) => (i + step + photos.length) % photos.length),
    []
  );

  useEffect(() => {
    const onKey = (e) => {
      if (viewing !== null) {
        if (e.key === "Escape") setViewing(null);
        if (e.key === "ArrowRight") nav(1);
        if (e.key === "ArrowLeft") nav(-1);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewing, open, nav]);

  useEffect(() => {
    document.body.style.overflow = viewing !== null ? "hidden" : "";
  }, [viewing]);

  const renderLines = (lines, offset) =>
    lines.map((group, i) => (
      <Clothesline
        key={offset + i}
        photos={group}
        sag={SAGS[(offset + i) % SAGS.length]}
        lineIndex={offset + i}
        onOpen={openPhoto}
      />
    ));

  return (
    <>
      <Petals />

      <main className="hero">
        <p className="side-text side-text--l" aria-hidden="true">愛してる</p>
        <p className="side-text side-text--r" aria-hidden="true">ずっと一緒に</p>

        <header className="hero-head">
          <p className="kicker">二人の記念日 · our anniversary</p>
          <h1>
            Happy Anniversary, <em>{letter.to}</em>
          </h1>
        </header>

        <section className="lines" aria-label="Photos of us">
          {renderLines(above, 0)}
        </section>

        <section className="card-row" aria-label="Your card">
          <div className="sun" aria-hidden="true" />
          <Card open={open} onToggle={toggle} letter={letter} insidePhoto={insidePhoto} />
        </section>

        <section className="lines lines--below" aria-label="More photos of us">
          {renderLines(below, above.length)}
        </section>
      </main>

      <section className="moments">
        <p className="kicker">小さな幸せ · little moments</p>
        <h2>{video.title}</h2>
        <div className="torii">
          <span className="torii-kasagi" aria-hidden="true" />
          <span className="torii-nuki" aria-hidden="true" />
          <figure className="torii-frame">
            <video src={video.src} poster={video.poster} controls playsInline preload="metadata" />
            <figcaption>{video.caption}</figcaption>
          </figure>
        </div>
      </section>

      <footer className="footer" style={{ backgroundImage: FOOTER_PATTERN }}>
        <div className="footer-inner">
          <p className="footer-kanji">永遠に</p>
          <p className="footer-line">
            forever yours, <em>{letter.from}</em>
          </p>
        </div>
      </footer>

      {viewing !== null && (
        <Lightbox photos={photos} index={viewing} onClose={() => setViewing(null)} onNav={nav} />
      )}
    </>
  );
}
