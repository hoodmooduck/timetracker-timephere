import "./TrackCardsContainer.scss";
import TrackCard from "../../UI/TrackCard/TrackCard.tsx";
import BigButton from "../../UI/BigButton/BigButton.tsx";
import { useAppDispatch, useAppSelector } from "../../Modules/hooks/hooks-redux.ts";
import { useParams } from "react-router-dom";
import { setActiveTask } from "../../Modules/Redux/actions/tracker.ts";
import { useGetData } from "../../Modules/hooks/getData.ts";
import {componentNameMap, useModalContext} from "../../Modules/hooks/useModalContext.ts";

function TrackCardsContainer() {
  const id = useParams();
  const { getTasks } = useGetData();

  const activeTaskId = useAppSelector((state) => state.tracker.activeTaskId);
  const dispatch = useAppDispatch();
  const { openModal } = useModalContext();

  const openModalHandler = () => {
    openModal(componentNameMap.ModalCreateTask);
  };

  const tasks = getTasks()?.filter((task: tasksType) => task.projectId === Number(id.id));

  const handleTaskClick = (id: number, time: number) => {
    const _activeTask = {
      id,
      time: Number(time),
    };

    dispatch(setActiveTask(_activeTask));
  };

  return (
      <div className="track-cards-container">
        <div className="track-cards-container__container">
          <BigButton onClick={openModalHandler} />
          <div className="projects-list__title">Ваши задачи:</div>
          {tasks &&
              tasks.map((el: tasksType) => (
                  <TrackCard
                      key={el.id}
                      props={el}
                      active={el.id === activeTaskId}
                      setActiveTask={() => handleTaskClick(el.id, el.time)}
                  />
              ))}
        </div>
      </div>
  );
}

export default TrackCardsContainer;