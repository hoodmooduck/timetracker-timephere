import "./ProjectPageContent.scss";
import TrackCardsContainer from "../TrackCardsContainer/TrackCardsContainer.tsx";
import Header from "../Header/Header.tsx";

interface Props {
    name?: string,
    projectId?: number,
}

function ProjectPageContent(props: Props) {


    return (
        <div className="project-page-content">
            <Header />
            {/* @ts-ignore */}
            <TrackCardsContainer projectId={props.projectId} />
        </div>
    )
}

export default ProjectPageContent;
