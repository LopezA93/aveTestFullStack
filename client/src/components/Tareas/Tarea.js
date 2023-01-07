import { Grid } from "@mui/material";
import "./style/tarea.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormGroup from "@mui/material/FormGroup";
import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Box, TextField } from "@mui/material";
import { useState } from "react";
import { putTarea } from "../../services/db";

const Tarea = ({ id, text, estado, check, eliminarTarea, saveEditTarea }) => {
  const [checked, setChecked] = useState(false);
  const [editTarea, setEditTarea] = useState(false);
  const [datos, setDatos] = useState();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handelChangeEdit = (e) => {
    setDatos({ [e.target.name]: e.target.value });
  };

  const addEditTarea = () => {
    if (editTarea === false) {
      setEditTarea(true);
    } else {
      setEditTarea(false);
    }
  };

  return (
    <>
      <Grid item md={2}>
        <div
          className={
            checked || estado === "Completado"
              ? "tarea tarea-completada"
              : "tarea "
          }
        >
          <p>
            {" "}
            Tarea: <br />
            {text}
          </p>

          <Button>
            <DeleteIcon onClick={() => eliminarTarea(id)} />
          </Button>
          <Button>
            <EditIcon
              disabled={checked ? true : false}
              onClick={() => addEditTarea()}
            />
          </Button>
          <Checkbox
            checked={checked || estado === "Completado"}
            onChange={handleChange}
            onClick={() => check(id, { text })}
            inputProps={{ "aria-label": "controlled" }}
            disabled={checked || estado === "Completado" ? true : false}
          />
          <TextField
           id="datetime-local"
           label="Recordatorio"
           type="datetime-local"
           InputLabelProps={{
             shrink: true,
           }}
           className="recordatorio"
          />
        </div>
        <div className={!editTarea ? "divEditTarea" : ""}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "20ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Ingrese Tarea"
                defaultValue=""
                name="text"
                onChange={handelChangeEdit}
                className="TextfieldEdit"
              />

              <Button
                variant="contained"
                onClick={() => saveEditTarea(id, datos.text) || addEditTarea()}
              >
                Save
              </Button>
            </div>
          </Box>
        </div>
      </Grid>
      
    </>
  );
};

export default Tarea;
