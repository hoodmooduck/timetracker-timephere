import "./InProgress.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../Modules/hooks/hooks-redux.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TrackCard from "../../UI/TrackCard/TrackCard.tsx";
import { setActiveTask } from "../../Modules/Redux/actions/tracker.ts";
import { useGetUserDataQuery } from "../../Modules/Redux/API/ApiSlice.ts";

function CompleteTasks() {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { activeTaskId } = useAppSelector((state) => state.tracker);

  const { data } = useGetUserDataQuery(user.uidUser);

  const tasks: tasksType[] = data?.tasks;
  const projects: projectsTypes[] = data?.projects;
  let navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  const handleTaskClick = (id: number, time: number) => {
    const _activeTask = {
      id,
      time: Number(time),
    };

    dispatch(setActiveTask(_activeTask));
  };

  return (
    <div className="inprogres-tasks">
      <div className="inprogres-tasks__container">
        <h2 className="projects-list__title inprogres-tasks__title">
          Задачи в процессе:
        </h2>
        {projects.map((proj) => (
          <div key={proj.id}>
            {tasks.filter((t) => !t.complete && t.projectId === proj.id)
              .length === 0 ? null : (
              <>
                <h2 className="projects-list__title">
                  Проект [№{proj.id}]: {proj.name}
                </h2>
                <div className="inprogres-tasks__sub-container">
                  {tasks.map((el) =>
                    !el.complete && el.projectId === proj.id ? (
                      <TrackCard
                        key={el.id}
                        props={el}
                        active={el.id === activeTaskId}
                        setActiveTask={() => handleTaskClick(el.id, el.time)}
                      />
                    ) : null
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompleteTasks;
