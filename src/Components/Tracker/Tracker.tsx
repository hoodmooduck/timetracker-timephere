import "./Tracker.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../Modules/hooks/hooks-redux.ts";
import { addTasks, changeTask } from "../../Modules/Redux/actions/tasks.ts";
import Button from "../../UI/Button/Button.tsx";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal.tsx";
import GraphBLock from "../GraphBLock/GraphBLock.tsx";
import { saveUserData } from "../../Modules/Firebase/database-requests.ts";

const TimeTrackerComponent = () => {
  const dispatch = useAppDispatch();
  const { activeTaskId } = useAppSelector((state) => state.tracker);
  const { tasks } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.auth);

  const task = tasks.filter((el) => el.id === activeTaskId)[0];
  let startTime: number | null = null;

  const [modal, setModal] = useState<boolean>(false);

  const [userd, setUserd] = useState<user | null>(null);

  const handleSave = async () => {
    if (user !== null) {
      await saveUserData(userd);
    }
  };

  useEffect(() => {
    handleSave();
  }, [userd]);

  const handleStartTracking = () => {
    startTime = Date.now();

    if (task) {
      const changedTask = {
        id: task.id,
        name: task.name,
        description: task.description,
        startTime: startTime,
        projectId: task.projectId,
        time: task.time,
        tracking: task.tracking,
        complete: task.complete,
      };

      dispatch(changeTask(changedTask));
      let _tasks = localStorage.getItem(`${user.uidUser}_tasks`);
      if (_tasks) {
        _tasks = JSON.parse(_tasks).map((task: tasksType) =>
          task.id === changedTask.id ? changedTask : task
        );
        const l_projects = localStorage.getItem(`${user.uidUser}_projects`);
        const l_tasks = localStorage.getItem(`${user.uidUser}_tasks`);

        setUserd({
          uid: user.uidUser,
          tasks: l_tasks ? JSON.parse(l_tasks) : [],
          projects: l_projects ? JSON.parse(l_projects) : [],
        });
      }
    }
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem(`${user.uidUser}_tasks`);
    if (storedTasks) {
      dispatch(addTasks(JSON.parse(storedTasks)));
    }
  }, []);

  const complete = () => {
    const changedTask = {
      id: task.id,
      name: task.name,
      description: task.description,
      startTime: task.startTime,
      projectId: task.projectId,
      time: task.time,
      tracking: task.tracking,
      complete: true,
    };

    dispatch(changeTask(changedTask));
    let _tasks = localStorage.getItem(`${user.uidUser}_tasks`);
    if (_tasks) {
      _tasks = JSON.parse(_tasks).map((task: tasksType) =>
        task.id === changedTask.id ? changedTask : task
      );

      const l_projects = localStorage.getItem(`${user.uidUser}_projects`);
      const l_tasks = localStorage.getItem(`${user.uidUser}_tasks`);

      setUserd({
        uid: user.uidUser,
        tasks: l_tasks ? JSON.parse(l_tasks) : [],
        projects: l_projects ? JSON.parse(l_projects) : [],
      });
    }
  };

  const formatTime = (min: number) => {
    let date = new Date(task.startTime);
    let date_now = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let minutes_now = date_now.getMinutes();

    if (min !== 0) {
      const h = Math.floor((min + minutes_now) / 60);
      const m = Math.floor((minutes + min) % 60);

      hours += h;
      minutes = m;

      if (hours >= 24) {
        hours = hours % 24;
      }
      return `${("00" + hours).slice(-2)}:${("00" + minutes).slice(-2)}`;
    } else {
      return `${("00" + hours).slice(-2)}:${("00" + minutes).slice(-2)}`;
    }
  };

  const handleStopTracking = () => {
    if (task.startTime !== 0) {
      const totalTrackedTimeMs = Date.now() - task.startTime;
      const totalTrackedTimeSec = Math.floor(totalTrackedTimeMs / 1000);
      const totalTrackedTimeMin = Math.floor(totalTrackedTimeSec / 60);
      const totalTrackedTimeSec2 = (totalTrackedTimeSec % 60) / 60;

      if (task) {
        const _changedTask = {
          id: task.id,
          name: task.name,
          description: task.description,
          startTime: 0,
          projectId: task.projectId,
          time: task.time,
          tracking: Number(
            (
              task.tracking +
              totalTrackedTimeMin +
              totalTrackedTimeSec2
            ).toFixed(2)
          ),
          complete: task.complete,
        };

        dispatch(changeTask(_changedTask));
        let _tasks = localStorage.getItem(`${user.uidUser}_tasks`);
        if (_tasks) {
          _tasks = JSON.parse(_tasks).map((task: tasksType) =>
            task.id === _changedTask.id ? _changedTask : task
          );
        }

        const l_projects = localStorage.getItem(`${user.uidUser}_projects`);
        const l_tasks = localStorage.getItem(`${user.uidUser}_tasks`);

        setUserd({
          uid: user.uidUser,
          tasks: l_tasks ? JSON.parse(l_tasks) : [],
          projects: l_projects ? JSON.parse(l_projects) : [],
        });
      }

      startTime = null;
    }
  };

  return activeTaskId && task ? (
    <div className="tracker">
      <Modal active={modal} setActive={() => setModal(false)}>
        <GraphBLock
          id={activeTaskId}
          name={task.name}
          time={task.time}
          description={task.description}
          track={task.tracking}
        />
      </Modal>
      <div className="tracker__name">
        Активная задача [№{task.id}]: {task.name}
      </div>
      <div className="tracker__time">
        {task.startTime ? (
          <>
            {task.tracking >= task.time ? (
              <>
                Трекинг → [{formatTime(0)} -{" "}
                <span className="tracker__overtime">overtime</span>]
              </>
            ) : (
              <>
                Трекинг → [{formatTime(0)} -{" "}
                {formatTime(task.time - Math.floor(task.tracking))}]
              </>
            )}
          </>
        ) : null}
      </div>
      <div className="tracker__control">
        <Button
          classes={"tracker__button"}
          disabled={task.startTime > 0 || task.complete}
          text="Начать трекинг"
          onClick={handleStartTracking}
        />
        <Button
          classes={"tracker__button"}
          disabled={task.startTime === 0 || task.complete}
          text="Пауза"
          onClick={handleStopTracking}
        />
      </div>
      <div className="tracker__control">
        <Button
          classes={"tracker__button"}
          disabled={task.complete}
          text="Выполнить"
          onClick={complete}
        />
        <Button
          classes={"tracker__button"}
          disabled={!task.complete}
          text="Сводка"
          onClick={() => setModal(true)}
        />
      </div>
    </div>
  ) : null;
};

export default TimeTrackerComponent;
