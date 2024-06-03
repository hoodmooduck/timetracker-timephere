import "./ControlButton.scss";
import React, { ReactNode } from "react";

interface ControlButtonProps {
  onClick: () => void;
  children: ReactNode;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  children,
}: ControlButtonProps) => {
  return (
    <button className="controlButton" onClick={() => onClick()}>
      {children}
    </button>
  );
};

export default ControlButton;
