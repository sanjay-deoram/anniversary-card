const toUrl = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

// 青海波 (seigaiha): overlapping wave scales. Lower rows are painted last so they
// cover the bottoms of the rows above, leaving only the top arcs visible.
export function seigaiha(fill, stroke, strokeWidth = 1) {
  const scale = (x, y) =>
    `<g transform="translate(${x} ${y})" stroke="${stroke}" stroke-width="${strokeWidth}">` +
    `<circle r="19" fill="${fill}"/>` +
    [14, 9, 4].map((r) => `<circle r="${r}" fill="none"/>`).join("") +
    `</g>`;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 40 20">` +
    scale(0, 0) +
    scale(40, 0) +
    scale(-20, 10) +
    scale(20, 10) +
    scale(60, 10) +
    scale(0, 20) +
    scale(40, 20) +
    `</svg>`;
  return toUrl(svg);
}
