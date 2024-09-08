import "./ProjectsList.scss";
import ProjectCard from "../../../UI/ProjectCard/ProjectCard.tsx";
import BigButton from "../../../UI/BigButton/BigButton.tsx";
import { useAppDispatch } from "../../../Modules/hooks/hooks-redux.ts";
import { useGetData } from "../../../Modules/hooks/getData.ts";
import {
  componentNameMap,
  useModalContext,
} from "../../../Modules/hooks/useModalContext.ts";
import {setActiveProject} from "../../../Modules/Redux/actions/activeProject.ts";

function ProjectsList() {
  const dispatch = useAppDispatch();
  const { getProjects } = useGetData();

  const { openModal } = useModalContext();

  const openModalHandler = () => {
    openModal(componentNameMap.ModalCreateProject);
  };

  return (
    <div className="projects-list">
      <BigButton onClick={() => openModalHandler()} />

      <div className="projects-list__container">
        <div className="projects-list__title">Ваши проекты:</div>
        {getProjects() &&
          getProjects()?.map((el: projectsTypes) => (
            <ProjectCard
              key={el.id}
              id={el.id}
              name={el.name}
              onClick={() => dispatch(setActiveProject(el.id))}
            />
          ))}
      </div>
    </div>
  );
}

export default ProjectsList;
