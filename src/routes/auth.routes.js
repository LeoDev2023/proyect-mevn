import { Router } from "express";
import { check } from "express-validator";
import {
  login,
  logout,
  protecRoute,
  refreshToToken,
  register,
} from "../controllers/auth.controller.js";
import { validations } from "../middlewares/validations.js";
import {
  validateEmail,
  validateRepassword,
} from "../helpers/customValidate.js";
import { validateToken } from "../middlewares/validateToken.js";
import { refreshToken } from "../middlewares/refreshToken.js";

const router = Router();

router.post(
  "/register",
  [
    check("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom(validateEmail),
    check("password", "El password debe tener mínimo 6 caracteres")
      .trim()
      .isLength({
        min: 6,
      })
      .custom(validateRepassword),
  ],
  validations,
  register
);

router.post(
  "/login",
  [
    check("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    check("password", "El password debe tener mínimo 6 caracteres")
      .trim()
      .isLength({
        min: 6,
      }),
  ],
  validations,
  login
);

router.get("/protected", validateToken, protecRoute);
router.get("/refresh", refreshToken, refreshToToken);
router.get("/logout", logout);

export default router;
