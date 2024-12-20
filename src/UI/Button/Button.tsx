import "./Button.scss";

interface ButtonProps {
  text?: string;
  classes?: string;
  disabled?: boolean;
  onClick?: () => void;
  svg?: React.ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={`main-button${props.classes ? " " + props.classes : ""}`}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.text}
      {props.svg}
    </button>
  );
};

export default Button;
