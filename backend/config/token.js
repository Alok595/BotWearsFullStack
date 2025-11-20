// step6

import jwt from "jsonwebtoken";

export const genrateToken = (userId) => {
  try {
    let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.log("Token error");
  }
};
// now inside authcontrollr use this and pass userId

export const genrateTokenAdmin = (email) => {
  try {
    let token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.log("Token error");
  }
};
