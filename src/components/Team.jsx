import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLang } from '../context/LanguageContext';
import { T } from '../i18n/translations';

const CARD_W = 300;
const CARD_H = 400;
const STEP    = 324; // center-to-center distance
const AUTO_MS = 4500;

/* wrapping signed distance */
function wdist(i, cur, n) {
  let d = ((i - cur) % n + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

/* ── animations ── */
const fadeUp = keyframes`
  from { opacity:0; transform:translateY(14px); }
  to   { opacity:1; transform:translateY(0); }
`;

/* ── styled ── */
const Wrapper = styled.section`
  padding: 100px 0 120px;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  @media (max-width: 480px) { padding: 0 16px; }
`;

const SectionHead = styled.div`
  text-align: center;
  margin-bottom: 48px;
  @media (max-width: 480px) { margin-bottom: 32px; }
`;

const Sub = styled.p`
  margin-top: 16px;
  color: var(--c-text-muted);
  font-size: 1rem;
  line-height: 1.7;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
`;

/* full-bleed track */
const TrackOuter = styled.div`
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: ${CARD_H + 80}px;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 18%,
    black 82%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 18%,
    black 82%,
    transparent 100%
  );
`;

const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${CARD_W}px;
  height: ${CARD_H}px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.07);
  transform: ${p => p.$transform ?? 'translateY(-50%)'};
  opacity: ${p => p.$opacity ?? 1};
  z-index: ${p => p.$zIndex ?? 1};
  box-shadow: ${p => p.$boxShadow ?? 'none'};
  transition:
    transform  0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity    0.6s ease,
    box-shadow 0.6s ease;
  will-change: transform, opacity;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    pointer-events: none;
    user-select: none;
  }

  /* bottom gradient */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.55) 0%,
      transparent 50%
    );
    pointer-events: none;
    transition: opacity 0.4s ease;
  }
`;

/* ── info below ── */
const InfoBlock = styled.div`
  text-align: center;
  margin-top: 44px;
`;

const MemberName = styled.h3`
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  margin: 0 0 10px;
  line-height: 1.1;
  animation: ${fadeUp} 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

const RoleBadge = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-verde, #2E86C1);
  background: rgba(46,134,193,0.08);
  border: 1px solid rgba(46,134,193,0.22);
  border-radius: 100px;
  padding: 6px 20px;
  animation: ${fadeUp} 0.5s 0.07s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

/* ── progress + nav ── */
const NavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 36px;
`;

const NavBtn = styled.button`
  width: 48px; height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s ease;
  flex-shrink: 0;

  &:hover {
    border-color: var(--c-verde, #2E86C1);
    background: rgba(46,134,193,0.1);
    color: var(--c-verde, #2E86C1);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Dot = styled.button`
  width: ${p => p.$active ? '26px' : '8px'};
  height: 8px;
  border-radius: 100px;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
  background: ${p => p.$active
    ? 'var(--c-verde, #2E86C1)'
    : 'rgba(255,255,255,0.18)'};
  /* Expand tap area to 44×44px without changing visual size */
  position: relative;
  &::before {
    content: '';
    position: absolute;
    inset: -18px -12px;
  }

  &:hover {
    background: ${p => p.$active
      ? 'var(--c-verde, #2E86C1)'
      : 'rgba(255,255,255,0.4)'};
  }
`;

const ProgressRing = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 3px;
`;

const ProgressBarWrap = styled.div`
  margin-top: 24px;
  height: 2px;
  background: rgba(255,255,255,0.07);
  border-radius: 2px;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  border-radius: 2px;
  background: var(--c-verde, #2E86C1);
  width: ${p => p.$pct}%;
  transition: width 0.12s linear;
`;

/* ── component ── */
export default function Team() {
  const { lang } = useLang();
  const t = T[lang].team;
  const members = t.members;
  const N = members.length;
  const [cur, setCur]       = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [pct, setPct]       = useState(0);
  const rafRef              = useRef(null);
  const t0Ref               = useRef(null);

  const goTo = useCallback((idx) => {
    const next = ((idx % N) + N) % N;
    setCur(next);
    setAnimKey(k => k + 1);
    setPct(0);
    t0Ref.current = performance.now();
  }, [N]);

  const prev = () => goTo(cur - 1);
  const next = useCallback(() => goTo(cur + 1), [cur, goTo]);

  useEffect(() => {
    t0Ref.current = performance.now();
    const tick = (now) => {
      const elapsed = now - t0Ref.current;
      const p = Math.min((elapsed / AUTO_MS) * 100, 100);
      setPct(p);
      if (elapsed >= AUTO_MS) next();
      else rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cur, next]);

  const member = members[cur];

  return (
    <Wrapper id="equipa">
      <Container>
        <SectionHead className="reveal">
          <h2 className="t-section-heading">
            {t.headingPre}<span className="verde">{t.headingGreen}</span>
          </h2>
          <Sub>{t.subtitle}</Sub>
        </SectionHead>
      </Container>

      {/* ── full-bleed carousel ── */}
      <TrackOuter>
        {members.map((m, i) => {
          const d    = wdist(i, cur, N);
          const absD = Math.abs(d);

          if (absD > 3) return null;

          const scale   = absD === 0 ? 1 : absD === 1 ? 0.85 : absD === 2 ? 0.72 : 0.6;
          const opacity = absD === 0 ? 1 : absD === 1 ? 0.55 : absD === 2 ? 0.28 : 0.1;
          const shadow  = absD === 0
            ? '0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(46,134,193,0.12)'
            : 'none';

          const tx = `calc(-50% + ${d * STEP}px)`;

          return (
            <Card
              key={m.name}
              onClick={() => goTo(i)}
              $transform={`translateY(-50%) translateX(${tx}) scale(${scale})`}
              $opacity={opacity}
              $zIndex={10 - absD}
              $boxShadow={shadow}
            >
              <img src={m.img} alt={m.name} draggable={false} loading="lazy" decoding="async" width="300" height="400" />
            </Card>
          );
        })}
      </TrackOuter>

      <Container>
        {/* member info */}
        <InfoBlock>
          <MemberName key={`n-${animKey}`}>{member.name}</MemberName>
          <RoleBadge  key={`r-${animKey}`}>{member.role}</RoleBadge>
        </InfoBlock>

        <ProgressBarWrap>
          <ProgressBarFill $pct={pct} />
        </ProgressBarWrap>

        {/* nav */}
        <NavRow>
          <NavBtn onClick={prev} aria-label={t.ariaPrev}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavBtn>

          <Dots>
            {members.map((m, i) => (
              <Dot key={i} $active={i === cur} onClick={() => goTo(i)} aria-label={t.ariaDot(m.name)} />
            ))}
          </Dots>

          <NavBtn onClick={next} aria-label={t.ariaNext}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavBtn>
        </NavRow>
      </Container>
    </Wrapper>
  );
}
