'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const GlassOverlay = () => {
  const overlayRef = useRef(null);

  useEffect(() => {
    // Make sure body is visible
    document.body.style.visibility = 'visible';
    
    const overlay = overlayRef.current;

    // Set initial state (fully covering screen)
    gsap.set(overlay, {
      '--clip-height': '100%',
      opacity: 1,
      pointerEvents: 'auto'
    });

    // Animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" }
    });

    // Animate the custom property to reveal from bottom to top
    tl.to(overlay, {
      '--clip-height': '0%',
      duration: 1.5,
      onComplete: () => {
        overlay.style.pointerEvents = 'none';
      }
    });

    return () => tl.kill();
  }, []);

  return (
    <div 
      ref={overlayRef}
      className="glass-overlay fixed inset-0 bg-white/10 backdrop-blur-xl z-[9999] pointer-events-auto"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% var(--clip-height), 0 var(--clip-height))'
      }}
    />
  );
};