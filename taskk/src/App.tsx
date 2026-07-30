import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import type { Task } from "./types/task";
import "./App.css";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const obtenerTareas = async () => {
    const { data, error } = await supabase.from("tasks").select("*");

    if (error) {
      setError("No se pudieron cargar las tareas");
      console.log(error);
      return;
    }

    setTasks(data);
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  const agregarTarea = async () => {
    if (title === "") return;

    const { error } = await supabase.from("tasks").insert([
      {
        title,
        completed: false,
      },
    ]);
    if (error) {
      console.error(error);
      setError(error.message);

      return;
    }

    setTitle("");

    obtenerTareas();
  };

  const cambiarEstado = async (id: number, completed: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({
        completed: !completed,
      })
      .eq("id", id);

    if (error) {
      setError("No se pudo actualizar");

      return;
    }

    obtenerTareas();
  };

  return (
    <div className="container">
      <h1>Lista de tareas</h1>

      {error && <p className="error">{error}</p>}

      <div className="formulario">
        <input
          type="text"
          placeholder="Nueva tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={agregarTarea}>Agregar</button>
      </div>

      {tasks.length === 0 ? (
        <p className="mensaje">No hay tareas registradas.</p>
      ) : (
        <ul className="lista">
          {tasks.map((tasks) => (
            <TaskItem
              key={tasks.id}
              task={tasks}
              cambiarEstado={cambiarEstado}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;
