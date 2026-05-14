import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './components/Hero';
import Numbers from './components/Numbers';
import Comparison from './components/Comparison';
import Escala from './components/Escala';
import Team from './components/Team';
import Espaco from './components/Espaco';
import Testimonials from './components/Testimonials';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((elem) => {
        const rect = elem.getBoundingClientRect();
        const alreadyVisible = rect.top < window.innerHeight * 0.95;

        if (alreadyVisible) {
          // already in viewport — animate immediately
          gsap.to(elem, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        } else {
          gsap.to(elem, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 88%',
              once: true,
            },
          });
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Header />
      <main>
        <Hero />
        <Numbers />
        <Comparison />
        <Escala />
        <Team />
        <Espaco />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

export default App;
