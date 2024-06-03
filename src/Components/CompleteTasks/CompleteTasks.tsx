import "./CompleteTasks.scss";
import {useAppDispatch, useAppSelector} from "../../Modules/hooks/hooks-redux.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Header from "../Header/Header.tsx";
import TrackCard from "../../UI/TrackCard/TrackCard.tsx";
import UserProfileTop from "../UserProfileTop/UserProfileTop.tsx";
import {setActiveTask} from "../../Modules/Redux/actions/tracker.ts";

function CompleteTasks() {
    const {isAuth, user} = useAppSelector(state => state.auth)
    const {tasks} = useAppSelector(state => state.tasks)

    let navigate = useNavigate();

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isAuth) {
            navigate('/')
        }
    }, []);

    const handleTaskClick = (id: number, time: number) => {
        const _activeTask = {
            id,
            time: Number(time)
        }

        dispatch(setActiveTask(_activeTask));
    };

    return (
        <div className='complete-tasks'>
            <UserProfileTop name={user.email}/>
            <Header/>
            <div className="complete-tasks__container">
                <h2 className='projects-list__title'>Выполненые задачи:</h2>
                {
                    tasks.map(el => (
                        el.complete ?
                            <TrackCard
                                key={el.id}
                                props={el}
                                setActiveTask={()=> handleTaskClick(el.id, el.time)}
                            />
                            :
                            null
                    ))
                }
            </div>
        </div>
    );
}

export default CompleteTasks;
