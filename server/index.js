const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
//Middelwares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
const validateJWT = require('./middleware/auth')

//Routes
const loginRoute = require("./routes/login");
const tareasRoute = require("./routes/tareas");
app.use("/tareas", tareasRoute);
app.use("/login", loginRoute);

app.get("/", validateJWT, (req, res) => {
  res.status(200).json({ message: "Bienvenido a la API Prueba tecnica AVE" });
});

app.listen(PORT, () => {
  console.log(`Servidor online puerto: ${PORT}`);
});
