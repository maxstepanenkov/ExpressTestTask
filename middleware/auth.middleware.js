const jwt = require('jsonwebtoken');

module.exports = (roles) => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization error" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    if (!roles.includes(decoded.role)) {
      return res.status(401).json({ message: "You do not have access rights" })
    }
    next();
  } catch(e) {
    return res.status(401).json({ message: "Authorization error" });
  }
};
