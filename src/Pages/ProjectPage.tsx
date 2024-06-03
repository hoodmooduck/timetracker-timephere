import "../index.scss";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../Modules/hooks/hooks-redux.ts";
import {useEffect, useState} from "react";
import ProjectPageContent from "../Components/ProjectPageContent/ProjectPageContent.tsx";
import UserProfileTop from "../Components/UserProfileTop/UserProfileTop.tsx";

function ProjectPage() {

    const {fetching} = useAppSelector(state => state.auth)


    const id = useParams()

    const navigate = useNavigate()

    const [project, setProject] = useState<projectsTypes>()

    const {projects} = useAppSelector((state) => state.projects);
    const {user} = useAppSelector((state) => state.auth);

    useEffect(() => {
        const destructUser = projects.filter((e) => e.id === Number(id.id))
        setProject(destructUser[0])

        if (!fetching) {
            navigate('/')
        }
    }, []);

    return (
        <div className='project-page'>
            <UserProfileTop name={user.email} />
            <ProjectPageContent name={project?.name} />
        </div>
    );
}

export default ProjectPage;
