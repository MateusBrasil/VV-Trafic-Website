const GRADIENT_ANGLES = { top: 0, right: 90, bottom: 180, left: 270 };

export function ProgressiveBlur({
  direction = 'bottom',
  blurLayers = 8,
  blurIntensity = 0.25,
  style,
  className,
  ...props
}) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);
  const angle = GRADIENT_ANGLES[direction];

  return (
    <div style={{ position: 'relative', ...style }} className={className}>
      {Array.from({ length: layers }).map((_, i) => {
        const stops = [
          i * segmentSize,
          (i + 1) * segmentSize,
          (i + 2) * segmentSize,
          (i + 3) * segmentSize,
        ].map((pos, pi) =>
          `rgba(255,255,255,${pi === 1 || pi === 2 ? 1 : 0}) ${pos * 100}%`
        );
        const gradient = `linear-gradient(${angle}deg, ${stops.join(',')})`;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${i * blurIntensity}px)`,
            }}
            {...props}
          />
        );
      })}
    </div>
  );
}
