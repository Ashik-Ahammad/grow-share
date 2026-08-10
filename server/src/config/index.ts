import "dotenv/config";

export default {
  port: process.env.PORT || 5000,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN || "1d",
};
 