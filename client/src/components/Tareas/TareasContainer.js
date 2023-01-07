import React, { useEffect, useState } from "react";
import TareaForm from "./TareaForm";
import Tarea from "./Tarea";
import { getTareas, deletTarea, putTarea } from "../../services/db";
import { Grid, Container, Button, Box, TextField } from "@mui/material";
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

  //   const [loading, setLoading] = useState(false);
  //   const agregarTarea = (tarea) => {
  //     if (tarea.texto.trim()) {
  //       tarea.texto = tarea.texto.trim();
  //       const tareasActualizadas = [tarea, ...tareas];
  //       setTareas(tareasActualizadas);
  //     }
  //   };

  const eliminarTarea = async (id) => {
    const response = await deletTarea(id);
    console.log("tarea eliminada");
    return response;
  };

  //   const completarTarea = (id) => {
  //     const tareasActualizadas = tareas.map((tarea) => {
  //       if (tarea.id === id) {
  //         tarea.completada = !tarea.completada;
  //       }
  //       return tarea;
  //     });
  //     setTareas(tareasActualizadas);
  //   };

  //   useEffect(() => {
  //     const getData = async () => {
  //       setLoading(true);
  //       const response = await getTareas();
  //       setTareas(response);
  //     };
  //     getData();

  //     setLoading(false);
  //   }, [tareas]);
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
