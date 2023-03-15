import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expireIn = 60 * 15;
  try {
    const token = jwt.sign({ uid }, process.env.SECRET_KEY, {
      expiresIn: expireIn,
    });
    return { token, expireIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expireIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn: expireIn,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expireIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};
