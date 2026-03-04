import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Footer from './Footer';

const ProjectDetails = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 bg-black overflow-y-auto"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-24 right-6 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
        >
          <HiX size={32} />
        </button>

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          
          {/* Main Content Grid: Left (Text) & Right (Sticky Video) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 relative">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col justify-center">
              <h2 className="text-[#a3e635] text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {project.title}
              </h2>
              
              {/* Highlights List */}
              <ul className="space-y-3 mb-8">
                {project.highlights?.map((point, index) => (
                  <li key={index} className="flex items-start text-white/80 text-lg">
                    <span className="text-[#a3e635] mr-3">-</span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Detailed Description */}
              <div className="text-white/60 text-base leading-relaxed space-y-6 mb-10 font-light">
                <p>{project.description}</p>
              </div>

              {/* Links */}
              <div className="flex gap-6 items-center">
                <a href={project.repo} className="flex items-center gap-2 text-white hover:text-[#a3e635] transition-colors font-medium">
                  <FaGithub size={20} /> Source Code
                </a>
              </div>
            </div>

            {/* Right Column: Sticky Video/Hero */}
            <div className="relative h-fit lg:sticky lg:top-32">
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                 {project.video ? (
                   <video src={project.video} autoPlay loop muted className="w-full h-full object-cover" />
                 ) : (
                   <img src={project.gallery?.[0]} alt={project.title} className="w-full h-full object-cover" />
                 )}
              </div>
            </div>
          </div>

          {/* Gallery Section (After description) */}
          <div className="mb-20">
            <h3 className="text-3xl text-white font-bold mb-10">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
              {project.gallery?.map((img, index) => (
                <motion.div 
                  key={index} 
                  className={`relative rounded-lg overflow-hidden cursor-pointer group ${index % 3 === 0 ? 'md:col-span-2' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
          
         
          
        </div>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;
