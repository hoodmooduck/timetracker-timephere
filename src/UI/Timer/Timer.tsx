import React from "react";

interface TimerProps {
  overcrowding: number;
}

const Timer: React.FC<TimerProps> = ({ overcrowding }: TimerProps) => {
  return (
    <svg viewBox="-250 -150 500 500" width="100px">
      <circle r="50" fill="none" stroke="#000" strokeWidth="100">
        <animate
          attributeName="stroke-dasharray"
          begin="0s"
          dur={`${overcrowding}s`}
          values="315 315; 0 315"
        />
      </circle>
    </svg>
  );
};

export default Timer;
