/** Thin wrapper around the shared /icons.svg sprite. <Icon name="arrow" size={16} /> */
export default function Icon({ name, size = 20, className = '', style, strokeWidth }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      style={strokeWidth ? { strokeWidth, ...style } : style}
    >
      <use href={`/icons.svg#i-${name}`} />
    </svg>
  );
}
