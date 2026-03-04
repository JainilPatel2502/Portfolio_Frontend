import React, { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import socialsData from '../data/socials.json';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const resume = socialsData.find(social => social.platform === 'Resume');
    if (resume) setResumeUrl(resume.url);
  }, []);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white tracking-tighter">
          JP<span className="text-[#a3e635]">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/70 hover:text-[#a3e635] transition-colors font-medium text-sm uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              download
              className="px-6 py-2 bg-[#a3e635] text-black rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#8cc629] transition-all hover:scale-105"
            >
              Resume
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-t border-white/10 p-6 flex flex-col space-y-4 md:hidden">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-[#a3e635] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {resumeUrl && (
              <a
                href={resumeUrl}
                download
                className="inline-block text-center px-6 py-3 bg-[#a3e635] text-black rounded-full font-bold uppercase tracking-wider hover:bg-[#8cc629] transition-all"
                onClick={() => setIsOpen(false)}
              >
                Download Resume
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
