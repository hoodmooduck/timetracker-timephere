import "./GraphBLock.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../Modules/hooks/hooks-redux.ts";
import { useGetData } from "../../Modules/hooks/getData.ts";

function GraphBLock() {
  const [overtime, setOvertime] = useState<number>(0);
  const { activeTaskId, time } = useAppSelector((state) => state.tracker);
  const id = activeTaskId;

  const { getTasks } = useGetData();

  const activeTask: tasksType = getTasks()?.filter(
    (task: tasksType) => Number(task.id) === activeTaskId
  )[0];

  const name = activeTask.name;
  const description = activeTask.description;
  const track = activeTask.tracking;

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
