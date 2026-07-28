import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

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

  const agregarTarea = async () => {}
  

  return <div>lista de tareas</div>;
}
export default App;
