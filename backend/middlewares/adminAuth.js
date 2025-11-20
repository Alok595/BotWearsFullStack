import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    let token = req.cookies.token; // also {token} = req.cookies
    if (!token) {
      return res.status(400).json({ message: "Token Not Found" });
    }

    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: "Not Authorized Login Again,Invalid token" });
    }
    console.log(verifyToken);

    req.adminEmail = process.env.ADMIN_EMAIL;
    next();
  } catch (error) {
    console.log(" AdminAuth error");
    return res.status(400).json({ message: `AdminAuth Error ${error}` });
  }
};

export default adminAuth;
