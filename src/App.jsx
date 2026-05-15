import React, { useEffect, useRef, lazy, Suspense } from 'react';

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

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    let gsapCtx;

    // Load GSAP after critical render — keeps it off the blocking JS path
    Promise.all([
      import('gsap').then(m => m.default),
      import('gsap/ScrollTrigger').then(m => m.ScrollTrigger),
    ]).then(([gsap, ScrollTrigger]) => {
      gsap.registerPlugin(ScrollTrigger);

      gsapCtx = gsap.context(() => {
        gsap.utils.toArray('.reveal').forEach((elem) => {
          const alreadyVisible = elem.getBoundingClientRect().top < window.innerHeight * 0.95;

          if (alreadyVisible) {
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
    });

    return () => gsapCtx?.revert();
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
