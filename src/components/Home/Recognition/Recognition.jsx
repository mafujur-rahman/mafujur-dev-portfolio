'use client'
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTrophy, FaMedal, FaStar, FaAtom, FaRocket } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    icon: <FaTrophy className="text-6xl text-[#00f7ff]" />,
    title: "Frontend Development Mastery",
    desc: "Built multiple responsive and dynamic websites using React, Next.js, and Tailwind CSS.",
    year: 2024,
    tech: ["React", "Next.js", "Tailwind"]
  },
  {
    icon: <FaMedal className="text-6xl text-[#00ffb3]" />,
    title: "MERN Stack Project Launch",
    desc: "Successfully deployed full-stack applications with authentication, REST APIs, and MongoDB integration.",
    year: 2023,
    tech: ["MongoDB", "Express", "Node.js"]
  },
  {
    icon: <FaStar className="text-6xl text-[#ff00e6]" />,
    title: "Programming Hero Certified",
    desc: "Completed a professional frontend development course with hands-on project experience and certification.",
    year: 2022,
    tech: ["JavaScript", "HTML5", "CSS3"]
  },
  {
    icon: <FaAtom className="text-6xl text-[#00b7ff]" />,
    title: "UI/UX Excellence",
    desc: "Crafted pixel-perfect, user-friendly interfaces with seamless interactions and animations.",
    year: 2023,
    tech: ["Framer Motion", "GSAP", "Figma"]
  },
  {
    icon: <FaRocket className="text-6xl text-[#ff6b00]" />,
    title: "Open Source Contributor",
    desc: "Actively contributed to GitHub projects and built tools used by the developer community.",
    year: 2024,
    tech: ["GitHub", "Open Source", "Web Tools"]
  },
];

export default function Recognition() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const hologramRef = useRef(null);
  const titleRef = useRef(null);
  const particleRef = useRef(null);
  const cardRefs = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%'
          }
        }
      );
      
      // Hologram animation
      gsap.to(hologramRef.current, {
        rotationY: 360,
        duration: 60,
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
      
      // Position cards initially
      positionCards();
      
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
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    timelineRef.current = gsap.timeline();
    
    // Animate current card to center
    timelineRef.current.to(cardRefs.current[index], {
      z: 0,
      x: 0,
      y: 0,
      rotationY: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    }, 0);
    
    // Animate previous cards to left
    for (let i = 0; i < index; i++) {
      const distance = (index - i) * 100;
      timelineRef.current.to(cardRefs.current[i], {
        z: -distance,
        x: -distance * 2,
        rotationY: -30,
        scale: 0.8 - (i * 0.1),
        opacity: 0.7 - (i * 0.2),
        duration: 1.2,
        ease: "power3.out"
      }, 0);
    }
    
    // Animate next cards to right
    for (let i = index + 1; i < awards.length; i++) {
      const distance = (i - index) * 100;
      timelineRef.current.to(cardRefs.current[i], {
        z: -distance,
        x: distance * 2,
        rotationY: 30,
        scale: 0.8 - ((i - index - 1) * 0.1),
        opacity: 0.7 - ((i - index - 1) * 0.2),
        duration: 1.2,
        ease: "power3.out"
      }, 0);
    }
    
    // Create particle burst
    const particleCount = 15;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "holographic-particle";
      particleRef.current.appendChild(particle);
      
      timelineRef.current.fromTo(particle,
        { 
          opacity: 1, 
          scale: 0,
          x: 0,
          y: 0
        },
        {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-200, 200),
          scale: gsap.utils.random(0.5, 1.5),
          opacity: 0,
          duration: gsap.utils.random(1, 2),
          onComplete: () => particle.remove()
        },
        0
      );
      
      particles.push(particle);
    }
  }, [index]);

  const positionCards = () => {
    // Initial positioning of cards in 3D space
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      
      const distance = Math.abs(i - index);
      const direction = i < index ? -1 : 1;
      
      gsap.set(card, {
        z: -distance * 100,
        x: direction * distance * 200,
        rotationY: direction * 30,
        scale: 0.8,
        opacity: 0.7
      });
      
      // Center the active card
      if (i === index) {
        gsap.set(card, {
          z: 0,
          x: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1
        });
      }
    });
  };

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % awards.length);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-24 px-4 bg-black text-white overflow-hidden min-h-screen flex items-center"
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
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full bg-cyan-400/20"
            style={{
              width: `${gsap.utils.random(1, 3)}px`,
              height: `${gsap.utils.random(1, 3)}px`,
              top: `${gsap.utils.random(0, 100)}%`,
              left: `${gsap.utils.random(0, 100)}%`,
            }}
          />
        ))}
      </div>
      
      {/* Particle container for animations */}
      <div ref={particleRef} className="absolute inset-0 pointer-events-none"></div>
      
      {/* Central hologram */}
      <div 
        ref={hologramRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] rounded-full border-4 border-cyan-400/20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,247,255,0.05) 0%, transparent 70%)',
          boxShadow: 'inset 0 0 100px rgba(0,247,255,0.1), 0 0 200px rgba(0,247,255,0.1)'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
        <h2 
          ref={titleRef} 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400"
        >
          Certificate & Recognitions
        </h2>

        {/* 3D Holographic Carousel */}
        <div className="relative h-[500px] w-full perspective-1000">
          <div 
            ref={carouselRef}
            className="relative w-full h-full transform-style-3d"
          >
            {awards.map((award, i) => (
              <div
                key={i}
                ref={el => cardRefs.current[i] = el}
                className={`absolute w-[320px] h-[380px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,247,255,0.3)] border border-cyan-400/20 flex flex-col items-center justify-center transform-style-3d transition-opacity`}
              >
                {/* Holographic border */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#00f7ff_25%,transparent_50%)] animate-spin-slow opacity-20"></div>
                </div>
                
                {/* Award content */}
                <div className="relative z-10 flex flex-col items-center h-full justify-between">
                  <div className="flex flex-col items-center">
                    <div className="mb-6 relative">
                      {award.icon}
                      <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-cyan-300 mb-4">
                      {award.title}
                    </h3>
                    
                    <p className="text-gray-300 text-center leading-relaxed mb-6">
                      {award.desc}
                    </p>
                  </div>
                  
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-cyan-400 font-medium">Year: {award.year}</div>
                      <div className="px-3 py-1 bg-cyan-900/30 rounded-full text-cyan-300 text-sm border border-cyan-400/20">
                        Award #{i+1}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-2">
                      {award.tech.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-cyan-300 text-xs border border-cyan-400/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-center mt-12 gap-6">
          <button
            onClick={prevCard}
            className="w-14 h-14 rounded-full bg-cyan-900/30 backdrop-blur-sm border border-cyan-400/20 flex items-center justify-center text-cyan-300 hover:bg-cyan-400/20 hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <div className="flex items-center space-x-3">
            {awards.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index ? "bg-cyan-400 scale-125" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextCard}
            className="w-14 h-14 rounded-full bg-cyan-900/30 backdrop-blur-sm border border-cyan-400/20 flex items-center justify-center text-cyan-300 hover:bg-cyan-400/20 hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
      
    
      
      <style jsx global>{`
        .holographic-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00f7ff;
          pointer-events: none;
          z-index: 20;
          box-shadow: 0 0 10px #00f7ff;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
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
    </section>
  );
}