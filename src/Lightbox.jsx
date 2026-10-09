export default function Lightbox({ photos, index, onClose, onNav }) {
  const photo = photos[index];
  if (!photo) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={photo.caption} onClick={onClose}>
      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.alt} />
        <figcaption>{photo.caption}</figcaption>
      </figure>
      <button type="button" className="lightbox-btn lightbox-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); onNav(-1); }}>
        ‹
      </button>
      <button type="button" className="lightbox-btn lightbox-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); onNav(1); }}>
        ›
      </button>
      <button type="button" className="lightbox-btn lightbox-close" aria-label="Close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
