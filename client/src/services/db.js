import axios from "axios";
import authHeader from "./authJWT";

const url = "http://localhost:8080";

const getTareas = async () => {
  const { data } = await axios.get(`${url}/tareas`);
  return data;
};

const postTarea = async (value) => {
  const response = await axios.post(`${url}/tareas`, value, {
    headers: authHeader(),
  });
  return response;
};

const deletTarea = async (id) => {
  const response = await axios.delete(`${url}/tareas/${id}`, {
    headers: authHeader(),
  });
  return response;
};

const checkedTarea = async (id, tarea) => {
  const response = await axios.put(`${url}/tareas/check/${id}`, tarea, {
    headers: authHeader(),
  });
  return response;
};

const putTarea = async (id, tarea) => {
  const response = await axios.put(`${url}/tareas/${id}`, tarea, {
    headers: authHeader(),
  });
  return response;
};

const login = async (user) => {
  const response = await axios.post(`${url}/login`, user);

  return response;
};

export { getTareas, checkedTarea, postTarea, deletTarea, putTarea, login };
