import "./Button.scss";

interface ButtonProps {
  text: string;
  classes?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={`main-button${props.classes ? " " + props.classes : ""}`}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.text}
    </button>
  );
};

export default Button;
