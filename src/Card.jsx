import { useCallback, useEffect, useRef, useState } from "react";
import { seigaiha } from "./patterns";
import { Hanko, MapleLeaf, SakuraPetal } from "./Shapes";

const COVER_PATTERN = seigaiha("#b8372a", "rgba(232, 196, 120, 0.42)", 0.8);
const BURST_COLORS = ["#f7c9d2", "#f3b0be", "#fbe1e6", "#e0563f", "#e8a33d"];

function makeBurst() {
  return Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 140 + Math.random() * 220;
    return {
      key: i,
      leaf: i % 4 === 0,
      color: BURST_COLORS[i % BURST_COLORS.length],
      style: {
        "--dx": `${Math.cos(angle) * dist}px`,
        "--dy": `${Math.sin(angle) * dist * 0.75 - 60}px`,
        "--r": `${(Math.random() - 0.5) * 720}deg`,
        "--s": 0.6 + Math.random() * 0.7,
        "--d": `${Math.random() * 0.25}s`,
      },
    };
  });
}

export default function Card({ open, onToggle, letter, insidePhoto }) {
  const [burst, setBurst] = useState(null);
  const wasOpen = useRef(open);
  const letterRef = useRef(null);
  const [more, setMore] = useState(false);

  // When the letter is longer than the card, show a cue until it's scrolled to the end.
  const checkMore = useCallback(() => {
    const el = letterRef.current;
    if (el) setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 8);
  }, []);

  useEffect(() => {
    checkMore();
    window.addEventListener("resize", checkMore);
    return () => window.removeEventListener("resize", checkMore);
  }, [checkMore]);

  const scrollMore = () => {
    const el = letterRef.current;
    el?.scrollBy({ top: el.clientHeight * 0.75, behavior: "smooth" });
  };

  // Petals spill out of the card each time it opens.
  useEffect(() => {
    if (open && !wasOpen.current) {
      const id = Date.now();
      setBurst({ id, petals: makeBurst() });
      const timer = setTimeout(() => setBurst((b) => (b?.id === id ? null : b)), 2800);
      wasOpen.current = open;
      return () => clearTimeout(timer);
    }
    wasOpen.current = open;
  }, [open]);

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className={`card-stage${open ? " is-open" : ""}`}>
      <div className="card">
        {/* Inside right: the letter */}
        <article className="card-page" aria-hidden={!open}>
          <div className={`letter${more ? " has-more" : ""}`} ref={letterRef} onScroll={checkMore}>
            <p className="letter-to reveal" style={{ "--i": 0 }}>
              <span className="letter-label">To:</span> {letter.to}
            </p>
            {letter.paragraphs.map((text, i) => (
              <p className="letter-body reveal" style={{ "--i": i + 1 }} key={i}>
                {text}
              </p>
            ))}
            <p className="letter-from reveal" style={{ "--i": letter.paragraphs.length + 1 }}>
              <span className="letter-label">From:</span> {letter.from}
            </p>
            <Hanko className="letter-hanko reveal" />
          </div>
          {more && (
            <button
              type="button"
              className="letter-more"
              onClick={scrollMore}
              tabIndex={open ? 0 : -1}
            >
              more ↓
            </button>
          )}
          <button
            type="button"
            className="card-close"
            onClick={onToggle}
            tabIndex={open ? 0 : -1}
          >
            閉じる · close
          </button>
        </article>

        {/* The cover: front outside, back is the inside left page */}
        <div className="card-cover">
          <div
            className="cover-front"
            role="button"
            tabIndex={open ? -1 : 0}
            aria-label={`Open the card for ${letter.to}`}
            aria-expanded={open}
            onClick={open ? undefined : onToggle}
            onKeyDown={open ? undefined : onKey}
            style={{ backgroundImage: COVER_PATTERN }}
          >
            <div className="cover-border" />
            <p className="cover-kicker">記念日</p>
            <div className="cover-sun">
              <span className="cover-to">to my</span>
              <span className="cover-name">{letter.to}</span>
            </div>
            <p className="cover-title">Happy Anniversary</p>
            <p className="cover-hint">
              <span>開けてね</span> tap to open
            </p>
            <div className="cover-obi" aria-hidden="true">
              <span className="cover-obi-text">ずっと一緒に</span>
              <Hanko />
            </div>
          </div>

          <div
            className="cover-back"
            role="button"
            tabIndex={open ? 0 : -1}
            aria-label="Close the card"
            onClick={open ? onToggle : undefined}
            onKeyDown={open ? onKey : undefined}
          >
            <figure className="inside-photo">
              <span className="tape tape--l" aria-hidden="true" />
              <span className="tape tape--r" aria-hidden="true" />
              <img src={insidePhoto.src} alt={insidePhoto.alt} />
            </figure>
            <p className="inside-line">{insidePhoto.line}</p>
            <p className="inside-meta">
              {insidePhoto.place}
              <br />
              {insidePhoto.date}
            </p>
            <MapleLeaf className="inside-leaf" color="#c8402f" />
            <p className="inside-hint">tap here to close</p>
          </div>
        </div>

        {burst && (
          <div className="burst" key={burst.id} aria-hidden="true">
            {burst.petals.map((p) =>
              p.leaf ? (
                <MapleLeaf key={p.key} className="burst-bit" color={p.color} style={p.style} />
              ) : (
                <SakuraPetal key={p.key} className="burst-bit" color={p.color} style={p.style} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
