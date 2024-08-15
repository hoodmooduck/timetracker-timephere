import "../index.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../Modules/hooks/hooks-redux.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal/Modal.tsx";
import ModalCreateProject from "../Components/ModalComponents/ModalCreateProject/ModalCreateProject.tsx";
import ProjectsContainer from "../Components/ProjectsContainer/ProjectsContainer.tsx";
import { load } from "../Modules/Redux/actions/auth.ts";
import AuthMainLayout from "../Layouts/AuthMainLayout.tsx";

function MainPage() {
  const { isAuth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
      return;
    }

    dispatch(load());
  }, []);

  return isAuth ? (
    <AuthMainLayout>
      <main className="main-page">
        <Modal active={openModal} setActive={setOpenModal}>
          <ModalCreateProject closeModal={() => setOpenModal(false)} />
        </Modal>
        <div className="main-page__container">
          <ProjectsContainer projectOpenModal={setOpenModal} />
        </div>
      </main>
    </AuthMainLayout>
  ) : null;
}

export default MainPage;
