import "../index.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../Modules/hooks/hooks-redux.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectsContainer from "../Components/ProjectsContainer/ProjectsContainer.tsx";
import { load } from "../Modules/Redux/actions/auth.ts";
import AuthMainLayout from "../Layouts/AuthMainLayout.tsx";

function MainPage() {
  const { isAuth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

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
        <div className="main-page__container">
          <ProjectsContainer />
        </div>
      </main>
    </AuthMainLayout>
  ) : null;
}

export default MainPage;
