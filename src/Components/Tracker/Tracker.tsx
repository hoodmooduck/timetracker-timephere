import "./Tracker.scss";
import { useAppSelector } from "../../Modules/hooks/hooks-redux.ts";
import Button from "../../UI/Button/Button.tsx";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal.tsx";
import GraphBLock from "../GraphBLock/GraphBLock.tsx";
import {
  useGetUserDataQuery,
  useSaveUserDataMutation,
} from "../../Modules/Redux/API/ApiSlice.ts";

const TimeTrackerComponent = () => {
  const { activeTaskId } = useAppSelector((state) => state.tracker);
  const { user } = useAppSelector((state) => state.auth);

  const changeTask = (newTask: tasksType) => {
    return tasks.map((task) => (task.id === newTask.id ? newTask : task));
  };

  const { data, refetch } = useGetUserDataQuery(user.uidUser);
  const [saveUserData] = useSaveUserDataMutation();

  const tasks: tasksType[] = data?.tasks;
  const projects: projectsTypes[] = data?.projects;
  const task =
    activeTaskId !== -1 && tasks.filter((el) => el.id === activeTaskId)[0];

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
    refetch();
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

      setUserd({
        uid: user.uidUser,
        tasks: changeTask(changedTask) || [],
        projects: projects || [],
      });
    }
  };

  const complete = () => {
    if (!task) return;
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

    setUserd({
      uid: user.uidUser,
      tasks: changeTask(changedTask) || [],
      projects: projects || [],
    });
  };

  const formatTime = (min: number) => {
    if (!task) return;
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
    if (!task) return;
    if (task.startTime !== 0) {
      const totalTrackedTimeMs = Date.now() - task.startTime;
      const totalTrackedTimeSec = Math.floor(totalTrackedTimeMs / 1000);
      const totalTrackedTimeMin = Math.floor(totalTrackedTimeSec / 60);
      const totalTrackedTimeSec2 = (totalTrackedTimeSec % 60) / 60;

      if (task) {
        const changedTask = {
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

        setUserd({
          uid: user.uidUser,
          tasks: changeTask(changedTask) || [],
          projects: projects || [],
        });
      }
      startTime = null;
    }
  };

  return (
    activeTaskId &&
    task && (
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
    )
  );
};

export default TimeTrackerComponent;
