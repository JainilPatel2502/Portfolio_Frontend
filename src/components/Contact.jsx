import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">
          Get In <span className="text-[#a3e635]">Touch</span>
        </h2>
        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light">
“Currently distracted by AI…
Looking for a job that distracts me even more.”
        </p>
        <a
          href="mailto:jainil.patel2502@gmail.com"
          className="inline-block px-8 py-4 bg-[#a3e635] text-black rounded-full font-bold text-lg hover:bg-[#8cc629] transition-all hover:-translate-y-1"
        >
          Say Hello
        </a>
      </div>
    </section>
  );
};

export default Contact;
