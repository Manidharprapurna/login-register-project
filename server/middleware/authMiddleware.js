import jwt from "jsonwebtoken";

const SECRET = "MY_SECRET_KEY";

const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization token required"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Invalid token format"
      });
    }

    const decoded = jwt.verify(token, SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (err) {

    return res.status(401).json({
      error: "Invalid or expired token"
    });

  }

};

export default authMiddleware;