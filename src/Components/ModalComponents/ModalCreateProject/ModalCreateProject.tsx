import './ModalCreateProject.scss'
import Input from "../../../UI/Input/Input.tsx";
import Button from "../../../UI/Button/Button.tsx";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../Modules/hooks/hooks-redux.ts";
import {addProject, addProjects} from "../../../Modules/Redux/actions/projects.ts";
import {addTasks} from "../../../Modules/Redux/actions/tasks.ts";
import {saveUserData} from "../../../Modules/Firebase/database-requests.ts";

const ModalCreateProject = () => {

    const dispatch = useAppDispatch()
    const {projects} = useAppSelector(state => state.projects)
    const {user} = useAppSelector(state => state.auth)

    const [userd, setUserd] = useState<user | null>(null);

    const [nameProject, setNameProject] = useState<string>('')
    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameProject(e.target.value);
    };

    useEffect(() => {
        const storedProjects = localStorage.getItem(`${user.uidUser}_projects`);
        if (storedProjects) {
            dispatch(addProjects(JSON.parse(storedProjects)));
        }
        const storedTasks = localStorage.getItem(`${user.uidUser}_tasks`);
        if (storedTasks) {
            dispatch(addTasks(JSON.parse(storedTasks)));
        }
    }, [])

    useEffect(() => {
        handleSave()
    }, [userd])

    const handleSave = async () => {
        if (user !== null) {
            await saveUserData(userd);
        }
    };

    const createProject = async () => {
        const _project: projectsTypes = {
            id: 1 + (projects[projects.length - 1] !== undefined ? projects[projects.length - 1].id : 0),
            name: nameProject,
        }

        dispatch(addProject(_project))
        const _projects: projectsTypes[] = [...projects]
        _projects.push(_project)
        localStorage.setItem(`${user.uidUser}_projects`, JSON.stringify(_projects));
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
                    label="Имя проекта"
                    type="text"
                    value={nameProject}
                    onChange={changeName}
                />
                <Button
                    onClick={createProject}
                    text='Создать проект'
                />
            </div>
        </div>
    )
}

export default ModalCreateProject