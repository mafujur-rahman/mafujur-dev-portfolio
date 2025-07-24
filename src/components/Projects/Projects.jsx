'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const ProjectsData = [
    {
      image: '/images/ethicalden.png',
      link: 'https://ethicalden-gsap.netlify.app/',
      company: 'Ethicalden',
      description: 'Crafting data-driven digital marketing campaigns that boost brand visibility and ROI.',
    },
    {
      image: '/images/fowzi.png',
      link: 'https://fowzi-media-client-qxuw.vercel.app/',
      company: 'Fowzi Media',
      description: 'Delivering performance-focused marketing solutions across social and digital platforms.',
    },
    {
      image: '/images/newsgrid.png',
      link: 'https://newsgrid-95245.web.app/',
      company: 'Newsgrid',
      description: 'Delivering real-time, dynamic news aggregation tailored for global audiences.',
    },
    {
      image: '/images/survey.png',
      link: 'https://survey-shark-ccd5f.web.app/',
      company: 'Survey Shark',
      description: 'Transforming data collection with smart, secure, and user-friendly survey tools.',
    },
    {
      image: '/images/fardeen.png',
      link: 'https://fardeen-sir-portfolio.netlify.app/',
      company: 'Portfolio',
      description: 'Crafting impactful personal branding through clean, modern digital portfolios.',
    }
  ];



  const cardRefs = useRef([])
  const particleRef = useRef(null)
  const hologramRef = useRef(null)
  const titleRef = useRef(null)
  const titleMaskRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {


    // Title reveal animation - new gradient slide effect
    gsap.fromTo(titleMaskRef.current,
      { height: '100%' },
      {
        height: '0%',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Title fade in animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Card animations
    cardRefs.current.forEach((card, i) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 100,
          rotationX: 10,
          z: -50
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          z: 0,
          duration: 1.2,
          delay: i * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Hover effect
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -20,
          boxShadow: "0 0 40px rgba(0, 247, 255, 0.5)",
          duration: 0.5
        })

        const particles = Array.from({ length: 10 }, () => {
          const particle = document.createElement("div")
          particle.className = "holographic-particle"
          card.appendChild(particle)

          gsap.fromTo(particle,
            { opacity: 1, scale: 0 },
            {
              x: gsap.utils.random(-100, 100),
              y: gsap.utils.random(-100, 100),
              scale: gsap.utils.random(0.5, 1.5),
              opacity: 0,
              duration: gsap.utils.random(1, 2),
              onComplete: () => particle.remove()
            }
          )

          return particle
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 0 20px rgba(0, 247, 255, 0.2)",
          duration: 0.5
        })
      })
    })

    // Floating particles
    const particles = gsap.utils.toArray('.floating-particle')
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: (i % 2 === 0 ? -10 : 10),
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })

    // Hologram animation
    gsap.to(hologramRef.current, {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none"
    })


    // Background grid animation
    const gridItems = gsap.utils.toArray('.grid-cell')
    gridItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0 },
        {
          opacity: 0.2,
          duration: 1,
          delay: i * 0.01,
          scrollTrigger: {
            trigger: particleRef.current,
            start: "top bottom",
            toggleActions: "play none none none"
          }
        }
      )
    })
  }, [])

  return (
    <div id='projects' className='relative overflow-hidden bg-black min-h-screen py-20'>
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

      {/* Central hologram */}
      <div
        ref={hologramRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full border-4 border-cyan-400/20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,247,255,0.05) 0%, transparent 70%)',
          boxShadow: 'inset 0 0 100px rgba(0,247,255,0.1), 0 0 200px rgba(0,247,255,0.1)'
        }}
      />

      {/* Section Title - Fixed with new animation */}
      <div className="text-center mb-20 relative z-20">
        <div className="relative inline-block">
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
            Projects
          </h2>
          <div
            ref={titleMaskRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-black z-10"
          />
        </div>
        <p ref={subtitleRef} className="text-xl text-gray-400 max-w-2xl mx-auto">
          Showcasing advanced technical expertise and creative solutions to build outstanding digital experiences.
        </p>
        <div className="holographic-line mt-10 h-0.5 w-full max-w-2xl mx-auto bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0" />
      </div>

      {/* Company Cards - Holographic Display */}
      <div
        ref={particleRef}
        className='relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-[15vh]'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {ProjectsData.map((company, index) => (
            <a
              key={index}
              ref={el => cardRefs.current[index] = el}
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg shadow-[0_0_20px_rgba(0,247,255,0.2)] group block"
            >
              {/* Holographic border */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#00f7ff_25%,transparent_50%)] animate-spin-slow opacity-30"></div>
              </div>

              {/* Image with overlay */}
              <div className='relative w-full h-[250px] rounded-t-2xl overflow-hidden'>
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/80"></div>
                <Image
                  src={company.image}
                  alt={company.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text Content */}
              <div className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-cyan-300">{company.company}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">{company.description}</p>

                <div className="flex justify-between items-center">
                  <div className="text-cyan-400 text-sm">View Project</div>
                  <div className="w-8 h-8 rounded-full border border-cyan-400 flex items-center justify-center">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </a>

          ))}
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