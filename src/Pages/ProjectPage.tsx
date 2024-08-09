import "../index.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../Modules/hooks/hooks-redux.ts";
import { useEffect } from "react";
import ProjectPageContent from "../Components/ProjectPageContent/ProjectPageContent.tsx";
import AuthMainLayout from "../Layouts/AuthMainLayout.tsx";

function ProjectPage() {
  const { fetching } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!fetching) {
      navigate("/");
    }
  }, []);

  return (
    <AuthMainLayout>
      <div className="project-page">
        <ProjectPageContent />
      </div>
    </AuthMainLayout>
  );
}

export default ProjectPage;
