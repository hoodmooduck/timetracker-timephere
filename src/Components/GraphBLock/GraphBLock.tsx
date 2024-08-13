import "./GraphBLock.scss";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  name: string;
  description: string;
  time: number;
  track: number;
}

function GraphBLock({ id, name, description, time, track }: Props) {
  const [overtime, setOvertime] = useState<number>(0);

  const getStatistic = () => {
    setOvertime(Math.floor(time - track));
  };

  useEffect(() => {
    getStatistic();
  }, [id]);

  return (
    <div className="graph-block">
      <div className="graph-block__name">
        [Задача №{id}]&nbsp;-&nbsp;{name}
      </div>
      <div className="graph-block__decsription">
        Описание задачи: {description}
      </div>
      {overtime < 0 ? (
        <div className="graph-block__overtime">
          Выполнение превышено на {Math.abs(overtime)} минут
        </div>
      ) : (
        <div className="graph-block__overtime graph-block__nicetime">
          Задача выполнена раньше на {Math.abs(overtime)} минут
        </div>
      )}
    </div>
  );
}

export default GraphBLock;
