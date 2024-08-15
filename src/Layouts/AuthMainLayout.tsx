import React from "react";
import UserProfileTop from "../Components/UserProfileTop/UserProfileTop.tsx";
import { useAppSelector } from "../Modules/hooks/hooks-redux.ts";
import Header from "../Components/Header/Header.tsx";
import Loader from "../UI/Loader/Loader.tsx";
import { RootState } from "../Modules/Redux/store.ts";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  const { user } = useAppSelector((state) => state.auth);
  const isLoading = useAppSelector(
    (state: RootState) => state.loading.isLoading
  );

  return (
    <>
      <Header />
      <UserProfileTop name={user.email} />
      <Loader activeLoader={isLoading} />

      <>{children}</>
    </>
  );
};

export default MainLayout;
