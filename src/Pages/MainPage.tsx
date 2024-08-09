import "../index.scss";
import Header from "../Components/Header/Header.tsx";
import UserProfileTop from "../Components/UserProfileTop/UserProfileTop.tsx";
import {
  useAppDispatch,
  useAppSelector,
} from "../Modules/hooks/hooks-redux.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal/Modal.tsx";
import ModalCreateProject from "../Components/ModalComponents/ModalCreateProject/ModalCreateProject.tsx";
import ProjectsContainer from "../Components/ProjectsContainer/ProjectsContainer.tsx";
import { getUserData } from "../Modules/Firebase/database-requests.ts";
import { addTasks } from "../Modules/Redux/actions/tasks.ts";
import { addProjects } from "../Modules/Redux/actions/projects.ts";
import { load } from "../Modules/Redux/actions/auth.ts";

function MainPage() {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { tasks } = useAppSelector((state) => state.tasks);
  const { projects } = useAppSelector((state) => state.projects);

  const dispatch = useAppDispatch();

  const [userd, setUserd] = useState<user>({
    uid: user.uidUser,
    projects: projects,
    tasks: tasks,
  });

  const handleGet = async () => {
    const data: any = await getUserData(userd.uid);
    if (data) {
      setUserd(data);
      dispatch(addTasks(data.tasks));
      dispatch(addProjects(data.projects));
      localStorage.setItem(
        `${user.uidUser}_projects`,
        JSON.stringify(data.projects)
      );
      localStorage.setItem(`${user.uidUser}_tasks`, JSON.stringify(data.tasks));
    }
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
      return;
    }

    handleGet();
    dispatch(load());
  }, []);

  return isAuth ? (
    <main className="main-page">
      <Modal active={openModal} setActive={setOpenModal}>
        <ModalCreateProject />
      </Modal>
      <Header />
      <div className="main-page__container">
        <UserProfileTop name={user.email} />
        <ProjectsContainer projectOpenModal={setOpenModal} />
      </div>
    </main>
  ) : null;
}

export default MainPage;
