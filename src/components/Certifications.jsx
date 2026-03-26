import React from 'react';
import { motion } from 'framer-motion';
import certifications from '../data/certifications.json';
import awsSaaBadge from '../assets/images/aws-certified-solutions-architect-associate.png';

// Map JSON image filenames to imported assets
const certImages = {
  'aws-certified-solutions-architect-associate.png': awsSaaBadge,
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#a3e635]">Certifications</span>
        </motion.h2>

        <motion.p
          className="text-white/50 text-center text-lg mb-10 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Industry-recognized credentials validating my cloud expertise.
        </motion.p>

        <div className="flex flex-col items-center gap-6">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="relative flex flex-col items-center group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Blue glow behind badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-400/30 transition-all duration-700" />
              </div>

              {/* Badge container */}
              <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-500">
                {/* Badge image */}
                <div className="flex justify-center">
                  <img
                    src={certImages[cert.image]}
                    alt={`${cert.name} - ${cert.level}`}
                    className="w-[288px] h-[288px] object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  />
                </div>

                {/* Cert info */}
                <div className="text-center mt-4 space-y-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {cert.name}
                  </h3>
                  <p className="text-blue-400 text-lg font-semibold tracking-wide uppercase">
                    {cert.level}
                  </p>
                  <p className="text-white/40 text-sm">{cert.issuer}</p>
                </div>

                {/* Verify Button */}
                <div className="flex justify-center mt-4">
                  <a
                    href={cert.verifyUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#a3e635] text-black rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#8cc629] transition-all hover:scale-105 shadow-[0_0_30px_rgba(163,230,53,0.3)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    Verify Credential
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
