'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BiSolidQuoteLeft } from 'react-icons/bi'

gsap.registerPlugin(ScrollTrigger)

export default function AboutMe() {
  const containerRef = useRef(null)
  const hologramRef = useRef(null)
  const particleRef = useRef(null)
  const quoteRef = useRef(null)
  const textRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hologram animation
      gsap.to(hologramRef.current, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: "none"
      });
      
      // Particle animation
      const particles = gsap.utils.toArray('.floating-particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: (i % 2 === 0 ? -10 : 10),
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
      
      // Quote animation
      gsap.fromTo(quoteRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
      
      // NEW TEXT REVEAL ANIMATIONS
      // Paragraph animations - staggered fade up
      const paragraphs = gsap.utils.toArray('.reveal-paragraph');
      paragraphs.forEach((paragraph, i) => {
        gsap.fromTo(paragraph.querySelectorAll('.word'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.03,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: paragraph,
              start: 'top 90%',
            }
          }
        );
      });
      
      // Title animation - gradient slide
      gsap.fromTo('.title-gradient', 
        { 
          backgroundPosition: '100% 100%',
          opacity: 0 
        },
        {
          backgroundPosition: '0% 100%',
          opacity: 1,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.title-gradient',
            start: 'top 85%',
          }
        }
      );
      
      // Background grid animation
      const gridItems = gsap.utils.toArray('.grid-cell');
      gridItems.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0 },
          {
            opacity: 0.2,
            duration: 1,
            delay: i * 0.01,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              toggleActions: "play none none none"
            }
          }
        );
      });
      
      // Divider animation
      gsap.fromTo('.divider-line', 
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
      
      // Name highlight animation
      gsap.fromTo('.name-highlight', 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper function to split text into spans
  const splitWords = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block overflow-hidden align-bottom">
        {word + (i !== text.split(' ').length - 1 ? '\u00A0' : '')}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="relative" id='about'>
      <section className='relative min-h-screen overflow-hidden bg-black'>
        {/* Holographic grid background */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              className="grid-cell border border-[#09e5e5]/10"
            />
          ))}
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="floating-particle absolute rounded-full bg-[#09e5e5]/20"
              style={{
                width: `${gsap.utils.random(1, 3)}px`,
                height: `${gsap.utils.random(1, 3)}px`,
                top: `${gsap.utils.random(0, 100)}%`,
                left: `${gsap.utils.random(0, 100)}%`,
              }}
            />
          ))}
        </div>
        
        {/* Central hologram */}
        <div 
          ref={hologramRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full border-4 border-[#09e5e5]/20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,247,255,0.05) 0%, transparent 70%)',
            boxShadow: 'inset 0 0 100px rgba(0,247,255,0.1), 0 0 200px rgba(0,247,255,0.1)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-5xl w-full">
            {/* Quote section */}
            <div 
              ref={quoteRef}
              className="backdrop-blur-lg bg-gradient-to-br from-gray-900/50 to-black/50 border border-[#09e5e5]/20 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,247,255,0.2)]"
            >
              {/* Holographic border */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden z-0">
                <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#00f7ff_25%,transparent_50%)] animate-spin-slow opacity-20"></div>
              </div>
              
              <div className="relative z-10">
                {/* Divider with Quote Icon */}
                <div className='flex gap-x-4 items-center mb-8'>
                  <div className='divider-line h-[1px] bg-gradient-to-r from-transparent via-[#09e5e5] to-transparent w-full origin-left'></div>
                  <div className="bg-[#09e5e5]/20 p-3 rounded-full border border-[#09e5e5]/30">
                    <BiSolidQuoteLeft className='text-[#09e5e5] text-2xl' />
                  </div>
                  <div className='divider-line h-[1px] bg-gradient-to-r from-transparent via-[#09e5e5] to-transparent w-full origin-right'></div>
                </div>

                {/* About Me Text */}
                <div className='space-y-8'>
                  <p className='reveal-paragraph text-xl md:text-2xl leading-relaxed text-gray-300'>
                    {splitWords("Hi, I'm ")}
                    <span className="name-highlight inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#09e5e5] to-emerald-400 font-bold">
                      Mafujur Rahman
                    </span>
                    {splitWords(" — a passionate Frontend Developer who loves crafting interactive, user-friendly web experiences using modern technologies.")}
                  </p>
                  
                  <p className='reveal-paragraph text-xl md:text-2xl leading-relaxed text-gray-300'>
                    {splitWords("With a strong eye for design and a dedication to clean, maintainable code, I strive to bring ideas to life in the browser with pixel-perfect precision. I'm always learning, always building.")}
                  </p>
                  
                  <div className='flex items-center gap-4'>
                    <div className="w-3 h-3 rounded-full bg-[#09e5e5] "></div>
                    <p className='text-[#09e5e5] italic text-xl md:text-2xl'>
                      <span className="title-gradient bg-clip-text  bg-[length:200%_100%] bg-gradient-to-r from-transparent via-[#09e5e5] to-[#09e5e5]">
                        {splitWords("Frontend Developer")} 
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tech stack floating orbs */}
            <div className="mt-16 flex flex-wrap justify-center gap-6">
              {[ 'MongoDB', 'Express.js', 'React',  'Node.js'].map((tech, i) => (
                <div 
                  key={i}
                  className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-900/30 to-black/50 backdrop-blur-sm border border-[#09e5e5]/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,247,255,0.2)]"
                >
                  <div className="absolute inset-0 rounded-full bg-[#09e5e5]/10 blur-md animate-pulse"></div>
                  <span className="text-cyan-300 font-medium text-sm text-center">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        .grid-cell {
          animation: float 15s infinite ease-in-out;
          animation-delay: calc(var(--i) * 0.1s);
        }
      `}</style>
    </div>
  )
}