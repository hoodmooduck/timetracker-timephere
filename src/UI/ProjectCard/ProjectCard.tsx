import "./ProjectCard.scss";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../Modules/hooks/hooks-redux.ts";
import { useGetUserDataQuery } from "../../Modules/Redux/API/ApiSlice.ts";

interface ProjectCardState {
  id: number;
  name: string;
  onClick: () => void;
}

const ProjectCard = ({id, name, onClick} : ProjectCardState) => {
  const [color, setColor] = useState<string>("red");

  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetUserDataQuery(user.uidUser);

  const tasks = data?.tasks.filter(
    (task: tasksType) => task.projectId === id
  );

  const completedTasks = useMemo(
    () =>
      tasks.filter((task: tasksType) => {
        return task.complete;
      }).length,
    []
  );
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
  }, [tasks, completedTasks]);

  return (
    <NavLink
      onClick={onClick}
      to={"/main/project/" + id}
      className="projectCard"
    >
      <div className="projectCard__content">
        <h2 className="projectCard__title">{name}</h2>
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
