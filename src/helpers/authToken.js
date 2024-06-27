import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
  try {
    console.log(req.headers,"token");
    const token = req.headers.authorization.split(" ")[1];
    if (token === null) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      next();
    });
  } catch (error) {
    console.log("authToken Error",error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
