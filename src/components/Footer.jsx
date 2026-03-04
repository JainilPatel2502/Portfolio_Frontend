import React from 'react';
import socials from '../data/socials.json';
import * as FaIcons from 'react-icons/fa';
import * as SaIcons from 'react-icons/si';

const IconComponent = ({ iconName }) => {
  const Icon = FaIcons[iconName] || SaIcons[iconName];
  return Icon ? <Icon /> : null;
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-8 pb-32 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* LEFT: Social Icons */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-[#a3e635] text-xl transition-colors"
              aria-label={social.platform}
            >
              <IconComponent iconName={social.icon} />
            </a>
          ))}
        </div>

        {/* RIGHT: Copyright */}
        <p className="text-white/50 text-sm">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
