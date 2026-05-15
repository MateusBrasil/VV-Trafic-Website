import React from 'react';
import styled from 'styled-components';
import { InfiniteSlider } from './ui/InfiniteSlider';
import { ProgressiveBlur } from './ui/ProgressiveBlur';

const Strip = styled.div`
  padding: 48px 0 56px;
  border-top: 1px solid rgba(255,255,255,0.05);
  overflow: hidden;
  width: 100%;

  @media (max-width: 768px) { padding: 36px 0 44px; }

  .strip-label {
    text-align: center;
    color: var(--c-text-muted);
    margin-bottom: 32px;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SliderWrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const ClientItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 36px;

  @media (max-width: 768px) { padding: 0 24px; }

  img {
    height: 64px;
    width: auto;
    max-width: 160px;
    object-fit: contain;
    display: block;
    opacity: 0.88;
    transition: opacity 0.3s ease;
    user-select: none;
    pointer-events: none;
  }
  img:hover { opacity: 1; }
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
  return (
    <SliderWrap>
      <InfiniteSlider gap={0} speed={speed} speedOnHover={speed * 2.2} reverse={reverse}>
        {clients.map((c) => (
          <ClientItem key={c.src}>
            <img src={c.src} alt={c.alt} draggable={false} loading="lazy" />
          </ClientItem>
        ))}
      </InfiniteSlider>
      <ProgressiveBlur
        direction="left"
        blurIntensity={0.9}
        style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 100, pointerEvents: 'none' }}
      />
      <ProgressiveBlur
        direction="right"
        blurIntensity={0.9}
        style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: 100, pointerEvents: 'none' }}
      />
    </SliderWrap>
  );
}

export default function ClientLogos() {
  return (
    <Strip className="reveal">
      <p className="strip-label">Já estruturámos canais de aquisição para</p>
      <Rows>
        <Row clients={ROW1} reverse={false} speed={36} />
        <Row clients={ROW2} reverse={true}  speed={42} />
      </Rows>
    </Strip>
  );
}
