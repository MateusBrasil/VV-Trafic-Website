import styled from 'styled-components';

const GRADIENT_ANGLES = { top: 0, right: 90, bottom: 180, left: 270 };

const BlurLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  mask-image: ${p => p.$gradient};
  -webkit-mask-image: ${p => p.$gradient};
  backdrop-filter: blur(${p => p.$blur}px);
`;

const BlurWrap = styled.div`
  position: relative;
`;

export function ProgressiveBlur({
  direction = 'bottom',
  blurLayers = 8,
  blurIntensity = 0.25,
  className,
  ...props
}) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);
  const angle = GRADIENT_ANGLES[direction];

  return (
    <BlurWrap className={className} {...props}>
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
          <BlurLayer
            key={i}
            $gradient={gradient}
            $blur={i * blurIntensity}
          />
        );
      })}
    </BlurWrap>
  );
}
