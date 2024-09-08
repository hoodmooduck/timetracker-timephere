import "./Modal.scss";
import {ReactSVG} from "react-svg";
import close from "/assets/svg/close.svg"
import {useAppDispatch, useAppSelector} from "../../Modules/hooks/hooks-redux.ts";
import {closeModalHandler} from "../../Modules/Redux/actions/modal.ts";
import {componentMap} from "../../Modules/hooks/useModalContext.ts";

function Modal() {
    const {openModal, componentKey} = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch();

    if (!openModal || !componentKey) return null;
    const ComponentToRender = componentMap[componentKey];

    return (
        <div className={openModal ? 'modal modal--active' : 'modal'}>
            <div className='modal__view'>
                <div onClick={() => dispatch(closeModalHandler())} className="modal__close-btn">
                    <ReactSVG src={close}></ReactSVG>
                </div>
                {ComponentToRender && <ComponentToRender />}
            </div>
        </div>
    )
}

export default Modal;
