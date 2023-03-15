import jwt from "jsonwebtoken";
import { tokenVerificationsErrors } from "../utils/errorToken.js";

export const refreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("Error. No existe el token");
    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: tokenVerificationsErrors[error.message] });
  }
};
