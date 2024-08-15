import "./Loader.scss";
import TypingDots from "../TypingDots/TypingDots.tsx";

interface Props {
  activeLoader: boolean;
}

function Loader({ activeLoader }: Props) {
  return (
    activeLoader && (
      <div className="loader">
        <div className="loader__wrapper">
          <div className="loader__circle">
            <span></span>
            <span></span>
          </div>
          <div className="loader__text">
            <span>Loading</span>
            <TypingDots active />
          </div>
        </div>
      </div>
    )
  );
}

export default Loader;
