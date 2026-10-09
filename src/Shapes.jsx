export function SakuraPetal({ color = "#f3b9c4", ...props }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 22C5.5 15.5 5.2 7.5 10.4 2.2L12 4.4l1.6-2.2C18.8 7.5 18.5 15.5 12 22Z"
        fill={color}
      />
      <path d="M12 21c-.6-4.5-.6-9 0-14" stroke="#fff" strokeOpacity=".45" fill="none" />
    </svg>
  );
}

export function MapleLeaf({ color = "#c8402f", ...props }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 1.5 13.6 6.8 17.4 4.6 16.2 9.6 21.8 8.8 17.6 13.2 19.6 14.8 13.4 15.8 12.6 19h-1.2l-.8-3.2-6.2-1 2-1.6-4.2-4.4 5.6.8-1.2-5 3.8 2.2Z"
        fill={color}
      />
      <path d="M12 6v17" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function Hanko({ char = "愛", className = "" }) {
  return (
    <span className={`hanko ${className}`} aria-hidden="true">
      {char}
    </span>
  );
}
