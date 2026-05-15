import { useState } from 'react';
import styled from 'styled-components';

const SliderOuter = styled.div`
  overflow: hidden;
`;

const SliderTrack = styled.div`
  display: flex;
  gap: ${p => p.$gap}px;
  width: max-content;
  animation: infiniteSliderLoop ${p => p.$speed}s linear infinite;
  animation-direction: ${p => p.$reverse ? 'reverse' : 'normal'};
  animation-play-state: ${p => p.$paused ? 'paused' : 'running'};
`;

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 25,
  speedOnHover,
  reverse = false,
  className,
}) {
  const [paused, setPaused] = useState(false);

  return (
    <SliderOuter className={className}>
      <SliderTrack
        onMouseEnter={speedOnHover ? () => setPaused(true) : undefined}
        onMouseLeave={speedOnHover ? () => setPaused(false) : undefined}
        $gap={gap}
        $speed={speed}
        $reverse={reverse}
        $paused={paused}
      >
        {children}
        {children}
      </SliderTrack>
    </SliderOuter>
  );
}
