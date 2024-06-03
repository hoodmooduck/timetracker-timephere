import './ModalCreateTask.scss'
import Input from "../../../UI/Input/Input.tsx";
import Button from "../../../UI/Button/Button.tsx";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../Modules/hooks/hooks-redux.ts";
import {addTask} from "../../../Modules/Redux/actions/tasks.ts";
import {useParams} from "react-router-dom";
import {saveUserData} from "../../../Modules/Firebase/database-requests.ts";

const ModalCreateTask = () => {

    const dispatch = useAppDispatch()

    const {tasks} = useAppSelector(state => state.tasks)
    const {user} = useAppSelector(state => state.auth)


    const id = useParams()

    const [nameProject, setNameProject] = useState<string>('')
    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameProject(e.target.value);
    };

    const [description, setDescription] = useState<string>('')
    const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const [time, setTime] = useState<string>('')
    const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    };

    const [userd, setUserd] = useState<user | null>(null);


    useEffect(() => {
        handleSave()
    }, [userd])

    const handleSave = async () => {
        if (user !== null) {
            await saveUserData(userd);
        }
    };

    const createTask = () => {
        const _task: tasksType = {
            id: 1 + (tasks[tasks.length-1] !== undefined ? tasks[tasks.length-1].id : 0),
            name: nameProject,
            description: description,
            time: Number(time),
            projectId: Number(id.id),
            tracking: 0,
            startTime: 0,
            complete: false
        }

        const _tasks: tasksType[] = [...tasks]
        _tasks.push(_task)
        localStorage.setItem(`${user.uidUser}_tasks`, JSON.stringify(_tasks));
        dispatch(addTask(_task))

        const l_projects = localStorage.getItem(`${user.uidUser}_projects`);
        const l_tasks = localStorage.getItem(`${user.uidUser}_tasks`);

        setUserd({
            uid: user.uidUser,
            tasks: l_tasks ? JSON.parse(l_tasks) : [],
            projects: l_projects ? JSON.parse(l_projects) : []
        })
    }

    return (
        <div className='modal-project'>
            <div className='modal-project__inner'>
                <Input
                    id="name"
                    label="Имя задачи"
                    type="text"
                    value={nameProject}
                    onChange={changeName}
                />
                <Input
                    id="decs"
                    label="Описание"
                    type="text"
                    value={description}
                    onChange={changeDescription}
                />
                <Input
                    id="time"
                    label="Время в минутах"
                    type="number"
                    value={time}
                    onChange={changeTime}
                />
                <Button
                    onClick={() => createTask()}
                    text='Создать задачу'
                />
            </div>
        </div>
    )
}

export default ModalCreateTask