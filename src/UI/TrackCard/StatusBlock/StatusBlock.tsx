import "./StatusBlock.scss";
import { Statuses } from "./types.ts";
import { StatusBlockClasses, StatusBlockLocale } from "../../../Shared/Locale";
import TypingDots from "../../TypingDots/TypingDots.tsx";

interface Props {
  status: Statuses;
}

function StatusBlock({ status }: Props) {
  return (
    <div
      className={`trackCard__isTracked${
        StatusBlockClasses[status as Statuses]
      }`}
    >
      {StatusBlockLocale[status as Statuses]}{" "}
      <TypingDots active={status === "Tracking"} />
    </div>
  );
}

export default StatusBlock;
