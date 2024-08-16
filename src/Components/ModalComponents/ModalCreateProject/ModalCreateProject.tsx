import "./ModalCreateProject.scss";
import Input from "../../../UI/Input/Input.tsx";
import Button from "../../../UI/Button/Button.tsx";
import React, { useState } from "react";
import { useAppSelector } from "../../../Modules/hooks/hooks-redux.ts";
import {
  useGetUserDataQuery,
  useSaveUserDataMutation,
} from "../../../Modules/Redux/API/ApiSlice.ts";

interface ModalCreateProjectProps {
  closeModal: () => void;
}

const ModalCreateProject = ({ closeModal }: ModalCreateProjectProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const { data } = useGetUserDataQuery(user.uidUser);
  const [saveUserData] = useSaveUserDataMutation();

  const projects = data?.projects;
  const tasks = data?.tasks;

  const [nameProject, setNameProject] = useState<string>("");
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameProject(e.target.value);
  };

  const createProject = async () => {
    const _project: projectsTypes = {
      id:
        1 +
        (projects[projects.length - 1] !== undefined
          ? projects[projects.length - 1].id
          : 0),
      name: nameProject,
    };

    const _projects: projectsTypes[] = [...projects];
    _projects.push(_project);

    const _user: user = {
      uid: user.uidUser,
      tasks: tasks ? tasks : [],
      projects: _projects ? _projects : [],
    };

    saveUserData(_user);
    setNameProject("");
    closeModal();
  };

  return (
    <div className="modal-project">
      <div className="modal-project__inner">
        <Input
          id="name"
          label="Имя проекта"
          type="text"
          value={nameProject}
          onChange={changeName}
        />
        <Button onClick={createProject} text="Создать проект" />
      </div>
    </div>
  );
};

export default ModalCreateProject;
