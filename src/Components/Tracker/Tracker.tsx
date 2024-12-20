import "./Tracker.scss";
import { useAppSelector } from "../../Modules/hooks/hooks-redux.ts";
import Button from "../../UI/Button/Button.tsx";
import playSVG from "/assets/svg/play.svg";
import pauseSVG from "/assets/svg/pause.svg";
import { useEffect, useState } from "react";
import {
  useGetUserDataQuery,
  useSaveUserDataMutation,
} from "../../Modules/Redux/API/ApiSlice.ts";
import {
  componentNameMap,
  useModalContext,
} from "../../Modules/hooks/useModalContext.ts";
import { ReactSVG } from "react-svg";
import TrackerLine from "../../UI/TrackerLine/TrackerLine.tsx";

const TimeTrackerComponent = () => {
  const { activeTaskId } = useAppSelector((state) => state.tracker);
  const { user } = useAppSelector((state) => state.auth);

  const checkWindowSize = window.innerWidth > 768;

  const changeTask = (newTask: tasksType) => {
    return tasks.map((task) => (task.id === newTask.id ? newTask : task));
  };

  const { data } = useGetUserDataQuery(user.uidUser);
  const [saveUserData] = useSaveUserDataMutation();

  const { openModal } = useModalContext();

  const openModalHandler = () => {
    openModal(componentNameMap.ModalStatistic);
  };

  const tasks: tasksType[] = data?.tasks;
  const projects: projectsTypes[] = data?.projects;
  const task =
    activeTaskId !== -1 && tasks.filter((el) => el.id === activeTaskId)[0];

  let startTime: number | null = null;

  const [userd, setUserd] = useState<user | null>(null);
  const [trackingStart, setTrackingStart] = useState<boolean>(
    task && task.startTime !== 0
  );

  const handleSave = async () => {
    if (user !== null) {
      await saveUserData(userd);
    }
  };

  useEffect(() => {
    handleSave();
  }, [userd]);

  useEffect(() => {
    if (task && task.startTime !== 0) {
      setTrackingStart(false);
    } else if (task) {
      setTrackingStart(true);
    }
  }, [activeTaskId]);

  const handleControlTaskFunctions = () => {
    if (task && task.complete) {
      openModalHandler();
      return;
    }
    complete();
  };

  const handleControlTracking = () => {
    setTrackingStart((val) => !val);

    if (trackingStart) {
      handleStartTracking();
      return;
    }
    handleStopTracking();
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

  // const formatTime = (min: number) => {
  //   if (!task) return;
  //   let date = new Date(task.startTime);
  //   let date_now = new Date();
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   let minutes_now = date_now.getMinutes();
  //
  //   if (min !== 0) {
  //     const h = Math.floor((min + minutes_now) / 60);
  //     const m = Math.floor((minutes + min) % 60);
  //
  //     hours += h;
  //     minutes = m;
  //
  //     if (hours >= 24) {
  //       hours = hours % 24;
  //     }
  //     return `${("00" + hours).slice(-2)}:${("00" + minutes).slice(-2)}`;
  //   } else {
  //     return `${("00" + hours).slice(-2)}:${("00" + minutes).slice(-2)}`;
  //   }
  // };

  return (
    checkWindowSize &&
    activeTaskId &&
    task && (
      <div className="tracker">
        <Button
          classes={"tracker__button"}
          onClick={handleControlTracking}
          disabled={task.complete}
          svg={
            trackingStart ? (
              <ReactSVG src={playSVG} />
            ) : (
              <ReactSVG src={pauseSVG} />
            )
          }
        />
        <div className="tracker__container">
          <div className="tracker__name">
            [№{task.id}]: {task.name}
          </div>
          <TrackerLine
            startTime={task.startTime}
            endTime={task.startTime + task.time}
            trackTime={task.tracking}
            time={task.time}
            activeTaskId={activeTaskId}
          />
        </div>
        <Button
          classes={"tracker__button"}
          text={task.complete ? "Сводка" : "Выполнить"}
          onClick={handleControlTaskFunctions}
        />
      </div>
    )
  );
};

export default TimeTrackerComponent;
