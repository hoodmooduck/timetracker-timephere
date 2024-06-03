import "../index.scss";
import CompleteTasks from "../Components/CompleteTasks/CompleteTasks.tsx";
import {useAppSelector} from "../Modules/hooks/hooks-redux.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function CompleteTasksPage() {
    const {fetching} = useAppSelector(state => state.auth)

    const navigate = useNavigate()


    useEffect(() => {
        if (!fetching) {
            navigate('/')
        }
    }, []);

    return (
        <>
            <CompleteTasks />
        </>
    );
}

export default CompleteTasksPage;
