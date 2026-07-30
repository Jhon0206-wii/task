import type { Task } from "../types/task"


type Props = {
  task: Task;
  cambiarEstado: (
    id: number,
    completed: boolean
  ) => void;
};

function TaskItem({
  task,
  cambiarEstado,
}: Props) {

  return (

    <li>

      <span>

        {task.completed ? "✅" : "⭕"}

        {task.title}

      </span>

      <button
        onClick={() =>
          cambiarEstado(
            task.id,
            task.completed
          )
        }
      >
        Cambiar
      </button>

    </li>

  );
}

export default TaskItem;