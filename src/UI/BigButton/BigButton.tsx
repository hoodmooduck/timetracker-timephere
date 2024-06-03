import "./BigButton.scss";

interface ButtonProps {
    onClick?: () => void;
}

const BigButton: React.FC<ButtonProps> = (props) => {

    return (
        <button className="big-button" onClick={props.onClick}>
            <span>+</span>
        </button>
    );
};

export default BigButton;
