'use client'
import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub, FaLinkedin, FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const particleRef = useRef(null)
  const hologramRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo('.section-title', 
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )
      
      // Matrix text effect for title
      const matrixChars = '01';
      const titleText = "Let's create something exceptional.";
      let iterations = 0;
      
      const interval = setInterval(() => {
        document.querySelector('.section-title').textContent = titleText
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return titleText[index];
            }
            return matrixChars[Math.floor(Math.random() * matrixChars.length)]
          })
          .join('');
        
        if (iterations >= titleText.length) {
          clearInterval(interval);
          document.querySelector('.section-title').textContent = titleText;
        }
        
        iterations += 1 / 3;
      }, 50);
      
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
      
      // Form animation
      gsap.fromTo(formRef.current.children, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )
      
      // Social icons animation
      gsap.fromTo('.social-icon', 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          delay: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )
      
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
              trigger: sectionRef.current,
              start: "top bottom",
              toggleActions: "play none none none"
            }
          }
        );
      });
      
    }, sectionRef);

    return () => ctx.revert()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <>
      <section
        id='contact'
        ref={sectionRef}
        className="relative min-h-screen bg-black px-6 py-24 md:py-32 lg:px-24 text-white flex justify-center overflow-hidden"
        aria-label="Contact section"
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
        
        {/* Central hologram */}
        <div 
          ref={hologramRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full border-4 border-cyan-400/20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,247,255,0.05) 0%, transparent 70%)',
            boxShadow: 'inset 0 0 100px rgba(0,247,255,0.1), 0 0 200px rgba(0,247,255,0.1)'
          }}
        />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-16 md:gap-28 max-w-7xl w-full px-4">
          {/* Left Info Panel */}
          <div className="flex flex-col justify-center max-w-xl mx-auto md:mx-0 flex-1">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Let's create something exceptional.
            </h2>
            
            <div className="mb-10">
              <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-lg">
                I'm <span className="text-cyan-400 font-semibold">Mafujur Rahman</span>, a frontend developer specializing in React, Next.js, and Tailwind CSS.
              </p>
              
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 rounded-full bg-cyan-400 mr-3 animate-pulse"></div>
                <p className="text-gray-300">Currently available for freelance projects</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mr-3 animate-pulse"></div>
                <p className="text-gray-300">Response time: within 24 hours</p>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="mb-10">
              <h3 className="text-cyan-400 text-xl font-semibold mb-4">Direct Contact</h3>
              <div className="space-y-3">
                <p className="flex items-center">
                  <span className="text-gray-400 w-24">Email:</span>
                  <span className="text-white">mdmafuj000@gmail.com</span>
                </p>
                <p className="flex items-center">
                  <span className="text-gray-400 w-24">Telegram:</span>
                  <span className="text-white">@mahfuj_dev</span>
                </p>
                <p className="flex items-center">
                  <span className="text-gray-400 w-24">Discord:</span>
                  <span className="text-white">mahfuj#1234</span>
                </p>
              </div>
            </div>
            
            {/* Social Links */}
            <nav
              className="flex gap-6 text-2xl text-gray-400"
              aria-label="Social media links"
            >
              {[
                { href: 'https://github.com/mafujur-rahman', icon: <FaGithub />, label: 'GitHub' },
                { href: 'https://linkedin.com/in/mafujurrahman', icon: <FaLinkedin />, label: 'LinkedIn' },
                { href: 'https://twitter.com/mafujurrahman', icon: <FaTwitter />, label: 'Twitter' },
                { href: 'https://t.me/mahfuj_dev', icon: <FaTelegram />, label: 'Telegram' },
                { href: 'https://discord.com', icon: <FaDiscord />, label: 'Discord' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon relative group transition-colors duration-300 hover:text-cyan-400"
                >
                  {icon}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative rounded-3xl p-8 max-w-lg w-full backdrop-blur-lg bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-400/20 shadow-[0_0_40px_rgba(0,247,255,0.2)] mx-auto md:mx-0 flex-1"
            aria-label="Contact form"
          >
            {/* Holographic border */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden z-0">
              <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#00f7ff_25%,transparent_50%)] animate-spin-slow opacity-20"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                Send a Message
              </h3>
              
              <label className="block mb-6">
                <span className="text-gray-400 mb-2 block">Name</span>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 border border-cyan-400/20 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  placeholder="Your full name"
                />
              </label>

              <label className="block mb-6">
                <span className="text-gray-400 mb-2 block">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 border border-cyan-400/20 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block mb-8">
                <span className="text-gray-400 mb-2 block">Message</span>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-xl bg-gray-800/70 border border-cyan-400/20 px-4 py-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  placeholder="Tell me about your project..."
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-emerald-500 text-white font-semibold rounded-xl py-4 text-lg shadow-lg hover:shadow-[0_0_30px_rgba(0,247,255,0.5)] transition-all duration-300 relative overflow-hidden group"
                aria-label="Send message"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              
              {submitSuccess && (
                <motion.div 
                  className="mt-6 p-4 bg-emerald-900/30 border border-emerald-400/30 rounded-xl text-emerald-300 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  🚀 Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </div>
          </form>
        </div>
        
        {/* Floating contact orb */}
        <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(0,247,255,0.5)] animate-pulse">
          <div className="absolute inset-0 rounded-full bg-cyan-400 blur-md animate-ping opacity-30"></div>
          <span className="text-black font-bold">DM</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-cyan-400/20 py-6 text-center text-gray-500 text-sm select-none relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Mafujur Rahman. All rights reserved.</p>
          <p className="mt-2 text-gray-600">Crafted with ❤️ in Bangladesh</p>
        </div>
      </footer>
      
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
    </>
  )
}