import "./ModalCreateTask.scss";
import Input from "../../../UI/Input/Input.tsx";
import Button from "../../../UI/Button/Button.tsx";
import React, { useState } from "react";
import {
  useAppSelector,
} from "../../../Modules/hooks/hooks-redux.ts";
import {
  useGetUserDataQuery,
  useSaveUserDataMutation,
} from "../../../Modules/Redux/API/ApiSlice.ts";
import { useModalContext } from "../../../Modules/hooks/useModalContext.ts";

const ModalCreateTask = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { activeProjectId } = useAppSelector((state) => state.activeProject);

  const { data } = useGetUserDataQuery(user.uidUser);
  const [saveUserData] = useSaveUserDataMutation();

  const tasks = data?.tasks;
  const projects = data?.projects;

  const id = activeProjectId;

  const { closeModal } = useModalContext();
  const closeModalHandler = () => closeModal()

  const [nameProject, setNameProject] = useState<string>("");
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameProject(e.target.value);
  };

  const [description, setDescription] = useState<string>("");
  const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const [time, setTime] = useState<string>("");
  const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const createTask = () => {
    const _task: tasksType = {
      id:
        1 +
        (tasks[tasks.length - 1] !== undefined
          ? tasks[tasks.length - 1].id
          : 0),
      name: nameProject,
      description: description,
      time: Number(time),
      projectId: Number(id),
      tracking: 0,
      startTime: 0,
      complete: false,
    };

    const _tasks: tasksType[] = [...tasks];
    _tasks.push(_task);

    const _user: user = {
      uid: user.uidUser,
      tasks: _tasks ? _tasks : [],
      projects: projects ? projects : [],
    };

    saveUserData(_user);
    setNameProject("");
    setDescription("");
    setTime("");
    closeModalHandler()
  };

  return (
    <div className="modal-project">
      <div className="modal-project__inner">
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
        <Button onClick={() => createTask()} text="Создать задачу" />
      </div>
    </div>
  );
};

export default ModalCreateTask;
