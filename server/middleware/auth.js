const jwt = require("jsonwebtoken");

const KEY = "secret";
const validateJWT = (req, res, next) => {
    const tokenHeader = req.headers?.authorization;
    console.log(tokenHeader);
    if (!tokenHeader) {
      res.status(401).send({message: "No autorizado, debe loguearse para ingresar"});
      return ;
    }
    const token = tokenHeader?.split(" ")[1];
    console.log(token);
    try {  
      const validate = jwt.verify(token, KEY);
      console.log("Validate", validate)
      next();
    } catch (err) {
      console.log(err);
      res.status(401).send({message: "No autorizado"})
    }
  }
module.exports = validateJWT