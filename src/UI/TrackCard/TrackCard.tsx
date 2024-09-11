import "./TrackCard.scss";
import StatusBlock from "./StatusBlock/StatusBlock.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { Statuses } from "./StatusBlock/types.ts";
import Button from "../Button/Button.tsx";
import { useControlTasks } from "../../Modules/hooks/useControlTasks.ts";
import Input from "../Input/Input.tsx";

interface TrackCardProps {
  props: tasksType;
  setActiveTask: () => void;
  active: boolean;
}

const TrackCard = ({ props, setActiveTask, active }: TrackCardProps) => {
  const handleClickCard = () => {
    setActiveTask();
  };

  const { deleteTask, changeTask } = useControlTasks();

  const [status, setStatus] = useState<Statuses>("InProgress");
  const [changeState, setChangeState] = useState<boolean>(false);

  const [nameProject, setNameProject] = useState<string>(props.name.toString());
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameProject(e.target.value);
  };

  const [description, setDescription] = useState<string>(
    props.description.toString()
  );
  const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const [time, setTime] = useState<string>(props.time.toString());
  const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const checkChanges =
    props.name === nameProject &&
      props.description === description &&
      props.time.toString() === time;

  const handleChangeState = useCallback(() => {
    if (!changeState) {
      setChangeState(true);
      return;
    }

    setChangeState(false);
    changeTask(nameProject, description, time, checkChanges);
  }, [changeState, nameProject, description, time, checkChanges]);

  useEffect(() => {
    if (props.complete) setStatus("Complete");
    else if (props.startTime) setStatus("Tracking");
    else setStatus("InProgress");
  }, [props.complete, props.startTime]);

  useEffect(() => {
    if (!active) {
      setChangeState(false);
    }
  }, [active]);

  return (
    <div
      onClick={handleClickCard}
      className={"trackCard" + `${active ? " trackCard-open" : ""}`}
    >
      <StatusBlock status={status} />
      <div className="trackCard__content">
        <Input
          id="name"
          type="text"
          value={nameProject}
          onChange={changeName}
          disabled={!changeState}
          className="trackCard__input trackCard__title"
        />
        <Input
          id="decs"
          type="text"
          value={description}
          onChange={changeDescription}
          disabled={!changeState}
          className="trackCard__input trackCard__description"
        />
        {changeState && (
          <Input
            id="time"
            type="number"
            value={time}
            onChange={changeTime}
            disabled={!changeState}
            className="trackCard__input"
          />
        )}
        {!changeState && (
          <span>
            <span className="trackCard__description">
              [{props.tracking} мин.]
            </span>
            &nbsp;из&nbsp;
            <span className="trackCard__description">[{props.time} мин.]</span>
          </span>
        )}
      </div>
      {active && (
        <div className="trackCard__controlPanel">
          <Button
            classes="trackCard__change-btn"
            disabled={props.complete}
            onClick={handleChangeState}
            text={!changeState ? "Изменить" : "Сохранить"}
          />
          <Button
            onClick={deleteTask}
            classes="trackCard__delete-btn"
            text="Удалить"
          />
        </div>
      )}
    </div>
  );
};

export default TrackCard;
