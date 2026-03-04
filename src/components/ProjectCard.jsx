import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      className="relative h-[400px] w-full bg-black border border-white/10 overflow-hidden cursor-pointer group"
      onClick={() => onClick(project)}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Background Image (Hidden by default, revealed on hover) */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.5 } }
        }}
      >
        <img
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8">
        {/* Top Section */}
        <div>
          <h3 className="text-4xl font-light text-white mb-2">{project.title}</h3>
          {/* Zigzag Line */}
          <motion.div
            className="w-12 h-2"
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } }
            }}
          >
            <svg width="45" height="10" viewBox="0 0 45 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5L6.5 1L12 5L17.5 1L23 5L28.5 1L34 5L39.5 1L44 5" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>

        {/* Bottom Section (Description moves up/down) */}
        <motion.div
          variants={{
            rest: { y: 0 },
            hover: { y: -10, transition: { duration: 0.4 } }
          }}
        >
          <p className="text-white/70 text-lg font-light max-w-xs">
            {project.description}
          </p>
          <motion.div
            className="mt-4 text-[#a3e635] font-medium flex items-center gap-2"
            variants={{
              rest: { opacity: 0, x: -10 },
              hover: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.2 } }
            }}
          >
            View Project <span>&rarr;</span>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Border Accent (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-[#a3e635] transition-colors duration-500" />
    </motion.div>
  );
};

export default ProjectCard;
