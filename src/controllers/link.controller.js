import { request, response } from "express";
import { Link } from "../models/Link.js";
import { nanoid } from "nanoid";

export const getLinks = async (req = request, res = response) => {
  try {
    const links = await Link.find({ uid: req.uid });
    res.status(200).json({ links });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};

//Para CRUD tradicional
/* 
export const getLink = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) return res.status(404).json({ error: "No existe el link" });
    if (!link.uid.equals(req.uid))
      return res
        .status(401)
        .json({ error: "No tiene acceso a esa información" });

    res.status(200).json({ link });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};*/

export const getLink = async (req = request, res = response) => {
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({ smallLink: nanoLink });
    if (!link) return res.status(404).json({ error: "No existe el link" });
    res.status(200).json({ longLink: link.longLink });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};

export const createLinks = async (req = request, res = response) => {
  try {
    const { longLink } = req.body;

    const link = new Link({
      longLink,
      smallLink: nanoid(6),
      uid: req.uid,
    });
    await link.save();
    res.status(201).json({ link });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};

export const updateLink = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { longLink } = req.body;
    const link = await Link.findById(id);
    if (!link) return res.status(404).json({ error: "No existe el link" });
    if (!link.uid.equals(req.uid)) {
      return res
        .status(401)
        .json({ error: "No tiene acceso a esa información" });
    }
    // actualizar
    link.longLink = longLink;
    await link.save();

    return res.status(200).json({ link });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};

export const removeLink = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) return res.status(404).json({ error: "No existe el link" });
    if (!link.uid.equals(req.uid)) {
      return res
        .status(401)
        .json({ error: "No tiene acceso a esa información" });
    }
    await Link.findByIdAndDelete(id);
    return res.status(200).json({ link });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};
