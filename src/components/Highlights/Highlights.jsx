'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Highlight = () => {
  const sectionRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    const powering = new SplitType(section.querySelector("p.powering"), { types: "words" });
    const creative = new SplitType(section.querySelector("p.gradient-cyan"), { types: "words" });
    const interfaces = new SplitType(section.querySelector("p.gradient-pink"), { types: "words" });
    const frontend = new SplitType(section.querySelector("p.video-voice"), { types: "words" });

    const allWords = [
      ...powering.words,
      ...creative.words,
      ...interfaces.words,
      ...frontend.words,
    ];

    gsap.set(allWords, { color: "#525252" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${section.offsetHeight}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(allWords, {
      duration: 0.01,
      color: (i, target) => {
        if (creative.words.includes(target)) return "transparent";
        if (interfaces.words.includes(target)) return "transparent";
        return "#ffffff";
      },
      stagger: 0.15,
      ease: "none",
      onUpdate: () => {
        creative.words.forEach((word) => {
          if (gsap.getProperty(word, "color") === "transparent") {
            word.classList.add(
              "bg-gradient-to-r",
              "from-[#09e5e5]",
              "to-white",
              "bg-clip-text",
              "text-transparent"
            );
          } else {
            word.classList.remove(
              "bg-gradient-to-r",
              "from-[#09e5e5]",
              "to-white",
              "bg-clip-text",
              "text-transparent"
            );
          }
        });

        interfaces.words.forEach((word) => {
          if (gsap.getProperty(word, "color") === "transparent") {
            word.classList.add(
              "bg-gradient-to-r",
              "from-white",
              "to-pink-500",
              "bg-clip-text",
              "text-transparent"
            );
          } else {
            word.classList.remove(
              "bg-gradient-to-r",
              "from-white",
              "to-pink-500",
              "bg-clip-text",
              "text-transparent"
            );
          }
        });
      },
    });

    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: i % 2 === 0 ? -20 : 20,
        duration: 4 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-20 px-4 md:px-10 xl:px-32 2xl:px-44 min-h-screen overflow-hidden"
    >
      {/* Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: `${Math.floor(Math.random() * 4) + 2}px`,
              height: `${Math.floor(Math.random() * 4) + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto text-left leading-tight">
        <h2 className="text-lg md:text-2xl text-white leading-tight mb-4">
          BUILD WITH A MODERN FRONTEND STACK
        </h2>

        <p className="powering text-[48px] md:text-[80px] lg:text-[100px] xl:text-[120px] 2xl:text-[140px] font-extrabold leading-none tracking-tight">
          TRANSFORMING
        </p>
        <p className="gradient-cyan text-[48px] md:text-[80px] lg:text-[100px] xl:text-[120px] 2xl:text-[140px] font-extrabold leading-none tracking-tight">
          CREATIVE VISIONS
        </p>
        <p className="gradient-pink text-[48px] md:text-[80px] lg:text-[100px] xl:text-[120px] 2xl:text-[140px] font-extrabold leading-none tracking-tight">
          INTO INTERFACES
        </p>
        <p className="video-voice text-[48px] md:text-[80px] lg:text-[100px] xl:text-[120px] 2xl:text-[140px] font-extrabold leading-none tracking-tight">
          WITH MODERN FRONTEND.
        </p>
      </div>
    </section>
  );
};

export default Highlight;
