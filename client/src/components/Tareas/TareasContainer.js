import React, { useEffect, useState } from "react";
import TareaForm from "./TareaForm";
import Tarea from "./Tarea";
import { getTareas, deletTarea, putTarea } from "../../services/db";
import { Grid, Container } from "@mui/material";
import { useQuery } from "react-query";
import { checkedTarea } from "../../services/db";
import { authData } from "../../services/authJWT";

const TareasContainer = () => {
  const {
    data: tareas,
    error,
    isLoading,
  } = useQuery(["tareas"], getTareas, {
    refetchInterval: 2000,
  });
  const user = authData()
  const [editTarea, setEditTarea] = useState(false);
  const [datos, setDatos] = useState({});
  if (isLoading) return <h1>Cargando</h1>;
  if (error) return "Ha ocurrido un error: " + error.message;

 

  const eliminarTarea = async (id) => {
    const response = await deletTarea(id);

    return response;
  };

  
  const addEditTarea = () => {
    setEditTarea(true);
  };
  const edit = (id, text) => {
    const newTarea = {
      author: user.user,
      text,
      estado: "Pendiente"
    }

    putTarea(id, newTarea);

  };

  return (
    <>
      <Container>
        <h1>Listado de tareas </h1>

        <TareaForm />
        <Grid container spacing={3}>
          {tareas.map((tarea, index) => (

            <Tarea
              key={index}
              id={tarea.id}
              text={tarea.text}
              estado={tarea.estado}
              check={checkedTarea}
              saveEditTarea={edit}
              eliminarTarea={eliminarTarea}
              author={user.user}
            />
           

          ))
          }
          {}
        </Grid>
      </Container>
    </>
  );
};

export default TareasContainer;
