import { useAppDispatch } from "./hooks-redux.ts";
import { useCallback } from "react";
import {closeModalHandler, openModalHandler} from "../Redux/actions/modal.ts";
import ModalCreateTask from "../../Components/ModalComponents/ModalCreateTask/ModalCreateTask.tsx";
import ModalCreateProject from "../../Components/ModalComponents/ModalCreateProject/ModalCreateProject.tsx";
import GraphBLock from "../../Components/GraphBLock/GraphBLock.tsx";

export const componentNameMap = {
    ModalCreateTask: 'ModalCreateTask',
    ModalCreateProject: 'ModalCreateProject',
    ModalStatistic: 'ModalStatistic',
}

export const componentMap: Record<string, React.ComponentType<any>> = {
    [componentNameMap.ModalCreateTask]: ModalCreateTask,
    [componentNameMap.ModalCreateProject]: ModalCreateProject,
    [componentNameMap.ModalStatistic]: GraphBLock,
};


export const useModalContext = () => {
    const dispatch = useAppDispatch();

    const openModal = useCallback(
        (componentKey: string, needCloseButton = true) => {
            dispatch(openModalHandler({ componentKey, needCloseButton }));
        },
        [dispatch]
    );

    const closeModal = useCallback(() => {
        dispatch(closeModalHandler());
    }, [dispatch]);

    return { openModal, closeModal };
};