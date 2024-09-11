import "./ProjectsContainer.scss";
import BigButton from "../../UI/BigButton/BigButton.tsx";
import ProjectsList from "./ProjectsList/ProjectsList.tsx";
import { useAppSelector } from "../../Modules/hooks/hooks-redux.ts";
import { useGetUserDataQuery } from "../../Modules/Redux/API/ApiSlice.ts";
import {
  componentNameMap,
  useModalContext,
} from "../../Modules/hooks/useModalContext.ts";

function ProjectsContainer() {
  const { user } = useAppSelector((state) => state.auth);

  const { data } = useGetUserDataQuery(user.uidUser);

  const { openModal } = useModalContext();

  const openModalHandler = () => {
    openModal(componentNameMap.ModalCreateProject);
  };

  const projects = data?.projects;

  return (
    <div className="projects-container">
      {projects && projects.length ? (
        <div className="projects-container__content">
          <ProjectsList />
        </div>
      ) : (
        <div className="projects-container__init">
          <h2>Создайте свой первый проект</h2>
          <BigButton onClick={openModalHandler} />
        </div>
      )}
    </div>
  );
}

export default ProjectsContainer;
