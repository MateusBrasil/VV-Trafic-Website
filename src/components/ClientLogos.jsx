import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLang } from '../context/LanguageContext';
import { T } from '../i18n/translations';

const scrollLTR = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
`;

const scrollRTL = keyframes`
  from { transform: translate3d(-50%, 0, 0); }
  to   { transform: translate3d(0, 0, 0); }
`;

const Strip = styled.div`
  padding: 48px 0 56px;
  border-top: 1px solid rgba(255,255,255,0.05);
  width: 100%;
  /* CSS mask creates the fade-out edges without backdrop-filter cost */
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);

  @media (max-width: 768px) { padding: 36px 0 44px; }

  .strip-label {
    text-align: center;
    color: var(--c-text-muted);
    margin-bottom: 32px;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    /* keep the label outside the mask fade */
    mask: none;
    -webkit-mask: none;
  }
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SliderWrap = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  flex-shrink: 0;
  will-change: transform;
  backface-visibility: hidden;
  animation: ${p => p.$reverse ? scrollRTL : scrollLTR} ${p => p.$speed}s linear infinite;
`;

const ClientItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 200px;
  height: 64px;
  margin: 0 18px;

  @media (max-width: 768px) {
    width: 150px;
    margin: 0 12px;
  }

  img {
    height: 64px;
    width: 100%;
    max-width: 160px;
    object-fit: contain;
    display: block;
    opacity: 0.88;
    user-select: none;
    pointer-events: none;
  }
`;

const ROW1 = [
  { src: "/clientes/n-2.png",  alt: "VV Studios" },
  { src: "/clientes/n-3.png",  alt: "Oficina dos Sabores" },
  { src: "/clientes/n-4.png",  alt: "RAVOX" },
  { src: "/clientes/n-5.png",  alt: "PT Móveis" },
  { src: "/clientes/n-6.png",  alt: "AmorüDs" },
  { src: "/clientes/n-7.png",  alt: "Vulcanici" },
  { src: "/clientes/n-8.png",  alt: "Barão Select" },
  { src: "/clientes/n-9.png",  alt: "Amazon Sem Segredos" },
];

const ROW2 = [
  { src: "/clientes/n-10.png", alt: "Marianna Guimarães" },
  { src: "/clientes/n-11.png", alt: "Velara Home" },
  { src: "/clientes/n-14.png", alt: "Retiro" },
  { src: "/clientes/n-15.png", alt: "Sempre Consigo" },
  { src: "/clientes/n-16.png", alt: "Velara Moda" },
  { src: "/clientes/n-17.png", alt: "RPM Brand Consultancy" },
  { src: "/clientes/n-18.png", alt: "Caroline Rodrigues" },
  { src: "/clientes/n-19.png", alt: "VV Coffee Lounge" },
];

function Row({ clients, reverse, speed }) {
  /* Render the list twice so translate(-50%) loops seamlessly */
  const items = [...clients, ...clients];
  return (
    <SliderWrap>
      <Track $reverse={reverse} $speed={speed}>
        {items.map((c, i) => (
          <ClientItem key={`${c.src}-${i}`}>
            <img
              src={c.src}
              alt={c.alt}
              draggable={false}
              loading="eager"
              decoding="async"
              width="160"
              height="64"
            />
          </ClientItem>
        ))}
      </Track>
    </SliderWrap>
  );
}

/* repeat each row 2× so even ultrawide screens never see a gap */
const ROW1_FULL = [...ROW1, ...ROW1];
const ROW2_FULL = [...ROW2, ...ROW2];

export default function ClientLogos() {
  const { lang } = useLang();
  const t = T[lang].clients;
  return (
    <Strip>
      <p className="strip-label">{t.label}</p>
      <Rows>
        <Row clients={ROW1_FULL} reverse={false} speed={36} />
        <Row clients={ROW2_FULL} reverse={true}  speed={42} />
      </Rows>
    </Strip>
  );
}
