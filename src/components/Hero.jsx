import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ texts, speed = 150, pause = 1500 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = texts[currentTextIndex];
      
      if (isDeleting) {
        setDisplayedText(prev => prev.slice(0, -1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        if (displayedText === currentFullText) {
          setTimeout(() => setIsDeleting(true), pause);
          return;
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex, texts, speed, pause]);

  return <span className="text-[#a3e635]">{displayedText}<span className="animate-pulse">|</span></span>;
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-black overflow-hidden px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Image */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-72 h-[450px] md:w-[400px] md:h-[600px] rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl shadow-[#a3e635]/20 group">
              <img 
                src="src/assets/images/Jainil.png" 
                alt="Profile" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#a3e635]/10 mix-blend-overlay" />
            </div>
            
            {/* Decorative Elements behind image */}
            <div className="absolute -z-10 top-8 right-8 w-full h-full border border-white/5 rounded-[2rem] transform translate-x-4 translate-y-4" />
            <div className="absolute -z-10 -bottom-20 -left-20 w-64 h-64 bg-[#a3e635]/20 blur-[100px] rounded-full" />
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-xl md:text-3xl text-white/60 font-light mb-6 tracking-wide">
              Hi, I'm <span className="text-white font-medium">Jainil Patel</span>
            </h2>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              Becoming a <br/>
              <Typewriter texts={['AI Developer.','Cloud Eng...']} />
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-xl font-light leading-relaxed">
              AWS Certified Solutions Architect Associate, happily getting distracted by building AI workflows. Also sharpening my full-stack side with React, FastAPI, and clean software engineering practices looking for opportunities where I can turn all these distractions into real impact.

            </p>
            
            <div className="flex flex-wrap gap-6">
              <a
                href="#projects"
                className="px-10 py-5 bg-[#a3e635] text-black text-lg rounded-full font-bold hover:bg-[#8cc629] transition-all hover:scale-105 shadow-[0_0_30px_rgba(163,230,53,0.3)]"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-10 py-5 border border-white/20 text-white text-lg rounded-full font-medium hover:border-[#a3e635] hover:text-[#a3e635] transition-colors"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
