import { useEffect } from "react";
import { supabase } from "./lib/supabase";

function App() {
  useEffect(() => {
    const obtenerTareas = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*");

      if (error) {
        console.error("❌ Error:", error);
      } else {
        console.log("✅ Datos:", data);
      }
    };

    obtenerTareas();
  }, []);

  return <h1>Conexión con Supabase</h1>;
}

export default App;