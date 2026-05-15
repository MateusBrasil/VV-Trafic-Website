import React, { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Critical path — loaded immediately
import Header from './components/Header';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';

// Below-the-fold — lazy loaded
const Numbers      = lazy(() => import('./components/Numbers'));
const Comparison   = lazy(() => import('./components/Comparison'));
const Escala       = lazy(() => import('./components/Escala'));
const Team         = lazy(() => import('./components/Team'));
const Espaco       = lazy(() => import('./components/Espaco'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FinalCta     = lazy(() => import('./components/FinalCta'));
const Footer       = lazy(() => import('./components/Footer'));

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
    <>
      <Header />
      <div ref={containerRef} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <main>
        <Hero />
        <ClientLogos />
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Numbers />
          <Comparison />
          <Escala />
          <Team />
          <Espaco />
          <Testimonials />
          <FinalCta />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </div>
    </>
  );
}

export default App;
