import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { useLang } from "../context/LanguageContext";
import { T } from "../i18n/translations";

/* ── global scroll keyframe ── */
const GlobalScrollAnim = createGlobalStyle`
  @keyframes scroll {
    to { transform: translate(calc(-50% - 0.5rem)); }
  }
  .animate-scroll {
    animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
  }
  .animate-scroll:hover {
    animation-play-state: paused;
  }
`;

/* ── styled ── */
const Section = styled.section`
  padding: 88px 0 100px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  @media (max-width: 768px) { padding: 0 24px; }
`;

const Header = styled.div`
  margin-bottom: 64px;
`;

const ScrollerContainer = styled.div`
  position: relative;
  z-index: 20;
  max-width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
`;

const ScrollerList = styled.ul`
  display: flex;
  min-width: 100%;
  flex-shrink: 0;
  gap: 20px;
  padding: 24px 0;
  width: max-content;
  flex-wrap: nowrap;
  list-style: none;
  margin: 0;
`;

const BlockQuote = styled.blockquote`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardItem = styled.li`
  width: 420px;
  max-width: 90vw;
  position: relative;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: none;
  flex-shrink: 0;
  padding: 32px 36px;
  background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.2) 100%);
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(46,134,193,0.25);
  }
`;

const Stars = styled.div`
  color: var(--c-verde, #2E86C1);
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  margin-bottom: 20px;
`;

const Quote = styled.span`
  display: block;
  font-size: 0.95rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.8);
  font-weight: 400;
  flex: 1;
`;

const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--c-verde, #2E86C1);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.8rem;
  flex-shrink: 0;
`;

const AuthorName = styled.span`
  display: block;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.9);
  font-weight: 700;
  line-height: 1.4;
`;

const AuthorTitle = styled.span`
  display: block;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  font-style: italic;
  line-height: 1.4;
`;

/* ── InfiniteMovingCards (exact logic from prompt) ── */
const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
}) => {
  const containerRef = useRef(null);
  const scrollerRef  = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) scrollerRef.current.appendChild(duplicatedItem);
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const dur = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", dur);
    }
  };

  return (
    <ScrollerContainer ref={containerRef}>
      <ScrollerList
        ref={scrollerRef}
        className={`${start ? "animate-scroll" : ""}`}
      >
        {items.map((item, idx) => {
          const initials = item.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
          return (
            <CardItem key={item.name + idx}>
              <BlockQuote>
                <Stars>★★★★★</Stars>
                <Quote>"{item.quote}"</Quote>
                <CardBottom>
                  <Avatar>{initials}</Avatar>
                  <span>
                    <AuthorName>{item.name}</AuthorName>
                    <AuthorTitle>{item.title}</AuthorTitle>
                  </span>
                </CardBottom>
              </BlockQuote>
            </CardItem>
          );
        })}
      </ScrollerList>
    </ScrollerContainer>
  );
};

/* ── main component ── */
const Testimonials = () => {
  const { lang } = useLang();
  const t = T[lang].testimonials;
  return (
    <>
      <GlobalScrollAnim />
      <Section id="testemunhos">
        <Container>
          <Header className="reveal">
            <h2 className="t-section-heading">
              {t.headingPre}<span className="verde">{t.headingGreen}</span>
            </h2>
          </Header>
        </Container>

        <InfiniteMovingCards
          items={t.items}
          direction="right"
          speed="slow"
          pauseOnHover={true}
        />
      </Section>
    </>
  );
};

export default Testimonials;
