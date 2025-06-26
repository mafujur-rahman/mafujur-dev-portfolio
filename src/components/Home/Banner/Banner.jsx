'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

export default function Banner() {
  const developerRef = useRef(null)
  const containerRef = useRef(null)
  const particlesRef = useRef([])
  const hologramRef = useRef(null)

  useEffect(() => {
    // Text scramble animation for "Developer"
    const scrambleText = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const targetText = "Developer";
      const duration = 1.5;
      const fps = 60;
      const totalFrames = duration * fps;

      const scramble = () => {
        const el = developerRef.current;
        if (!el) return;

        const originalText = targetText.split('');
        let frame = 0;

        const scrambleInterval = gsap.ticker.add(() => {
          let display = '';

          for (let i = 0; i < originalText.length; i++) {
            if (frame >= totalFrames) {
              display += originalText[i];
            } else {
              const progress = frame / totalFrames;
              const revealThreshold = i / originalText.length;
              if (progress > revealThreshold) {
                display += originalText[i];
              } else {
                display += chars[Math.floor(Math.random() * chars.length)];
              }
            }
          }

          if (el) el.textContent = display;

          frame++;
          if (frame > totalFrames) {
            gsap.ticker.remove(scrambleInterval);
          }
        });
      };

      scramble();
      return setInterval(scramble, 5000);
    };

    const scrambleInterval = scrambleText();

    // Floating particles animation
    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: (i % 2 === 0 ? -20 : 20),
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Holographic avatar animation
    gsap.to(hologramRef.current, {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Background grid animation
    const gridItems = gsap.utils.toArray('.grid-cell');
    gridItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0 },
        {
          opacity: 0.2,
          duration: 1,
          delay: i * 0.02,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Floating tech tags animation
    const techTags = gsap.utils.toArray('.tech-tag');
    techTags.forEach((tag, i) => {
      gsap.fromTo(tag,
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%"
          }
        }
      );

      // Floating effect
      gsap.to(tag, {
        y: -10,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Main title animation
    gsap.fromTo('.main-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      }
    );

    // Subtitle animation
    gsap.fromTo('.subtitle',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out"
      }
    );

    // Scrolling data streams
    const dataStreams = gsap.utils.toArray('.data-stream');
    dataStreams.forEach(stream => {
      const chars = "01010101010101010101";
      let content = '';
      for (let i = 0; i < 100; i++) {
        content += chars[Math.floor(Math.random() * chars.length)];
      }
      stream.textContent = content;
      
      gsap.to(stream, {
        x: '-100%',
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    });

    return () => {
      clearInterval(scrambleInterval);
      gsap.killTweensOf([
        particlesRef.current, 
        hologramRef.current, 
        gridItems, 
        techTags,
        dataStreams
      ]);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden bg-black h-screen flex items-center justify-center px-6 "
    >
      {/* Holographic grid background */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className="grid-cell border border-cyan-400/10"
          />
        ))}
      </div>
      
      {/* Data streams */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-10 bg-cyan-900/20">
        <div className="data-stream absolute whitespace-nowrap text-cyan-400/40 font-mono text-lg">
          01010101010101010101
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-10 bg-cyan-900/20">
        <div className="data-stream absolute whitespace-nowrap text-cyan-400/40 font-mono text-lg">
          01010101010101010101
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className="absolute rounded-full bg-cyan-400/30"
            style={{
              width: `${gsap.utils.random(2, 6)}px`,
              height: `${gsap.utils.random(2, 6)}px`,
              top: `${gsap.utils.random(0, 100)}%`,
              left: `${gsap.utils.random(0, 100)}%`,
            }}
          />
        ))}
      </div>
      
      {/* Holographic avatar */}
      <div 
        ref={hologramRef}
        className="absolute md:right-10 xl:right-38 2xl:right-96 top-1/2 transform -translate-y-1/2 w-[400px] h-[500px] z-10"
      >
        <div className="absolute inset-0 rounded-xl overflow-hidden border-2 border-cyan-400/30">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-emerald-400/5 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-[url('/banner-pic.png')] opacity-50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,247,255,0.1)_0%,transparent_70%)]"></div>
        </div>
        <div className="absolute -inset-4 rounded-xl border-2 border-cyan-400/20 animate-pulse"></div>
        <div className="absolute -inset-6 rounded-xl border-2 border-emerald-400/10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Section */}
        <div className="space-y-6">
          <div className="overflow-hidden">
            <h1 className="main-title text-6xl md:text-8xl font-extrabold leading-tight">
              <span className="text-gray-400 block">I'M A</span>
              <span ref={developerRef} className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                Developer
              </span>
            </h1>
          </div>
          
          <p className="subtitle text-xl text-gray-300 max-w-xl leading-relaxed">
            Crafting immersive digital experiences at the intersection of design and technology
          </p>
          
          {/* Tech tags */}
          <div className="flex flex-wrap gap-3 mt-8">
            {['React', 'Next.js', 'GSAP', 'Three.js', 'WebGL', 'AI/ML', 'Web3', 'AR/VR'].map((tech, i) => (
              <div 
                key={i}
                className="tech-tag px-4 py-2 bg-cyan-900/30 backdrop-blur-sm rounded-full border border-cyan-400/20 text-cyan-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 pointer-events-none">
        <path 
          d="M200,200 Q400,100 600,300" 
          stroke="rgba(0, 247, 255, 0.1)" 
          strokeWidth="1" 
          fill="none"
        />
        <path 
          d="M300,400 Q500,200 700,350" 
          stroke="rgba(0, 247, 255, 0.1)" 
          strokeWidth="1" 
          fill="none"
        />
      </svg>
      
      {/* Floating call to action */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-pulse">
        <div className="flex flex-col items-center">
          <span className="text-cyan-400 text-sm mb-2">EXPLORE PORTFOLIO</span>
          <div className="w-8 h-12 rounded-full border-2 border-cyan-400/50 flex justify-center p-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes hologram-pulse {
          0% { box-shadow: 0 0 10px rgba(0, 247, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 247, 255, 0.6); }
          100% { box-shadow: 0 0 10px rgba(0, 247, 255, 0.3); }
        }
        
        .tech-tag {
          animation: hologram-pulse 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}