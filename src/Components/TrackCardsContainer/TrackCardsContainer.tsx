import "./TrackCardsContainer.scss";
import TrackCard from "../../UI/TrackCard/TrackCard.tsx";
import Modal from "../../UI/Modal/Modal.tsx";
import { useState } from "react";
import BigButton from "../../UI/BigButton/BigButton.tsx";
import ModalCreateTask from "../ModalComponents/ModalCreateTask/ModalCreateTask.tsx";
import {
  useAppDispatch,
  useAppSelector,
} from "../../Modules/hooks/hooks-redux.ts";
import { useParams } from "react-router-dom";
import { setActiveTask } from "../../Modules/Redux/actions/tracker.ts";

function TrackCardsContainer() {
  const id = useParams();

  const activeTaskId = useAppSelector((state) => state.tracker.activeTaskId);

  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { tasks } = useAppSelector((state) => ({
    tasks: state.tasks.tasks.filter((task) => task.projectId === Number(id.id)),
  }));

  const handleTaskClick = (id: number, time: number) => {
    const _activeTask = {
      id,
      time: Number(time),
    };

    dispatch(setActiveTask(_activeTask));
  };

  return (
    <div className="track-cards-container">
      <Modal active={openModal} setActive={setOpenModal}>
        <ModalCreateTask />
      </Modal>
      <div className="track-cards-container__container">
        <BigButton onClick={() => setOpenModal(true)} />
        <div className="projects-list__title">Ваши задачи:</div>
        {tasks &&
          tasks.map((el) => (
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
