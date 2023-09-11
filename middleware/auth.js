const ErrorHandler = require("../utils/errorhandler");
const User = require('../models/usermodel'); 
const bcrypt = require('bcryptjs');

exports.authenticate = async (req, res, next) => {
  try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
          return res.status(401).json({ error: 'Authentication failed.' });
      }

      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const [mobileNo, password] = credentials.split(':');

      const user = await User.findOne({ mobileNo });

      if (!user || !bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ error: 'Authentication failed.' });
      }

      req.authenticatedUser = user;
      next();
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};



exports.authorizeRoles = (...roles) => {


  return (req, res, next) => {
    if (!allowedRoles.some(role => roles.includes(role))) {
      return next(
        new ErrorHandler(
          `Roles: ${roles.join(', ')} are not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
