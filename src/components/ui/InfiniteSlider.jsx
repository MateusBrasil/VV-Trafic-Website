import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 25,
  speedOnHover,
  reverse = false,
  className,
  style,
}) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const contentSize = width + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to   = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: currentSpeed * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey(k => k + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentSpeed,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return controls?.stop;
  }, [key, translation, currentSpeed, width, gap, isTransitioning, reverse]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => { setIsTransitioning(true); setCurrentSpeed(speedOnHover); },
        onHoverEnd:   () => { setIsTransitioning(true); setCurrentSpeed(speed); },
      }
    : {};

  return (
    <div style={{ overflow: 'hidden', ...style }} className={className}>
      <motion.div
        ref={ref}
        style={{ display: 'flex', gap: `${gap}px`, width: 'max-content', x: translation }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
