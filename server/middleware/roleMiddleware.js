const roleMiddleware = (role) => {

  return (req, res, next) => {

    try {

      if (!req.user) {
        return res.status(401).json({
          error: "Unauthorized"
        });
      }

      if (req.user.role !== role) {
        return res.status(403).json({
          error: "Access denied"
        });
      }

      next();

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  };

};

export default roleMiddleware;