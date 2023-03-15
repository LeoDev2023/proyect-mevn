import { Router } from "express";
import { check } from "express-validator";
import {
  createLinks,
  getLink,
  getLinks,
  removeLink,
  updateLink,
} from "../controllers/link.controller.js";
import { validations } from "../middlewares/validations.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

// GET ALL links
router.get("/", validateToken, getLinks);

//GET small link
router.get(
  "/:nanoLink",
  [check("nanoLink", "El ID no es válido").trim().notEmpty(), validations],
  getLink
);

// POST  crear link
router.post(
  "/",
  validateToken,
  [
    check("longLink", "La URL no es correcta").trim().notEmpty().isURL(),
    validations,
  ],
  createLinks
);

// PATCH / PUT -> patch: no actualiza toda la información - actualizar link
router.patch(
  "/:id",
  validateToken,
  [
    check("id", "El ID no es válido").trim().isMongoId().notEmpty(),
    check("longLink", "La URL no es correcta").trim().notEmpty().isURL(),
    validations,
  ],
  updateLink
);

// DELETE link
router.delete(
  "/:id",
  validateToken,
  [
    check("id", "El ID no es válido").trim().isMongoId().notEmpty(),
    validations,
  ],
  removeLink
);

export default router;
