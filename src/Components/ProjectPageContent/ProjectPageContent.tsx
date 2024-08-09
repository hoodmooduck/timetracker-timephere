import "./ProjectPageContent.scss";
import TrackCardsContainer from "../TrackCardsContainer/TrackCardsContainer.tsx";
import AuthMainLayout from "../../Layouts/AuthMainLayout.tsx";

function ProjectPageContent() {
  return (
    <AuthMainLayout>
      <div className="project-page-content">
        {/* @ts-ignore */}
        <TrackCardsContainer />
      </div>
    </AuthMainLayout>
  );
}

export default ProjectPageContent;
