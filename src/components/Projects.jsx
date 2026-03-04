import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetails from './ProjectDetails';
import projectsData from '../data/projects.json';
import projectDetailsData from '../data/project_details.json';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    const details = projectDetailsData.find(p => p.id === project.id);
    setSelectedProject(details || project);
  };

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
          Featured <span className="text-[#a3e635]">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={handleProjectClick}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetails 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;
