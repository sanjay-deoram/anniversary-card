import { useMemo } from "react";
import { MapleLeaf, SakuraPetal } from "./Shapes";

const SAKURA = ["#f7c9d2", "#f3b9c4", "#fbe1e6", "#eeaab8"];
const MOMIJI = ["#c8402f", "#d9622b", "#e39a3b"];

// Sakura petals with a few autumn maple leaves, for the Kyoto season we were there.
export default function Petals({ count = 22 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const leaf = i % 5 === 0;
        const palette = leaf ? MOMIJI : SAKURA;
        return {
          key: i,
          leaf,
          color: palette[i % palette.length],
          style: {
            left: `${Math.random() * 100}%`,
            "--size": `${leaf ? 16 + Math.random() * 10 : 10 + Math.random() * 10}px`,
            "--fall": `${11 + Math.random() * 10}s`,
            "--delay": `${-Math.random() * 20}s`,
            "--sway": `${2.6 + Math.random() * 2.4}s`,
            "--drift": `${(Math.random() - 0.5) * 120}px`,
            opacity: 0.55 + Math.random() * 0.4,
          },
        };
      }),
    [count]
  );

  return (
    <div className="petals" aria-hidden="true">
      {items.map((p) => (
        <span className="petal" style={p.style} key={p.key}>
          <span className="petal-sway">
            {p.leaf ? <MapleLeaf color={p.color} /> : <SakuraPetal color={p.color} />}
          </span>
        </span>
      ))}
    </div>
  );
}
