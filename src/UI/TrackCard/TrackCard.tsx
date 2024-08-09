import "./TrackCard.scss";

// import {ReactSVG} from "react-svg";

interface TrackCardProps {
  props: tasksType;
  setActiveTask?: () => void;
}

const TrackCard = ({ props, setActiveTask }: TrackCardProps) => {
  return (
    <div onClick={setActiveTask} className="trackCard">
      {!props.complete ? (
        <div
          className={
            props.startTime
              ? "trackCard__isTracked trackCard__isTracked--active"
              : "trackCard__isTracked"
          }
        >
          {props.startTime ? "Выполняется" : "Не начата"}
        </div>
      ) : null}

      <div className="trackCard__content">
        <h2 className="trackCard__title">{props.name}</h2>
        <p className="trackCard__description">{props.description}</p>
        Трекинг задачи:{" "}
        <span className="trackCard__description">
          [{props.tracking} мин.]
        </span>{" "}
        из <span className="trackCard__description">[{props.time} мин.]</span>
      </div>
      {props.complete ? (
        <div className="trackCard__complete trackCard__isTracked">
          Выполнена
        </div>
      ) : null}
    </div>
  );
};

export default TrackCard;
