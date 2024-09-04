import {useGetUserDataQuery} from "../Redux/API/ApiSlice.ts";
import {useAppSelector} from "./hooks-redux.ts";

export const useGetData = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetUserDataQuery(user.uidUser);

  const getTasks = () => {
    return data?.tasks;
  };
  const getProjects = () => {
    return data?.projects;
  };

  return { getProjects, getTasks };
};