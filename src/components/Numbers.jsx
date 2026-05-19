import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ZeroButton from './ZeroButton';
import { useLang } from '../context/LanguageContext';
import { T } from '../i18n/translations';

/* ─── CountUp ─── */
function CountUp({ to, prefix = "", suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let kill;
    Promise.all([
      import('gsap').then(m => m.default),
      import('gsap/ScrollTrigger').then(m => m.ScrollTrigger),
    ]).then(([gsap, ScrollTrigger]) => {
      gsap.registerPlugin(ScrollTrigger);
      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: to,
        duration: duration / 1000,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: () => setVal(obj.val),
      });
      kill = () => tween.kill();
    });
    return () => kill?.();
  }, [to, duration]);

  const display = Number.isInteger(to)
    ? Math.round(val).toLocaleString("pt-PT")
    : val.toFixed(1);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ─── Styled ─── */
const StatsWrap = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr 0.9fr;
  gap: 2px;
  margin: 60px 0 72px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.03);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1px;
  }
`;

const StatCard = styled.div`
  padding: 44px 40px 40px;
  position: relative;
  background: rgba(10,26,16,0.6);
  backdrop-filter: blur(12px);
  transition: background 0.4s ease;
  overflow: hidden;

  @media (max-width: 480px) { padding: 32px 28px; }

  /* top accent bar */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--c-verde), transparent);
    opacity: 0.5;
    transition: opacity 0.4s ease;
  }

  /* corner glow */
  &::after {
    content: '';
    position: absolute;
    top: -60px; left: -60px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46,134,193,0.06) 0%, transparent 70%);
    pointer-events: none;
    transition: opacity 0.4s ease;
    opacity: 0;
  }

  &:hover {
    background: rgba(46,134,193,0.04);
    &::before { opacity: 1; }
    &::after  { opacity: 1; }
    .val-num  { text-shadow: 0 0 40px rgba(46,134,193,0.3); }
  }

  .eyebrow {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(46,134,193,0.6);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '';
      width: 16px; height: 1px;
      background: rgba(46,134,193,0.4);
    }
  }

  .val-num {
    font-size: clamp(3rem, 5vw, 4.8rem);
    font-weight: 900;
    font-family: var(--font-display);
    color: #fff;
    line-height: 1;
    letter-spacing: -.04em;
    margin-bottom: 0;
    transition: text-shadow 0.4s ease;

    em {
      font-style: normal;
      color: var(--c-verde);
    }
  }

  .divider {
    width: 32px;
    height: 1px;
    background: rgba(255,255,255,0.12);
    margin: 20px 0;
  }

  .label {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.4);
    line-height: 1.6;
    max-width: 200px;
  }
`;

/* ─── Carousel ─── */
const CarouselWrap = styled.div`
  position: relative;
  user-select: none;
`;

const SlideTrack = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #0a1a10;
  /* 16:9 aspect ratio */
  aspect-ratio: 16 / 9;
  @media (max-width: 600px) { aspect-ratio: 4 / 3; border-radius: 14px; }
`;

const SlideImg = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
`;

/* placeholder shown when image not yet added */
const Placeholder = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(10,26,16,0.95);
  color: rgba(255,255,255,0.3);
  font-size: 0.8rem;
  letter-spacing: .06em;
  text-align: center;
  padding: 24px;

  .icon { font-size: 2.5rem; opacity: .3; }
  .name { color: rgba(46,134,193,0.5); font-weight: 700; font-size: 0.9rem; }
`;

/* side arrow buttons */
const ArrowBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${p => p.$left ? 'left: 12px;' : 'right: 12px;'}
  z-index: 10;
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .2s ease;
  @media (max-width: 480px) { width: 36px; height: 36px; font-size: 1rem; }
  &:hover { background: rgba(46,134,193,0.2); border-color: rgba(46,134,193,0.4); color: #2E86C1; }
`;

/* counter badge top-right */
const CounterBadge = styled.div`
  position: absolute;
  top: 14px; right: 14px;
  z-index: 10;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
  letter-spacing: .08em;
`;

/* dots */
const DotsRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
`;

const Dot = styled.button`
  width: ${p => p.$active ? '28px' : '8px'};
  height: 8px;
  border-radius: 4px;
  background: ${p => p.$active ? 'var(--c-verde)' : 'rgba(255,255,255,0.15)'};
  border: none;
  cursor: pointer;
  transition: all .3s ease;
  padding: 0;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    inset: -18px -12px;
  }
`;

/* progress bar at bottom of slide */
const ProgressBar = styled.div`
  position: absolute;
  bottom: 0; left: 0;
  height: 3px;
  background: var(--c-verde);
  border-radius: 0 2px 0 0;
  z-index: 10;
  width: ${p => p.$pct}%;
  transition: width linear;
`;

const HiddenImg = styled.img`display: none;`;

const PlaceholderCode = styled.code`
  color: #2E86C1;
  font-size: 0.75rem;
`;

const MotionFill = styled(motion.div)`
  position: absolute;
  inset: 0;
`;

/* ─── Slides data — two sets, switched by language ─── */
const SLIDES_PT = [
  { src: '/provas/prova-1.png', label: 'Caso de Sucesso · Resultados Reais' },
  { src: '/provas/prova-2.png', label: 'Caso de Sucesso · Resultados Reais' },
  { src: '/provas/prova-3.png', label: 'Caso de Sucesso · Resultados Reais' },
  { src: '/provas/prova-4.png', label: 'Caso de Sucesso · Resultados Reais' },
  { src: '/provas/prova-5.png', label: 'Caso de Sucesso · Resultados Reais' },
];

const SLIDES_EN = [
  { src: '/provas/prova-1-en.png', label: 'Success Story · Real Results' },
  { src: '/provas/prova-2-en.png', label: 'Success Story · Real Results' },
  { src: '/provas/prova-3-en.png', label: 'Success Story · Real Results' },
  { src: '/provas/prova-4-en.png', label: 'Success Story · Real Results' },
  { src: '/provas/prova-5-en.png', label: 'Success Story · Real Results' },
];

const SLIDES_AR = [
  { src: '/provas/prova-1-ar.webp', label: 'قصة نجاح · نتائج حقيقية' },
  { src: '/provas/prova-2-ar.webp', label: 'قصة نجاح · نتائج حقيقية' },
  { src: '/provas/prova-3-ar.webp', label: 'قصة نجاح · نتائج حقيقية' },
  { src: '/provas/prova-4-ar.webp', label: 'قصة نجاح · نتائج حقيقية' },
  { src: '/provas/prova-5-ar.webp', label: 'قصة نجاح · نتائج حقيقية' },
];

const INTERVAL = 5000;

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

function ProvasCarousel() {
  const { lang } = useLang();
  const tn = T[lang].numbers;
  const slides = lang === 'ar' ? SLIDES_AR : lang === 'en' ? SLIDES_EN : SLIDES_PT;

  const [[idx, dir], setPage] = useState([0, 0]);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  // Reset carousel when language changes
  useEffect(() => {
    setPage([0, 0]);
    setProgress(0);
  }, [lang]);

  // Warm cache for all slides so navigation never shows a blank frame.
  useEffect(() => {
    slides.forEach((s) => { const img = new Image(); img.src = s.src; });
  }, [slides]);

  const paginate = useCallback((newDir) => {
    setPage(([cur]) => [(cur + newDir + slides.length) % slides.length, newDir]);
    setProgress(0);
  }, []);

  /* progress ticker */
  useEffect(() => {
    setProgress(0);
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        paginate(1);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [idx, paginate]);

  const goTo = (i) => setPage(([cur]) => [i, i > cur ? 1 : -1]);

  return (
    <CarouselWrap>
      <SlideTrack>
        <AnimatePresence custom={dir} initial={false} mode="wait">
          <MotionFill
            key={idx}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SlideImg
              src={slides[idx].src}
              alt={slides[idx].label}
              draggable={false}
              width="1280"
              height="720"
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchpriority={idx === 0 ? "high" : "auto"}
            />
          </MotionFill>
        </AnimatePresence>

        {/* arrows */}
        <ArrowBtn $left onClick={() => paginate(-1)} aria-label={tn.prev}>‹</ArrowBtn>
        <ArrowBtn onClick={() => paginate(1)} aria-label={tn.next}>›</ArrowBtn>

        {/* counter */}
        <CounterBadge>{idx + 1} / {slides.length}</CounterBadge>

        {/* progress bar */}
        <ProgressBar $pct={progress} />
      </SlideTrack>

      {/* dots */}
      <DotsRow>
        {slides.map((_, i) => (
          <Dot key={i} $active={i === idx} onClick={() => goTo(i)} aria-label={tn.dot(i)} />
        ))}
      </DotsRow>

      <SlideLabel>{slides[idx].label}</SlideLabel>
    </CarouselWrap>
  );
}

const NumbersHead = styled.div`
  max-width: 800px;
`;

const NumbersSubtitle = styled.p`
  margin-top: 16px;
`;

const ProgressWrap = styled.div`
  margin-top: 24px;
  height: 2px;
  background: rgba(255,255,255,0.07);
  border-radius: 2px;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 2px;
  background: var(--c-verde, #2E86C1);
  width: ${p => p.$pct}%;
  transition: width 0.12s linear;
`;

const CtaWrap = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
`;

const SlideLabel = styled.div`
  margin-top: 12px;
  text-align: center;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.35);
  letter-spacing: .06em;
  font-weight: 600;
  text-transform: uppercase;
`;

/* ─── Main section ─── */
const Numbers = () => {
  const { lang } = useLang();
  const t = T[lang].numbers;
  return (
  <section className="section" id="numeros">
    <div className="container">
      <NumbersHead className="reveal">
        <h2 className="t-section-heading">
          {t.headingPre}<span className="verde">{t.headingGreen}</span>
        </h2>
        <NumbersSubtitle className="t-body-large muted">
          {t.subtitle}
        </NumbersSubtitle>
      </NumbersHead>

      <StatsWrap>
        <StatCard className="reveal">
          <div className="eyebrow">{t.stat1Eyebrow}</div>
          <div className="val-num">
            <CountUp to={12} prefix="€" suffix="M" /><em>+</em>
          </div>
          <div className="divider" />
          <div className="label">{t.stat1Desc}</div>
        </StatCard>

        <StatCard className="reveal">
          <div className="eyebrow">{t.stat2Eyebrow}</div>
          <div className="val-num">
            <em>+</em><CountUp to={132} />
          </div>
          <div className="divider" />
          <div className="label">{t.stat2Desc}</div>
        </StatCard>

        <StatCard className="reveal">
          <div className="eyebrow">{t.stat3Eyebrow}</div>
          <div className="val-num">
            <CountUp to={8} />
          </div>
          <div className="divider" />
          <div className="label">{t.stat3Desc}</div>
        </StatCard>
      </StatsWrap>

      <div className="reveal">
        <ProvasCarousel />
      </div>

      <CtaWrap className="reveal">
        <ZeroButton href="#agendar" label={t.cta} />
      </CtaWrap>
    </div>
  </section>
  );
};

export default Numbers;
