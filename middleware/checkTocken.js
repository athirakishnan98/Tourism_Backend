import jwt from "jsonwebtoken";

const checkToken = (role) => {
  console.log(role+"...............................");
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      console.log(token, role);
      if (!token) {
        console.log(here);
        return res.status(403).json({ message: "You are not authorized" });
      }
      const ogToken = token.split(" ")[1];
      const isValid = jwt.verify(ogToken, "gsdsjdy76d87ad7@jdsdhsjhd@#");
      if (!role.includes(isValid.role)) {
        return res.status(403).json({ message: "You are not authorised" });
      }
      next();
    } catch (e) {
      return res.status(403).json({ message: "You are not authorized" });
    }
  };
};

export default checkToken;
