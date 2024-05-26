import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAuth = async (req, res, next) => {
  try {
    const tokenUser = req.headers["auth"];

    // decoder token
    const decoded = await jwt.verify(tokenUser, process.env.privateKey);

    if (!decoded) {
      return res.status(401).send({ msg: "user not auth" });
    }
    // end decoder
    
    // find user in DB
    const userFind = await User.findById(decoded.id);

    if (!userFind) {
      return res.status(401).send({ msg: "user not auth" });
    }
    // assign user
    req.user = userFind;

    next();
  } catch (error) {
    return res.status(500).send({ msg: "we have some error ", error });
  }
};

export default isAuth;