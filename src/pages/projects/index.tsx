import React from "react";

import ItemSlot, { ItemSlotProps } from "@atoms/ItemSlot";

interface ProjectSlotProps extends ItemSlotProps {
  link?: string;
  title?: string;
}

const ProjectsPage = () => {

  const projects: ProjectSlotProps[] = [
    {
      image:
        "https://www.scdn.co/i/_global/open-graph-default.png",
      label: "discontinued",
      labelColour: "#8b0000",
      link: "/projects/spotify"
    },
    {
      title: "Vending Machine",
      link: "/projects/vendingmachine",
      image: "https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg",
      label: "finished",
      labelColour: "#51b971"
    },
    {
      title: "Travel Agency",
      link: "/projects/travelagency",
      image: "https://www.welcome-hotels.com/site/assets/files/8073/istock-513702887.2560x1600.jpg",
      colour: "#4a4a4a",
      label: "ongoing",
      labelColour: "#e9a626"
    }
  ];

  return (
    <>
      <div className="projects-container">
        {projects.map((project) => (
          <ItemSlot
            image={project.image}
            colour={project.colour}
            label={project.label}
            labelColour={project.labelColour}
          >
            <a className="item-link" href={project.link}>
              {project.title}
            </a>  
          </ItemSlot>
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
