import { User } from "../models/User.js";

export const validateRepassword = (value, { req }) => {
  if (value !== req.body.repassword) {
    throw new Error("Las contraseñas no coinciden");
  }
  return value;
};

export const validateEmail = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`Ya existe un usuario con el email: ${email}`);
  }
};
