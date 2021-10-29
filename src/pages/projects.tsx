import React from "react";

import { ContextContainer, ContextProps } from "src/context/ContextContainer";
import Pager from "src/components/atoms/Pager/Pager";
import SimpleArraySum from "src/components/organisms/SimpleArraySum/SimpleArraySum";
import SolveMeFirst from "src/components/organisms/SolveMeFirst/SolveMeFirst";
import SubarrayDivision from "src/components/organisms/SubarrayDivision/SubarrayDivision";
import ClimbingTheLeaderboard from "@organisms/ClimbingTheLeaderboard/ClimbingTheLeaderboard";

const ProjectsPage = () => {
  const { pageNumber } = React.useContext(ContextContainer) as ContextProps;
  const projects = [
    <SolveMeFirst />,
    <SimpleArraySum />,
    <SubarrayDivision />,
    <ClimbingTheLeaderboard />,
  ];

  return (
    <div className="content">
      <Pager totalPages={projects.length} />
      {projects[pageNumber]}
    </div>
  );
};

export default ProjectsPage;
