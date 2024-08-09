import React from "react";
import UserProfileTop from "../Components/UserProfileTop/UserProfileTop.tsx";
import { useAppSelector } from "../Modules/hooks/hooks-redux.ts";
import Header from "../Components/Header/Header.tsx";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Header />
      <UserProfileTop name={user.email} />
      <>{children}</>
    </>
  );
};

export default MainLayout;
