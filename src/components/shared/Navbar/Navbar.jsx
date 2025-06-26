'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

export default function Navbar() {
  const navItemsRef = useRef([])
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navbarRef = useRef(null)
  const particlesRef = useRef([])

  const links = ['About', 'Skills', 'Projects']

  // Hover animation
  useEffect(() => {
    navItemsRef.current.forEach((el, index) => {
      if (!el) return

      const highlight = el.querySelector('.nav-highlight')

      el.addEventListener('mouseenter', () => {
        gsap.to(highlight, {
          width: '100%',
          duration: 0.4,
          ease: 'power3.out'
        })
        
        gsap.to(el, {
          color: '#00f7ff',
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      el.addEventListener('mouseleave', () => {
        if (links[index].toLowerCase() === activeSection) return 
        
        gsap.to(highlight, {
          width: '0%',
          duration: 0.4,
          ease: 'power3.inOut'
        })
        
        gsap.to(el, {
          color: '#ffffff',
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })
  }, [activeSection])

  // Active route observer
  useEffect(() => {
    const sectionIds = links.map(link => link.toLowerCase())
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-50% 0px -40%',
        threshold: 0.3
      }
    )

    sectionIds.forEach(id => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // Floating particles animation
  useEffect(() => {
    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: (i % 2 === 0 ? -5 : 5),
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, [])

  // Mobile menu toggle animation
  useEffect(() => {
    if (mobileMenuOpen) {
      // Open animation
      gsap.to('.mobile-menu', {
        height: '100vh',
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      })
      
      gsap.fromTo('.mobile-link',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        }
      )
      
      // Hamburger to X animation
      gsap.to('.hamburger-top', {
        y: 6,
        rotate: 45,
        duration: 0.3
      })
      
      gsap.to('.hamburger-middle', {
        opacity: 0,
        duration: 0.2
      })
      
      gsap.to('.hamburger-bottom', {
        y: -6,
        rotate: -45,
        duration: 0.3
      })
    } else {
      // Close animation
      gsap.to('.mobile-menu', {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in'
      })
      
      // X to hamburger animation
      gsap.to('.hamburger-top', {
        y: 0,
        rotate: 0,
        duration: 0.3
      })
      
      gsap.to('.hamburger-middle', {
        opacity: 1,
        duration: 0.2,
        delay: 0.1
      })
      
      gsap.to('.hamburger-bottom', {
        y: 0,
        rotate: 0,
        duration: 0.3
      })
    }
  }, [mobileMenuOpen])

  return (
    <header 
      ref={navbarRef}
      className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-400/20 shadow-[0_0_20px_rgba(0,247,255,0.1)]"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              width: `${gsap.utils.random(1, 3)}px`,
              height: `${gsap.utils.random(1, 3)}px`,
              top: `${gsap.utils.random(0, 100)}%`,
              left: `${gsap.utils.random(0, 100)}%`,
            }}
          />
        ))}
      </div>
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo with glow effect */}
        <Link href="#" className="relative group">
          <div className="text-white text-xl font-bold tracking-wider">
            <span className="text-cyan-400">MAHFUJ</span>.DEV
          </div>
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          <div className="absolute -inset-2 rounded-full bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-white text-sm font-medium uppercase tracking-wider">
          {links.map((link, idx) => {
            const isActive = activeSection === link.toLowerCase()

            return (
              <li
                key={link}
                ref={el => (navItemsRef.current[idx] = el)}
                className={`relative cursor-pointer py-2 transition-all duration-300 ${
                  isActive ? 'text-cyan-400' : 'text-white'
                }`}
              >
                <Link href={`#${link.toLowerCase()}`} scroll={false}>
                  <span className="relative z-10">{link}</span>
                  <div className="nav-highlight absolute bottom-0 left-0 h-[2px] bg-cyan-400 w-0"></div>
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-cyan-400 rounded-full"></div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
        
        {/* Contact button */}
        <button className="hidden md:block px-5 py-2 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-full text-white font-medium text-sm tracking-wider shadow-[0_0_15px_rgba(0,247,255,0.3)] hover:shadow-[0_0_25px_rgba(0,247,255,0.5)] transition-all duration-300">
          Contact
        </button>

        {/* Mobile menu button */}
        <button 
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="hamburger-top w-6 h-0.5 bg-cyan-400 mb-1.5 rounded-full transition-all"></div>
          <div className="hamburger-middle w-6 h-0.5 bg-cyan-400 mb-1.5 rounded-full transition-all"></div>
          <div className="hamburger-bottom w-6 h-0.5 bg-cyan-400 rounded-full transition-all"></div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu absolute top-0 left-0 w-full h-0 bg-black/95 backdrop-blur-xl overflow-hidden z-40 opacity-0">
        <div className="h-full flex flex-col justify-center items-center space-y-10 py-20">
          {links.map((link, idx) => {
            const isActive = activeSection === link.toLowerCase()
            
            return (
              <Link 
                key={link}
                href={`#${link.toLowerCase()}`}
                scroll={false}
                className={`mobile-link text-xl font-medium uppercase tracking-wider relative px-4 py-2 ${
                  isActive ? 'text-cyan-400' : 'text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 rounded-full"></div>
                )}
              </Link>
            )
          })}
          
          <button className="mobile-link px-8 py-3 bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-full text-white font-medium text-lg tracking-wider shadow-[0_0_15px_rgba(0,247,255,0.3)]">
            Contact Me
          </button>
        </div>
      </div>
    </header>
  )
}