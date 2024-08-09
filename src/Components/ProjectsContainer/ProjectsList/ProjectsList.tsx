import "./ProjectsList.scss";
import ProjectCard from "../../../UI/ProjectCard/ProjectCard.tsx";
import BigButton from "../../../UI/BigButton/BigButton.tsx";

interface Props {
  openModal: () => void;
  projects: projectsTypes[];
}

function ProjectsList({ projects, openModal }: Props) {
  return (
    <div className="projects-list">
      <BigButton onClick={() => openModal()} />

      <div className="projects-list__container">
        <div className="projects-list__title">Ваши проекты: </div>
        {projects &&
          projects.map((el) => (
            <ProjectCard key={el.id} id={el.id} name={el.name} />
          ))}
      </div>
    </div>
  );
}

export default ProjectsList;
