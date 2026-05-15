import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ZeroButton from './ZeroButton';

/* ─── CountUp ─── */
function CountUp({ to, prefix = "", suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: to,
      duration: duration / 1000,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => setVal(obj.val),
    });
  }, [to, duration]);

  const display = Number.isInteger(to)
    ? Math.round(val).toLocaleString("pt-PT")
    : val.toFixed(1);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ─── Styled ─── */
const StatsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin: 60px 0 72px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const StatCard = styled.div`
  padding: 32px 24px;
  border-radius: 24px;
  text-align: center;
  transition: transform 0.3s ease;
  @media (max-width: 480px) { padding: 24px 20px; }
  &:hover {
    transform: translateY(-5px);
    background: rgba(198,242,33,0.05);
    border-color: rgba(198,242,33,0.3);
  }
  .val {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    font-family: var(--font-display);
    color: var(--c-verde);
    margin-bottom: 16px;
    line-height: 1;
    text-shadow: 0 0 30px rgba(198,242,33,0.2);
  }
  .label { font-size: 1rem; color: var(--c-text-muted); line-height: 1.5; }
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
  .name { color: rgba(198,242,33,0.5); font-weight: 700; font-size: 0.9rem; }
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
  &:hover { background: rgba(198,242,33,0.2); border-color: rgba(198,242,33,0.4); color: #c6f221; }
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
`;

/* progress bar at bottom of slide */
const ProgressBar = styled.div`
  position: absolute;
  bottom: 0; left: 0;
  height: 3px;
  background: var(--c-verde);
  border-radius: 0 2px 0 0;
  z-index: 10;
  transition: width linear;
`;

/* ─── Slides data ─── */
const slides = [
  { src: '/provas/prova-1.png', label: 'Caso de Sucesso · Resultados Reais' },
  { src: '/provas/prova-2.png', label: 'Caso de Sucesso · Resultados Reais' },
  { src: '/provas/prova-3.png', label: 'Caso de Sucesso · Resultados Reais' },
  { src: '/provas/prova-4.png', label: 'Caso de Sucesso · Resultados Reais' },
  { src: '/provas/prova-5.png', label: 'Caso de Sucesso · Resultados Reais' },
];

const INTERVAL = 5000;

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

function ProvasCarousel() {
  const [[idx, dir], setPage] = useState([0, 0]);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState({});
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);

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
          <motion.div
            key={idx}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {loaded[idx] ? (
              <SlideImg
                src={slides[idx].src}
                alt={slides[idx].label}
                draggable={false}
              />
            ) : (
              <>
                <Placeholder>
                  <div className="icon">📸</div>
                  <div className="name">{slides[idx].label.split('·')[0].trim()}</div>
                  <div>Adiciona a imagem em<br /><code style={{color:'#c6f221',fontSize:'0.75rem'}}>public/provas/prova-{idx+1}.png</code></div>
                </Placeholder>
                {/* hidden img to detect load */}
                <img
                  src={slides[idx].src}
                  alt=""
                  style={{ display: 'none' }}
                  onLoad={() => setLoaded(l => ({ ...l, [idx]: true }))}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* arrows */}
        <ArrowBtn $left onClick={() => paginate(-1)} aria-label="Anterior">‹</ArrowBtn>
        <ArrowBtn onClick={() => paginate(1)} aria-label="Seguinte">›</ArrowBtn>

        {/* counter */}
        <CounterBadge>{idx + 1} / {slides.length}</CounterBadge>

        {/* progress bar */}
        <ProgressBar style={{ width: `${progress}%` }} />
      </SlideTrack>

      {/* dots */}
      <DotsRow>
        {slides.map((_, i) => (
          <Dot key={i} $active={i === idx} onClick={() => goTo(i)} aria-label={`Caso ${i + 1}`} />
        ))}
      </DotsRow>

      {/* label under slide */}
      <div style={{
        marginTop: 12, textAlign: 'center',
        fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
        letterSpacing: '.06em', fontWeight: 600,
        textTransform: 'uppercase',
      }}>
        {slides[idx].label}
      </div>
    </CarouselWrap>
  );
}

/* ─── Main section ─── */
const Numbers = () => (
  <section className="section" id="numeros">
    <div className="container">
      <div className="reveal" style={{ maxWidth: '800px' }}>
        <h2 className="t-section-heading">
          Os números <span className="verde">falam por si.</span>
        </h2>
        <p className="t-body-large muted" style={{ marginTop: 16 }}>
          Em menos de dois anos, construímos um histórico mensurável em vendas geradas,
          estruturas comerciais e operações internacionais.
        </p>
      </div>

      <StatsWrap>
        <StatCard className="glass reveal">
          <div className="val"><CountUp to={12} prefix="€" suffix="M+" /></div>
          <div className="label">gerados em vendas para os nossos clientes</div>
        </StatCard>
        <StatCard className="glass reveal">
          <div className="val"><CountUp to={132} prefix="+" /></div>
          <div className="label">negócios com canal de aquisição estruturado</div>
        </StatCard>
        <StatCard className="glass reveal">
          <div className="val"><CountUp to={8} /></div>
          <div className="label">países com operações ativas</div>
        </StatCard>
      </StatsWrap>

      <div className="reveal">
        <ProvasCarousel />
      </div>

      <div className="reveal" style={{ marginTop: 60, display: "flex", justifyContent: "center" }}>
        <ZeroButton href="#agendar" label="Agendar Reunião Diagnóstica" />
      </div>
    </div>
  </section>
);

export default Numbers;
