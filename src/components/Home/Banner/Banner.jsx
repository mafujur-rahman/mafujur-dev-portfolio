'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

export default function Banner() {
  const developerRef = useRef(null)
  const containerRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const scrambleText = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      const targetText = "Developer"
      const duration = 1.5
      const fps = 60
      const totalFrames = duration * fps

      const scramble = () => {
        const el = developerRef.current
        if (!el) return

        const originalText = targetText.split('')
        let frame = 0

        const scrambleInterval = gsap.ticker.add(() => {
          let display = ''
          for (let i = 0; i < originalText.length; i++) {
            if (frame >= totalFrames) {
              display += originalText[i]
            } else {
              const progress = frame / totalFrames
              const revealThreshold = i / originalText.length
              display += progress > revealThreshold
                ? originalText[i]
                : chars[Math.floor(Math.random() * chars.length)]
            }
          }

          el.textContent = display
          frame++
          if (frame > totalFrames) gsap.ticker.remove(scrambleInterval)
        })
      }

      scramble()
      return setInterval(scramble, 5000)
    }

    const scrambleInterval = scrambleText()

    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: (i % 2 === 0 ? -20 : 20),
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })

    const gridItems = gsap.utils.toArray('.grid-cell')
    gridItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0 },
        {
          opacity: 0.1,
          duration: 1,
          delay: i * 0.02,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            toggleActions: "play none none none"
          }
        }
      )
    })

    const techTags = gsap.utils.toArray('.tech-tag')
    techTags.forEach((tag, i) => {
      gsap.fromTo(tag,
        { opacity: 0, y: 50, scale: 0.8 },
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
      )
      gsap.to(tag, {
        y: -10,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })

    gsap.fromTo('.main-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    )

    gsap.fromTo('.subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: "power3.out" }
    )

    const dataStreams = gsap.utils.toArray('.data-stream')
    dataStreams.forEach(stream => {
      const chars = "01010101010101"
      stream.textContent = Array.from({ length: 100 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
      gsap.to(stream, {
        x: '-100%',
        duration: 20,
        repeat: -1,
        ease: "none"
      })
    })

    return () => {
      clearInterval(scrambleInterval)
      gsap.killTweensOf([
        particlesRef.current,
        gridItems,
        techTags,
        dataStreams
      ])
    }
  }, [])

  return (
    <section
    id='home'
      ref={containerRef}
      className="relative overflow-hidden bg-black h-screen flex items-center justify-center px-6"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="grid-cell border border-[#09e5e5]/5" />
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className="absolute rounded-full bg-[#09e5e5]/10"
            style={{
              width: `${gsap.utils.random(2, 6)}px`,
              height: `${gsap.utils.random(2, 6)}px`,
              top: `${gsap.utils.random(0, 100)}%`,
              left: `${gsap.utils.random(0, 100)}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        <h1 className="main-title text-5xl md:text-7xl font-extrabold leading-tight mb-4">
          <span className="text-gray-400 block">I'm a</span>
          <span
            ref={developerRef}
            className=" text-[#09e5e5] "
          >
            Developer
          </span>
        </h1>

        <p className="subtitle text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Crafting immersive digital experiences at the intersection of design and technology
        </p>

        {/* Tech Tags */}
        <div className="flex justify-center flex-wrap gap-3">
          {['React', 'Next.js', 'GSAP', 'MongoDB', 'Node.js'].map((tech, i) => (
            <div
              key={i}
              className="tech-tag px-4 py-2 bg-[#09e5e5]/10 backdrop-blur-sm rounded-full border border-[#09e5e5]/10 text-[#09e5e5]"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-pulse">
        <div className="flex flex-col items-center">
          <span className="text-[#09e5e5] text-sm mb-2">EXPLORE PORTFOLIO</span>
          <div className="w-8 h-12 rounded-full border-2 border-[#09e5e5]/30 flex justify-center p-1">
            <div className="w-2 h-2 bg-[#09e5e5] rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Extra Animation */}
      <style jsx global>{`
        @keyframes hologram-pulse {
          0% { box-shadow: 0 0 10px rgba(9, 229, 229, 0.2); }
          50% { box-shadow: 0 0 40px rgba(9, 229, 229, 0.4); }
          100% { box-shadow: 0 0 10px rgba(9, 229, 229, 0.2); }
        }
        .tech-tag {
          animation: hologram-pulse 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
}
