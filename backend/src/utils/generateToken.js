import jwt from "jsonwebtoken"
import serverConfig from "../config/serverConfig.js";

function generateToken(username) {
    return jwt.sign({id:username}, serverConfig.token, { expiresIn: '1d' });
  };


  export default generateToken;