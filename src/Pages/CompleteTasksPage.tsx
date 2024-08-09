import "../index.scss";
import CompleteTasks from "../Components/CompleteTasks/CompleteTasks.tsx";
import { useAppSelector } from "../Modules/hooks/hooks-redux.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
      <CompleteTasks />
    </AuthMainLayout>
  );
}

export default CompleteTasksPage;
