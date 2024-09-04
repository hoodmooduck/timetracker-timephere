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

  const changeTask = () => {
    const newListTasks = getTasks()?.filter(
        (task: tasksType) => task.id === Number(activeTaskId)
    )
    console.log(newListTasks)
  }

  return { deleteTask, changeTask };
};
