import { request, response } from "express";
import jwt from "jsonwebtoken";
import { tokenVerificationsErrors } from "../utils/errorToken.js";

export const validateToken = (req = request, res = response, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) throw new Error("Error. No existe el token");

    token = token.split(" ")[1];

    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: tokenVerificationsErrors[error.message] });
  }
};
