import "./ProjectPageContent.scss";
import TrackCardsContainer from "../TrackCardsContainer/TrackCardsContainer.tsx";

function ProjectPageContent() {
  return (
    <div className="project-page-content">
      {/* @ts-ignore */}
      <TrackCardsContainer />
    </div>
  );
}

export default ProjectPageContent;
