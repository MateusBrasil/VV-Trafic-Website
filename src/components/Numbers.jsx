import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

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

/* ─── Carousel container ─── */
const CarouselWrap = styled.div`
  position: relative;
`;

const CarouselLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
`;

const CaseSlide = styled(motion.div)`
  border-radius: 24px;
  overflow: hidden;
`;

/* ─── Card layout ─── */
const CardInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 260px;
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const CardLeft = styled.div`
  padding: 36px 36px 36px 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(255,255,255,0.06);
  @media (max-width: 680px) {
    padding: 28px 24px 24px;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
`;

const CardRight = styled.div`
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  background: rgba(198,242,33,0.03);
  @media (max-width: 680px) { padding: 24px; }
`;

const ClientName = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.5vw, 1.7rem);
  font-weight: 800;
  color: #fff;
  margin: 12px 0 10px;
  line-height: 1.2;
`;

const ClientDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.5);
  margin: 0;
`;

const MetricRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const MetricBox = styled.div`
  flex: 1;
  min-width: 80px;
  .lbl { font-size: 0.62rem; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 6px; font-weight: 600; }
  .amt { font-size: clamp(1.4rem, 2.5vw, 1.8rem); font-weight: 700; color: ${p => p.$verde ? 'var(--c-verde)' : '#fff'}; font-family: var(--font-display); }
`;

const Arrow = styled.div`
  font-size: 1.6rem;
  color: rgba(255,255,255,0.2);
  flex-shrink: 0;
`;

const RoiBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: rgba(198,242,33,0.12);
  border: 1px solid rgba(198,242,33,0.25);
  flex-shrink: 0;
  .num { font-size: 1.5rem; font-weight: 800; color: var(--c-verde); font-family: var(--font-display); line-height: 1; }
  .sub { font-size: 0.55rem; letter-spacing: .12em; text-transform: uppercase; color: var(--c-verde); margin-top: 3px; font-weight: 700; }
`;

const ChartBar = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 48px;
`;

const Bar = styled.div`
  width: 10px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(to top, rgba(198,242,33,0.15), rgba(198,242,33,0.7));
  height: ${p => p.$h}%;
  transition: height 0.4s ease;
`;

/* ─── Nav controls ─── */
const NavRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  justify-content: center;
`;

const NavBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.7);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s ease;
  &:hover { background: rgba(198,242,33,0.12); border-color: rgba(198,242,33,0.3); color: #c6f221; }
  &:disabled { opacity: 0.3; cursor: default; }
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Dot = styled.button`
  width: ${p => p.$active ? '24px' : '8px'};
  height: 8px;
  border-radius: 4px;
  background: ${p => p.$active ? 'var(--c-verde)' : 'rgba(255,255,255,0.15)'};
  border: none;
  cursor: pointer;
  transition: all .3s ease;
  padding: 0;
`;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

/* ─── Cases data ─── */
const cases = [
  {
    badge: "CASE · PORTUGAL",
    industry: "Beleza & Estética",
    name: "Salão de Beleza",
    desc: "Em apenas 30 dias, o Método ESCALA gerou um retorno 7x sobre o investimento em publicidade paga.",
    investimento: "€54",
    faturacao: "€380",
    roi: "7x",
    bars: [20, 30, 25, 45, 40, 60, 55, 75, 70, 100],
  },
  {
    badge: "CASE · PORTUGAL",
    industry: "Consultoria & Tech",
    name: "Nabla Core",
    desc: "Estrutura de aquisição criada de raiz com tráfego pago e funil de conversão dedicado ao segmento B2B.",
    investimento: "€1.200",
    faturacao: "€8.400",
    roi: "7x",
    bars: [15, 28, 22, 38, 50, 45, 65, 72, 80, 100],
  },
  {
    badge: "CASE · PORTUGAL",
    industry: "Marketing Digital",
    name: "Nobres Digital",
    desc: "Campanha de tráfego pago com otimização contínua de criativos e segmentação avançada de audiências.",
    investimento: "€650",
    faturacao: "€5.200",
    roi: "8x",
    bars: [10, 22, 35, 30, 48, 55, 60, 78, 88, 100],
  },
];

/* ─── Carousel component ─── */
function CasesCarousel() {
  const [[idx, dir], setPage] = useState([0, 0]);

  const paginate = useCallback((newDir) => {
    setPage(([cur]) => {
      const next = (cur + newDir + cases.length) % cases.length;
      return [next, newDir];
    });
  }, []);

  /* auto-advance */
  useEffect(() => {
    const t = setTimeout(() => paginate(1), 5000);
    return () => clearTimeout(t);
  }, [idx, paginate]);

  const c = cases[idx];

  return (
    <CarouselWrap>
      <CarouselLabel>
        <span className="badge badge-emerald">{c.badge}</span>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          {idx + 1} / {cases.length} casos
        </span>
      </CarouselLabel>

      <AnimatePresence custom={dir} mode="wait">
        <CaseSlide
          key={idx}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass"
        >
          <CardInner>
            {/* ── left: info ── */}
            <CardLeft>
              <div>
                <div style={{ fontSize: '0.68rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                  {c.industry}
                </div>
                <ClientName>{c.name}</ClientName>
                <ClientDesc>{c.desc}</ClientDesc>
              </div>

              {/* mini bar chart */}
              <ChartBar style={{ marginTop: 24 }}>
                {c.bars.map((h, i) => <Bar key={i} $h={h} />)}
              </ChartBar>
            </CardLeft>

            {/* ── right: metrics ── */}
            <CardRight>
              <MetricRow>
                <MetricBox>
                  <div className="lbl">Investimento</div>
                  <div className="amt">{c.investimento}</div>
                </MetricBox>
                <Arrow>→</Arrow>
                <MetricBox $verde>
                  <div className="lbl">Faturação</div>
                  <div className="amt">{c.faturacao}</div>
                </MetricBox>
                <RoiBadge>
                  <span className="num">{c.roi}</span>
                  <span className="sub">ROI</span>
                </RoiBadge>
              </MetricRow>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '.06em', lineHeight: 1.6 }}>
                Resultados verificados · Método ESCALA · VV Traffic Data
              </div>
            </CardRight>
          </CardInner>
        </CaseSlide>
      </AnimatePresence>

      {/* ── navigation ── */}
      <NavRow>
        <NavBtn onClick={() => paginate(-1)} aria-label="Anterior">←</NavBtn>
        <Dots>
          {cases.map((_, i) => (
            <Dot key={i} $active={i === idx} onClick={() => setPage([i, i > idx ? 1 : -1])} aria-label={`Caso ${i + 1}`} />
          ))}
        </Dots>
        <NavBtn onClick={() => paginate(1)} aria-label="Seguinte">→</NavBtn>
      </NavRow>
    </CarouselWrap>
  );
}

/* ─── Main section ─── */
const Numbers = () => (
  <section className="section" id="numeros">
    <div className="container">
      <div className="reveal" style={{ maxWidth: '800px' }}>
        <span className="badge">02 · Prova social</span>
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
        <CasesCarousel />
      </div>

      <div className="reveal" style={{ marginTop: 60, display: "flex", justifyContent: "center" }}>
        <a className="btn btn-primary" href="#agendar">AGENDAR REUNIÃO DIAGNÓSTICA <span>→</span></a>
      </div>
    </div>
  </section>
);

export default Numbers;
