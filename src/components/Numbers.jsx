import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

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
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
      },
      onUpdate: () => setVal(obj.val)
    });
  }, [to, duration]);

  const display = Number.isInteger(to)
    ? Math.round(val).toLocaleString("pt-PT")
    : val.toFixed(1);
    
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const StatsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin: 60px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  padding: 40px 32px;
  border-radius: 24px;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(198, 242, 33, 0.05);
    border-color: rgba(198, 242, 33, 0.3);
  }
  
  .val {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    font-family: var(--font-display);
    color: var(--c-verde);
    margin-bottom: 16px;
    line-height: 1;
    text-shadow: 0 0 30px rgba(198, 242, 33, 0.2);
  }
  .label {
    font-size: 1rem;
    color: var(--c-text-muted);
    line-height: 1.5;
  }
`;

const CaseCard = styled.div`
  margin-top: 40px;
  padding: 40px;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

const Numbers = () => {
  return (
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

        <CaseCard className="glass reveal">
          <div>
            <span className="badge badge-emerald">CASE · PORTUGAL</span>
            <div className="t-subheading" style={{ fontWeight: 700, marginBottom: 8 }}>
              Salão de beleza
            </div>
            <p className="t-body-small muted">
              €54 investidos → €380 faturados em 30 dias.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div>
              <div className="t-caption muted">Investimento</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>€54</div>
            </div>
            <div style={{ fontSize: '2rem', color: 'var(--c-text-muted)' }}>→</div>
            <div>
              <div className="t-caption muted">Faturação</div>
              <div className="verde" style={{ fontSize: '2rem', fontWeight: 700 }}>€380</div>
            </div>
            <div style={{ padding: '12px 24px', background: 'rgba(198,242,33,0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <div className="verde" style={{ fontSize: '2rem', fontWeight: 700 }}>7x</div>
              <div className="t-caption verde">ROI</div>
            </div>
          </div>
        </CaseCard>

        <div className="reveal" style={{ marginTop: 60, display: "flex", justifyContent: "center" }}>
          <a className="btn btn-primary" href="#agendar">AGENDAR REUNIÃO DIAGNÓSTICA <span>→</span></a>
        </div>
      </div>
    </section>
  );
};

export default Numbers;
