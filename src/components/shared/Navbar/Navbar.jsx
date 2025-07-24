'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navbarRef = useRef(null);
  const contactBtnRef = useRef(null);
  const iconRef = useRef(null);
  let glowTween = useRef(null);
  let bgTween = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          menuRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      } else {
        gsap.to(menuRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });
    tl.fromTo(
      navbarRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('.menu-button')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const btn = contactBtnRef.current;
    const icon = iconRef.current;

    if (!btn || !icon) return;

    const onHoverIn = () => {
      // Animate background color from white to gradient-like solid color with GSAP
      if (bgTween.current) bgTween.current.kill();

      bgTween.current = gsap.to(btn, {
        duration: 0.8,
        backgroundColor: '#a8ff57', // starting green-ish
        ease: 'power2.out',
        onUpdate: () => {
          // We'll do a smooth color transition via GSAP’s backgroundColor tweening
        },
      });

      // Glow pulse (box-shadow)
      glowTween.current = gsap.to(btn, {
        boxShadow:
          '0 0 12px 4px rgba(168,255,87,0.7), 0 0 24px 8px rgba(9,229,229,0.5)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Animate arrow icon slide and rotate (small movement)
      gsap.to(icon, {
        x: 8,
        y: -4,
        rotation: 15,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const onHoverOut = () => {
      if (bgTween.current) bgTween.current.kill();
      bgTween.current = gsap.to(btn, {
        duration: 0.8,
        backgroundColor: '#fff',
        ease: 'power2.inOut',
      });

      if (glowTween.current) glowTween.current.kill();
      gsap.to(btn, {
        boxShadow: 'none',
        duration: 0.5,
        ease: 'power2.inOut',
      });

      gsap.to(icon, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });
    };

    btn.addEventListener('mouseenter', onHoverIn);
    btn.addEventListener('mouseleave', onHoverOut);

    return () => {
      btn.removeEventListener('mouseenter', onHoverIn);
      btn.removeEventListener('mouseleave', onHoverOut);
      if (glowTween.current) glowTween.current.kill();
      if (bgTween.current) bgTween.current.kill();
    };
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 xl:px-28 2xl:px-56 opacity-0"
    >
      <div className="relative h-20 mt-4 flex items-center justify-between ">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="text-2xl font-bold text-white transition-colors"
        >
          Mafujur<span className="text-[#09e5e5]"> Dev</span>
        </button>

        {/* Center nav */}
        <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <div className="px-6 py-2 rounded-full border border-white/10 backdrop-blur-md bg-white/10 shadow-lg">
            <nav className="flex space-x-10">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'achivement', label: 'Achivements' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white hover:text-[#09e5e5] cursor-pointer transition-colors duration-300 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => scrollToSection('contact')}
          className="hidden lg:flex px-6 py-2 border text-xs md:text-xs lg:text-[16px] xl:text-xl text-black bg-white hover:bg-[#09e5e5] hover:text-black transition rounded-full font-semibold"
        >
          Contact

        </button>

        {/* Mobile Menu Button */}
        <button
          className="menu-button lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-8 h-8 relative">
            <span
              className={`absolute block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-1/2' : 'top-1'
                }`}
            ></span>
            <span
              className={`absolute block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'top-1/2'
                }`}
            ></span>
            <span
              className={`absolute block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-1/2' : 'top-3'
                }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-20 left-0 w-full"
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(94, 234, 212, 0.1)',
            borderBottom: '1px solid rgba(94, 234, 212, 0.1)',
          }}
        >
          <div className="flex flex-col px-8 py-6">
            {[
              { id: 'services', label: 'Services' },
              { id: 'stats', label: 'Stats' },
              { id: 'blogs', label: 'Blogs' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'contact', label: 'Contact Us' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white py-3 px-4 hover:bg-cyan-900/30 rounded-lg transition-colors duration-300 font-medium border-b border-gray-800 last:border-0 text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
