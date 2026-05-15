import { useState } from 'react';

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 25,
  speedOnHover,
  reverse = false,
  className,
  style,
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ overflow: 'hidden', ...style }} className={className}>
      <div
        onMouseEnter={speedOnHover ? () => setPaused(true) : undefined}
        onMouseLeave={speedOnHover ? () => setPaused(false) : undefined}
        style={{
          display: 'flex',
          gap: `${gap}px`,
          width: 'max-content',
          animation: `infiniteSliderLoop ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
