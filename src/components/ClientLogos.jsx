import React from 'react';
import styled from 'styled-components';
import { InfiniteSlider } from './ui/InfiniteSlider';
import { ProgressiveBlur } from './ui/ProgressiveBlur';

const Strip = styled.div`
  padding: 48px 0 56px;
  border-top: 1px solid rgba(255,255,255,0.05);
  overflow: hidden;
  width: 100%;

  @media (max-width: 768px) {
    padding: 36px 0 44px;
  }

  .strip-label {
    text-align: center;
    color: var(--c-text-muted);
    margin-bottom: 24px;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
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
  padding: 0 28px;

  @media (max-width: 768px) { padding: 0 20px; }

  img {
    height: 54px;
    width: auto;
    max-width: 150px;
    object-fit: contain;
    display: block;
    opacity: 0.82;
    transition: opacity 0.3s ease;
    user-select: none;
    pointer-events: none;
  }
  img:hover { opacity: 1; }
`;

const CLIENTS = [
  { src: "/clientes/oficina-sabores.png",      alt: "Oficina dos Sabores" },
  { src: "/clientes/ravox.png",                alt: "RAVOX" },
  { src: "/clientes/pt-moveis.png",            alt: "PT Móveis" },
  { src: "/clientes/amorikids-new.png",        alt: "Amorikids" },
  { src: "/clientes/vulcanici.png",            alt: "Vulcanici" },
  { src: "/clientes/barao-select.png",         alt: "Barão Select" },
  { src: "/clientes/amazon-sem-segredos.png",  alt: "Amazon Sem Segredos" },
  { src: "/clientes/marianna-new.png",         alt: "Marianna Guimarães" },
  { src: "/clientes/velara-home.png",          alt: "Velara Home" },
  { src: "/clientes/vv-studios.png",           alt: "VV Studios" },
  { src: "/clientes/retiro.png",               alt: "Retiro" },
  { src: "/clientes/sempre-consigo.png",       alt: "Sempre Consigo" },
  { src: "/clientes/velara-moda.png",          alt: "Velara Moda",        dark: true },
  { src: "/clientes/rpm-brand.png",            alt: "RPM Brand" },
  { src: "/clientes/caroline-rodrigues.png",   alt: "Caroline Rodrigues", dark: true },
  { src: "/clientes/vv-coffee.png",            alt: "VV Coffee Lounge" },
];

export default function ClientLogos() {
  return (
    <Strip className="reveal">
      <p className="strip-label">Já estruturámos canais de aquisição para</p>
      <SliderWrap>
        <InfiniteSlider gap={20} speed={38} speedOnHover={85} reverse={false}>
          {CLIENTS.map((c) => (
            <ClientItem key={c.src}>
              <img
                src={c.src} alt={c.alt}
                draggable={false} loading="lazy"
                style={c.dark ? { filter: 'invert(1) brightness(0.88)' } : undefined}
              />
            </ClientItem>
          ))}
        </InfiniteSlider>
        <ProgressiveBlur
          direction="left"
          blurIntensity={0.9}
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 80, pointerEvents: 'none' }}
        />
        <ProgressiveBlur
          direction="right"
          blurIntensity={0.9}
          style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: 80, pointerEvents: 'none' }}
        />
      </SliderWrap>
    </Strip>
  );
}
