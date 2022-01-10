import ProjectSlot from "@atoms/ProjectSlot/ProjectSlot";
import React from "react";

interface ProjectProps {
  title: string;
  link: string;
  image: string;
}

const ProjectsPage = () => {
  const projects: ProjectProps[] = [
    {
      title: "Spotify",
      link: "/spotify",
      image:
        "https://phmg.com/images/default-source/default-album/banner_alt3ddd59f84cd34b5ba4685ac80af3641d.jpg",
    },
  ];

  return (
    <>
      <div className="projects-container">
        {projects.map((project) => (
          <ProjectSlot
            title={project.title}
            link={project.link}
            image={project.image}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
