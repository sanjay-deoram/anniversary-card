const TOP = 14; // where the twine meets the edges, in px
const PIN_HALF = 17; // half the clothespin height, so pins sit centered on the twine

// The twine is a quadratic curve from x=-10 to x=1010 with its control point at
// x=500, so x is linear in t and we can solve for the sag under each photo exactly.
function twineY(u, sag) {
  const t = (u * 1000 + 10) / 1020;
  return TOP + 4 * sag * t * (1 - t);
}

export default function Clothesline({ photos, sag, lineIndex, onOpen }) {
  const n = photos.length;
  const height = TOP + sag + 8;
  const d = `M-10 ${TOP} Q500 ${TOP + 2 * sag} 1010 ${TOP}`;

  return (
    <div className="line" style={{ "--cols": n }}>
      <svg
        className="line-twine"
        viewBox={`0 0 1000 ${height}`}
        height={height}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={d} className="twine" vectorEffect="non-scaling-stroke" />
        <path d={d} className="twine-twist" vectorEffect="non-scaling-stroke" />
      </svg>

      <ul className="line-photos">
        {photos.map((photo, i) => {
          const y = twineY((i + 0.5) / n, sag);
          const order = lineIndex * 4 + i;
          return (
            <li key={photo.id} style={{ paddingTop: y - PIN_HALF }}>
              <div className="drop" style={{ "--drop-delay": `${0.15 + order * 0.12}s` }}>
                <div
                  className="hang"
                  style={{
                    "--tilt": `${photo.tilt}deg`,
                    "--sway-dur": `${3.2 + ((order * 0.7) % 1.6)}s`,
                    "--sway-delay": `${-order * 0.9}s`,
                  }}
                >
                  <span className="pin" aria-hidden="true" />
                  <button
                    type="button"
                    className={`polaroid polaroid--${photo.shape}`}
                    onClick={() => onOpen(photo.id)}
                    aria-label={`View photo: ${photo.caption}`}
                  >
                    <img
                      src={photo.thumb}
                      alt={photo.alt}
                      style={{ objectPosition: photo.focus }}
                      draggable="false"
                    />
                    <span className="polaroid-caption">{photo.caption}</span>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
