'use client'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillDetails = [
  {
    title: 'React & Next.js',
    description: 'Expert in building modern, scalable applications with React hooks, context API, and Next.js features like SSR, SSG, and API routes.',
    level: 92,
    projects: 15,
    years: 3
  },
  {
    title: 'Tailwind CSS',
    description: 'Highly proficient in crafting responsive, utility-first UI designs with Tailwind CSS, including custom configurations and plugin development.',
    level: 95,
    projects: 22,
    years: 2
  },
  {
    title: 'JavaScript (ES6+)',
    description: 'Deep understanding of modern JavaScript including ES6+ features, asynchronous programming, DOM manipulation, and functional programming.',
    level: 90,
    projects: 30,
    years: 4
  },
  {
    title: 'Frontend Integration',
    description: 'Specialized in integrating REST/GraphQL APIs, state management solutions, and third-party services for seamless UI functionality.',
    level: 88,
    projects: 18,
    years: 3
  }
]

export default function Skills() {
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const statRefs = useRef([])
  const hologramRefs = useRef([])
  const gridRef = useRef(null)
  const titleRef = useRef(null)
  const titleMaskRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Holographic grid animation
      gsap.fromTo('.grid-cell',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.3,
          scale: 1,
          stagger: {
            grid: [8, 8],
            from: "center",
            amount: 1.5
          },
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      )

      // Floating holograms animation
      hologramRefs.current.forEach((hologram, i) => {
        const tl = gsap.timeline({
          repeat: -1,
          yoyo: true,
          delay: i * 0.3
        })

        tl.to(hologram, {
          y: -20,
          duration: 5 + Math.random() * 2,
          ease: "sine.inOut"
        })
          .to(hologram, {
            rotation: 5,
            duration: 8,
            ease: "sine.inOut"
          }, "<")
      })

      // Skill cards animation - advanced 3D effect
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 100,
            rotationX: 30,
            z: -100,
            transformPerspective: 1000
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

        // Hover effect - floating with glow
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -15,
            boxShadow: "0 0 40px rgba(0, 247, 255, 0.7)",
            duration: 0.5
          })

          // Particle emission
          const particles = Array.from({ length: 15 }, () => {
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

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 0 20px rgba(0, 247, 255, 0.3)",
            duration: 0.5
          })
        })
      })

      // Stats animation with morphing effect
      statRefs.current.forEach((stat, i) => {
        gsap.fromTo(stat,
          {
            opacity: 0,
            scale: 0.7,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            delay: i * 0.1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // Holographic line animation
      gsap.fromTo(".holographic-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "center",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%"
          }
        }
      )

      // Floating particles animation
      gsap.to(".floating-particle", {
        y: (i) => (i % 2 === 0 ? -15 : 15),
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* Holographic grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none"
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className="grid-cell border border-white/10"
          />
        ))}
      </div>

      {/* Floating holograms */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            ref={el => hologramRefs.current[i] = el}
            className="absolute rounded-full border-2 border-cyan-400/30"
            style={{
              width: `${gsap.utils.random(100, 300)}px`,
              height: `${gsap.utils.random(100, 300)}px`,
              top: `${gsap.utils.random(10, 90)}%`,
              left: `${gsap.utils.random(10, 90)}%`,
              filter: `blur(${gsap.utils.random(20, 40)}px)`,
              opacity: gsap.utils.random(0.05, 0.15)
            }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative z-10 py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
      >
        {/* Section Title - Fixed with new animation */}
        <div className="text-center mb-20 relative z-20">
          <div className="relative inline-block">
            <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
              Skills & Expertise
            </h2>
            <div
              ref={titleMaskRef}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-black z-10"
            />
          </div>
          <p ref={subtitleRef} className="text-xl text-gray-400 max-w-2xl mx-auto">
            Advanced technical skills combined with innovative solutions to deliver exceptional digital experiences
          </p>
          <div className="holographic-line mt-10 h-0.5 w-full max-w-2xl mx-auto bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0" />
        </div>

        {/* Skill Cards - Futuristic Holographic Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillDetails.map((item, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              className="relative p-8 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-black to-gray-900 border border-cyan-400/20 shadow-[0_0_20px_rgba(0,247,255,0.3)] hover:shadow-[0_0_40px_rgba(0,247,255,0.6)] transition-all duration-500 overflow-hidden"
            >
              {/* Holographic effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,247,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#00f7ff_25%,transparent_50%)] animate-spin-slow opacity-20"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_#00f7ff]"></div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-2xl font-bold mb-3 text-cyan-300">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">{item.description}</p>

                    {/* Skill details */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-cyan-400 text-2xl font-bold">{item.level}%</div>
                        <div className="text-gray-400 text-xs">Proficiency</div>
                      </div>
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-cyan-400 text-2xl font-bold">{item.projects}+</div>
                        <div className="text-gray-400 text-xs">Projects</div>
                      </div>
                      <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-cyan-400 text-2xl font-bold">{item.years}</div>
                        <div className="text-gray-400 text-xs">Years</div>
                      </div>
                    </div>

                    {/* Skill level indicator */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Skill Level</span>
                        <span>{item.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary - Holographic Stats */}
        <div className="mt-24 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-cyan-300 mb-8 text-center">Technical Mastery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Frontend Frameworks', value: 'React, Next.js, Vue' },
              { label: 'UI Libraries', value: 'Tailwind, Material UI, Framer Motion' },
              { label: 'State Management', value: 'Redux, Zustand, Context API' },
              { label: 'API Integration', value: 'REST, GraphQL, Axios' }
            ].map((item, idx) => (
              <div
                key={idx}
                ref={el => statRefs.current[idx] = el}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg p-6 rounded-xl border border-cyan-400/20 shadow-[0_0_15px_rgba(0,247,255,0.2)]"
              >
                <h4 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-2">{item.label}</h4>
                <p className="text-gray-300 text-base font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional tech stack */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-cyan-300 mb-6 text-center">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['TypeScript', 'GSAP', 'Three.js', 'Figma', 'Jest', 'Webpack', 'Git', 'CI/CD'].map((tech, i) => (
              <div
                key={i}
                className="px-5 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-cyan-400/20 text-gray-300 hover:text-cyan-300 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full bg-cyan-400/30"
            style={{
              width: `${gsap.utils.random(2, 6)}px`,
              height: `${gsap.utils.random(2, 6)}px`,
              top: `${gsap.utils.random(0, 100)}%`,
              left: `${gsap.utils.random(0, 100)}%`, // ✅ Fixed line
            }}
          />
        ))}
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
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(10deg);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }

  .grid-cell {
    animation: float 10s infinite ease-in-out;
    animation-delay: calc(var(--i) * 0.1s);
  }
`}</style>

    </section>
  )
}