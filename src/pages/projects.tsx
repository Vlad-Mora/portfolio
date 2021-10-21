import React from "react";

import { ContextContainer, ContextProps } from "src/context/ContextContainer";
import Pager from "src/components/atoms/Pager/Pager";
import TimeConverter from "src/components/organisms/TimeConverter/TimeConverter";
import SolveMeFirst from "src/components/organisms/SolveMeFirst/SolveMeFirst";

const ProjectsPage = () => {
  const { pageNumber } = React.useContext(ContextContainer) as ContextProps;
  const projects = [<SolveMeFirst />, <TimeConverter />];

  return (
    <div className="content">
      <Pager totalPages={projects.length} />
      <div className="project">{projects[pageNumber]}</div>
    </div>
  );
};

export default ProjectsPage;
