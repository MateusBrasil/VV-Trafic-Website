import React from 'react';
import styled, { keyframes } from 'styled-components';

const brilho = keyframes`
  0%   { opacity: 0; left: -150px; }
  20%  { opacity: 0.3; }
  50%  { opacity: 0.5; left: 50%; }
  80%  { opacity: 0.3; }
  100% { opacity: 0; left: 150%; }
`;

const containerPointing = keyframes`
  0%   { transform: translateX(0px); }
  100% { transform: translateX(6px); }
`;

const Wrap = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 64px;
  padding: 10px;
  border-radius: 9999px;
  border: 1px solid rgba(63, 63, 70, 0.5);
  background: #18181b;
  cursor: pointer;
  text-decoration: none;
  flex-shrink: 0;
  transition: box-shadow 0.5s ease;

  &:hover {
    box-shadow: 0 25px 50px -12px rgba(101, 163, 13, 0.2);
  }

  @media (max-width: 768px) {
    height: 56px;
    gap: 8px;
    padding: 8px;
  }
`;

const Inner = styled.span`
  position: relative;
  overflow: hidden;
  background: radial-gradient(67.54% 100.03% at 50% 0%, #fafff0 0%, #f4ffcd 25.48%, #d4ff57 62.5%, #a2cc00 100%);
  box-shadow: 0 5.98px 23.203px 0 rgba(162, 204, 0, 0.15), 0 14.352px 53.701px 0 rgba(162, 204, 0, 0.35);
  border: 1.196px solid rgba(255, 255, 255, 0.5);
  color: #18181b;
  padding: 0 32px;
  height: 44px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;

  &::before {
    content: "";
    height: 100%;
    width: 100px;
    position: absolute;
    top: 0;
    left: -150px;
    opacity: 0;
    background: #ffffff;
    box-shadow: 0 0 30px 20px rgba(255, 255, 255, 0.67);
    transform: skewX(-20deg);
    mix-blend-mode: plus-lighter;
    pointer-events: none;
    animation: ${brilho} 3s linear infinite;
  }

  @media (max-width: 768px) {
    height: 40px;
    padding: 0 20px;
    font-size: 0.68rem;
  }
`;

const Arrow = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #52525b;
  background: #27272a;
  color: #d4d4d8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

  svg {
    transition: transform 0.7s ease-in-out, color 0.3s ease;
  }

  ${Wrap}:hover & {
    animation: ${containerPointing} 0.7s cubic-bezier(0.36, 0, 0.64, 1) infinite alternate;
    animation-delay: 0.4s;
    margin-left: 8px;

    svg {
      transform: rotate(180deg);
      color: #84cc16;
    }
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

export default function ZeroButton({ href = '#agendar', label = 'Agendar Diagnóstico', style }) {
  return (
    <Wrap href={href} style={style}>
      <Inner>{label}</Inner>
      <Arrow>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"/>
          <path d="m12 5 7 7-7 7"/>
        </svg>
      </Arrow>
    </Wrap>
  );
}
