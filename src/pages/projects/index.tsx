import ProjectSlot from "@atoms/ProjectSlot/ProjectSlot";
import React from "react";

interface ProjectProps {
  title: string;
  link: string;
  image: string;
  color: string;
}

const ProjectsPage = () => {
  const projects: ProjectProps[] = [
    {
      title: "",
      link: "/projects/spotify",
      image:
        "https://www.scdn.co/i/_global/open-graph-default.png",
      color: ""
    },
    {
      title: "",
      link: "/projects/hackerrank",
      image: "http://vandtech.weebly.com/uploads/6/3/0/1/63016701/3140491_orig.png",
      color: ""
    },
    {
      title: "Vending Machine",
      link: "/projects/vendingmachine",
      image: "https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg",
      color: ""
    },
    {
      title: "Travel Agency",
      link: "/projects/travelagency",
      image: "https://www.welcome-hotels.com/site/assets/files/8073/istock-513702887.2560x1600.jpg",
      color: "#4a4a4a"
    }
  ];

  return (
    <>
      <div className="projects-container">
        {projects.map((project) => (
          <ProjectSlot
            title={project.title}
            link={project.link}
            image={project.image}
            color={project.color}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
