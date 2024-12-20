import "./TrackerLine.scss";
import { memo, useMemo, useState } from "react";

type timeData = string | number;

interface PropsTrackerLine {
  startTime: timeData;
  endTime: timeData;
  trackTime: timeData;
  time: timeData;
  activeTaskId: number;
}

const TrackerLine = memo(
  ({ startTime, endTime, trackTime, time, activeTaskId }: PropsTrackerLine) => {
    const [isTimeOver, setIsTimeOver] = useState<boolean>(false);
    const calculateProcents = (st: timeData, et: timeData) => {
      const _st = Number(st);
      const _et = Number(et);
      const maxProcentsWidth = 100;

      const procentsWidth = (Number(trackTime) / Math.abs(_et - _st)) * 100;

      if (procentsWidth >= 100) {
        setIsTimeOver(true);
        return maxProcentsWidth;
      }

      return procentsWidth;
    };

    const styles = useMemo(() => {
      const _styles = {
        width: "0%",
      };

      if (Number(trackTime) <= 0) return _styles;

      if (!startTime) {
        _styles.width = `${calculateProcents(time, startTime)}%`;
      } else {
        _styles.width = `${calculateProcents(startTime, endTime)}%`;
      }
      return _styles;
    }, [startTime, endTime, activeTaskId, trackTime, time]);

    return (
      <div
        className={`${
          isTimeOver && Number(startTime) !== 0
            ? "trackerLine trackerLine__overtime"
            : "trackerLine"
        }`}
      >
        <div className="trackerLine__wrapper">
          <div style={styles} className="trackerLine__line">
            <div className="trackerLine__dot">🕔</div>
          </div>
        </div>
      </div>
    );
  }
);

export default TrackerLine;
