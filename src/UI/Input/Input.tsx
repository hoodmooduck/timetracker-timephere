import "./Input.scss";
import React from "react";

interface LinkButtonProps {
  id?: string;
  type: string;
  label?: string;
  className?: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return (
    <div className={props.className ? `main-input ${props.className}` : "main-input"}>
      <input
        type={props.type}
        value={props.value}
        autoComplete="off"
        onChange={props.onChange}
        id={props.id}
        required
        disabled={props.disabled}
      />
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
    </div>
  );
};

export default LinkButton;
