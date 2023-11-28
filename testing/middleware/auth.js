import jwt from "jsonwebtoken";

const env = process.env.JWT_SECRET_KEY;

// console.log(process.env)
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);


const verifyToken = (req, res, next) => {
  // Check if config is defined
  if (!env) {
    return res.status(500).json({ message: "Secret key is not set" });
  }

  const authHeader = req.headers["authorization"]?.split(" ");
  if (req.headers["authorization"]) {
    try {
      if (authHeader[0] !== "Bearer") {
        return res.status(403).json({ message: "Login Required" });
      } else {
        jwt.verify(authHeader[1], config, (err, user) => {
          if (err) {
            console.log(err);
            return res.status(401).json({ message: "User not authorized" });
          }
          console.log(user); 
          req.user = user;
          return next();
        });
      }
    } catch (e) {
      return res.status(401).json({ message: "User not authorized" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

export default verifyToken;