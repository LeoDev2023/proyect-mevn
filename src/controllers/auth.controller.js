import { request, response } from "express";
import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";

export const register = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const user = new User({
      email,
      password,
    });
    await user.save();

    // generar el token
    const { token, expireIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    res
      .status(201)
      .json({ user: { email: user.email, uid: user._id, token, expireIn } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ error: "El usuario y/o contraseña no son válidos" });
    }
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return res
        .status(403)
        .json({ error: "El usuario y/o contraseña no son válidos" });
    }
    // generar el token
    const { token, expireIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    res.status(200).json({ token, expireIn });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};

export const protecRoute = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    res.status(200).json({ email: user.email, uid: user._id });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const refreshToToken = (req = request, res = response) => {
  try {
    const { token, expireIn } = generateToken(req.uid);
    res.status(200).json({ token, expireIn });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const logout = (req = request, res = response) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
