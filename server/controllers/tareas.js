const Contenedor = require("../utils/Container");
const db = "./db/tareas.json";
const contenedorTareas = new Contenedor(db);

const getAll = async (req, res) => {
  const getTareas = contenedorTareas.getAll();
  const resultado = await getTareas;
  res.status(200).json(resultado);
};

const postTarea = async (req, res) => {
  const { author, text } = req.body;
  const newPost = {
    author,
    text,
    estado: "Pendiente",
  };
  const tareaAgregada = contenedorTareas.save(newPost);
  const resultado = await tareaAgregada;
  res.status(200).json(resultado);
};
const updateTarea = async (req, res) => {
  const id = req.params.id;
  const { author,text,estado } = req.body;
  const newPost = {
    text,
    author,
    estado,
  };
  const dataUp = await contenedorTareas.update(newPost, id);
  res.status(200).json(dataUp);
};

const chekedTarea = async (req, res) => {
  const id = req.params.id;
  const {text, author} = req.body
  const newPost = {
    author,
    text,
    estado: "Completado",
  };
  const dataUp = await contenedorTareas.update(newPost, id);
  res.status(200).json(dataUp);
};

const deleteTarea = async (req, res) => {
  const id = req.params.id;
  const tareaEliminada = contenedorTareas.deletByID(id);
  res.status(200).json(tareaEliminada);
};

module.exports = {
  getAll,
  postTarea,
  updateTarea,
  deleteTarea,
  chekedTarea
};
