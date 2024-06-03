import "./ProjectsContainer.scss";
import BigButton from "../../UI/BigButton/BigButton.tsx";
import ProjectsList from "./ProjectsList/ProjectsList.tsx";
import {useAppSelector} from "../../Modules/hooks/hooks-redux.ts";

interface Props {
    projectOpenModal: (val: boolean) => void
}

function ProjectsContainer({projectOpenModal}: Props) {

    const {projects} = useAppSelector(state => state.projects)

    return (
        <div className="projects-container">
            {projects && projects.length ?
                <div className="projects-container__content">
                    <ProjectsList openModal={() => projectOpenModal(true)} projects={projects}/>
                </div>
                :
                <div className="projects-container__init">
                    <h2>Создайте свой первый проект</h2>
                    <BigButton onClick={() => projectOpenModal(true)}/>
                </div>
            }
        </div>
    )
}

export default ProjectsContainer;
