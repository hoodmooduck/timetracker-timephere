import "./UserProfileTop.scss";
import {ReactSVG} from "react-svg";
import logOutSVG from "/assets/svg/logout.svg";
import {useState} from "react";
import {useLocalStorage} from "../../Modules/hooks/useLocalStorage.ts";
import {useAppDispatch} from "../../Modules/hooks/hooks-redux.ts";
import {logOut} from "../../Modules/Redux/actions/auth.ts";
import {useNavigate} from "react-router-dom";

interface UserProfileTopProps {
    name: string | null,
}

const UserProfileTop = (props: UserProfileTopProps) => {

    const [active, setActive] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const {removeItem} = useLocalStorage('userInfo')

    const onClick = () => {
        setActive(val => !val)
    }

    let navigate = useNavigate();

    const logout = () => {
        dispatch(logOut())
        removeItem()
        navigate('/')
    }

    return (
        <div className={`user-profile-top${active ? ' user-profile-top--active' : ''}`}>
            <div onClick={onClick} className="user-profile-top__name">{props.name}</div>
            <div onClick={logout} className="user-profile-top__logout">
                <ReactSVG src={logOutSVG}></ReactSVG>
                <span>Log Out!</span>
            </div>
        </div>
    );
};

export default UserProfileTop;
