import "./TrackCard.scss";
import StatusBlock from "./StatusBlock/StatusBlock.tsx";
import { useEffect, useState } from "react";
import { Statuses } from "./StatusBlock/types.ts";
import Button from "../Button/Button.tsx";

interface TrackCardProps {
  props: tasksType;
  setActiveTask: () => void;
  active: boolean;
  onDeleteTask: () => void;
  onChangeTask: () => void;
}

const TrackCard = ({
  props,
  setActiveTask,
  active,
  onDeleteTask,
  onChangeTask,
}: TrackCardProps) => {
  const handleClickCard = () => {
    setActiveTask();
  };

  const [status, setStatus] = useState<Statuses>("InProgress");

  useEffect(() => {
    if (props.complete) setStatus("Complete");
    else if (props.startTime) setStatus("Tracking");
    else setStatus("InProgress");
  }, [props.complete, props.startTime]);

  return (
    <div
      onClick={handleClickCard}
      className={"trackCard" + `${active ? " trackCard-open" : ""}`}
    >
      <StatusBlock status={status} />
      <div className="trackCard__content">
        <h2 className="trackCard__title">{props.name}</h2>
        <p className="trackCard__description">{props.description}</p>
        <span>
          <span className="trackCard__description">
            [{props.tracking} мин.]
          </span>
          &nbsp;из&nbsp;
          <span className="trackCard__description">[{props.time} мин.]</span>
        </span>
      </div>
      {active && (
        <div className="trackCard__controlPanel">
          <Button
            classes="trackCard__change-btn"
            disabled={props.complete}
            onClick={onChangeTask}
            text="Изменить"
          />
          <Button
            onClick={onDeleteTask}
            classes="trackCard__delete-btn"
            text="Удалить"
          />
        </div>
      )}
    </div>
  );
};

export default TrackCard;
