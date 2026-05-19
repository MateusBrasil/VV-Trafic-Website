import styled from 'styled-components';

const SliderOuter = styled.div`
  overflow: hidden;
`;

const SliderTrack = styled.div`
  display: flex;
  gap: ${p => p.$gap}px;
  width: max-content;
  will-change: transform;
  backface-visibility: hidden;
  animation: infiniteSliderLoop ${p => p.$speed}s linear infinite;
  animation-direction: ${p => p.$reverse ? 'reverse' : 'normal'};
`;

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 25,
  reverse = false,
  className,
}) {
  return (
    <SliderOuter className={className}>
      <SliderTrack $gap={gap} $speed={speed} $reverse={reverse}>
        {children}
        {children}
      </SliderTrack>
    </SliderOuter>
  );
}
