import "./Input.scss";
import React from "react";

interface LinkButtonProps {
  id?: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return (
    <div className="main-input">
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        id={props.id}
        required
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default LinkButton;
