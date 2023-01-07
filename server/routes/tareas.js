const express = require("express");
const { Router } = express;

const {
  getAll,
  postTarea,
  updateTarea,
  deleteTarea,
  chekedTarea
} = require("../controllers/tareas");
const tareasRoute = Router();


tareasRoute.get("/", getAll);
tareasRoute.post("/", postTarea);
tareasRoute.put('/:id', updateTarea)
tareasRoute.put('/check/:id', chekedTarea)
tareasRoute.delete('/:id', deleteTarea)

module.exports = tareasRoute;
