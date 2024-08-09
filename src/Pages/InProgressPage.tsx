import "../index.scss";
import InProgress from "../Components/InProgress/InProgress.tsx";
import { useAppSelector } from "../Modules/hooks/hooks-redux.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthMainLayout from "../Layouts/AuthMainLayout.tsx";

function CompleteTasksPage() {
  const { fetching } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!fetching) {
      navigate("/");
    }
  }, []);

  return (
    <AuthMainLayout>
      <InProgress />
    </AuthMainLayout>
  );
}

export default CompleteTasksPage;
