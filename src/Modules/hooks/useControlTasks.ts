import { useGetData } from "./getData.ts";
import {
  useGetUserDataQuery,
  useSaveUserDataMutation,
} from "../Redux/API/ApiSlice.ts";
import { useAppSelector } from "./hooks-redux.ts";

export const useControlTasks = () => {
  const { user } = useAppSelector((state) => state.auth);
  const activeTaskId = useAppSelector((state) => state.tracker.activeTaskId);
  const { data } = useGetUserDataQuery(user.uidUser);

  const { getTasks } = useGetData();

  const [saveUserData] = useSaveUserDataMutation();

  const deleteTask = () => {
    const newListTasks = getTasks()?.filter(
      (task: tasksType) => task.id !== Number(activeTaskId)
    );
    const newUserData = {
      ...data,
      tasks: newListTasks,
    };
    saveUserData(newUserData);
  };

  const changeTask = (
    name: string,
    description: string,
    time: string,
    checkChangesData: boolean
  ) => {
    if (checkChangesData) return;
    const changeTask = getTasks()?.filter(
      (task: tasksType) => task.id === Number(activeTaskId)
    )[0];
    const changedTask = {
      ...changeTask,
      name,
      description,
      time: Number(time),
    };
    const newListTasks = getTasks()?.filter(
      (task: tasksType) => task.id !== Number(activeTaskId)
    );
    newListTasks.push(changedTask);
    newListTasks.sort((a: tasksType, b: tasksType) => (a.id > b.id ? 1 : -1));
    const newUserData = {
      ...data,
      tasks: newListTasks,
    };
    saveUserData(newUserData);
  };

  return { deleteTask, changeTask };
};
