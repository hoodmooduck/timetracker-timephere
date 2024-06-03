import "./NotFound.scss";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function NotFound() {
    const COUNT_SECONDS_TO_REDIRECT = 5

    const [timer, setTimer] = useState<number>(COUNT_SECONDS_TO_REDIRECT)

    let navigate = useNavigate();

    useEffect(() => {
        const countdown = setInterval(() => {
            if (timer > 0) {
                setTimer((prevTimer) => prevTimer - 1);
            } else {
                navigate('/');
                clearInterval(countdown);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer, navigate]);

    return (
        <main className="not-found">
            <div className="not-found__container">
                <h1 className='not-found__title'>404</h1>
                <h2 className='not-found__subtitle'>Page Not Found</h2>
                <p className='not-found__timer'>Reset to MAIN in {timer} seconds...</p>
            </div>
        </main>
    );
}

export default NotFound;
