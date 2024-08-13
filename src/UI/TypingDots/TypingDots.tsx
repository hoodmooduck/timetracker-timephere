import "./TypingDots.scss";

interface Props {
  active?: boolean;
}

function Comp({ active = true }: Props) {
  return (
    active && (
      <div className="typing-dots">
        <div className="typing-dots__dot"></div>
        <div className="typing-dots__dot"></div>
        <div className="typing-dots__dot"></div>
      </div>
    )
  );
}

export default Comp;
