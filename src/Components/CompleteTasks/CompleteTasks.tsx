import "./CompleteTasks.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../Modules/hooks/hooks-redux.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TrackCard from "../../UI/TrackCard/TrackCard.tsx";
import UserProfileTop from "../UserProfileTop/UserProfileTop.tsx";
import { setActiveTask } from "../../Modules/Redux/actions/tracker.ts";
import { useGetUserDataQuery } from "../../Modules/Redux/API/ApiSlice.ts";

function CompleteTasks() {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const activeTaskId = useAppSelector((state) => state.tracker.activeTaskId);

  const { data } = useGetUserDataQuery(user.uidUser);

  const tasks: tasksType[] = data?.tasks;

  let navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth || !tasks) {
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

  return tasks && (
    <div className="complete-tasks">
      <UserProfileTop name={user.email} />
      <div className="complete-tasks__container">
        <h2 className="projects-list__title">Выполненые задачи:</h2>
        {tasks.map((el) =>
          el.complete ? (
            <TrackCard
              key={el.id}
              props={el}
              active={el.id === activeTaskId}
              setActiveTask={() => handleTaskClick(el.id, el.time)}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default CompleteTasks;
