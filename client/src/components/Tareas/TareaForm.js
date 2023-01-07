import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { authData } from "../../services/authJWT";
import { postTarea } from "../../services/db";
const TareaForm = () => {
  const [input, setInput] = useState("");

  const user = authData();
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const sendTarea = async (e) => {
    e.preventDefault();
    const tarea = {
        user,
        text:input
    }
    const response = await postTarea(tarea)

    setInput('')
  
  };

  return (
    <form className="tarea-formulario" onSubmit={sendTarea}>
      <h3>{user.user}</h3>
      <TextField
        className="tarea-input"
        type="text"
        placeholder="Escribe una Tarea"
        name="text"
        onChange={handleChange}
        required
        value={input}
      />
      <Button variant="contained" type='submit' className="tarea-boton">Agregar Tarea</Button>
    </form>
  );
};

export default TareaForm;
