import "./ProjectsContainer.scss";
import BigButton from "../../UI/BigButton/BigButton.tsx";
import ProjectsList from "./ProjectsList/ProjectsList.tsx";
import { useAppSelector } from "../../Modules/hooks/hooks-redux.ts";
import { useGetUserDataQuery } from "../../Modules/Redux/API/ApiSlice.ts";

interface Props {
  projectOpenModal: (val: boolean) => void;
}

function ProjectsContainer({ projectOpenModal }: Props) {
  const { user } = useAppSelector((state) => state.auth);

  const { data } = useGetUserDataQuery(user.uidUser);

  const projects = data?.projects;

  return (
    <div className="projects-container">
      {projects && projects.length ? (
        <div className="projects-container__content">
          <ProjectsList
            openModal={() => projectOpenModal(true)}
            projects={projects}
          />
        </div>
      ) : (
        <div className="projects-container__init">
          <h2>Создайте свой первый проект</h2>
          <BigButton onClick={() => projectOpenModal(true)} />
        </div>
      )}
    </div>
  );
}

export default ProjectsContainer;
