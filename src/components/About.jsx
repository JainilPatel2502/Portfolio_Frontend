import React from "react";
import skillsData from "../data/skills.json";

const About = () => {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          About <span className="text-[#a3e635]">Me</span>
        </h2>

        <div className="max-w-3xl mx-auto text-white/80 text-lg leading-relaxed space-y-6 font-light mb-12">
          <p>
            I am an AWS Certified Solutions Architect Associate and an aspiring
            Cloud Engineer with a strong focus on building scalable, secure, and
            production-ready systems. I am actively developing my understanding
            of cloud architecture, infrastructure design, deployment strategies,
            and automation to create reliable solutions that go beyond
            theoretical concepts.
          </p>
          <p>
            At the same time, I am also growing as an AI Engineer, building
            impactful and meaningful projects that solve real problems. I am not
            just learning AI to train models. I aim to create complete
            intelligent systems that are useful in the real world.
          </p>
          <p>
            By combining Cloud and AI, I want to build powerful end-to-end
            applications that can create real impact.
          </p>
        </div>

        {/* Skills Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Tech Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillsData.map((category, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#a3e635]/50 transition-colors"
              >
                <h4 className="text-[#a3e635] font-bold mb-4 text-lg">
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/10 text-white/90 text-sm rounded-full border border-white/5 hover:bg-[#a3e635] hover:text-black transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
