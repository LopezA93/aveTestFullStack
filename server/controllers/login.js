const jwt = require("jsonwebtoken");

const KEY = "secret";

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, KEY, { expiresIn: "24h" });
  return token;
};
const users = [
  { id: 1, user: "Agustin", password: "1234" },
  { id: 2, user: "Shaira", password: "1234" },
];

const login = (req, res) => {
  const { user, password } = req.body;

  const usuario = users.find((u) => u.user === user && u.password == password);
  if (!usuario) {
    return res.json({ error: "credenciales invalidas" });
  }
  
  const access_token = generateToken(usuario);
  const _user = {

    user: usuario.user,
    token: access_token
  }

  res.json(_user);
};
module.exports = login