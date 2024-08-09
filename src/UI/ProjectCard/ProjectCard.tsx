import "./ProjectCard.scss";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../Modules/hooks/hooks-redux.ts";

const ProjectCard: React.FC<projectsTypes> = (props: projectsTypes) => {
  const { tasks } = useAppSelector((state) => ({
    tasks: state.tasks.tasks.filter((task) => task.projectId === props.id),
  }));

  const [color, setColor] = useState<string>("red");

  const completedTasks = tasks.filter(
    (task) => task.projectId === props.id && task.complete
  ).length;
  const procents =
    completedTasks && ((completedTasks / tasks.length) * 100).toFixed(2);

  useEffect(() => {
    if (Number(procents) <= 33) {
      setColor("red");
    }
    if (Number(procents) <= 99 && Number(procents) >= 34) {
      setColor("yellow");
    }
    if (Number(procents) >= 100) {
      setColor("green");
    }
  }, []);

  return (
    <NavLink to={"/main/project/" + props.id} className="projectCard">
      <div className="projectCard__content">
        <h2 className="projectCard__title">{props.name}</h2>
        <p className="projectCard__description">Задач: {tasks.length}</p>
        <p
          style={{ color: `var(--${color})` }}
          className="projectCard__description"
        >
          Выполнено задач: {completedTasks} из {tasks.length} ({procents}%)
        </p>
      </div>
    </NavLink>
  );
};

export default ProjectCard;
