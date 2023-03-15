import { request, response } from "express";
import { Link } from "../models/Link.js";

export const redirectLink = async (req = request, res = response) => {
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({ smallLink: nanoLink });
    if (!link) return res.status(404).json({ error: "No existe el link" });
    res.status(200).redirect(link.longLink);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};
